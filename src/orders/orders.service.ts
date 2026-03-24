import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { StripeService } from '../stripe/stripe.service';

/**
 * Valid order status transitions.
 * pending → confirmed → shipped → delivered
 * pending → cancelled
 */
const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  [OrderStatus.CONFIRMED]: [OrderStatus.SHIPPED],
  [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
  [OrderStatus.DELIVERED]: [],
  [OrderStatus.CANCELLED]: [],
};

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource,
    private readonly stripeService: StripeService,
  ) { }

  /**
   * Secure checkout with full server-side validation.
   * - Idempotency protection (duplicate request returns existing order)
   * - Database transaction for atomicity
   * - Server-side price recalculation (never trust frontend)
   * - Stock validation and decrement
   * - priceAtPurchase freezing
   */
  async checkout(userId: number, dto: CreateOrderDto): Promise<{ order: Order; clientSecret: string }> {
    this.logger.log(
      `Checkout attempt | userId=${userId} | items=${dto.items.length} | idempotencyKey=${dto.idempotencyKey}`,
    );

    // ── 1. Idempotency check ─────────────────────────────
    const existingOrder = await this.orderRepository.findOne({
      where: { idempotencyKey: dto.idempotencyKey, userId },
      relations: ['items', 'items.product'],
    });
    if (existingOrder) {
      this.logger.warn(
        `Idempotency hit | userId=${userId} | orderId=${existingOrder.id} | key=${dto.idempotencyKey}`,
      );
      // Re-create PaymentIntent for the existing order (idempotent via key prefix)
      const { clientSecret } = await this.stripeService.createPaymentIntent(
        Number(existingOrder.totalAmount),
        { orderId: String(existingOrder.id), userId: String(userId) },
        dto.idempotencyKey,
      );
      return { order: existingOrder, clientSecret };
    }

    // ── 2. Validate items array ──────────────────────────
    if (!dto.items || dto.items.length === 0) {
      this.logger.warn(
        `Checkout validation failed | userId=${userId} | reason=empty items`,
      );
      throw new BadRequestException('Order must contain at least one item');
    }

    // Check for duplicate productIds in request
    const productIds = dto.items.map((i) => i.productId);
    const uniqueIds = new Set(productIds);
    if (uniqueIds.size !== productIds.length) {
      this.logger.warn(
        `Checkout validation failed | userId=${userId} | reason=duplicate product IDs`,
      );
      throw new BadRequestException('Duplicate product IDs in order');
    }

    // ── 3. Start database transaction ────────────────────
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let totalAmount = 0;
      const orderItems: Partial<OrderItem>[] = [];

      for (const item of dto.items) {
        // Load product with pessimistic lock to prevent race conditions
        const product = await queryRunner.manager.findOne(Product, {
          where: { id: item.productId },
          lock: { mode: 'pessimistic_write' },
        });

        if (!product) {
          this.logger.warn(
            `Checkout failed | userId=${userId} | reason=product not found | productId=${item.productId}`,
          );
          throw new NotFoundException(
            `Product with ID ${item.productId} not found`,
          );
        }

        // ── 4. Validate stock availability ───────────
        if (product.stockQuantity < item.quantity) {
          this.logger.warn(
            `Stock error | userId=${userId} | productId=${product.id} | available=${product.stockQuantity} | requested=${item.quantity}`,
          );
          throw new BadRequestException(
            `Insufficient stock for "${product.name}". Available: ${product.stockQuantity}, Requested: ${item.quantity}`,
          );
        }

        // ── 5. Recalculate price from DB (NEVER trust frontend) ──
        const priceAtPurchase = Number(product.price);
        const lineTotal = priceAtPurchase * item.quantity;
        totalAmount += lineTotal;

        orderItems.push({
          productId: product.id,
          quantity: item.quantity,
          priceAtPurchase,
        });

        // ── 6. Deduct stock ──────────────────────────
        product.stockQuantity -= item.quantity;
        if (product.stockQuantity <= 0) {
          product.inStock = false;
        }
        await queryRunner.manager.save(Product, product);
      }

      // ── 7. Create order atomically ───────────────────
      const order = queryRunner.manager.create(Order, {
        userId,
        status: OrderStatus.PENDING,
        totalAmount,
        shippingAddress: dto.shippingAddress,
        phone: dto.phone,
        notes: dto.notes || undefined,
        idempotencyKey: dto.idempotencyKey,
      });

      const savedOrder = await queryRunner.manager.save(Order, order);

      // Create order items
      for (const item of orderItems) {
        const orderItem = queryRunner.manager.create(OrderItem, {
          ...item,
          orderId: savedOrder.id,
        });
        await queryRunner.manager.save(OrderItem, orderItem);
      }

      // ── 8. Commit transaction ────────────────────────
      await queryRunner.commitTransaction();

      this.logger.log(
        `Checkout success | userId=${userId} | orderId=${savedOrder.id} | total=${totalAmount} | items=${orderItems.length}`,
      );

      // ── 9. Create Stripe PaymentIntent ─────────────────
      const { clientSecret, paymentIntentId } =
        await this.stripeService.createPaymentIntent(
          totalAmount,
          { orderId: String(savedOrder.id), userId: String(userId) },
          dto.idempotencyKey,
        );

      // Save paymentIntentId on order (non-transactional, order already committed)
      await this.orderRepository.update(savedOrder.id, { paymentIntentId });

      // Return the complete order with items
      const result = await this.orderRepository.findOne({
        where: { id: savedOrder.id },
        relations: ['items', 'items.product'],
      });

      return { order: result!, clientSecret };
    } catch (error) {
      // Rollback on any failure
      await queryRunner.rollbackTransaction();

      // Re-throw known exceptions
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      this.logger.error(
        `Checkout critical error | userId=${userId} | error=${error instanceof Error ? error.message : 'Unknown'}`,
      );

      throw new BadRequestException(
        'Failed to process order. Please try again.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Update order status with lifecycle validation.
   * Only allows valid transitions:
   *   pending → confirmed → shipped → delivered
   *   pending → cancelled
   */
  async updateStatus(orderId: number, newStatus: OrderStatus): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    const allowedTransitions = VALID_TRANSITIONS[order.status];

    if (!allowedTransitions.includes(newStatus)) {
      this.logger.warn(
        `Invalid status transition | orderId=${orderId} | from=${order.status} | to=${newStatus}`,
      );
      throw new BadRequestException(
        `Cannot transition from "${order.status}" to "${newStatus}". Allowed: [${allowedTransitions.join(', ')}]`,
      );
    }

    order.status = newStatus;
    const updatedOrder = await this.orderRepository.save(order);

    this.logger.log(
      `Order status updated | orderId=${orderId} | from=${order.status} | to=${newStatus}`,
    );

    return updatedOrder;
  }

  /**
   * Get all orders for a specific user
   */
  async getMyOrders(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { userId },
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get a single order (only if it belongs to the user)
   */
  async getOrderById(orderId: number, userId: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId, userId },
      relations: ['items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}

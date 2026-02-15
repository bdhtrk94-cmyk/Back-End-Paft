import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * POST /api/orders/checkout
   * Stricter rate limit: 5 requests per minute (prevents payment spam)
   */
  @Post('checkout')
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  async checkout(@Request() req, @Body() dto: CreateOrderDto) {
    const order = await this.ordersService.checkout(req.user.id, dto);
    // Return only safe fields — no sensitive data leaks
    return {
      message: 'Order placed successfully',
      order: {
        id: order.id,
        status: order.status,
        totalAmount: order.totalAmount,
        items: order.items.map((item) => ({
          productId: item.productId,
          productName: item.product?.name,
          quantity: item.quantity,
          priceAtPurchase: item.priceAtPurchase,
        })),
        createdAt: order.createdAt,
      },
    };
  }

  /**
   * PATCH /api/orders/:id/status
   * Update order status with lifecycle validation
   */
  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    const order = await this.ordersService.updateStatus(id, dto.status);
    return {
      message: `Order status updated to "${order.status}"`,
      order: {
        id: order.id,
        status: order.status,
        updatedAt: order.updatedAt,
      },
    };
  }

  /**
   * GET /api/orders/my-orders
   * Returns all orders for the authenticated user
   */
  @Get('my-orders')
  async getMyOrders(@Request() req) {
    const orders = await this.ordersService.getMyOrders(req.user.id);
    return orders.map((order) => ({
      id: order.id,
      status: order.status,
      totalAmount: order.totalAmount,
      itemCount: order.items.length,
      createdAt: order.createdAt,
    }));
  }

  /**
   * GET /api/orders/:id
   * Returns a single order detail (only if it belongs to the user)
   */
  @Get(':id')
  async getOrder(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const order = await this.ordersService.getOrderById(id, req.user.id);
    return {
      id: order.id,
      status: order.status,
      totalAmount: order.totalAmount,
      shippingAddress: order.shippingAddress,
      phone: order.phone,
      notes: order.notes,
      items: order.items.map((item) => ({
        productId: item.productId,
        productName: item.product?.name,
        productImage: item.product?.image,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase,
      })),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}

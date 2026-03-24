import {
    Controller,
    Post,
    Get,
    Put,
    Body,
    Req,
    Headers,
    HttpCode,
    Logger,
    BadRequestException,
    UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { StripeService } from './stripe.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('stripe')
export class StripeController {
    private readonly logger = new Logger(StripeController.name);

    constructor(
        private readonly stripeService: StripeService,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) { }

    // ── Public: Get Stripe publishable key ──────────────────
    @Get('public-key')
    async getPublicKey() {
        const key = await this.stripeService.getPublicKey();
        return { publicKey: key };
    }

    // ── Admin: Get payment settings (masked secrets) ────────
    @Get('settings')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.SUPER_ADMIN)
    async getSettings() {
        return this.stripeService.getSettings();
    }

    // ── Admin: Save payment settings ────────────────────────
    @Put('settings')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.SUPER_ADMIN)
    async saveSettings(
        @Body()
        body: {
            stripePublicKey: string;
            stripeSecretKey?: string;
            stripeWebhookSecret?: string;
            isEnabled: boolean;
        },
    ) {
        await this.stripeService.saveSettings(body);
        return { message: 'Payment settings saved successfully' };
    }

    // ── Admin: Test Stripe connection ───────────────────────
    @Post('test-connection')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.SUPER_ADMIN)
    async testConnection() {
        return this.stripeService.testConnection();
    }

    // ── Webhook (no auth — Stripe calls this) ───────────────
    @Post('webhook')
    @HttpCode(200)
    async handleWebhook(
        @Req() req: Request,
        @Headers('stripe-signature') signature: string,
    ) {
        if (!signature) {
            this.logger.warn('Webhook called without stripe-signature header');
            throw new BadRequestException('Missing stripe-signature header');
        }

        const rawBody = req.body as Buffer;

        let event;
        try {
            event = this.stripeService.constructWebhookEvent(rawBody, signature);
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : 'Unknown';
            this.logger.error(`Webhook verification failed: ${errMsg}`);
            throw new BadRequestException(`Webhook Error: ${errMsg}`);
        }

        this.logger.log(`Webhook received | type=${event.type} | id=${event.id}`);

        switch (event.type) {
            case 'payment_intent.succeeded': {
                const pi = event.data.object;
                await this.handlePaymentSuccess(pi.id, pi.metadata);
                break;
            }
            case 'payment_intent.payment_failed': {
                const pi = event.data.object;
                await this.handlePaymentFailed(pi.id, pi.metadata);
                break;
            }
            default:
                this.logger.log(`Unhandled event type: ${event.type}`);
        }

        return { received: true };
    }

    private async handlePaymentSuccess(
        paymentIntentId: string,
        metadata: Record<string, string>,
    ) {
        const orderId = metadata?.orderId;
        if (!orderId) {
            this.logger.error('Payment succeeded but no orderId in metadata');
            return;
        }

        const order = await this.orderRepository.findOne({
            where: { id: Number(orderId) },
        });
        if (!order) {
            this.logger.error(`Order not found for paymentIntentId=${paymentIntentId}`);
            return;
        }

        if (order.paymentStatus !== 'paid') {
            order.paymentStatus = 'paid';
            order.status = OrderStatus.CONFIRMED;
            await this.orderRepository.save(order);
            this.logger.log(`Order #${orderId} → confirmed + paid`);
        }
    }

    private async handlePaymentFailed(
        paymentIntentId: string,
        metadata: Record<string, string>,
    ) {
        const orderId = metadata?.orderId;
        if (!orderId) {
            this.logger.error('Payment failed but no orderId in metadata');
            return;
        }

        const order = await this.orderRepository.findOne({
            where: { id: Number(orderId) },
        });
        if (!order) {
            this.logger.error(`Order not found for paymentIntentId=${paymentIntentId}`);
            return;
        }

        if (order.paymentStatus !== 'failed') {
            order.paymentStatus = 'failed';
            await this.orderRepository.save(order);
            this.logger.log(`Order #${orderId} → paymentStatus=failed`);
        }
    }
}

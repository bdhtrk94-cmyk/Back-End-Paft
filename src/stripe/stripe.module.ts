import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { Order } from '../orders/entities/order.entity';
import { PaymentSettings } from './entities/payment-settings.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, PaymentSettings])],
    controllers: [StripeController],
    providers: [StripeService],
    exports: [StripeService],
})
export class StripeModule { }

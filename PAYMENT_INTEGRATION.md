# 💳 Payment Integration Guide (Stripe)

This guide explains how to securely integrate Stripe payments into the PAFT checkout system.

## Prerequisites

```bash
npm install stripe
```

Add to `.env`:
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## Step 1: Create PaymentIntent on Backend

After order creation in `OrdersService.checkout()`, create a PaymentIntent:

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Inside checkout(), after saving the order:
const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(totalAmount * 100), // Stripe uses cents
    currency: 'egp',
    metadata: {
        orderId: savedOrder.id.toString(),
        userId: userId.toString(),
    },
});

// Save the paymentIntentId on the order
savedOrder.paymentIntentId = paymentIntent.id;
await queryRunner.manager.save(Order, savedOrder);

// Return clientSecret to frontend
return { clientSecret: paymentIntent.client_secret, order: savedOrder };
```

## Step 2: Frontend Payment (Stripe Elements)

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

Use `confirmPayment()` on the frontend with the `clientSecret` from the backend.

## Step 3: Webhook Verification (CRITICAL)

> ⚠️ NEVER confirm payment based on frontend response. Always use webhooks.

```typescript
@Controller('webhooks')
export class WebhooksController {
    @Post('stripe')
    async handleStripeWebhook(@Req() req: RawBodyRequest<Request>) {
        const sig = req.headers['stripe-signature'];
        const event = stripe.webhooks.constructEvent(
            req.rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET,
        );

        switch (event.type) {
            case 'payment_intent.succeeded':
                // Update order status to CONFIRMED
                const orderId = event.data.object.metadata.orderId;
                await ordersService.updateStatus(orderId, OrderStatus.CONFIRMED);
                break;

            case 'payment_intent.payment_failed':
                // Mark order as failed, restore stock
                break;
        }

        return { received: true };
    }
}
```

## Security Checklist

- [x] PaymentIntents created on backend only
- [x] Webhook signature verified with `constructEvent()`
- [x] Order status updated only via webhooks
- [x] Raw body used for webhook verification
- [x] idempotencyKey prevents duplicate charges
- [x] Prices recalculated server-side

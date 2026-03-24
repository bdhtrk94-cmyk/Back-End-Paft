import {
    Injectable,
    Logger,
    InternalServerErrorException,
    BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Stripe from 'stripe';
import * as crypto from 'crypto';
import { PaymentSettings } from './entities/payment-settings.entity';

@Injectable()
export class StripeService {
    private stripe: Stripe | null = null;
    private readonly logger = new Logger(StripeService.name);
    private readonly encryptionKey: string;
    private cachedPublicKey = '';
    private cachedWebhookSecret = '';

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(PaymentSettings)
        private readonly settingsRepo: Repository<PaymentSettings>,
    ) {
        // Encryption key for AES-256 (must be 32 chars)
        this.encryptionKey = this.configService.get<string>(
            'STRIPE_ENCRYPTION_KEY',
            'paft_enc_key_change_in_prod_32ch',
        );

        // Initialize Stripe from DB settings on startup
        this.initFromDatabase().catch((err) => {
            this.logger.warn(`Stripe init from DB deferred: ${err.message}`);
        });
    }

    // ── Encryption helpers ──────────────────────────────────

    private encrypt(text: string): string {
        if (!text) return '';
        const iv = crypto.randomBytes(16);
        const key = crypto
            .createHash('sha256')
            .update(this.encryptionKey)
            .digest();
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return iv.toString('hex') + ':' + encrypted;
    }

    private decrypt(encrypted: string): string {
        if (!encrypted || !encrypted.includes(':')) return '';
        try {
            const [ivHex, encryptedText] = encrypted.split(':');
            const iv = Buffer.from(ivHex, 'hex');
            const key = crypto
                .createHash('sha256')
                .update(this.encryptionKey)
                .digest();
            const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
            let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        } catch {
            this.logger.error('Failed to decrypt Stripe key — encryption key may have changed');
            return '';
        }
    }

    // ── Initialize Stripe from database ─────────────────────

    private async initFromDatabase(): Promise<void> {
        const settings = await this.settingsRepo.findOne({ where: { id: 1 } });
        if (!settings || !settings.isEnabled) {
            this.stripe = null;
            this.cachedPublicKey = '';
            this.cachedWebhookSecret = '';
            this.logger.warn('⚠️  Stripe not configured — payment features disabled');
            return;
        }

        const secretKey = this.decrypt(settings.stripeSecretKeyEncrypted);
        if (!secretKey || !secretKey.startsWith('sk_')) {
            this.stripe = null;
            this.logger.warn('⚠️  Invalid Stripe secret key in database');
            return;
        }

        this.stripe = new Stripe(secretKey);
        this.cachedPublicKey = settings.stripePublicKey;
        this.cachedWebhookSecret = this.decrypt(settings.stripeWebhookSecretEncrypted);
        this.logger.log('✅ Stripe initialized from database settings');
    }

    /**
     * Reload Stripe instance from DB (called after settings are saved)
     */
    async reload(): Promise<void> {
        await this.initFromDatabase();
    }

    get configured(): boolean {
        return this.stripe !== null;
    }

    // ── Settings CRUD (for admin) ───────────────────────────

    async getSettings(): Promise<{
        stripePublicKey: string;
        stripeSecretKeyMasked: string;
        stripeWebhookSecretMasked: string;
        isEnabled: boolean;
    }> {
        let settings = await this.settingsRepo.findOne({ where: { id: 1 } });
        if (!settings) {
            // Create default empty row
            settings = this.settingsRepo.create({ id: 1 });
            await this.settingsRepo.save(settings);
        }

        const secretKey = this.decrypt(settings.stripeSecretKeyEncrypted);
        const webhookSecret = this.decrypt(settings.stripeWebhookSecretEncrypted);

        return {
            stripePublicKey: settings.stripePublicKey,
            stripeSecretKeyMasked: secretKey
                ? `sk_****${secretKey.slice(-4)}`
                : '',
            stripeWebhookSecretMasked: webhookSecret
                ? `whsec_****${webhookSecret.slice(-4)}`
                : '',
            isEnabled: settings.isEnabled,
        };
    }

    async saveSettings(data: {
        stripePublicKey: string;
        stripeSecretKey?: string;
        stripeWebhookSecret?: string;
        isEnabled: boolean;
    }): Promise<void> {
        let settings = await this.settingsRepo.findOne({ where: { id: 1 } });
        if (!settings) {
            settings = this.settingsRepo.create({ id: 1 });
        }

        settings.stripePublicKey = data.stripePublicKey || '';
        settings.isEnabled = data.isEnabled;

        // Only update encrypted fields if new values are provided
        if (data.stripeSecretKey && !data.stripeSecretKey.includes('****')) {
            settings.stripeSecretKeyEncrypted = this.encrypt(data.stripeSecretKey);
        }
        if (data.stripeWebhookSecret && !data.stripeWebhookSecret.includes('****')) {
            settings.stripeWebhookSecretEncrypted = this.encrypt(data.stripeWebhookSecret);
        }

        await this.settingsRepo.save(settings);
        this.logger.log('Payment settings saved');

        // Reload Stripe instance with new keys
        await this.reload();
    }

    /**
     * Get the public key for the frontend (no auth required)
     */
    async getPublicKey(): Promise<string> {
        if (this.cachedPublicKey) return this.cachedPublicKey;

        const settings = await this.settingsRepo.findOne({ where: { id: 1 } });
        if (!settings || !settings.isEnabled) return '';
        this.cachedPublicKey = settings.stripePublicKey;
        return this.cachedPublicKey;
    }

    /**
     * Test connection by making a simple API call to Stripe
     */
    async testConnection(): Promise<{ success: boolean; message: string }> {
        if (!this.stripe) {
            return { success: false, message: 'Stripe is not configured. Please save your keys first.' };
        }

        try {
            const balance = await this.stripe.balance.retrieve();
            return {
                success: true,
                message: `Connected! Account currency: ${balance.available?.[0]?.currency?.toUpperCase() || 'N/A'}`,
            };
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Stripe connection test failed: ${errMsg}`);
            return { success: false, message: `Connection failed: ${errMsg}` };
        }
    }

    // ── Payment Intent ──────────────────────────────────────

    async createPaymentIntent(
        amountInEGP: number,
        metadata: { orderId: string; userId: string },
        idempotencyKey: string,
    ): Promise<{ clientSecret: string; paymentIntentId: string }> {
        if (!this.stripe) {
            throw new BadRequestException(
                'Payment gateway is not configured. Please contact the administrator.',
            );
        }

        const amountInPiasters = Math.round(amountInEGP * 100);
        if (amountInPiasters < 100) {
            throw new BadRequestException('Order amount is below the minimum chargeable amount');
        }

        this.logger.log(
            `Creating PaymentIntent | amount=${amountInEGP} EGP (${amountInPiasters} piasters) | orderId=${metadata.orderId}`,
        );

        try {
            const paymentIntent = await this.stripe.paymentIntents.create(
                {
                    amount: amountInPiasters,
                    currency: 'egp',
                    metadata,
                    automatic_payment_methods: { enabled: true },
                    description: `PAFT Order #${metadata.orderId}`,
                },
                { idempotencyKey: `pi_${idempotencyKey}` },
            );

            this.logger.log(
                `PaymentIntent created | id=${paymentIntent.id} | orderId=${metadata.orderId}`,
            );

            return {
                clientSecret: paymentIntent.client_secret!,
                paymentIntentId: paymentIntent.id,
            };
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : 'Unknown Stripe error';
            this.logger.error(
                `Stripe PaymentIntent failed | orderId=${metadata.orderId} | error=${errMsg}`,
            );
            throw new InternalServerErrorException('Failed to initialize payment. Please try again.');
        }
    }

    // ── Webhook ─────────────────────────────────────────────

    constructWebhookEvent(rawBody: Buffer, signature: string): Stripe.Event {
        if (!this.cachedWebhookSecret) {
            this.logger.warn('STRIPE_WEBHOOK_SECRET not set — skipping signature verification');
            return JSON.parse(rawBody.toString()) as Stripe.Event;
        }

        if (!this.stripe) {
            throw new Error('Stripe is not configured');
        }

        try {
            return this.stripe.webhooks.constructEvent(
                rawBody,
                signature,
                this.cachedWebhookSecret,
            );
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Webhook signature verification failed: ${errMsg}`);
            throw new Error(`Webhook signature verification failed: ${errMsg}`);
        }
    }
}

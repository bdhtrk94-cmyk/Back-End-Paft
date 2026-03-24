import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity('payment_settings')
export class PaymentSettings {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'stripe_public_key', length: 255, default: '' })
    stripePublicKey: string;

    // Stored AES-256 encrypted
    @Column({ name: 'stripe_secret_key_encrypted', type: 'text', default: '' })
    stripeSecretKeyEncrypted: string;

    // Stored AES-256 encrypted
    @Column({ name: 'stripe_webhook_secret_encrypted', type: 'text', default: '' })
    stripeWebhookSecretEncrypted: string;

    @Column({ name: 'is_enabled', type: 'boolean', default: false })
    isEnabled: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}

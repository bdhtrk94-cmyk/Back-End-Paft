import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'name_ar', length: 255, nullable: true })
  nameAr: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({
    name: 'original_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  originalPrice: number;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating: number;

  @Column({ name: 'review_count', default: 0 })
  reviewCount: number;

  @Column({ length: 100 })
  category: string;

  @Column({ name: 'category_ar', length: 100, nullable: true })
  categoryAr: string;

  @Column({ type: 'text' })
  image: string;

  @Column({ length: 50, nullable: true })
  badge: string;

  @Column({ name: 'in_stock', default: true })
  inStock: boolean;

  @Column({ name: 'stock_quantity', type: 'int', default: 100 })
  stockQuantity: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'description_ar', type: 'text', nullable: true })
  descriptionAr: string;

  @Column({ name: 'full_description', type: 'text', nullable: true })
  fullDescription: string;

  @Column({ name: 'full_description_ar', type: 'text', nullable: true })
  fullDescriptionAr: string;

  // Pallet-specific fields
  @Column({ length: 255, nullable: true })
  slug: string;

  @Column({ length: 100, nullable: true })
  dimensions: string;

  @Column({ length: 100, nullable: true })
  design: string;

  @Column({ length: 50, nullable: true })
  weight: string;

  @Column({ name: 'static_load', length: 50, nullable: true })
  staticLoad: string;

  @Column({ name: 'dynamic_load', length: 50, nullable: true })
  dynamicLoad: string;

  @Column({ name: 'rack_load', length: 50, nullable: true })
  rackLoad: string;

  @Column({ name: 'expected_life', length: 50, nullable: true })
  expectedLife: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  /**
   * Soft delete: when a product is "deleted", this column is set
   * instead of removing the row. TypeORM automatically excludes
   * soft-deleted rows from all queries unless explicitly requested.
   */
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

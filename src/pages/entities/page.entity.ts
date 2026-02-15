import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pages')
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ name: 'title_ar', length: 255, nullable: true })
  titleAr: string;

  @Column({ unique: true, length: 255 })
  slug: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'content_ar', type: 'text', nullable: true })
  contentAr: string;

  @Column({ name: 'meta_title', length: 255, nullable: true })
  metaTitle: string;

  @Column({ name: 'meta_title_ar', length: 255, nullable: true })
  metaTitleAr: string;

  @Column({ name: 'meta_description', type: 'text', nullable: true })
  metaDescription: string;

  @Column({ name: 'meta_description_ar', type: 'text', nullable: true })
  metaDescriptionAr: string;

  @Column({ name: 'is_published', default: false })
  isPublished: boolean;

  @Column({ name: 'sort_order', default: 0 })
  order: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

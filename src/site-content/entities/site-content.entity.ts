import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('site_content')
export class SiteContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'section_key', unique: true, length: 255 })
  sectionKey: string;

  @Column({ name: 'content_type', length: 50, default: 'text' })
  contentType: string; // 'text' | 'html' | 'json'

  // ── English fields ──────────────────────────────────
  @Column({ name: 'title_en', length: 500, nullable: true })
  titleEn: string;

  @Column({ name: 'content_en', type: 'text', nullable: true })
  contentEn: string;

  // ── Arabic fields ───────────────────────────────────
  @Column({ name: 'title_ar', length: 500, nullable: true })
  titleAr: string;

  @Column({ name: 'content_ar', type: 'text', nullable: true })
  contentAr: string;

  // ── Draft / Publish workflow ────────────────────────
  @Column({ name: 'is_draft', default: true })
  isDraft: boolean;

  @Column({ name: 'published_snapshot', type: 'text', nullable: true })
  publishedSnapshot: string; // JSON snapshot of last published state

  @Column({ name: 'sort_order', default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

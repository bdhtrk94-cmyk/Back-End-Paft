import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('content')
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  page: string; // e.g., 'home', 'about', 'contact'

  @Column({ type: 'varchar', length: 100 })
  section: string; // e.g., 'hero', 'business-units', 'header'

  @Column({ type: 'varchar', length: 100 })
  key: string; // e.g., 'title', 'description', 'button-text'

  @Column({ type: 'text' })
  value: string; // The actual content

  @Column({ type: 'text', nullable: true, name: 'valueAr' })
  valueAr?: string; // Arabic content (optional for future)

  @Column({ type: 'int', default: 0 })
  sortOrder: number; // For ordering content items

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
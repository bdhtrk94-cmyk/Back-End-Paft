import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteContent } from './entities/site-content.entity';
import { CreateSiteContentDto } from './dto/create-site-content.dto';
import { UpdateSiteContentDto } from './dto/update-site-content.dto';

@Injectable()
export class SiteContentService {
  constructor(
    @InjectRepository(SiteContent)
    private readonly repo: Repository<SiteContent>,
  ) {}

  async create(dto: CreateSiteContentDto): Promise<SiteContent> {
    const item = this.repo.create(dto);
    return this.repo.save(item);
  }

  async findAll(includeDrafts = false): Promise<SiteContent[]> {
    if (includeDrafts) {
      return this.repo.find({ order: { sortOrder: 'ASC', createdAt: 'DESC' } });
    }
    // Return published version data
    return this.repo.find({
      where: { isDraft: false },
      order: { sortOrder: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<SiteContent> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`SiteContent with ID ${id} not found`);
    }
    return item;
  }

  async findByKey(key: string): Promise<SiteContent> {
    const item = await this.repo.findOne({ where: { sectionKey: key } });
    if (!item) {
      throw new NotFoundException(`SiteContent with key "${key}" not found`);
    }
    return item;
  }

  async update(id: number, dto: UpdateSiteContentDto): Promise<SiteContent> {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    item.isDraft = true; // mark as draft on edit
    return this.repo.save(item);
  }

  async publish(id: number): Promise<SiteContent> {
    const item = await this.findOne(id);
    // Save current state as published snapshot
    item.publishedSnapshot = JSON.stringify({
      titleEn: item.titleEn,
      contentEn: item.contentEn,
      titleAr: item.titleAr,
      contentAr: item.contentAr,
    });
    item.isDraft = false;
    return this.repo.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.repo.remove(item);
  }

  async count(): Promise<number> {
    return this.repo.count();
  }
}

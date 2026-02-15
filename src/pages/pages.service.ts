import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './entities/page.entity';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  async create(createPageDto: CreatePageDto): Promise<Page> {
    const page = this.pageRepository.create(createPageDto);
    return this.pageRepository.save(page);
  }

  async findAll(): Promise<Page[]> {
    return this.pageRepository.find({
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findAllPublished(): Promise<Page[]> {
    return this.pageRepository.find({
      where: { isPublished: true },
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Page> {
    const page = await this.pageRepository.findOne({ where: { id } });
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    return page;
  }

  async findBySlug(slug: string): Promise<Page> {
    const page = await this.pageRepository.findOne({ where: { slug } });
    if (!page) {
      throw new NotFoundException(`Page with slug "${slug}" not found`);
    }
    return page;
  }

  async update(id: number, updatePageDto: UpdatePageDto): Promise<Page> {
    const page = await this.findOne(id);
    Object.assign(page, updatePageDto);
    return this.pageRepository.save(page);
  }

  async remove(id: number): Promise<void> {
    const page = await this.findOne(id);
    await this.pageRepository.remove(page);
  }

  async count(): Promise<number> {
    return this.pageRepository.count();
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  async create(createContentDto: CreateContentDto): Promise<Content> {
    const content = this.contentRepository.create(createContentDto);
    return await this.contentRepository.save(content);
  }

  async findAll(): Promise<Content[]> {
    return await this.contentRepository.find({
      order: { page: 'ASC', section: 'ASC', sortOrder: 'ASC' },
    });
  }

  async findByPage(page: string): Promise<Content[]> {
    return await this.contentRepository.find({
      where: { page },
      order: { section: 'ASC', sortOrder: 'ASC' },
    });
  }

  async findByPageAndSection(page: string, section: string): Promise<Content[]> {
    return await this.contentRepository.find({
      where: { page, section },
      order: { sortOrder: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Content> {
    const content = await this.contentRepository.findOne({ where: { id } });
    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    return content;
  }

  async update(id: number, updateContentDto: UpdateContentDto): Promise<Content> {
    const content = await this.findOne(id);
    Object.assign(content, updateContentDto);
    return await this.contentRepository.save(content);
  }

  async remove(id: number): Promise<void> {
    const content = await this.findOne(id);
    await this.contentRepository.remove(content);
  }

  // Helper method to get content as key-value pairs for easier frontend consumption
  async getContentMap(page: string): Promise<Record<string, any>> {
    const contents = await this.findByPage(page);
    const contentMap: Record<string, any> = {};

    contents.forEach((content) => {
      if (!contentMap[content.section]) {
        contentMap[content.section] = {};
      }
      contentMap[content.section][content.key] = {
        value: content.value,
        valueAr: content.valueAr,
        id: content.id,
      };
    });

    return contentMap;
  }
}
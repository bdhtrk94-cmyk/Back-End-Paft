import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(dto);
    return this.productRepository.save(product);
  }

  async findAll(query?: {
    category?: string;
    search?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Product[]> {
    const qb = this.productRepository.createQueryBuilder('product');

    if (query?.category && query.category !== 'All') {
      qb.andWhere('product.category = :category', { category: query.category });
    }

    if (query?.search) {
      qb.andWhere(
        '(product.name LIKE :search OR product.category LIKE :search OR product.description LIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    if (query?.minPrice !== undefined) {
      qb.andWhere('product.price >= :minPrice', { minPrice: query.minPrice });
    }

    if (query?.maxPrice !== undefined && query.maxPrice !== Infinity) {
      qb.andWhere('product.price < :maxPrice', { maxPrice: query.maxPrice });
    }

    // Sorting
    switch (query?.sort) {
      case 'price-asc':
        qb.orderBy('product.price', 'ASC');
        break;
      case 'price-desc':
        qb.orderBy('product.price', 'DESC');
        break;
      case 'rating':
        qb.orderBy('product.rating', 'DESC');
        break;
      case 'newest':
        qb.orderBy('product.id', 'DESC');
        break;
      default:
        qb.orderBy('product.id', 'ASC');
        break;
    }

    return qb.getMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, dto);
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.softRemove(product);
  }

  async findAllForAdmin(): Promise<Product[]> {
    // Return all products including soft-deleted ones for admin
    return this.productRepository.find({ withDeleted: true });
  }

  async count(): Promise<number> {
    return this.productRepository.count();
  }
}

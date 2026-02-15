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

    // Only include non-deleted products for public API
    qb.where('product.deletedAt IS NULL');

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

  async findOne(id: number, includeDeleted = false): Promise<Product> {
    const product = await this.productRepository.findOne({ 
      where: { id },
      withDeleted: includeDeleted
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id, true); // Include deleted products for admin operations
    Object.assign(product, dto);
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    console.log(`Attempting to permanently delete product with ID: ${id}`);
    const product = await this.findOne(id, true); // Include deleted products for admin operations
    console.log(`Found product: ${product.name}`);
    await this.productRepository.delete(id); // Hard delete instead of soft delete
    console.log(`Product ${id} permanently deleted successfully`);
  }

  async findAllForAdmin(): Promise<Product[]> {
    // Return only active products for admin (no soft-deleted products since we use hard delete)
    const products = await this.productRepository.find();
    console.log(`Found ${products.length} products for admin`);
    console.log('Products:', products.map(p => ({ id: p.id, name: p.name })));
    return products;
  }

  async count(): Promise<number> {
    return this.productRepository.count();
  }
}

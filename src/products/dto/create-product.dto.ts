import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  nameAr?: string;

  @Transform(({ value }) => value != null ? Number(value) : value)
  @IsNumber()
  @Min(0)
  price: number;

  @Transform(({ value }) => value != null ? Number(value) : value)
  @IsNumber()
  @IsOptional()
  originalPrice?: number;

  @Transform(({ value }) => value != null ? Number(value) : value)
  @IsNumber()
  @IsOptional()
  rating?: number;

  @Transform(({ value }) => value != null ? Number(value) : value)
  @IsNumber()
  @IsOptional()
  reviewCount?: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  categoryAr?: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsOptional()
  badge?: string;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  inStock?: boolean;

  @Transform(({ value }) => value != null ? Number(value) : value)
  @IsNumber()
  @IsOptional()
  stockQuantity?: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  descriptionAr?: string;

  @IsString()
  @IsOptional()
  fullDescription?: string;

  @IsString()
  @IsOptional()
  fullDescriptionAr?: string;

  // Pallet-specific fields
  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  dimensions?: string;

  @IsString()
  @IsOptional()
  design?: string;

  @IsString()
  @IsOptional()
  weight?: string;

  @IsString()
  @IsOptional()
  staticLoad?: string;

  @IsString()
  @IsOptional()
  dynamicLoad?: string;

  @IsString()
  @IsOptional()
  rackLoad?: string;

  @IsString()
  @IsOptional()
  expectedLife?: string;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @Transform(({ value }) => value != null ? Number(value) : value)
  @IsNumber()
  @IsOptional()
  sortOrder?: number;
}

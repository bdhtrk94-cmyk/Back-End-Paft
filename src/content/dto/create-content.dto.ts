import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  page: string;

  @IsString()
  @IsNotEmpty()
  section: string;

  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsOptional()
  valueAr?: string;

  @IsNumber()
  @IsOptional()
  sortOrder?: number;
}
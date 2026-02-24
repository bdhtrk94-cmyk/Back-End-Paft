import { PartialType } from '@nestjs/mapped-types';
import { CreateContentDto } from './create-content.dto';
import { IsString, IsOptional, Allow } from 'class-validator';

export class UpdateContentDto extends PartialType(CreateContentDto) {
  // Override value to allow empty strings (PartialType keeps @IsNotEmpty from Create DTO)
  @IsString()
  @IsOptional()
  @Allow()
  value?: string;

  @IsString()
  @IsOptional()
  @Allow()
  valueAr?: string;
}
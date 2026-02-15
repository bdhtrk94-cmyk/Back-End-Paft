import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
  IsIn,
} from 'class-validator';

export class CreateSiteContentDto {
  @IsString()
  @IsNotEmpty()
  sectionKey: string;

  @IsString()
  @IsOptional()
  @IsIn(['text', 'html', 'json'])
  contentType?: string;

  @IsString()
  @IsOptional()
  titleEn?: string;

  @IsString()
  @IsOptional()
  contentEn?: string;

  @IsString()
  @IsOptional()
  titleAr?: string;

  @IsString()
  @IsOptional()
  contentAr?: string;

  @IsBoolean()
  @IsOptional()
  isDraft?: boolean;

  @IsInt()
  @Min(0)
  @IsOptional()
  sortOrder?: number;
}

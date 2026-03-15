import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ProductCategory } from '@prisma-client';

export enum ProductSortBy {
  NEWEST = 'newest',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  NEAREST = 'nearest',
  RATING = 'rating',
}

export class ProductQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiProperty({ required: false, enum: ProductCategory })
  @IsOptional()
  @IsEnum(ProductCategory)
  category?: ProductCategory;

  @ApiProperty({
    required: false,
    enum: ProductSortBy,
    default: ProductSortBy.NEWEST,
  })
  @IsOptional()
  @IsEnum(ProductSortBy)
  sort?: ProductSortBy = ProductSortBy.NEWEST;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value as string))
  minPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value as string))
  maxPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  inStock?: boolean;

  @ApiProperty({ required: false, description: 'Latitude for nearest sort' })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  @Transform(({ value }) => parseFloat(value as string))
  lat?: number;

  @ApiProperty({ required: false, description: 'Longitude for nearest sort' })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  @Transform(({ value }) => parseFloat(value as string))
  lng?: number;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value as string))
  page?: number = 1;

  @ApiProperty({ required: false, default: 20 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value as string))
  limit?: number = 20;
}

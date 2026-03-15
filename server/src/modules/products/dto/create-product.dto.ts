import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { ProductCategory } from '@prisma-client';

export class CreateProductDto {
  @ApiProperty({ example: 'Fresh Organic Tomatoes' })
  @IsString()
  @MaxLength(200)
  name!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiProperty({ enum: ProductCategory })
  @IsEnum(ProductCategory)
  category!: ProductCategory;

  @ApiProperty({ example: 2.5, description: 'Price per unit in USD' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  pricePerUnit!: number;

  @ApiProperty({ example: 'kg' })
  @IsString()
  unit!: string;

  @ApiProperty({ example: 500 })
  @IsInt()
  @IsPositive()
  quantityAvailable!: number;

  @ApiProperty({ required: false, example: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  minimumOrder?: number;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

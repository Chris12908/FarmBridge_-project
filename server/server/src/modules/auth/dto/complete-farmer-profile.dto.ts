import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CompleteFarmerProfileDto {
  @ApiProperty({ example: 'Sunrise Harvest Farm' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  farmName!: string;

  @ApiProperty({ example: 'Nakuru, Kenya' })
  @IsString()
  farmLocation!: string;

  @ApiProperty({ example: 'We grow organic vegetables...' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  bio?: string;

  @ApiProperty({ example: -0.303, description: 'Latitude' })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @ApiProperty({ example: 36.08, description: 'Longitude' })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @ApiProperty({ example: ['tomatoes', 'kale', 'carrots'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  crops?: string[];

  @ApiProperty({ example: ['organic', 'fresh'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

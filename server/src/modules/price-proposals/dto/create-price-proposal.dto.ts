import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePriceProposalDto {
  @ApiProperty({ example: 2.0, description: 'Proposed price per unit' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  proposedPrice!: number;

  @ApiProperty({ example: 100, description: 'Proposed quantity' })
  @IsInt()
  @IsPositive()
  proposedQuantity!: number;

  @ApiProperty({ required: false, example: 'Can you do bulk discount?' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}

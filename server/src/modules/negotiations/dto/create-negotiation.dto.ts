import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateNegotiationDto {
  @ApiProperty({ description: 'Product ID to negotiate for' })
  @IsUUID()
  productId!: string;
}

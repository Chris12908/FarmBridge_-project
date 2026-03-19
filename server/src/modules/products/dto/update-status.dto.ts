import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ListingStatus } from '@prisma-client';

export class UpdateProductStatusDto {
  @ApiProperty({
    enum: [
      ListingStatus.ACTIVE,
      ListingStatus.OUT_OF_STOCK,
      ListingStatus.DRAFT,
    ],
  })
  @IsEnum(ListingStatus)
  status!: ListingStatus;
}

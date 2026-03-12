import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { NegotiationStatus } from '@prisma-client';

export class UpdateNegotiationStatusDto {
  @ApiProperty({ enum: NegotiationStatus })
  @IsEnum(NegotiationStatus)
  status!: NegotiationStatus;
}

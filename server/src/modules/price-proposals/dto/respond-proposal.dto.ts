import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export enum ProposalAction {
  ACCEPT = 'accept',
  DECLINE = 'decline',
  COUNTER = 'counter',
}

export class RespondProposalDto {
  @ApiProperty({ enum: ProposalAction })
  @IsEnum(ProposalAction)
  action!: ProposalAction;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  counterPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  counterQuantity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  counterNote?: string;
}

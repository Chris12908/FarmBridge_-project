import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum ProposalAction {
  ACCEPT = 'accept',
  DECLINE = 'decline',
}

export class RespondProposalDto {
  @ApiProperty({ enum: ProposalAction })
  @IsEnum(ProposalAction)
  action!: ProposalAction;
}

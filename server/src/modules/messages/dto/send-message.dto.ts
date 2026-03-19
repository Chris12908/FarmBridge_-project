import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';
import { MessageType } from '@prisma-client';

export class SendMessageDto {
  @ApiProperty({ description: 'Negotiation session ID' })
  @IsUUID()
  sessionId!: string;

  @ApiProperty({ enum: MessageType, default: MessageType.TEXT })
  @IsEnum(MessageType)
  type!: MessageType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  text?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  voiceNoteUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  voiceNoteDurationSecs?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}

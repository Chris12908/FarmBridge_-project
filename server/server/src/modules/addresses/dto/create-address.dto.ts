import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: 'Home' })
  @IsString()
  @MaxLength(50)
  label!: string;

  @ApiProperty({ example: '123 Main Street' })
  @IsString()
  street!: string;

  @ApiProperty({ example: 'Nairobi' })
  @IsString()
  city!: string;

  @ApiProperty({ example: 'Nairobi County' })
  @IsString()
  state!: string;

  @ApiProperty({ example: 'Kenya' })
  @IsString()
  country!: string;

  @ApiProperty({ required: false, example: '00100' })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

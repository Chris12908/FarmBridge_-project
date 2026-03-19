import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtPayload } from '../../common/types/jwt-payload.type';
import { Role } from '@prisma-client';

@ApiTags('addresses')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.BUYER)
@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all addresses for current buyer' })
  findAll(@CurrentUser() user: JwtPayload) {
    return this.addressesService.findAll(user.sub);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new address' })
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreateAddressDto) {
    return this.addressesService.create(user.sub, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an address' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.addressesService.update(id, user.sub, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an address' })
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.addressesService.remove(id, user.sub);
  }

  @Patch(':id/default')
  @ApiOperation({ summary: 'Set address as default' })
  setDefault(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.addressesService.setDefault(id, user.sub);
  }
}

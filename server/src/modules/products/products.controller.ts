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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { JwtPayload } from '../../common/types/jwt-payload.type';
import { Role, ListingStatus } from '@prisma-client';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Search products' })
  search(@Query() query: ProductQueryDto) {
    return this.productsService.search(query);
  }

  @Public()
  @Get('featured')
  @ApiOperation({ summary: 'Get featured products (cached 5min)' })
  getFeatured() {
    return this.productsService.findFeatured();
  }

  @Public()
  @Get('autocomplete')
  @ApiOperation({ summary: 'Product name autocomplete' })
  autocomplete(@Query('q') q: string) {
    return this.productsService.autocomplete(q || '');
  }

  @Public()
  @Get('farmer/:farmerId')
  @ApiOperation({ summary: 'Get all products by a farmer' })
  findByFarmer(
    @Param('farmerId') farmerId: string,
    @Query('status') status?: ListingStatus,
  ) {
    return this.productsService.findByFarmer(farmerId, status);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get single product' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.FARMER)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create a product listing' })
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreateProductDto) {
    return this.productsService.create(user.sub, dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.FARMER)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update a product listing' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, user.sub, dto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.FARMER)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update listing status (publish/unpublish)' })
  updateStatus(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateProductStatusDto,
  ) {
    return this.productsService.updateStatus(id, user.sub, dto);
  }

  @Patch(':id/renew')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.FARMER)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Renew an expired listing (+30 days)' })
  renew(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.productsService.renew(id, user.sub);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.FARMER)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Remove a listing (sets to EXPIRED)' })
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.productsService.remove(id, user.sub);
  }
}

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto, ProductSortBy } from './dto/product-query.dto';
import { UpdateProductStatusDto } from './dto/update-status.dto';
import { ListingStatus, Prisma } from '@prisma-client';
import { Redis } from 'ioredis';

const FEATURED_CACHE_KEY = 'products:featured';
const FEATURED_CACHE_TTL = 300; // 5 min

@Injectable()
export class ProductsService {
  private redis: Redis;

  constructor(private prisma: PrismaService) {
    this.redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
  }

  async create(farmerId: string, dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        farmerId,
        name: dto.name,
        description: dto.description,
        category: dto.category,
        pricePerUnit: dto.pricePerUnit,
        unit: dto.unit,
        quantityAvailable: dto.quantityAvailable,
        minimumOrder: dto.minimumOrder ?? 1,
        images: dto.images ?? [],
        tags: dto.tags ?? [],
        status: ListingStatus.DRAFT,
      },
    });
  }

  async search(query: ProductQueryDto) {
    const {
      q,
      category,
      sort,
      minPrice,
      maxPrice,
      inStock,
      page = 1,
      limit = 20,
    } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      status: inStock
        ? ListingStatus.ACTIVE
        : { in: [ListingStatus.ACTIVE, ListingStatus.OUT_OF_STOCK] },
      ...(category && { category }),
      ...(minPrice !== undefined && { pricePerUnit: { gte: minPrice } }),
      ...(maxPrice !== undefined && {
        pricePerUnit: {
          ...(minPrice !== undefined ? { gte: minPrice } : {}),
          lte: maxPrice,
        },
      }),
      ...(q && {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { tags: { hasSome: [q.toLowerCase()] } },
        ],
      }),
    };

    const orderBy = this.buildOrderBy(sort);

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          farmer: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
              farmerProfile: {
                select: { farmName: true, farmLocation: true, rating: true },
              },
            },
          },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      items,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findFeatured() {
    const cached = await this.redis.get(FEATURED_CACHE_KEY);
    if (cached) return JSON.parse(cached) as unknown[];

    const products = await this.prisma.product.findMany({
      where: { status: ListingStatus.ACTIVE },
      orderBy: [{ viewCount: 'desc' }, { createdAt: 'desc' }],
      take: 12,
      include: {
        farmer: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            farmerProfile: {
              select: { farmName: true, rating: true, farmLocation: true },
            },
          },
        },
      },
    });

    await this.redis.setex(
      FEATURED_CACHE_KEY,
      FEATURED_CACHE_TTL,
      JSON.stringify(products),
    );
    return products;
  }

  async autocomplete(q: string) {
    const cacheKey = `products:autocomplete:${q.toLowerCase()}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached) as string[];

    const products = await this.prisma.product.findMany({
      where: {
        status: ListingStatus.ACTIVE,
        name: { contains: q, mode: 'insensitive' },
      },
      select: { name: true },
      take: 10,
    });

    const suggestions = [...new Set(products.map((p) => p.name))];
    await this.redis.setex(cacheKey, 60, JSON.stringify(suggestions));
    return suggestions;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        farmer: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            farmerProfile: true,
          },
        },
      },
    });
    if (!product) throw new NotFoundException('Product not found');

    // Increment view count (fire and forget)
    this.prisma.product
      .update({ where: { id }, data: { viewCount: { increment: 1 } } })
      .catch(() => {});

    return product;
  }

  async findByFarmer(farmerId: string, status?: ListingStatus) {
    return this.prisma.product.findMany({
      where: { farmerId, ...(status && { status }) },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, farmerId: string, dto: UpdateProductDto) {
    await this.verifyOwnership(id, farmerId);
    await this.invalidateFeaturedCache();
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async updateStatus(
    id: string,
    farmerId: string,
    dto: UpdateProductStatusDto,
  ) {
    await this.verifyOwnership(id, farmerId);

    const data: Prisma.ProductUncheckedUpdateInput = { status: dto.status };
    if (dto.status === ListingStatus.ACTIVE) {
      data.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // +30 days
    }

    await this.invalidateFeaturedCache();
    return this.prisma.product.update({ where: { id }, data });
  }

  async renew(id: string, farmerId: string) {
    const product = await this.verifyOwnership(id, farmerId);
    if (product.status !== ListingStatus.EXPIRED) {
      throw new ForbiddenException('Only expired listings can be renewed');
    }
    return this.prisma.product.update({
      where: { id },
      data: {
        status: ListingStatus.ACTIVE,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
  }

  async remove(id: string, farmerId: string) {
    await this.verifyOwnership(id, farmerId);
    await this.prisma.product.update({
      where: { id },
      data: { status: ListingStatus.EXPIRED },
    });
    return { message: 'Listing removed' };
  }

  private async verifyOwnership(id: string, farmerId: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    if (product.farmerId !== farmerId)
      throw new ForbiddenException('Not your listing');
    return product;
  }

  private buildOrderBy(sort?: ProductSortBy) {
    switch (sort) {
      case ProductSortBy.PRICE_ASC:
        return { pricePerUnit: 'asc' as const };
      case ProductSortBy.PRICE_DESC:
        return { pricePerUnit: 'desc' as const };
      case ProductSortBy.RATING:
        return { viewCount: 'desc' as const };
      case ProductSortBy.NEWEST:
      default:
        return { createdAt: 'desc' as const };
    }
  }

  private async invalidateFeaturedCache() {
    await this.redis.del(FEATURED_CACHE_KEY);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma-client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phoneNumber: true,
        avatarUrl: true,
        isVerified: true,
        createdAt: true,
        farmerProfile: true,
        buyerProfile: {
          select: { location: true, preferences: true },
        },
      },
    });
    if (!user) throw new NotFoundException('User not found');

    if (user.role === Role.BUYER) {
      const [ordersCount, negotiationsCount] = await Promise.all([
        this.prisma.order.count({ where: { buyerId: id } }),
        this.prisma.negotiationSession.count({ where: { buyerId: id } }),
      ]);
      return { ...user, ordersCount, negotiationsCount };
    }

    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const { location, ...userFields } = dto;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...userFields,
        ...(location !== undefined && {
          buyerProfile: { update: { location } },
        }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phoneNumber: true,
        avatarUrl: true,
        isVerified: true,
        updatedAt: true,
      },
    });
  }
}

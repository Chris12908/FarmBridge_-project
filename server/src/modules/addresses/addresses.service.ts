import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async create(userId: string, dto: CreateAddressDto) {
    if (dto.isDefault) {
      await this.clearDefaults(userId);
    }
    return this.prisma.address.create({ data: { ...dto, userId } });
  }

  async update(id: string, userId: string, dto: UpdateAddressDto) {
    await this.verifyOwnership(id, userId);
    if (dto.isDefault) {
      await this.clearDefaults(userId);
    }
    return this.prisma.address.update({ where: { id }, data: dto });
  }

  async remove(id: string, userId: string) {
    await this.verifyOwnership(id, userId);
    await this.prisma.address.delete({ where: { id } });
    return { message: 'Address deleted' };
  }

  async setDefault(id: string, userId: string) {
    await this.verifyOwnership(id, userId);
    await this.clearDefaults(userId);
    return this.prisma.address.update({
      where: { id },
      data: { isDefault: true },
    });
  }

  private async verifyOwnership(id: string, userId: string) {
    const address = await this.prisma.address.findUnique({ where: { id } });
    if (!address) throw new NotFoundException('Address not found');
    if (address.userId !== userId)
      throw new ForbiddenException('Not your address');
  }

  private async clearDefaults(userId: string) {
    await this.prisma.address.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });
  }
}

import { PrismaService } from '../../prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string | null;
        isDefault: boolean;
        userId: string;
    }[]>;
    create(userId: string, dto: CreateAddressDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string | null;
        isDefault: boolean;
        userId: string;
    }>;
    update(id: string, userId: string, dto: UpdateAddressDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string | null;
        isDefault: boolean;
        userId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
    setDefault(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string | null;
        isDefault: boolean;
        userId: string;
    }>;
    private verifyOwnership;
    private clearDefaults;
}

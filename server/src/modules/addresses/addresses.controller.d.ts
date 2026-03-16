import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtPayload } from '../../common/types/jwt-payload.type';
export declare class AddressesController {
    private addressesService;
    constructor(addressesService: AddressesService);
    findAll(user: JwtPayload): Promise<{
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
    create(user: JwtPayload, dto: CreateAddressDto): Promise<{
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
    update(id: string, user: JwtPayload, dto: UpdateAddressDto): Promise<{
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
    remove(id: string, user: JwtPayload): Promise<{
        message: string;
    }>;
    setDefault(id: string, user: JwtPayload): Promise<{
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
}

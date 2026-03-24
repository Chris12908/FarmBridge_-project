import axiosClient from '@/lib/axios';
import type {
  Address,
  CreateAddressDto,
  UpdateAddressDto,
} from '@/lib/types/address.types';

export const addressService = {
  async getAddresses(): Promise<Address[]> {
    const { data } = await axiosClient.get<Address[]>('/addresses');
    return data;
  },

  async createAddress(dto: CreateAddressDto): Promise<Address> {
    const { data } = await axiosClient.post<Address>('/addresses', dto);
    return data;
  },

  async updateAddress(id: string, dto: UpdateAddressDto): Promise<Address> {
    const { data } = await axiosClient.patch<Address>(`/addresses/${id}`, dto);
    return data;
  },

  async deleteAddress(id: string): Promise<void> {
    await axiosClient.delete(`/addresses/${id}`);
  },

  async setDefaultAddress(id: string): Promise<Address> {
    const { data } = await axiosClient.patch<Address>(
      `/addresses/${id}/default`
    );
    return data;
  },
};

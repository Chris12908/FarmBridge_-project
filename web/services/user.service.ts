import axiosClient from '@/lib/axios';
import type { UserProfile, UpdateUserDto } from '@/lib/types/user.types';

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const { data } = await axiosClient.get<UserProfile>('/users/profile');
    return data;
  },

  async updateProfile(dto: Partial<UpdateUserDto>): Promise<UserProfile> {
    const { data } = await axiosClient.patch<UserProfile>(
      '/users/profile',
      dto
    );
    return data;
  },
};

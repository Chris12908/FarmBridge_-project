import axiosClient from '@/lib/axios';
import type {
  FarmerProfileData,
  UpdateFarmerProfileDto,
  UserProfile,
} from '@/lib/types/user.types';

export const farmerService = {
  async getFeaturedFarmers(): Promise<FarmerProfileData[]> {
    const { data } = await axiosClient.get<FarmerProfileData[]>(
      '/farmers/featured'
    );
    return data;
  },

  async getFarmerProfile(id: string): Promise<UserProfile> {
    const { data } = await axiosClient.get<UserProfile>(`/farmers/${id}`);
    return data;
  },

  async updateFarmerProfile(
    dto: UpdateFarmerProfileDto
  ): Promise<FarmerProfileData> {
    const { data } = await axiosClient.patch<FarmerProfileData>(
      '/farmers/profile',
      dto
    );
    return data;
  },
};

import axiosClient from '@/lib/axios';
import type {
  BuyerDashboard,
  FarmerDashboard,
} from '@/lib/types/dashboard.types';

export const dashboardService = {
  async getFarmerDashboard(): Promise<FarmerDashboard> {
    const { data } = await axiosClient.get<FarmerDashboard>(
      '/dashboard/farmer'
    );
    return data;
  },

  async getBuyerDashboard(): Promise<BuyerDashboard> {
    const { data } = await axiosClient.get<BuyerDashboard>('/dashboard/buyer');
    return data;
  },
};

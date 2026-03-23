import axiosClient from '@/lib/axios';
import type { CreateReviewDto, Review } from '@/lib/types/review.types';
import type { PaginatedData } from '@/lib/types/api.types';

export const reviewService = {
  async submitReview(dto: CreateReviewDto): Promise<Review> {
    const { data } = await axiosClient.post<Review>('/reviews', dto);
    return data;
  },

  async getFarmerReviews(
    farmerId: string,
    page = 1,
    limit = 20
  ): Promise<PaginatedData<Review>> {
    const { data } = await axiosClient.get<PaginatedData<Review>>(
      `/reviews/farmer/${farmerId}?page=${page}&limit=${limit}`
    );
    return data;
  },

  async getOrderReview(orderId: string): Promise<Review> {
    const { data } = await axiosClient.get<Review>(
      `/reviews/order/${orderId}`
    );
    return data;
  },
};

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { reviewService } from '@/services/review.service';

export function useFarmerReviews(farmerId: string, page = 1, limit = 20) {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.REVIEWS.farmer(farmerId, page),
    queryFn: () => reviewService.getFarmerReviews(farmerId, page, limit),
    enabled: !!farmerId,
  });

  return {
    reviews: data?.items ?? [],
    pagination: data?.pagination,
    isLoading,
    error,
  };
}

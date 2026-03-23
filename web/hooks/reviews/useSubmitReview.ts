import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { reviewService } from '@/services/review.service';
import type { CreateReviewDto } from '@/lib/types/review.types';

export function useSubmitReview(farmerId?: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (dto: CreateReviewDto) => reviewService.submitReview(dto),
    onSuccess: () => {
      if (farmerId) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.REVIEWS.farmer(farmerId),
        });
      }
    },
  });

  return {
    submitReview: mutation.mutate,
    submitReviewAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { farmerService } from '@/services/farmer.service';

export function useFeaturedFarmers() {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.FARMERS.featured,
    queryFn: farmerService.getFeaturedFarmers,
    staleTime: 5 * 60 * 1000,
  });

  return { farmers: data ?? [], isLoading, error };
}

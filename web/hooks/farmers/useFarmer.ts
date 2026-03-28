import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { farmerService } from '@/services/farmer.service';

export function useFarmer(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.FARMERS.detail(id),
    queryFn: () => farmerService.getFarmerProfile(id),
    enabled: !!id,
  });

  return { farmer: data, isLoading, error };
}

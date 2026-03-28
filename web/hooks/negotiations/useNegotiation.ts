import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { negotiationService } from '@/services/negotiation.service';

export function useNegotiation(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.NEGOTIATIONS.detail(id),
    queryFn: () => negotiationService.getNegotiation(id),
    enabled: !!id,
  });

  return { session: data, isLoading, error };
}

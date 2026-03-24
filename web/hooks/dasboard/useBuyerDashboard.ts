import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { dashboardService } from '@/services/dashboard.service';

export function useBuyerDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.buyer,
    queryFn: dashboardService.getBuyerDashboard,
    refetchInterval: 30_000,
  });

  return { dashboard: data, isLoading, error };
}

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { dashboardService } from '@/services/dashboard.service';

export function useFarmerDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.farmer,
    queryFn: dashboardService.getFarmerDashboard,
    refetchInterval: 30_000, // auto-refresh every 30s
  });

  return { dashboard: data, isLoading, error };
}

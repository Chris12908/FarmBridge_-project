import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { orderService } from '@/services/order.service';
import { chatService } from '@/services/chat.service';
import type { OrderQueryParams } from '@/lib/types/order.types';

export function useOrders(params?: OrderQueryParams) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.ORDERS.list(params as Record<string, unknown>),
    queryFn: () => orderService.listOrders(params),
  });

  // Refresh list when any order status changes
  useEffect(() => {
    const cleanup = chatService.onOrderStatusChanged(() => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.all });
    });
    return cleanup;
  }, [queryClient]);

  return {
    orders: data?.items ?? [],
    pagination: data?.pagination,
    isLoading,
    error,
  };
}

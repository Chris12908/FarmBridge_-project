import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { productService } from '@/services/product.service';
import type { ProductQueryParams } from '@/lib/types/product.types';

export function useProducts(query: ProductQueryParams = {}) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.list(query as Record<string, unknown>),
    queryFn: () => productService.searchProducts(query),
  });

  return {
    products: data?.items ?? [],
    pagination: data?.pagination,
    isLoading,
    error,
    refetch,
  };
}

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { productService } from '@/services/product.service';

export function useProduct(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.detail(id),
    queryFn: () => productService.getProduct(id),
    enabled: !!id,
  });

  return { product: data, isLoading, error };
}

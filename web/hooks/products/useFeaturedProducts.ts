import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { productService } from '@/services/product.service';

export function useFeaturedProducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.featured,
    queryFn: productService.getFeaturedProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes — matches server cache
  });

  return { products: data ?? [], isLoading, error };
}

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { productService } from '@/services/product.service';
import type { ListingStatus } from '@/lib/types/product.types';

export function useFarmerProducts(farmerId: string, status?: ListingStatus) {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.farmerProducts(farmerId, status),
    queryFn: () => productService.getFarmerProducts(farmerId, status),
    enabled: !!farmerId,
  });

  return { products: data ?? [], isLoading, error };
}

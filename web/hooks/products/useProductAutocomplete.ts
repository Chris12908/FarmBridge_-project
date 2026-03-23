import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { productService } from '@/services/product.service';
import { useDebounce } from '@/hooks/shared/useDebounce';

export function useProductAutocomplete(q: string) {
  const debouncedQ = useDebounce(q, 300);

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.autocomplete(debouncedQ),
    queryFn: () => productService.autocomplete(debouncedQ),
    enabled: debouncedQ.length >= 2,
  });

  return { suggestions: data ?? [], isLoading };
}

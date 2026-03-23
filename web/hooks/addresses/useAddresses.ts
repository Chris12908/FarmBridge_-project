import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { addressService } from '@/services/address.service';

export function useAddresses() {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.ADDRESSES.all,
    queryFn: addressService.getAddresses,
  });

  return { addresses: data ?? [], isLoading, error };
}

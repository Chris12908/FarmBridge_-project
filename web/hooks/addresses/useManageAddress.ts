import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { addressService } from '@/services/address.service';
import type {
  CreateAddressDto,
  UpdateAddressDto,
} from '@/lib/types/address.types';

export function useManageAddress() {
  const queryClient = useQueryClient();

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADDRESSES.all });
  }

  const create = useMutation({
    mutationFn: (dto: CreateAddressDto) => addressService.createAddress(dto),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateAddressDto }) =>
      addressService.updateAddress(id, dto),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) => addressService.deleteAddress(id),
    onSuccess: invalidate,
  });

  const setDefault = useMutation({
    mutationFn: (id: string) => addressService.setDefaultAddress(id),
    onSuccess: invalidate,
  });

  return { create, update, remove, setDefault };
}

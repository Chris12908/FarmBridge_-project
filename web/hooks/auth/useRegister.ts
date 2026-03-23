import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { useAuthContext } from '@/providers/AuthProvider';
import type {
  RegisterBuyerDto,
  RegisterFarmerDto,
} from '@/lib/types/auth.types';

export function useBuyerRegister() {
  const { setUser } = useAuthContext();

  const mutation = useMutation({
    mutationFn: (dto: RegisterBuyerDto) => authService.registerBuyer(dto),
    onSuccess: (data) => {
      setUser(data.user);
    },
  });

  return {
    register: mutation.mutate,
    registerAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}

export function useFarmerRegister() {
  const { setUser } = useAuthContext();

  // Farmer is logged in after registration but goes to Step 2 (profile completion)
  // before reaching the dashboard.
  const mutation = useMutation({
    mutationFn: (dto: RegisterFarmerDto) => authService.registerFarmer(dto),
    onSuccess: (data) => {
      setUser(data.user);
    },
  });

  return {
    register: mutation.mutate,
    registerAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
}

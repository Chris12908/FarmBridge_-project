import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import type { ResetPasswordDto } from '@/lib/types/auth.types';

export function useForgotPassword() {
  const mutation = useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
  });

  return {
    forgotPassword: mutation.mutate,
    forgotPasswordAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}

export function useResetPassword() {
  const mutation = useMutation({
    mutationFn: (dto: ResetPasswordDto) => authService.resetPassword(dto),
  });

  return {
    resetPassword: mutation.mutate,
    resetPasswordAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}

import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { useAuthContext } from '@/providers/AuthProvider';
import type { LoginDto } from '@/lib/types/auth.types';

export function useLogin() {
  const { setUser } = useAuthContext();

  const mutation = useMutation({
    mutationFn: (dto: LoginDto) => authService.login(dto),
    onSuccess: async (data) => {
      if (!data.user?.role) {
        throw new Error('Login response missing user or role');
      }
      // Fetch the full user profile before setting auth state. This ensures
      // isAuthenticated=true only fires once, with the complete user object
      // (including farmerProfile.profileComplete) already in context — so the
      // login page can make the correct role-specific redirect in one render.
      try {
        const fullUser = await authService.getMe();
        setUser(fullUser);
      } catch {
        // Fallback: token is fresh so getMe() should not fail, but be safe.
        setUser(data.user);
      }
    },
  });

  return {
    login: mutation.mutate,
    loginAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
}

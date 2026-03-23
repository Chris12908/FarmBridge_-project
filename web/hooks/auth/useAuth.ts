import { useAuthContext } from '@/providers/AuthProvider';
import { Role } from '@/lib/types/auth.types';

export function useAuth() {
  const ctx = useAuthContext();

  return {
    ...ctx,
    isBuyer: ctx.role === Role.BUYER,
    isFarmer: ctx.role === Role.FARMER,
    isAdmin: ctx.role === undefined || false,
  };
}

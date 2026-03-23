'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { setTokenPair, setStoredUser, setUserRole } from '@/lib/tokens';
import { useAuthContext } from '@/providers/AuthProvider';
import { Role } from '@/lib/types/auth.types';

export default function AuthCallbackPage() {
  const router = useRouter();
  const { setUser } = useAuthContext();

  useEffect(() => {
    async function handleCallback() {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get('accessToken');
      const refreshToken = params.get('refreshToken');

      if (!accessToken || !refreshToken) {
        router.replace('/auth/login?error=oauth_failed');
        return;
      }

      setTokenPair({ accessToken, refreshToken });

      try {
        const user = await authService.getMe();
        setStoredUser(user);
        setUserRole(user.role as Role);
        setUser(user);

        if (user.role === 'FARMER') {
          router.replace('/farmer/dashboard');
        } else {
          router.replace('/buyer/marketplace');
        }
      } catch {
        router.replace('/auth/login?error=oauth_failed');
      }
    }

    handleCallback();
  }, [router, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-text-muted font-medium">Signing you in...</p>
      </div>
    </div>
  );
}

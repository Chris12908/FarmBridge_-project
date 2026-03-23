'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  clearTokens,
  getAccessToken,
  getStoredUser,
  getUserRole,
  setStoredUser,
  setUserRole,
} from '@/lib/tokens';
import { authService } from '@/services/auth.service';
import type { UserProfile } from '@/lib/types/user.types';
import { Role } from '@/lib/types/auth.types';

// ─── Context Shape ────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: UserProfile | null;
  role: Role | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: UserProfile) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hydrate instantly from localStorage (no network round-trip)
    const storedUser = getStoredUser();
    const storedRole = getUserRole();

    if (storedUser && storedRole) {
      setUserState(storedUser);
      setRole(storedRole);
    }

    // No token → definitely not authenticated, skip the server call entirely.
    // Calling getMe() without a token always returns 401, which the axios
    // interceptor converts into a hard page redirect — causing an infinite loop.
    const token = getAccessToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    // Verify the stored session is still valid with a fresh /auth/me call
    authService
      .getMe()
      .then((freshUser) => {
        setUserState(freshUser);
        setRole(freshUser.role);
        setStoredUser(freshUser);
        setUserRole(freshUser.role);
      })
      .catch(() => {
        // 401 means tokens are invalid — clear everything
        if (storedUser) {
          clearTokens();
          setUserState(null);
          setRole(null);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function setUser(newUser: UserProfile) {
    if (!newUser) return;
    if (!newUser.role) {
      console.error('setUser: user.role is missing', newUser);
      return;
    }
    setUserState(newUser);
    setRole(newUser.role);
    setStoredUser(newUser);
    setUserRole(newUser.role);
  }

  function clearAuth() {
    clearTokens();
    setUserState(null);
    setRole(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        isLoading,
        setUser,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used inside <AuthProvider>');
  }
  return ctx;
}

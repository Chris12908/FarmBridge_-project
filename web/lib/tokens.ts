import { TOKEN_KEYS } from './constants';
import type { TokenPair } from './types/auth.types';
import { Role } from './types/auth.types';
import type { UserProfile } from './types/user.types';

// ─── SSR Guard ────────────────────────────────────────────────────────────────

const isBrowser = () => typeof window !== 'undefined';

// ─── Access Token ─────────────────────────────────────────────────────────────

export function getAccessToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(TOKEN_KEYS.ACCESS);
}

export function setAccessToken(token: string): void {
  if (!isBrowser()) return;
  localStorage.setItem(TOKEN_KEYS.ACCESS, token);
}

// ─── Refresh Token ────────────────────────────────────────────────────────────

export function getRefreshToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(TOKEN_KEYS.REFRESH);
}

export function setRefreshToken(token: string): void {
  if (!isBrowser()) return;
  localStorage.setItem(TOKEN_KEYS.REFRESH, token);
}

// ─── Token Pair ───────────────────────────────────────────────────────────────

export function setTokenPair({ accessToken, refreshToken }: TokenPair): void {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
}

// ─── Clear All ────────────────────────────────────────────────────────────────

export function clearTokens(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(TOKEN_KEYS.ACCESS);
  localStorage.removeItem(TOKEN_KEYS.REFRESH);
  localStorage.removeItem(TOKEN_KEYS.USER);
  localStorage.removeItem(TOKEN_KEYS.ROLE);
  clearRoleCookie();
}

// ─── User ─────────────────────────────────────────────────────────────────────

export function getStoredUser(): UserProfile | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(TOKEN_KEYS.USER);
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: UserProfile): void {
  if (!isBrowser()) return;
  localStorage.setItem(TOKEN_KEYS.USER, JSON.stringify(user));
}

// ─── Role ─────────────────────────────────────────────────────────────────────

export function getUserRole(): Role | null {
  if (!isBrowser()) return null;
  const role = localStorage.getItem(TOKEN_KEYS.ROLE);
  return role as Role | null;
}

export function setUserRole(role: Role): void {
  if (!isBrowser()) return;
  localStorage.setItem(TOKEN_KEYS.ROLE, role);
  setRoleCookie(role);
}

// ─── Role Cookie (for Next.js middleware) ─────────────────────────────────────

export function setRoleCookie(role: Role): void {
  if (!isBrowser()) return;
  // Non-httpOnly cookie so middleware can read it
  document.cookie = `fb_role=${role}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
}

export function clearRoleCookie(): void {
  if (!isBrowser()) return;
  document.cookie = 'fb_role=; path=/; max-age=0; SameSite=Lax';
}

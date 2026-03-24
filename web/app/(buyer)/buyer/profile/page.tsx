'use client';

import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/useAuth';
import { useAuthContext } from '@/providers/AuthProvider';
import { authService } from '@/services/auth.service';
import { routes } from '@/lib/routes';
import { getInitials, formatDate } from '@/lib/utils';
import { getRefreshToken } from '@/lib/tokens';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const SETTINGS_ITEMS = [
  { icon: 'person', label: 'Edit Profile', href: '/buyer/settings' },
  { icon: 'location_on', label: 'My Addresses', href: '/buyer/settings' },
  { icon: 'notifications_active', label: 'Notification Preferences', href: '#' },
  { icon: 'help', label: 'Help & Support', href: '#' },
  { icon: 'gavel', label: 'Terms & Privacy', href: '#' },
];

export default function BuyerProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { clearAuth } = useAuthContext();

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(getRefreshToken() ?? ''),
    onSuccess: () => {
      clearAuth();
      router.push(routes.auth.login());
    },
    onError: () => {
      clearAuth();
      router.push(routes.auth.login());
    },
  });

  if (!user) return null;

  const initials = getInitials(user.name);

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="text-lg font-black text-slate-800 mb-6">Profile</h1>

      {/* Profile header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative mb-4">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-neutral-sage"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-neutral-sage flex items-center justify-center">
              <span className="text-primary text-3xl font-black">{initials}</span>
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
        <p className="text-sm text-text-muted">{user.email}</p>
        {user.phoneNumber && (
          <p className="text-xs text-text-muted mt-1">{user.phoneNumber}</p>
        )}
        <div className="flex items-center gap-1 mt-2">
          {user.isVerified ? (
            <span className="text-xs font-semibold text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Verified Account
            </span>
          ) : (
            <span className="text-xs text-text-muted">Unverified</span>
          )}
        </div>
        <div className="flex gap-4 mt-4">
          <div className="text-center">
            <p className="text-xs text-text-muted">Member since</p>
            <p className="text-sm font-bold text-slate-700">{formatDate(user.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Settings list */}
      <div className="bg-white rounded-2xl border border-primary/10 shadow-sm overflow-hidden mb-4">
        {SETTINGS_ITEMS.map((item, idx) => (
          <div key={item.label}>
            <Link
              href={item.href}
              className="flex items-center gap-3 px-5 py-4 hover:bg-neutral-sage/50 transition-colors"
            >
              <div className="w-9 h-9 bg-neutral-sage rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[18px]">{item.icon}</span>
              </div>
              <span className="text-sm font-medium text-slate-700 flex-1">{item.label}</span>
              <span className="material-symbols-outlined text-text-muted text-[18px]">chevron_right</span>
            </Link>
            {idx < SETTINGS_ITEMS.length - 1 && <Separator className="mx-5" />}
          </div>
        ))}
      </div>

      {/* Sign out */}
      <Button
        variant="outline"
        className="w-full h-11 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 rounded-xl"
        onClick={() => logoutMutation.mutate()}
        disabled={logoutMutation.isPending}
      >
        <span className="material-symbols-outlined text-[18px] mr-2">logout</span>
        {logoutMutation.isPending ? 'Signing out...' : 'Sign Out'}
      </Button>

      <p className="text-center text-xs text-text-muted mt-6">
        Farm Bridge · Version 1.0.0
      </p>
    </div>
  );
}

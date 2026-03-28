'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import StarRating from '@/components/ui/shared/StarRating';
import { SkeletonCard } from '@/components/ui/shared/SkeletonCard';
import { useAuth } from '@/hooks/auth/useAuth';
import { useAuthContext } from '@/providers/AuthProvider';
import { authService } from '@/services/auth.service';
import { getRefreshToken } from '@/lib/tokens';
import { routes } from '@/lib/routes';
import { getInitials, formatDate } from '@/lib/utils';

const QUICK_LINKS = [
  { icon: 'settings', label: 'Settings', href: '/farmer/settings' },
  { icon: 'store', label: 'My Listings', href: '/farmer/listings' },
  { icon: 'receipt_long', label: 'Orders', href: '/farmer/orders' },
  { icon: 'notifications_active', label: 'Notifications', href: '/farmer/notifications' },
  { icon: 'help', label: 'Help & Support', href: '#' },
  { icon: 'gavel', label: 'Terms & Privacy', href: '#' },
];

export default function FarmerProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { clearAuth } = useAuthContext();
  const farmerProfile = user?.farmerProfile;

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(getRefreshToken() ?? ''),
    onSuccess: () => {
      clearAuth();
      router.push(routes.auth.login());
    },
    onError: () => {
      // Clear tokens even on error
      clearAuth();
      router.push(routes.auth.login());
    },
  });

  if (!user) {
    return (
      <div className="max-w-lg mx-auto px-4 py-6">
        <SkeletonCard variant="farmer" />
      </div>
    );
  }

  const initials = getInitials(user.name);
  const memberYear = user.createdAt ? new Date(user.createdAt).getFullYear().toString() : '—';

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="text-lg font-black text-slate-800 mb-6">Profile</h1>

      {/* Farm cover */}
      <div className="relative rounded-2xl overflow-hidden h-32 mb-4 bg-gradient-to-br from-primary/20 via-primary/10 to-accent-amber/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-primary/30 text-6xl">landscape</span>
        <Link
          href="/farmer/settings"
          className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-xs font-semibold text-slate-700 px-3 py-1.5 rounded-full flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[14px]">edit</span>
          Edit Profile
        </Link>
      </div>

      {/* Avatar + name */}
      <div className="flex items-end gap-4 -mt-10 mb-5 px-1">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-background-light shadow-lg shrink-0 bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
          {user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-black text-primary">{initials}</span>
          )}
        </div>
        <div className="flex-1 pb-1">
          <div className="flex items-center gap-1.5">
            <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
            {farmerProfile?.verificationStatus === 'VERIFIED' && (
              <span className="material-symbols-outlined fill-1 text-primary text-[18px]">verified</span>
            )}
          </div>
          <p className="text-sm text-text-muted">{farmerProfile?.farmName ?? 'Farmer'}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {farmerProfile?.farmLocation && (
          <>
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              {farmerProfile.farmLocation}
            </span>
            <span className="text-text-muted">·</span>
          </>
        )}
        <StarRating rating={farmerProfile?.rating ?? 0} reviewCount={farmerProfile?.reviewCount ?? 0} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-neutral-sage/50 rounded-xl p-3 text-center">
          <p className="text-xl font-black text-primary">{farmerProfile?.completedOrderCount ?? 0}</p>
          <p className="text-[10px] text-text-muted">Orders</p>
        </div>
        <div className="bg-neutral-sage/50 rounded-xl p-3 text-center">
          <p className="text-xl font-black text-primary">{farmerProfile?.rating?.toFixed(1) ?? '—'}</p>
          <p className="text-[10px] text-text-muted">Rating</p>
        </div>
        <div className="bg-neutral-sage/50 rounded-xl p-3 text-center">
          <p className="text-xl font-black text-primary">{memberYear}</p>
          <p className="text-[10px] text-text-muted">Since</p>
        </div>
      </div>

      {/* Tags */}
      {farmerProfile?.tags && farmerProfile.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {farmerProfile.tags.map((tag) => (
            <span key={tag} className="text-xs bg-white border border-primary/10 text-slate-600 px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Bio */}
      {farmerProfile?.bio && (
        <p className="text-sm text-slate-600 leading-relaxed mb-5">{farmerProfile.bio}</p>
      )}

      {/* Quick links */}
      <div className="bg-white rounded-2xl border border-primary/10 shadow-sm overflow-hidden mb-4">
        {QUICK_LINKS.map((item, idx) => (
          <div key={item.label}>
            <Link href={item.href} className="flex items-center gap-3 px-5 py-4 hover:bg-neutral-sage/50 transition-colors">
              <div className="w-9 h-9 bg-neutral-sage rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[18px]">{item.icon}</span>
              </div>
              <span className="text-sm font-medium text-slate-700 flex-1">{item.label}</span>
              <span className="material-symbols-outlined text-text-muted text-[18px]">chevron_right</span>
            </Link>
            {idx < QUICK_LINKS.length - 1 && <Separator className="mx-5" />}
          </div>
        ))}
      </div>

      {/* Switch to buyer */}
      <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-blue-600 text-2xl">shopping_basket</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-800">Switch to Buyer Mode</p>
            <p className="text-xs text-text-muted">Browse the marketplace as a buyer</p>
          </div>
          <Link href="/buyer/marketplace">
            <Button variant="outline" className="text-xs h-8 border-blue-200 text-blue-600">Switch</Button>
          </Link>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full h-11 border-red-200 text-red-500 hover:bg-red-50 rounded-xl"
        onClick={() => logoutMutation.mutate()}
        disabled={logoutMutation.isPending}
      >
        <span className="material-symbols-outlined text-[18px] mr-2">logout</span>
        {logoutMutation.isPending ? 'Signing out...' : 'Sign Out'}
      </Button>

      <p className="text-center text-xs text-text-muted mt-6">AgriConnect · Version 1.0.0</p>
    </div>
  );
}

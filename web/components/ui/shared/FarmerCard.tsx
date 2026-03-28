import Link from 'next/link';
import type { FarmerProfileData } from '@/lib/types/user.types';
import StarRating from './StarRating';
import { getInitials } from '@/lib/utils';

interface FarmerCardProps {
  farmer: FarmerProfileData;
}

export default function FarmerCard({ farmer }: FarmerCardProps) {
  const isVerified = farmer.verificationStatus === 'VERIFIED';
  const initials = getInitials(farmer.farmName);

  return (
    <Link href={`/buyer/farmer/${farmer.id}`} className="block group">
      <div className="bg-white rounded-2xl border border-primary/10 shadow-sm overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all">
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary/30 text-6xl">agriculture</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-accent-amber text-sm">star</span>
            <span className="text-xs font-bold text-slate-800">{farmer.rating.toFixed(1)}</span>
          </div>
          {isVerified && (
            <div className="absolute top-3 left-3 bg-primary/90 text-white rounded-full px-2.5 py-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span className="text-xs font-semibold">Verified</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border-2 border-neutral-sage">
              <span className="text-primary text-xs font-bold">{initials}</span>
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-800 text-sm truncate">{farmer.farmName}</h3>
              <p className="text-xs text-text-muted flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">location_on</span>
                {farmer.farmLocation}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {farmer.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium bg-neutral-sage text-primary px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <StarRating rating={farmer.rating} reviewCount={farmer.reviewCount} />
        </div>
      </div>
    </Link>
  );
}

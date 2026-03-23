'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useFarmer } from '@/hooks/farmers/useFarmer';
import { useFarmerProducts } from '@/hooks/products/useFarmerProducts';
import { useFarmerReviews } from '@/hooks/reviews/useFarmerReviews';
import { ListingStatus } from '@/lib/types/product.types';
import { getInitials, formatDate, formatRelativeTime } from '@/lib/utils';
import AppHeader from '@/components/ui/shared/AppHeader';
import StarRating from '@/components/ui/shared/StarRating';
import ProductCard from '@/components/ui/shared/ProductCard';
import { ReviewForm } from '@/components/ui/shared/ReviewForm';
import { SkeletonCard } from '@/components/ui/shared/SkeletonCard';

export default function FarmerProfilePage() {
  const params = useParams();
  const farmerId = params.farmerId as string;

  const { farmer: userProfile, isLoading } = useFarmer(farmerId);
  const farmerProfile = userProfile?.farmerProfile;

  const { products, isLoading: productsLoading } = useFarmerProducts(
    farmerId,
    ListingStatus.ACTIVE
  );

  const { reviews, isLoading: reviewsLoading } = useFarmerReviews(farmerId);

  if (isLoading) {
    return (
      <div>
        <AppHeader backHref="/buyer/marketplace" />
        <div className="px-4 max-w-2xl lg:max-w-4xl mx-auto pt-6">
          <div className="animate-pulse space-y-4">
            <div className="h-48 bg-slate-200 rounded-2xl" />
            <div className="h-8 bg-slate-200 rounded w-1/2" />
            <div className="h-4 bg-slate-200 rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!userProfile || !farmerProfile) return null;

  const isVerified = farmerProfile.verificationStatus === 'VERIFIED';
  const initials = getInitials(farmerProfile.farmName);

  return (
    <div>
      <AppHeader backHref="/buyer/marketplace" />

      {/* Farm hero gradient */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/30 to-primary/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary/20 text-[120px]">agriculture</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="px-4 max-w-2xl lg:max-w-4xl mx-auto">
        {/* Farmer header */}
        <div className="flex items-end gap-4 -mt-8 mb-5 relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 border-4 border-white shadow-lg flex items-center justify-center shrink-0">
            <span className="text-primary text-2xl font-black">{initials}</span>
          </div>
          <div className="flex-1 min-w-0 pb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-black text-white drop-shadow">{farmerProfile.farmName}</h1>
              {isVerified && (
                <span className="bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">verified</span> Verified
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="flex items-center gap-4 text-sm text-text-muted mb-3 flex-wrap">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-primary text-[16px]">location_on</span>
              {farmerProfile.farmLocation}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-primary text-[16px]">calendar_today</span>
              Member since {formatDate(userProfile.createdAt)}
            </span>
          </div>
          <StarRating rating={farmerProfile.rating} reviewCount={farmerProfile.reviewCount} size="md" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white rounded-xl border border-primary/10 p-4 text-center">
            <p className="text-2xl font-black text-primary">{farmerProfile.completedOrderCount}</p>
            <p className="text-xs text-text-muted">Completed Orders</p>
          </div>
          <div className="bg-white rounded-xl border border-primary/10 p-4 text-center">
            <p className="text-2xl font-black text-primary">{products.length}</p>
            <p className="text-xs text-text-muted">Active Listings</p>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-neutral-sage/50 rounded-2xl p-4 mb-5">
          <h2 className="font-semibold text-slate-800 mb-2">About the Farm</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {farmerProfile.bio ?? 'No description available.'}
          </p>
          {farmerProfile.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {farmerProfile.tags.map((tag) => (
                <span key={tag} className="text-xs bg-white border border-primary/10 text-slate-600 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Crops */}
        {farmerProfile.crops.length > 0 && (
          <div className="mb-5">
            <h2 className="font-semibold text-slate-800 mb-2">What they grow</h2>
            <div className="flex flex-wrap gap-2">
              {farmerProfile.crops.map((crop) => (
                <span key={crop} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  {crop}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Products */}
        <section className="mb-8">
          <h2 className="font-bold text-slate-800 mb-4">
            Active Listings
            <span className="ml-2 text-xs font-normal text-text-muted">({productsLoading ? '...' : products.length})</span>
          </h2>
          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SkeletonCard variant="product" count={4} />
            </div>
          ) : products.length === 0 ? (
            <p className="text-sm text-text-muted text-center py-8">No active listings at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} variant="list" />
              ))}
            </div>
          )}
        </section>

        {/* Reviews */}
        <section className="mb-5">
          <h2 className="font-semibold text-slate-800 mb-3">
            Reviews ({farmerProfile.reviewCount})
          </h2>
          {reviewsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SkeletonCard variant="product" count={2} />
            </div>
          ) : reviews.length === 0 ? (
            <p className="text-sm text-text-muted py-4 text-center">No reviews yet.</p>
          ) : (
            <div className="space-y-3">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl border border-primary/10 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary text-xs font-bold">
                        {getInitials(review.reviewer?.name ?? 'U')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800">{review.reviewer?.name ?? 'Buyer'}</p>
                      <p className="text-xs text-text-muted">{formatRelativeTime(review.createdAt)}</p>
                    </div>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  {review.comment && (
                    <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Leave a review */}
        <section className="mb-8">
          <h2 className="font-bold text-slate-800 mb-4">Leave a Review</h2>
          <ReviewForm farmerId={farmerId} />
        </section>
      </div>
    </div>
  );
}

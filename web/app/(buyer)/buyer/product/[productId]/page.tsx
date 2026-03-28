'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { useProduct } from '@/hooks/products/useProduct';
import { useFarmerProducts } from '@/hooks/products/useFarmerProducts';
import { useStartNegotiation } from '@/hooks/negotiations/useStartNegotiation';
import { formatCurrency } from '@/lib/utils';
import { ListingStatus } from '@/lib/types/product.types';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import StarRating from '@/components/ui/shared/StarRating';
import ProductCard from '@/components/ui/shared/ProductCard';
import AppHeader from '@/components/ui/shared/AppHeader';
import { SkeletonCard } from '@/components/ui/shared/SkeletonCard';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.productId as string;

  const { product, isLoading } = useProduct(productId);
  const { products: moreProducts } = useFarmerProducts(
    product?.farmerId ?? '',
  );
  const { startNegotiation, isPending: isStartingChat } = useStartNegotiation();

  if (isLoading) {
    return (
      <div>
        <AppHeader backHref="/buyer/marketplace" />
        <div className="px-4 py-5 max-w-2xl lg:max-w-5xl mx-auto">
          <div className="animate-pulse">
            <div className="aspect-4/3 bg-slate-200 rounded-2xl mb-5" />
            <div className="h-8 bg-slate-200 rounded w-2/3 mb-3" />
            <div className="h-6 bg-slate-200 rounded w-1/3 mb-4" />
            <div className="h-24 bg-slate-200 rounded mb-4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const farmerUser = product.farmer;
  const farmer = product.farmer?.farmerProfile;
  const relatedProducts = moreProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div>
      <AppHeader backHref="/buyer/marketplace" />

      <div className="px-4 py-5 max-w-2xl lg:max-w-5xl mx-auto">
        {/* Image gallery */}
        <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-5">
          <Image
            src={product.images[0] ?? '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-slate-600 text-[18px]">share</span>
            </button>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className={cn(
                'text-xs font-semibold px-2.5 py-1 rounded-full',
                product.status === ListingStatus.ACTIVE
                  ? 'bg-primary/10 text-primary'
                  : 'bg-slate-100 text-slate-600'
              )}>
                {product.status === ListingStatus.ACTIVE ? 'In Stock' : 'Out of Stock'}
              </span>
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs font-medium bg-neutral-sage text-slate-600 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Product info */}
            <h1 className="text-2xl font-black text-slate-800 mb-3">{product.name}</h1>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-black text-primary">
                {formatCurrency(product.pricePerUnit)}
              </span>
              <span className="text-text-muted text-sm">/{product.unit}</span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">{product.description}</p>

            <div className="flex items-center gap-4 text-sm text-slate-600 mb-5">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">inventory</span>
                <span>
                  <strong>{product.quantityAvailable}</strong> {product.unit} available
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">shopping_bag</span>
                <span>Min. order <strong>{product.minimumOrder}</strong> {product.unit}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <Button
                onClick={() => startNegotiation(productId)}
                disabled={isStartingChat}
                className="flex-1 h-12 text-base font-bold rounded-xl gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                {isStartingChat ? 'Starting chat…' : 'Negotiate & Chat'}
              </Button>
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            {/* Farmer card */}
            {farmerUser && farmer && (
              <div className="bg-neutral-sage/50 rounded-2xl p-4 mb-6">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                  Sold by
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center border-2 border-white shadow-sm shrink-0">
                    <span className="text-primary font-bold text-lg">
                      {farmer.farmName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800">{farmer.farmName}</p>
                    <p className="text-xs text-text-muted flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">location_on</span>
                      {farmer.farmLocation}
                    </p>
                    <StarRating rating={farmer.rating} reviewCount={farmer.reviewCount} />
                  </div>
                  <Link
                    href={`/buyer/farmer/${product.farmerId}`}
                    className="text-xs font-semibold text-primary underline"
                  >
                    Profile
                  </Link>
                </div>
              </div>
            )}

            {/* Farmer bio */}
            {farmer?.bio && (
              <div className="mb-6">
                <h2 className="font-bold text-slate-800 mb-2">About {farmer.farmName}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{farmer.bio}</p>
                {farmer.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {farmer.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-white border border-primary/10 text-slate-600 px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* More from this farmer */}
        {relatedProducts.length > 0 && (
          <section className="mt-8 pt-6 border-t border-primary/10">
            <h2 className="font-bold text-slate-800 mb-4">
              More from {farmer?.farmName ?? 'this farmer'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} variant="compact" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

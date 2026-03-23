import Image from 'next/image';
import Link from 'next/link';
import { cn, formatCurrency } from '@/lib/utils';
import { ListingStatus } from '@/lib/types/product.types';
import type { Product } from '@/lib/types/product.types';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list' | 'compact';
  showFarmerActions?: boolean;
}

export default function ProductCard({
  product,
  variant = 'grid',
  showFarmerActions = false,
}: ProductCardProps) {
  const primaryImage = product.images[0] ?? '/placeholder-product.jpg';
  const productHref = showFarmerActions
    ? `/farmer/listing/${product.id}/edit`
    : `/buyer/product/${product.id}`;

  const farmerName = product.farmer?.farmerProfile?.farmName ?? '';
  const farmerLocation = product.farmer?.farmerProfile?.farmLocation ?? '';
  const farmerRating = product.farmer?.farmerProfile?.rating ?? 0;

  if (variant === 'list') {
    return (
      <Link href={productHref} className="block">
        <div className="bg-white rounded-xl border border-primary/10 shadow-sm p-4 flex gap-4 hover:shadow-md hover:border-primary/20 transition-all">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-800 text-sm truncate">{product.name}</h3>
                <p className="text-xs text-text-muted truncate">
                  {farmerName}{farmerLocation ? ` · ${farmerLocation}` : ''}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-black text-primary">
                  {formatCurrency(product.pricePerUnit)}
                </p>
                <p className="text-xs text-text-muted">per {product.unit}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 flex-wrap">
                <StarRating rating={farmerRating} />
                <span className="text-xs text-text-muted">
                  {product.quantityAvailable} {product.unit} avail.
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="material-symbols-outlined text-text-muted text-[20px]">
              chevron_right
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={productHref} className="block group">
        <div className="bg-white rounded-xl border border-primary/10 shadow-sm overflow-hidden hover:shadow-md hover:border-primary/20 transition-all">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, 150px"
            />
          </div>
          <div className="p-2.5">
            <p className="text-sm font-semibold text-slate-800 truncate">{product.name}</p>
            <p className="text-xs font-bold text-primary mt-0.5">
              {formatCurrency(product.pricePerUnit)}/{product.unit}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  // grid variant (default)
  return (
    <div className="bg-white rounded-xl border border-primary/10 shadow-sm overflow-hidden hover:shadow-md hover:border-primary/20 transition-all group">
      <Link href={productHref}>
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute top-2 left-2">
            <span
              className={cn(
                'text-xs font-semibold px-2 py-1 rounded-full',
                product.status === ListingStatus.ACTIVE
                  ? 'bg-primary/90 text-white'
                  : 'bg-slate-700/90 text-white'
              )}
            >
              {product.status === ListingStatus.ACTIVE ? 'Active' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-3">
        <Link href={productHref}>
          <h3 className="font-semibold text-slate-800 text-sm mb-1 truncate hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-lg font-black text-primary">
            {formatCurrency(product.pricePerUnit)}
            <span className="text-xs font-medium text-text-muted">/{product.unit}</span>
          </p>
          <span className="text-xs text-text-muted">
            {product.quantityAvailable} {product.unit}
          </span>
        </div>
        {showFarmerActions && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-primary/5">
            <Link
              href={`/farmer/listing/${product.id}/edit`}
              className="flex-1 text-center text-xs font-medium text-primary bg-neutral-sage rounded-lg py-1.5 hover:bg-primary/10 transition-colors"
            >
              Edit
            </Link>
            <Link
              href={`/farmer/chats?product=${product.id}`}
              className="relative flex items-center justify-center gap-1 flex-1 text-xs font-medium text-slate-600 bg-slate-50 rounded-lg py-1.5 hover:bg-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">chat</span>
              Chats
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useProducts } from '@/hooks/products/useProducts';
import { useFeaturedProducts } from '@/hooks/products/useFeaturedProducts';
import { useFeaturedFarmers } from '@/hooks/farmers/useFeaturedFarmers';
import { useAuthContext } from '@/providers/AuthProvider';
import { PRODUCT_CATEGORIES } from '@/lib/categories';
import { ProductCategory } from '@/lib/types/product.types';
import ProductCard from '@/components/ui/shared/ProductCard';
import FarmerCard from '@/components/ui/shared/FarmerCard';
import CategoryChip from '@/components/ui/shared/CategoryChip';
import { SkeletonCard } from '@/components/ui/shared/SkeletonCard';

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { user } = useAuthContext();
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  const categoryParam = activeCategory === 'all' ? undefined : (activeCategory as ProductCategory);
  const { products, isLoading: productsLoading } = useProducts({ category: categoryParam });
  const { products: featuredProducts, isLoading: featuredLoading } = useFeaturedProducts();
  const { farmers, isLoading: farmersLoading } = useFeaturedFarmers();

  const activeLabel = PRODUCT_CATEGORIES.find((c) => c.id === activeCategory)?.label ?? 'All';

  return (
    <div className="px-4 py-5 max-w-2xl lg:max-w-7xl mx-auto">
      {/* Hero search CTA */}
      <div className="bg-primary rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white" />
          <div className="absolute -bottom-10 left-10 w-48 h-48 rounded-full bg-white" />
        </div>
        <div className="relative">
          <h1 className="text-white text-xl font-black mb-1">Good morning, {firstName}!</h1>
          <p className="text-white/70 text-sm mb-4">
            Find fresh produce directly from local farmers.
          </p>
          <Link
            href="/buyer/search"
            className="flex items-center gap-2 bg-white rounded-full px-4 py-2.5 w-full"
          >
            <span className="material-symbols-outlined text-text-muted text-[18px]">search</span>
            <span className="text-sm text-text-muted flex-1">Search for tomatoes, maize...</span>
            <span className="material-symbols-outlined text-primary text-[18px]">tune</span>
          </Link>
        </div>
      </div>

      {/* Category chips */}
      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {PRODUCT_CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat.id}
              category={cat}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Featured Farmers */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-800">Featured Farmers Near You</h2>
          <Link
            href="/buyer/search"
            className="text-xs font-semibold text-primary flex items-center gap-1"
          >
            See all
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {farmersLoading ? (
            <SkeletonCard variant="farmer" count={4} />
          ) : (
            farmers.map((farmer) => (
              <FarmerCard key={farmer.id} farmer={farmer} />
            ))
          )}
        </div>
      </section>

      {/* Featured Products */}
      {!featuredLoading && featuredProducts.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-800">Featured Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} variant="grid" />
            ))}
          </div>
        </section>
      )}

      {/* Products grid by category */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-800">
            {activeLabel}
            <span className="ml-2 text-xs font-normal text-text-muted">
              {productsLoading ? '...' : `${products.length} listings`}
            </span>
          </h2>
        </div>
        {productsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SkeletonCard variant="product" count={8} />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-text-muted text-5xl block mb-3">
              storefront
            </span>
            <p className="text-slate-600 font-semibold">No products in this category</p>
            <p className="text-sm text-text-muted mt-1">Try a different category or check back later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} variant="grid" />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

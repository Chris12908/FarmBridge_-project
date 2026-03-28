'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProducts } from '@/hooks/products/useProducts';
import { PRODUCT_CATEGORIES } from '@/lib/categories';
import { ListingStatus, ProductCategory } from '@/lib/types/product.types';
import ProductCard from '@/components/ui/shared/ProductCard';
import CategoryChip from '@/components/ui/shared/CategoryChip';
import EmptyState from '@/components/ui/shared/EmptyState';
import { SkeletonCard } from '@/components/ui/shared/SkeletonCard';

type SortOption = 'price_asc' | 'price_desc' | 'rating';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') ?? 'all');
  const [sort, setSort] = useState<SortOption>('price_asc');
  const [inStockOnly, setInStockOnly] = useState(false);

  const categoryParam = activeCategory === 'all' ? undefined : (activeCategory as ProductCategory);
  const statusParam = inStockOnly ? ListingStatus.ACTIVE : undefined;

  const { products, isLoading } = useProducts({
    q: query || undefined,
    category: categoryParam,
    status: statusParam,
  });

  const sorted = [...products].sort((a, b) => {
    if (sort === 'price_asc') return a.pricePerUnit - b.pricePerUnit;
    if (sort === 'price_desc') return b.pricePerUnit - a.pricePerUnit;
    if (sort === 'rating') return (b.farmer?.farmerProfile?.rating ?? 0) - (a.farmer?.farmerProfile?.rating ?? 0);
    return 0;
  });

  return (
    <div className="max-w-2xl lg:max-w-7xl mx-auto">
      {/* Search header */}
      <div className="px-4 py-4 border-b border-primary/10 bg-background-light sticky top-0 z-30">
        <div className="flex gap-3 items-center">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[18px]">
              search
            </span>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search produce, farm names..."
              className="pl-9 bg-neutral-sage border-0 rounded-full h-10"
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 mt-3 -mx-4 px-4 scrollbar-hide">
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

      <div className="flex gap-4 px-4 py-5">
        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-600">
              <span className="font-bold text-slate-800">{isLoading ? '...' : sorted.length}</span> listings found
              {query && (
                <span className="text-text-muted">
                  {' '}for &ldquo;{query}&rdquo;
                </span>
              )}
            </p>
            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="w-36 h-8 text-xs border-primary/20 rounded-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_asc">Lowest Price</SelectItem>
                <SelectItem value="price_desc">Highest Price</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="flex flex-col gap-3">
              <SkeletonCard variant="product" count={6} />
            </div>
          ) : sorted.length === 0 ? (
            <EmptyState
              icon="search_off"
              title="No results found"
              description={`We couldn't find any listings${query ? ` matching "${query}"` : ''}. Try a different search term or browse by category.`}
            />
          ) : (
            <div className="flex flex-col gap-3">
              {sorted.map((product) => (
                <ProductCard key={product.id} product={product} variant="list" />
              ))}
            </div>
          )}
        </div>

        {/* Filter sidebar (desktop only) */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5 sticky top-36">
            <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">tune</span>
              Filters
            </h3>

            <div className="mb-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  In Stock Only
                </p>
                <Switch
                  checked={inStockOnly}
                  onCheckedChange={setInStockOnly}
                />
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-4 text-center">
              <span className="material-symbols-outlined text-primary text-3xl block mb-2">
                map
              </span>
              <p className="text-xs font-semibold text-primary">Map View</p>
              <p className="text-xs text-text-muted mt-1">See farmers on a map</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="px-4 py-8"><SkeletonCard variant="product" count={4} /></div>}>
      <SearchPageContent />
    </Suspense>
  );
}

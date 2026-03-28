'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/auth/useAuth';
import { useFarmerProducts } from '@/hooks/products/useFarmerProducts';
import { useManageProduct } from '@/hooks/products/useManageProduct';
import { ListingStatus } from '@/lib/types/product.types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ui/shared/ProductCard';
import EmptyState from '@/components/ui/shared/EmptyState';
import { SkeletonCard } from '@/components/ui/shared/SkeletonCard';
import { toast } from 'sonner';

export default function FarmerListingsPage() {
  const { user } = useAuth();
  const farmerId = user?.farmerProfile?.id ?? user?.id ?? '';

  const { products: allProducts, isLoading } = useFarmerProducts(farmerId);
  const { renew, remove } = useManageProduct(farmerId);

  const active = allProducts.filter((p) => p.status === ListingStatus.ACTIVE);
  const outOfStock = allProducts.filter((p) => p.status === ListingStatus.OUT_OF_STOCK);
  const drafts = allProducts.filter((p) => p.status === ListingStatus.DRAFT);
  const expired = allProducts.filter((p) => p.status === ListingStatus.EXPIRED);

  return (
    <div className="px-4 py-5 max-w-2xl lg:max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-black text-slate-800">My Listings</h1>
        <Link href="/farmer/listings/new" className={cn(buttonVariants(), 'h-9 rounded-xl text-sm font-bold gap-1')}>
          <span className="material-symbols-outlined text-[16px]">add</span>
          Add Listing
        </Link>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="bg-neutral-sage/50 rounded-xl p-1 w-full mb-5 flex overflow-x-auto">
          <TabsTrigger value="active" className="flex-1 rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary">
            Active ({isLoading ? '...' : active.length})
          </TabsTrigger>
          <TabsTrigger value="out_of_stock" className="flex-1 rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary">
            Out of Stock ({isLoading ? '...' : outOfStock.length})
          </TabsTrigger>
          <TabsTrigger value="drafts" className="flex-1 rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary">
            Drafts ({isLoading ? '...' : drafts.length})
          </TabsTrigger>
          {expired.length > 0 && (
            <TabsTrigger value="expired" className="flex-1 rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary">
              Expired ({expired.length})
            </TabsTrigger>
          )}
        </TabsList>

        {[
          { value: 'active', products: active, emptyTitle: 'No active listings', emptyDesc: 'Create your first listing to start receiving inquiries from buyers.' },
          { value: 'out_of_stock', products: outOfStock, emptyTitle: 'All stocked up!', emptyDesc: 'No out-of-stock products right now.' },
          { value: 'drafts', products: drafts, emptyTitle: 'No drafts', emptyDesc: 'Drafts you save will appear here.' },
          { value: 'expired', products: expired, emptyTitle: 'No expired listings', emptyDesc: '' },
        ].map(({ value, products, emptyTitle, emptyDesc }) => (
          <TabsContent key={value} value={value}>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <SkeletonCard variant="product" count={6} />
              </div>
            ) : products.length === 0 ? (
              <EmptyState
                icon="inventory_2"
                title={emptyTitle}
                description={emptyDesc}
                action={value === 'active' ? (
                  <Link href="/farmer/listings/new" className={buttonVariants()}>Create Listing</Link>
                ) : undefined}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} variant="grid" showFarmerActions />
                ))}
                {value === 'active' && (
                  <Link href="/farmer/listings/new" className="block">
                    <div className="bg-white rounded-xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center py-10 hover:border-primary/40 hover:bg-primary/[0.02] transition-all min-h-[200px]">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined text-primary text-2xl">add</span>
                      </div>
                      <p className="text-sm font-semibold text-primary">Add New Listing</p>
                    </div>
                  </Link>
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

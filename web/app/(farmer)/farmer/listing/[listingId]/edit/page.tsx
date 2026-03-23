'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useProduct } from '@/hooks/products/useProduct';
import { useManageProduct } from '@/hooks/products/useManageProduct';
import { useAuth } from '@/hooks/auth/useAuth';
import { formatCurrency } from '@/lib/utils';
import { ProductCategory, ProductUnit, ListingStatus } from '@/lib/types/product.types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button, buttonVariants } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppHeader from '@/components/ui/shared/AppHeader';
import { ImageUploader } from '@/components/ui/shared/ImageUploader';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().min(2),
  category: z.nativeEnum(ProductCategory),
  unit: z.nativeEnum(ProductUnit),
  description: z.string().min(10),
  pricePerUnit: z.coerce.number().positive(),
  quantityAvailable: z.coerce.number().int().positive(),
  minimumOrder: z.coerce.number().int().positive(),
  images: z.array(z.string()),
  tags: z.array(z.string()),
});

type FormData = z.infer<typeof schema>;
const CATEGORIES = Object.values(ProductCategory).map((v) => ({ value: v, label: v.charAt(0) + v.slice(1).toLowerCase() }));
const UNITS = Object.values(ProductUnit).map((v) => ({ value: v, label: v.charAt(0) + v.slice(1).toLowerCase() }));

export default function EditListingPage() {
  const params = useParams();
  const router = useRouter();
  const listingId = params.listingId as string;
  const { user } = useAuth();
  const farmerId = user?.id ?? '';

  const { product, isLoading } = useProduct(listingId);
  const { update, updateStatus, remove } = useManageProduct(farmerId);

  const [images, setImages] = useState<string[]>([]);

  const { control, register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    defaultValues: { images: [], tags: [] },
  });

  useEffect(() => {
    if (product) {
      const imgs = product.images ?? [];
      setImages(imgs);
      reset({
        name: product.name,
        category: product.category,
        unit: product.unit,
        description: product.description,
        pricePerUnit: product.pricePerUnit,
        quantityAvailable: product.quantityAvailable,
        minimumOrder: product.minimumOrder,
        images: imgs,
        tags: product.tags,
      });
    }
  }, [product, reset]);

  function onSave(data: FormData) {
    update.mutate(
      { id: listingId, dto: data },
      {
        onSuccess: () => { toast.success('Listing updated!'); router.push('/farmer/listings'); },
        onError: () => toast.error('Failed to update listing'),
      }
    );
  }

  function handleUnpublish() {
    updateStatus.mutate(
      { id: listingId, status: ListingStatus.OUT_OF_STOCK },
      {
        onSuccess: () => { toast.success('Listing unpublished'); router.push('/farmer/listings'); },
      }
    );
  }

  function handleDelete() {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    remove.mutate(listingId, {
      onSuccess: () => { toast.success('Listing deleted'); router.push('/farmer/listings'); },
    });
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-light">
        <AppHeader backHref="/farmer/listings" title="Edit Listing" />
        <div className="px-4 py-5 max-w-lg mx-auto animate-pulse space-y-4">
          <div className="h-32 bg-slate-200 rounded-2xl" />
          <div className="h-48 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-text-muted">Listing not found.</p>
        <Link href="/farmer/listings" className="text-primary text-sm font-semibold mt-2">Back to Listings</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      <AppHeader
        backHref="/farmer/listings"
        title="Edit Listing"
        rightSlot={
          <Link href="/farmer/listings" className={buttonVariants({ variant: 'outline' }) + ' h-8 text-xs rounded-lg'}>Cancel</Link>
        }
      />

      <div className="px-4 py-5 max-w-lg mx-auto space-y-5 pb-32">
        {/* Current price info */}
        <div className="bg-neutral-sage/50 rounded-xl p-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">info</span>
          <div>
            <p className="text-sm font-semibold text-slate-700">Current listed price</p>
            <p className="text-lg font-black text-primary">{formatCurrency(product.pricePerUnit)}/{product.unit}</p>
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
          <h2 className="font-bold text-slate-800 mb-4">Product Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Product Name *</label>
              <Input {...register('name')} className="h-11 border-primary/20" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Category *</label>
                <Controller control={control} name="category" render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-11 border-primary/20"><SelectValue /></SelectTrigger>
                    <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                  </Select>
                )} />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Unit *</label>
                <Controller control={control} name="unit" render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-11 border-primary/20"><SelectValue /></SelectTrigger>
                    <SelectContent>{UNITS.map((u) => <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>)}</SelectContent>
                  </Select>
                )} />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Description *</label>
              <Textarea {...register('description')} rows={4} className="border-primary/20 resize-none" />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
          <h2 className="font-bold text-slate-800 mb-4">Pricing & Inventory</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Price per unit *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
                <Input type="number" step="0.01" {...register('pricePerUnit')} className="h-11 pl-7 border-primary/20" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Quantity *</label>
              <Input type="number" {...register('quantityAvailable')} className="h-11 border-primary/20" />
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
          <h2 className="font-bold text-slate-800 mb-4">Product Photos</h2>
          <ImageUploader
            value={images}
            onChange={(urls) => { setImages(urls); setValue('images', urls); }}
            maxImages={5}
          />
        </div>

        {/* Danger zone */}
        <div className="bg-red-50 rounded-2xl border border-red-100 p-4">
          <h3 className="font-bold text-red-700 mb-2 text-sm">Danger Zone</h3>
          <Button
            variant="outline"
            className="border-red-200 text-red-500 hover:bg-red-100 w-full"
            onClick={handleDelete}
            disabled={remove.isPending}
          >
            {remove.isPending ? 'Deleting...' : 'Delete Listing Permanently'}
          </Button>
        </div>
      </div>

      {/* Fixed footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background-light border-t border-primary/10 px-4 py-4">
        <div className="max-w-lg mx-auto flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl border-slate-200 text-slate-600"
            onClick={handleUnpublish}
            disabled={updateStatus.isPending}
          >
            Unpublish
          </Button>
          <Button
            onClick={handleSubmit((data: FormData) => onSave(data))}
            disabled={update.isPending}
            className="flex-1 h-12 rounded-xl font-bold"
          >
            {update.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}

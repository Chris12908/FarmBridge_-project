'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/auth/useAuth';
import { useManageProduct } from '@/hooks/products/useManageProduct';
import { useUpload } from '@/hooks/uploads/useUpload';
import { ProductCategory, ProductUnit, ListingStatus } from '@/lib/types/product.types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button, buttonVariants } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppHeader from '@/components/ui/shared/AppHeader';
import { ImageUploader } from '@/components/ui/shared/ImageUploader';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  category: z.nativeEnum(ProductCategory),
  unit: z.nativeEnum(ProductUnit),
  description: z.string().min(10, 'Add a description (min 10 characters)'),
  pricePerUnit: z.coerce.number().positive('Price must be positive'),
  quantityAvailable: z.coerce.number().int().positive('Quantity required'),
  minimumOrder: z.coerce.number().int().positive().default(1),
  images: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
});

type FormData = z.infer<typeof schema>;

const CATEGORIES = Object.values(ProductCategory).map((v) => ({ value: v, label: v.charAt(0) + v.slice(1).toLowerCase() }));
const UNITS = Object.values(ProductUnit).map((v) => ({ value: v, label: v.charAt(0) + v.slice(1).toLowerCase() }));

export default function NewListingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const farmerId = user?.farmerProfile?.id ?? user?.id ?? '';
  const { create } = useManageProduct(farmerId);

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const { control, register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    defaultValues: { images: [], tags: [], minimumOrder: 1 },
  });

  function onSubmit(data: FormData, publish: boolean) {
    create.mutate(
      {
        ...data,
        expiresAt: undefined,
      },
      {
        onSuccess: () => {
          toast.success(publish ? 'Listing published!' : 'Draft saved');
          router.push('/farmer/listings');
        },
        onError: () => toast.error('Failed to save listing'),
      }
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      <AppHeader
        backHref="/farmer/listings"
        title="Create Listing"
        rightSlot={
          <Link href="/farmer/listings" className={buttonVariants({ variant: 'outline' }) + ' h-8 text-xs rounded-lg'}>Cancel</Link>
        }
      />

      <div className="px-4 py-5 max-w-lg mx-auto space-y-5 pb-32">
        {/* Product Info */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
          <h2 className="font-bold text-slate-800 mb-4">Product Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Product Name *</label>
              <Input {...register('name')} placeholder="e.g. Organic Heirloom Tomatoes" className="h-11 border-primary/20" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Category *</label>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-11 border-primary/20"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Unit *</label>
                <Controller
                  control={control}
                  name="unit"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-11 border-primary/20"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent>
                        {UNITS.map((u) => <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Description *</label>
              <Textarea {...register('description')} placeholder="Describe your product..." rows={4} className="border-primary/20 resize-none" />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
          <h2 className="font-bold text-slate-800 mb-4">Pricing & Inventory</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Price per unit *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-medium">$</span>
                  <Input type="number" step="0.01" {...register('pricePerUnit')} placeholder="0.00" className="h-11 pl-7 border-primary/20" />
                </div>
                {errors.pricePerUnit && <p className="text-xs text-red-500 mt-1">{errors.pricePerUnit.message}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Quantity *</label>
                <Input type="number" {...register('quantityAvailable')} placeholder="e.g. 250" className="h-11 border-primary/20" />
                {errors.quantityAvailable && <p className="text-xs text-red-500 mt-1">{errors.quantityAvailable.message}</p>}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Minimum Order</label>
              <Input type="number" {...register('minimumOrder')} placeholder="1" className="h-11 border-primary/20" />
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
          <h2 className="font-bold text-slate-800 mb-1">Product Photos</h2>
          <p className="text-xs text-text-muted mb-4">Upload up to 5 photos. First photo will be the cover.</p>
          <ImageUploader
            value={uploadedImages}
            onChange={(urls) => { setUploadedImages(urls); setValue('images', urls); }}
            maxImages={5}
          />
        </div>
      </div>

      {/* Fixed footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background-light border-t border-primary/10 px-4 py-4">
        <div className="max-w-lg mx-auto flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl"
            onClick={handleSubmit((data: FormData) => onSubmit(data, false))}
            disabled={create.isPending}
          >
            Save as Draft
          </Button>
          <Button
            onClick={handleSubmit((data: FormData) => onSubmit(data, true))}
            disabled={create.isPending}
            className="flex-1 h-12 rounded-xl font-bold"
          >
            {create.isPending ? 'Publishing...' : 'Publish Listing'}
          </Button>
        </div>
      </div>
    </div>
  );
}

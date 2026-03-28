'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/useAuth';
import { useAuthContext } from '@/providers/AuthProvider';
import { useAddresses } from '@/hooks/addresses/useAddresses';
import { useUpload } from '@/hooks/uploads/useUpload';
import { userService } from '@/services/user.service';
import { addressService } from '@/services/address.service';
import { QUERY_KEYS } from '@/lib/constants';
import { getInitials } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AppHeader from '@/components/ui/shared/AppHeader';
import { AddressForm } from '@/components/ui/shared/AddressForm';
import type { Address } from '@/lib/types/address.types';
import { toast } from 'sonner';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function BuyerSettingsPage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { setUser } = useAuthContext();
  const { addresses } = useAddresses();
  const { uploadImage, isUploading, progress } = useUpload();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? '');

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name ?? '', phoneNumber: user?.phoneNumber ?? '' },
  });

  const profileMutation = useMutation({
    mutationFn: (data: ProfileFormData & { avatarUrl?: string }) => userService.updateProfile(data),
    onSuccess: (updated) => {
      setUser(updated);
      toast.success('Profile updated!');
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: addressService.deleteAddress,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADDRESSES.all }),
  });

  const setDefaultMutation = useMutation({
    mutationFn: addressService.setDefaultAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADDRESSES.all });
      toast.success('Default address updated');
    },
  });

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await uploadImage(file);
    const url = result?.url;
    if (!url) return;
    setAvatarUrl(url);
    await profileMutation.mutateAsync({ name: user?.name ?? '', avatarUrl: url });
  }

  function onSubmitProfile(data: ProfileFormData) {
    profileMutation.mutate({ ...data, avatarUrl: avatarUrl || undefined });
  }

  if (!user) return null;

  return (
    <div>
      <AppHeader backHref="/buyer/profile" title="Settings" />
      <div className="px-4 py-5 max-w-lg mx-auto space-y-6">

        {/* Avatar */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
          <h2 className="font-bold text-slate-800 mb-4">Profile Photo</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              {avatarUrl ? (
                <img src={avatarUrl} alt={user.name} className="w-20 h-20 rounded-full object-cover border-4 border-neutral-sage" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary/10 border-4 border-neutral-sage flex items-center justify-center">
                  <span className="text-primary text-2xl font-black">{getInitials(user.name)}</span>
                </div>
              )}
              {isUploading && (
                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{progress}%</span>
                </div>
              )}
            </div>
            <div>
              <label className="cursor-pointer text-sm font-semibold text-primary hover:text-primary/80">
                Change photo
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
              <p className="text-xs text-text-muted mt-1">JPG, PNG up to 5MB</p>
            </div>
          </div>
        </div>

        {/* Profile info */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
          <h2 className="font-bold text-slate-800 mb-4">Personal Info</h2>
          <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Full Name</label>
              <Input {...register('name')} className="rounded-xl" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Email</label>
              <Input value={user.email} disabled className="rounded-xl bg-slate-50 text-text-muted" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Phone Number</label>
              <Input {...register('phoneNumber')} placeholder="+1 234 567 8900" className="rounded-xl" />
            </div>
            <Button
              type="submit"
              disabled={profileMutation.isPending}
              className="w-full rounded-xl"
            >
              {profileMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </div>

        {/* Addresses */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800">Delivery Addresses</h2>
            <button
              onClick={() => { setEditingAddress(null); setShowAddressForm(true); }}
              className="text-xs font-semibold text-primary hover:text-primary/80"
            >
              + Add new
            </button>
          </div>

          {showAddressForm && (
            <div className="mb-4 p-4 bg-neutral-sage/30 rounded-xl">
              <AddressForm
                defaultValues={editingAddress ?? undefined}
                onSubmit={async (data) => {
                  if (editingAddress) {
                    await addressService.updateAddress(editingAddress.id, data);
                  } else {
                    await addressService.createAddress(data);
                  }
                  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADDRESSES.all });
                  setShowAddressForm(false);
                  setEditingAddress(null);
                  toast.success(editingAddress ? 'Address updated' : 'Address added');
                }}
                onCancel={() => { setShowAddressForm(false); setEditingAddress(null); }}
                submitLabel={editingAddress ? 'Update Address' : 'Add Address'}
              />
            </div>
          )}

          {addresses.length === 0 ? (
            <p className="text-sm text-text-muted text-center py-4">No saved addresses yet</p>
          ) : (
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div key={addr.id} className="flex items-start gap-3 p-3 rounded-xl border border-primary/10">
                  <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">location_on</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-800">{addr.label}</p>
                      {addr.isDefault && (
                        <span className="text-[10px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                    <p className="text-xs text-text-muted">{addr.street}, {addr.city}, {addr.state}</p>
                  </div>
                  <div className="flex gap-1">
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefaultMutation.mutate(addr.id)}
                        disabled={setDefaultMutation.isPending}
                        className="w-7 h-7 rounded-full hover:bg-primary/10 flex items-center justify-center"
                        title="Set as default"
                      >
                        <span className="material-symbols-outlined text-primary text-[14px]">star</span>
                      </button>
                    )}
                    <button
                      onClick={() => { setEditingAddress(addr); setShowAddressForm(true); }}
                      className="w-7 h-7 rounded-full hover:bg-neutral-sage flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-slate-500 text-[14px]">edit</span>
                    </button>
                    <button
                      onClick={() => deleteAddressMutation.mutate(addr.id)}
                      className="w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-red-400 text-[14px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

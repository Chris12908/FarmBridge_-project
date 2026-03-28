'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/auth/useAuth';
import { useAuthContext } from '@/providers/AuthProvider';
import { useUpload } from '@/hooks/uploads/useUpload';
import { authService } from '@/services/auth.service';
import { farmerService } from '@/services/farmer.service';
import { userService } from '@/services/user.service';
import { getRefreshToken } from '@/lib/tokens';
import { routes } from '@/lib/routes';
import { getInitials } from '@/lib/utils';

// ─── Schemas ──────────────────────────────────────────────────────────────────

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: z.string().optional(),
});

const farmSchema = z.object({
  farmName: z.string().min(2, 'Farm name must be at least 2 characters'),
  farmLocation: z.string().min(3, 'Farm location must be at least 3 characters'),
  bio: z.string().max(500, 'Bio must be under 500 characters').optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Required'),
    newPassword: z.string().min(8, 'At least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ProfileForm = z.infer<typeof profileSchema>;
type FarmForm = z.infer<typeof farmSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export default function FarmerSettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { clearAuth, setUser } = useAuthContext();
  const { uploadImage, progress } = useUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const farmerProfile = user?.farmerProfile;

  const [cropInput, setCropInput] = useState('');
  const [crops, setCrops] = useState<string[]>(farmerProfile?.crops ?? []);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? '');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // ─── Profile form ──────────────────────────────────────────────────────────

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name ?? '', phoneNumber: user?.phoneNumber ?? '' },
  });

  const updateProfile = useMutation({
    mutationFn: (dto: ProfileForm) => userService.updateProfile({ name: dto.name, phoneNumber: dto.phoneNumber }),
    onSuccess: (updated) => {
      setUser(updated);
      toast.success('Profile updated');
    },
    onError: (err: unknown) => toast.error((err as Error)?.message ?? 'Update failed'),
  });

  // ─── Farm form ─────────────────────────────────────────────────────────────

  const farmForm = useForm<FarmForm>({
    resolver: zodResolver(farmSchema),
    defaultValues: {
      farmName: farmerProfile?.farmName ?? '',
      farmLocation: farmerProfile?.farmLocation ?? '',
      bio: farmerProfile?.bio ?? '',
    },
  });

  const updateFarm = useMutation({
    mutationFn: (dto: FarmForm) =>
      farmerService.updateFarmerProfile({ ...dto, crops }),
    onSuccess: (updated) => {
      if (user) setUser({ ...user, farmerProfile: updated });
      toast.success('Farm profile updated');
    },
    onError: (err: unknown) => toast.error((err as Error)?.message ?? 'Update failed'),
  });

  // ─── Password form ─────────────────────────────────────────────────────────

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  const changePassword = useMutation({
    mutationFn: (dto: PasswordForm) =>
      authService.changePassword({ currentPassword: dto.currentPassword, newPassword: dto.newPassword }),
    onSuccess: () => {
      toast.success('Password changed');
      passwordForm.reset();
    },
    onError: (err: unknown) => toast.error((err as Error)?.message ?? 'Failed'),
  });

  // ─── Logout ────────────────────────────────────────────────────────────────

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(getRefreshToken() ?? ''),
    onSuccess: () => {
      clearAuth();
      router.push(routes.auth.login());
    },
    onError: () => {
      clearAuth();
      router.push(routes.auth.login());
    },
  });

  // ─── Photo upload ──────────────────────────────────────────────────────────

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const result = await uploadImage(file);
      const url = result?.url;
      if (!url) return;
      setAvatarUrl(url);
      const updated = await userService.updateProfile({ avatarUrl: url ?? undefined });
      setUser(updated);
      toast.success('Photo updated');
    } catch {
      toast.error('Photo upload failed');
    } finally {
      setUploadingPhoto(false);
    }
  }

  // ─── Crop helpers ──────────────────────────────────────────────────────────

  function addCrop() {
    const trimmed = cropInput.trim();
    if (trimmed && !crops.includes(trimmed)) {
      setCrops((prev) => [...prev, trimmed]);
    }
    setCropInput('');
  }

  function removeCrop(crop: string) {
    setCrops((prev) => prev.filter((c) => c !== crop));
  }

  const initials = getInitials(user?.name ?? 'F');

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-sage transition-colors"
        >
          <span className="material-symbols-outlined text-primary text-[20px]">arrow_back</span>
        </button>
        <h1 className="text-lg font-black text-slate-800">Settings</h1>
      </div>

      {/* Profile photo */}
      <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
        <h2 className="text-sm font-bold text-slate-700 mb-4">Profile Photo</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-neutral-sage bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shrink-0">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-black text-primary">{initials}</span>
            )}
          </div>
          <div className="flex-1">
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingPhoto}
            >
              <span className="material-symbols-outlined text-[16px] mr-1">upload</span>
              {uploadingPhoto ? `Uploading ${progress}%` : 'Change Photo'}
            </Button>
            <p className="text-xs text-text-muted mt-1">JPG, PNG or WebP. Max 5MB.</p>
          </div>
        </div>
      </div>

      {/* Personal info */}
      <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
        <h2 className="text-sm font-bold text-slate-700 mb-4">Personal Information</h2>
        <form onSubmit={profileForm.handleSubmit((d) => updateProfile.mutate(d))} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Full Name</label>
            <Input {...profileForm.register('name')} className="border-primary/20" />
            {profileForm.formState.errors.name && (
              <p className="text-xs text-red-500 mt-1">{profileForm.formState.errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
              Phone Number
            </label>
            <Input {...profileForm.register('phoneNumber')} className="border-primary/20" placeholder="+1 555 000 0000" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Email</label>
            <Input value={user?.email ?? ''} disabled className="border-primary/20 bg-neutral-sage/50" />
            <p className="text-xs text-text-muted mt-1">Email cannot be changed.</p>
          </div>
          <Button type="submit" className="w-full" disabled={updateProfile.isPending}>
            {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </div>

      {/* Farm profile */}
      <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
        <h2 className="text-sm font-bold text-slate-700 mb-4">Farm Profile</h2>
        <form onSubmit={farmForm.handleSubmit((d) => updateFarm.mutate(d))} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Farm Name</label>
            <Input {...farmForm.register('farmName')} className="border-primary/20" />
            {farmForm.formState.errors.farmName && (
              <p className="text-xs text-red-500 mt-1">{farmForm.formState.errors.farmName.message}</p>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Location</label>
            <Input {...farmForm.register('farmLocation')} className="border-primary/20" placeholder="City, State" />
            {farmForm.formState.errors.farmLocation && (
              <p className="text-xs text-red-500 mt-1">{farmForm.formState.errors.farmLocation.message}</p>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Bio</label>
            <textarea
              {...farmForm.register('bio')}
              rows={3}
              placeholder="Tell buyers about your farm..."
              className="w-full text-sm border border-primary/20 rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Crops */}
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Crops / Products</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={cropInput}
                onChange={(e) => setCropInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCrop())}
                placeholder="Add a crop..."
                className="flex-1 border-primary/20"
              />
              <Button type="button" variant="outline" onClick={addCrop} className="shrink-0">
                Add
              </Button>
            </div>
            {crops.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {crops.map((crop) => (
                  <span
                    key={crop}
                    className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full"
                  >
                    {crop}
                    <button type="button" onClick={() => removeCrop(crop)} className="hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-[12px]">close</span>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={updateFarm.isPending}>
            {updateFarm.isPending ? 'Saving...' : 'Save Farm Profile'}
          </Button>
        </form>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5">
        <h2 className="text-sm font-bold text-slate-700 mb-4">Change Password</h2>
        <form onSubmit={passwordForm.handleSubmit((d) => changePassword.mutate(d))} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
              Current Password
            </label>
            <Input type="password" {...passwordForm.register('currentPassword')} className="border-primary/20" />
            {passwordForm.formState.errors.currentPassword && (
              <p className="text-xs text-red-500 mt-1">{passwordForm.formState.errors.currentPassword.message}</p>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
              New Password
            </label>
            <Input type="password" {...passwordForm.register('newPassword')} className="border-primary/20" />
            {passwordForm.formState.errors.newPassword && (
              <p className="text-xs text-red-500 mt-1">{passwordForm.formState.errors.newPassword.message}</p>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
              Confirm New Password
            </label>
            <Input type="password" {...passwordForm.register('confirmPassword')} className="border-primary/20" />
            {passwordForm.formState.errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{passwordForm.formState.errors.confirmPassword.message}</p>
            )}
          </div>
          <Button type="submit" variant="outline" className="w-full" disabled={changePassword.isPending}>
            {changePassword.isPending ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-red-600 mb-4">Account</h2>
        <Separator className="mb-4" />
        <Button
          variant="outline"
          className="w-full h-11 border-red-200 text-red-500 hover:bg-red-50 rounded-xl"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          <span className="material-symbols-outlined text-[18px] mr-2">logout</span>
          {logoutMutation.isPending ? 'Signing out...' : 'Sign Out'}
        </Button>
      </div>

      <p className="text-center text-xs text-text-muted pb-4">AgriConnect · Version 1.0.0</p>
    </div>
  );
}

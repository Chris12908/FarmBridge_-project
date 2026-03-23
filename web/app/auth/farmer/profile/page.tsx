'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { useUpload } from '@/hooks/uploads/useUpload'
import { useAuthContext } from '@/providers/AuthProvider'
import { authService } from '@/services/auth.service'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const ALL_CROPS = ['Tomatoes', 'Carrots', 'Wheat', 'Apples', 'Potatoes', 'Maize', 'Onions', 'Mangoes']

const farmerProfileSchema = z.object({
  farmLocation: z.string().min(3, 'Farm location is required'),
  bio: z.string().max(500, 'Bio must be under 500 characters').optional(),
  crops: z.array(z.string()).min(1, 'Select at least one crop'),
  photoUrl: z.string().optional(),
})

type FarmerProfileData = z.infer<typeof farmerProfileSchema>

export default function FarmerProfile() {
  const router = useRouter()
  const [customCrop, setCustomCrop] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)
  const { setUser } = useAuthContext()
  const { uploadImage, isUploading, progress } = useUpload()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FarmerProfileData>({
    resolver: zodResolver(farmerProfileSchema),
    defaultValues: {
      crops: ['Tomatoes'],
      farmLocation: '',
      bio: '',
    },
  })

  const crops = watch('crops') ?? []

  const completeMutation = useMutation({
    mutationFn: (dto: Parameters<typeof authService.completeFarmerProfile>[0]) =>
      authService.completeFarmerProfile(dto),
    onSuccess: (data) => {
      setUser(data)
      toast.success('Farm profile completed! Welcome to AgriConnect.')
      router.push(routes.farmer.dashboard())
    },
    onError: (err: unknown) => {
      const msg = (err as { message?: string })?.message ?? 'Failed to complete profile'
      toast.error(msg)
    },
  })

  function toggleCrop(crop: string) {
    const updated = crops.includes(crop)
      ? crops.filter(c => c !== crop)
      : [...crops, crop]
    setValue('crops', updated, { shouldValidate: true })
  }

  function addCustomCrop() {
    const trimmed = customCrop.trim()
    if (trimmed && !crops.includes(trimmed)) {
      setValue('crops', [...crops, trimmed], { shouldValidate: true })
    }
    setCustomCrop('')
    setShowCustomInput(false)
  }

  async function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    // Optimistic preview
    setPhotoPreview(URL.createObjectURL(file))
    const result = await uploadImage(file)
    if (result?.url) {
      setValue('photoUrl', result.url)
    } else {
      toast.error('Failed to upload photo')
      setPhotoPreview(null)
    }
  }

  function onSubmit(data: FarmerProfileData) {
    completeMutation.mutate({
      farmLocation: data.farmLocation,
      bio: data.bio,
      crops: data.crops,
      tags: data.crops,
    })
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-accent-earth/30 px-6 md:px-10 py-4 bg-white/50 dark:bg-background-dark/50 backdrop-blur-md sticky top-0 z-50">
          <Link href="/auth" className="flex items-center gap-4 text-primary">
            <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
              <span className="material-symbols-outlined">agriculture</span>
            </div>
            <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">
              AgriConnect
            </h2>
          </Link>
          <Link
            href="/auth/farmer/signup"
            className="flex cursor-pointer items-center justify-center rounded-lg h-10 w-10 bg-accent-earth/20 text-slate-900 dark:text-slate-100 transition-colors hover:bg-accent-earth/40"
            aria-label="Go back"
          >
            <span className="material-symbols-outlined">close</span>
          </Link>
        </header>

        <main className="flex-1 flex justify-center py-10 px-4">
          <div className="layout-content-container flex flex-col max-w-[560px] w-full bg-white dark:bg-slate-900/50 p-6 md:p-10 rounded-xl shadow-sm border border-accent-earth/20">
            {/* Progress */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-text-muted text-xs font-bold uppercase tracking-wider">Step 2 of 2</span>
                  <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight mt-1">
                    Farm Profile
                  </h1>
                </div>
                <span className="text-primary font-bold text-sm">100%</span>
              </div>
              <div className="flex h-2 w-full bg-accent-earth/30 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-full rounded-full"></div>
              </div>
              <p className="text-text-muted text-sm">
                Help buyers discover your produce by completing your farm details.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              {/* Farm Location */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold">
                  Farm Location
                </label>
                <div className="relative">
                  <input
                    {...register('farmLocation')}
                    className={cn(
                      "w-full rounded-lg border bg-background-light dark:bg-slate-800 focus:outline-none focus:ring-1 h-12 pl-4 pr-12 text-base transition-all",
                      errors.farmLocation
                        ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                        : "border-accent-earth dark:border-slate-600 focus:border-primary focus:ring-primary"
                    )}
                    placeholder="City, State / Province"
                    type="text"
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                    location_on
                  </span>
                </div>
                {errors.farmLocation && (
                  <span className="text-xs text-red-500">{errors.farmLocation.message}</span>
                )}
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold">
                  Bio <span className="font-normal text-text-muted">(optional)</span>
                </label>
                <textarea
                  {...register('bio')}
                  rows={3}
                  className="w-full rounded-lg border border-accent-earth dark:border-slate-600 bg-background-light dark:bg-slate-800 focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 text-base outline-none transition-all resize-none"
                  placeholder="Tell buyers about your farm and farming practices..."
                />
                {errors.bio && <span className="text-xs text-red-500">{errors.bio.message}</span>}
              </div>

              {/* Crop Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold">
                  What do you grow?
                </label>
                <p className="text-text-muted text-xs mb-1">Select all that apply</p>
                <div className="flex flex-wrap gap-2 p-3 border border-accent-earth dark:border-slate-600 rounded-lg bg-background-light dark:bg-slate-800">
                  {ALL_CROPS.map(crop => (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => toggleCrop(crop)}
                      className={cn(
                        "flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors",
                        crops.includes(crop)
                          ? "bg-primary text-white"
                          : "bg-accent-earth/50 text-slate-700 dark:text-slate-200 hover:bg-accent-earth"
                      )}
                    >
                      {crop}
                      {crops.includes(crop) && (
                        <span className="material-symbols-outlined text-xs">close</span>
                      )}
                    </button>
                  ))}

                  {crops.filter(c => !ALL_CROPS.includes(c)).map(crop => (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => toggleCrop(crop)}
                      className="flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-full text-sm"
                    >
                      {crop}
                      <span className="material-symbols-outlined text-xs">close</span>
                    </button>
                  ))}

                  {showCustomInput ? (
                    <div className="flex items-center gap-1">
                      <input
                        autoFocus
                        className="h-7 px-2 rounded-full border border-primary text-sm outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white w-28"
                        placeholder="Crop name"
                        value={customCrop}
                        onChange={e => setCustomCrop(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCustomCrop())}
                      />
                      <button type="button" onClick={addCustomCrop} className="text-primary font-semibold text-sm px-1">Add</button>
                    </div>
                  ) : (
                    <button
                      className="flex items-center gap-1 text-primary text-sm font-semibold px-2"
                      type="button"
                      onClick={() => setShowCustomInput(true)}
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                      Add more
                    </button>
                  )}
                </div>
                {errors.crops && (
                  <span className="text-xs text-red-500">{errors.crops.message}</span>
                )}
              </div>

              {/* Photo Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold">
                  Upload Farm Photo <span className="font-normal text-text-muted">(optional)</span>
                </label>

                {photoPreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-accent-earth/30 aspect-video">
                    <Image src={photoPreview} alt="Farm preview" fill className="object-cover" />
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2">
                        <span className="w-8 h-8 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        <p className="text-white text-sm font-medium">{progress}%</p>
                        <div className="w-32 bg-white/30 rounded-full h-1.5">
                          <div className="bg-white h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    )}
                    {!isUploading && (
                      <button
                        type="button"
                        onClick={() => { setPhotoPreview(null); setValue('photoUrl', undefined) }}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <label
                    htmlFor="farmPhoto"
                    className="border-2 border-dashed border-accent-earth dark:border-slate-600 rounded-xl p-8 flex flex-col items-center justify-center bg-background-light dark:bg-slate-800/50 hover:border-primary/50 transition-colors cursor-pointer group"
                  >
                    <div className="size-12 rounded-full bg-accent-earth/20 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">cloud_upload</span>
                    </div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Click to upload or drag and drop</p>
                    <p className="text-xs text-text-muted mt-1">PNG, JPG or WEBP (max. 5MB)</p>
                  </label>
                )}
                <input
                  ref={photoInputRef}
                  id="farmPhoto"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handlePhotoSelect}
                />
              </div>

              <div className="pt-4 flex flex-col gap-4">
                <button
                  className="w-full bg-primary text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  type="submit"
                  disabled={completeMutation.isPending || isUploading}
                >
                  {completeMutation.isPending ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Completing profile...
                    </>
                  ) : (
                    <>
                      Complete Farmer Profile
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => router.push(routes.farmer.dashboard())}
                  className="w-full text-center bg-transparent text-text-muted text-sm font-medium py-2 hover:text-primary transition-colors"
                >
                  Skip for now, I&apos;ll do this later
                </button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-accent-earth/30 flex items-center justify-center gap-2 text-text-muted text-sm">
              <span className="material-symbols-outlined text-sm">shield</span>
              Your data is stored securely and never shared with third parties.
            </div>
          </div>
        </main>

        <footer className="py-10 text-center">
          <p className="text-text-muted text-xs">© 2024 AgriConnect Inc. Empowering local farmers.</p>
        </footer>
      </div>
    </div>
  )
}

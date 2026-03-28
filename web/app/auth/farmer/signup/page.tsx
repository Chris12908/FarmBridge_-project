'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useFarmerRegister } from '@/hooks/auth/useRegister'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils'

const farmerSignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  phoneNumber: z.string().optional(),
  farmName: z.string().min(2, 'Farm name is required'),
  farmLocation: z.string().min(3, 'Farm location is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type FarmerSignupData = z.infer<typeof farmerSignupSchema>

export default function FarmerSignup() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const { register: registerFarmer, isLoading, error, isSuccess } = useFarmerRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FarmerSignupData>({
    resolver: zodResolver(farmerSignupSchema),
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success('Account created! Complete your farm profile.')
      router.push(routes.auth.farmerProfile())
    }
  }, [isSuccess, router])

  useEffect(() => {
    if (error) {
      const msg = (error as { message?: string })?.message ?? 'Registration failed. Please try again.'
      toast.error(msg)
    }
  }, [error])

  function onSubmit({ confirmPassword: _, ...data }: FarmerSignupData) {
    registerFarmer({
      name: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      farmName: data.farmName,
      farmLocation: data.farmLocation,
    })
  }

  const fieldCls = (hasError: boolean) => cn(
    "w-full rounded-lg border bg-background-light dark:bg-slate-800 focus:outline-none focus:ring-1 h-12 px-4 text-base transition-all",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-300"
      : "border-accent-earth dark:border-slate-600 focus:border-primary focus:ring-primary"
  )

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
            href="/auth"
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
                  <span className="text-text-muted text-xs font-bold uppercase tracking-wider">Step 1 of 2</span>
                  <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight mt-1">
                    Create Account
                  </h1>
                </div>
                <span className="text-primary font-bold text-sm">50%</span>
              </div>
              <div className="flex h-2 w-full bg-accent-earth/30 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/2 rounded-full transition-all"></div>
              </div>
              <p className="text-text-muted text-sm">
                Set up your login credentials to get started on the platform.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold">Full Name</label>
                <input {...register('name')} className={fieldCls(!!errors.name)} placeholder="e.g. James Odhiambo" type="text" />
                {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold">Email Address</label>
                <input {...register('email')} className={fieldCls(!!errors.email)} placeholder="james@example.com" type="email" autoComplete="email" />
                {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold">Password</label>
                  <div className="relative">
                    <input
                      {...register('password')}
                      className={cn(fieldCls(!!errors.password), 'pr-10')}
                      placeholder="••••••••"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold">Confirm Password</label>
                  <input
                    {...register('confirmPassword')}
                    className={fieldCls(!!errors.confirmPassword)}
                    placeholder="••••••••"
                    type="password"
                    autoComplete="new-password"
                  />
                  {errors.confirmPassword && <span className="text-xs text-red-500">{errors.confirmPassword.message}</span>}
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold">
                  Phone Number <span className="font-normal text-text-muted">(optional)</span>
                </label>
                <input {...register('phoneNumber')} className={fieldCls(false)} placeholder="+254 700 000 000" type="tel" />
              </div>

              {/* Farm Name */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold">Farm Name</label>
                <input {...register('farmName')} className={fieldCls(!!errors.farmName)} placeholder="e.g. Green Valley Farm" type="text" />
                {errors.farmName && <span className="text-xs text-red-500">{errors.farmName.message}</span>}
              </div>

              {/* Farm Location */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-slate-100 text-sm font-semibold">Farm Location</label>
                <div className="relative">
                  <input
                    {...register('farmLocation')}
                    className={cn(fieldCls(!!errors.farmLocation), 'pl-10')}
                    placeholder="e.g. Nakuru, Kenya"
                    type="text"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">location_on</span>
                </div>
                {errors.farmLocation && <span className="text-xs text-red-500">{errors.farmLocation.message}</span>}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 mt-1">
                <input
                  className="mt-1 h-4 w-4 rounded border-accent-earth text-primary focus:ring-primary"
                  id="farmerTerms"
                  type="checkbox"
                />
                <label className="text-xs text-text-muted leading-normal" htmlFor="farmerTerms">
                  By creating an account, you agree to our{' '}
                  <a className="text-primary underline" href="#">Terms of Service</a> and{' '}
                  <a className="text-primary underline" href="#">Privacy Policy</a>.
                </label>
              </div>

              <div className="pt-2 flex flex-col gap-4">
                <button
                  className="w-full bg-primary text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Continue to Farm Profile
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </>
                  )}
                </button>
                <p className="text-center text-sm text-text-muted">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-primary font-semibold hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-accent-earth/30 flex items-center justify-center gap-2 text-text-muted text-sm">
              <span className="material-symbols-outlined text-sm">shield</span>
              Your data is stored securely and never shared with third parties.
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

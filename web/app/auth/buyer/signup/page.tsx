'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useBuyerRegister } from '@/hooks/auth/useRegister'
import { routes } from '@/lib/routes'
import { GOOGLE_OAUTH_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

const buyerSignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  phoneNumber: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type BuyerSignupData = z.infer<typeof buyerSignupSchema>

export default function BuyerSignup() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { register: registerBuyer, isLoading, error, isSuccess } = useBuyerRegister()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BuyerSignupData>({
    resolver: zodResolver(buyerSignupSchema),
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success('Account created! Welcome to AgriConnect.')
      router.push(routes.buyer.marketplace())
    }
  }, [isSuccess, router])

  useEffect(() => {
    if (error) {
      const msg = (error as { message?: string })?.message ?? 'Registration failed. Please try again.'
      toast.error(msg)
    }
  }, [error])

  function onSubmit({ confirmPassword: _, ...data }: BuyerSignupData) {
    registerBuyer({ name: data.name, email: data.email, password: data.password, phoneNumber: data.phoneNumber })
  }

  const inputCls = (hasError: boolean) => cn(
    "form-input flex w-full rounded-lg border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 h-12 px-4 text-base transition-colors",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-300"
      : "border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary"
  )

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 py-4 md:px-10 lg:px-40 bg-white dark:bg-background-dark/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/auth" className="flex items-center gap-4 text-primary">
          <div className="size-6 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl font-bold">eco</span>
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">
            AgriConnect
          </h2>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 hidden sm:inline">Already have an account?</span>
          <Link href="/auth/login" className="text-primary text-sm font-bold hover:underline">
            Log In
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[480px] bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-primary/5 p-6 md:p-10">
          <div className="mb-8">
            <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-black leading-tight tracking-tight">
              Join as a Buyer
            </h1>
            <p className="text-primary/70 dark:text-primary/50 text-base font-normal mt-2">
              Access exclusive sustainable products and artisan goods.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Google OAuth */}
            <button
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 dark:border-slate-700 h-12 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              type="button"
              onClick={() => { window.location.href = GOOGLE_OAUTH_URL }}
            >
              <img
                alt="Google logo"
                className="w-5 h-5"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9xE48Ia_p8YWBnzI6GKi6IH-jqMO8QIW829jQNG5NcfkQJz2Iv-C_O0kEL-kb4f4Rn1HlsmPY7VkqDnDnaMHs9V5JOpygEZMrjzf87pjSuBTCNG0ugsZWLQm7yM6Z6rsMUkK3FEnrvERcYcmSIZ-EeGPiVjZJvE6uBk-Iw6UPxwxkIw4X7xi1BL2OexZ-XkOlIxVW3Jdg0CJ1Yt7vfcUGYP53M-e2qUR4GrOPNMEK5wvmrVaCzfY2pwapJhXTYjVTnGTggAWuFldS"
              />
              Continue with Google
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
              <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase tracking-widest">or email</span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Full Name</span>
                <input {...register('name')} className={inputCls(!!errors.name)} placeholder="John Doe" type="text" />
                {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Email Address</span>
                <input {...register('email')} className={inputCls(!!errors.email)} placeholder="john@example.com" type="email" autoComplete="email" />
                {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Password</span>
                  <div className="relative">
                    <input
                      {...register('password')}
                      className={cn(inputCls(!!errors.password), 'pr-10')}
                      placeholder="••••••••"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer select-none"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Confirm Password</span>
                  <input
                    {...register('confirmPassword')}
                    className={inputCls(!!errors.confirmPassword)}
                    placeholder="••••••••"
                    type="password"
                    autoComplete="new-password"
                  />
                  {errors.confirmPassword && <span className="text-xs text-red-500">{errors.confirmPassword.message}</span>}
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Phone Number <span className="text-slate-400 font-normal">(optional)</span></span>
                <input
                  {...register('phoneNumber')}
                  className={inputCls(false)}
                  placeholder="+254 700 000 000"
                  type="tel"
                />
              </label>
            </div>

            <div className="flex items-start gap-3 mt-2">
              <input className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" id="terms" type="checkbox" />
              <label className="text-xs text-slate-500 dark:text-slate-400 leading-normal" htmlFor="terms">
                By creating an account, you agree to our{' '}
                <a className="text-primary underline" href="#">Terms of Service</a> and{' '}
                <a className="text-primary underline" href="#">Privacy Policy</a>.
              </label>
            </div>

            <button
              className="w-full bg-primary text-white font-bold h-14 rounded-lg hover:opacity-90 transition-opacity mt-4 flex items-center justify-center gap-2 disabled:opacity-60"
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
                  Create Buyer Account
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

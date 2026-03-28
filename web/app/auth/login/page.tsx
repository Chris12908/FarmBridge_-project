'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useLogin } from '@/hooks/auth/useLogin'
import { useAuth } from '@/hooks/auth/useAuth'
import { routes } from '@/lib/routes'
import { GOOGLE_OAUTH_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { login, isLoading, error, isSuccess } = useLogin()
  const { isAuthenticated, isFarmer, user } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  // Redirect if already authenticated (covers both fresh login and revisiting while logged in)
  useEffect(() => {
    if (!isAuthenticated) return
    let targetRoute: string
    if (isFarmer) {
      // Farmer with incomplete profile → send to Step 2
      targetRoute = user?.farmerProfile?.profileComplete === false
        ? routes.auth.farmerProfile()
        : routes.farmer.dashboard()
    } else {
      targetRoute = routes.buyer.marketplace()
    }
    router.replace(targetRoute)
  }, [isAuthenticated, isFarmer, user, router])

  // Show success toast on login
  useEffect(() => {
    if (isSuccess) {
      toast.success('Welcome back!')
    }
  }, [isSuccess])

  // Show error toast when login fails
  useEffect(() => {
    if (error) {
      const msg = (error as { message?: string })?.message ?? 'Login failed. Please try again.'
      toast.error(msg)
    }
  }, [error])

  function onSubmit(data: LoginFormData) {
    login(data)
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 py-4 md:px-10 lg:px-40 bg-white dark:bg-background-dark/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/auth" className="flex items-center gap-4 text-primary">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow">
            <span className="material-symbols-outlined text-white text-xl">eco</span>
          </div>
          <span className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">
            AgriConnect
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 hidden sm:inline">New to AgriConnect?</span>
          <Link href="/auth" className="text-primary text-sm font-bold hover:underline">
            Create Account
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[440px] bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-primary/5 p-6 md:p-10">
          <div className="mb-8">
            <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-black leading-tight tracking-tight">
              Welcome back
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-normal mt-2">
              Sign in to your AgriConnect account.
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
                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Email Address</span>
                <input
                  {...register('email')}
                  className={cn(
                    "form-input flex w-full rounded-lg border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 h-12 px-4 text-base transition-colors",
                    errors.email
                      ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                      : "border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary"
                  )}
                  placeholder="john@example.com"
                  type="email"
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="text-xs text-red-500">{errors.email.message}</span>
                )}
              </label>

              <label className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Password</span>
                  <Link
                    href={routes.auth.forgotPassword()}
                    className="text-primary text-xs font-semibold hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    {...register('password')}
                    className={cn(
                      "form-input flex w-full rounded-lg border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 h-12 pl-4 pr-10 text-base transition-colors",
                      errors.password
                        ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                        : "border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary"
                    )}
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {errors.password && (
                  <span className="text-xs text-red-500">{errors.password.message}</span>
                )}
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                id="remember"
                type="checkbox"
              />
              <label className="text-sm text-slate-500 dark:text-slate-400" htmlFor="remember">
                Remember me for 30 days
              </label>
            </div>

            <button
              className="w-full bg-primary text-white font-bold h-14 rounded-lg hover:opacity-90 transition-opacity mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/auth" className="text-primary font-bold hover:underline decoration-2 underline-offset-4">
              Create one
            </Link>
          </p>
        </div>
      </main>

      {/* Trust Footer */}
      <div className="py-6 flex flex-wrap justify-center gap-8 opacity-40 grayscale">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">verified_user</span>
          <span className="text-xs font-semibold tracking-widest uppercase">Certified Organic</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">local_shipping</span>
          <span className="text-xs font-semibold tracking-widest uppercase">Global Logistics</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">payments</span>
          <span className="text-xs font-semibold tracking-widest uppercase">Secure Payments</span>
        </div>
      </div>
    </div>
  )
}

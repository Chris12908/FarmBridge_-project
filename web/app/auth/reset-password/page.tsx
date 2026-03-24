'use client'

import Link from 'next/link'
import { useState, Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useResetPassword } from '@/hooks/auth/usePasswordReset'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils'

const schema = z.object({
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const { resetPassword, isLoading } = useResetPassword()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function onSubmit({ newPassword }: FormData) {
    if (!token) {
      toast.error('Invalid or missing reset token')
      return
    }
    resetPassword({ token, newPassword }, {
      onSuccess: () => {
        toast.success('Password reset successfully!')
        router.push(routes.auth.login())
      },
      onError: (err: unknown) => {
        const msg = (err as { message?: string })?.message ?? 'Failed to reset password'
        toast.error(msg)
      },
    })
  }

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <span className="material-symbols-outlined text-red-500 text-5xl">error</span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Invalid Reset Link</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          This password reset link is invalid or has expired.
        </p>
        <Link href={routes.auth.forgotPassword()} className="block text-primary font-bold hover:underline">
          Request a new link
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-primary text-2xl">key</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100">New password</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
          Enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="text-slate-700 dark:text-slate-300 text-sm font-medium block mb-1.5">New Password</label>
          <div className="relative">
            <input
              {...register('newPassword')}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="new-password"
              className={cn(
                "w-full rounded-lg border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white h-12 pl-4 pr-10 text-base focus:outline-none focus:ring-1 transition-colors",
                errors.newPassword
                  ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                  : "border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(p => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
          {errors.newPassword && <p className="text-xs text-red-500 mt-1">{errors.newPassword.message}</p>}
        </div>

        <div>
          <label className="text-slate-700 dark:text-slate-300 text-sm font-medium block mb-1.5">Confirm Password</label>
          <input
            {...register('confirmPassword')}
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            className={cn(
              "w-full rounded-lg border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white h-12 px-4 text-base focus:outline-none focus:ring-1 transition-colors",
              errors.confirmPassword
                ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                : "border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary"
            )}
          />
          {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white font-bold h-14 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isLoading ? (
            <><span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />Resetting...</>
          ) : (
            <>Reset Password <span className="material-symbols-outlined">lock_reset</span></>
          )}
        </button>
      </form>
    </>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-primary/10 px-6 py-4 bg-white dark:bg-background-dark/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/auth" className="flex items-center gap-3 text-primary">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow">
            <span className="material-symbols-outlined text-white text-xl">eco</span>
          </div>
          <span className="text-slate-900 dark:text-slate-100 text-lg font-bold tracking-tight">AgriConnect</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[420px] bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-primary/5 p-6 md:p-10">
          <Suspense fallback={<div className="flex justify-center py-8"><span className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

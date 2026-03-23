'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useForgotPassword } from '@/hooks/auth/usePasswordReset'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type FormData = z.infer<typeof schema>

export default function ForgotPassword() {
  const { forgotPassword, isLoading, isSuccess } = useForgotPassword()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: FormData) {
    forgotPassword(data.email, {
      onError: (err: unknown) => {
        const msg = (err as { message?: string })?.message ?? 'Failed to send reset email'
        toast.error(msg)
      },
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-primary/10 px-6 py-4 md:px-10 bg-white dark:bg-background-dark/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/auth" className="flex items-center gap-3 text-primary">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow">
            <span className="material-symbols-outlined text-white text-xl">eco</span>
          </div>
          <span className="text-slate-900 dark:text-slate-100 text-lg font-bold tracking-tight">AgriConnect</span>
        </Link>
        <Link href={routes.auth.login()} className="text-primary text-sm font-bold hover:underline">
          Back to Login
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[420px] bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-primary/5 p-6 md:p-10">
          {isSuccess ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl">mark_email_read</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Check your email</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                We&apos;ve sent a password reset link to your email address. Check your inbox and follow the instructions.
              </p>
              <Link
                href={routes.auth.login()}
                className="block w-full mt-4 text-center bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl">lock_reset</span>
                </div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100">Forgot password?</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="text-slate-700 dark:text-slate-300 text-sm font-medium block mb-1.5">
                    Email Address
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    className={cn(
                      "w-full rounded-lg border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white h-12 px-4 text-base focus:outline-none focus:ring-1 transition-colors",
                      errors.email
                        ? "border-red-400 focus:border-red-400 focus:ring-red-300"
                        : "border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary"
                    )}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white font-bold h-14 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isLoading ? (
                    <><span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />Sending...</>
                  ) : (
                    <>Send Reset Link <span className="material-symbols-outlined">send</span></>
                  )}
                </button>

                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Remembered it?{' '}
                  <Link href={routes.auth.login()} className="text-primary font-bold hover:underline">
                    Sign in
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

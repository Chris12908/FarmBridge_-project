'use client'

import Link from 'next/link'
import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import { routes } from '@/lib/routes'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const mutation = useMutation({
    mutationFn: (t: string) => authService.verifyEmail(t),
  })

  useEffect(() => {
    if (token) {
      mutation.mutate(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <span className="material-symbols-outlined text-slate-400 text-5xl">mail</span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">No token provided</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Please use the link from your verification email.
        </p>
        <Link href={routes.auth.login()} className="block text-primary font-bold hover:underline mt-2">
          Go to Login
        </Link>
      </div>
    )
  }

  if (mutation.isPending) {
    return (
      <div className="text-center space-y-4 py-4">
        <span className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin block mx-auto" />
        <p className="text-slate-600 dark:text-slate-400 font-medium">Verifying your email...</p>
      </div>
    )
  }

  if (mutation.isSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl">verified</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Email Verified!</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Your email has been verified successfully. You can now sign in.
        </p>
        <Link
          href={routes.auth.login()}
          className="block w-full mt-4 text-center bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    )
  }

  const errMsg = (mutation.error as { message?: string })?.message ?? 'Verification failed. The link may have expired.'

  return (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto">
        <span className="material-symbols-outlined text-red-500 text-3xl">error</span>
      </div>
      <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Verification Failed</h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm">{errMsg}</p>
      <Link href={routes.auth.login()} className="block text-primary font-bold hover:underline mt-2">
        Go to Login
      </Link>
    </div>
  )
}

export default function VerifyEmailPage() {
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
            <VerifyEmailContent />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

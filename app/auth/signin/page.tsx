"use client"

import { Suspense, useEffect } from 'react'
import { Icon } from '../../../components/icon/Icon'
import { signIn } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'

function SignInContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get('error')
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  // If there's an error, redirect to our custom error page
  useEffect(() => {
    if (error) {
      router.push(`/auth/error?error=${error}`)
    }
  }, [error, router])

  const handleGoogleSignIn = () => {
    signIn('google', {
      callbackUrl,
      redirect: true
    })
  }

  // Don't render the sign-in form if there's an error (we're redirecting)
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-btn-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-dark-primary rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Sign in to access your account and calendar
          </p>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-6 py-4 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Icon name="Google" className="w-5 h-5 text-blue-500" />
            <span className="font-medium">Continue with Google</span>
          </button>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              By signing in, you agree to access your Google Calendar for scheduling purposes.
            </p>
            {callbackUrl !== '/' && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                You&apos;ll be redirected back to {decodeURIComponent(callbackUrl)} after signing in.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-btn-primary"></div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  )
} 
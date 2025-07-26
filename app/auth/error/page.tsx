"use client"

import { Suspense } from 'react'
import { FaExclamationTriangle, FaGoogle, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorInfo = (error: string | null) => {
    switch (error) {
      case 'OAuthCallbackError':
        return {
          icon: FaTimes,
          title: 'Sign-in Cancelled',
          message: 'It looks like you cancelled the sign-in process. No worries - you can try again whenever you\'re ready.',
          iconColor: 'text-orange-600 dark:text-orange-400',
          bgColor: 'bg-orange-100 dark:bg-orange-900/20'
        }
      case 'OAuthSignin':
      case 'OAuthCallback':
      case 'OAuthCreateAccount':
      case 'EmailCreateAccount':
      case 'Callback':
        return {
          icon: FaExclamationTriangle,
          title: 'Authentication Error',
          message: 'There was a problem with the sign-in process. Please try again.',
          iconColor: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-100 dark:bg-red-900/20'
        }
      case 'OAuthAccountNotLinked':
        return {
          icon: FaExclamationTriangle,
          title: 'Account Already Linked',
          message: 'This email is already associated with another account. Please use the original sign-in method.',
          iconColor: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-100 dark:bg-red-900/20'
        }
      case 'EmailSignin':
        return {
          icon: FaExclamationTriangle,
          title: 'Email Error',
          message: 'Unable to send verification email. Please check your email address.',
          iconColor: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-100 dark:bg-red-900/20'
        }
      case 'CredentialsSignin':
        return {
          icon: FaExclamationTriangle,
          title: 'Invalid Credentials',
          message: 'Invalid credentials. Please check your login details.',
          iconColor: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-100 dark:bg-red-900/20'
        }
      case 'SessionRequired':
        return {
          icon: FaExclamationTriangle,
          title: 'Sign-in Required',
          message: 'You need to be signed in to access this page.',
          iconColor: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-100 dark:bg-red-900/20'
        }
      default:
        return {
          icon: FaExclamationTriangle,
          title: 'Authentication Issue',
          message: 'There was a problem with your sign-in request. This could happen if you cancelled the request or there was a temporary issue.',
          iconColor: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-100 dark:bg-red-900/20'
        }
    }
  }

  const errorInfo = getErrorInfo(error)
  const IconComponent = errorInfo.icon

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-dark-primary rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`p-3 ${errorInfo.bgColor} rounded-full`}>
              <IconComponent className={`w-6 h-6 ${errorInfo.iconColor}`} />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {errorInfo.title}
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {errorInfo.message}
          </p>

          <div className="space-y-3">
            <button
              onClick={() => signIn('google')}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <FaGoogle className="w-5 h-5 text-blue-500" />
              Try signing in again
            </button>

            <Link
              href="/"
              className="w-full block text-center bg-gradient-to-r from-btn-primary to-btn-secondary text-white rounded-lg px-4 py-3 hover:opacity-90 transition-opacity duration-200"
            >
              Return to Home
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {error === 'OAuthCallbackError'
                ? 'Your sign-in attempt was cancelled. No personal information was shared.'
                : 'If you continue to experience issues, please try clearing your browser cookies or contact support.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-btn-primary"></div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  )
} 
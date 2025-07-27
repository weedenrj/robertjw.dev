"use client"

import { signOut, useSession } from "next-auth/react"
import clsx from "clsx"
import { Icon } from "./icon/Icon"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AuthButtonProps {
  className?: string
}

export function AuthButton({ className }: AuthButtonProps) {
  const { data: session, status } = useSession()
  const pathname = usePathname()

  if (status === "loading") {
    return (
      <div className={clsx("flex items-center justify-center", className)}>
        <div className="h-[40px] w-[40px] lg:w-[50px] lg:h-[50px] border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (session) {
    return (
      <div className={clsx("relative group", className)}>
        <button
          className="overflow-clip flex size-[40px] lg:size-[50px] cursor-pointer items-center justify-center rounded-full bg-opacity-100 text-opacity-100 text-black transition-all duration-300 ease-in-out hover:bg-modal-text hover:text-white bg-white dark:hover:bg-modal-text dark:bg-dark-bg-three dark:text-white"
          title={`Signed in as ${session.user?.name}`}
        >
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={`${session.user.name}'s profile`}
              className="w-full h-full object-cover"
              width={50}
              height={50}
              unoptimized={session.user.image.includes('googleusercontent.com')}
            />
          ) : (
            <span id="theme-toggle-dark-icon" className="pointer-events-none dark:block">
              <Icon name="User" className="text-xl" />
            </span>
          )}
        </button>

        {/* Dropdown menu on hover */}
        <div className="absolute right-0 top-12 lg:top-14 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {session.user?.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {session.user?.email}
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  // Create sign-in URL with current page as callback
  const signInUrl = `/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`

  return (
    <Link
      href={signInUrl}
      className={clsx(
        className,
        "flex size-[40px] lg:size-[50px] cursor-pointer items-center justify-center rounded-full bg-opacity-100 text-opacity-100 text-black transition-all duration-300 ease-in-out",
        "hover:bg-modal-text hover:text-white bg-white dark:hover:bg-modal-text dark:bg-dark-bg-three dark:text-white",
        pathname === "/auth/signin" && "!bg-modal-text !text-white"
      )}
      title="Sign in with Google"
    >
      <div className="flex size-[40px] lg:size-[50px] items-center justify-center">
        <Icon name="Lock" className="text-xl" />
      </div>
    </Link>
  )
} 
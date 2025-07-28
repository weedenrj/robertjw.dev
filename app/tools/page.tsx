"use client"

import { useEffect, Suspense } from "react"
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import clsx from "clsx"
import Link from "next/link"

type ToolTab = "schedule-parser"

const tools = [
  {
    id: "schedule-parser" as ToolTab,
    name: "Schedule Parser",
    description: "AI-powered work schedule parsing for family calendar management",
    icon: "📅"
  },
]

export default function ToolsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }, [session, status, router, pathname])

  return !session ? null : (
    <Suspense fallback={
      <div className="px-4 sm:px-5 md:px-10 lg:px-[60px] py-12 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-btn-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-text-primary dark:text-main-text">Loading...</span>
        </div>
      </div>
    }>
      <div className="">
        {status === "loading" && (
          <div className="px-4 sm:px-5 md:px-10 lg:px-[60px] py-12 flex items-center justify-center min-h-[400px]">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-2 border-btn-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-text-primary dark:text-main-text">Loading...</span>
            </div>
          </div>
        )}

        <div className="px-4 sm:px-5 md:px-10 lg:px-[60px] py-12">
          <h2 className={clsx("relative inline-block text-[2.5rem]",
            "dark:text-white font-bold transform after:absolute after:md:w-[12rem]",
            "after:left-[14rem] after:h-0.5 after:bg-gradient-to-r after:from-btn-secondary",
            "after:to-btn-secondary after:content-[''] after:rounded-md after:transform",
            "after:top-2/4 mb-12 md:mb-[30px]"
          )}>
            🤖 AI Tools
          </h2>
          <p className="text-text-primary dark:text-main-text mb-8">
            Powerful AI-driven tools to enhance your productivity
          </p>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className={clsx("bg-white dark:bg-dark-primary rounded-xl p-6 cursor-pointer",
                  "dark:border-dark-border dark:border-2 transition-all duration-300",
                  "hover:shadow-lg hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-gray-50",
                  "dark:hover:from-dark-primary dark:hover:to-dark-bg-two"
                )}
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{tool.icon}</span>
                  <h3 className="text-lg font-semibold dark:text-white">{tool.name}</h3>
                </div>
                <p className="text-text-primary dark:text-main-text text-sm mb-4">
                  {tool.description}
                </p>
                <div className="flex justify-end">
                  <span className="text-btn-primary text-sm font-medium">Launch →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  )
} 
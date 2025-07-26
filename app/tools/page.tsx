"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import clsx from "clsx"
import { AuthButton } from "../../components/AuthButton"
import Link from "next/link"
import { FaRobot, } from "react-icons/fa"


type ToolTab = "schedule-parser" | "weather-chat"

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
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<ToolTab>("schedule-parser")

  // Get active tab from URL params
  useEffect(() => {
    const tool = searchParams.get("tool") as ToolTab
    if (tool && tools.find(t => t.id === tool)) {
      setActiveTab(tool)
    }
  }, [searchParams])

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (status === "loading") return // Still loading
    if (!session) {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }, [session, status, router, pathname])

  const handleTabChange = (tool: ToolTab) => {
    setActiveTab(tool)
    const url = new URL(window.location.href)
    url.searchParams.set("tool", tool)
    router.push(url.pathname + url.search, { scroll: false })
  }

  const handleLaunchTool = (tool: ToolTab) => {
    router.push(`/tools/${tool}`)
  }

  // Show loading if session is still loading
  if (status === "loading") {
    return (
      <div className="mx-4 md:mx-[60px] p-4 md:p-16 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-btn-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-text-primary dark:text-main-text">Loading...</span>
        </div>
      </div>
    )
  }

  // Don't render anything if not authenticated (redirect will happen)
  if (!session) {
    return null
  }

  return (
    <div className="mx-4 md:mx-[60px] p-4 md:p-16">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col justify-center mb-4">
          <div className="mb-6">
            <nav className="text-sm text-text-primary dark:text-main-text">
              <Link href="/tools" className="hover:text-btn-primary transition-colors">
                Tools
              </Link>
            </nav>
          </div>
          <h1 className="text-[1.5625rem] font-semibold dark:text-white">
            🤖 AI Tools
          </h1>
          <p className="text-text-primary dark:text-main-text mt-1">
            Powerful AI-driven tools to enhance your productivity
          </p>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => handleLaunchTool(tool.id)}
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
          </div>
        ))}
      </div>
    </div>
  )
} 
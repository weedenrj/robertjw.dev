"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"
import { AuthButton } from "../../../components/AuthButton"
import { FileUpload } from "../../../components/FileUpload"
import { EventCard } from "../../../components/EventCard"
import { parseScheduleImage } from "../../../lib/chat-actions"
import { scheduleEventToGoogleEvent } from "../../../lib/types/schedule"
import type { ScheduleEvent, EventCardState, ScheduleParsingResponse } from "../../../lib/types/schedule"

type ParsingStage = "idle" | "analyzing" | "complete" | "error"

export default function ScheduleParserPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [eventCards, setEventCards] = useState<EventCardState[]>([])
  const [parsingStage, setParsingStage] = useState<ParsingStage>("idle")
  const [parsingResult, setParsingResult] = useState<ScheduleParsingResponse | null>(null)
  const [statusMessage, setStatusMessage] = useState("")

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (status === "loading") return // Still loading
    if (!session) {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }, [session, status, router, pathname])

  const handleFileUpload = async (base64: string) => {
    if (!session) return

    setParsingStage("analyzing")
    setStatusMessage("Analyzing schedule image...")
    setEventCards([])

    try {
      const result = await parseScheduleImage(base64)
      setParsingResult(result)

      // Convert events to event cards
      const cards: EventCardState[] = result.events.map(event => ({
        id: event.id,
        event,
        status: 'pending'
      }))

      setEventCards(cards)
      setParsingStage("complete")
      setStatusMessage(`Found ${result.totalEvents} events in ${result.monthYear}`)

    } catch (error) {
      console.error("Error parsing schedule:", error)
      setParsingStage("error")
      setStatusMessage(`Error: ${error instanceof Error ? error.message : 'Failed to parse schedule'}`)
    }
  }

  const handleAcceptEvent = async (event: ScheduleEvent) => {
    if (!session?.accessToken) return

    // Update card status to adding
    setEventCards(prev => prev.map(card =>
      card.id === event.id ? { ...card, status: 'adding' } : card
    ))

    try {
      // Convert to Google Calendar format
      const googleEvent = scheduleEventToGoogleEvent(event)

      // Add to Google Calendar
      const response = await fetch('/api/calendar/add-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event: googleEvent })
      })

      if (!response.ok) {
        throw new Error('Failed to add event to calendar')
      }

      const result = await response.json()

      // Update card status to accepted
      setEventCards(prev => prev.map(card =>
        card.id === event.id
          ? { ...card, status: 'accepted', googleEventId: result.eventId }
          : card
      ))

    } catch (error) {
      console.error("Error adding event:", error)
      // Reset card status to pending on error
      setEventCards(prev => prev.map(card =>
        card.id === event.id ? { ...card, status: 'pending' } : card
      ))
      alert(`Failed to add event: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleRejectEvent = (eventId: string) => {
    setEventCards(prev => prev.map(card =>
      card.id === eventId ? { ...card, status: 'rejected' } : card
    ))
  }

  const handleRegenerateEvent = async (event: ScheduleEvent) => {
    // Set status to regenerating
    setEventCards(prev => prev.map(card =>
      card.id === event.id ? { ...card, status: 'regenerating' } : card
    ))

    // For now, just reset to pending after a short delay
    // In a real implementation, you'd call the agent again with feedback
    setTimeout(() => {
      setEventCards(prev => prev.map(card =>
        card.id === event.id ? { ...card, status: 'pending' } : card
      ))
    }, 2000)
  }

  const clearResults = () => {
    setEventCards([])
    setParsingResult(null)
    setParsingStage("idle")
    setStatusMessage("")
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
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <nav className="text-sm text-text-primary dark:text-main-text">
          <Link href="/tools" className="hover:text-btn-primary transition-colors">
            Back to Tools
          </Link>
          <span className="mx-2">›</span>
          <span className="text-btn-primary font-medium">Schedule Parser</span>
        </nav>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-[1.5625rem] font-semibold dark:text-white flex items-center">
              <span className="mr-3 text-2xl">📅</span>
              Schedule Parser
            </h1>
            <p className="text-text-primary dark:text-main-text mt-1">
              AI-powered work schedule parsing for family calendar management
            </p>
          </div>

          <div className="flex items-center gap-4">
            {eventCards.length > 0 && (
              <button
                onClick={clearResults}
                className={clsx("px-4 py-2 rounded-lg border-[2px] border-color-910",
                  "text-sm font-medium text-text-primary dark:text-main-text",
                  "hover:bg-gradient-to-r hover:from-btn-primary hover:to-btn-secondary",
                  "hover:text-white hover:border-transparent transition-all duration-300 ease-in-out"
                )}
              >
                Clear Results
              </button>
            )}
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      {(parsingStage === "idle" || parsingStage === "analyzing") && (
        <div className={clsx("bg-light-bg dark:bg-dark-bg-two rounded-xl",
          "dark:border-dark-border dark:border-2 p-6 mb-6"
        )}>
          <FileUpload
            onFileSelect={() => { }}
            onFileUpload={handleFileUpload}
            isLoading={parsingStage === "analyzing"}
          />
        </div>
      )}

      {/* Status Message */}
      {statusMessage && (
        <div className={clsx("mb-6 p-4 rounded-lg border-2",
          parsingStage === "error"
            ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
            : "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
        )}>
          <div className="flex items-center gap-2">
            {parsingStage === "analyzing" && (
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            )}
            <span className="font-medium">{statusMessage}</span>
          </div>
          {parsingResult?.parsingNotes && (
            <p className="text-sm mt-2 opacity-80">
              {parsingResult.parsingNotes}
            </p>
          )}
        </div>
      )}

      {/* Event Cards */}
      {eventCards.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-primary dark:text-white">
              Detected Events ({eventCards.length})
            </h2>
            <div className="text-sm text-gray-500 dark:text-main-text">
              {eventCards.filter(card => card.status === 'accepted').length} accepted, {" "}
              {eventCards.filter(card => card.status === 'pending').length} pending, {" "}
              {eventCards.filter(card => card.status === 'rejected').length} rejected
            </div>
          </div>

          <div className="grid gap-4">
            {eventCards.map((card) => (
              <EventCard
                key={card.id}
                event={card.event}
                status={card.status}
                onAccept={handleAcceptEvent}
                onReject={handleRejectEvent}
                onRegenerate={handleRegenerateEvent}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 
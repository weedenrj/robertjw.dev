"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"
import { FileUpload } from "../../../components/FileUpload"
import { ScheduleCalendar } from "../../../components/ScheduleCalendar"
import { EventActionsPopover } from "../../../components/EventActionsPopover"
import { experimental_useObject as useObject } from "@ai-sdk/react"
import { z } from "zod"
import { useMonthlyCalendarEvents, useAddCalendarEvent } from "../../../hooks/useGoogleCalendar"
import { scheduleEventToGoogleEvent } from "../../../lib/types/schedule"
import dayjs from 'dayjs'

// Define the same Zod schema as the backend
const scheduleEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  description: z.string(),
  location: z.string(),
  confidence: z.number().min(0).max(1)
})

const scheduleParsingResponseSchema = z.object({
  events: z.array(scheduleEventSchema),
  monthYear: z.string(),
  totalEvents: z.number(),
  parsingNotes: z.string()
})

type ScheduleEvent = z.infer<typeof scheduleEventSchema>

export default function ScheduleParserPage() {
  const { data: session, status: sessionStatus } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  // State for file handling and image preview
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)

  // State for proposed events and parsing
  const [proposedEvents, setProposedEvents] = useState<ScheduleEvent[]>([])
  const [parsingProgress, setParsingProgress] = useState({
    stage: 'idle' as 'idle' | 'analyzing' | 'extracting' | 'complete',
    eventsFound: 0,
    notes: ''
  })

  // State for popover
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showPopover, setShowPopover] = useState(false)
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 })

  // Get current month's Google Calendar events
  const { data: googleEvents = [], isLoading: isLoadingGoogleEvents, error: calendarError } = useMonthlyCalendarEvents()
  const addCalendarEventMutation = useAddCalendarEvent()

  // AI parsing setup
  const { object, submit, isLoading, error, stop } = useObject({
    api: '/api/schedule-parser',
    schema: scheduleParsingResponseSchema,
    onFinish: ({ object: finalObject, error: finishError }) => {
      if (finalObject?.events) {
        setProposedEvents(finalObject.events)
        setParsingProgress({
          stage: 'complete',
          eventsFound: finalObject.events.length,
          notes: finalObject.parsingNotes || `Successfully parsed ${finalObject.events.length} events`
        })
      }
      if (finishError) {
        console.error('Parsing finished with error:', finishError)
      }
    }
  })

  // Watch for partial object updates during streaming
  useEffect(() => {
    if (object?.events) {
      const validEvents = object.events.filter(event =>
        event?.id &&
        event?.title &&
        event?.date
      )
      setProposedEvents(validEvents)
      setParsingProgress({
        stage: object.totalEvents ? 'extracting' : 'analyzing',
        eventsFound: validEvents.length,
        notes: object.parsingNotes || `Found ${validEvents.length} events...`
      })
    }
  }, [object])

  // Auth redirect
  useEffect(() => {
    if (sessionStatus === "loading") return
    if (!session) {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }, [session, sessionStatus, router, pathname])

  // Auto-process file when selected
  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setHasInteracted(true)
    setProposedEvents([])
    setParsingProgress({
      stage: 'analyzing',
      eventsFound: 0,
      notes: 'Starting analysis...'
    })

    // Create image preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Auto-submit for processing
    const processingReader = new FileReader()
    processingReader.onload = () => {
      const dataUrl = processingReader.result as string

      submit([
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Please analyze this work schedule image and extract all work shifts. Focus on blue rectangular blocks representing work assignments.'
            },
            {
              type: 'image',
              image: dataUrl
            }
          ]
        }
      ])
    }
    processingReader.readAsDataURL(file)
  }

  // Handle day click on calendar
  const handleDayClick = (date: Date, events: any[]) => {
    const proposedEventsForDay = proposedEvents.filter(event =>
      dayjs(event.date).isSame(dayjs(date), 'day')
    )

    if (proposedEventsForDay.length > 0) {
      setSelectedDate(date)
      setShowPopover(true)
    }
  }

  // Handle proposed event actions
  const handleProposedEventAction = async (eventId: string, action: 'approve' | 'deny' | 'regenerate') => {
    const event = proposedEvents.find(e => e.id === eventId)
    if (!event) return

    try {
      if (action === 'approve') {
        // Convert to Google Calendar format and add to calendar
        const googleEvent = scheduleEventToGoogleEvent(event)
        await addCalendarEventMutation.mutateAsync(googleEvent)

        // Remove from proposed events
        setProposedEvents(prev => prev.filter(e => e.id !== eventId))
      } else if (action === 'deny') {
        // Simply remove from proposed events
        setProposedEvents(prev => prev.filter(e => e.id !== eventId))
      } else if (action === 'regenerate') {
        // TODO: Implement regeneration logic
        console.log('Regenerate event:', eventId)
      }
    } catch (error) {
      console.error('Error handling event action:', error)
    }
  }

  // Reset function
  const handleReset = () => {
    setProposedEvents([])
    setSelectedFile(null)
    setImagePreview(null)
    setParsingProgress({ stage: 'idle', eventsFound: 0, notes: '' })
    setShowPopover(false)
    setSelectedDate(null)
  }

  if (!session) return null

  return (
    <div className="px-4 sm:px-5 md:px-10 lg:px-[60px] py-12">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/tools"
          className="text-btn-primary hover:text-btn-secondary transition-colors text-sm"
        >
          ← Back to Tools
        </Link>
      </div>

      <h2 className={clsx("relative inline-block text-[2.5rem]",
        "dark:text-white font-bold transform after:absolute after:md:w-[12rem]",
        "after:left-[20rem] after:h-0.5 after:bg-gradient-to-r after:from-btn-secondary",
        "after:to-btn-secondary after:content-[''] after:rounded-md after:transform",
        "after:top-2/4 mb-12 md:mb-[30px]"
      )}>
        Schedule Parser
      </h2>
      <p className="text-text-primary dark:text-main-text mb-8">
        Upload your work schedule image to see proposed events overlaid on your calendar
      </p>

      {/* File Upload Section */}
      {!imagePreview && (
        <div className={clsx("bg-light-bg dark:bg-dark-bg-two rounded-xl",
          "dark:border-dark-border dark:border-2 p-6 mb-6"
        )}>
          <FileUpload
            onFileSelect={handleFileSelect}
            isLoading={isLoading}
          />
          {isLoading && (
            <div className="mt-4 text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Processing image automatically...
              </div>
            </div>
          )}
        </div>
      )}

      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary dark:text-white">
              Schedule Image
            </h3>
            <button
              onClick={handleReset}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Try Another
            </button>
          </div>
          <div className="bg-white dark:bg-dark-bg-two rounded-xl p-4 border border-gray-200 dark:border-dark-border">
            <img
              src={imagePreview}
              alt="Schedule"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Real-time Progress Display */}
      {(isLoading || parsingProgress.stage !== 'idle') && (
        <div className={clsx("mb-6 p-4 rounded-lg border-2",
          error
            ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
            : "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isLoading && (
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              )}
              <span className="font-medium">
                {error ? "Error parsing schedule" :
                  parsingProgress.stage === 'analyzing' ? "Analyzing schedule image..." :
                    parsingProgress.stage === 'extracting' ? "Extracting events..." :
                      parsingProgress.stage === 'complete' ? "Analysis complete!" :
                        "Processing..."}
              </span>
            </div>
            {isLoading && (
              <button
                onClick={stop}
                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Stop
              </button>
            )}
          </div>

          {parsingProgress.notes && (
            <div className="mt-2 text-sm opacity-75">
              {parsingProgress.eventsFound > 0 && (
                <div className="mb-1">
                  Progress: {parsingProgress.eventsFound} events found
                  {object?.totalEvents && ` of ${object.totalEvents} expected`}
                </div>
              )}
              {parsingProgress.notes}
            </div>
          )}

          {isLoading && object?.totalEvents && parsingProgress.eventsFound > 0 && (
            <div className="mt-3">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(parsingProgress.eventsFound / object.totalEvents) * 100}%`
                  }}
                />
              </div>
              <div className="text-xs mt-1 opacity-60">
                {parsingProgress.eventsFound} / {object.totalEvents} events extracted
              </div>
            </div>
          )}
        </div>
      )}

      {/* Calendar View */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary dark:text-white">
            Calendar View
            {proposedEvents.length > 0 && (
              <span className="ml-2 text-sm font-normal text-blue-600 dark:text-blue-400">
                ({proposedEvents.length} proposed events)
              </span>
            )}
          </h3>
          {isLoadingGoogleEvents && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Loading calendar...
            </div>
          )}
          {calendarError && (
            <div className="text-sm text-red-600 dark:text-red-400">
              {calendarError.message.includes('Authentication') ? (
                <span>Authentication expired - please <a href="/auth/signin" className="underline">sign in again</a></span>
              ) : (
                `Calendar error: ${calendarError.message}`
              )}
            </div>
          )}
        </div>

        <ScheduleCalendar
          googleEvents={googleEvents}
          proposedEvents={proposedEvents}
          onDayClick={handleDayClick}
        />

        {/* Debug info */}
        <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs">
          Debug: {proposedEvents.length} proposed events, {googleEvents.length} Google events
        </div>

        {proposedEvents.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              💡 Click on any day with proposed events (shown in blue with 75% opacity) to approve, deny, or regenerate them.
            </p>
          </div>
        )}
      </div>

      {/* Event Actions Popover */}
      <EventActionsPopover
        isOpen={showPopover}
        onClose={() => setShowPopover(false)}
        selectedDate={selectedDate}
        proposedEvents={selectedDate ? proposedEvents.filter(event =>
          dayjs(event.date).isSame(dayjs(selectedDate), 'day')
        ).filter(event =>
          event.id && event.title && event.startTime && event.endTime
        ) as any[] : []}
        position={popoverPosition}
        onAction={handleProposedEventAction}
      />

      {/* Summary Information */}
      {object?.monthYear && parsingProgress.stage === 'complete' && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
            Analysis Complete ✓
          </h4>
          <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <div>Schedule Period: {object.monthYear}</div>
            <div>Total Events Found: {object.totalEvents}</div>
            {object.parsingNotes && <div>Notes: {object.parsingNotes}</div>}
          </div>
        </div>
      )}

      {/* Empty State */}
      {hasInteracted && proposedEvents.length === 0 && !isLoading && !selectedFile && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-2">
            No schedule uploaded yet
          </h3>
          <p className="text-text-primary dark:text-main-text">
            Upload an image of your work schedule to get started
          </p>
        </div>
      )}
    </div>
  )
} 
"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"
import { AuthButton } from "../../../components/AuthButton"
import { FileUpload } from "../../../components/FileUpload"
import { EventCard } from "../../../components/EventCard"
import { experimental_useObject as useObject } from "@ai-sdk/react"
import { z } from "zod"
import {
  type EventCardState
} from "../../../lib/types/schedule"

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

export default function ScheduleParserPage() {
  const { data: session, status: sessionStatus } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [eventCards, setEventCards] = useState<EventCardState[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [parsingProgress, setParsingProgress] = useState({
    stage: 'idle' as 'idle' | 'analyzing' | 'extracting' | 'complete',
    eventsFound: 0,
    notes: ''
  })

  const { object, submit, isLoading, error, stop } = useObject({
    api: '/api/schedule-parser',
    schema: scheduleParsingResponseSchema,
    onFinish: ({ object: finalObject, error: finishError }) => {
      if (finalObject?.events) {
        // Final update with all events marked as complete
        const completeEvents = finalObject.events.map(event => ({
          id: event.id,
          event,
          status: 'pending' as const
        }))
        setEventCards(completeEvents)
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

  // Watch for partial object updates during streaming - this creates the generative UI effect
  useEffect(() => {
    if (object?.events) {
      // Only include events with minimum required data to avoid rendering errors
      const validEvents = object.events.filter(event =>
        event?.id &&
        event?.title &&
        event?.date
      )

      // Update event cards as they stream in
      const streamingEvents = validEvents.map(event => ({
        id: event.id,
        event,
        status: 'pending' as const
      }))
      setEventCards(streamingEvents)

      // Update progress information
      setParsingProgress({
        stage: object.totalEvents ? 'extracting' : 'analyzing',
        eventsFound: validEvents.length,
        notes: object.parsingNotes || `Found ${validEvents.length} events...`
      })
    }
  }, [object])

  useEffect(() => {
    if (sessionStatus === "loading") return
    if (!session) {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }, [session, sessionStatus, router, pathname])

  const handleFileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    setHasInteracted(true)
    setEventCards([])
    setParsingProgress({
      stage: 'analyzing',
      eventsFound: 0,
      notes: 'Starting analysis...'
    })

    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string

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
    reader.readAsDataURL(selectedFile)
  }

  if (!session) return null

  return (
    <div className="">
      <div className="px-4 sm:px-5 md:px-10 lg:px-[60px] py-12">
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
          Upload your work schedule image to extract calendar events
        </p>

        {/* File Upload Section */}
        {eventCards.length === 0 && (
          <div className={clsx("bg-light-bg dark:bg-dark-bg-two rounded-xl",
            "dark:border-dark-border dark:border-2 p-6 mb-6"
          )}>
            <FileUpload
              onFileSelect={setSelectedFile}
              isLoading={isLoading}
            />

            {selectedFile && (
              <form onSubmit={handleFileSubmit} className="mt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={clsx("w-full px-4 py-2 rounded-lg font-medium transition-all",
                    isLoading
                      ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      : "bg-btn-primary text-white hover:bg-btn-secondary"
                  )}
                >
                  {isLoading ? "Analyzing..." : "Analyze Schedule"}
                </button>
              </form>
            )}
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

            {/* Progress Details */}
            {parsingProgress.notes && (
              <div className="mt-2 text-sm opacity-75">
                <div className="max-h-32 overflow-y-auto">
                  {parsingProgress.eventsFound > 0 && (
                    <div className="mb-1">
                      Progress: {parsingProgress.eventsFound} events found
                      {object?.totalEvents && ` of ${object.totalEvents} expected`}
                    </div>
                  )}
                  {parsingProgress.notes}
                </div>
              </div>
            )}

            {/* Streaming Progress Bar */}
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

        {/* Real-time Event Cards Display */}
        {eventCards.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary dark:text-white">
                Extracted Schedule Events ({eventCards.length})
                {isLoading && (
                  <span className="ml-2 text-sm font-normal text-blue-600 dark:text-blue-400">
                    {parsingProgress.stage === 'extracting' ? '• Streaming...' : '• Processing...'}
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-2">
                {isLoading && (
                  <button
                    onClick={stop}
                    className="px-3 py-1 text-sm border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Stop Parsing
                  </button>
                )}
                <button
                  onClick={() => {
                    setEventCards([])
                    setSelectedFile(null)
                    setParsingProgress({ stage: 'idle', eventsFound: 0, notes: '' })
                  }}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Try Another
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {eventCards.map((card, index) => (
                <div
                  key={`event-${card.id || index}`}
                  className={clsx(
                    "transition-all duration-500 ease-in-out",
                    isLoading && index === eventCards.length - 1 ?
                      "animate-pulse border-l-4 border-blue-500" : ""
                  )}
                >
                  <EventCard
                    event={card.event}
                    status={card.status}
                    onAction={async (action) => {
                      setEventCards(prev =>
                        prev.map(c =>
                          c.id === card.id
                            ? {
                              ...c,
                              status: action === 'accept'
                                ? 'accepted'
                                : action === 'reject'
                                  ? 'rejected'
                                  : action === 'add-to-calendar'
                                    ? 'adding'
                                    : 'regenerating'
                            }
                            : c
                        )
                      )

                      if (action === 'add-to-calendar') {
                        setTimeout(() => {
                          setEventCards(prev =>
                            prev.map(c =>
                              c.id === card.id
                                ? { ...c, status: 'accepted', googleEventId: 'simulated-id' }
                                : c
                            )
                          )
                        }, 1000)
                      }
                    }}
                  />
                </div>
              ))}
            </div>

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
          </div>
        )}

        {/* Empty State */}
        {hasInteracted && eventCards.length === 0 && !isLoading && !selectedFile && (
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
    </div>
  )
} 
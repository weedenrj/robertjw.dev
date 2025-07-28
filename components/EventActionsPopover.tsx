"use client"

import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { ScheduleEvent, GoogleCalendarEvent } from '../lib/types/schedule'

interface EventActionsPopoverProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date | null
  proposedEvents: ScheduleEvent[]
  googleEvents: GoogleCalendarEvent[]
  position: { x: number; y: number }
  onAction: (eventId: string, action: 'approve' | 'deny' | 'regenerate') => void
}

export function EventActionsPopover({
  isOpen,
  onClose,
  selectedDate,
  proposedEvents,
  googleEvents = [],
  position,
  onAction
}: EventActionsPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 150)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour24 = parseInt(hours)
    const ampm = hour24 >= 12 ? 'PM' : 'AM'
    const hour12 = hour24 % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  // Generate hourly timeline (6 AM to 11 PM)
  const generateTimeline = () => {
    const hours = []
    for (let i = 6; i <= 23; i++) {
      hours.push({
        hour: i,
        label: `${i === 12 ? 12 : i % 12 || 12}:00 ${i >= 12 ? 'PM' : 'AM'}`
      })
    }
    return hours
  }

  // Get events for the selected day
  const getEventsForDay = () => {
    if (!selectedDate) return { proposed: [], google: [] }

    const dayGoogleEvents = googleEvents.filter(event => {
      const eventDate = event.start?.dateTime
        ? dayjs(event.start.dateTime)
        : event.start?.date
          ? dayjs(event.start.date)
          : null
      return eventDate && eventDate.isSame(dayjs(selectedDate), 'day')
    })

    return {
      proposed: proposedEvents,
      google: dayGoogleEvents
    }
  }

  // Convert time to hour position for timeline
  const getEventPosition = (startTime: string, endTime: string) => {
    const start = parseInt(startTime.split(':')[0]) + parseInt(startTime.split(':')[1]) / 60
    const end = parseInt(endTime.split(':')[0]) + parseInt(endTime.split(':')[1]) / 60

    // Calculate position relative to 6 AM (start of timeline)
    const startPos = ((start - 6) / 18) * 100 // 18 hours total (6 AM to 11 PM)
    const height = ((end - start) / 18) * 100

    return {
      top: `${Math.max(0, startPos)}%`,
      height: `${Math.max(2, height)}%` // Minimum 2% height for visibility
    }
  }

  if (!isVisible || !selectedDate) {
    return null
  }

  const { proposed, google } = getEventsForDay()
  const timeline = generateTimeline()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      {/* Backdrop */}
      <div
        className={clsx(
          "absolute inset-0 bg-black transition-opacity duration-150",
          isOpen ? "opacity-20" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Popover */}
      <div
        ref={popoverRef}
        className={clsx(
          "relative bg-white dark:bg-dark-bg-two rounded-xl shadow-2xl border border-gray-200 dark:border-dark-border",
          "w-full max-w-4xl mx-4 transform transition-all duration-150",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2"
        )}
        style={{
          maxHeight: '80vh',
          minHeight: '600px'
        }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-dark-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary dark:text-white">
              {dayjs(selectedDate).format('MMMM D, YYYY')}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {google.length} existing event{google.length !== 1 ? 's' : ''} • {proposed.length} proposed event{proposed.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Main Content */}
        <div className="flex h-[500px]">
          {/* Timeline View - Left Side */}
          <div className="flex-1 p-4 border-r border-gray-200 dark:border-dark-border">
            <div className="h-full overflow-y-auto">
              <div className="relative" style={{ minHeight: '450px' }}>
                {/* Hour Labels */}
                {timeline.map((hour, index) => (
                  <div
                    key={hour.hour}
                    className="absolute left-0 text-xs text-gray-500 dark:text-gray-400 w-16"
                    style={{ top: `${(index / (timeline.length - 1)) * 100}%` }}
                  >
                    {hour.label}
                  </div>
                ))}

                {/* Timeline Grid */}
                <div className="absolute left-16 right-0 top-0 bottom-0">
                  {timeline.map((_, index) => (
                    <div
                      key={index}
                      className="absolute left-0 right-0 border-t border-gray-200 dark:border-gray-600"
                      style={{ top: `${(index / (timeline.length - 1)) * 100}%` }}
                    />
                  ))}

                  {/* Google Calendar Events */}
                  {google.map((event) => {
                    const startTime = event.start?.dateTime
                      ? dayjs(event.start.dateTime).format('HH:mm')
                      : '09:00'
                    const endTime = event.end?.dateTime
                      ? dayjs(event.end.dateTime).format('HH:mm')
                      : '10:00'

                    const position = getEventPosition(startTime, endTime)

                    return (
                      <div
                        key={event.id}
                        className="absolute left-0 right-1/2 mr-1 bg-blue-500 text-white text-xs p-1 rounded border-l-4 border-blue-700"
                        style={position}
                      >
                        <div className="font-medium truncate">{event.summary}</div>
                        <div className="text-blue-100">{formatTime(startTime)} - {formatTime(endTime)}</div>
                      </div>
                    )
                  })}

                  {/* Proposed Events */}
                  {proposed.map((event) => {
                    const position = getEventPosition(event.startTime, event.endTime)

                    return (
                      <div
                        key={event.id}
                        className="absolute left-1/2 right-0 ml-1 bg-blue-400 text-white text-xs p-1 rounded border-l-4 border-blue-600 opacity-75"
                        style={position}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-blue-100">{formatTime(event.startTime)} - {formatTime(event.endTime)}</div>
                        <div className="text-xs text-blue-200">{Math.round(event.confidence * 100)}% confidence</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Action Panel - Right Side */}
          <div className="w-80 p-4">
            <h4 className="font-medium text-text-primary dark:text-white mb-4">
              Proposed Events ({proposed.length})
            </h4>

            {proposed.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No proposed events for this day
              </p>
            ) : (
              <div className="space-y-3 overflow-y-auto max-h-[400px]">
                {proposed.map((event) => (
                  <div
                    key={event.id}
                    className="bg-gray-50 dark:bg-dark-bg rounded-lg p-3 border border-gray-200 dark:border-dark-border"
                  >
                    <h5 className="font-medium text-text-primary dark:text-white text-sm mb-1">
                      {event.title}
                    </h5>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {formatTime(event.startTime)} - {formatTime(event.endTime)}
                    </div>
                    <div className="flex gap-1 mb-3">
                      <button
                        onClick={() => onAction(event.id, 'approve')}
                        className="flex-1 px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onAction(event.id, 'regenerate')}
                        className="px-2 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-medium rounded transition-colors"
                      >
                        Regen
                      </button>
                      <button
                        onClick={() => onAction(event.id, 'deny')}
                        className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded transition-colors"
                      >
                        Deny
                      </button>
                    </div>
                    {event.confidence && (
                      <div className={clsx(
                        "text-xs",
                        event.confidence >= 0.8 ? "text-green-600 dark:text-green-400" :
                          event.confidence >= 0.6 ? "text-yellow-600 dark:text-yellow-400" :
                            "text-red-600 dark:text-red-400"
                      )}>
                        {Math.round(event.confidence * 100)}% confidence
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
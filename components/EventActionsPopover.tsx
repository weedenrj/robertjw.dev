"use client"

import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import dayjs from 'dayjs'

interface ProposedEvent {
  id: string
  title: string
  startTime: string
  endTime: string
  confidence: number
  description?: string
  location?: string
}

interface EventActionsPopoverProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date | null
  proposedEvents: ProposedEvent[]
  position: { x: number; y: number }
  onAction: (eventId: string, action: 'approve' | 'deny' | 'regenerate') => void
}

export function EventActionsPopover({
  isOpen,
  onClose,
  selectedDate,
  proposedEvents,
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

  if (!isVisible || !selectedDate || proposedEvents.length === 0) {
    return null
  }

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
          "max-w-md w-full mx-4 transform transition-all duration-150",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2"
        )}
        style={{
          maxHeight: '80vh',
          overflowY: 'auto'
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
            {proposedEvents.length} proposed event{proposedEvents.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Proposed Events */}
        <div className="p-4 space-y-4">
          {proposedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gray-50 dark:bg-dark-bg rounded-lg p-4 border border-gray-200 dark:border-dark-border"
            >
              {/* Event Details */}
              <div className="mb-3">
                <h4 className="font-medium text-text-primary dark:text-white mb-1">
                  {event.title}
                </h4>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                  <span className="text-xs">•</span>
                  <span className={clsx(
                    "text-xs font-medium",
                    event.confidence >= 0.8 ? "text-green-600 dark:text-green-400" :
                      event.confidence >= 0.6 ? "text-yellow-600 dark:text-yellow-400" :
                        "text-red-600 dark:text-red-400"
                  )}>
                    {Math.round(event.confidence * 100)}% confidence
                  </span>
                </div>
                {event.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {event.description}
                  </p>
                )}
                {event.location && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                    <span>📍</span>
                    {event.location}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => onAction(event.id, 'approve')}
                  className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => onAction(event.id, 'regenerate')}
                  className="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Regenerate
                </button>
                <button
                  onClick={() => onAction(event.id, 'deny')}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Deny
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg rounded-b-xl">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Click outside or press Escape to close
          </p>
        </div>
      </div>
    </div>
  )
} 
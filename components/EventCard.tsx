"use client"

import { useState } from "react"
import clsx from "clsx"
import { ScheduleEvent } from "../lib/types/schedule"

interface EventCardProps {
  event: ScheduleEvent
  onAction: (action: 'accept' | 'reject' | 'regenerate' | 'add-to-calendar') => Promise<void>
  status: 'pending' | 'accepted' | 'rejected' | 'regenerating' | 'adding'
  className?: string
}

export function EventCard({
  event,
  onAction,
  status,
  className
}: EventCardProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleAction = async (action: 'accept' | 'reject' | 'regenerate' | 'add-to-calendar') => {
    setIsProcessing(true)
    try {
      await onAction(action)
    } finally {
      setIsProcessing(false)
    }
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) {
      return 'Loading...'
    }

    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return 'Invalid Date'
    }

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (time: string | undefined) => {
    if (!time || !time.includes(':')) {
      return 'Loading...'
    }

    const [hours, minutes] = time.split(':')
    if (!hours || !minutes) {
      return 'Loading...'
    }

    const hour24 = parseInt(hours)
    if (isNaN(hour24)) {
      return 'Loading...'
    }

    const ampm = hour24 >= 12 ? 'PM' : 'AM'
    const hour12 = hour24 % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  const getStatusColor = () => {
    switch (status) {
      case 'accepted': return 'border-green-500 bg-green-50 dark:bg-green-900/20'
      case 'rejected': return 'border-red-500 bg-red-50 dark:bg-red-900/20'
      case 'regenerating': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
      case 'adding': return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
      default: return 'border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg-two'
    }
  }

  const getConfidenceColor = () => {
    if (event.confidence >= 0.8) return 'text-green-600 dark:text-green-400'
    if (event.confidence >= 0.6) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <div className={clsx(
      "rounded-xl border-2 p-4 transition-all duration-200",
      getStatusColor(),
      className
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-text-primary dark:text-white">
            {event.title || 'Loading event...'}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-600 dark:text-main-text">
              {formatDate(event.date)}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-sm text-gray-600 dark:text-main-text">
              {formatTime(event.startTime)} - {formatTime(event.endTime)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={clsx("text-xs font-medium", getConfidenceColor())}>
            {event.confidence ? Math.round(event.confidence * 100) : 0}%
          </span>
          {status === 'accepted' && (
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
          {status === 'rejected' && (
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-white text-xs">×</span>
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      {(event.description || event.location) && (
        <div className="space-y-1 mb-4">
          {event.description && (
            <p className="text-sm text-gray-600 dark:text-main-text">
              {event.description}
            </p>
          )}
          {event.location && (
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <span>📍</span>
              {event.location}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-3 border-t border-light-border dark:border-dark-border">
        {status === 'pending' && (
          <>
            <button
              onClick={() => handleAction('add-to-calendar')}
              disabled={isProcessing}
              className={clsx("button-red-gradient px-4 py-2 text-sm flex-1",
                isProcessing && "opacity-50 cursor-not-allowed"
              )}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </div>
              ) : (
                "Add to Calendar"
              )}
            </button>
            <button
              onClick={() => handleAction('regenerate')}
              disabled={isProcessing}
              className={clsx("px-4 py-2 rounded-lg border-[2px] border-yellow-500",
                "text-sm font-medium text-yellow-700 dark:text-yellow-300",
                "hover:bg-yellow-50 dark:hover:bg-yellow-900/20",
                "transition-all duration-200",
                isProcessing && "opacity-50 cursor-not-allowed"
              )}
            >
              Regenerate
            </button>
            <button
              onClick={() => handleAction('reject')}
              disabled={isProcessing}
              className={clsx("px-4 py-2 rounded-lg border-[2px] border-red-500",
                "text-sm font-medium text-red-700 dark:text-red-300",
                "hover:bg-red-50 dark:hover:bg-red-900/20",
                "transition-all duration-200",
                isProcessing && "opacity-50 cursor-not-allowed"
              )}
            >
              Delete
            </button>
          </>
        )}

        {status === 'adding' && (
          <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 py-2">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium">Adding to calendar...</span>
          </div>
        )}

        {status === 'accepted' && (
          <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 py-2">
            <span className="text-sm font-medium">✓ Added to calendar</span>
          </div>
        )}

        {status === 'rejected' && (
          <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 py-2">
            <span className="text-sm font-medium">× Deleted</span>
          </div>
        )}

        {status === 'regenerating' && (
          <div className="flex items-center justify-center gap-2 text-yellow-600 dark:text-yellow-400 py-2">
            <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium">Regenerating...</span>
          </div>
        )}
      </div>
    </div>
  )
} 
"use client"

import { useState, useMemo, useCallback } from 'react'
import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar'
import dayjs from 'dayjs'
import { useGoogleCalendarColors } from '../hooks/useGoogleCalendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Setup dayjs localizer
const localizer = dayjsLocalizer(dayjs)

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  resource?: {
    isProposed?: boolean
    googleColor?: string
    confidence?: number
    originalEvent?: any
  }
}

interface ScheduleCalendarProps {
  googleEvents: any[]
  proposedEvents: any[]
  onDayClick?: (date: Date, events: CalendarEvent[]) => void
  onProposedEventAction?: (eventId: string, action: 'approve' | 'deny' | 'regenerate') => void
}

const BLUEBERRY_COLOR = '#4285f4' // Google's Blueberry color for proposed events

export function ScheduleCalendar({
  googleEvents = [],
  proposedEvents = [],
  onDayClick,
  onProposedEventAction
}: ScheduleCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Fetch Google Calendar color definitions
  const { data: colorData } = useGoogleCalendarColors()

  // Convert events to calendar format
  const calendarEvents = useMemo(() => {
    const events: CalendarEvent[] = []

    console.log('ScheduleCalendar: Processing events', {
      googleEventsCount: googleEvents.length,
      proposedEventsCount: proposedEvents.length,
      proposedEvents: proposedEvents
    })

    // Add Google Calendar events
    googleEvents.forEach(gEvent => {
      if (gEvent.start?.dateTime || gEvent.start?.date) {
        const startDate = gEvent.start.dateTime
          ? new Date(gEvent.start.dateTime)
          : new Date(gEvent.start.date)
        const endDate = gEvent.end?.dateTime
          ? new Date(gEvent.end.dateTime)
          : new Date(gEvent.end.date)

        // Get the actual Google Calendar color from the API data
        const getEventColor = () => {
          if (gEvent.colorId && colorData?.event?.[gEvent.colorId]) {
            return colorData.event[gEvent.colorId].background
          }
          // Default to blue if no color specified
          return '#4285f4'
        }

        events.push({
          id: gEvent.id,
          title: gEvent.summary || 'Untitled Event',
          start: startDate,
          end: endDate,
          resource: {
            isProposed: false,
            googleColor: getEventColor(),
            originalEvent: gEvent
          }
        })
      }
    })

    // Add proposed events
    proposedEvents.forEach(pEvent => {
      if (pEvent.date && pEvent.startTime && pEvent.endTime) {
        const startDateTime = dayjs(`${pEvent.date}T${pEvent.startTime}:00`)
        const endDateTime = dayjs(`${pEvent.date}T${pEvent.endTime}:00`)

        const proposedEvent = {
          id: pEvent.id,
          title: pEvent.title,
          start: startDateTime.toDate(),
          end: endDateTime.toDate(),
          resource: {
            isProposed: true,
            confidence: pEvent.confidence,
            originalEvent: pEvent
          }
        }

        console.log('Adding proposed event:', proposedEvent)
        events.push(proposedEvent)
      } else {
        console.log('Skipping invalid proposed event:', pEvent)
      }
    })

    console.log('Final calendar events:', events)
    return events
  }, [googleEvents, proposedEvents, colorData])

  // Handle day click
  const handleSelectSlot = useCallback(({ start }: { start: Date }) => {
    const dayEvents = calendarEvents.filter(event =>
      dayjs(event.start).isSame(dayjs(start), 'day')
    )

    console.log('Day clicked:', start, 'Events for day:', dayEvents)

    setSelectedDate(start)
    onDayClick?.(start, dayEvents)
  }, [calendarEvents, onDayClick])

  // Custom event style
  const eventStyleGetter = useCallback((event: CalendarEvent) => {
    const isProposed = event.resource?.isProposed

    if (isProposed) {
      // Proposed events: Blueberry color with 75% opacity
      return {
        style: {
          backgroundColor: BLUEBERRY_COLOR,
          opacity: 0.75,
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }
      }
    } else {
      // Google Calendar events: Use their actual color
      const googleColor = event.resource?.googleColor || '#4285f4'
      return {
        style: {
          backgroundColor: googleColor,
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }
      }
    }
  }, [])

  // Custom day prop getter for highlighting selected day
  const dayPropGetter = useCallback((date: Date) => {
    if (selectedDate && dayjs(date).isSame(dayjs(selectedDate), 'day')) {
      return {
        style: {
          backgroundColor: '#e3f2fd'
        }
      }
    }
    return {}
  }, [selectedDate])

  return (
    <div className="h-[600px] bg-neutral-100 dark:bg-white rounded-lg p-4">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        view={Views.MONTH}
        views={[Views.MONTH]} // Only month view
        onSelectSlot={handleSelectSlot}
        selectable
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
        popup={false} // Disable default popup
        showMultiDayTimes={false}
        step={60}
        timeslots={1}
        formats={{
          monthHeaderFormat: 'MMMM YYYY',
          dayFormat: 'D',
          weekdayFormat: 'dddd'
        }}
        className="schedule-calendar"
      />
    </div>
  )
} 
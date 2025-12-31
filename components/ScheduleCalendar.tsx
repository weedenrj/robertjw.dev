"use client"

import { useState, useCallback } from 'react'
import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar'
import dayjs from 'dayjs'
import { useGoogleCalendarColors } from '../hooks/useGoogleCalendar'
import { ScheduleEvent } from '../schemas/schedule-event'
import { GoogleCalendarEvent } from '../lib/types/schedule'
import 'react-big-calendar/lib/css/react-big-calendar.css'

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
    originalEvent?: GoogleCalendarEvent | ScheduleEvent
  }
}

interface ScheduleCalendarProps {
  googleEvents: GoogleCalendarEvent[]
  proposedEvents: ScheduleEvent[]
  onDayClick?: (date: Date, events: CalendarEvent[]) => void
  onProposedEventAction?: (eventId: string, action: 'approve' | 'deny' | 'regenerate') => void
}

const BLUEBERRY_COLOR = '#4285f4'

export function ScheduleCalendar({
  googleEvents = [],
  proposedEvents = [],
  onDayClick
}: ScheduleCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const { data: colorData } = useGoogleCalendarColors()
  console.log(proposedEvents)


  const calendarEvents = [
    ...googleEvents.reduce<CalendarEvent[]>((events, gEvent) => {
      if (gEvent.start?.dateTime || gEvent.start?.date) {
        const startDate = gEvent.start.dateTime
          ? new Date(gEvent.start.dateTime)
          : new Date(gEvent.start.date + 'T00:00:00')
        const endDate = gEvent.end?.dateTime
          ? new Date(gEvent.end.dateTime)
          : gEvent.end?.date
            ? new Date(gEvent.end.date + 'T23:59:59')
            : new Date(startDate.getTime() + 60 * 60 * 1000)

        const getEventColor = () => {
          if (gEvent.colorId && colorData?.event?.[gEvent.colorId]) {
            return colorData.event[gEvent.colorId].background
          }
          return '#4285f4'
        }

        events.push({
          id: gEvent.id || 'unknown',
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
      return events
    }, []),
    ...proposedEvents.reduce<CalendarEvent[]>((events, pEvent, index) => {
      if (pEvent.date && pEvent.startTime && pEvent.endTime && pEvent.title) {
        const startDateTime = dayjs(`${pEvent.date}T${pEvent.startTime}:00`)
        const endDateTime = dayjs(`${pEvent.date}T${pEvent.endTime}:00`)

        if (startDateTime.isValid() && endDateTime.isValid()) {
          events.push({
            id: pEvent.id || `proposed-${index}`,
            title: pEvent.title,
            start: startDateTime.toDate(),
            end: endDateTime.toDate(),
            resource: {
              isProposed: true,
              confidence: pEvent.confidence,
              originalEvent: pEvent
            }
          })
        }
      }
      return events
    }, [])
  ]

  const handleSelectSlot = useCallback(({ start }: { start: Date }) => {
    const dayEvents = calendarEvents.filter(event =>
      dayjs(event.start).isSame(dayjs(start), 'day')
    )

    setSelectedDate(start)
    onDayClick?.(start, dayEvents)
  }, [calendarEvents, onDayClick])

  const eventStyleGetter = useCallback((event: CalendarEvent) => {
    const isProposed = event.resource?.isProposed

    if (isProposed) {
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

  const CustomDateCellWrapper = useCallback(({ value, children }: { value: Date, children: React.ReactNode }) => {
    const dayHasProposedEvents = proposedEvents.some(pEvent => {
      if (pEvent.date) {
        return dayjs(pEvent.date).isSame(dayjs(value), 'day')
      }
      return false
    })

    const isSelected = selectedDate && dayjs(value).isSame(dayjs(selectedDate), 'day')

    return (
      <div
        className={`h-full w-full relative ${isSelected
          ? 'bg-blue-100'
          : dayHasProposedEvents
            ? 'bg-blue-50'
            : ''
          }`}
      >
        {children}
      </div>
    )
  }, [proposedEvents, selectedDate])

  return (
    <div className="h-[600px] bg-neutral-100 dark:bg-white rounded-lg p-4">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        view={Views.MONTH}
        views={[Views.MONTH]}
        onSelectSlot={handleSelectSlot}
        selectable
        eventPropGetter={eventStyleGetter}
        components={{
          dateCellWrapper: CustomDateCellWrapper
        }}
        popup={false}
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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'

interface GoogleCalendarEvent {
  id: string
  summary: string
  start: {
    dateTime?: string
    date?: string
  }
  end: {
    dateTime?: string
    date?: string
  }
  colorId?: string
  description?: string
  location?: string
}

interface FetchEventsParams {
  calendarId?: string
  timeMin?: string
  timeMax?: string
}

async function fetchCalendarEvents({ calendarId = 'primary', timeMin, timeMax }: FetchEventsParams) {
  const params = new URLSearchParams()
  if (calendarId) params.append('calendarId', calendarId)
  if (timeMin) params.append('timeMin', timeMin)
  if (timeMax) params.append('timeMax', timeMax)

  const response = await fetch(`/api/calendar/events?${params.toString()}`)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    if (response.status === 401) {
      throw new Error(errorData.error || 'Authentication failed - please sign in again')
    }
    throw new Error(errorData.error || 'Failed to fetch calendar events')
  }

  const data = await response.json()
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch calendar events')
  }

  return data.events as GoogleCalendarEvent[]
}

async function fetchCalendarColors() {
  const response = await fetch('/api/calendar/colors')

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    if (response.status === 401) {
      throw new Error(errorData.error || 'Authentication failed - please sign in again')
    }
    throw new Error(errorData.error || 'Failed to fetch calendar colors')
  }

  const data = await response.json()
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch calendar colors')
  }

  return data.colors
}

async function addCalendarEvent(event: any) {
  const response = await fetch('/api/calendar/add-event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event }),
  })

  if (!response.ok) {
    throw new Error('Failed to add calendar event')
  }

  const data = await response.json()
  if (!data.success) {
    throw new Error(data.error || 'Failed to add calendar event')
  }

  return data
}

export function useGoogleCalendarColors() {
  return useQuery({
    queryKey: ['googleCalendarColors'],
    queryFn: fetchCalendarColors,
    staleTime: 60 * 60 * 1000, // 1 hour (colors don't change often)
    retry: 2,
  })
}

export function useGoogleCalendarEvents(params: FetchEventsParams = {}) {
  return useQuery({
    queryKey: ['googleCalendarEvents', params],
    queryFn: () => fetchCalendarEvents(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  })
}

export function useAddCalendarEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addCalendarEvent,
    onSuccess: () => {
      // Invalidate and refetch calendar events
      queryClient.invalidateQueries({ queryKey: ['googleCalendarEvents'] })
    },
  })
}

// Hook to get events for a specific month
export function useMonthlyCalendarEvents(year?: number, month?: number) {
  const targetDate = dayjs()
    .year(year || dayjs().year())
    .month((month || dayjs().month()))
    .startOf('month')

  const timeMin = targetDate.toISOString()
  const timeMax = targetDate.endOf('month').toISOString()

  return useGoogleCalendarEvents({
    timeMin,
    timeMax,
  })
} 
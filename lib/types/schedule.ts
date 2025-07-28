import { z } from "zod"
import { UIMessage } from "ai"
import { calendar_v3 } from 'googleapis'

// Re-export the proper Google Calendar Event type from googleapis
export type GoogleCalendarEvent = calendar_v3.Schema$Event

// Parsed Schedule Event Schema (what the agent returns)
export const ScheduleEventSchema = z.object({
  id: z.string(), // Generated UUID for frontend tracking
  title: z.string(),
  date: z.string(), // YYYY-MM-DD format
  startTime: z.string(), // HH:MM format
  endTime: z.string(), // HH:MM format
  description: z.string().optional(),
  location: z.string().optional(),
  confidence: z.number().min(0).max(1) // Agent confidence in parsing (0-1)
})

// Event Card State for UI
export const EventCardStateSchema = z.object({
  id: z.string(),
  event: ScheduleEventSchema,
  status: z.enum(['pending', 'accepted', 'rejected', 'regenerating', 'adding']),
  googleEventId: z.string().optional() // Set after successful calendar creation
})

// Schedule Parsing Response from Agent
export const ScheduleParsingResponseSchema = z.object({
  events: z.array(ScheduleEventSchema),
  monthYear: z.string(), // "December 2024" format
  totalEvents: z.number(),
  parsingNotes: z.string().optional() // Any notes from the agent about parsing
})

// useObject hook input schema for schedule parsing
export const ScheduleParsingInputSchema = z.object({
  imageData: z.string(), // Base64 string (without data URL prefix)
  mimeType: z.string() // MIME type like "image/jpeg", "image/png"
})

// Type exports
export type ScheduleEvent = z.infer<typeof ScheduleEventSchema>
export type EventCardState = z.infer<typeof EventCardStateSchema>
export type ScheduleParsingResponse = z.infer<typeof ScheduleParsingResponseSchema>
export type ScheduleParsingInput = z.infer<typeof ScheduleParsingInputSchema>

// Utility function to convert ScheduleEvent to GoogleCalendarEvent
export function scheduleEventToGoogleEvent(
  scheduleEvent: ScheduleEvent,
  timeZone: string = "America/New_York"
): GoogleCalendarEvent {
  const startDateTime = `${scheduleEvent.date}T${scheduleEvent.startTime}:00`
  const endDateTime = `${scheduleEvent.date}T${scheduleEvent.endTime}:00`

  return {
    summary: scheduleEvent.title,
    description: scheduleEvent.description,
    start: {
      dateTime: startDateTime,
      timeZone
    },
    end: {
      dateTime: endDateTime,
      timeZone
    },
    location: scheduleEvent.location
  }
}

// Utility function to extract base64 from data URL
export function extractBase64FromDataUrl(dataUrl: string): string {
  const base64Index = dataUrl.indexOf(',')
  return base64Index !== -1 ? dataUrl.substring(base64Index + 1) : dataUrl
}

// AI SDK UI Message types for schedule parsing
export type ScheduleParsingDataTypes = {
  scheduleResponse: ScheduleParsingResponse
  scheduleEvent: ScheduleEvent
}

export type ScheduleParsingMetadata = {
  imageProcessed?: boolean
  parsingAttempts?: number
}

// Custom UI Message type for streaming schedule parsing
export type ScheduleUIMessage = UIMessage<
  ScheduleParsingMetadata,
  {
    'event-card': {
      event: ScheduleEvent
      progress: number
      status: 'parsing' | 'complete' | 'error'
    }
    'parsing-progress': {
      totalFound: number
      currentEvent: number
      stage: 'analyzing' | 'extracting' | 'validating' | 'complete'
      notes?: string
    }
    'parsing-complete': {
      summary: ScheduleParsingResponse
      finalStatus: 'success' | 'partial' | 'failed'
    }
  }
>

// Re-export UIMessage for the import
export { type UIMessage } from 'ai' 
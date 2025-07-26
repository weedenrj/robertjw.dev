import { z } from "zod"

// Google Calendar Event Schema (based on googleapis)
export const GoogleCalendarEventSchema = z.object({
  summary: z.string(),
  description: z.string().optional(),
  start: z.object({
    dateTime: z.string(), // ISO 8601 format: 2023-12-25T10:00:00-08:00
    timeZone: z.string().optional()
  }),
  end: z.object({
    dateTime: z.string(), // ISO 8601 format: 2023-12-25T11:00:00-08:00  
    timeZone: z.string().optional()
  }),
  location: z.string().optional()
})

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

// Type exports
export type GoogleCalendarEvent = z.infer<typeof GoogleCalendarEventSchema>
export type ScheduleEvent = z.infer<typeof ScheduleEventSchema>
export type EventCardState = z.infer<typeof EventCardStateSchema>
export type ScheduleParsingResponse = z.infer<typeof ScheduleParsingResponseSchema>

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
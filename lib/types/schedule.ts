import { UIMessage } from "ai"
import { calendar_v3 } from 'googleapis'
import { ScheduleEventSchema, type ScheduleEvent } from '../../schemas/schedule-event'
import { EventCardStateSchema, type EventCardState } from '../../schemas/event-card-state'
import { ScheduleParsingResponseSchema, type ScheduleParsingResponse } from '../../schemas/schedule-parsing-response'
import { ScheduleParsingInputSchema, type ScheduleParsingInput } from '../../schemas/schedule-parsing-input'

export type GoogleCalendarEvent = calendar_v3.Schema$Event
export { ScheduleEventSchema, EventCardStateSchema, ScheduleParsingResponseSchema, ScheduleParsingInputSchema }
export type { ScheduleEvent, EventCardState, ScheduleParsingResponse, ScheduleParsingInput }

export function scheduleEventToGoogleEvent(
  scheduleEvent: ScheduleEvent,
  timeZone: string = "America/New_York"
): GoogleCalendarEvent {
  const startDateTime = `${scheduleEvent.date}T${scheduleEvent.startTime}:00`
  const endDateTime = `${scheduleEvent.date}T${scheduleEvent.endTime}:00`

  return {
    summary: scheduleEvent.title,
    description: scheduleEvent.description ?? null,
    start: {
      dateTime: startDateTime,
      timeZone
    },
    end: {
      dateTime: endDateTime,
      timeZone
    },
    location: scheduleEvent.location ?? null
  }
}

export function extractBase64FromDataUrl(dataUrl: string): string {
  const base64Index = dataUrl.indexOf(',')
  return base64Index !== -1 ? dataUrl.substring(base64Index + 1) : dataUrl
}

export type ScheduleParsingDataTypes = {
  scheduleResponse: ScheduleParsingResponse
  scheduleEvent: ScheduleEvent
}

export type ScheduleParsingMetadata = {
  imageProcessed?: boolean
  parsingAttempts?: number
}

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
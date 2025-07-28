import { z } from "zod"
import { ScheduleEventSchema } from "./schedule-event"

export const ScheduleParsingResponseSchema = z.object({
  events: z.array(ScheduleEventSchema),
  monthYear: z.string(),
  totalEvents: z.number(),
  parsingNotes: z.string().optional()
})

export type ScheduleParsingResponse = z.infer<typeof ScheduleParsingResponseSchema> 
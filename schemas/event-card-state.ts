import { z } from "zod"
import { ScheduleEventSchema } from "./schedule-event"

export const EventCardStateSchema = z.object({
  id: z.string(),
  event: ScheduleEventSchema,
  status: z.enum(['pending', 'accepted', 'rejected', 'regenerating', 'adding']),
  googleEventId: z.string().optional()
})

export type EventCardState = z.infer<typeof EventCardStateSchema> 
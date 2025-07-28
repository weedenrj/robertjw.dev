import { z } from "zod"

export const ScheduleEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  description: z.string().optional(),
  location: z.string().optional(),
  confidence: z.number().min(0).max(1)
})

export type ScheduleEvent = z.infer<typeof ScheduleEventSchema> 
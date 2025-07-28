import { z } from "zod"

export const ScheduleParsingInputSchema = z.object({
  imageData: z.string(),
  mimeType: z.string()
})

export type ScheduleParsingInput = z.infer<typeof ScheduleParsingInputSchema> 
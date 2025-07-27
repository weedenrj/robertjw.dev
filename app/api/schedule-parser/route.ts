import { streamObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { NextRequest } from 'next/server'
import { z } from 'zod'

// Define the Zod schema for schedule parsing response
const scheduleEventSchema = z.object({
  id: z.string().describe('Unique UUID for the event'),
  title: z.string().describe('Event title, typically "B work" for work shifts'),
  date: z.string().describe('Event date in YYYY-MM-DD format'),
  startTime: z.string().describe('Start time in HH:MM format (24-hour)'),
  endTime: z.string().describe('End time in HH:MM format (24-hour)'),
  description: z.string().describe('Event description, typically "Work shift"'),
  location: z.string().describe('Event location, can be empty string'),
  confidence: z.number().min(0).max(1).describe('Confidence level 0-1 based on clarity of shift blocks')
})

const scheduleParsingResponseSchema = z.object({
  events: z.array(scheduleEventSchema),
  monthYear: z.string().describe('Month and year from the schedule, e.g. "January 2024"'),
  totalEvents: z.number().describe('Total number of events found'),
  parsingNotes: z.string().describe('Notes about what was found, e.g. "Found blue work shift blocks"')
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('Request body:', body)

    // Handle the format that useObject sends
    const messages = body.messages || body

    if (!messages || !Array.isArray(messages)) {
      return new Response('Messages array is required', { status: 400 })
    }
    console.log('Messages:', messages)

    const result = streamObject({
      model: openai('gpt-4o'),
      messages,
      schema: scheduleParsingResponseSchema,
      system: `You are a schedule parsing specialist that analyzes work schedule images and extracts calendar events.

Your task is to identify work shifts that appear as blue rectangles in the schedule. These are typically:
- 3-11p shifts (afternoon/evening) 
- 7p-7a shifts (overnight shifts starting one day and ending the next)
- Any other shifts assigned to the person

ANALYSIS PROCESS:
1. Carefully examine the uploaded schedule image
2. Identify blue rectangular blocks representing work shifts
3. Extract: date, start time, end time
4. For overnight shifts (7p-7a), handle date transitions correctly
5. Generate appropriate titles like "B work" for work shifts

FORMATTING RULES:
- Dates: YYYY-MM-DD format
- Times: HH:MM format (24-hour)
- For overnight shifts: start date is the initial day, end date is the next day
- Titles: Use "B work" for work shifts
- Confidence: Rate 0-1 based on clarity of the shift blocks

SPECIAL HANDLING:
- For 7p-7a shifts: create events with correct date handling
- Focus only on blue rectangles representing work shifts
- Ignore other calendar items that aren't work shifts
- Be precise with time formats (HH:MM in 24-hour format)
- Generate UUIDs for each event ID

Return a structured response with all the extracted events and metadata.`,
      onFinish: ({ usage }) => {
        console.log('Schedule parsing completed:', { usage })
      }
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Schedule parsing error:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to parse schedule',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
} 
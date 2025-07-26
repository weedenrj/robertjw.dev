"use server"

import { mastra } from "../mastra"
import { ScheduleParsingResponseSchema, type ScheduleParsingResponse } from "./types/schedule"

export interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export interface ScheduleParsingStatus {
  stage: "uploading" | "analyzing" | "extracting" | "complete" | "error"
  message: string
  progress?: number
}

export async function sendChatMessage(
  message: string,
  conversationId?: string
): Promise<ChatMessage> {
  const agent = mastra.getAgent("scheduleParserAgent")

  const result = await agent.generate(message, {
    ...(conversationId && {
      threadId: conversationId,
      resourceId: conversationId // Use conversationId as resourceId for simplicity
    })
  })

  return {
    id: crypto.randomUUID(),
    content: result.text,
    role: "assistant",
    timestamp: new Date()
  }
}

export async function parseScheduleImage(
  imageBase64: string,
  conversationId?: string
): Promise<ScheduleParsingResponse> {
  const agent = mastra.getAgent("scheduleParserAgent")

  // Create a prompt that includes the image for analysis
  const prompt = `Please analyze this work schedule image and extract all calendar events. 
  
Return a JSON response with the following structure:
- events: array of events with id, title, date, startTime, endTime, description, location, confidence
- monthYear: the month and year this schedule represents
- totalEvents: number of events found
- parsingNotes: any notes about the parsing process

Image data: data:image/jpeg;base64,${imageBase64}`

  const result = await agent.generate(prompt, {
    ...(conversationId && {
      threadId: conversationId,
      resourceId: conversationId
    })
  })

  try {
    // Try to parse the JSON response from the agent
    const jsonMatch = result.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("No JSON found in agent response")
    }

    const parsedResponse = JSON.parse(jsonMatch[0])

    // Generate UUIDs for events that don't have them
    if (parsedResponse.events) {
      parsedResponse.events = parsedResponse.events.map((event: any) => ({
        ...event,
        id: event.id || crypto.randomUUID()
      }))
    }

    // Validate the response structure
    const validatedResponse = ScheduleParsingResponseSchema.parse(parsedResponse)
    return validatedResponse

  } catch (error) {
    console.error("Error parsing schedule:", error)
    throw new Error(`Failed to parse schedule: ${error instanceof Error ? error.message : 'Invalid response format'}`)
  }
}

export async function streamChatMessage(
  message: string,
  conversationId?: string
) {
  const agent = mastra.getAgent("scheduleParserAgent")

  return agent.stream(message, {
    ...(conversationId && {
      threadId: conversationId,
      resourceId: conversationId // Use conversationId as resourceId for simplicity
    })
  })
}

export async function createConversation(): Promise<string> {
  // Generate a unique conversation ID for memory threading
  return crypto.randomUUID()
} 
import { NextRequest, NextResponse } from "next/server"
import { createCalendarEvent } from "../../../../lib/google-calendar"
import { GoogleCalendarEventSchema } from "../../../../lib/types/schedule"
import { auth } from "../../../../auth"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.accessToken) {
      return NextResponse.json(
        { error: "Not authenticated or missing access token" },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Validate the request body
    const validatedEvent = GoogleCalendarEventSchema.parse(body.event)
    const calendarId = body.calendarId || 'primary'

    // Add event to Google Calendar
    const eventResponse = await createCalendarEvent(
      session.accessToken,
      validatedEvent as any,
      calendarId
    )

    return NextResponse.json({
      success: true,
      eventId: eventResponse.id,
      message: "Event added successfully"
    })

  } catch (error) {
    console.error("Error adding event to calendar:", error)

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to add event",
        success: false
      },
      { status: 500 }
    )
  }
} 
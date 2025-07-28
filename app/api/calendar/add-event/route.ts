import { NextRequest, NextResponse } from "next/server"
import { createCalendarEvent } from "../../../../lib/google-calendar"
import { auth } from "../../../../auth"
import { calendar_v3 } from 'googleapis'

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

    // Use the proper Google Calendar Event type
    const event = body.event as calendar_v3.Schema$Event
    const calendarId = body.calendarId || 'primary'

    // Add event to Google Calendar
    const eventResponse = await createCalendarEvent(
      session.accessToken,
      event,
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
import { NextRequest, NextResponse } from "next/server"
import { listCalendarEvents } from "../../../../lib/google-calendar"
import { auth } from "../../../../auth"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    console.log('Session status:', {
      hasSession: !!session,
      hasAccessToken: !!session?.accessToken,
      hasError: !!session?.error,
      expiresAt: session?.expiresAt,
      currentTime: Math.floor(Date.now() / 1000)
    })

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    if (session.error === "RefreshAccessTokenError") {
      return NextResponse.json(
        { error: "Token refresh failed, please sign in again" },
        { status: 401 }
      )
    }

    if (!session.accessToken) {
      return NextResponse.json(
        { error: "Missing access token" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const calendarId = searchParams.get('calendarId') || 'primary'
    const timeMin = searchParams.get('timeMin')
    const timeMax = searchParams.get('timeMax')

    // Fetch events from Google Calendar
    const events = await listCalendarEvents(
      session.accessToken,
      calendarId,
      timeMin || undefined,
      timeMax || undefined
    )

    return NextResponse.json({
      success: true,
      events: events
    })

  } catch (error) {
    console.error("Error fetching calendar events:", error)

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch events",
        success: false
      },
      { status: 500 }
    )
  }
} 
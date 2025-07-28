import { NextRequest, NextResponse } from "next/server"
import { getCalendarColors } from "../../../../lib/google-calendar"
import { auth } from "../../../../auth"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

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

    const colors = await getCalendarColors(session.accessToken)

    return NextResponse.json({
      success: true,
      colors: colors
    })

  } catch (error) {
    console.error("Error fetching calendar colors:", error)

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch calendar colors",
        success: false
      },
      { status: 500 }
    )
  }
} 
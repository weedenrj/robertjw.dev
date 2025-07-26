import { google } from 'googleapis'

export async function getGoogleCalendarClient(accessToken: string) {
  const auth = new google.auth.OAuth2()
  auth.setCredentials({
    access_token: accessToken
  })

  return google.calendar({
    version: 'v3',
    auth
  })
}

export async function listCalendarEvents(accessToken: string, calendarId = 'primary') {
  try {
    const calendar = await getGoogleCalendarClient(accessToken)

    const response = await calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    })

    return response.data.items || []
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    throw error
  }
}

export async function createCalendarEvent(
  accessToken: string,
  event: {
    summary: string
    description?: string
    start: { dateTime: string; timeZone?: string }
    end: { dateTime: string; timeZone?: string }
    attendees?: { email: string }[]
  },
  calendarId = 'primary'
) {
  try {
    const calendar = await getGoogleCalendarClient(accessToken)

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
    })

    return response.data
  } catch (error) {
    console.error('Error creating calendar event:', error)
    throw error
  }
} 
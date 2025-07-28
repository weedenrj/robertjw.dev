import { google, calendar_v3 } from 'googleapis'

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

export async function getCalendarColors(accessToken: string) {
  try {
    const calendar = await getGoogleCalendarClient(accessToken)

    const response = await calendar.colors.get()
    return response.data
  } catch (error) {
    console.error('Error fetching calendar colors:', error)
    throw error
  }
}

export async function listCalendarEvents(
  accessToken: string,
  calendarId = 'primary',
  timeMin?: string,
  timeMax?: string
): Promise<calendar_v3.Schema$Event[]> {
  try {
    const calendar = await getGoogleCalendarClient(accessToken)

    const response = await calendar.events.list({
      calendarId,
      timeMin: timeMin || new Date().toISOString(),
      timeMax: timeMax,
      maxResults: 50,
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
  event: calendar_v3.Schema$Event,
  calendarId = 'primary'
): Promise<calendar_v3.Schema$Event> {
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
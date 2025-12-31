# PersonalSiteV4 - Astro with JWT Authentication & Google OAuth + Calendar

## JWT Authentication Setup Instructions

### 1. Environment Variables
Copy `env.example.txt` to `.env` and fill in your values:

```bash
cp env.example.txt .env
```

### 2. Generate JWT Secret
Generate a secure JWT secret:
```bash
openssl rand -base64 32
```
Add this to your `.env` as `JWT_SECRET` (or `AUTH_SECRET` as fallback)

### 3. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. **Enable APIs**: Go to "APIs & Services" → "Library" and enable:
   - Google Calendar API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen:
   - Add your email as a test user
   - Add scopes: `openid`, `email`, `profile`, `https://www.googleapis.com/auth/calendar`
6. For Web application, add these **EXACT** URLs:
   - **Authorized JavaScript origins**: `http://localhost:4321`
   - **Authorized redirect URIs**: `http://localhost:4321/api/auth/google-callback`
7. Copy Client ID and Client Secret to your `.env`

### 4. Required Environment Variables
```env
JWT_SECRET=your-generated-secret
BETTER_AUTH_URL=http://localhost:4321
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
ALLOWED_EMAILS=your-email@example.com
```

### 5. Development
```bash
bun run dev
```

The site will be available at `http://localhost:4321`

## Authentication Flow

The site uses JWT tokens stored in localStorage for authentication:

- **Sign In**: `/auth/signin` - Google OAuth sign-in page
- **JWT Storage**: After successful sign-in, JWT is stored in localStorage
- **API Requests**: All protected API routes require JWT in `Authorization: Bearer <token>` header
- **Profile Icon**: Click the user icon in the header to sign in/out

### Authentication Process
1. User clicks "Sign in with Google" on `/auth/signin`
2. User is redirected to Google OAuth consent screen
3. After consent, Google redirects to `/api/auth/google-callback` with code
4. Callback redirects to `/auth/signin` with code
5. Client exchanges code for JWT via `/api/auth/google-signin`
6. JWT is stored in localStorage
7. User is redirected to their original destination

### JWT Token Contents
The JWT contains:
- `email`: User's Google email address
- `accessToken`: Google Calendar API access token
- `iat`: Issued at timestamp
- `exp`: Expiration (7 days from issue)

## Google Calendar Integration

The authentication requests **full Google Calendar access**. The Google Calendar access token is included in the JWT and used for all calendar API operations.

Use the helper functions in `lib/google-calendar.ts`:

```typescript
import { listCalendarEvents, createCalendarEvent, getCalendarColors } from 'lib/google-calendar'

// Access token is extracted from JWT on the server
const events = await listCalendarEvents(accessToken)

await createCalendarEvent(accessToken, {
  summary: "Meeting",
  start: { dateTime: "2024-01-15T10:00:00-05:00" },
  end: { dateTime: "2024-01-15T11:00:00-05:00" }
})
```

## API Authentication

All protected API routes verify the JWT token and check the email whitelist:

- `/api/schedule-parser` - AI schedule parsing (requires JWT)
- `/api/calendar/events` - Fetch calendar events (requires JWT)
- `/api/calendar/add-event` - Add calendar event (requires JWT)
- `/api/calendar/colors` - Get calendar colors (requires JWT)

The JWT must be sent in the `Authorization` header:
```
Authorization: Bearer <jwt-token>
```

## Troubleshooting

### "Error 400: redirect_uri_mismatch"
This error means your Google Cloud Console redirect URI doesn't match the callback URL.

**Fix:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your OAuth 2.0 Client ID
3. Ensure **Authorized redirect URIs** contains exactly: `http://localhost:4321/api/auth/google-callback`
4. For production, add: `https://yourdomain.com/api/auth/google-callback`

### Authentication Errors
- Check that JWT_SECRET is set in `.env`
- Verify ALLOWED_EMAILS includes your email (if set)
- Clear localStorage and sign in again if token is expired

### Calendar Access Issues
1. Ensure Google Calendar API is enabled in Google Cloud Console
2. Add calendar scope in OAuth consent screen
3. Clear your browser localStorage and re-authenticate to get new permissions

### Environment Variable Errors
These typically indicate environment variables are missing or malformed. Ensure all required variables are set in `.env`.

---

#### How to set up git for the new project

1. Use `git remote remove origin` to disconnect from the template repo
2. Make a new repo on GH **without a readme**
3. Run

```bash
echo "# NewProjectName" >> README.md
  git init
  git add README.md
  git commit -m "first commit"
  git branch -M main
  git remote add origin git@github.com:weedenrj/NewProjectName.git
  git push -u origin main
```

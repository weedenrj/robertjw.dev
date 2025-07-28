# PersonalSiteV4 - NextJS with NextAuth v5 & Google OAuth + Calendar

## NextAuth v5 Setup Instructions

### 1. Environment Variables
Copy `env.example.txt` to `.env.local` and fill in your values:

```bash
cp env.example.txt .env.local
```

### 2. Generate Auth Secret
Generate a secure auth secret:
```bash
openssl rand -base64 32
```
Add this to your `.env.local` as `AUTH_SECRET`

### 3. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. **Enable APIs**: Go to "APIs & Services" → "Library" and enable:
   - Google+ API
   - Google Calendar API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen:
   - Add your email as a test user
   - Add scopes: `../auth/userinfo.email`, `../auth/userinfo.profile`, `../auth/calendar`
6. For Web application, add these **EXACT** URLs:
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
7. Copy Client ID and Client Secret to your `.env.local`

### 4. Required Environment Variables
```env
AUTH_SECRET=your-generated-secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
ALLOWED_EMAILS=your-email@example.com
```

### 5. Development
```bash
npm run dev
```

## Authentication Flow

The site now has custom authentication pages that maintain your design:

- **Sign In**: `/auth/signin` - Custom sign-in page within site layout
- **Errors**: `/auth/error` - Custom error handling for cancelled requests, OAuth issues, etc.
- **Profile Icon**: Click the user icon in the header to sign in/out
- **Callback URLs**: Users are automatically returned to the page they were on when they initiated login

### Callback URL Flow
1. User visits `/chat` (protected route) while not logged in
2. System redirects to `/auth/signin?callbackUrl=%2Fchat`
3. User completes Google OAuth
4. User is redirected back to `/chat` automatically

All authentication errors (including cancelled requests) will now display within your site's layout instead of the default NextAuth pages.

## Google Calendar Integration

The authentication now requests **full Google Calendar access**. Your session will include:
- `session.accessToken` - for API calls
- `session.refreshToken` - for token refresh
- `session.expiresAt` - token expiration

Use the helper functions in `lib/google-calendar.ts`:

```typescript
import { listCalendarEvents, createCalendarEvent } from '@/lib/google-calendar'

const events = await listCalendarEvents(session.accessToken)

await createCalendarEvent(session.accessToken, {
  summary: "Meeting",
  start: { dateTime: "2024-01-15T10:00:00-05:00" },
  end: { dateTime: "2024-01-15T11:00:00-05:00" }
})
```

## Troubleshooting

### "Error 400: redirect_uri_mismatch"
This error means your Google Cloud Console redirect URI doesn't match NextAuth's callback URL.

**Fix:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your OAuth 2.0 Client ID
3. Ensure **Authorized redirect URIs** contains exactly: `http://localhost:3000/api/auth/callback/google`
4. For production, add: `https://yourdomain.com/api/auth/callback/google`

### Authentication Cancelled/Errors
- All auth errors now display in styled pages within your site layout
- Cancelled requests show a friendly "Sign-in Cancelled" message
- Users can easily retry or return to home page

### Calendar Access Issues
1. Ensure Google Calendar API is enabled in Google Cloud Console
2. Add calendar scope in OAuth consent screen
3. Clear your browser cookies and re-authenticate to get new permissions

### "Function.prototype.apply" errors
These typically indicate environment variables are missing or malformed. Ensure all required variables are set in `.env.local`.

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

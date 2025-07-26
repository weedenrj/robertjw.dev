import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/calendar"
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
    error: '/auth/error',   // Custom error page
  },
  callbacks: {
    async signIn({ user, account }) {
      // Optional: Restrict access to specific email addresses
      const allowedEmails = process.env.ALLOWED_EMAILS?.split(',') || []

      if (allowedEmails.length > 0 && user.email) {
        return allowedEmails.includes(user.email)
      }

      // If no allowed emails configured, allow all Google users
      return true
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token for Google Calendar API
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = account.expires_at
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client for Calendar API usage
      session.accessToken = token.accessToken as string
      session.refreshToken = token.refreshToken as string
      session.expiresAt = token.expiresAt as number
      return session
    }
  },
  trustHost: true
}) 
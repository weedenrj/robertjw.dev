/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly JWT_SECRET?: string
  readonly AUTH_SECRET?: string
  readonly BETTER_AUTH_URL?: string
  readonly PUBLIC_SITE_URL?: string
  readonly GOOGLE_CLIENT_ID?: string
  readonly GOOGLE_CLIENT_SECRET?: string
  readonly ALLOWED_EMAILS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

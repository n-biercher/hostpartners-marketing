const FALLBACK_SITE_URL = "https://hostpartners.de"
const FALLBACK_APP_URL = "https://dashboard.hostpartners.de"

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicit) return explicit.replace(/\/+$/, "")

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`

  return FALLBACK_SITE_URL
}

export function getAppUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_APP_URL?.trim()
  if (explicit) return explicit.replace(/\/+$/, "")
  return FALLBACK_APP_URL
}

import { createHash, createHmac } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import { TurnstileError, verifyTurnstile } from "nextjs-turnstile"

const MAX_MESSAGE_LENGTH = 5_000
const RATE_LIMIT_WINDOW_MS = 10 * 60_000
const RATE_LIMIT_MAX_REQUESTS = 5

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status })
}

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? request.headers.get("x-real-ip")?.trim()
    ?? "unknown"
  )
}

function checkRateLimit(ip: string) {
  const now = Date.now()
  const current = rateLimitMap.get(ip)

  if (!current || current.resetAt <= now) {
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    })
    return true
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  current.count += 1
  return true
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex")
}

function isValidIsoDate(value: string | undefined) {
  if (!value) return false
  const date = new Date(value)
  return !Number.isNaN(date.getTime())
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)

  if (!checkRateLimit(ip)) {
    return json(
      { error: "Zu viele Anfragen. Bitte versuche es später erneut." },
      429,
    )
  }

  let body: Record<string, unknown>

  try {
    body = await request.json()
  } catch {
    return json({ error: "Ungültige Anfrage." }, 400)
  }

  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : ""
  const lastName = typeof body.lastName === "string" ? body.lastName.trim() : ""
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
  const company = typeof body.company === "string" ? body.company.trim() : ""
  const role = typeof body.role === "string" ? body.role.trim() : ""
  const companySize = typeof body.companySize === "string" ? body.companySize.trim() : ""
  const message = typeof body.message === "string" ? body.message.trim() : ""
  const requestedStartAt = typeof body.requestedStartAt === "string" ? body.requestedStartAt : undefined
  const requestedEndAt = typeof body.requestedEndAt === "string" ? body.requestedEndAt : undefined
  const requestedTimezone =
    typeof body.requestedTimezone === "string" && body.requestedTimezone.trim()
      ? body.requestedTimezone.trim()
      : "Europe/Berlin"

  const honeypot = typeof body.website === "string" ? body.website.trim() : ""
  const turnstileToken =
    typeof body.turnstileToken === "string" ? body.turnstileToken.trim() : ""

  if (honeypot) {
    return json({ error: "Anfrage blockiert." }, 400)
  }

  if (!firstName || !lastName || !company || !companySize) {
    return json({ error: "Bitte fülle alle Pflichtfelder aus." }, 400)
  }

  if (!isValidEmail(email)) {
    return json({ error: "Bitte gib eine gültige E-Mail-Adresse ein." }, 400)
  }

  if (!isValidIsoDate(requestedStartAt) || !isValidIsoDate(requestedEndAt)) {
    return json({ error: "Bitte wähle einen gültigen Termin aus." }, 400)
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return json({ error: "Nachricht ist zu lang." }, 400)
  }

  if (!turnstileToken) {
    return json({ error: "Bitte bestätige die Sicherheitsprüfung." }, 400)
  }

  try {
    const isTurnstileValid = await verifyTurnstile(turnstileToken, {
  action: "demo_request",
})

    if (!isTurnstileValid) {
      return json(
        { error: "Sicherheitsprüfung fehlgeschlagen. Bitte erneut versuchen." },
        400,
      )
    }
  } catch (error) {
    if (error instanceof TurnstileError) {
      console.error("Turnstile error:", error.errorCodes)

      return json(
        { error: "Sicherheitsprüfung fehlgeschlagen. Bitte erneut versuchen." },
        400,
      )
    }

    console.error("Turnstile verification failed:", error)

    return json(
      { error: "Sicherheitsprüfung konnte nicht geprüft werden." },
      500,
    )
  }

  const ingestUrl = process.env.CRM_DEMO_INTAKE_URL?.trim()
  const ingestSecret = process.env.CRM_INGEST_SECRET?.trim()

  if (!ingestUrl || !ingestSecret) {
    return json({ error: "Demo-Intake ist nicht konfiguriert." }, 500)
  }

  const requestId = crypto.randomUUID()

  const forwardedPayload = JSON.stringify({
    requestId,
    firstName,
    lastName,
    email,
    company,
    role,
    companySize,
    message,
    requestedStartAt,
    requestedEndAt,
    requestedTimezone,
    preferredChannel: "teams",
    pagePath: "/demo",
    referrer: request.headers.get("referer")?.trim() ?? "",
    utmSource: typeof body.utmSource === "string" ? body.utmSource.trim() : "",
    utmMedium: typeof body.utmMedium === "string" ? body.utmMedium.trim() : "",
    utmCampaign: typeof body.utmCampaign === "string" ? body.utmCampaign.trim() : "",
    consentAt: new Date().toISOString(),
    ip,
    userAgent: request.headers.get("user-agent")?.trim() ?? "",
    turnstileTokenHash: sha256(turnstileToken),
  })

  const timestamp = Date.now().toString()

  const signature = createHmac("sha256", ingestSecret)
    .update(`${timestamp}.${forwardedPayload}`)
    .digest("hex")

  const ingestResponse = await fetch(ingestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-timestamp": timestamp,
      "x-signature": signature,
      "x-request-id": requestId,
    },
    body: forwardedPayload,
  })

  if (!ingestResponse.ok) {
    const data = await ingestResponse.json().catch(() => ({}))

    return json(
      {
        error:
          typeof data?.error === "string"
            ? data.error
            : "Demo-Anfrage konnte nicht verarbeitet werden.",
      },
      ingestResponse.status,
    )
  }

  const result = await ingestResponse.json().catch(() => ({}))

  return json(
    {
      ok: true,
      status: typeof result?.status === "string" ? result.status : "pending",
    },
    201,
  )
}
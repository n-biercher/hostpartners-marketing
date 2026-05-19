import { NextResponse } from "next/server"
import { verifyTurnstile, TurnstileError } from "nextjs-turnstile"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (body.website) {
      return NextResponse.json({ success: true })
    }

    if (!body.turnstileToken) {
      return NextResponse.json(
        { error: "Sicherheitsprüfung fehlt." },
        { status: 400 },
      )
    }

    const isValid = await verifyTurnstile(body.turnstileToken, {
      action: "demo_request",
    })

    if (!isValid) {
      return NextResponse.json(
        { error: "Sicherheitsprüfung fehlgeschlagen." },
        { status: 400 },
      )
    }

    // Hier kommt danach deine eigentliche Logik:
    // E-Mail senden, Termin speichern, CRM-Eintrag erstellen usw.

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof TurnstileError) {
      console.error("Turnstile error:", error.errorCodes)
      return NextResponse.json(
        { error: "Sicherheitsprüfung fehlgeschlagen." },
        { status: 400 },
      )
    }

    console.error(error)
    return NextResponse.json(
      { error: "Demo-Anfrage konnte nicht gesendet werden." },
      { status: 500 },
    )
  }
}
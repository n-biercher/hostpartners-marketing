import type { Metadata } from "next"
import { ContactPage, MarketingShell } from "@/marketing"
import { getSiteUrl } from "@/lib/site-url"

const BASE_URL = getSiteUrl()

export const metadata: Metadata = {
  title: "Kontakt Vertrieb | Hostpartners",
  description: "Sprich mit dem Hostpartners-Vertriebsteam über Demo, Preisrahmen und das passende Setup für euren Betrieb.",
  alternates: { canonical: `${BASE_URL}/kontakt` },
}

export default function ContactRoute() {
  return (
    <MarketingShell>
      <ContactPage />
    </MarketingShell>
  )
}

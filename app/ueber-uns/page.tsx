import type { Metadata } from "next"
import { AboutPage, MarketingShell } from "@/marketing"
import { getSiteUrl } from "@/lib/site-url"

const BASE_URL = getSiteUrl()

export const metadata: Metadata = {
  title: "Über uns | Hostpartners",
  description: "Erfahre, warum Hostpartners modulare HR-Software für Hotellerie, Gastronomie und Industrie baut.",
  alternates: { canonical: `${BASE_URL}/ueber-uns` },
}

export default function AboutUsPage() {
  return (
    <MarketingShell>
      <AboutPage />
    </MarketingShell>
  )
}

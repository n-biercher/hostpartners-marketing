import type { Metadata } from "next"
import { DemoPage } from "@/components/marketing/demo-page"
import { getSiteUrl } from "@/lib/site-url"

const BASE_URL = getSiteUrl()

export const metadata: Metadata = {
  title: "Demo buchen | Hostpartners",
  description:
    "30-minütige kostenlose Demo buchen — entdecke, was Hostpartners für Hotellerie, Gastronomie und Industrie tun kann.",
  alternates: { canonical: `${BASE_URL}/demo` },
}

export default function DemoBookingPage() {
  return <DemoPage />
}

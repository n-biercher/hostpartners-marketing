import type { Metadata } from "next"
import { MarketingShell } from "@/marketing"
import { PricingPage } from "@/components/marketing/pricing-page"
import { fetchStripePricing } from "@/lib/marketing/stripe-pricing"
import { getSiteUrl } from "@/lib/site-url"

const BASE_URL = getSiteUrl()

// Revalidate pricing data every hour
export const revalidate = 3600

export const metadata: Metadata = {
  title: "Preise & Lizenzmodell | Hostpartners",
  description: "Modular und transparent: Hostpartners wird app-weise lizenziert. Nur zahlen, was wirklich genutzt wird — monatlich kündbar, DSGVO-konform.",
  alternates: { canonical: `${BASE_URL}/preise` },
}

export default async function PricesPage() {
  const pricing = await fetchStripePricing()

  return (
    <MarketingShell>
      <PricingPage plans={pricing.plans} addons={pricing.addons} />
    </MarketingShell>
  )
}

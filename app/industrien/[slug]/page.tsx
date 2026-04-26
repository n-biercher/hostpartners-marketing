import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  INDUSTRIES,
  IndustryPageClient,
  MarketingShell,
  createIndustryJsonLd,
  createIndustryMetadata,
} from "@/marketing"
import { getSiteUrl } from "@/lib/site-url"

const BASE_URL = getSiteUrl()

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return Object.keys(INDUSTRIES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  return createIndustryMetadata(slug, BASE_URL) ?? {}
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params
  if (!INDUSTRIES[slug]) notFound()

  const jsonLd = createIndustryJsonLd(slug, BASE_URL)

  return (
    <MarketingShell>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
      <IndustryPageClient slug={slug} />
    </MarketingShell>
  )
}

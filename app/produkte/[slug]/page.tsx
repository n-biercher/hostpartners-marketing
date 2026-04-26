import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  PRODUCTS,
  PRODUCT_SLUGS,
  ProductPageClient,
  MarketingShell,
  createProductJsonLd,
  createProductMetadata,
} from "@/marketing"
import { getSiteUrl } from "@/lib/site-url"

const BASE_URL = getSiteUrl()

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  return createProductMetadata(slug, BASE_URL) ?? {}
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  if (!PRODUCTS[slug]) notFound()

  const jsonLd = createProductJsonLd(slug, BASE_URL)

  return (
    <MarketingShell>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
      <ProductPageClient slug={slug} />
    </MarketingShell>
  )
}

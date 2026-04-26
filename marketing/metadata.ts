import type { Metadata } from "next"
import { INDUSTRIES } from "@/lib/marketing/industries"
import { PRODUCTS } from "@/lib/marketing/products"

function trimBaseUrl(baseUrl: string) {
  return baseUrl.replace(/\/+$/, "")
}

function makeUrl(baseUrl: string, path = "") {
  const safeBase = trimBaseUrl(baseUrl)
  if (!path) return safeBase
  return `${safeBase}${path.startsWith("/") ? path : `/${path}`}`
}

export function createMarketingMetadata(baseUrl: string): Metadata {
  return {
    metadataBase: new URL(trimBaseUrl(baseUrl)),
    title: {
      default: "Hostpartners — Die modulare HR-Plattform",
      template: "%s — Hostpartners",
    },
    description:
      "Hostpartners ist die modulare HR-Plattform für Hotellerie, Gastronomie und Industrie. Acht spezialisierte Apps — Schichtplanung, Onboarding, Schulungen, Zeiterfassung und mehr.",
    alternates: { canonical: trimBaseUrl(baseUrl) },
  }
}

export function createIndustryMetadata(slug: string, baseUrl: string): Metadata | null {
  const industry = INDUSTRIES[slug]
  if (!industry) return null

  return {
    title: industry.seoTitle,
    description: industry.seoDesc,
    keywords: industry.keywords,
    openGraph: {
      title: industry.seoTitle,
      description: industry.seoDesc,
      type: "website",
      locale: "de_DE",
      url: makeUrl(baseUrl, `/industrien/${slug}`),
    },
    alternates: { canonical: makeUrl(baseUrl, `/industrien/${slug}`) },
  }
}

export function createProductMetadata(slug: string, baseUrl: string): Metadata | null {
  const product = PRODUCTS[slug]
  if (!product) return null

  return {
    title: product.seoTitle,
    description: product.seoDesc,
    keywords: product.keywords,
    openGraph: {
      title: product.seoTitle,
      description: product.seoDesc,
      type: "website",
      locale: "de_DE",
      url: makeUrl(baseUrl, `/produkte/${slug}`),
    },
    alternates: { canonical: makeUrl(baseUrl, `/produkte/${slug}`) },
  }
}

export function createIndustryJsonLd(slug: string, baseUrl: string) {
  const industry = INDUSTRIES[slug]
  if (!industry) return null

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: industry.seoTitle,
    description: industry.seoDesc,
    url: makeUrl(baseUrl, `/industrien/${slug}`),
  }
}

export function createProductJsonLd(slug: string, baseUrl: string) {
  const product = PRODUCTS[slug]
  if (!product) return null

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `Hostpartners ${product.name}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: product.seoDesc,
    url: makeUrl(baseUrl, `/produkte/${slug}`),
    publisher: {
      "@type": "Organization",
      name: "Hostpartners GmbH",
      url: trimBaseUrl(baseUrl),
    },
  }
}

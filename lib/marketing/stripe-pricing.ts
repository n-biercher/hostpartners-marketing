import Stripe from "stripe"

// ─── App catalogue (source of truth from admin-licenses-client.tsx) ───────────

export const APP_META: Record<string, {
  label:  string
  desc:   string
  color:  string   // tailwind bg class
  hex:    string   // for inline style fallback
}> = {
  persona:     { label: "Persona",     desc: "HR-Stammdaten & Organigramm",             color: "bg-slate-600",   hex: "#475569" },
  atlas:       { label: "Atlas",       desc: "Wissensdatenbank & Suche",                color: "bg-emerald-600", hex: "#059669" },
  flow:        { label: "Flow",        desc: "Onboarding & Prozesse",                   color: "bg-violet-600",  hex: "#7c3aed" },
  engage:      { label: "Engage",      desc: "Team-Chat & Direktnachrichten",           color: "bg-fuchsia-600", hex: "#c026d3" },
  academy:     { label: "Academy",     desc: "Schulungen & Kurse",                      color: "bg-blue-600",    hex: "#2563eb" },
  tempo:       { label: "Tempo",       desc: "Zeiterfassung & Urlaub",                  color: "bg-orange-500",  hex: "#f97316" },
  roster:      { label: "Roster",      desc: "Schichtplanung",                          color: "bg-rose-600",    hex: "#e11d48" },
  lumen:       { label: "Lumen",       desc: "KI-Assistent mit RAG-Suche",             color: "bg-indigo-600",  hex: "#4f46e5" },
  hire:        { label: "Hire",        desc: "Recruiting & Bewerbermanagement",         color: "bg-cyan-600",    hex: "#0891b2" },
  payroll:     { label: "Payroll",     desc: "Lohnbuchhaltung & DATEV",                color: "bg-teal-600",    hex: "#0d9488" },
}

// Plan → included app keys (sourced from admin-licenses-client.tsx PRODUCT_BREAKDOWN)
export const PLAN_INCLUDED_APPS: Record<string, string[]> = {
  basic:      ["persona", "atlas", "flow"],
  essentials: ["persona", "atlas", "flow", "engage"],
  gastro:     ["persona", "atlas", "flow", "engage", "academy", "tempo", "roster", "payroll"],
  growth:     ["persona", "atlas", "flow", "engage", "academy", "tempo", "roster", "hire", "payroll"],
  enterprise: ["persona", "atlas", "flow", "engage", "academy", "tempo", "roster", "lumen", "hire", "payroll"],
}

// license_keys that are base plans (not add-ons)
const PLAN_LICENSE_KEYS = new Set(["basic", "essentials", "gastro", "growth", "enterprise"])
// skip discontinued products
const SKIP_LICENSE_KEYS = new Set(["pulse"])

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PricingPlan {
  productId:    string
  priceId:      string
  name:         string
  licenseKey:   string
  unitAmount:   number  // cents
  currency:     string
  interval:     string
  includedApps: string[] // app keys
}

export interface PricingAddon {
  productId:   string
  priceId:     string
  name:        string
  licenseKey:  string   // e.g. "lernen", "connect", "roster"
  appKey:      string   // e.g. "academy", "engage", "roster"
  unitAmount:  number
  currency:    string
  interval:    string
}

export interface StripePricingData {
  plans:  PricingPlan[]
  addons: PricingAddon[]
}

// Maps Stripe license_key → app key (for add-ons where they differ)
const ADDON_LICENSE_TO_APP: Record<string, string> = {
  lernen:  "academy",
  connect: "engage",
  // same key for these:
  tempo:       "tempo",
  roster:      "roster",
  lumen:       "lumen",
  hire:        "hire",
  payroll:     "payroll",
}

// ─── Fetcher ──────────────────────────────────────────────────────────────────

export async function fetchStripePricing(): Promise<StripePricingData> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-04-22.dahlia",
  })

  const pricesPage = await stripe.prices.list({
    active:  true,
    limit:   100,
    expand:  ["data.product"],
  })

  // Keep only most recently created price per product
  const latestByProduct = new Map<string, Stripe.Price>()
  for (const price of pricesPage.data) {
    if (typeof price.product !== "object" || !price.product) continue
    const prod = price.product as Stripe.Product
    if ("deleted" in prod || !prod.active) continue

    const licenseKey = (prod.metadata?.license_key ?? "") as string
    if (SKIP_LICENSE_KEYS.has(licenseKey)) continue

    const existing = latestByProduct.get(prod.id)
    if (!existing || price.created > existing.created) {
      latestByProduct.set(prod.id, price)
    }
  }

  const plans:  PricingPlan[]  = []
  const addons: PricingAddon[] = []

  for (const price of latestByProduct.values()) {
    const prod       = price.product as Stripe.Product
    const licenseKey = (prod.metadata?.license_key ?? "") as string
    const interval   = price.recurring?.interval ?? "month"
    const base = {
      productId:  prod.id,
      priceId:    price.id,
      name:       prod.name,
      licenseKey,
      unitAmount: price.unit_amount ?? 0,
      currency:   price.currency,
      interval,
    }

    if (PLAN_LICENSE_KEYS.has(licenseKey)) {
      plans.push({
        ...base,
        includedApps: PLAN_INCLUDED_APPS[licenseKey] ?? [],
      })
    } else {
      const appKey = ADDON_LICENSE_TO_APP[licenseKey] ?? licenseKey
      addons.push({ ...base, appKey })
    }
  }

  plans.sort((a, b) => a.unitAmount - b.unitAmount)
  addons.sort((a, b) => a.unitAmount - b.unitAmount)

  return { plans, addons }
}

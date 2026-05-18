"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  ArrowRight, Check, Zap, Shield, Globe, Users,
  BookOpen, GitBranch, MessageSquare, GraduationCap,
  Clock, CalendarDays, TrendingUp, Sparkles,
  UserPlus, Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { PricingPlan, PricingAddon } from "@/lib/marketing/stripe-pricing"
import { APP_META } from "@/lib/marketing/stripe-pricing"

// ─── Icon map for app keys ────────────────────────────────────────────────────

const APP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  persona:     Users,
  atlas:       BookOpen,
  flow:        GitBranch,
  engage:      MessageSquare,
  academy:     GraduationCap,
  tempo:       Clock,
  roster:      CalendarDays,
  performance: TrendingUp,
  lumen:       Sparkles,
  hire:        UserPlus,
  payroll:     Wallet,
}

// ─── Utilities ─────────────────────────────────────────────────────────────────

function Grain({ opacity = 0.02 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
      }}
    />
  )
}

function useInViewOnce(margin = "-60px 0px") {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: margin as any })
  return { ref, inView }
}

function formatPrice(unitAmount: number, currency: string): string {
  const val = (unitAmount / 100).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${val} ${currency.toUpperCase()}`
}

// ─── Plan taglines ────────────────────────────────────────────────────────────

const PLAN_TAGLINES: Record<string, string> = {
  basic:      "HR-Basis für kleine Teams",
  essentials: "Ideal für wachsende Betriebe",
  gastro:     "Alle Apps außer Lumen & Hire",
  growth:     "Alle Apps außer Lumen",
  enterprise: "Alle Apps inklusive",
}

const PLAN_HIGHLIGHTED = new Set(["essentials", "gastro"])

// ─── App row in plan card ─────────────────────────────────────────────────────

function AppRow({ appKey, highlighted }: { appKey: string; highlighted: boolean }) {
  const meta = APP_META[appKey]
  const Icon = APP_ICONS[appKey]
  if (!meta || !Icon) return null

  return (
    <div className="flex items-center gap-3">
      <div className={cn("size-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm", meta.color)}>
        <Icon className="size-3.5 text-white" />
      </div>
      <div className="min-w-0">
        <div className={cn("text-[13px] font-semibold leading-tight", highlighted ? "text-background" : "text-foreground")}>
          {meta.label}
        </div>
        <div className={cn("text-[11px] leading-tight truncate", highlighted ? "text-background/50" : "text-muted-foreground")}>
          {meta.desc}
        </div>
      </div>
    </div>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function PricingHero() {
  return (
    <section className="relative pt-36 pb-20 overflow-hidden bg-background">
      <Grain opacity={0.025} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-foreground/[0.025] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-muted/40 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-8"
        >
          <Zap className="size-3" />
          Transparente Preise direkt aus Stripe
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground mb-5"
        >
          Nur zahlen,
          <br />
          <span className="text-muted-foreground">was ihr wirklich nutzt.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="text-lg text-muted-foreground max-w-xl mx-auto mb-10"
        >
          Hostpartners ist modular — wählt ein Bundle mit enthaltenen Apps und
          bucht weitere Module einzeln hinzu. Pro Nutzer, monatlich kündbar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="flex flex-wrap items-center justify-center gap-6 text-[13px] text-muted-foreground"
        >
          {["Keine Einrichtungsgebühren", "Monatlich kündbar", "DSGVO-konform", "Keine Mindestlaufzeit"].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <Check className="size-3.5 text-emerald-500" />
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Plans ─────────────────────────────────────────────────────────────────────

function PlanCard({ plan, index, inView }: { plan: PricingPlan; index: number; inView: boolean }) {
  const highlighted = PLAN_HIGHLIGHTED.has(plan.licenseKey)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative flex flex-col rounded-2xl border p-6 transition-shadow",
        highlighted
          ? "border-foreground bg-foreground shadow-2xl shadow-foreground/20"
          : "border-border bg-background hover:shadow-md"
      )}
    >
      {highlighted && (
        <div className="absolute -top-3 left-6">
          <div className="px-3 py-1 rounded-full bg-background text-foreground text-[10px] font-bold uppercase tracking-widest border border-border shadow-sm">
            Beliebt
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-5">
        <h3 className={cn("text-[18px] font-bold mb-1", highlighted ? "text-background" : "text-foreground")}>
          {plan.name}
        </h3>
        <p className={cn("text-[12px]", highlighted ? "text-background/60" : "text-muted-foreground")}>
          {PLAN_TAGLINES[plan.licenseKey] ?? ""}
        </p>
      </div>

      {/* Price */}
      <div className="mb-6 pb-5 border-b" style={{ borderColor: highlighted ? "rgba(255,255,255,0.1)" : undefined }}>
        <div className={cn("text-[36px] font-black tracking-tight tabular-nums leading-none", highlighted ? "text-background" : "text-foreground")}>
          {formatPrice(plan.unitAmount, plan.currency)}
        </div>
        <div className={cn("text-[12px] mt-1.5", highlighted ? "text-background/50" : "text-muted-foreground")}>
          pro Nutzer&nbsp;/ Monat
        </div>
      </div>

      {/* Included apps */}
      <div className="mb-6 flex-1">
        <p className={cn("text-[10px] font-semibold uppercase tracking-widest mb-3", highlighted ? "text-background/40" : "text-muted-foreground/50")}>
          Enthaltene Apps
        </p>
        <div className="space-y-2.5">
          {plan.includedApps.map((appKey) => (
            <AppRow key={appKey} appKey={appKey} highlighted={highlighted} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/demo"
        className={cn(
          "flex w-full items-center justify-center gap-1.5 h-10 rounded-xl text-[13px] font-semibold transition-all",
          highlighted
            ? "bg-background text-foreground hover:opacity-90"
            : "bg-foreground text-background hover:opacity-85"
        )}
      >
        Jetzt starten <ArrowRight className="size-3.5" />
      </Link>
    </motion.div>
  )
}

function PlansSection({ plans }: { plans: PricingPlan[] }) {
  const { ref, inView } = useInViewOnce("-80px 0px")

  const gridClass =
    plans.length <= 2 ? "sm:grid-cols-2 max-w-2xl mx-auto" :
    plans.length === 3 ? "sm:grid-cols-3" :
    plans.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" :
    "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"

  return (
    <section ref={ref} className="pb-24 bg-background">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3">Bundles</p>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">Das richtige Bundle wählen</h2>
          <p className="text-muted-foreground mt-3 text-[15px] max-w-sm mx-auto">
            Alle Bundles beinhalten die aufgeführten Apps — pro Nutzer, monatlich abgerechnet.
          </p>
        </motion.div>

        <div className={cn("grid grid-cols-1 gap-4", gridClass)}>
          {plans.map((plan, i) => (
            <PlanCard key={plan.priceId} plan={plan} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Add-ons ───────────────────────────────────────────────────────────────────

function AddonCard({ addon, index, inView }: { addon: PricingAddon; index: number; inView: boolean }) {
  const meta = APP_META[addon.appKey]
  const Icon = APP_ICONS[addon.appKey]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col rounded-2xl border border-border bg-background p-5 hover:shadow-md transition-shadow group"
    >
      {/* App identity */}
      <div className="flex items-start gap-3 mb-4">
        {Icon && meta && (
          <div className={cn("size-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm mt-0.5", meta.color)}>
            <Icon className="size-5 text-white" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-bold text-foreground leading-tight">{addon.name}</div>
          {meta && <div className="text-[12px] text-muted-foreground mt-0.5 leading-snug">{meta.desc}</div>}
        </div>
      </div>

      {/* Price */}
      <div className="mt-auto pt-4 border-t border-border">
        <div className="flex items-baseline gap-1 flex-wrap">
          <span className="text-[24px] font-black text-foreground tabular-nums">
            {formatPrice(addon.unitAmount, addon.currency)}
          </span>
          <span className="text-[11px] text-muted-foreground">/ Nutzer / Monat</span>
        </div>
        <p className="text-[11px] text-muted-foreground mt-1">
          Als Zusatzmodul zu jedem Bundle buchbar
        </p>
      </div>
    </motion.div>
  )
}

function AddonsSection({ addons }: { addons: PricingAddon[] }) {
  const { ref, inView } = useInViewOnce("-80px 0px")

  if (addons.length === 0) return null

  return (
    <section ref={ref} className="py-24 bg-muted/30 border-t border-border">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3">Add-on Module</p>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">Einzeln hinzubuchen</h2>
          <p className="text-muted-foreground mt-3 text-[15px] max-w-md mx-auto">
            Jedes Modul lässt sich zu jedem Bundle dazubuchen — nur für die Nutzer, die es brauchen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {addons.map((addon, i) => (
            <AddonCard key={addon.priceId} addon={addon} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-[13px] text-muted-foreground">
            Ihr braucht ein maßgeschneidertes Paket?{" "}
            <Link href="/kontakt" className="text-foreground font-medium underline underline-offset-2 hover:no-underline">
              Sprecht mit unserem Vertrieb.
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ─── App overview table ────────────────────────────────────────────────────────
// Shows all apps as rows, plans as columns — which is included where

function AppOverviewSection({ plans }: { plans: PricingPlan[] }) {
  const { ref, inView } = useInViewOnce("-80px 0px")

  // Collect all unique app keys across all plans (preserving order)
  const allAppKeys: string[] = []
  const seen = new Set<string>()
  for (const plan of plans) {
    for (const appKey of plan.includedApps) {
      if (!seen.has(appKey)) {
        seen.add(appKey)
        allAppKeys.push(appKey)
      }
    }
  }

  if (allAppKeys.length === 0 || plans.length === 0) return null

  return (
    <section ref={ref} className="py-24 bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3">Vergleich</p>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">Was ist in welchem Bundle?</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-x-auto rounded-2xl border border-border"
        >
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-4 text-[12px] font-semibold text-muted-foreground w-44">App</th>
                {plans.map((plan) => (
                  <th key={plan.priceId} className="px-4 py-4 text-center">
                    <div className={cn(
                      "text-[13px] font-bold",
                      PLAN_HIGHLIGHTED.has(plan.licenseKey) ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {plan.name}
                    </div>
                    <div className="text-[11px] text-muted-foreground font-normal mt-0.5 tabular-nums">
                      {formatPrice(plan.unitAmount, plan.currency)}/Nutzer
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allAppKeys.map((appKey, rowIdx) => {
                const meta = APP_META[appKey]
                const Icon = APP_ICONS[appKey]
                if (!meta || !Icon) return null

                return (
                  <tr
                    key={appKey}
                    className={cn(
                      "border-b border-border last:border-0",
                      rowIdx % 2 === 0 ? "bg-background" : "bg-muted/[0.15]"
                    )}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={cn("size-6 rounded-lg flex items-center justify-center shrink-0", meta.color)}>
                          <Icon className="size-3 text-white" />
                        </div>
                        <div>
                          <div className="text-[13px] font-semibold text-foreground leading-tight">{meta.label}</div>
                          <div className="text-[11px] text-muted-foreground leading-tight">{meta.desc}</div>
                        </div>
                      </div>
                    </td>
                    {plans.map((plan) => {
                      const included = plan.includedApps.includes(appKey)
                      return (
                        <td key={plan.priceId} className="px-4 py-3.5 text-center">
                          {included ? (
                            <div className="inline-flex items-center justify-center size-6 rounded-full bg-emerald-500/10 mx-auto">
                              <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                          ) : (
                            <div className="inline-block size-6 rounded-full border border-border/60 mx-auto" />
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Trust ─────────────────────────────────────────────────────────────────────

function TrustSection() {
  const items = [
    { icon: Shield, label: "DSGVO-konform",  desc: "Hosting in Deutschland" },
    { icon: Zap,    label: "Keine Bindung",  desc: "Monatlich kündbar" },
    { icon: Globe,  label: "Eigene Domain",  desc: "Subdomain inklusive" },
    { icon: Users,  label: "Skalierbar",     desc: "Von 5 bis 5.000 Nutzer" },
  ]
  const { ref, inView } = useInViewOnce()

  return (
    <section ref={ref} className="py-16 border-t border-border bg-muted/10">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="text-center"
            >
              <div className="size-10 rounded-xl bg-muted border border-border flex items-center justify-center mx-auto mb-3">
                <item.icon className="size-5 text-muted-foreground" />
              </div>
              <div className="text-[14px] font-semibold text-foreground">{item.label}</div>
              <div className="text-[12px] text-muted-foreground">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ───────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "Wie funktioniert die modulare Lizenzierung?",
    a: "Ihr wählt ein Bundle (z.B. Essentials oder Gastro). Das Bundle enthält eine feste Auswahl an Apps. Weitere Apps — wie Lumen, Hire oder Payroll — buchst du als Add-on einzeln hinzu, pro Nutzer und Monat.",
  },
  {
    q: "Muss jeder Nutzer alle Add-ons haben?",
    a: "Nein. Add-ons lassen sich gezielt einzelnen Nutzern zuweisen. Z.B. Payroll nur für HR-Admins, Hire nur für Recruiter.",
  },
  {
    q: "Können wir jederzeit kündigen oder wechseln?",
    a: "Ja — alle Pläne und Add-ons sind monatlich kündbar, ohne Mindestlaufzeit. Ein Wechsel in ein anderes Bundle ist jederzeit möglich.",
  },
  {
    q: "Gibt es eine kostenlose Testphase?",
    a: "Ja — ihr könnt Hostpartners 14 Tage kostenlos und ohne Kreditkarte testen. Einfach Demo buchen und wir richten euren Testzugang ein.",
  },
  {
    q: "Was passiert bei Kündigung mit unseren Daten?",
    a: "Eure Daten bleiben 30 Tage nach Kündigung abrufbar. Auf Anfrage exportieren wir alles in gängige Formate (CSV, JSON, PDF).",
  },
  {
    q: "Gibt es Rabatte für größere Teams?",
    a: "Ja. Ab 200 Nutzern bieten wir Volumenrabatte. NGOs und gemeinnützige Organisationen erhalten auf Anfrage Sonderkonditionen.",
  },
]

function FAQSection() {
  const { ref, inView } = useInViewOnce()

  return (
    <section ref={ref} className="py-24 bg-muted/20 border-t border-border">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">Häufige Fragen</h2>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <details className="group border border-border rounded-xl overflow-hidden bg-background">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-[14px] font-semibold text-foreground select-none list-none">
                  {item.q}
                  <span className="text-muted-foreground transition-transform duration-200 group-open:rotate-180 shrink-0 ml-4 text-[11px]">▾</span>
                </summary>
                <div className="px-5 pb-5 pt-3 text-[13px] text-muted-foreground leading-relaxed border-t border-border">
                  {item.a}
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ───────────────────────────────────────────────────────────────────────

function PricingCTA() {
  return (
    <section className="py-24 bg-foreground relative overflow-hidden">
      <Grain opacity={0.04} />
      <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-black text-background mb-4">Bereit loszulegen?</h2>
          <p className="text-background/60 mb-8 text-lg max-w-md mx-auto">
            Kostenlose Demo — keine Kreditkarte, keine Vertragsbindung.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-background text-foreground text-[13px] font-semibold hover:opacity-90 transition-opacity"
            >
              Demo buchen <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-background/20 text-background/80 hover:text-background text-[13px] font-medium transition-colors"
            >
              Vertrieb kontaktieren
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────────

export function PricingPage({ plans, addons }: { plans: PricingPlan[]; addons: PricingAddon[] }) {
  return (
    <>
      <PricingHero />
      <PlansSection plans={plans} />
      <AppOverviewSection plans={plans} />
      <AddonsSection addons={addons} />
      <TrustSection />
      <FAQSection />
      <PricingCTA />
    </>
  )
}

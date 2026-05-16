"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Check, Quote, Shield, Clock, CalendarDays, BookOpen, Zap, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { INDUSTRIES, type IndustryApp, type IndustryData } from "@/lib/marketing/industries"

// ─── Shared ────────────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px 0px" })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Grain({ opacity = 0.025 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "160px 160px",
      }}
    />
  )
}

function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("mb-4 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-muted-foreground/55", className)}>
      {children}
    </p>
  )
}

function ProductRail({ apps }: { apps: IndustryApp[] }) {
  return (
    <div className="industry-panel divide-y divide-[#e8eaed] border border-[#e8eaed]">
      {apps.map((app) => {
        const Icon = app.icon
        return (
          <Link
            key={app.slug}
            href={`/produkte/${app.slug}`}
            className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#f8f9fa]"
          >
            <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl", app.color)}>
              <Icon className="size-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[13px] font-semibold text-[#08080c]">{app.name}</p>
                <span className="rounded-full bg-[#f0f2f4] px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-[#6b7280]">
                  {app.tag}
                </span>
              </div>
              <p className="mt-0.5 truncate text-[12px] leading-relaxed text-[#6b7280]">{app.desc}</p>
            </div>
            <ArrowRight className="size-3.5 shrink-0 text-[#c4c9d4] transition-all group-hover:translate-x-0.5 group-hover:text-[#6b7280]" />
          </Link>
        )
      })}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// HOTELLERIE
// ══════════════════════════════════════════════════════════════════════════════

type RoomStatus = "belegt" | "checkout" | "frei" | "housekeeping"

const HOTEL_ROOMS: (RoomStatus | null)[][] = [
  ["belegt",      "checkout",     "belegt",        "frei",         "belegt",       "belegt"],
  ["frei",        "belegt",       "belegt",         "checkout",     "belegt",       "housekeeping"],
  ["belegt",      "belegt",       "housekeeping",   "belegt",       "checkout",     "belegt"],
  ["belegt",      "frei",         "belegt",         "belegt",       "belegt",       "checkout"],
]

const ROOM_STYLE: Record<RoomStatus, { bg: string; border: string; dot: string }> = {
  belegt:       { bg: "#dbeafe", border: "#bfdbfe", dot: "#2563eb" },
  checkout:     { bg: "#fef3c7", border: "#fde68a", dot: "#d97706" },
  frei:         { bg: "#dcfce7", border: "#bbf7d0", dot: "#16a34a" },
  housekeeping: { bg: "#f3e8ff", border: "#e9d5ff", dot: "#9333ea" },
}

const ROOM_LABELS: Record<RoomStatus, string> = {
  belegt: "Belegt", checkout: "Checkout", frei: "Frei", housekeeping: "Housekeeping",
}

function HotelRoomGrid() {
  const floors = ["4. OG", "3. OG", "2. OG", "1. OG"]
  return (
    <div className="industry-mockup overflow-hidden rounded-2xl border border-[#e0d4c0] bg-white shadow-[0_28px_80px_rgba(120,80,20,0.10)]">
      <div className="flex items-center justify-between border-b border-[#e0d4c0] bg-[#fffcf5] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-[#ff5f57]" />
            <div className="size-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="size-2.5 rounded-full bg-[#28ca41]" />
          </div>
          <span className="ml-2 text-[11px] font-medium text-[#a08060]">Roster — Zimmerstatus</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-1.5 rounded-full bg-[#22c55e]" />
          <span className="text-[10px] font-medium text-[#a08060]">Heute, 10:42</span>
        </div>
      </div>
      <div className="grid grid-cols-4 divide-x divide-[#e0d4c0] border-b border-[#e0d4c0]">
        {[
          { label: "Belegung",  value: "78%", color: "#2563eb" },
          { label: "Checkouts", value: "8",   color: "#d97706" },
          { label: "Ankünfte",  value: "11",  color: "#16a34a" },
          { label: "Reinigung", value: "5",   color: "#9333ea" },
        ].map(s => (
          <div key={s.label} className="px-3.5 py-3">
            <p className="text-[18px] font-bold leading-none" style={{ color: s.color }}>{s.value}</p>
            <p className="mt-1 text-[9px] font-medium uppercase tracking-wide text-[#b09070]">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-1.5 p-4">
        {HOTEL_ROOMS.map((row, fi) => (
          <div key={fi} className="flex items-center gap-2">
            <span className="w-9 shrink-0 text-[9px] font-bold uppercase tracking-wider text-[#c4b5a0]">{floors[fi]}</span>
            <div className="flex flex-1 gap-1.5">
              {row.map((status, ri) => (
                <div
                  key={ri}
                  className="flex-1 rounded-md border py-2.5 text-center"
                  style={
                    status
                      ? { backgroundColor: ROOM_STYLE[status].bg, borderColor: ROOM_STYLE[status].border }
                      : { backgroundColor: "#f9f7f4", borderColor: "#e8dcc8" }
                  }
                >
                  <span className="text-[9px] font-bold text-[#6b5a45]">{`4${fi + 1}${ri + 1}`}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3.5 border-t border-[#e0d4c0] bg-[#fffcf5] px-4 py-3">
        {(Object.keys(ROOM_STYLE) as RoomStatus[]).map(key => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="size-2 rounded-full" style={{ backgroundColor: ROOM_STYLE[key].dot }} />
            <span className="text-[9.5px] font-medium text-[#a08060]">{ROOM_LABELS[key]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Hotel onboarding checklist mockup
function HotelOnboardingCard() {
  const steps = [
    { label: "HACCP-Schulung",           status: "done",    time: "Tag 1" },
    { label: "Hausführung & Zimmersystem", status: "done",   time: "Tag 1" },
    { label: "Brandschutzunterweisung",  status: "done",    time: "Tag 2" },
    { label: "Schichteinweisung Früh",   status: "active",  time: "Tag 3" },
    { label: "Erste eigenst. Schicht",   status: "pending", time: "Tag 4" },
    { label: "30-Tage Check-in",         status: "pending", time: "Tag 30" },
  ]

  return (
    <div className="industry-mockup overflow-hidden rounded-2xl border border-[#e0d4c0] bg-white shadow-[0_24px_60px_rgba(120,80,20,0.08)]">
      <div className="flex items-center justify-between border-b border-[#e0d4c0] bg-[#fffcf5] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-[#ff5f57]" />
            <div className="size-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="size-2.5 rounded-full bg-[#28ca41]" />
          </div>
          <span className="ml-2 text-[11px] font-medium text-[#a08060]">Flow — Onboarding-Checkliste</span>
        </div>
        <span className="rounded-full bg-[#fef3c7] px-2.5 py-0.5 text-[9px] font-bold text-[#d97706]">50% abgeschlossen</span>
      </div>

      <div className="flex items-center gap-3 border-b border-[#e0d4c0] px-5 py-4">
        <div className="flex size-10 items-center justify-center rounded-full bg-[#fde68a] text-[13px] font-bold text-[#92400e]">JK</div>
        <div>
          <p className="text-[13px] font-semibold text-[#1a1208]">Julia Kessler</p>
          <p className="text-[11px] text-[#a08060]">Rezeption · Saisonkraft · seit 3 Tagen</p>
        </div>
        <div className="ml-auto rounded-full bg-[#dcfce7] px-2.5 py-1 text-[10px] font-bold text-[#15803d]">Aktiv</div>
      </div>

      <div className="border-b border-[#e0d4c0] px-5 py-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#a08060]">Fortschritt</span>
          <span className="text-[10px] font-bold text-[#c8a060]">3 / 6 Aufgaben</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#f0e8d8]">
          <div className="h-full w-1/2 rounded-full bg-[#c8a060]" />
        </div>
      </div>

      <div className="px-5 py-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3 border-b border-[#f0e8d8] py-2.5 last:border-b-0">
            <div className={cn(
              "flex size-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold",
              step.status === "done"    ? "bg-[#c8a060] text-white" :
              step.status === "active"  ? "border-2 border-[#c8a060] bg-[#fde68a]" :
              "bg-[#f0e8d8]"
            )}>
              {step.status === "done" ? "✓" : ""}
            </div>
            <span className={cn(
              "flex-1 text-[12px]",
              step.status === "done"    ? "text-[#a08060] line-through" :
              step.status === "active"  ? "font-semibold text-[#1a1208]" :
              "text-[#c4b5a0]"
            )}>
              {step.label}
            </span>
            <span className="text-[10px] font-medium text-[#c4b5a0]">{step.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function HotelStage({ industry }: { industry: IndustryData }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -60])

  const depts = [
    {
      name: "Rezeption",
      tagline: "Check-in bis Check-out",
      bg: "#f8fbff",
      accent: "#2563eb",
      features: [
        "Schicht-Briefing automatisch vorbereitet",
        "Late Arrivals & Sonderwünsche strukturiert erfasst",
        "Übergabeprotokolle digital und nachvollziehbar",
        "Neues Personal durch Checklisten sicher eingeführt",
      ],
      apps: ["Persona", "Flow", "Atlas"],
    },
    {
      name: "Housekeeping",
      tagline: "Sauber. Schnell. Strukturiert.",
      bg: "#f6fbf8",
      accent: "#16a34a",
      features: [
        "Zimmerstatus synchron mit der Rezeption",
        "Aufgabenverteilung nach Etage und Priorität",
        "Reinigungsstandards als SOPs hinterlegt",
        "Saisonspitzen ohne Einarbeitungsverlust meistern",
      ],
      apps: ["Roster", "Academy", "Atlas"],
    },
    {
      name: "Food & Beverage",
      tagline: "Frühstück, Bankett, à la carte",
      bg: "#fffaf2",
      accent: "#d97706",
      features: [
        "Allergenkunde & HACCP lückenlos dokumentiert",
        "Schichtplanung für Wochenenden und Events",
        "Neue Servicekräfte schnell auf Standard gebracht",
        "Rezeptdatenbank und SOPs zentral abrufbar",
      ],
      apps: ["Academy", "Roster", "Tempo"],
    },
  ]

  return (
    <>
      {/* ── Hero ── */}
      <section ref={ref} className="industry-section industry-section-hero relative overflow-hidden pb-24 pt-24 sm:pb-32 sm:pt-28 lg:pb-40 lg:pt-36" style={{ backgroundColor: "#fffcf5" }}>
        <div aria-hidden className="industry-hero-pattern pointer-events-none absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, #c8a060 1px, transparent 1px)",
          backgroundSize: "32px 32px", opacity: 0.14,
        }} />
        <Grain opacity={0.025} />
        <div className="relative mx-auto max-w-screen-xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-14 xl:grid-cols-[1fr_1.12fr] xl:items-center xl:gap-16">
            <FadeUp>
              <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#e0d4c0] bg-white px-4 py-2 shadow-sm">
                <div className="flex size-6 items-center justify-center rounded-full bg-[#c8a060]">
                  <industry.icon className="size-3 text-white" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a7560]">{industry.tagline}</span>
              </div>
              <h1 className="text-balance font-heading text-[52px] font-normal leading-[0.90] tracking-tight text-[#1a1208] sm:text-[72px] lg:text-[92px] xl:text-[108px]">
                Hotelbetrieb.
                <br />
                <span style={{ color: "#c8a060" }}>In einer</span>
                <br />
                Plattform.
              </h1>
              <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-[#7a6a54] sm:text-[17px]">
                {industry.heroSub}
              </p>
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Link href="/login" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1a1208] px-7 text-[14px] font-semibold text-white transition-opacity hover:opacity-85">
                  Demo buchen <ArrowRight className="size-4" />
                </Link>
                <Link href={`/industrien/${industry.otherIndustries[0].slug}`} className="inline-flex h-12 items-center justify-center rounded-full border border-[#e0d4c0] bg-white px-7 text-[14px] font-medium text-[#7a6a54] transition-colors hover:bg-[#fdf6ec]">
                  Zur {industry.otherIndustries[0].name}
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-8 border-t border-[#e0d4c0] pt-8">
                {industry.stats.map(stat => (
                  <div key={stat.label}>
                    <p className="font-heading text-[30px] font-normal leading-none text-[#1a1208]">{stat.value}</p>
                    <p className="mt-1.5 text-[11px] text-[#a08060]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <motion.div style={{ y }}><HotelRoomGrid /></motion.div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Challenges ── */}
      <section className="industry-section border-t border-[#e0d4c0] py-24 sm:py-32" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <FadeUp>
              <Eyebrow>Vier Realitäten im Hotel</Eyebrow>
              <h2 className="text-balance font-heading text-[38px] font-normal leading-[0.94] tracking-tight text-[#1a1208] sm:text-[52px] lg:text-[64px]">
                Wo Hotels
                <br />
                <span style={{ color: "#c8a060" }}>verlieren.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="max-w-lg text-[16px] leading-relaxed text-[#6b7280]">
                Rezeption, Housekeeping, Küche und Saisonkräfte — vier Abteilungen, vier Logiken, ein Betrieb. Hostpartners bringt sie zusammen.
              </p>
            </FadeUp>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-px border border-[#e0d4c0] bg-[#e0d4c0] sm:grid-cols-2 xl:grid-cols-4">
            {industry.challenges.map((ch, i) => (
              <FadeUp key={ch.problem} delay={i * 0.07}>
                <div
                  className={cn(
                    "h-full px-6 py-8 sm:px-7",
                    i % 2 === 0
                      ? "bg-[#fffcf5] dark:bg-[#2a241f]"
                      : "bg-white dark:bg-[#211d19]"
                  )}
                >
                  <p className="mb-5 font-mono text-[10px] font-bold text-[#c8a060] dark:text-[#f0cf93]">{`0${i + 1}`}</p>
                  <p className="text-[20px] font-semibold leading-tight text-[#1a1208] dark:text-[#f7efe4]">{ch.problem}</p>
                  <div className="my-6 h-px dark:bg-white/12" style={{ backgroundColor: "#e0d4c0" }} />
                  <p className="text-[13px] leading-relaxed text-[#6b7280] dark:text-[#e1d2bf]">{ch.solution}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Drei Abteilungen ── */}
      <section className="industry-section industry-section-soft border-t border-[#e0d4c0] py-24 sm:py-32" style={{ backgroundColor: "#fffcf5" }}>
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <FadeUp>
              <Eyebrow>Abteilungen im Hotel</Eyebrow>
              <h2 className="text-balance font-heading text-[38px] font-normal leading-[0.94] tracking-tight text-[#1a1208] sm:text-[52px] lg:text-[64px]">
                Drei Welten.
                <br />
                <span style={{ color: "#c8a060" }}>Eine Logik.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="max-w-lg text-[16px] leading-relaxed text-[#6b7280]">
                Rezeption, Housekeeping und F&B funktionieren nach eigenen Rhythmen — aber in einem Haus. Hostpartners denkt alle drei mit, ohne Schnittstellenchaos.
              </p>
            </FadeUp>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-px border border-[#e0d4c0] bg-[#e0d4c0] xl:grid-cols-3">
            {depts.map((dept, i) => (
              <FadeUp key={dept.name} delay={i * 0.08}>
                <div
                  className={cn(
                    "h-full px-6 py-8 sm:px-8 sm:py-10",
                    i === 0 && "bg-[#f8fbff] dark:bg-[#1d2330]",
                    i === 1 && "bg-[#f6fbf8] dark:bg-[#1d2721]",
                    i === 2 && "bg-[#fffaf2] dark:bg-[#2b231d]"
                  )}
                >
                  <div
                    className="mb-5 inline-flex h-7 items-center rounded-full px-3 text-[10px] font-bold uppercase tracking-[0.14em] dark:border dark:border-white/10"
                    style={{ backgroundColor: `${dept.accent}18`, color: dept.accent }}
                  >
                    {dept.tagline}
                  </div>
                  <p className="mb-6 text-[26px] font-semibold leading-tight text-[#1a1208] dark:text-[#f7efe4]">{dept.name}</p>
                  <div className="space-y-3.5">
                    {dept.features.map(f => (
                      <div key={f} className="flex items-start gap-3">
                        <Check className="mt-0.5 size-4 shrink-0" style={{ color: dept.accent }} />
                        <p className="text-[13px] leading-relaxed text-[#6b7280] dark:text-[#ddd4c6]">{f}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-1.5">
                    {dept.apps.map(app => (
                      <span key={app} className="rounded-full border border-[#e0d4c0] bg-white px-3 py-1 text-[11px] font-semibold text-[#1a1208] dark:border-white/10 dark:bg-black/25 dark:text-white">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Saisonkräfte / Onboarding ── */}
      <section className="industry-section border-t border-[#e0d4c0] py-24 sm:py-32" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 xl:grid-cols-2 xl:items-center xl:gap-16">
            <FadeUp>
              <Eyebrow>Saisonkräfte & Onboarding</Eyebrow>
              <h2 className="text-balance font-heading text-[38px] font-normal leading-[0.94] tracking-tight text-[#1a1208] sm:text-[52px] lg:text-[60px]">
                Neue Kraft.
                <br />
                <span style={{ color: "#c8a060" }}>In 3 Tagen</span>
                <br />
                produktiv.
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[#6b7280]">
                Saisonale Einstellungen sind in der Hotellerie Routine — aber chaotisches Onboarding kostet Zeit und Qualität. Hostpartners Flow erstellt automatisch eine persönliche Checkliste mit allen Pflichtschulungen, Einweisungen und Übergaben. Der Fortschritt ist für Manager jederzeit sichtbar.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Zap,          label: "Automatische Aufgabenverteilung",   body: "Flow weist alle Onboarding-Tasks direkt beim Anlegen der Kraft zu." },
                  { icon: Shield,       label: "HACCP & Compliance als erstes",      body: "Pflichtschulungen stehen ganz oben — kein Antreten ohne Nachweis." },
                  { icon: CalendarDays, label: "30-Tage-Check-in automatisch",       body: "Nach einem Monat erinnert Flow den Manager automatisch ans Follow-up." },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#e0d4c0] bg-[#fffcf5]">
                      <item.icon className="size-4 text-[#c8a060]" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#1a1208]">{item.label}</p>
                      <p className="mt-0.5 text-[12.5px] leading-relaxed text-[#6b7280]">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <HotelOnboardingCard />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Workflow + Apps ── */}
      <section className="industry-section industry-section-soft border-t border-[#e0d4c0] py-24 sm:py-32" style={{ backgroundColor: "#fffaf0" }}>
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            <FadeUp>
              <div className="border border-[#e0d4c0] bg-white p-6 sm:p-8">
                <Eyebrow>Ein sauberer Betriebstag</Eyebrow>
                <div className="mt-6">
                  {industry.steps.map((step, i) => (
                    <div key={step.number} className="grid grid-cols-[40px_1fr] gap-4 border-t border-[#e0d4c0] py-5 first:border-t-0 first:pt-0">
                      <div className="flex flex-col items-center gap-2 pt-0.5">
                        <div className="flex size-7 items-center justify-center rounded-full border border-[#e0d4c0] bg-[#fffcf5] text-[10px] font-bold text-[#c8a060]">
                          {i + 1}
                        </div>
                        {i < industry.steps.length - 1 && <div className="w-px flex-1 bg-[#e0d4c0]" />}
                      </div>
                      <div className="pb-1">
                        <p className="text-[15px] font-semibold text-[#1a1208]">{step.title}</p>
                        <p className="mt-2 text-[13px] leading-relaxed text-[#6b7280]">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.08}>
              <div className="border border-[#e0d4c0] bg-white p-6 sm:p-8">
                <Eyebrow>Module für Hotels</Eyebrow>
                <div className="mt-4">
                  <ProductRail apps={industry.apps} />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// GASTRONOMIE
// ══════════════════════════════════════════════════════════════════════════════

type GastroShift = "F" | "S" | "A"

const GASTRO_TEAM: { name: string; role: string; shift: GastroShift; active?: boolean }[] = [
  { name: "L. Wagner",  role: "Service",  shift: "S", active: true  },
  { name: "M. Özdemir", role: "Küche",    shift: "S", active: true  },
  { name: "S. Braun",   role: "Bar",      shift: "A"                },
  { name: "A. Müller",  role: "Service",  shift: "S", active: true  },
  { name: "K. Fischer", role: "Küche",    shift: "A"                },
  { name: "T. Keller",  role: "Service",  shift: "F"                },
  { name: "R. Huber",   role: "Spüle",    shift: "S", active: true  },
]

const GASTRO_SHIFT_STYLE: Record<GastroShift, { label: string; time: string; bg: string; color: string; border: string }> = {
  F: { label: "Früh",  time: "07–15", bg: "#fef9c3", color: "#a16207", border: "#fde047" },
  S: { label: "Spät",  time: "15–23", bg: "#fed7aa", color: "#c2410c", border: "#fb923c" },
  A: { label: "Abend", time: "18–01", bg: "#f3e8ff", color: "#7c3aed", border: "#c084fc" },
}

function GastroShiftBoard() {
  return (
    <div className="industry-mockup overflow-hidden rounded-2xl border border-[#fed7aa] bg-white shadow-[0_28px_80px_rgba(200,80,10,0.10)]">
      <div className="flex items-center justify-between border-b border-[#fed7aa] bg-[#fff8f2] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-[#ff5f57]" />
            <div className="size-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="size-2.5 rounded-full bg-[#28ca41]" />
          </div>
          <span className="ml-2 text-[11px] font-medium text-[#9a6a40]">Roster — Schichtübersicht</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-full bg-[#f97316]" />
          <span className="text-[10px] font-semibold text-[#f97316]">Service läuft</span>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_80px_80px_80px] border-b border-[#ffe8d4] bg-[#fff8f2]">
        <div className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-wider text-[#9a6a40]">Mitarbeiter</div>
        {(["F", "S", "A"] as GastroShift[]).map(s => (
          <div key={s} className="border-l border-[#ffe8d4] px-2 py-2.5 text-center">
            <p className="text-[9px] font-bold text-[#9a6a40]">{GASTRO_SHIFT_STYLE[s].label}</p>
            <p className="text-[8px] text-[#c4a080]">{GASTRO_SHIFT_STYLE[s].time}</p>
          </div>
        ))}
      </div>
      <div className="divide-y divide-[#ffe8d4]">
        {GASTRO_TEAM.map(member => (
          <div key={member.name} className={cn("grid grid-cols-[1fr_80px_80px_80px] items-center", member.active && "bg-[#fffaf6]")}>
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#fed7aa] text-[10px] font-bold text-[#c2410c]">
                {member.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-[#1c0a00]">{member.name}</p>
                <p className="text-[10px] text-[#9a6a40]">{member.role}</p>
              </div>
              {member.active && (
                <span className="ml-auto shrink-0 rounded-full bg-[#dcfce7] px-2 py-0.5 text-[9px] font-bold text-[#15803d]">aktiv</span>
              )}
            </div>
            {(["F", "S", "A"] as GastroShift[]).map(s => (
              <div key={s} className="flex items-center justify-center border-l border-[#ffe8d4] py-3">
                {member.shift === s ? (
                  <span className="rounded-md border px-2 py-1 text-[10px] font-bold" style={{ backgroundColor: GASTRO_SHIFT_STYLE[s].bg, color: GASTRO_SHIFT_STYLE[s].color, borderColor: GASTRO_SHIFT_STYLE[s].border }}>
                    {s}
                  </span>
                ) : (
                  <span className="text-[11px] text-[#e5d5c5]">—</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-[#fed7aa] bg-[#fff8f2] px-4 py-3">
        <span className="text-[10px] text-[#b08060]">Heute · Mo 14. Apr</span>
        <span className="text-[10px] font-semibold text-[#c2410c]">4 Kräfte aktiv im Dienst</span>
      </div>
    </div>
  )
}

// Gastro compliance tracker mockup
function GastroComplianceCard() {
  const trainings = [
    { name: "HACCP Grundschulung",  pct: 100, expiry: "Okt 2025", ok: true  },
    { name: "Allergenkunde",        pct: 87,  expiry: "Jan 2026", ok: true  },
    { name: "Ersthelfer",           pct: 67,  expiry: "Mär 2026", ok: false },
    { name: "Brandschutz",          pct: 100, expiry: "Dez 2025", ok: true  },
  ]

  return (
    <div className="industry-mockup overflow-hidden rounded-2xl border border-[#fed7aa] bg-white shadow-[0_24px_60px_rgba(200,80,10,0.08)]">
      <div className="flex items-center justify-between border-b border-[#fed7aa] bg-[#fff8f2] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-[#ff5f57]" />
            <div className="size-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="size-2.5 rounded-full bg-[#28ca41]" />
          </div>
          <span className="ml-2 text-[11px] font-medium text-[#9a6a40]">Academy — Pflichtschulungen</span>
        </div>
        <span className="rounded-full bg-[#dcfce7] px-2.5 py-0.5 text-[9px] font-bold text-[#15803d]">Audit-bereit</span>
      </div>

      <div className="grid grid-cols-3 divide-x divide-[#fed7aa] border-b border-[#fed7aa]">
        {[
          { label: "Schulungen",     value: "4"   },
          { label: "Mitarbeitende",  value: "12"  },
          { label: "Abgeschlossen",  value: "88%" },
        ].map(s => (
          <div key={s.label} className="px-4 py-3">
            <p className="text-[18px] font-bold text-[#1c0a00]">{s.value}</p>
            <p className="text-[9px] font-medium uppercase tracking-wide text-[#9a6a40]">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-5 px-5 py-5">
        {trainings.map(t => (
          <div key={t.name}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn("size-2 rounded-full", t.ok ? "bg-[#22c55e]" : "bg-[#f59e0b]")} />
                <span className="text-[12px] font-semibold text-[#1c0a00]">{t.name}</span>
              </div>
              <span className="text-[10px] text-[#9a6a40]">Gültig bis {t.expiry}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#ffe8d4]">
              <div className="h-full rounded-full" style={{ width: `${t.pct}%`, backgroundColor: t.ok ? "#f97316" : "#f59e0b" }} />
            </div>
            <p className="mt-1 text-right text-[9px] font-bold" style={{ color: t.ok ? "#f97316" : "#f59e0b" }}>{t.pct}% abgeschlossen</p>
          </div>
        ))}
      </div>

      <div className="border-t border-[#fed7aa] bg-[#fff8f2] px-5 py-3">
        <p className="text-[10px] text-[#9a6a40]">
          <span className="font-semibold text-[#f59e0b]">1 Schulung</span> läuft unter 80% — Erinnerung geht heute raus
        </p>
      </div>
    </div>
  )
}

function GastroStage({ industry }: { industry: IndustryData }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -55])

  const features = [
    { icon: CalendarDays, label: "Schichttauschbörse",           body: "Mitarbeitende tauschen Schichten direkt im Tool — kein WhatsApp-Chaos mehr." },
    { icon: Clock,        label: "Kiosk-Stempeluhr",             body: "Tablet am Eingang — Pausen und Zuschläge werden automatisch berechnet." },
    { icon: Shield,       label: "ArbZG-Compliance",             body: "Ruhezeiten und Höchststunden werden beim Planen in Echtzeit geprüft." },
    { icon: BookOpen,     label: "Rezept- & SOP-Datenbank",      body: "Alle Betriebsstandards in Atlas — sofort abrufbar, immer aktuell." },
    { icon: Users,        label: "Schnelles Onboarding",         body: "Neue Kräfte sind mit standardisierten Flow-Checklisten in unter 2 Tagen startklar." },
    { icon: Zap,          label: "Lohnexport in einem Klick",    body: "Tempo exportiert Monatsdaten direkt für die Lohnbuchhaltung." },
  ]

  return (
    <>
      {/* ── Hero ── */}
      <section ref={ref} className="industry-section industry-section-hero relative overflow-hidden pb-24 pt-24 sm:pb-32 sm:pt-28 lg:pb-40 lg:pt-36" style={{ backgroundColor: "#fff8f2" }}>
        <div aria-hidden className="industry-hero-pattern pointer-events-none absolute inset-0" style={{
          backgroundImage: "linear-gradient(45deg, #fed7aa 1px, transparent 1px), linear-gradient(-45deg, #fed7aa 1px, transparent 1px)",
          backgroundSize: "24px 24px", opacity: 0.25,
        }} />
        <Grain opacity={0.022} />
        <div className="relative mx-auto max-w-screen-xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-14 xl:grid-cols-[1fr_1.1fr] xl:items-center xl:gap-16">
            <FadeUp>
              <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#fed7aa] bg-white px-4 py-2 shadow-sm">
                <div className="flex size-6 items-center justify-center rounded-full bg-[#f97316]">
                  <industry.icon className="size-3 text-white" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9a6a40]">{industry.tagline}</span>
              </div>
              <h1 className="text-balance font-heading text-[52px] font-normal leading-[0.90] tracking-tight text-[#1c0a00] sm:text-[72px] lg:text-[92px] xl:text-[108px]">
                Vor dem
                <br />
                <span style={{ color: "#f97316" }}>Peak.</span>
                <br />
                Danach. Immer.
              </h1>
              <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-[#9a6a40] sm:text-[17px]">
                {industry.heroSub}
              </p>
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Link href="/login" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1c0a00] px-7 text-[14px] font-semibold text-white transition-opacity hover:opacity-85">
                  Demo buchen <ArrowRight className="size-4" />
                </Link>
                <Link href={`/industrien/${industry.otherIndustries[0].slug}`} className="inline-flex h-12 items-center justify-center rounded-full border border-[#fed7aa] bg-white px-7 text-[14px] font-medium text-[#9a6a40] transition-colors hover:bg-[#fff3e0]">
                  Zur {industry.otherIndustries[0].name}
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-8 border-t border-[#fed7aa] pt-8">
                {industry.stats.map(stat => (
                  <div key={stat.label}>
                    <p className="font-heading text-[30px] font-normal leading-none text-[#1c0a00]">{stat.value}</p>
                    <p className="mt-1.5 text-[11px] text-[#9a6a40]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <motion.div style={{ y }}><GastroShiftBoard /></motion.div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Drei Phasen ── */}
      <section className="industry-section border-t border-[#fed7aa] py-24 sm:py-32" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <FadeUp>
              <Eyebrow>Der Servicetag</Eyebrow>
              <h2 className="text-balance font-heading text-[38px] font-normal leading-[0.94] tracking-tight text-[#1c0a00] sm:text-[52px] lg:text-[64px]">
                Drei Phasen.
                <br />
                <span style={{ color: "#f97316" }}>Ein System.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="max-w-lg text-[16px] leading-relaxed text-[#6b7280]">
                Vorbereitung, Rush Hour und Nachbereitung folgen einer eigenen Logik. Hostpartners deckt alle drei ab — ohne Medienbruch.
              </p>
            </FadeUp>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-px border border-[#fed7aa] bg-[#fed7aa] xl:grid-cols-3">
            {[
              { phase: "Vor dem Service", time: "07:00 – 11:00", bg: "#fff8f2", accent: "#f97316", points: ["Briefing automatisch vorbereitet", "Neue Kräfte durch Flow eingeführt", "Schichtbesetzung auf einem Blick"] },
              { phase: "Rush Hour",       time: "12:00 – 15:00", bg: "#fff3e0", accent: "#ea580c", points: ["Kurzfristiger Schichttausch direkt im Tool", "ArbZG-Warnungen in Echtzeit", "Pausen automatisch verbucht"] },
              { phase: "Nachbereitung",   time: "15:00 – Schichtende", bg: "#fff8f2", accent: "#c2410c", points: ["Zeiterfassung abgeschlossen", "HACCP-Nachweis dokumentiert", "Export für Lohnbuchhaltung"] },
            ].map((phase, i) => (
              <FadeUp key={phase.phase} delay={i * 0.08}>
                <div
                  className={cn(
                    "industry-phase-card h-full px-6 py-8 sm:px-8 sm:py-10",
                    i === 0 && "industry-phase-card-1 bg-[#fff8f2] dark:bg-[#2a221d]",
                    i === 1 && "industry-phase-card-2 bg-[#fff3e0] dark:bg-[#31241a]",
                    i === 2 && "industry-phase-card-3 bg-[#fff8f2] dark:bg-[#251d18]"
                  )}
                >
                  <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-widest" style={{ color: phase.accent }}>{phase.time}</p>
                  <p className="mb-6 text-[24px] font-semibold leading-tight text-[#1c0a00] dark:text-[#fff1e7]">{phase.phase}</p>
                  <div className="space-y-3.5">
                    {phase.points.map(pt => (
                      <div key={pt} className="flex items-start gap-3">
                        <Check className="mt-0.5 size-4 shrink-0" style={{ color: phase.accent }} />
                        <p className="text-[13px] leading-relaxed text-[#6b7280] dark:text-[#e7d4c5]">{pt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── HACCP & Compliance ── */}
      <section className="industry-section industry-section-soft border-t border-[#fed7aa] py-24 sm:py-32" style={{ backgroundColor: "#fff8f2" }}>
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 xl:grid-cols-2 xl:items-center xl:gap-16">
            <FadeUp>
              <Eyebrow>HACCP & Pflichtschulungen</Eyebrow>
              <h2 className="text-balance font-heading text-[38px] font-normal leading-[0.94] tracking-tight text-[#1c0a00] sm:text-[52px] lg:text-[60px]">
                Kontrolle.
                <br />
                <span style={{ color: "#f97316" }}>Ohne</span>
                <br />
                Aufwand.
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[#6b7280]">
                HACCP-Nachweise, Allergenkunde und Brandschutzunterweisungen müssen lückenlos dokumentiert sein — in der Lebensmittelkontrolle und im Ernstfall. Hostpartners Academy erinnert automatisch, trackt den Abschluss und stellt Zertifikate auf Knopfdruck bereit.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "Automatische Ablauferinnerungen per E-Mail",
                  "Zertifikate in der digitalen Personalakte",
                  "Auditberichte auf Knopfdruck exportieren",
                  "Neue Schulungen live innerhalb von Stunden",
                ].map(pt => (
                  <div key={pt} className="flex items-start gap-3 rounded-xl border border-[#fed7aa] bg-white px-4 py-3.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#f97316]" />
                    <p className="text-[13px] leading-relaxed text-[#6b7280]">{pt}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <GastroComplianceCard />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Feature grid ── */}
      <section className="industry-section border-t border-[#fed7aa] py-24 sm:py-32" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <FadeUp>
              <Eyebrow>Was Hostpartners mitbringt</Eyebrow>
              <h2 className="text-balance font-heading text-[38px] font-normal leading-[0.94] tracking-tight text-[#1c0a00] sm:text-[52px] lg:text-[60px]">
                Alles für
                <br />
                <span style={{ color: "#f97316" }}>den Betrieb.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="max-w-lg text-[16px] leading-relaxed text-[#6b7280]">
                Kein Tool-Patchwork. Hostpartners deckt die operativen Kernbereiche eines Gastronomiebetriebs in einem System ab.
              </p>
            </FadeUp>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-px border border-[#fed7aa] bg-[#fed7aa] sm:grid-cols-2 xl:grid-cols-3">
            {features.map((feat, i) => (
              <FadeUp key={feat.label} delay={i * 0.05}>
                <div
                  className={cn(
                    "h-full px-6 py-7 sm:px-7",
                    i % 2 === 0 ? "bg-[#fffaf4] dark:bg-[#2a221d]" : "bg-white dark:bg-[#221c18]"
                  )}
                >
                  <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-[#fed7aa] bg-white dark:border-white/10 dark:bg-black/20">
                    <feat.icon className="size-4.5 text-[#f97316]" />
                  </div>
                  <p className="mb-2 text-[16px] font-semibold text-[#1c0a00] dark:text-[#fff1e7]">{feat.label}</p>
                  <p className="text-[13px] leading-relaxed text-[#6b7280] dark:text-[#e7d4c5]">{feat.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust + Apps ── */}
      <section className="industry-section industry-section-soft border-t border-[#fed7aa] py-24 sm:py-32" style={{ backgroundColor: "#fffaf4" }}>
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            <FadeUp>
              <div className="border border-[#e8dcc8] bg-white p-6 sm:p-8">
                <Eyebrow>Warum Hostpartners das passende System ist</Eyebrow>
                <div className="mt-4">
                  {industry.trustPoints.map(tp => (
                    <div key={tp.title} className="border-t border-[#e8dcc8] py-5 first:border-t-0 first:pt-0">
                      <p className="text-[18px] font-semibold text-[#1c0a00]">{tp.title}</p>
                      <p className="mt-2 text-[13px] leading-relaxed text-[#6b7280]">{tp.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.08}>
              <div className="border border-[#e8dcc8] bg-white p-6 sm:p-8">
                <Eyebrow>Module nach Einsatz</Eyebrow>
                <div className="mt-4">
                  <ProductRail apps={industry.apps} />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// INDUSTRIE
// ══════════════════════════════════════════════════════════════════════════════

const FACTORY_DEPTS = [
  { name: "Montage Halle A", f: 12, s: 11, n: 9,  compliance: 94,  warn: false },
  { name: "Logistik",         f: 8,  s: 8,  n: 6,  compliance: 88,  warn: true  },
  { name: "Qualitätssich.",   f: 4,  s: 4,  n: 0,  compliance: 100, warn: false },
  { name: "Zentrale / Büro",  f: 15, s: 0,  n: 0,  compliance: 97,  warn: false },
]

function IndustryDashboard() {
  return (
    <div className="industry-mockup industry-mockup-dark overflow-hidden rounded-2xl border border-[#2a3348] bg-[#0d1117] shadow-[0_32px_90px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between border-b border-[#1e2a3a] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-[#ff5f57]" />
            <div className="size-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="size-2.5 rounded-full bg-[#28ca41]" />
          </div>
          <span className="ml-2 text-[11px] font-medium text-[#4a5568]">Hostpartners — Schicht-Monitor</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-1.5 rounded-full bg-[#22c55e]" />
          <span className="text-[10px] text-[#4a5568]">Live · 3 Standorte</span>
        </div>
      </div>
      <div className="grid grid-cols-2 border-b border-[#1e2a3a] sm:grid-cols-4 sm:divide-x sm:divide-[#1e2a3a]">
        {[
          { label: "Frühschicht",  value: "39",  color: "#60a5fa" },
          { label: "Spätschicht",  value: "23",  color: "#a78bfa" },
          { label: "Nachtschicht", value: "15",  color: "#34d399" },
          { label: "Compliance",   value: "94%", color: "#fbbf24" },
        ].map((k, i) => (
          <div
            key={k.label}
            className={cn(
              "px-3.5 py-3",
              i < 2 && "border-b border-[#1e2a3a] sm:border-b-0",
              i % 2 === 0 && "border-r border-[#1e2a3a] sm:border-r-0",
            )}
          >
            <p className="text-[20px] font-bold leading-none" style={{ color: k.color }}>{k.value}</p>
            <p className="mt-1 text-[9px] font-medium uppercase tracking-wide text-[#4a5568]">{k.label}</p>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto border-b border-[#1e2a3a]">
        <div className="min-w-[520px]">
          <div className="grid grid-cols-[1.5fr_0.5fr_0.5fr_0.5fr_1fr] gap-px bg-[#1e2a3a] text-[8.5px] font-bold uppercase tracking-widest text-[#3a4a5a]">
            <div className="bg-[#0d1117] px-4 py-2">Bereich</div>
            <div className="bg-[#0d1117] px-3 py-2 text-center">F</div>
            <div className="bg-[#0d1117] px-3 py-2 text-center">S</div>
            <div className="bg-[#0d1117] px-3 py-2 text-center">N</div>
            <div className="bg-[#0d1117] px-4 py-2">Unterweisungen</div>
          </div>
          {FACTORY_DEPTS.map(dept => (
            <div key={dept.name} className="grid grid-cols-[1.5fr_0.5fr_0.5fr_0.5fr_1fr] gap-px bg-[#1e2a3a] border-t border-[#1e2a3a]">
              <div className="flex items-center gap-2 bg-[#0d1117] px-4 py-3.5">
                <div className={cn("size-2 shrink-0 rounded-full", dept.warn ? "bg-[#f59e0b]" : "bg-[#22c55e]")} />
                <span className="text-[12px] font-medium text-[#c8d8e8]">{dept.name}</span>
              </div>
              <div className="flex items-center justify-center bg-[#0d1117] px-3">
                <span className="text-[13px] font-semibold text-[#60a5fa]">{dept.f}</span>
              </div>
              <div className="flex items-center justify-center bg-[#0d1117] px-3">
                <span className="text-[13px] font-semibold text-[#a78bfa]">{dept.s}</span>
              </div>
              <div className="flex items-center justify-center bg-[#0d1117] px-3">
                {dept.n > 0
                  ? <span className="text-[13px] font-semibold text-[#34d399]">{dept.n}</span>
                  : <span className="text-[12px] text-[#2a3348]">—</span>
                }
              </div>
              <div className="flex items-center gap-2.5 bg-[#0d1117] px-4">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#1e2a3a]">
                  <div className="h-full rounded-full" style={{ width: `${dept.compliance}%`, backgroundColor: dept.compliance >= 95 ? "#22c55e" : dept.compliance >= 85 ? "#f59e0b" : "#ef4444" }} />
                </div>
                <span className="w-8 text-right text-[10px] font-bold" style={{ color: dept.compliance >= 95 ? "#22c55e" : "#f59e0b" }}>
                  {dept.compliance}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-[10px] text-[#2a3348]">Letzte Aktualisierung: vor 2 Min.</span>
        <span className="text-[10px] font-semibold text-[#4a5568]">77 aktive Schichten</span>
      </div>
    </div>
  )
}

// Multi-location overview card (dark)
function IndustrieStandortCard() {
  const locations = [
    { name: "Werk Nord",  city: "Hamburg",   employees: 145, shifts: "3-Schicht", compliance: 96,  warn: false },
    { name: "Werk Süd",   city: "München",   employees: 98,  shifts: "2-Schicht", compliance: 89,  warn: true  },
    { name: "Zentrale",   city: "Frankfurt", employees: 42,  shifts: "Gleitzeit", compliance: 100, warn: false },
  ]

  return (
    <div className="industry-mockup industry-mockup-dark overflow-hidden rounded-2xl border border-[#2a3348] bg-[#0d1117] shadow-[0_28px_80px_rgba(0,0,0,0.30)]">
      <div className="flex items-center justify-between border-b border-[#1e2a3a] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-[#ff5f57]" />
            <div className="size-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="size-2.5 rounded-full bg-[#28ca41]" />
          </div>
          <span className="ml-2 text-[11px] font-medium text-[#4a5568]">Hostpartners — Standort-Übersicht</span>
        </div>
        <span className="text-[10px] text-[#4a5568]">3 Standorte aktiv</span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[520px]">
          <div className="grid grid-cols-[1.3fr_0.7fr_0.9fr_1fr] gap-px bg-[#1e2a3a] border-b border-[#1e2a3a]">
            {["Standort", "MA", "Schicht", "Compliance"].map(h => (
              <div key={h} className="bg-[#0d1117] px-4 py-2.5 text-[8.5px] font-bold uppercase tracking-widest text-[#3a4a5a]">{h}</div>
            ))}
          </div>

          {locations.map(loc => (
            <div key={loc.name} className="grid grid-cols-[1.3fr_0.7fr_0.9fr_1fr] gap-px bg-[#1e2a3a] border-t border-[#1e2a3a]">
              <div className="flex items-center gap-2.5 bg-[#0d1117] px-4 py-4">
                <div className={cn("size-2 shrink-0 rounded-full", loc.warn ? "bg-[#f59e0b]" : "bg-[#22c55e]")} />
                <div>
                  <p className="text-[13px] font-semibold text-[#c8d8e8]">{loc.name}</p>
                  <p className="text-[10px] text-[#4a5568]">{loc.city}</p>
                </div>
              </div>
              <div className="flex items-center bg-[#0d1117] px-4">
                <span className="text-[15px] font-bold text-[#60a5fa]">{loc.employees}</span>
              </div>
              <div className="flex items-center bg-[#0d1117] px-4">
                <span className="text-[11px] font-medium text-[#94a3b8]">{loc.shifts}</span>
              </div>
              <div className="flex items-center gap-2.5 bg-[#0d1117] px-4">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#1e2a3a]">
                  <div className="h-full rounded-full" style={{ width: `${loc.compliance}%`, backgroundColor: loc.compliance >= 95 ? "#22c55e" : "#f59e0b" }} />
                </div>
                <span className="w-8 text-right text-[10px] font-bold" style={{ color: loc.compliance >= 95 ? "#22c55e" : "#f59e0b" }}>
                  {loc.compliance}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-[#1e2a3a] border-t border-[#1e2a3a]">
        {[
          { label: "Mitarbeitende ges.",  value: "285" },
          { label: "Aktive Schichten",    value: "77"  },
          { label: "Ø Compliance",        value: "95%" },
        ].map(s => (
          <div key={s.label} className="px-4 py-3.5">
            <p className="text-[18px] font-bold text-[#c8d8e8]">{s.value}</p>
            <p className="mt-1 text-[9px] font-medium uppercase tracking-wide text-[#4a5568]">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function IndustrieControlTowerCard() {
  const highlights = [
    { label: "Offene Schichtkonflikte", value: "2", tone: "#f59e0b", body: "Werk Süd kollidiert morgen mit Ruhezeit-Regel." },
    { label: "Fällige Unterweisungen", value: "11", tone: "#60a5fa", body: "Staplerschein und Sicherheitsbriefing diese Woche." },
    { label: "Review-Fenster aktiv", value: "34", tone: "#a78bfa", body: "Schichtleitergespräche laufen bis Freitag." },
  ]

  return (
    <div className="industry-mockup industry-mockup-dark overflow-hidden rounded-2xl border border-[#2a3348] bg-[#0d1117] shadow-[0_28px_80px_rgba(0,0,0,0.30)]">
      <div className="flex items-center justify-between border-b border-[#1e2a3a] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-[#ff5f57]" />
            <div className="size-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="size-2.5 rounded-full bg-[#28ca41]" />
          </div>
          <span className="ml-2 text-[11px] font-medium text-[#4a5568]">Hostpartners — Leitstand</span>
        </div>
        <span className="rounded-full border border-[#1e2a3a] bg-[#111827] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]">
          Werksleitung
        </span>
      </div>
      <div className="grid gap-px bg-[#1e2a3a] sm:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.label} className="bg-[#0d1117] px-4 py-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#4a5568]">{item.label}</p>
            <p className="mt-2 text-[28px] font-bold leading-none" style={{ color: item.tone }}>{item.value}</p>
            <p className="mt-2 text-[11px] leading-relaxed text-[#94a3b8]">{item.body}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-px border-t border-[#1e2a3a] bg-[#1e2a3a] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="bg-[#0d1117] px-5 py-5">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4a5568]">Heute im Werk</p>
          <div className="space-y-3">
            {[
              { time: "06:00", title: "Frühschicht gestartet", body: "39 Mitarbeitende eingecheckt, 1 Tausch automatisch genehmigt." },
              { time: "10:30", title: "Unterweisung fällig", body: "Logistik-Team Süd fehlt noch bei 3 Stapler-Refreshs." },
              { time: "14:00", title: "1:1 Block Schichtleiter", body: "Atlas hält alle Gesprächsnotizen und Protokolle strukturiert griffbereit." },
            ].map((event) => (
              <div key={event.title} className="grid grid-cols-[46px_1fr] gap-3 rounded-xl border border-[#1e2a3a] bg-[#111827] px-3 py-3">
                <div className="rounded-lg border border-[#1e2a3a] bg-[#0b1220] px-2 py-2 text-center text-[10px] font-bold text-[#60a5fa]">
                  {event.time}
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-[#e2e8f0]">{event.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#94a3b8]">{event.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#0d1117] px-5 py-5">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4a5568]">Systemstatus</p>
          <div className="space-y-4">
            {[
              { name: "ArbZG-Prüfung", pct: 100, color: "#22c55e" },
              { name: "Schichtabdeckung", pct: 96, color: "#60a5fa" },
              { name: "Unterweisungsquote", pct: 94, color: "#f59e0b" },
              { name: "Review-Vollzug", pct: 72, color: "#a78bfa" },
            ].map((metric) => (
              <div key={metric.name}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#cbd5e1]">{metric.name}</span>
                  <span className="text-[10px] font-bold" style={{ color: metric.color }}>{metric.pct}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#1e2a3a]">
                  <div className="h-full rounded-full" style={{ width: `${metric.pct}%`, backgroundColor: metric.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function IndustrieStage({ industry }: { industry: IndustryData }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -55])

  const layers = [
    {
      num: "01",
      title: "Operative Ebene",
      subtitle: "Schicht, Zeit & ArbZG",
      body: "Früh-, Spät- und Nachtschicht, Wechselschichten und Gleitzeitmodelle laufen in einer Logik. Tempo prüft ArbZG-Grenzen automatisch beim Planen — Verstöße werden sofort sichtbar, bevor sie entstehen.",
      points: ["3-Schicht-Modelle, Wechselschicht, Gleitzeit", "ArbZG-Prüfung in Echtzeit", "Kiosk-Stempeluhr für Hallenbetrieb", "Export für Lohn und Abrechnung"],
      accent: "#60a5fa",
      bg: "#f8fbff",
    },
    {
      num: "02",
      title: "Sicherheitsebene",
      subtitle: "Unterweisungen & Compliance",
      body: "Sicherheitsunterweisungen, Maschineneinweisungen und Zertifizierungen müssen lückenlos nachweisbar sein — gegenüber Betriebsrat, BG und Prüfern. Academy trackt jeden Abschluss und warnt automatisch vor Ablauf.",
      points: ["Unterweisungen digital und auditierbar", "Maschinenschulungen mit Nachweis", "Automatische Ablaufwarnungen", "Betriebsrat-konforme Protokolle"],
      accent: "#34d399",
      bg: "#f6fbf8",
    },
    {
      num: "03",
      title: "Führungsebene",
      subtitle: "Performance & Standort-Control",
      body: "Recruiting, Onboarding und Kompetenzentwicklung greifen ineinander. Hire übergibt Einstellungen direkt an Flow, Atlas hält das Wissen aktuell — ohne E-Mail-Chaos zwischen Werken.",
      points: ["Recruiting und Onboarding nahtlos verbunden", "Kompetenzmatrix für Schichtleiter", "Atlas als zentrales Handbuch", "Lumen für standortübergreifende Suche"],
      accent: "#a78bfa",
      bg: "#faf8ff",
    },
  ]

  const shiftModels = [
    {
      title: "3-Schicht-Produktion",
      accent: "#60a5fa",
      body: "Früh, Spät und Nacht laufen in demselben Modell. Abdeckung, Ruhezeiten und Übergaben bleiben sichtbar, auch wenn Standorte unterschiedlich planen.",
      points: ["Früh-/Spät-/Nachtschicht in einer Matrix", "Automatische Ruhezeit-Prüfung", "Zuschläge und Export vorbereitet"],
    },
    {
      title: "Wechselschicht & Logistik",
      accent: "#34d399",
      body: "Rollierende Pläne, Springer und kurzfristige Umbesetzungen werden ohne Tabellen-Chaos steuerbar. Konflikte tauchen im Leitstand auf, nicht erst am Tor.",
      points: ["Rotationen und Springer sauber abbilden", "Tausch und Umbesetzung dokumentiert", "Offene Konflikte sofort sichtbar"],
    },
    {
      title: "Büro, HQ & Hybrid",
      accent: "#a78bfa",
      body: "Produktion und Verwaltung müssen nicht in zwei Systemen leben. Homeoffice, Abwesenheit und Zielzyklen hängen am selben Mitarbeiterprofil wie der Hallenbetrieb.",
      points: ["Homeoffice und Gleitzeit integriert", "Ein Profil für Werk und Verwaltung", "Reviews ohne Medienbruch"],
    },
  ]

  const governanceTracks = [
    { icon: Clock, title: "Operative Sicherheit", body: "Schichtabdeckung, Ruhezeiten, Zuschläge und Arbeitszeitgrenzen werden im Alltag sichtbar, nicht erst in der Nachkontrolle." },
    { icon: Shield, title: "Auditierbare Compliance", body: "Unterweisungen, Maschinenschulungen und Pflichttermine sind pro Werk nachvollziehbar und exportierbar." },
    { icon: Users, title: "Führung im Takt des Betriebs", body: "Schichtleiter, Werkleitung und HR arbeiten auf derselben Datenbasis für Reviews, Entwicklung und Eskalationen." },
  ]

  return (
    <>
      {/* ── Hero ── */}
      <section ref={ref} className="industry-section industry-section-hero relative overflow-hidden pb-24 pt-24 sm:pb-32 sm:pt-28 lg:pb-40 lg:pt-36" style={{ backgroundColor: "#f4f6f9" }}>
        <div aria-hidden className="industry-hero-pattern pointer-events-none absolute inset-0" style={{
          backgroundImage: "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "40px 40px", opacity: 0.35,
        }} />
        <Grain opacity={0.02} />
        <div className="relative mx-auto max-w-screen-xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-14 xl:grid-cols-[1fr_1.12fr] xl:items-center xl:gap-16">
            <FadeUp>
              <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#cbd5e1] bg-white px-4 py-2 shadow-sm">
                <div className="flex size-6 items-center justify-center rounded-full bg-[#475569]">
                  <industry.icon className="size-3 text-white" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748b]">{industry.tagline}</span>
              </div>
              <h1 className="text-balance font-heading text-[52px] font-normal leading-[0.90] tracking-tight text-[#0f172a] sm:text-[72px] lg:text-[92px] xl:text-[108px]">
                Schicht.
                <br />
                <span style={{ color: "#64748b" }}>Unterweisung.</span>
                <br />
                Kontrolle.
              </h1>
              <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-[#64748b] sm:text-[17px]">
                {industry.heroSub}
              </p>
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Link href="/login" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0f172a] px-7 text-[14px] font-semibold text-white transition-opacity hover:opacity-85">
                  Demo buchen <ArrowRight className="size-4" />
                </Link>
                <Link href={`/industrien/${industry.otherIndustries[0].slug}`} className="inline-flex h-12 items-center justify-center rounded-full border border-[#cbd5e1] bg-white px-7 text-[14px] font-medium text-[#64748b] transition-colors hover:bg-[#f1f5f9]">
                  Zur {industry.otherIndustries[0].name}
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-8 border-t border-[#cbd5e1] pt-8">
                {industry.stats.map(stat => (
                  <div key={stat.label}>
                    <p className="font-heading text-[30px] font-normal leading-none text-[#0f172a]">{stat.value}</p>
                    <p className="mt-1.5 text-[11px] text-[#94a3b8]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <motion.div style={{ y }}><IndustryDashboard /></motion.div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Challenges ── */}
      <section className="industry-section border-t border-[#e2e8f0] py-24 sm:py-32" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <FadeUp>
              <Eyebrow>Vier operative Knackpunkte</Eyebrow>
              <h2 className="text-balance font-heading text-[38px] font-normal leading-[0.94] tracking-tight text-[#0f172a] sm:text-[52px] lg:text-[64px]">
                Wo Werke
                <br />
                <span style={{ color: "#64748b" }}>reibungslos laufen.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="max-w-lg text-[16px] leading-relaxed text-[#64748b]">
                Mehrere Standorte, Schichtmodelle und gesetzliche Anforderungen unter einen Hut — Hostpartners ist dafür gebaut.
              </p>
            </FadeUp>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-px border border-[#e2e8f0] bg-[#e2e8f0] sm:grid-cols-2 xl:grid-cols-4">
            {industry.challenges.map((ch, i) => (
              <FadeUp key={ch.problem} delay={i * 0.07}>
                <div
                  className={cn(
                    "h-full px-6 py-8 sm:px-7",
                    i % 2 === 0 ? "bg-[#f8fafc] dark:bg-[#20242c]" : "bg-white dark:bg-[#1b1f26]"
                  )}
                >
                  <p className="mb-5 font-mono text-[10px] font-bold text-[#94a3b8] dark:text-[#9fb0c8]">{`0${i + 1}`}</p>
                  <p className="text-[20px] font-semibold leading-tight text-[#0f172a] dark:text-[#f4f7fb]">{ch.problem}</p>
                  <div className="my-6 h-px bg-[#e2e8f0]" />
                  <p className="text-[13px] leading-relaxed text-[#64748b] dark:text-[#d9e0ea]">{ch.solution}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Schichtmodelle ── */}
      <section className="industry-section border-t border-[#e2e8f0] py-24 sm:py-32" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <FadeUp>
              <Eyebrow>Schichtmodelle</Eyebrow>
              <h2 className="text-balance font-heading text-[38px] font-normal leading-[0.94] tracking-tight text-[#0f172a] sm:text-[52px] lg:text-[64px]">
                Ein System für
                <br />
                <span style={{ color: "#64748b" }}>jede Taktung.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="max-w-lg text-[16px] leading-relaxed text-[#64748b]">
                Industrie heißt selten nur Hallenbetrieb. Produktion, Logistik und Verwaltung folgen verschiedenen Takten. Die Seite bildet das jetzt explizit ab statt Industrie auf reine Zeiterfassung zu verkürzen.
              </p>
            </FadeUp>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-px border border-[#e2e8f0] bg-[#e2e8f0] xl:grid-cols-3">
            {shiftModels.map((model, i) => (
              <FadeUp key={model.title} delay={i * 0.08}>
                <div
                  className={cn(
                    "h-full px-6 py-8 sm:px-8 sm:py-10",
                    i === 0 && "bg-white dark:bg-[#1d2530]",
                    i === 1 && "bg-white dark:bg-[#1b2723]",
                    i === 2 && "bg-white dark:bg-[#241f2c]"
                  )}
                >
                  <div className="mb-5 inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: model.accent, backgroundColor: `${model.accent}14` }}>
                    Einsatzmodell
                  </div>
                  <p className="text-[24px] font-semibold leading-tight text-[#0f172a] dark:text-[#f3f7fb]">{model.title}</p>
                  <p className="mt-4 text-[13.5px] leading-relaxed text-[#64748b] dark:text-[#d8e0ea]">{model.body}</p>
                  <div className="mt-6 space-y-3 border-t border-[#e2e8f0] pt-5 dark:border-white/10">
                    {model.points.map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <div className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ backgroundColor: model.accent }} />
                        <p className="text-[12.5px] leading-relaxed text-[#64748b] dark:text-[#d8e0ea]">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Drei Ebenen ── */}
      <section className="industry-section industry-section-soft border-t border-[#e2e8f0] py-24 sm:py-32" style={{ backgroundColor: "#f8fafc" }}>
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <FadeUp>
              <Eyebrow>Systemarchitektur</Eyebrow>
              <h2 className="text-balance font-heading text-[38px] font-normal leading-[0.94] tracking-tight text-[#0f172a] sm:text-[52px] lg:text-[64px]">
                Drei Ebenen.
                <br />
                <span style={{ color: "#64748b" }}>Ein System.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="max-w-lg text-[16px] leading-relaxed text-[#64748b]">
                Industrie-HR bewegt sich auf drei Ebenen gleichzeitig: operativ, sicherheitstechnisch und führungsseitig. Hostpartners deckt alle drei ab — ohne Systemwechsel.
              </p>
            </FadeUp>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px border border-[#e2e8f0] bg-[#e2e8f0] xl:grid-cols-3">
            {layers.map((layer, i) => (
              <FadeUp key={layer.title} delay={i * 0.08}>
                <div
                  className={cn(
                    "h-full px-6 py-8 sm:px-8 sm:py-10",
                    i === 0 && "bg-[#f8fbff] dark:bg-[#1d2530]",
                    i === 1 && "bg-[#f6fbf8] dark:bg-[#1b2723]",
                    i === 2 && "bg-[#faf8ff] dark:bg-[#241f2c]"
                  )}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span className="font-mono text-[10px] font-bold" style={{ color: layer.accent }}>{layer.num}</span>
                    <div className="h-px flex-1" style={{ backgroundColor: `${layer.accent}30` }} />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: layer.accent }}>{layer.subtitle}</p>
                  <p className="mt-2 mb-4 text-[24px] font-semibold leading-tight text-[#0f172a] dark:text-[#f3f7fb]">{layer.title}</p>
                  <p className="mb-6 text-[13.5px] leading-relaxed text-[#64748b] dark:text-[#d8e0ea]">{layer.body}</p>
                  <div className="space-y-2.5 border-t border-[#e2e8f0] pt-5 dark:border-white/10">
                    {layer.points.map(pt => (
                      <div key={pt} className="flex items-start gap-3">
                        <div className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ backgroundColor: layer.accent }} />
                        <p className="text-[12.5px] leading-relaxed text-[#64748b] dark:text-[#d8e0ea]">{pt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leitstand ── */}
      <section className="industry-section border-t border-[#e2e8f0] py-24 sm:py-32" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 xl:grid-cols-2 xl:items-center xl:gap-16">
            <FadeUp>
              <Eyebrow>Leitstand statt Tool-Silos</Eyebrow>
              <h2 className="text-balance font-heading text-[38px] font-normal leading-[0.94] tracking-tight text-[#0f172a] sm:text-[52px] lg:text-[60px]">
                Produktion,
                <br />
                Sicherheit
                <br />
                <span style={{ color: "#64748b" }}>und Führung zusammen.</span>
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[#64748b]">
                Die Industrie-Seite zeigt jetzt nicht mehr nur Tabellen, sondern die eigentliche Führungsrealität: Wo kollidieren Schichten, wo laufen Unterweisungen aus, wo hängen Review-Zyklen hinterher. Genau dafür ist Hostpartners als Leitstand gedacht.
              </p>
              <div className="mt-8 space-y-4">
                {governanceTracks.map((track) => (
                  <div key={track.title} className="flex items-start gap-4 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#e2e8f0] bg-white">
                      <track.icon className="size-4 text-[#64748b]" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#0f172a]">{track.title}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-[#64748b]">{track.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <IndustrieControlTowerCard />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Multi-Standort ── */}
      <section className="border-t border-[#e2e8f0] py-24 sm:py-32" style={{ backgroundColor: "#0f172a" }}>
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 xl:grid-cols-2 xl:items-center xl:gap-16">
            <FadeUp>
              <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#4a5568]">Multi-Standort</p>
              <h2 className="text-balance font-heading text-[38px] font-normal leading-[0.94] tracking-tight text-white sm:text-[52px] lg:text-[60px]">
                Alle Werke.
                <br />
                <span style={{ color: "#475569" }}>Ein Cockpit.</span>
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[#64748b]">
                Mehrere Standorte bedeuten unterschiedliche Schichtmodelle, unterschiedliche Teamstrukturen und unterschiedliche Compliance-Anforderungen. Hostpartners gibt der Zentrale eine einheitliche Übersicht — ohne dass Werke ihre Autonomie verlieren.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Shield,  label: "Standortspezifische Rollen & Sichtbarkeiten",  body: "Jedes Werk sieht nur die eigenen Daten — die Zentrale sieht alles." },
                  { icon: Users,   label: "Einheitliches Onboarding, dezentral ausgerollt", body: "Onboarding-Templates werden zentral gepflegt und lokal angepasst." },
                  { icon: BookOpen, label: "Compliance-Reporting über alle Standorte",     body: "Unterweisungs-Status, offene Schulungen und Audit-Protokolle in einem Report." },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#1e2a3a] bg-[#0d1117]">
                      <item.icon className="size-4 text-[#475569]" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-white">{item.label}</p>
                      <p className="mt-0.5 text-[12.5px] leading-relaxed text-[#64748b]">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <IndustrieStandortCard />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Prozesskette + Apps ── */}
      <section className="industry-section industry-section-soft border-t border-[#1e2a3a] py-24 sm:py-32" style={{ backgroundColor: "#f8fafc" }}>
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            <FadeUp>
              <div className="border border-[#e2e8f0] bg-white p-6 sm:p-8">
                <Eyebrow>Prozesskette</Eyebrow>
                <div className="mt-6">
                  {industry.steps.map((step, i) => (
                    <div key={step.number} className="grid grid-cols-[40px_1fr] gap-4 border-t border-[#e2e8f0] py-5 first:border-t-0 first:pt-0">
                      <div className="flex flex-col items-center gap-2 pt-0.5">
                        <div className="flex size-7 items-center justify-center rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-[10px] font-bold text-[#475569]">
                          {i + 1}
                        </div>
                        {i < industry.steps.length - 1 && <div className="w-px flex-1 bg-[#e2e8f0]" />}
                      </div>
                      <div className="pb-1">
                        <p className="text-[15px] font-semibold text-[#0f172a]">{step.title}</p>
                        <p className="mt-2 text-[13px] leading-relaxed text-[#64748b]">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.08}>
              <div className="border border-[#e2e8f0] bg-white p-6 sm:p-8">
                <Eyebrow>Module für Produktion & Logistik</Eyebrow>
                <div className="mt-4">
                  <ProductRail apps={industry.apps} />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Quote & CTA
// ══════════════════════════════════════════════════════════════════════════════

function QuoteSection({ industry, bgColor }: { industry: IndustryData; bgColor: string }) {
  if (!industry.quote) return null
  return (
    <section className="industry-section industry-section-soft border-t border-border py-24 sm:py-32" style={{ backgroundColor: bgColor }}>
      <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
        <div className="max-w-4xl">
          <Quote className="mb-6 size-10 text-muted-foreground/20" />
          <blockquote className="text-pretty font-heading text-[28px] font-normal leading-[1.14] text-foreground sm:text-[40px] lg:text-[52px]">
            &ldquo;{industry.quote.text}&rdquo;
          </blockquote>
          <div className="mt-8">
            <p className="text-[14px] font-semibold text-foreground">{industry.quote.author}</p>
            <p className="text-[12px] text-muted-foreground">{industry.quote.role}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection({
  industry, bgColor, headline, subline, accountCtaHref, accountCtaLabel,
}: {
  industry: IndustryData
  bgColor: string
  headline: string
  subline: string
  accountCtaHref: string
  accountCtaLabel: string
}) {
  return (
    <section className="industry-section border-t border-border py-24 sm:py-32" style={{ backgroundColor: bgColor }}>
      <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
        <div className="border border-border bg-white px-6 py-14 shadow-[0_24px_70px_rgba(15,23,42,0.05)] sm:px-10 sm:py-16">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-background px-4 py-2">
            <span className="size-2 rounded-full bg-foreground" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Hostpartners für {industry.name}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-3xl text-balance font-heading text-[38px] font-normal leading-[0.94] tracking-tight text-foreground sm:text-[56px] lg:text-[72px]">
                {headline}
                <br />
                <span className="text-muted-foreground/35">{subline}</span>
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
                Lerne in einer persönlichen Demo, wie Hostpartners für {industry.name.toLowerCase()} aufgebaut ist — und welche Module in eurem Setup den größten Hebel schaffen.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/login" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-8 text-[14px] font-semibold text-background transition-opacity hover:opacity-90">
                Demo buchen <ArrowRight className="size-4" />
              </Link>
              <Link href={accountCtaHref} className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-white px-8 text-[14px] font-medium text-muted-foreground transition-colors hover:bg-background">
                {accountCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Root
// ══════════════════════════════════════════════════════════════════════════════

export function IndustryPageClient({
  slug,
  isAuthenticated = false,
}: {
  slug: string
  isAuthenticated?: boolean
}) {
  const industry = INDUSTRIES[slug]
  if (!industry) return null
  const accountCtaHref = isAuthenticated ? "/dashboard" : "/login"
  const accountCtaLabel = isAuthenticated ? "Zu den Apps" : "Anmelden"

  const quoteColor = slug === "hotellerie" ? "#fffcf5" : slug === "gastronomie" ? "#fff8f2" : "#f8fafc"
  const ctaColor   = slug === "hotellerie" ? "#ffffff"  : slug === "gastronomie" ? "#fffaf4" : "#ffffff"

  const ctaHeadline = slug === "hotellerie"
    ? "Mehr Rhythmus im Haus."
    : slug === "gastronomie"
      ? "Mehr Ruhe vor dem Peak."
      : "Mehr Kontrolle im System."
  const ctaSubline = slug === "hotellerie"
    ? "Weniger Reibung zwischen Teams."
    : slug === "gastronomie"
      ? "Weniger Funkverkehr. Klarere Prozesse."
      : "Weniger Brüche zwischen Werk und Zentrale."

  return (
    <div className="marketing-industry-page" data-industry={slug}>
      {slug === "hotellerie"  && <HotelStage      industry={industry} />}
      {slug === "gastronomie" && <GastroStage     industry={industry} />}
      {slug === "industrie"   && <IndustrieStage  industry={industry} />}
      <QuoteSection industry={industry} bgColor={quoteColor} />
      <CTASection
        industry={industry}
        bgColor={ctaColor}
        headline={ctaHeadline}
        subline={ctaSubline}
        accountCtaHref={accountCtaHref}
        accountCtaLabel={accountCtaLabel}
      />
    </div>
  )
}

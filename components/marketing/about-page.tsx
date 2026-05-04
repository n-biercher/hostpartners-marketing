"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  ArrowRight, Users, Shield, Layers, Heart,
  Eye, MessageSquare, Sparkles, Building2,
  ChefHat, Factory, Quote,
} from "lucide-react"
import { cn } from "@/lib/utils"

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px 0px" })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Grain({ opacity = 0.018 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "180px 180px",
      }}
    />
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-muted-foreground/60">
      {children}
    </p>
  )
}

const STATS = [
  { value: "2024",   label: "Gegründet" },
  { value: "12",     label: "Personen" },
  { value: "180+",   label: "Betriebe" },
  { value: "3",      label: "Branchen" },
]

const VALUES = [
  {
    icon: Eye,
    title: "Klarheit vor Komplexität",
    body: "Jede Funktion muss einen klaren Platz im Alltag haben. Wir entscheiden uns konsequent gegen Features, die verwirren statt zu helfen.",
  },
  {
    icon: Shield,
    title: "Sicherheit by Default",
    body: "DSGVO-Konformität und Row-Level Security sind keine Optionen. Sie sind die Grundlage, auf der wir alles andere aufbauen.",
  },
  {
    icon: Heart,
    title: "Menschennähe",
    body: "Software für Menschen, nicht für Prozesse. Jede Designentscheidung stellt die Person in den Mittelpunkt, nicht das System dahinter.",
  },
  {
    icon: Layers,
    title: "Branchentiefe",
    body: "Wir kennen den Unterschied zwischen Hochsaison im Hotel und Werksschicht in der Produktion. Diese Tiefe zeigt sich in jedem Detail.",
  },
  {
    icon: MessageSquare,
    title: "Offenheit",
    body: "Klare Preise, transparente Roadmap, ehrliche Kommunikation über Grenzen. Kein Salessprech, keine versteckten Abhängigkeiten.",
  },
  {
    icon: Sparkles,
    title: "Langfristigkeit",
    body: "Wir bauen nicht für den nächsten Funding-Round. Unsere Kunden sollen über Jahre mit uns wachsen können — stabil, verlässlich, kontinuierlich.",
  },
]

const TEAM = [
  {
    name: "Lukas Berger",
    role: "CEO & Co-Gründer",
    initials: "LB",
    bio: "12 Jahre in der Hospitality-Branche. Hat als Hoteldirektor täglich erlebt, was fehlt.",
  },
  {
    name: "Sophie Maier",
    role: "CTO & Co-Gründerin",
    initials: "SM",
    bio: "Fullstack-Ingenieurin, zuvor Tech-Lead bei einem HR-SaaS-Scale-up.",
  },
  {
    name: "Felix Krämer",
    role: "Head of Product",
    initials: "FK",
    bio: "Ehemaliger HR-Leiter eines mittelständischen Hotelkonzerns mit 400 MA.",
  },
  {
    name: "Anna Schneider",
    role: "Customer Success",
    initials: "AS",
    bio: "Trained hotelier. Bringt die Nutzerperspektive direkt ins Produkt.",
  },
  {
    name: "Jonas Werner",
    role: "Engineering Lead",
    initials: "JW",
    bio: "Backend-Spezialist, Fokus auf PostgreSQL, RLS und skalierbare Infrastruktur.",
  },
  {
    name: "Marie Fischer",
    role: "Design Lead",
    initials: "MF",
    bio: "UX-Designerin mit Hintergrund in Enterprise-Software und komplexen Flows.",
  },
  {
    name: "Tim Richter",
    role: "Sales & Partnerships",
    initials: "TR",
    bio: "Aufbau von Partnernetzwerken in Hotellerie, Gastronomie und Industrie.",
  },
  {
    name: "Laura Bauer",
    role: "Operations",
    initials: "LB",
    bio: "Sorgt dafür, dass alles läuft — intern, mit Kunden, und mit Partnern.",
  },
]

const TIMELINE = [
  {
    year: "2022",
    title: "Die Erkenntnis",
    body: "Lukas und Sophie beobachten dasselbe Problem in zwei verschiedenen Branchen: Wissen, Schichten und Menschen passen nicht zusammen — nicht wegen zu weniger Tools, sondern wegen zu vieler.",
  },
  {
    year: "2023",
    title: "Erste Pilotbetriebe",
    body: "Der erste Prototyp läuft in zwei Betrieben: einem Hotel mit 80 Mitarbeitenden und einer Kantine mit Schichtbetrieb. Feedback wird täglich eingebaut.",
  },
  {
    year: "2024",
    title: "Hostpartners startet",
    body: "Der offizielle Launch. Innerhalb von sechs Monaten vertrauen über 100 Betriebe auf Hostpartners. Das Team wächst auf zwölf Personen.",
  },
  {
    year: "Heute",
    title: "Drei Branchen, ein System",
    body: "180+ Betriebe in Hotellerie, Gastronomie und Industrie nutzen täglich Hostpartners. Die Suite wächst — immer mit demselben Anspruch.",
  },
]

const INDUSTRIES = [
  {
    icon: Building2,
    label: "Hotellerie",
    desc: "Saisonkräfte, Übergaben, Servicetakt. Hostpartners versteht die Eigenheiten des Hotelbetriebs — von der Familienpension bis zum Resort.",
    href: "/industrien/hotellerie",
  },
  {
    icon: ChefHat,
    label: "Gastronomie",
    desc: "Peak-Zeiten, hohe Fluktuation, HACCP-Pflicht. Wir haben die Realität der Gastronomie in Software gegossen, nicht umgekehrt.",
    href: "/industrien/gastronomie",
  },
  {
    icon: Factory,
    label: "Industrie",
    desc: "Wechselschicht, Sicherheitsunterweisungen, standortübergreifende Führung — komplex in der Praxis, handhabbar mit Hostpartners.",
    href: "/industrien/industrie",
  },
]

export function AboutPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background pb-0 pt-24 sm:pt-28 lg:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_58%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_58%)]"
        />
        <Grain />

        <div className="relative mx-auto max-w-screen-xl px-5 sm:px-8">
          {/* Badge */}
          <FadeUp>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/90 px-4 py-2 backdrop-blur-xl">
              <Users className="size-3.5 text-foreground/65" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Über Hostpartners
              </span>
            </div>
          </FadeUp>

          {/* Headline */}
          <FadeUp delay={0.06}>
            <h1 className="max-w-5xl text-balance font-heading text-[46px] font-normal leading-[0.88] tracking-tight text-foreground sm:text-[72px] lg:text-[96px] xl:text-[112px]">
              Software,
              <br />
              die sich nicht
              <br />
              <span className="text-muted-foreground/55">in den Vordergrund drängt.</span>
            </h1>
          </FadeUp>

          {/* Subheadline + CTAs */}
          <FadeUp delay={0.12} className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-xl text-[16px] leading-relaxed text-muted-foreground sm:text-[18px]">
              Hostpartners ist aus einer konkreten Beobachtung entstanden: Zu viele Tools begleiten Betriebe,
              ohne sie wirklich zu verstehen. Wir bauen anders.
            </p>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href="/kontakt"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-7 text-[14px] font-semibold text-background transition-opacity hover:opacity-85"
              >
                Mit uns sprechen <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border/70 bg-card/90 px-7 text-[14px] font-medium text-foreground/80 transition-colors hover:bg-muted/40"
              >
                Demo buchen
              </Link>
            </div>
          </FadeUp>

          {/* Stats strip */}
          <FadeUp delay={0.18} className="mt-16">
            <div className="grid grid-cols-2 divide-x divide-y divide-border/60 rounded-[28px] border border-border/70 bg-card/60 backdrop-blur-xl sm:grid-cols-4 sm:divide-y-0">
              {STATS.map((stat) => (
                <div key={stat.label} className="px-6 py-7 text-center sm:px-8">
                  <p className="font-heading text-[40px] font-normal leading-none tracking-tight text-foreground sm:text-[48px]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[12px] text-muted-foreground/65">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Bottom fade into next section */}
        <div
          aria-hidden
          className="pointer-events-none mt-20 h-24 bg-gradient-to-b from-transparent to-background"
        />
      </section>

      {/* ─── Origin Story ─────────────────────────────────────────────────────── */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <FadeUp>
            <Eyebrow>Wie es anfing</Eyebrow>
            <h2 className="text-balance font-heading text-[36px] font-normal leading-[0.94] tracking-tight text-foreground sm:text-[54px] lg:text-[68px]">
              Nicht zu wenig
              <br />
              Software — zu viel
              <br />
              <span className="text-muted-foreground/55">davon.</span>
            </h2>
            <div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Lukas hat als Hoteldirektor gesehen, wie neue Mitarbeitende wochenlang brauchen, um anzukommen
                — nicht weil sie nicht wollten, sondern weil Wissen, Zuständigkeiten und Abläufe über fünf
                verschiedene Systeme verteilt waren.
              </p>
              <p>
                Sophie hat auf der anderen Seite gesehen, wie HR-Software meistens für große Konzerne gebaut
                wird — zu abstrakt, zu sperrig, zu weit weg vom echten Betriebsalltag.
              </p>
              <p>
                Aus dieser Erkenntnis entstand eine einfache Frage: Was wäre, wenn ein System die Realität
                des Betriebs wirklich kennt — und sich danach richtet, statt umgekehrt?
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── Large Quote ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-muted/20 py-16 sm:py-24 dark:bg-muted/10">
        <Grain opacity={0.012} />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
          <FadeUp>
            <div className="rounded-[32px] border border-border/70 bg-card/92 px-7 py-9 shadow-[0_18px_60px_rgba(15,23,42,0.07)] backdrop-blur-xl sm:rounded-[40px] sm:px-12 sm:py-12">
              <Quote className="size-8 text-foreground/18" />
              <p className="mt-5 font-heading text-[26px] font-normal leading-[1.08] tracking-tight text-foreground sm:text-[38px] lg:text-[50px]">
                Gute Software sollte nicht zwischen Menschen und Betrieb stehen.
                Sie sollte beide näher zusammenbringen.
              </p>
              <p className="mt-7 text-[13px] text-muted-foreground/60">
                — Lukas Berger, CEO & Co-Gründer
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── Timeline ─────────────────────────────────────────────────────────── */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
          <FadeUp className="mb-14">
            <Eyebrow>Von der Idee zum Produkt</Eyebrow>
            <h2 className="text-balance font-heading text-[36px] font-normal leading-[0.94] tracking-tight text-foreground sm:text-[52px] lg:text-[64px]">
              Wie Hostpartners
              <br />
              <span className="text-muted-foreground/55">gewachsen ist.</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((item, i) => (
              <FadeUp key={item.year} delay={i * 0.07}>
                <div className={cn(
                  "relative border-border/60 px-0 pb-10 pr-6 pt-0 sm:pb-0 sm:pr-10",
                  i < TIMELINE.length - 1 && "border-b sm:border-b-0 sm:border-r"
                )}>
                  {i > 0 && (
                    <div className="absolute -left-px top-0 hidden h-3 w-px bg-border/60 sm:block" />
                  )}
                  <p className="mb-3 font-heading text-[42px] font-normal leading-none tracking-tight text-foreground/14 sm:text-[52px]">
                    {item.year}
                  </p>
                  <p className="mb-2 text-[14px] font-semibold text-foreground">{item.title}</p>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Values ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-muted/20 py-20 sm:py-28 dark:bg-muted/10">
        <Grain opacity={0.012} />
        <div className="relative mx-auto max-w-screen-xl px-5 sm:px-8">
          <FadeUp className="mb-14 max-w-2xl">
            <Eyebrow>Was uns antreibt</Eyebrow>
            <h2 className="text-balance font-heading text-[36px] font-normal leading-[0.94] tracking-tight text-foreground sm:text-[52px] lg:text-[64px]">
              Sechs Dinge,
              <br />
              die wir jeden Tag
              <br />
              <span className="text-muted-foreground/55">nicht vergessen.</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value, i) => {
              const Icon = value.icon
              return (
                <FadeUp key={value.title} delay={i * 0.06}>
                  <div className="h-full rounded-[28px] border border-border/70 bg-card/90 p-7 backdrop-blur-sm">
                    <div className="mb-5 flex size-11 items-center justify-center rounded-2xl border border-border/70 bg-background">
                      <Icon className="size-5 text-foreground/70" />
                    </div>
                    <p className="mb-2 text-[15px] font-semibold text-foreground">{value.title}</p>
                    <p className="text-[13px] leading-relaxed text-muted-foreground">{value.body}</p>
                  </div>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Team ─────────────────────────────────────────────────────────────── */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
          <FadeUp className="mb-14 max-w-2xl">
            <Eyebrow>Das Team</Eyebrow>
            <h2 className="text-balance font-heading text-[36px] font-normal leading-[0.94] tracking-tight text-foreground sm:text-[52px] lg:text-[64px]">
              Kleine Crew.
              <br />
              <span className="text-muted-foreground/55">Klarer Fokus.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Wir sind zwölf Personen mit Hintergrund in Hotellerie, HR und Engineering.
              Groß genug, um schnell zu sein. Klein genug, um nah an unseren Kunden zu bleiben.
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {TEAM.map((member, i) => (
              <FadeUp key={member.name + member.role} delay={i * 0.05}>
                <div className="rounded-[24px] border border-border/70 bg-card/80 p-5">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-border/70 bg-background">
                    <span className="text-[13px] font-semibold tracking-tight text-foreground/70">
                      {member.initials}
                    </span>
                  </div>
                  <p className="text-[14px] font-semibold text-foreground leading-snug">{member.name}</p>
                  <p className="mt-0.5 text-[12px] font-medium text-muted-foreground/60">{member.role}</p>
                  <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground/70">{member.bio}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Industries ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-muted/20 py-20 sm:py-28 dark:bg-muted/10">
        <Grain opacity={0.012} />
        <div className="relative mx-auto max-w-screen-xl px-5 sm:px-8">
          <FadeUp className="mb-14 max-w-2xl">
            <Eyebrow>Für wen wir bauen</Eyebrow>
            <h2 className="text-balance font-heading text-[36px] font-normal leading-[0.94] tracking-tight text-foreground sm:text-[52px] lg:text-[64px]">
              Drei Branchen,
              <br />
              <span className="text-muted-foreground/55">eine Plattform.</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {INDUSTRIES.map((ind, i) => {
              const Icon = ind.icon
              return (
                <FadeUp key={ind.label} delay={i * 0.08}>
                  <Link
                    href={ind.href}
                    className="group flex h-full flex-col rounded-[28px] border border-border/70 bg-card/90 p-7 transition-colors hover:bg-card backdrop-blur-sm"
                  >
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-border/70 bg-background">
                      <Icon className="size-5 text-foreground/70" />
                    </div>
                    <p className="mb-2 text-[17px] font-semibold text-foreground">{ind.label}</p>
                    <p className="flex-1 text-[13px] leading-relaxed text-muted-foreground">{ind.desc}</p>
                    <div className="mt-6 flex items-center gap-1.5 text-[12px] font-semibold text-foreground/60 transition-colors group-hover:text-foreground">
                      Mehr erfahren <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Jobs / Join us ───────────────────────────────────────────────────── */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <FadeUp>
            <Eyebrow>Werde Teil des Teams</Eyebrow>
            <h2 className="text-balance font-heading text-[36px] font-normal leading-[0.94] tracking-tight text-foreground sm:text-[52px] lg:text-[64px]">
              Wir wachsen.
              <br />
              <span className="text-muted-foreground/55">Du auch?</span>
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Wir suchen Menschen, die echte Probleme lieben und kein Interesse an Feature-Factories haben.
              Remote-first, Deutschland, Vollzeit.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kontakt"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-7 text-[14px] font-semibold text-background transition-opacity hover:opacity-85"
              >
                Initiativ bewerben <ArrowRight className="size-4" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── Final CTA ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-foreground pb-24 pt-20 sm:pb-32 sm:pt-24">
        <Grain opacity={0.025} />
        <div className="relative mx-auto max-w-screen-xl px-5 sm:px-8">
          <FadeUp>
            <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-white/40">
              Bereit starten?
            </p>
            <h2 className="max-w-3xl text-balance font-heading text-[36px] font-normal leading-[0.94] tracking-tight text-white sm:text-[54px] lg:text-[72px]">
              Zeig uns deinen Betrieb.
              <br />
              <span className="text-white/45">Wir zeigen dir, was möglich ist.</span>
            </h2>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kontakt"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-[14px] font-semibold text-foreground transition-opacity hover:opacity-90"
              >
                Demo buchen <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-[14px] font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                Kostenlos testen
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}

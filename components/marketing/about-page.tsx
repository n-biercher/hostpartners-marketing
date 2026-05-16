"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import {
  motion, useInView, useScroll, useTransform,
  useMotionValue, useSpring, AnimatePresence,
} from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Utilities ─────────────────────────────────────────────────────────────────

function useInViewOnce(margin = "-80px") {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: margin as any })
  return { ref, inView }
}

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

// ─── Data ──────────────────────────────────────────────────────────────────────

const VALUES = [
  { num: "01", title: "Klarheit vor Komplexität",   body: "Jede Funktion braucht einen klaren Platz im Alltag. Wir entscheiden uns konsequent gegen Features, die verwirren statt zu helfen." },
  { num: "02", title: "Sicherheit by Default",       body: "DSGVO-Konformität und Row-Level Security sind keine Optionen. Sie sind die Grundlage, auf der alles andere aufbaut." },
  { num: "03", title: "Menschennähe",               body: "Software für Menschen, nicht für Prozesse. Jede Designentscheidung stellt die Person in den Mittelpunkt." },
  { num: "04", title: "Branchentiefe",               body: "Wir kennen den Unterschied zwischen Hochsaison im Hotel und Werksschicht in der Produktion. Diese Tiefe zeigt sich in jedem Detail." },
  { num: "05", title: "Offenheit",                   body: "Klare Preise, transparente Roadmap, ehrliche Kommunikation. Kein Salessprech, keine versteckten Abhängigkeiten." },
  { num: "06", title: "Langfristigkeit",             body: "Wir bauen nicht für den nächsten Funding-Round. Unsere Kunden sollen über Jahre mit uns wachsen können." },
]

const TEAM = [
  { name: "Lukas Berger",    role: "CEO & Co-Gründer",    initials: "LB", color: "bg-slate-700",   bio: "12 Jahre Hospitality. Als Hoteldirektor täglich erlebt, was fehlt." },
  { name: "Sophie Maier",    role: "CTO & Co-Gründerin",   initials: "SM", color: "bg-violet-600",  bio: "Fullstack-Ingenieurin. Zuvor Tech-Lead bei einem HR-SaaS-Scale-up." },
  { name: "Felix Krämer",    role: "Head of Product",      initials: "FK", color: "bg-blue-600",    bio: "Ehem. HR-Leiter eines Hotelkonzerns mit 400 MA. Versteht beide Seiten." },
  { name: "Anna Schneider",  role: "Customer Success",     initials: "AS", color: "bg-emerald-600", bio: "Trained hotelier. Bringt die Nutzerperspektive direkt ins Produkt." },
  { name: "Jonas Werner",    role: "Engineering Lead",     initials: "JW", color: "bg-orange-500",  bio: "Backend-Spezialist, Fokus auf PostgreSQL, RLS und skalierbare Infra." },
  { name: "Marie Fischer",   role: "Design Lead",          initials: "MF", color: "bg-rose-600",    bio: "UX-Designerin mit Hintergrund in Enterprise-Software." },
  { name: "Tim Richter",     role: "Sales & Partnerships", initials: "TR", color: "bg-sky-600",     bio: "Aufbau von Partnernetzwerken in Hotel, Gastro und Industrie." },
  { name: "Laura Bauer",     role: "Operations",           initials: "LB", color: "bg-teal-600",    bio: "Sorgt dafür, dass intern, mit Kunden und mit Partnern alles läuft." },
]

const TIMELINE = [
  {
    year: "2022",
    title: "Die Erkenntnis",
    body: "Lukas und Sophie beobachten dasselbe Problem in zwei Branchen: zu viele Tools, zu wenig System. Der Entschluss, es anders zu machen.",
    accent: "#8b5cf6",
  },
  {
    year: "2023",
    title: "Erster Pilot",
    body: "Zwei Betriebe, ein Prototyp. Ein Hotel mit 80 MA, eine Kantine mit Schichtbetrieb. Feedback wird täglich eingebaut.",
    accent: "#3b82f6",
  },
  {
    year: "2024",
    title: "Launch",
    body: "Offizieller Start. Innerhalb von sechs Monaten vertrauen über 100 Betriebe auf Hostpartners. Das Team wächst auf zwölf Personen.",
    accent: "#10b981",
  },
  {
    year: "Heute",
    title: "Drei Branchen",
    body: "180+ Betriebe in Hotellerie, Gastronomie und Industrie. Die Suite wächst — immer mit demselben Anspruch.",
    accent: "#f97316",
  },
]

const STATS = [
  { value: "180+", label: "Betriebe aktiv",     sub: "Hotel, Gastro, Industrie" },
  { value: "12",   label: "Personen im Team",   sub: "Remote-first, Deutschland" },
  { value: "2024", label: "Gegründet",          sub: "Berlin, Deutschland" },
  { value: "9",    label: "Apps in der Suite",  sub: "Immer modular buchbar" },
]

// ─── Marquee ticker ────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  "Klarheit", "·", "Sicherheit", "·", "Menschennähe", "·", "Branchentiefe",
  "·", "Offenheit", "·", "Langfristigkeit", "·", "Hostpartners",
]

function Ticker() {
  return (
    <div className="overflow-hidden py-5 border-y border-border">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span
            key={i}
            className={cn(
              "text-[11px] font-mono tracking-[0.25em] uppercase shrink-0",
              item === "·" ? "text-muted-foreground/20" : "text-muted-foreground/40"
            )}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 20, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 20, damping: 20 })

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.04)
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.04)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouse}
      className="relative min-h-[100svh] overflow-hidden bg-background flex flex-col"
    >
      <Grain opacity={0.025} />

      {/* Ambient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse at 15% 85%, rgba(139,92,246,0.06) 0%, transparent 50%)",
            "radial-gradient(ellipse at 85% 20%, rgba(59,130,246,0.04) 0%, transparent 50%)",
            "radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.025) 0%, transparent 65%)",
          ].join(", "),
        }}
      />

      {/* Floating mouse glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full"
        style={{
          left: "50%",
          top: "40%",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 65%)",
        }}
      />

      <motion.div
        style={{ opacity }}
        className="relative flex-1 flex flex-col justify-center mx-auto max-w-screen-xl px-5 sm:px-8 pt-28 pb-16 w-full"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-[10.5px] font-mono font-semibold uppercase tracking-[0.28em] text-muted-foreground/40"
        >
          Über Hostpartners
        </motion.p>

        {/* Headline — staggered lines */}
        <div className="mb-12 overflow-hidden">
          {[
            { text: "Software, die sich", style: "font-semibold text-foreground" },
            { text: "nicht aufdrängt.", style: "font-heading font-normal italic text-muted-foreground/45" },
          ].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "text-[52px] sm:text-[80px] lg:text-[104px] xl:text-[124px] leading-[0.92] tracking-tight",
                  line.style
                )}
              >
                {line.text}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Sub + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-8 sm:items-end sm:justify-between max-w-4xl"
        >
          <p className="text-[15px] sm:text-[17px] text-muted-foreground leading-relaxed max-w-lg">
            Hostpartners ist aus einer konkreten Beobachtung entstanden:
            Zu viele Tools begleiten Betriebe, ohne sie wirklich zu verstehen. Wir bauen anders.
          </p>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-foreground text-background text-[13px] font-semibold hover:opacity-85 transition-opacity"
            >
              Gespräch buchen <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center h-11 px-6 rounded-full border border-border text-muted-foreground text-[13px] font-medium hover:bg-muted/30 hover:text-foreground transition-all"
            >
              Demo
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative border-t border-border"
      >
        <div className="mx-auto max-w-screen-xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-border">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-6 py-6 sm:px-8 sm:py-8">
                <p className="font-heading text-[44px] sm:text-[52px] font-normal leading-none tracking-tight text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-[12px] font-semibold text-foreground/60 mb-0.5">{stat.label}</p>
                <p className="text-[11px] text-muted-foreground/40">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Origin story ──────────────────────────────────────────────────────────────

function OriginSection() {
  const { ref, inView } = useInViewOnce("-60px 0px")

  return (
    <section className="py-28 sm:py-40 bg-background border-t border-border relative overflow-hidden">
      <Grain opacity={0.018} />
      <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0">
          {/* Left: headline */}
          <div className="lg:pr-16 pb-12 lg:pb-0">
            <motion.p
              ref={ref}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="mb-6 text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-muted-foreground/40"
            >
              Wie es anfing
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-[42px] sm:text-[60px] lg:text-[72px] font-normal leading-[0.9] tracking-tight text-foreground"
            >
              Nicht zu wenig
              <br />
              Software —{" "}
              <span className="text-muted-foreground/35 italic">zu viel davon.</span>
            </motion.h2>
          </div>

          {/* Divider */}
          <div className="hidden lg:block bg-border" />

          {/* Right: text */}
          <div className="lg:pl-16 space-y-5">
            {[
              "Lukas hat als Hoteldirektor gesehen, wie neue Mitarbeitende wochenlang brauchen, um anzukommen — nicht weil sie nicht wollten, sondern weil Wissen, Zuständigkeiten und Abläufe über fünf verschiedene Systeme verteilt waren.",
              "Sophie hat auf der anderen Seite gesehen, wie HR-Software meistens für große Konzerne gebaut wird — zu abstrakt, zu sperrig, zu weit weg vom echten Betriebsalltag.",
              "Aus dieser Erkenntnis entstand eine einfache Frage: Was wäre, wenn ein System die Realität des Betriebs wirklich kennt — und sich danach richtet, statt umgekehrt?",
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.12 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[15px] sm:text-[16px] leading-relaxed text-muted-foreground"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Large quote ───────────────────────────────────────────────────────────────

function QuoteSection() {
  const { ref, inView } = useInViewOnce("-80px 0px")

  return (
    <section className="relative overflow-hidden bg-foreground py-24 sm:py-36">
      <Grain opacity={0.028} />

      {/* Oversized decorative quote mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 -translate-x-1/4 -translate-y-1/4 select-none text-[320px] sm:text-[480px] font-heading leading-none text-white/[0.025] font-normal"
      >
        &ldquo;
      </div>

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-[28px] sm:text-[42px] lg:text-[54px] font-normal leading-[1.05] tracking-tight text-white"
        >
          Gute Software sollte nicht zwischen Menschen und Betrieb stehen.
          Sie sollte beide näher{" "}
          <span className="text-white/40 italic">zusammenbringen.</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 text-[12px] font-mono uppercase tracking-[0.22em] text-white/30"
        >
          Lukas Berger, CEO & Co-Gründer
        </motion.p>
      </div>
    </section>
  )
}

// ─── Timeline ──────────────────────────────────────────────────────────────────

function TimelineSection() {
  const { ref, inView } = useInViewOnce("-60px 0px")

  return (
    <section className="py-28 sm:py-40 bg-background border-t border-border relative overflow-hidden">
      <Grain opacity={0.018} />
      <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="mb-4 text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-muted-foreground/40">
            Von der Idee zum Produkt
          </p>
          <h2 className="font-heading text-[40px] sm:text-[60px] lg:text-[72px] font-normal leading-[0.9] tracking-tight text-foreground">
            Wie Hostpartners{" "}
            <span className="text-muted-foreground/35 italic">gewachsen ist.</span>
          </h2>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:grid md:grid-cols-4 gap-0 relative">
          {/* Connector line */}
          <div className="absolute top-[22px] left-8 right-8 h-px bg-border" aria-hidden />

          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="pr-10 relative"
            >
              {/* Dot */}
              <div
                className="size-[18px] rounded-full border-2 border-border bg-background mb-7 relative z-10 flex items-center justify-center"
              >
                <div className="size-2 rounded-full" style={{ background: item.accent }} />
              </div>

              <p
                className="font-heading text-[56px] font-normal leading-none tracking-tight mb-4 opacity-10"
                style={{ color: item.accent }}
              >
                {item.year}
              </p>
              <p className="text-[15px] font-semibold text-foreground mb-2">{item.title}</p>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{item.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-8">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              className="flex gap-5"
            >
              <div className="flex flex-col items-center">
                <div className="size-4 rounded-full border-2 border-border flex items-center justify-center shrink-0 mt-0.5">
                  <div className="size-1.5 rounded-full" style={{ background: item.accent }} />
                </div>
                {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
              </div>
              <div className="pb-8">
                <p className="font-heading text-[32px] font-normal leading-none tracking-tight mb-2 opacity-15"
                  style={{ color: item.accent }}>{item.year}</p>
                <p className="text-[15px] font-semibold text-foreground mb-1">{item.title}</p>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Values ────────────────────────────────────────────────────────────────────

function ValuesSection() {
  const { ref, inView } = useInViewOnce("-60px 0px")
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="relative py-28 sm:py-40 bg-muted/20 border-t border-border overflow-hidden">
      <Grain opacity={0.02} />
      <div className="relative mx-auto max-w-screen-xl px-5 sm:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 sm:mb-24"
        >
          <p className="mb-4 text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-muted-foreground/40">
            Was uns antreibt
          </p>
          <h2 className="font-heading text-[40px] sm:text-[60px] lg:text-[72px] font-normal leading-[0.9] tracking-tight text-foreground max-w-3xl">
            Sechs Dinge, die wir jeden Tag{" "}
            <span className="text-muted-foreground/35 italic">nicht vergessen.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-border">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.num}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.06 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative border-r border-b border-border p-7 sm:p-9 transition-colors duration-300 group"
              style={{ background: hovered === i ? "rgba(0,0,0,0.02)" : "transparent" }}
            >
              <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-muted-foreground/30 mb-6">
                {value.num}
              </p>
              <p className="text-[16px] font-semibold text-foreground mb-3 leading-snug">
                {value.title}
              </p>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{value.body}</p>

              {/* Hover accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-foreground"
                initial={{ width: "0%" }}
                animate={{ width: hovered === i ? "100%" : "0%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Team ─────────────────────────────────────────────────────────────────────

function TeamSection() {
  const { ref, inView } = useInViewOnce("-60px 0px")
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="py-28 sm:py-40 bg-background border-t border-border relative overflow-hidden">
      <Grain opacity={0.018} />
      <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-16 sm:mb-24">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-4 text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-muted-foreground/40">
              Das Team
            </p>
            <h2 className="font-heading text-[40px] sm:text-[60px] lg:text-[72px] font-normal leading-[0.9] tracking-tight text-foreground">
              Kleine Crew.{" "}
              <span className="text-muted-foreground/35 italic">Klarer Fokus.</span>
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              Zwölf Personen mit Hintergrund in Hotellerie, HR und Engineering. Groß genug, um schnell zu sein. Klein genug, um nah an unseren Kunden zu bleiben.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name + member.role}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.06 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all duration-300 cursor-default"
              style={{
                boxShadow: active === i ? "0 8px 30px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {/* Avatar */}
              <div
                className={cn(
                  "size-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300",
                  member.color,
                  active === i && "scale-110"
                )}
              >
                <span className="text-[14px] font-bold text-white tracking-tight">
                  {member.initials}
                </span>
              </div>

              <p className="text-[14px] font-semibold text-foreground leading-snug mb-0.5">
                {member.name}
              </p>
              <p className="text-[11px] font-medium text-muted-foreground/55 mb-3">
                {member.role}
              </p>

              {/* Bio — slides in on hover */}
              <AnimatePresence>
                {active === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-[12px] leading-relaxed text-muted-foreground overflow-hidden"
                  >
                    {member.bio}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Join us ───────────────────────────────────────────────────────────────────

function JoinSection() {
  const { ref, inView } = useInViewOnce("-60px 0px")

  return (
    <section className="relative py-28 sm:py-40 bg-muted/20 border-t border-border overflow-hidden">
      <Grain opacity={0.02} />
      <div className="relative mx-auto max-w-screen-xl px-5 sm:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-muted-foreground/40">
            Werde Teil des Teams
          </p>
          <h2 className="font-heading text-[40px] sm:text-[60px] lg:text-[72px] font-normal leading-[0.9] tracking-tight text-foreground mb-6">
            Wir wachsen.{" "}
            <span className="text-muted-foreground/35 italic">Du auch?</span>
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground mb-10 max-w-xl">
            Wir suchen Menschen, die echte Probleme lieben und kein Interesse an Feature-Factories haben.
            Remote-first, Deutschland, Vollzeit.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-foreground text-background text-[14px] font-semibold hover:opacity-85 transition-opacity"
          >
            Initiativ bewerben <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  const { ref, inView } = useInViewOnce("-80px 0px")

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-36 sm:py-52">
      <Grain opacity={0.022} />

      {/* Radial glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2.5, delay: 0.3 }}
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 110%, rgba(139,92,246,0.08) 0%, transparent 55%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent)" }}
      />

      <div className="relative mx-auto max-w-screen-xl px-5 sm:px-8 text-center">
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 text-[10.5px] font-mono font-semibold uppercase tracking-[0.28em] text-muted-foreground/35"
        >
          Bereit starten?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[44px] sm:text-[74px] lg:text-[100px] font-semibold leading-[0.93] tracking-tight text-foreground mb-4 text-balance"
        >
          Zeig uns deinen Betrieb.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-heading font-normal italic text-[44px] sm:text-[74px] lg:text-[100px] leading-[0.93] tracking-tight text-muted-foreground/35 mb-14"
        >
          Wir zeigen dir, was möglich ist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-foreground text-background text-[14px] font-semibold hover:opacity-90 transition-opacity"
          >
            Demo buchen <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center h-12 px-8 rounded-full border border-border text-muted-foreground text-[14px] font-medium hover:bg-muted/30 hover:text-foreground transition-all"
          >
            Kostenlos testen
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function AboutPage() {
  return (
    <>
      <HeroSection />
      <Ticker />
      <OriginSection />
      <QuoteSection />
      <TimelineSection />
      <ValuesSection />
      <TeamSection />
      <JoinSection />
      <FinalCTA />
    </>
  )
}

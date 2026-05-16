"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  ArrowRight, CalendarDays, Mail, Phone,
  Check, Clock, MessageSquare, Zap,
  Building2, ChefHat, Factory,
} from "lucide-react"
import { cn } from "@/lib/utils"

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

// ─── Hero ──────────────────────────────────────────────────────────────────────

function ContactHero() {
  return (
    <section className="relative pt-36 pb-20 overflow-hidden bg-background">
      <Grain opacity={0.025} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-foreground/[0.025] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-muted/40 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-8"
          >
            <MessageSquare className="size-3" />
            Vertrieb
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[0.92] mb-6"
          >
            Sprecht mit uns.
            <br />
            <span className="text-muted-foreground">Kein Standardskript.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-lg text-muted-foreground max-w-lg leading-relaxed mb-10"
          >
            Ein gutes Erstgespräch klärt, ob Hostpartners für euren Betrieb
            gerade Sinn ergibt — ehrlich und ohne Zeitdruck.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-foreground text-background text-[13px] font-semibold hover:opacity-85 transition-opacity"
            >
              Demo buchen <ArrowRight className="size-4" />
            </Link>
            <Link
              href="mailto:vertrieb@hostpartners.com"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-border text-foreground text-[13px] font-medium hover:bg-muted/40 transition-colors"
            >
              <Mail className="size-4" />
              vertrieb@hostpartners.com
            </Link>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-16 pt-10 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          {[
            { val: "< 24h", label: "Antwortzeit" },
            { val: "30 min", label: "Erstgespräch" },
            { val: "14 Tage", label: "Kostenloser Test" },
            { val: "0 €", label: "Einrichtungsgebühren" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-black text-foreground tabular-nums">{s.val}</div>
              <div className="text-[13px] text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Contact channels ─────────────────────────────────────────────────────────

function ContactChannels() {
  const { ref, inView } = useInViewOnce("-60px 0px")

  const channels = [
    {
      icon: CalendarDays,
      eyebrow: "Empfohlen",
      title: "Demo buchen",
      desc: "30 Minuten, kein Skript. Wir hören zuerst zu — erst dann zeigen wir, was Hostpartners kann und ob es passt.",
      cta: "Termin anfragen",
      href: "/demo",
      accent: true,
      bullets: [
        "Persönliche Einordnung eurer Situation",
        "Keine versteckten Vertriebsziele",
        "Direkt mit dem Produktteam",
      ],
    },
    {
      icon: Mail,
      eyebrow: "Schriftlich",
      title: "E-Mail schreiben",
      desc: "Ideal, wenn ihr schon konkrete Fragen zu Preisen, Rollout oder technischer Integration habt.",
      cta: "vertrieb@hostpartners.com",
      href: "mailto:vertrieb@hostpartners.com",
      accent: false,
      bullets: [
        "Antwort innerhalb von 24 Stunden",
        "Direkt ans Vertriebsteam",
        "Für komplexere Anfragen",
      ],
    },
    {
      icon: Phone,
      eyebrow: "Sofort",
      title: "Direkt anrufen",
      desc: "Wenn es schnell gehen soll oder ihr lieber mit einem Menschen als mit einem Formular anfangt.",
      cta: "+49 30 5487 1290",
      href: "tel:+493054871290",
      accent: false,
      bullets: [
        "Mo–Fr, 9–18 Uhr",
        "Keine Warteschleife",
        "Auf Deutsch & Englisch",
      ],
    },
  ]

  return (
    <section ref={ref} className="py-24 bg-muted/20 border-t border-border">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3">Kontaktwege</p>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">Wie möchtet ihr starten?</h2>
          <p className="text-muted-foreground mt-3 text-[15px] max-w-sm mx-auto">
            Kein bevorzugter Weg — wählt, was zu eurer Lage passt.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {channels.map((ch, i) => (
            <motion.div
              key={ch.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative flex flex-col rounded-2xl border p-7",
                ch.accent
                  ? "border-foreground bg-foreground shadow-2xl shadow-foreground/15"
                  : "border-border bg-background hover:shadow-md transition-shadow"
              )}
            >
              {ch.accent && (
                <div className="absolute -top-3 left-7">
                  <div className="px-3 py-1 rounded-full bg-background text-foreground text-[10px] font-bold uppercase tracking-widest border border-border shadow-sm">
                    Empfohlen
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className={cn(
                "size-12 rounded-xl flex items-center justify-center mb-5 border",
                ch.accent
                  ? "bg-background/10 border-background/20"
                  : "bg-muted border-border"
              )}>
                <ch.icon className={cn("size-5", ch.accent ? "text-background" : "text-foreground")} />
              </div>

              {/* Eyebrow */}
              <p className={cn("text-[10px] font-semibold uppercase tracking-widest mb-2", ch.accent ? "text-background/40" : "text-muted-foreground/50")}>
                {ch.eyebrow}
              </p>

              {/* Title + desc */}
              <h3 className={cn("text-[22px] font-black mb-3 leading-tight", ch.accent ? "text-background" : "text-foreground")}>
                {ch.title}
              </h3>
              <p className={cn("text-[13px] leading-relaxed mb-6 flex-1", ch.accent ? "text-background/60" : "text-muted-foreground")}>
                {ch.desc}
              </p>

              {/* Bullets */}
              <ul className="space-y-2 mb-7">
                {ch.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-[12.5px]">
                    <Check className={cn("size-3.5 shrink-0", ch.accent ? "text-background/60" : "text-emerald-500")} />
                    <span className={ch.accent ? "text-background/70" : "text-muted-foreground"}>{b}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={ch.href}
                className={cn(
                  "flex items-center justify-center gap-2 h-11 rounded-xl text-[13px] font-semibold transition-all",
                  ch.accent
                    ? "bg-background text-foreground hover:opacity-90"
                    : "bg-foreground text-background hover:opacity-85"
                )}
              >
                {ch.cta} <ArrowRight className="size-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Process / What to expect ─────────────────────────────────────────────────

function ProcessSection() {
  const { ref, inView } = useInViewOnce()

  const steps = [
    {
      num: "01",
      title: "Termin anfragen",
      desc: "Über das Demo-Formular oder per E-Mail. Ihr bekommt innerhalb von 24h eine Bestätigung.",
    },
    {
      num: "02",
      title: "30-Minuten-Gespräch",
      desc: "Kein Pitch, kein Skript. Wir hören zu, stellen Fragen zu eurem Alltag und eurer größten Reibung.",
    },
    {
      num: "03",
      title: "Ehrliche Einordnung",
      desc: "Am Ende des Gesprächs sagt ihr beiden: passt es gerade oder nicht? Kein Druck, kein Follow-up-Karussell.",
    },
    {
      num: "04",
      title: "14 Tage kostenlos testen",
      desc: "Wenn es passt, richten wir einen Testzugang ein — vollständig, ohne Kreditkarte, ohne Risiko.",
    },
  ]

  return (
    <section ref={ref} className="py-24 bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4">Wie es abläuft</p>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground leading-[0.93] mb-6">
              Kein Tunnel.
              <br />
              Nur klare Schritte.
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed max-w-md">
              Von der ersten Nachricht bis zum ersten echten Nutzen — so sieht unser Prozess aus.
              Schnell, transparent, ohne versteckte Zwischenschritte.
            </p>

            <div className="mt-10 flex flex-wrap gap-6">
              {[
                { icon: Clock,   label: "< 24h Antwortzeit" },
                { icon: Zap,     label: "Sofortiger Testzugang" },
                { icon: Check,   label: "Keine Vertragsbindung" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
                  <div className="size-7 rounded-lg bg-muted border border-border flex items-center justify-center">
                    <item.icon className="size-3.5 text-foreground" />
                  </div>
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: steps */}
          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-5 py-6 border-b border-border last:border-0"
              >
                <div className="shrink-0 mt-0.5">
                  <div className="size-8 rounded-full border border-border bg-muted flex items-center justify-center">
                    <span className="text-[11px] font-black text-muted-foreground">{step.num}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── For whom ─────────────────────────────────────────────────────────────────

function ForWhomSection() {
  const { ref, inView } = useInViewOnce()

  const industries = [
    {
      icon: Building2,
      title: "Hotellerie",
      desc: "Hotels, Resorts & Pensionen die Onboarding, Schichtplanung und Wissensmanagement endlich vereinen wollen.",
      href: "/industrien/hotellerie",
    },
    {
      icon: ChefHat,
      title: "Gastronomie",
      desc: "Restaurants, Cafés & Catering-Betriebe mit hohem Personalwechsel und Bedarf an strukturierten Prozessen.",
      href: "/industrien/gastronomie",
    },
    {
      icon: Factory,
      title: "Industrie",
      desc: "Produktions- und Fertigungsbetriebe die Compliance, Schulungen und HR-Stammdaten zentral bündeln.",
      href: "/industrien/industrie",
    },
  ]

  return (
    <section ref={ref} className="py-24 bg-muted/20 border-t border-border">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3">Für wen</p>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">Hostpartners passt zu euch, wenn…</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link
                href={ind.href}
                className="group flex flex-col gap-4 p-7 rounded-2xl border border-border bg-background hover:shadow-md transition-all hover:border-foreground/20"
              >
                <div className="size-12 rounded-xl bg-muted border border-border flex items-center justify-center group-hover:bg-foreground/5 transition-colors">
                  <ind.icon className="size-5 text-foreground" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-foreground mb-2">{ind.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{ind.desc}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[12px] font-semibold text-foreground mt-auto">
                  Mehr erfahren <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ─────────────────────────────────────────────────────────────────

function ContactCTA() {
  return (
    <section className="py-24 bg-foreground relative overflow-hidden">
      <Grain opacity={0.04} />
      <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-black text-background leading-[0.93] mb-4">
              Bereit für ein
              <br />
              ehrliches Gespräch?
            </h2>
            <p className="text-background/50 text-[15px] leading-relaxed max-w-md">
              Kein Vertriebsdruck, kein Karussell. Nur eine klare Einordnung,
              ob Hostpartners für euren Betrieb gerade der richtige Schritt ist.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            <Link
              href="/demo"
              className="flex items-center justify-between h-16 px-6 rounded-2xl bg-background text-foreground text-[14px] font-semibold hover:opacity-90 transition-opacity group"
            >
              <span>Demo buchen</span>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-muted-foreground font-normal">30 Minuten</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
            <Link
              href="mailto:vertrieb@hostpartners.com"
              className="flex items-center justify-between h-16 px-6 rounded-2xl border border-background/15 text-background text-[14px] font-semibold hover:bg-background/10 transition-colors group"
            >
              <span>vertrieb@hostpartners.com</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="tel:+493054871290"
              className="flex items-center justify-between h-16 px-6 rounded-2xl border border-background/15 text-background text-[14px] font-semibold hover:bg-background/10 transition-colors group"
            >
              <span>+49 30 5487 1290</span>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-background/40 font-normal">Mo–Fr 9–18</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────────

export function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactChannels />
      <ProcessSection />
      <ForWhomSection />
      <ContactCTA />
    </>
  )
}

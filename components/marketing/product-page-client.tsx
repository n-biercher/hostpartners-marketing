"use client"

import React, { useRef, useState, useEffect } from "react"
import Link from "next/link"
import {
  motion, useInView, useScroll, useTransform,
  useMotionValue, useSpring, AnimatePresence,
} from "framer-motion"
import {
  ArrowRight, ArrowLeft, Check,
  Users, BookOpen, GraduationCap, GitBranch,
  Clock, CalendarDays, TrendingUp, Sparkles,
  Search, FileText, Shield, Zap,
  CheckCircle2, Award, Brain, MessageSquare,
  BarChart3, Target, Lock, Eye, Layers,
  ChevronRight, Star, FolderOpen, RefreshCw,
  UserPlus, Wallet, Download, Send, Filter,
  Building2, Mail, Phone, MapPin, Receipt,
  Calculator, PieChart, Banknote, ClipboardList,
  Hash, AtSign, Paperclip, Smile, LayoutDashboard,
  Settings, CreditCard, Package, BarChart2, Gauge,
  Globe, Bell, Plug, Database, ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PRODUCTS, type ProductData } from "@/lib/marketing/products"

// ─── Micro utilities ───────────────────────────────────────────────────────────

function FadeUp({
  children, delay = 0, className,
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px 0px" })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  )
}

function Grain({ opacity = 0.025 }: { opacity?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0" style={{
      opacity,
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      backgroundRepeat: "repeat", backgroundSize: "160px 160px",
    }} />
  )
}

function BackLink({ dark = false }: { dark?: boolean }) {
  return null
}

type AccountCtaProps = {
  accountCtaHref: string
  accountCtaLabel: string
}

type ProductPageProps = {
  product: ProductData
} & AccountCtaProps

function PageCTA({
  product,
  dark = false,
  accountCtaHref,
  accountCtaLabel,
}: {
  product: ProductData
  dark?: boolean
} & AccountCtaProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const Icon = product.icon
  const primaryFeatures = product.features.slice(0, 3)
  const faq = [
    {
      q: `Wie schnell ist ${product.name} einsatzbereit?`,
      a: `${product.name} ist als Teil der Hostpartners-Suite auf einen schnellen Start ausgelegt. Bestehende Prozesse, Rollen und Inhalte lassen sich ohne langen Implementierungs-Overhead übernehmen.`,
    },
    {
      q: `Wie arbeitet ${product.name} mit den anderen Modulen zusammen?`,
      a: `${product.name} ist nicht isoliert gedacht. Daten, Zuständigkeiten und Inhalte greifen direkt mit ${product.compatibleWith.slice(0, 3).join(", ")} ineinander, statt doppelt gepflegt zu werden.`,
    },
    {
      q: `Für wen ist ${product.name} im Alltag gedacht?`,
      a: `${product.name} unterstützt operative Teams genauso wie HR und Führungskräfte. Die Oberfläche ist auf schnelle Entscheidungen, klare Zuständigkeiten und wenig Reibung im Tagesgeschäft ausgelegt.`,
    },
  ]
  return (
    <section ref={ref} className="relative overflow-hidden border-t border-border bg-background py-32 sm:py-44">
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 50% 100%, ${product.colorHex}16 0%, transparent 62%)` }} />
      <Grain opacity={0.022} />
      <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8">
        <div className="mb-24 grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <FadeUp>
            <p className="mb-5 text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: `${product.colorHex}88` }}>
              Warum {product.name}
            </p>
            <h2 className="font-heading text-[40px] sm:text-[64px] lg:text-[74px] font-normal leading-[0.92] tracking-tight text-foreground text-balance">
              Mehr Tiefe.
              <br />
              <span className="italic" style={{ color: `${product.colorHex}66` }}>Mehr Wirkung im Alltag.</span>
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-muted-foreground sm:text-[17px]">
              {product.description} Gleichzeitig bleibt {product.name} eng mit den übrigen Hostpartners-Modulen verbunden, damit Prozesse, Inhalte und Verantwortlichkeiten nicht auseinanderfallen.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-[30px] border border-border bg-card p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:p-7">
              <div className="mb-8 flex items-center gap-3">
                <div className={cn("flex size-11 items-center justify-center rounded-2xl", product.color)}>
                  <Icon className="size-5 text-white" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-foreground">{product.name} im Hostpartners-System</p>
                  <p className="text-[12px] text-muted-foreground">Nahtlos verbunden statt isoliertes Tool</p>
                </div>
              </div>
              <div className="mb-6 flex flex-wrap gap-2.5">
                {product.compatibleWith.map(app => (
                  <span key={app} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-[12px] text-muted-foreground">
                    <span className="size-1.5 rounded-full" style={{ backgroundColor: product.colorHex }} />
                    {app}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {product.stats.map(stat => (
                  <div key={stat.label} className="rounded-2xl border border-border bg-background px-4 py-4">
                    <p className="mb-1.5 font-heading text-[28px] font-normal leading-none" style={{ color: product.colorHex }}>
                      {stat.value}
                    </p>
                    <p className="text-[11px] leading-snug text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        <div className="mb-24">
          <FadeUp className="mb-10">
            <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.2em]" style={{ color: `${product.colorHex}88` }}>
              Im Fokus
            </p>
            <h3 className="font-heading text-[34px] sm:text-[52px] font-normal leading-[0.97] tracking-tight text-foreground text-balance">
              Was {product.name}
              <span className="text-muted-foreground/40"> im Kern besser macht.</span>
            </h3>
          </FadeUp>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {primaryFeatures.map((feature, i) => {
              const FeatureIcon = feature.icon
              return (
                <FadeUp key={feature.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: `0 22px 54px ${product.colorHex}10` }}
                    transition={{ duration: 0.2 }}
                    className="h-full rounded-[28px] border border-border bg-card p-7"
                  >
                    <div className="mb-6 flex size-11 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${product.colorHex}12` }}>
                      <FeatureIcon className="size-5" style={{ color: product.colorHex }} />
                    </div>
                    <h4 className="mb-2 text-[17px] font-semibold text-foreground">{feature.title}</h4>
                    <p className="text-[14px] leading-relaxed text-muted-foreground">{feature.body}</p>
                  </motion.div>
                </FadeUp>
              )
            })}
          </div>
        </div>

        <div className="mb-24 grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <FadeUp>
            <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.2em]" style={{ color: `${product.colorHex}88` }}>
              Ablauf
            </p>
            <h3 className="font-heading text-[34px] sm:text-[52px] font-normal leading-[0.97] tracking-tight text-foreground mb-8 text-balance">
              So entfaltet {product.name}
              <span className="text-muted-foreground/40"> seinen Wert.</span>
            </h3>
            <div className="space-y-4">
              {product.steps.map((step, i) => (
                <div key={step.number} className="flex gap-4 rounded-[24px] border border-border bg-card px-4 py-5 sm:px-5">
                  <div className="pt-1">
                    <div className="flex size-9 items-center justify-center rounded-full text-[11px] font-mono"
                      style={{ color: product.colorHex, backgroundColor: `${product.colorHex}10` }}>
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <p className="mb-1.5 text-[16px] font-semibold text-foreground">{step.title}</p>
                    <p className="text-[14px] leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.2em]" style={{ color: `${product.colorHex}88` }}>
              Fragen & Antworten
            </p>
            <h3 className="font-heading text-[34px] sm:text-[52px] font-normal leading-[0.97] tracking-tight text-foreground mb-8 text-balance">
              Klarer vor
              <span className="text-muted-foreground/40"> dem nächsten Schritt.</span>
            </h3>
            <div className="space-y-3">
              {faq.map((item, i) => (
                <div key={item.q} className="rounded-[24px] border border-border bg-card px-4 py-5 sm:px-5">
                  <p className="mb-2 text-[15px] font-semibold text-foreground">{item.q}</p>
                  <p className="text-[14px] leading-relaxed text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        <div className="rounded-[36px] border border-border bg-card px-6 py-14 text-center shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:px-10 sm:py-16">
          <motion.div initial={{ opacity: 0, scale: 0.75 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 flex items-center justify-center"
          >
            <div className={cn("flex size-16 items-center justify-center rounded-3xl shadow-2xl", product.color)}
              style={{ boxShadow: `0 20px 60px ${product.colorHex}30` }}>
              <Icon className="size-8 text-white" />
            </div>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 font-heading text-[42px] sm:text-[72px] lg:text-[92px] font-normal leading-[0.92] tracking-tight text-foreground text-balance"
          >
            {product.name} für
            <br />
            <span className="text-muted-foreground/35">dein Team.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mb-10 max-w-md text-[16px] leading-relaxed text-muted-foreground sm:mb-12 sm:text-[17px]"
          >
            Lerne in einer persönlichen Demo, wie {product.name} in eure Abläufe passt und welchen operativen Hebel es in eurem Alltag schafft.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="mb-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          >
            <Link href="/login" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-8 text-[14px] font-semibold text-background transition-opacity hover:opacity-85">
              Demo buchen <ArrowRight className="size-4" />
            </Link>
            <Link href={accountCtaHref} className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-[14px] font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground">
              {accountCtaLabel}
            </Link>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.45 }}
            className="text-[12px] text-muted-foreground/50"
          >
            Persönliche Demo · DSGVO-konform · Einführung begleitet
          </motion.p>
        </div>
      </div>
    </section>
  )
}

// ── Persona Hero ─────────────────────────────────────────────────────────────
function PersonaHero({
  product,
  cards,
  deptColors,
}: {
  product: ProductData
  cards: { name: string; role: string; dept: string; init: string; color: string }[]
  deptColors: Record<string, { bg: string; fg: string }>
}) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const mockupY     = useTransform(scrollYProgress, [0, 1], [0, 65])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 14 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 14 })
  const tiltX   = useTransform(springY, [-500, 500], [4, -4])
  const tiltY   = useTransform(springX, [-500, 500], [-5, 5])
  // Badges float at slightly different rates for depth
  const badgeX  = useTransform(springX, [-500, 500], [-14, 14])
  const badgeY  = useTransform(springY, [-500, 500], [-10, 10])
  const badge2X = useTransform(springX, [-500, 500], [8, -8])
  const badge2Y = useTransform(springY, [-500, 500], [6, -6])

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - r.left - r.width  / 2)
    mouseY.set(e.clientY - r.top  - r.height / 2)
  }
  function onMouseLeave() { mouseX.set(0); mouseY.set(0) }

  const listRows = [
    { ...cards[0], status: "Aktiv",     dot: "#10b981" },
    { ...cards[1], status: "Aktiv",     dot: "#10b981" },
    { ...cards[2], status: "Aktiv",     dot: "#10b981" },
    { ...cards[3], status: "Aktiv",     dot: "#10b981" },
    { ...cards[4], status: "Probezeit", dot: "#f59e0b" },
    { ...cards[5], status: "Elternzeit",dot: "#6366f1" },
  ]

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-white overflow-hidden flex flex-col"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Dot grid texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        opacity: 0.18,
      }} />
      {/* Center-left fade — clears grid beneath copy */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 65% at 18% 42%, white 30%, transparent 72%)" }} />
      {/* Top-right color bloom — very restrained */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse 52% 48% at 98% -8%, ${product.colorHex}09 0%, transparent 62%)` }} />
      {/* Bottom fade into next section */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 inset-x-0 h-40"
        style={{ background: "linear-gradient(to top, white, transparent)" }} />
      <Grain opacity={0.015} />

      <div className="relative z-10 mx-auto max-w-screen-xl px-6 sm:px-8 w-full flex-1 flex flex-col">
        <div className="pt-12"><BackLink /></div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.55fr] gap-8 lg:gap-12 items-center pt-8 pb-28 flex-1">

          {/* ── LEFT: Copy ── */}
          <motion.div style={{ opacity: textOpacity }}>
            <motion.p
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] mb-9"
              style={{ color: product.colorHex }}
            >
              <span className="size-[5px] rounded-full" style={{ background: product.colorHex }} />
              {product.license}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.13, ease: [0.16, 1, 0.3, 1] }}
              className="persona-hero-title font-heading text-[62px] sm:text-[82px] lg:text-[96px] font-normal leading-[0.88] tracking-tight text-dark mb-7"
            >
              Alle Menschen.<br />
              <span className="persona-glow-accent italic">Ein System.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.24 }}
              className="text-[17px] text-gray-500 leading-relaxed max-w-[320px] mb-10"
            >
              Digitale Personalakten, Organigramm und rollenbasierter Datenzugriff — DSGVO-konform von Anfang an.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.33 }}
              className="flex items-center gap-3 mb-12"
            >
              <Link href="/login"
                className="inline-flex items-center gap-2.5 h-11 px-7 rounded-full text-[13.5px] font-semibold text-white transition-all hover:opacity-90"
                style={{ background: product.colorHex, boxShadow: `0 6px 24px ${product.colorHex}40` }}>
                Demo buchen <ArrowRight className="size-3.5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.48 }}
              className="flex items-center gap-8 pt-7 border-t border-gray-100"
            >
              {product.stats.map(s => (
                <div key={s.label}>
                  <p className="font-heading text-[30px] font-normal text-gray-900 leading-none mb-1">{s.value}</p>
                  <p className="text-[10.5px] text-gray-400">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Single unified app mockup ── */}
          <div className="hidden lg:flex justify-end">
            <motion.div style={{ y: mockupY }} className="relative w-full max-w-[660px]">

              {/* Floating badge 1 — top-left of mockup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-5 -left-6 z-20 bg-card rounded-xl border border-border px-3.5 py-2.5 flex items-center gap-2.5"
                style={{ x: badgeX, y: badgeY, boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
              >
                <div className="size-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${product.colorHex}14` }}>
                  <Users className="size-3.5" style={{ color: product.colorHex }} />
                </div>
                <div>
                  <p className="text-[9.5px] font-bold text-foreground leading-tight">47 Mitarbeitende</p>
                  <p className="text-[8px] text-muted-foreground leading-tight">3 neu diese Woche</p>
                </div>
              </motion.div>

              {/* Floating badge 2 — bottom-right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-4 -right-4 z-20 bg-card rounded-xl border border-border px-3.5 py-2.5 flex items-center gap-2.5"
                style={{ x: badge2X, y: badge2Y, boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
              >
                <div className="size-7 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Shield className="size-3.5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[9.5px] font-bold text-foreground leading-tight">DSGVO-konform</p>
                  <p className="text-[8px] text-muted-foreground leading-tight">Audit-Trail aktiv</p>
                </div>
              </motion.div>

              {/* Glow beneath the mockup */}
              <div aria-hidden className="absolute -inset-6 -z-10 rounded-2xl blur-[72px] opacity-22"
                style={{ background: product.colorHex }} />

              {/* Main app window */}
              <motion.div
                style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400 }}
                className="relative"
              >
                <motion.div
                  initial={{ opacity: 0, y: 52, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-[20px] bg-white overflow-hidden"
                  style={{
                    boxShadow: "0 40px 100px -20px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                >
                  {/* ── Browser / App bar ── */}
                  <div className="h-10 bg-[#f5f5f7] border-b border-gray-200/70 flex items-center px-4 gap-1.5">
                    <div className="size-[11px] rounded-full bg-[#ff5f57]" />
                    <div className="size-[11px] rounded-full bg-[#ffbd2e]" />
                    <div className="size-[11px] rounded-full bg-[#28c840]" />
                    <div className="mx-3 flex-1 h-[22px] max-w-[240px] rounded-md bg-white border border-gray-200/60 flex items-center px-2.5 gap-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
                      <div className="size-[7px] rounded-full opacity-60" style={{ background: product.colorHex }} />
                      <span className="text-[9px] text-gray-400 font-mono truncate">dashboard.hostpartners.de/berghotel/team</span>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                      <div className="h-[22px] px-2.5 rounded-md border border-gray-200 bg-white text-[8.5px] text-gray-500 flex items-center gap-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                        <Search className="size-2.5" />Suchen
                      </div>
                      <div className="h-[22px] px-2.5 rounded-md text-[8.5px] font-semibold text-white flex items-center"
                        style={{ background: product.colorHex }}>+ Neu</div>
                    </div>
                  </div>

                  {/* ── Two-pane layout ── */}
                  <div className="flex" style={{ height: 450 }}>

                    {/* LEFT pane: dept filter + employee list */}
                    <div className="w-[210px] border-r border-gray-100/80 bg-[#fafafa] flex flex-col shrink-0">
                      {/* Dept filter */}
                      <div className="p-3 border-b border-gray-100/60">
                        <p className="text-[7.5px] font-semibold uppercase tracking-[0.14em] text-gray-400 mb-2">Abteilungen</p>
                        {(["Alle", "HR", "Küche", "Operations", "Front Office"] as const).map((dept, di) => (
                          <div key={dept}
                            className={cn("flex items-center justify-between px-2 py-1.5 rounded-lg mb-0.5 cursor-default text-[9.5px] font-medium",
                              di === 0 ? "text-gray-900" : "text-gray-500 hover:bg-white")}
                            style={di === 0 ? { background: `${product.colorHex}12`, color: product.colorHex } : {}}
                          >
                            <span>{dept}</span>
                            <span className={cn("text-[8px] font-mono", di === 0 ? "opacity-70" : "text-gray-300")}>
                              {di === 0 ? "47" : ["6","12","15","14"][di-1]}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Employee mini-list */}
                      <div className="flex-1 overflow-hidden p-2 space-y-0.5">
                        {listRows.map((row, i) => (
                          <motion.div key={row.name}
                            initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, delay: 0.7 + i * 0.07 }}
                            className={cn(
                              "flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-default",
                              i === 0 ? "bg-white shadow-sm border border-gray-100/80" : "hover:bg-white/60"
                            )}
                          >
                            <div className="size-[22px] rounded-full flex items-center justify-center text-[7.5px] font-bold text-white shrink-0"
                              style={{ background: row.color }}>{row.init}</div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[9.5px] font-semibold text-gray-800 truncate leading-tight">{row.name}</p>
                              <p className="text-[8px] text-gray-400 truncate leading-tight">{row.role}</p>
                            </div>
                            <div className="size-[6px] rounded-full shrink-0" style={{ background: row.dot }} />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT pane: profile detail */}
                    <div className="flex-1 bg-white overflow-hidden">
                      {/* Profile header */}
                      <div className="px-6 pt-5 pb-4 border-b border-gray-100">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="size-14 rounded-full flex items-center justify-center text-[15px] font-bold text-white shrink-0"
                            style={{ background: "#6366f1", boxShadow: "0 4px 14px #6366f135" }}>SK</div>
                          <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-[13.5px] font-bold text-gray-900">Sandra Köhler</h3>
                              <span className="text-[7.5px] font-semibold px-1.5 py-[2.5px] rounded-full bg-emerald-50 text-emerald-700">● Aktiv</span>
                            </div>
                            <p className="text-[11px] text-gray-500 mt-0.5">HR-Leiterin · Vollzeit · 40h/Woche</p>
                            <div className="flex items-center gap-1.5 mt-2">
                              <span className="text-[7.5px] font-semibold px-1.5 py-[2.5px] rounded-full"
                                style={{ background: "#ede9fe", color: "#5b21b6" }}>HR</span>
                              <span className="text-[8px] text-gray-400 font-mono">seit Jan 2020</span>
                            </div>
                          </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex items-center gap-0 -mx-1">
                          {["Profil", "Dokumente", "Verlauf", "Abwesenheiten"].map((tab, i) => (
                            <div key={tab}
                              className="px-3.5 py-2 text-[9.5px] font-semibold border-b-[1.5px] cursor-default"
                              style={i === 1
                                ? { borderColor: product.colorHex, color: product.colorHex }
                                : { borderColor: "transparent", color: "#9ca3af" }}>
                              {tab}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Document list */}
                      <div className="p-4 space-y-1.5">
                        {[
                          { name: "Arbeitsvertrag 2020",      date: "15. Jan 2020", type: "PDF", bg: "#fef2f2", fg: "#b91c1c", warn: false },
                          { name: "Gehaltsanpassung 2023",    date: "01. Mär 2023", type: "PDF", bg: "#fef2f2", fg: "#b91c1c", warn: false },
                          { name: "HACCP-Zertifikat 2024",    date: "18. Jun 2024", type: "PDF", bg: "#fef2f2", fg: "#b91c1c", warn: true  },
                          { name: "Lohnsteuerbescheinigung",  date: "31. Jan 2025", type: "DOC", bg: "#eff6ff", fg: "#1d4ed8", warn: false },
                        ].map((doc, i) => (
                          <motion.div key={doc.name}
                            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.85 + i * 0.07 }}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-default"
                            style={doc.warn
                              ? { background: "#fffbeb", border: "1px solid #fde68a" }
                              : i === 0
                              ? { background: "white", border: "1px solid #f3f4f6", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }
                              : {}}
                          >
                            <div className="size-7 rounded-lg flex items-center justify-center shrink-0 text-[7px] font-bold"
                              style={{ background: doc.bg, color: doc.fg }}>{doc.type}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] font-semibold text-gray-800 truncate">{doc.name}</p>
                              <p className="text-[8.5px] text-gray-400">{doc.date}</p>
                            </div>
                            {doc.warn
                              ? <span className="text-[7.5px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full shrink-0">Läuft ab</span>
                              : <ChevronRight className="size-3 text-gray-300 shrink-0" />
                            }
                          </motion.div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* ── Status bar ── */}
                  <div className="h-9 border-t border-gray-100 bg-[#fafafa] flex items-center px-5 gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="size-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[9px] text-gray-500">47 aktive Profile</span>
                    </div>
                    <div className="w-px h-3 bg-gray-200" />
                    <span className="text-[9px] text-gray-400">Zuletzt aktualisiert: heute</span>
                    <div className="ml-auto flex items-center gap-1">
                      {listRows.slice(0,5).map(r => (
                        <div key={r.init} className="size-5 rounded-full flex items-center justify-center text-[6.5px] font-bold text-white"
                          style={{ background: r.color }}>{r.init}</div>
                      ))}
                      <span className="text-[8px] text-gray-400 ml-1">+42</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// PERSONA — The People Platform
// Dark hero + floating employee cards → full-bleed directory table →
// digital Personalakte split → feature trio → dark quote → CTA
// ══════════════════════════════════════════════════════════════════════════════

function PersonaPage({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const deptColors: Record<string, { bg: string; fg: string }> = {
    HR:             { bg: "#ede9fe", fg: "#5b21b6" },
    Operations:     { bg: "#dbeafe", fg: "#1e40af" },
    Küche:          { bg: "#dcfce7", fg: "#166534" },
    "Front Office": { bg: "#ffe4e6", fg: "#9f1239" },
    Service:        { bg: "#dbeafe", fg: "#1e40af" },
  }

  const cards = [
    { name: "Sandra Köhler",  role: "HR-Leiterin",       dept: "HR",           init: "SK", color: "#6366f1" },
    { name: "Thomas Richter", role: "Teamleiter Service", dept: "Operations",   init: "TR", color: "#3b82f6" },
    { name: "Maria Hoffmann", role: "Küchenchefin",       dept: "Küche",        init: "MH", color: "#10b981" },
    { name: "Anna Schmidt",   role: "Rezeptionistin",     dept: "Front Office", init: "AS", color: "#f43f5e" },
    { name: "Jonas Müller",   role: "HR-Referent",        dept: "HR",           init: "JM", color: "#8b5cf6" },
    { name: "Lukas Bauer",    role: "Sous Chef",          dept: "Küche",        init: "LB", color: "#10b981" },
    { name: "Felix Weber",    role: "Rezeptionist",       dept: "Front Office", init: "FW", color: "#0ea5e9" },
    { name: "Emre Yilmaz",   role: "Patissier",          dept: "Küche",        init: "EY", color: "#f59e0b" },
  ]

  const tableRows = [
    { ...cards[0], start: "Jan 2020", status: "Aktiv",      statusColor: "#10b981" },
    { ...cards[1], start: "Mär 2019", status: "Aktiv",      statusColor: "#10b981" },
    { ...cards[2], start: "Jun 2018", status: "Aktiv",      statusColor: "#10b981" },
    { ...cards[3], start: "Sep 2021", status: "Aktiv",      statusColor: "#10b981" },
    { ...cards[4], start: "Feb 2023", status: "Probezeit",  statusColor: "#f59e0b" },
    { ...cards[5], start: "Nov 2022", status: "Elternzeit", statusColor: "#6366f1" },
  ]

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <PersonaHero product={product} cards={cards} deptColors={deptColors} />

      {/* ══ ORG CHART ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white pt-32 sm:pt-48 pb-24 sm:pb-36 overflow-hidden">
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">

            {/* Left: Org Chart visual */}
            <FadeUp className="order-2 lg:order-1">
              <div className="relative">
                {/* Glow */}
                <div aria-hidden className="absolute -inset-12 rounded-3xl blur-3xl opacity-10"
                  style={{ background: product.colorHex }} />
                <div className="relative rounded-2xl border border-gray-200/70 bg-white overflow-hidden"
                  style={{ boxShadow: "0 24px 72px -12px rgba(0,0,0,0.13), 0 0 0 1px rgba(0,0,0,0.04)" }}>
                  {/* App bar */}
                  <div className="h-11 border-b border-gray-100 flex items-center px-5 gap-2 bg-white">
                    <div className="size-4.5 rounded-md flex items-center justify-center" style={{ background: product.colorHex }}>
                      <GitBranch className="size-2.5 text-white" />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700">Organigramm</span>
                    <ChevronRight className="size-3 text-gray-300" />
                    <span className="text-[11px] text-gray-400">Berghotel Zugspitz</span>
                  </div>

                  {/* Chart */}
                  <div className="p-6 pb-5">
                    {/* Root */}
                    <div className="flex justify-center mb-0">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.2 }}
                        className="rounded-xl border bg-white px-4 py-2.5 flex items-center gap-2.5 cursor-default"
                        style={{ borderColor: `${product.colorHex}40`, boxShadow: `0 4px 16px ${product.colorHex}18` }}>
                        <div className="size-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                          style={{ background: product.colorHex }}>GM</div>
                        <div>
                          <p className="text-[10.5px] font-bold text-gray-900">Klaus Bergmann</p>
                          <p className="text-[9px] text-gray-400">General Manager</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Vertical connector from root */}
                    <div className="flex justify-center">
                      <div className="w-px h-5 bg-gray-200" />
                    </div>

                    {/* Horizontal bar */}
                    <div className="flex justify-center relative">
                      <div className="absolute top-0 left-[16.5%] right-[16.5%] h-px bg-gray-200" />
                    </div>

                    {/* Level 2 — 3 dept heads */}
                    <div className="grid grid-cols-3 gap-3 relative">
                      {[
                        { init: "SK", name: "Sandra K.", role: "HR-Leiterin",    color: "#6366f1", dept: "HR" },
                        { init: "TR", name: "T. Richter", role: "Ops-Leiter",    color: "#3b82f6", dept: "Operations" },
                        { init: "MH", name: "Maria H.",  role: "Küchenchefin",   color: "#10b981", dept: "Küche" },
                      ].map((node, i) => (
                        <div key={node.name} className="flex flex-col items-center">
                          {/* Vertical drop */}
                          <div className="w-px h-5 bg-gray-200" />
                          <motion.div
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                            className="rounded-xl border border-gray-100 bg-white px-3 py-2 flex flex-col items-center gap-1 cursor-default w-full"
                            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                            <div className="size-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                              style={{ background: node.color }}>{node.init}</div>
                            <p className="text-[9.5px] font-semibold text-gray-800 text-center leading-tight">{node.name}</p>
                            <p className="text-[8.5px] text-gray-400 text-center leading-tight">{node.role}</p>
                          </motion.div>
                          {/* Sub-connector */}
                          <div className="w-px h-3.5 bg-gray-200" />
                          {/* Horizontal sub-bar */}
                          <div className="w-[55%] h-px bg-gray-200" />
                          {/* Leaves */}
                          <div className="flex gap-2 mt-0 pt-0 w-[55%]">
                            {[0,1].map(j => (
                              <div key={j} className="flex flex-col items-center flex-1">
                                <div className="w-px h-3 bg-gray-200" />
                                <motion.div
                                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                  transition={{ duration: 0.35, delay: 0.55 + i * 0.1 + j * 0.06 }}
                                  className="w-full rounded-lg border border-gray-100 bg-[#fafafa] px-1.5 py-1.5 flex flex-col items-center gap-0.5 cursor-default"
                                >
                                  <div className="size-4 rounded-full bg-gray-200" />
                                  <div className="h-1.5 w-8 rounded bg-gray-200/80 mt-0.5" />
                                  <div className="h-1 w-6 rounded bg-gray-100" />
                                </motion.div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer stat bar */}
                  <div className="border-t border-gray-100 px-5 py-3 flex items-center gap-5 bg-[#fafafa]">
                    {[
                      { label: "Mitarbeitende", val: "47" },
                      { label: "Abteilungen",   val: "6"  },
                      { label: "Führungsebenen",val: "3"  },
                    ].map(s => (
                      <div key={s.label} className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-gray-800">{s.val}</span>
                        <span className="text-[9.5px] text-gray-400">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Right: Copy */}
            <FadeUp delay={0.12} className="order-1 lg:order-2">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: product.colorHex }}>
                Organigramm
              </p>
              <h2 className="font-heading text-[48px] sm:text-[64px] font-normal leading-[0.9] tracking-tight text-gray-900 mb-6">
                Struktur, die sich<br />
                <span className="text-gray-300 italic">selbst zeichnet.</span>
              </h2>
              <p className="text-[17px] text-gray-500 leading-relaxed max-w-[380px] mb-8">
                Das Organigramm entsteht automatisch aus deinen Stammdaten. Neue Mitarbeitende, Rollenwechsel, Abteilungsumbauten — das Bild passt sich in Echtzeit an.
              </p>
              <ul className="space-y-3">
                {[
                  "Live-Sync mit allen Stammdatenänderungen",
                  "Klickbare Knoten öffnen direkt die Personalakte",
                  "Export als PDF oder SVG für Präsentationen",
                ].map(f => (
                  <li key={f} className="flex items-center gap-3 text-[14px] text-gray-600">
                    <div className="size-[18px] rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${product.colorHex}18` }}>
                      <Check className="size-2.5" style={{ color: product.colorHex }} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ PERSONALAKTE: Split ═══════════════════════════════════════════════ */}
      <section className="py-36 sm:py-52 bg-white border-t border-gray-100 overflow-hidden">
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
            {/* Personalakte mockup */}
            <FadeUp>
              <div className="relative">
                <div aria-hidden className="absolute -inset-10 rounded-3xl blur-3xl opacity-12"
                  style={{ background: product.colorHex }} />

                {/* Floating expiry reminder card */}
                <motion.div
                  initial={{ opacity: 0, y: 12, rotate: 1 }}
                  animate={{ opacity: 1, y: 0, rotate: 2 }}
                  transition={{ duration: 0.55, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -top-5 -right-4 sm:-right-8 z-10 rounded-xl bg-white border border-amber-200 px-3.5 py-2.5"
                  style={{ boxShadow: "0 8px 28px rgba(251,191,36,0.22)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                      <span className="text-[11px]">⚠️</span>
                    </div>
                    <div>
                      <p className="text-[9.5px] font-bold text-amber-800 leading-tight">HACCP läuft ab</p>
                      <p className="text-[8.5px] text-amber-600 leading-tight">18. Jun 2025 · 67 Tage</p>
                    </div>
                  </div>
                </motion.div>

                {/* Completion badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10, rotate: -2 }}
                  animate={{ opacity: 1, y: 0, rotate: -1.5 }}
                  transition={{ duration: 0.5, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -bottom-4 -left-4 sm:-left-8 z-10 rounded-xl bg-white border border-gray-200 px-3.5 py-2.5"
                  style={{ boxShadow: "0 8px 28px rgba(0,0,0,0.1)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="size-3.5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-[9.5px] font-bold text-gray-800 leading-tight">Akte vollständig</p>
                      <p className="text-[8.5px] text-gray-400 leading-tight">5/5 Pflichtdokumente</p>
                    </div>
                  </div>
                </motion.div>

                <div className="relative rounded-2xl border border-gray-200/70 bg-white overflow-hidden"
                  style={{ boxShadow: "0 24px 72px -12px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.04)" }}>
                  {/* Profile header */}
                  <div className="px-6 pt-6 pb-0 border-b border-gray-100">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="size-14 rounded-full flex items-center justify-center text-[15px] font-bold text-white shrink-0"
                        style={{ background: "#6366f1" }}>SK</div>
                      <div>
                        <h3 className="text-[14px] font-bold text-gray-900">Sandra Köhler</h3>
                        <p className="text-[11.5px] text-gray-500 mt-0.5">HR-Leiterin · seit Januar 2020</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[8.5px] font-semibold px-2 py-[3px] rounded-full"
                            style={{ background: "#ede9fe", color: "#5b21b6" }}>HR</span>
                          <span className="text-[8.5px] font-semibold px-2 py-[3px] rounded-full bg-emerald-50 text-emerald-700">
                            ● Aktiv
                          </span>
                          <span className="text-[8.5px] font-mono text-gray-400">Vollzeit · 40h</span>
                        </div>
                      </div>
                    </div>
                    {/* Tabs */}
                    <div className="flex items-center gap-0 -mx-1">
                      {["Profil", "Dokumente", "Verlauf", "Abwesenheiten"].map((tab, i) => (
                        <div key={tab}
                          className={cn("px-4 py-2.5 text-[10.5px] font-semibold border-b-2 cursor-default transition-colors",
                            i === 1 ? "border-current" : "border-transparent text-gray-400")}
                          style={i === 1 ? { borderColor: product.colorHex, color: product.colorHex } : {}}>
                          {tab}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="p-5 space-y-1.5">
                    {[
                      { name: "Arbeitsvertrag 2020",      date: "15. Jan 2020", type: "PDF", bg: "#fef2f2", fg: "#b91c1c", warn: false },
                      { name: "Gehaltsanpassung 2023",    date: "01. Mär 2023", type: "PDF", bg: "#fef2f2", fg: "#b91c1c", warn: false },
                      { name: "HACCP-Zertifikat 2024",    date: "18. Jun 2024", type: "PDF", bg: "#fef2f2", fg: "#b91c1c", warn: true  },
                      { name: "Lohnsteuerbescheinigung",  date: "31. Jan 2025", type: "DOC", bg: "#eff6ff", fg: "#1d4ed8", warn: false },
                      { name: "Datenschutz-Einwilligung", date: "15. Jan 2020", type: "PDF", bg: "#fef2f2", fg: "#b91c1c", warn: false },
                    ].map((doc, i) => (
                      <div key={doc.name}
                        className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-default",
                          doc.warn ? "border border-amber-200 bg-amber-50/50" :
                          i === 0 ? "border border-gray-100/80 shadow-sm bg-white" : "hover:bg-gray-50/70")}
                      >
                        <div className="size-7 rounded-lg flex items-center justify-center shrink-0 text-[7.5px] font-bold"
                          style={{ background: doc.bg, color: doc.fg }}>{doc.type}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10.5px] font-semibold text-gray-800 truncate">{doc.name}</p>
                          <p className="text-[9px] text-gray-400">{doc.date}</p>
                        </div>
                        {doc.warn
                          ? <span className="text-[8px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full shrink-0">Läuft ab</span>
                          : <ChevronRight className="size-3 text-gray-300 shrink-0" />
                        }
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Copy */}
            <FadeUp delay={0.14}>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: product.colorHex }}>
                Digitale Personalakte
              </p>
              <h2 className="font-heading text-[48px] sm:text-[66px] font-normal leading-[0.9] tracking-tight text-gray-900 mb-6">
                Keine Papierakte<br />
                <span className="text-gray-300 italic">mehr.</span>
              </h2>
              <p className="text-[17px] text-gray-500 leading-relaxed max-w-[380px] mb-8">
                Alle Dokumente, Verträge und Zertifikate eines Mitarbeitenden an einem Ort — versioniert, revisionssicher und mit vollständigem Zugriffsschutz.
              </p>
              <ul className="space-y-3">
                {[
                  "DSGVO-konforme Ablage mit Audit-Trail",
                  "Automatische Ablauferinnerungen für Zertifikate",
                  "Zugriffshistorie für jeden Datensatz",
                ].map(f => (
                  <li key={f} className="flex items-center gap-3 text-[14px] text-gray-600">
                    <div className="size-[18px] rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${product.colorHex}18` }}>
                      <Check className="size-2.5" style={{ color: product.colorHex }} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ DSGVO / SECURITY (dark split) ══════════════════════════════════════ */}
      <section className="bg-white relative overflow-hidden border-t border-gray-100">
        <Grain opacity={0.02} />
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse 55% 65% at 0% 55%, ${product.colorHex}16 0%, transparent 60%)` }} />

        <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 py-32 sm:py-48 items-center">

            {/* LEFT: Copy + security pillars */}
            <FadeUp>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] mb-7"
                style={{ color: product.colorHex }}>
                Datenschutz & Sicherheit
              </p>
              <h2 className="font-heading text-[46px] sm:text-[62px] lg:text-[74px] font-normal leading-[0.88] tracking-tight text-gray-900 mb-8">
                Vertrauen<br />
                <span className="italic text-gray-300">ist Architektur.</span>
              </h2>
              <p className="text-[16px] leading-relaxed mb-14 max-w-sm text-gray-500">
                Persona wurde von Grund auf für DSGVO-Konformität entwickelt — keine nachträgliche Compliance-Schicht.
              </p>

              <div className="space-y-5">
                {[
                  { icon: Shield, title: "Lückenloser Audit-Trail",    body: "Jeder Zugriff, jede Änderung, jede Weitergabe — automatisch protokolliert und für Prüfungen abrufbar." },
                  { icon: Lock,   title: "Row-Level Security",          body: "Manager sehen datenbankenseitig nur ihre eigene Reports-Kette. Kein Frontend-Filter, der versagen kann." },
                  { icon: Eye,    title: "Feldebene-Berechtigungen",    body: "Gehalt und Gesundheitsdaten nur für explizit berechtigte Rollen sichtbar — granular und auditierbar." },
                ].map((p, i) => {
                  const Icon = p.icon
                  return (
                    <FadeUp key={p.title} delay={0.12 + i * 0.09}>
                      <div className="flex items-start gap-4">
                        <div className="size-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: `${product.colorHex}20`, border: `1px solid ${product.colorHex}2e` }}>
                          <Icon className="size-4" style={{ color: product.colorHex }} />
                        </div>
                        <div>
                          <p className="text-[13.5px] font-semibold mb-1 text-gray-800">{p.title}</p>
                          <p className="text-[12.5px] leading-relaxed text-gray-500">{p.body}</p>
                        </div>
                      </div>
                    </FadeUp>
                  )
                })}
              </div>

              <FadeUp delay={0.42}>
                <div className="flex flex-wrap gap-2 mt-12">
                  {["DSGVO Art. 30 konform", "ISO 27001 ready", "Ende-zu-Ende verschlüsselt", "Datenlöschung auf Antrag"].map(b => (
                    <span key={b}
                      className="text-[9.5px] font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: `${product.colorHex}08`, border: `1px solid ${product.colorHex}18`, color: "rgba(75,85,99,0.92)" }}>
                      {b}
                    </span>
                  ))}
                </div>
              </FadeUp>
            </FadeUp>

            {/* RIGHT: Audit-log mockup */}
            <FadeUp delay={0.18}>
              <div className="relative">
                <div aria-hidden className="absolute -inset-8 rounded-3xl blur-3xl opacity-20"
                  style={{ background: product.colorHex }} />

                <div className="relative rounded-2xl overflow-hidden"
                  style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 24px 72px rgba(0,0,0,0.12)" }}>

                  {/* Header bar */}
                  <div className="px-5 py-3.5 border-b flex items-center gap-3 bg-gray-50"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    <div className="size-5 rounded-md flex items-center justify-center"
                      style={{ background: `${product.colorHex}28` }}>
                      <FileText className="size-3" style={{ color: product.colorHex }} />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700">Audit-Trail — Aktivitäten heute</span>
                    <div className="ml-auto flex items-center gap-1.5">
                      <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] text-gray-400">Live</span>
                    </div>
                  </div>

                  {/* Column headers */}
                  <div className="grid grid-cols-[58px_80px_1fr_76px] gap-2 px-5 py-2 border-b bg-gray-50"
                    style={{ borderColor: "rgba(0,0,0,0.04)" }}>
                    {["Zeit", "Nutzer", "Aktion", "Datensatz"].map(h => (
                      <span key={h} className="text-[8px] font-semibold uppercase tracking-[0.12em]"
                        style={{ color: "rgba(107,114,128,0.9)" }}>{h}</span>
                    ))}
                  </div>

                  {/* Log entries */}
                  <div className="divide-y divide-gray-100 font-mono">
                    {[
                      { time: "09:42", user: "S. Köhler",  action: "Personalakte aufgerufen",    target: "J. Müller",   variant: "normal" },
                      { time: "09:41", user: "T. Richter", action: "Feld »Gehalt« angezeigt",    target: "A. Schmidt",  variant: "warn"   },
                      { time: "09:38", user: "System",     action: "Zugriffsversuch blockiert",  target: "F. Weber",    variant: "error"  },
                      { time: "09:35", user: "S. Köhler",  action: "Dokument hochgeladen",       target: "L. Bauer",    variant: "normal" },
                      { time: "09:31", user: "Admin",      action: "Rolle geändert → HR-Mgr",    target: "E. Yilmaz",   variant: "normal" },
                      { time: "09:28", user: "T. Richter", action: "CSV-Export angefragt",       target: "Operations",  variant: "warn"   },
                      { time: "09:21", user: "System",     action: "DSGVO-Löschanfrage",         target: "M. Hoffmann", variant: "ok"     },
                      { time: "09:14", user: "S. Köhler",  action: "Zertifikat aktualisiert",   target: "J. Müller",   variant: "normal" },
                    ].map((entry, i) => {
                      const actionColor =
                        entry.variant === "error" ? "rgba(248,113,113,0.8)"
                        : entry.variant === "warn" ? "rgba(251,191,36,0.75)"
                        : entry.variant === "ok"   ? "rgba(52,211,153,0.7)"
                        : "rgba(75,85,99,0.9)"
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.45 + i * 0.055 }}
                          className="grid grid-cols-[58px_80px_1fr_76px] gap-2 items-center px-5 py-2.5"
                          style={i === 0 ? { background: "rgba(79,70,229,0.04)" } : {}}
                        >
                          <span className="text-[9px] text-gray-400">{entry.time}</span>
                          <span className="text-[9px] truncate text-blue-600/80">{entry.user}</span>
                          <span className="text-[9px] truncate" style={{ color: actionColor }}>{entry.action}</span>
                          <span className="text-[9px] truncate text-right text-gray-400">{entry.target}</span>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 border-t flex items-center gap-3 bg-gray-50"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    <span className="text-[9px] font-mono text-gray-400">
                      8 Einträge · 3 Warnungen · 1 blockiert
                    </span>
                    <div className="ml-auto flex items-center gap-1.5">
                      <div className="size-1.5 rounded-full" style={{ background: "rgba(248,113,113,0.7)" }} />
                      <span className="text-[9px] text-gray-400">1 Verstoß erkannt</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ══ QUOTE (light) ════════════════════════════════════════════════════ */}
      {product.quote && (
        <section className="product-quote-section py-32 sm:py-44 bg-[#f8fafc] border-t border-gray-100 relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse at 50% 0%, ${product.colorHex}08 0%, transparent 55%)` }} />
          <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8">
            <FadeUp className="max-w-4xl mx-auto text-center">
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="font-heading text-[26px] sm:text-[40px] lg:text-[48px] font-normal leading-[1.08] text-gray-900 mb-10">
                &ldquo;{product.quote.text}&rdquo;
              </p>
              <div className="inline-flex items-center gap-4">
                <div className="size-10 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0"
                  style={{ background: "#6366f1" }}>SK</div>
                <div className="text-left">
                  <p className="text-[13px] font-semibold text-gray-700">{product.quote.author}</p>
                  <p className="text-[11px] text-gray-400">{product.quote.role} · {product.quote.company}</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      <PersonaClosing product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ATLAS — The Knowledge Base
// Apple-quality: split hero + floating browser mockup → editor feature →
// search feature → feature bento → ecosystem strip → CTA
// ══════════════════════════════════════════════════════════════════════════════

function AtlasPage({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const mockupY       = useTransform(heroScroll, [0, 1], [0, 55])
  const mockupScale   = useTransform(heroScroll, [0, 0.9], [1, 0.96])
  const heroTextOpacity = useTransform(heroScroll, [0, 0.55], [1, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 55, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 55, damping: 18 })
  const tiltX = useTransform(springY, [-400, 400], [4, -4])
  const tiltY = useTransform(springX, [-400, 400], [-5, 5])

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - r.left - r.width  / 2)
    mouseY.set(e.clientY - r.top  - r.height / 2)
  }
  function handleMouseLeave() { mouseX.set(0); mouseY.set(0) }

  const folders = [
    { name: "Küche & HACCP",  icon: "🍳", count: 12, active: true  },
    { name: "Service",         icon: "🛎", count: 8,  active: false },
    { name: "HR & Personal",   icon: "👥", count: 15, active: false },
    { name: "Sicherheit",      icon: "🛡", count: 6,  active: false },
    { name: "Hygiene",         icon: "✨", count: 9,  active: false },
  ]

  const articles = [
    { title: "HACCP Grundlagen für Restaurantbetriebe", cat: "Küche",      catBg: "#dcfce7", catFg: "#166534", updated: "Heute",   hot: true  },
    { title: "Gästereklamationen professionell lösen",  cat: "Service",    catBg: "#dbeafe", catFg: "#1e40af", updated: "Gestern", hot: false },
    { title: "Brandschutzordnung 2025",                 cat: "Sicherheit", catBg: "#ffedd5", catFg: "#9a3412", updated: "3. Apr",  hot: false },
    { title: "Einarbeitungsplan: Rezeption",            cat: "HR",         catBg: "#ede9fe", catFg: "#5b21b6", updated: "1. Apr",  hot: false },
    { title: "Weinservice und Sensorik",                cat: "Getränke",   catBg: "#ffe4e6", catFg: "#9f1239", updated: "28. Mär", hot: false },
  ]

  const featureGrid = [
    { icon: FolderOpen, title: "Ordner & Kategorien",   body: "Struktur, die zu deiner Organisation passt. Kategorien, Unterkategorien und Tags für jeden Betrieb."          },
    { icon: RefreshCw,  title: "Versionsverlauf",        body: "Jede Änderung gespeichert. Sieh wer wann was geändert hat — und stelle alte Versionen wieder her."            },
    { icon: Eye,        title: "Zugriffsschutz",         body: "Abteilungswissen bleibt dort, wo es hingehört. Sichtbarkeit auf Kategorieebene oder pro Artikel steuerbar."   },
    { icon: Sparkles,   title: "KI-Suche mit Lumen",     body: "Stelle natürlichsprachliche Fragen — Lumen findet Antworten direkt aus deinen eigenen Artikeln."              },
    { icon: FileText,   title: "Rich-Text-Editor",       body: "Professionell formatierte Artikel ohne HTML-Kenntnisse. Tabellen, Bilder, Code-Blöcke und Callouts."          },
    { icon: Users,      title: "Integriert in Hostpartners", body: "Artikel fließen direkt in Onboarding-Checklisten und Academy-Kurse ein. Kein doppeltes Pflegen."              },
  ]

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen bg-white overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Subtle dot-grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 0.3 }} />

        {/* Emerald glow — top right */}
        <div aria-hidden className="pointer-events-none absolute right-0 top-0 w-[65%] h-[60%]"
          style={{ background: "radial-gradient(ellipse at 80% 10%, #d1fae595 0%, transparent 60%)" }} />

        <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8 w-full">
          <div className="pt-12 mb-16">
            <BackLink />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-center pb-24 lg:pb-36">
            {/* ── Left: Copy ── */}
            <motion.div style={{ opacity: heroTextOpacity }}>
              <motion.p
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] mb-10"
                style={{ color: product.colorHex }}
              >
                <span className="size-1.5 rounded-full inline-block" style={{ background: product.colorHex }} />
                {product.license}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-[64px] sm:text-[84px] lg:text-[92px] font-normal leading-[0.9] tracking-tight text-gray-900 mb-8"
              >
                Das Wissen<br />
                <span className="text-gray-300 italic">deines Teams.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.26 }}
                className="text-[18px] text-gray-500 leading-relaxed max-w-[340px] mb-12"
              >
                {product.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.36 }}
                className="flex items-center gap-3 mb-16"
              >
                <Link href="/login"
                  className="inline-flex items-center gap-2.5 h-12 px-8 rounded-full text-[14px] font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: product.colorHex, boxShadow: `0 8px 28px ${product.colorHex}45` }}>
                  Demo buchen <ArrowRight className="size-4" />
                </Link>
                <Link href={accountCtaHref}
                  className="inline-flex items-center h-12 px-7 rounded-full border border-gray-200 text-gray-500 text-[14px] font-medium hover:border-gray-300 hover:text-gray-700 transition-all">
                  {accountCtaLabel}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.52 }}
                className="flex items-center gap-8 pt-8 border-t border-gray-100"
              >
                {product.stats.map(s => (
                  <div key={s.label}>
                    <p className="font-heading text-[28px] font-normal leading-none text-gray-900 mb-1">{s.value}</p>
                    <p className="text-[11px] text-gray-400">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right: Browser Mockup ── */}
            <motion.div style={{ y: mockupY, scale: mockupScale }} className="flex justify-center lg:justify-end">
              <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }} className="w-full max-w-[620px] relative">
                {/* Glow halo */}
                <div aria-hidden className="absolute -inset-8 -z-10 rounded-full blur-[72px] opacity-35"
                  style={{ background: product.colorHex }} />

                {/* Browser shell */}
                <motion.div
                  initial={{ opacity: 0, y: 44, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.3, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-[20px] border border-gray-200/80 bg-white overflow-hidden"
                  style={{ boxShadow: "0 40px 100px -20px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)" }}
                >
                  {/* Browser chrome */}
                  <div className="h-9 bg-[#f5f5f7] border-b border-gray-200/70 flex items-center px-4 gap-1.5">
                    <div className="size-[11px] rounded-full bg-[#ff5f57]" />
                    <div className="size-[11px] rounded-full bg-[#ffbd2e]" />
                    <div className="size-[11px] rounded-full bg-[#28c840]" />
                    <div className="mx-3 flex-1 h-[22px] max-w-[220px] rounded-md bg-white border border-gray-200/60 flex items-center px-2.5 gap-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
                      <div className="size-[7px] rounded-full opacity-60" style={{ background: product.colorHex }} />
                      <span className="text-[9px] text-gray-400 font-mono truncate">dashboard.hostpartners.de/berghotel/knowledge</span>
                    </div>
                  </div>

                  {/* App content */}
                  <div className="grid grid-cols-[168px_1fr] h-[460px]">
                    {/* Sidebar */}
                    <div className="border-r border-gray-100/80 bg-[#fafafa] py-3 flex flex-col gap-0.5">
                      <div className="px-3 mb-2">
                        <div className="flex items-center gap-1.5 h-[26px] px-2.5 rounded-md bg-white border border-gray-200/60 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                          <Search className="size-2.5 text-gray-300 shrink-0" />
                          <span className="text-[9px] text-gray-300">Suchen…</span>
                        </div>
                      </div>
                      <p className="px-3 mb-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-gray-400">Kategorien</p>
                      {folders.map(f => (
                        <div key={f.name}
                          className={cn("flex items-center gap-2 mx-1.5 px-2 py-[5px] rounded-md cursor-default transition-colors",
                            f.active ? "text-gray-900" : "text-gray-500 hover:text-gray-700 hover:bg-white/60")}
                          style={f.active ? { background: `${product.colorHex}18` } : {}}
                        >
                          <span className="text-[11px] leading-none">{f.icon}</span>
                          <span className="text-[9.5px] font-medium flex-1 truncate">{f.name}</span>
                          <span className={cn("text-[8px] font-mono tabular-nums", f.active ? "font-semibold" : "text-gray-300")}
                            style={f.active ? { color: product.colorHex } : {}}>{f.count}</span>
                        </div>
                      ))}
                    </div>

                    {/* Main panel */}
                    <div className="p-4 bg-white overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-[11px] font-semibold text-gray-900">Küche & HACCP</h3>
                          <p className="text-[9px] text-gray-400 mt-0.5">12 Artikel</p>
                        </div>
                        <div className="h-[22px] px-2.5 rounded-md flex items-center gap-1 text-[9px] font-semibold text-white shadow-sm"
                          style={{ background: product.colorHex }}>
                          + Neu
                        </div>
                      </div>

                      <div className="space-y-1">
                        {articles.map((a, i) => (
                          <motion.div key={a.title}
                            initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.75 + i * 0.07 }}
                            className={cn(
                              "flex items-center gap-2.5 px-2.5 py-2 rounded-xl cursor-default",
                              i === 0 ? "shadow-[0_1px_4px_rgba(0,0,0,0.06)]" : "hover:bg-gray-50/80"
                            )}
                            style={i === 0 ? { border: "1px solid rgba(0,0,0,0.06)", background: "white" } : {}}
                          >
                            <div className="size-[28px] rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: a.catBg }}>
                              <FileText className="size-3" style={{ color: a.catFg }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[9.5px] font-semibold text-gray-800 truncate">{a.title}</p>
                              <p className="text-[8px] text-gray-400 mt-0.5">{a.updated}</p>
                            </div>
                            {a.hot && (
                              <span className="text-[7.5px] font-bold px-1.5 py-[2px] rounded-full"
                                style={{ background: `${product.colorHex}18`, color: product.colorHex }}>
                                Neu
                              </span>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ FEATURE 1: Editor ════════════════════════════════════════════════ */}
      <section className="py-36 sm:py-52 bg-white border-t border-gray-100 overflow-hidden">
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
            {/* Copy */}
            <FadeUp>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: product.colorHex }}>
                Rich-Text-Editor
              </p>
              <h2 className="font-heading text-[48px] sm:text-[68px] font-normal leading-[0.9] tracking-tight text-gray-900 mb-6">
                Schreiben wie in<br />
                <span className="text-gray-300 italic">Notion. Für dein Team.</span>
              </h2>
              <p className="text-[17px] text-gray-500 leading-relaxed max-w-[380px] mb-8">
                Tiptap-basierter Editor mit Überschriften, Tabellen, Bildern und Code-Blöcken. Artikel sehen professionell aus — ohne HTML-Kenntnisse.
              </p>
              <ul className="space-y-3">
                {["Tabellen, Bilder, Code-Blöcke und Callouts", "Automatische Versionierung bei jeder Änderung", "Eingebettete Videos, PDFs und Dateien"].map(f => (
                  <li key={f} className="flex items-center gap-3 text-[14px] text-gray-600">
                    <div className="size-[18px] rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${product.colorHex}18` }}>
                      <Check className="size-2.5" style={{ color: product.colorHex }} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </FadeUp>

            {/* Editor mockup */}
            <FadeUp delay={0.14}>
              <div className="relative">
                <div aria-hidden className="absolute -inset-10 rounded-3xl blur-3xl opacity-15" style={{ background: product.colorHex }} />
                <div className="relative rounded-2xl border border-gray-200/70 bg-white overflow-hidden"
                  style={{ boxShadow: "0 24px 72px -12px rgba(0,0,0,0.13), 0 0 0 1px rgba(0,0,0,0.04)" }}>
                  {/* Format toolbar */}
                  <div className="h-9 bg-[#f9f9f9] border-b border-gray-100/80 flex items-center px-4 gap-0.5">
                    {["B", "I", "U", null, "H1", "H2", null, "⊞", "≡", "⌘"].map((t, i) =>
                      t === null
                        ? <div key={i} className="w-px h-4 bg-gray-200 mx-1.5" />
                        : <div key={i} className="h-6 min-w-[24px] px-1.5 rounded text-[9.5px] font-semibold text-gray-400 flex items-center justify-center hover:bg-gray-200/60 cursor-default">{t}</div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3.5">
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-900 mb-1.5">HACCP Grundlagen für Restaurantbetriebe</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[8.5px] font-semibold px-2 py-[3px] rounded-full" style={{ background: "#dcfce7", color: "#166534" }}>Küche</span>
                        <span className="text-[8.5px] text-gray-400">Zuletzt bearbeitet: heute, 14:32 · Version 3</span>
                      </div>
                    </div>
                    <div className="h-px bg-gray-100" />
                    <div className="space-y-2">
                      <div className="h-2.5 w-full rounded-full bg-gray-100" />
                      <div className="h-2.5 w-[87%] rounded-full bg-gray-100" />
                      <div className="h-2.5 w-[73%] rounded-full bg-gray-100" />
                      <div className="mt-3 h-3.5 w-[42%] rounded-full bg-gray-200" />
                      <div className="h-2.5 w-full rounded-full bg-gray-100" />
                      <div className="h-2.5 w-[91%] rounded-full bg-gray-100" />
                      {/* Callout */}
                      <div className="mt-3 flex gap-3 p-3 rounded-xl border-l-[3px]"
                        style={{ borderLeftColor: product.colorHex, background: `${product.colorHex}09` }}>
                        <div className="flex-1 space-y-1.5">
                          <div className="h-2.5 w-[78%] rounded-full opacity-35" style={{ background: product.colorHex }} />
                          <div className="h-2.5 w-[55%] rounded-full opacity-22" style={{ background: product.colorHex }} />
                        </div>
                      </div>
                      {/* Table */}
                      <div className="mt-2 rounded-lg border border-gray-100 overflow-hidden">
                        {[true, false, false].map((isHeader, r) => (
                          <div key={r} className={cn("grid grid-cols-3 divide-x divide-gray-100", r > 0 && "border-t border-gray-100", isHeader ? "bg-gray-50/80" : "bg-white")}>
                            {[0,1,2].map(c => (
                              <div key={c} className="px-3 py-2">
                                <div className={cn("h-2 rounded-full", isHeader ? "w-[55%] bg-gray-300" : "w-[75%] bg-gray-100")} />
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ FEATURE 2: Search ════════════════════════════════════════════════ */}
      <section className="product-soft-gradient-section py-36 sm:py-52 overflow-hidden"
        style={{ background: `linear-gradient(140deg, ${product.colorHex}07 0%, white 45%, ${product.colorHex}04 100%)` }}>
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
            {/* Search mockup (LEFT) */}
            <FadeUp>
              <div className="relative">
                <div aria-hidden className="absolute -inset-8 rounded-3xl blur-3xl opacity-18" style={{ background: product.colorHex }} />
                <div className="relative rounded-2xl border border-gray-200/70 bg-white p-6"
                  style={{ boxShadow: "0 24px 72px -12px rgba(0,0,0,0.11), 0 0 0 1px rgba(0,0,0,0.04)" }}>
                  {/* Search input */}
                  <div className="flex items-center gap-3 h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/60 mb-3 shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)]">
                    <Search className="size-4 text-gray-400 shrink-0" />
                    <TypewriterDemo texts={["HACCP Checkliste", "Brandschutz", "Einarbeitung Köche", "Hygieneplan 2025"]} />
                  </div>
                  {/* Meta row */}
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <span className="text-[10px] text-gray-400">3 Treffer · 0.08s</span>
                    <div className="flex-1" />
                    <span className="text-[9.5px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: `${product.colorHex}15`, color: product.colorHex }}>KI-Suche aktiv</span>
                  </div>
                  {/* Results */}
                  <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                    {[
                      { title: "HACCP Grundlagen 2025",        cat: "Küche",   excerpt: "Kritische Kontrollpunkte (CCP) sind Prozessschritte, bei denen …" },
                      { title: "HACCP Checkliste täglich",      cat: "Hygiene", excerpt: "Tägliche Temperaturkontrolle Kühlhaus: Soll −18 °C …" },
                      { title: "HACCP Reinigungsprotokoll",     cat: "Lager",   excerpt: "Wöchentliche Reinigung und Desinfektion der Lagerflächen …" },
                    ].map((r, i) => (
                      <motion.div key={r.title}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.55 + i * 0.1 }}
                        className={cn(
                          "flex items-start gap-3 px-4 py-3",
                          i > 0 && "border-t border-gray-100",
                          i === 0 ? "border-l-[3px]" : "hover:bg-gray-50/60"
                        )}
                        style={i === 0 ? { borderLeftColor: product.colorHex, background: `${product.colorHex}06` } : {}}
                      >
                        <FileText className="size-3.5 mt-0.5 shrink-0 text-gray-400" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                            <span className="text-[11.5px] font-semibold text-gray-800">{r.title}</span>
                            <span className="text-[8.5px] px-1.5 py-[2px] rounded-full bg-gray-100 text-gray-500 shrink-0">{r.cat}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 truncate">{r.excerpt}</p>
                        </div>
                        <ChevronRight className="size-3 text-gray-300 shrink-0 mt-1" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Copy (RIGHT) */}
            <FadeUp delay={0.14}>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: product.colorHex }}>
                Volltextsuche
              </p>
              <h2 className="font-heading text-[48px] sm:text-[68px] font-normal leading-[0.9] tracking-tight text-gray-900 mb-6">
                Gefunden in<br />
                <span className="text-gray-300 italic">unter 3 Sekunden.</span>
              </h2>
              <p className="text-[17px] text-gray-500 leading-relaxed max-w-[380px] mb-8">
                Suche über alle Artikel gleichzeitig — mit PostgreSQL Full-Text-Search und KI-gestützter semantischer Suche. Ergebnisse in Millisekunden.
              </p>
              <ul className="space-y-3">
                {["Semantische KI-Suche versteht Kontext", "Millisekundenschnell bei tausenden Artikeln", "Filter nach Kategorie, Autor und Datum"].map(f => (
                  <li key={f} className="flex items-center gap-3 text-[14px] text-gray-600">
                    <div className="size-[18px] rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${product.colorHex}18` }}>
                      <Check className="size-2.5" style={{ color: product.colorHex }} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ FEATURE GRID ═════════════════════════════════════════════════════ */}
      <section className="py-36 sm:py-52 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
          <FadeUp className="mb-20">
            <h2 className="font-heading text-[46px] sm:text-[66px] font-normal leading-[0.91] tracking-tight text-gray-900 max-w-xl">
              Alles, was dein Wissen braucht.
            </h2>
            <p className="text-[17px] text-gray-500 leading-relaxed mt-4 max-w-md">
              Von der Hausordnung bis zur Verfahrensanweisung — strukturierter Zugang für dein ganzes Team.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureGrid.map((f, i) => {
              const Icon = f.icon
              return (
                <FadeUp key={f.title} delay={i * 0.065}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 20px 52px rgba(0,0,0,0.09)" }}
                    transition={{ duration: 0.2 }}
                    className="group p-7 rounded-2xl border border-gray-100 bg-white h-full transition-colors hover:border-gray-200/80"
                    style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                  >
                    <div className="size-10 rounded-xl flex items-center justify-center mb-6"
                      style={{ background: `${product.colorHex}14` }}>
                      <Icon className="size-5" style={{ color: product.colorHex }} />
                    </div>
                    <h3 className="text-[16px] font-semibold text-gray-900 mb-2">{f.title}</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed">{f.body}</p>
                  </motion.div>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══ ECOSYSTEM STRIP ══════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-gray-100 bg-[#fafafa]">
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
          <FadeUp className="text-center mb-12">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Kompatibel mit</p>
            <h2 className="font-heading text-[34px] sm:text-[46px] font-normal tracking-tight text-gray-900 leading-tight">
              Atlas im Hostpartners-Ökosystem.
            </h2>
          </FadeUp>
          <div className="flex flex-wrap justify-center gap-3">
            {product.compatibleWith.map((app, i) => (
              <FadeUp key={app} delay={i * 0.07}>
                <div className="h-10 px-5 rounded-full border border-gray-200 bg-white shadow-sm text-[13px] font-medium text-gray-600 flex items-center gap-2 hover:border-gray-300 hover:text-gray-800 transition-colors cursor-default">
                  <div className="size-2 rounded-full" style={{ background: product.colorHex }} />
                  {app}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <AtlasClosing product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ── Small typewriter component for Atlas search demo ─────────────────────────
function TypewriterDemo({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = texts[idx]
    let timeout: ReturnType<typeof setTimeout>
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else {
      setDeleting(false)
      setIdx((idx + 1) % texts.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, idx, texts])

  return (
    <span className="text-[15px] text-foreground flex-1 text-left">
      {displayed}<span className="animate-pulse opacity-60">|</span>
    </span>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ACADEMY — The Learning Platform
// Cinema dark hero + course editor split → compliance dark section →
// certificate showcase → light quote → CTA
// ══════════════════════════════════════════════════════════════════════════════

function AcademyPage({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const mockupY = useTransform(heroScroll, [0, 1], [0, 60])
  const textOpacity = useTransform(heroScroll, [0, 0.5], [1, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 14 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 14 })
  const tiltX = useTransform(springY, [-500, 500], [3, -3])
  const tiltY = useTransform(springX, [-500, 500], [-4, 4])

  function handleHeroMouse(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - r.left - r.width / 2)
    mouseY.set(e.clientY - r.top - r.height / 2)
  }
  function handleHeroLeave() { mouseX.set(0); mouseY.set(0) }

  const courses = [
    { name: "HACCP Grundlagen",      lessons: 8,  duration: "45 Min",  pct: 100, color: "#3b82f6",  done: true },
    { name: "Brandschutz & Notfall", lessons: 5,  duration: "28 Min",  pct: 68,  color: "#8b5cf6",  done: false },
    { name: "Service Excellence",    lessons: 12, duration: "1.5 Std", pct: 35,  color: "#10b981",  done: false },
    { name: "Weinkenntnis & Pairing",lessons: 9,  duration: "55 Min",  pct: 0,   color: "#f59e0b",  done: false },
  ]

  const teamProgress = [
    { name: "Sandra K.",  init: "SK", color: "#6366f1", haccp: true,  brand: true,  serv: false },
    { name: "Thomas R.",  init: "TR", color: "#3b82f6", haccp: true,  brand: false, serv: true  },
    { name: "Maria H.",   init: "MH", color: "#10b981", haccp: true,  brand: true,  serv: true  },
    { name: "Anna S.",    init: "AS", color: "#f43f5e", haccp: false, brand: false, serv: false },
    { name: "Jonas M.",   init: "JM", color: "#8b5cf6", haccp: true,  brand: false, serv: false },
  ]

  return (
    <>
      {/* ══ HERO: Cinema-dark with floating browser mockup ══════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen bg-white overflow-hidden"
        onMouseMove={handleHeroMouse}
        onMouseLeave={handleHeroLeave}
      >
        <Grain opacity={0.02} />
        {/* Radial color blooms */}
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 75% 20%, ${product.colorHex}18 0%, transparent 55%), radial-gradient(ellipse at 15% 85%, ${product.colorHex}0c 0%, transparent 50%)` }} />

        <div className="relative z-10 mx-auto max-w-screen-xl px-6 sm:px-8 w-full">
          <div className="pt-12 pb-6">
            <BackLink />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-center pt-10 pb-24">
            {/* Left: Copy */}
            <motion.div style={{ opacity: textOpacity }}>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 text-[10px] font-mono font-semibold uppercase tracking-[0.28em] mb-10"
                style={{ color: `${product.colorHex}70` }}
              >
                <span className="size-1.5 rounded-full inline-block" style={{ background: product.colorHex }} />
                {product.license}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-[72px] sm:text-[96px] lg:text-[104px] font-normal leading-[0.88] tracking-tight text-gray-900 mb-8"
              >
                Schulungen,<br />
                <span className="text-gray-300 italic">die bleiben.</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.28 }}
                className="text-[18px] text-gray-500 leading-relaxed max-w-[340px] mb-10"
              >
                {product.description}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.38 }}
                className="flex flex-wrap items-center gap-3 mb-14"
              >
                <Link href="/login"
                  className="inline-flex items-center gap-2 h-12 px-8 rounded-full text-[14px] font-semibold text-[#060606] transition-all hover:opacity-90"
                  style={{ background: "#ffffff" }}>
                  Demo buchen <ArrowRight className="size-4" />
                </Link>
                <Link href={accountCtaHref}
                  className="inline-flex items-center h-12 px-7 rounded-full border border-gray-200 text-gray-500 text-[14px] font-medium hover:border-gray-300 hover:text-gray-700 transition-all">
                  {accountCtaLabel}
                </Link>
              </motion.div>
              {/* Stats */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.58 }}
                className="flex items-center gap-10 border-t border-gray-100 pt-8"
              >
                {product.stats.map(s => (
                  <div key={s.label}>
                    <p className="font-heading text-[30px] font-normal leading-none mb-1" style={{ color: product.colorHex }}>{s.value}</p>
                    <p className="text-[10px] text-gray-400">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: App mockup — full academy dashboard */}
            <motion.div style={{ y: mockupY }} className="flex justify-center lg:justify-end">
              <motion.div
                style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
                className="w-full max-w-[560px] relative"
              >
                {/* Glow */}
                <div aria-hidden className="absolute -inset-6 -z-10 rounded-2xl blur-[64px] opacity-30"
                  style={{ background: product.colorHex }} />
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-[18px] border border-gray-200/80 bg-white overflow-hidden"
                  style={{ boxShadow: "0 28px 80px -18px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.04)" }}
                >
                  {/* App bar */}
                  <div className="h-11 border-b border-gray-100 flex items-center px-5 gap-3 bg-gray-50">
                    <div className="size-5 rounded-md flex items-center justify-center shrink-0"
                      style={{ background: product.colorHex }}>
                      <GraduationCap className="size-3 text-white" />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700">Academy</span>
                    <ChevronRight className="size-3 text-gray-300" />
                    <span className="text-[11px] text-gray-400">Meine Schulungen</span>
                    <div className="flex-1" />
                    <div className="h-[22px] px-3 rounded-full text-[8.5px] font-semibold text-gray-500 border border-gray-200 bg-white flex items-center">
                      1 abgeschlossen
                    </div>
                  </div>

                  {/* Course list */}
                  <div className="p-4 space-y-2.5">
                    {courses.map((c, i) => (
                      <motion.div key={c.name}
                        initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
                        className="p-4 rounded-xl border border-gray-100 bg-white cursor-default"
                        style={c.done ? { borderColor: "rgba(16,185,129,0.18)", background: "rgba(16,185,129,0.04)" } : { boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}
                      >
                        <div className="flex items-center justify-between mb-2.5">
                          <div>
                            <p className="text-[12px] font-semibold text-gray-800">{c.name}</p>
                            <p className="text-[9.5px] text-gray-400 mt-0.5">{c.lessons} Lektionen · {c.duration}</p>
                          </div>
                          {c.done ? (
                            <div className="size-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                              <Check className="size-3.5 text-emerald-400" />
                            </div>
                          ) : (
                            <span className="text-[10.5px] font-mono text-gray-400">{c.pct}%</span>
                          )}
                        </div>
                        <div className="h-[3px] bg-gray-100 rounded-full overflow-hidden">
                          <motion.div className="h-full rounded-full"
                            style={{ background: c.done ? "#10b981" : c.color }}
                            initial={{ width: "0%" }}
                            animate={{ width: `${c.pct}%` }}
                            transition={{ delay: 0.75 + i * 0.12, duration: 1.4, ease: "easeOut" }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Certificate notification */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="mx-4 mb-4 flex items-center gap-3 p-4 rounded-xl"
                    style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.18)" }}
                  >
                    <div className="size-9 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Award className="size-4.5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[11.5px] font-semibold text-gray-800">Zertifikat ausgestellt</p>
                      <p className="text-[9.5px] text-gray-400">HACCP Grundlagen · Sandra Köhler · jetzt</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ KURS-EDITOR: Split ═══════════════════════════════════════════════════ */}
      <section className="py-36 sm:py-52 bg-white border-t border-gray-100 overflow-hidden">
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
            {/* Copy */}
            <FadeUp>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: product.colorHex }}>
                Kurs-Editor
              </p>
              <h2 className="font-heading text-[48px] sm:text-[66px] font-normal leading-[0.9] tracking-tight text-gray-900 mb-6">
                Kurse bauen<br />
                <span className="text-gray-300 italic">ohne IT.</span>
              </h2>
              <p className="text-[17px] text-gray-500 leading-relaxed max-w-[380px] mb-8">
                Lege Module und Lektionen per Drag & Drop an — Video, Rich Text oder Quiz. Reihenfolge jederzeit änderbar, Inhalte sofort live.
              </p>
              <ul className="space-y-3">
                {[
                  "Videos, Texte und Quiz-Module kombinieren",
                  "Drag & Drop — Reihenfolge in Sekunden ändern",
                  "Vorschau-Modus vor dem Veröffentlichen",
                ].map(f => (
                  <li key={f} className="flex items-center gap-3 text-[14px] text-gray-600">
                    <div className="size-[18px] rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${product.colorHex}18` }}>
                      <Check className="size-2.5" style={{ color: product.colorHex }} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </FadeUp>

            {/* Course builder mockup */}
            <FadeUp delay={0.14}>
              <div className="relative">
                <div aria-hidden className="absolute -inset-10 rounded-3xl blur-3xl opacity-12"
                  style={{ background: product.colorHex }} />
                <div className="relative rounded-2xl border border-gray-200/70 bg-white overflow-hidden"
                  style={{ boxShadow: "0 24px 72px -12px rgba(0,0,0,0.13), 0 0 0 1px rgba(0,0,0,0.04)" }}>
                  {/* App bar */}
                  <div className="h-11 border-b border-gray-100 flex items-center px-5 gap-2 bg-white">
                    <div className="size-5 rounded-md flex items-center justify-center shrink-0"
                      style={{ background: product.colorHex }}>
                      <GraduationCap className="size-3 text-white" />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700">HACCP Grundlagen</span>
                    <div className="ml-auto flex items-center gap-2">
                      <span className="text-[9px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">Entwurf</span>
                      <div className="h-[26px] px-3 rounded-md text-[9.5px] font-semibold text-white flex items-center cursor-default"
                        style={{ background: product.colorHex }}>
                        Veröffentlichen
                      </div>
                    </div>
                  </div>

                  {/* Lesson list */}
                  <div className="p-5 space-y-2">
                    {[
                      { type: "video",  label: "Einführung: Was ist HACCP?",           duration: "4:32",  done: true  },
                      { type: "text",   label: "Die 7 HACCP-Grundsätze im Überblick",   duration: "Lesen", done: true  },
                      { type: "quiz",   label: "Wissenscheck: Grundsätze",              duration: "5 Fr.", done: false, active: true },
                      { type: "video",  label: "Kritische Kontrollpunkte (CCPs)",       duration: "6:18",  done: false },
                      { type: "text",   label: "Temperaturprotokoll: Ausfüllhilfe",     duration: "Lesen", done: false },
                    ].map((lesson, i) => {
                      const iconMap = { video: "▶", text: "≡", quiz: "?" }
                      const colorMap = { video: "#2563eb", text: "#059669", quiz: "#8b5cf6" }
                      const bgMap = { video: "#dbeafe", text: "#dcfce7", quiz: "#ede9fe" }
                      return (
                        <motion.div key={lesson.label}
                          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-default",
                            lesson.active
                              ? "border border-gray-200 shadow-sm bg-white"
                              : lesson.done
                              ? "opacity-55"
                              : "hover:bg-gray-50/80"
                          )}
                        >
                          {/* Drag handle */}
                          <div className="flex flex-col gap-[3px] opacity-30 shrink-0">
                            <div className="w-2.5 h-px bg-gray-400 rounded-full" />
                            <div className="w-2.5 h-px bg-gray-400 rounded-full" />
                            <div className="w-2.5 h-px bg-gray-400 rounded-full" />
                          </div>
                          {/* Type badge */}
                          <div className="size-7 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                            style={{ background: bgMap[lesson.type as keyof typeof bgMap], color: colorMap[lesson.type as keyof typeof colorMap] }}>
                            {iconMap[lesson.type as keyof typeof iconMap]}
                          </div>
                          <span className="text-[10.5px] font-medium text-gray-800 flex-1 truncate">{lesson.label}</span>
                          <span className="text-[9px] text-gray-400 font-mono shrink-0">{lesson.duration}</span>
                          {lesson.done && <Check className="size-3 text-emerald-500 shrink-0" />}
                        </motion.div>
                      )
                    })}
                    {/* Add button */}
                    <div className="flex items-center gap-2 px-3 py-2 cursor-default">
                      <div className="size-7 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-300 text-[14px]">+</div>
                      <span className="text-[10px] text-gray-400">Lektion hinzufügen</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ PFLICHTSCHULUNGEN / COMPLIANCE (dark) ════════════════════════════════ */}
      <section className="py-36 sm:py-52 bg-white relative overflow-hidden border-t border-gray-100">
        <Grain opacity={0.02} />
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 50% 100%, ${product.colorHex}20 0%, transparent 55%)` }} />
        <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

            {/* Team progress table mockup */}
            <FadeUp>
              <div className="relative rounded-2xl overflow-hidden bg-white"
                style={{ border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 24px 72px -12px rgba(0,0,0,0.12)" }}>
                {/* Header */}
                <div className="h-11 flex items-center px-5 gap-2 bg-gray-50" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  <div className="size-5 rounded-md flex items-center justify-center" style={{ background: product.colorHex }}>
                    <BarChart3 className="size-3 text-white" />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-700">Team-Fortschritt</span>
                  <div className="ml-auto text-[9.5px] text-gray-400 font-mono">KW 15 · April 2026</div>
                </div>

                {/* Col header */}
                <div className="grid px-5 py-2 bg-gray-50"
                  style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                  {["Mitarbeitende", "HACCP", "Brandschutz", "Service"].map(h => (
                    <div key={h}>
                      <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-gray-400">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Rows */}
                {teamProgress.map((member, i) => (
                  <motion.div key={member.name}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    className="grid px-5 py-3"
                    style={{
                      gridTemplateColumns: "2fr 1fr 1fr 1fr",
                      borderBottom: i < teamProgress.length - 1 ? "1px solid rgba(0,0,0,0.04)" : undefined,
                      background: i === 3 ? "rgba(239,68,68,0.05)" : undefined,
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="size-[22px] rounded-full flex items-center justify-center text-[8px] font-bold text-white shrink-0"
                        style={{ background: member.color }}>{member.init}</div>
                      <span className="text-[10.5px] font-medium text-gray-700">{member.name}</span>
                    </div>
                    {([member.haccp, member.brand, member.serv] as boolean[]).map((done, j) => (
                      <div key={j} className="flex items-center">
                        {done
                          ? <div className="size-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                              <Check className="size-2.5 text-emerald-400" />
                            </div>
                          : <div className="size-5 rounded-full bg-red-500/15 flex items-center justify-center">
                              <span className="text-[8px] text-red-400 font-bold">–</span>
                            </div>
                        }
                      </div>
                    ))}
                  </motion.div>
                ))}

                {/* Footer stat */}
                <div className="flex items-center justify-between px-5 py-3 bg-gray-50">
                  <span className="text-[9.5px] text-gray-400">5 Mitarbeitende · 3 Pflichtschulungen</span>
                  <span className="text-[9.5px] font-semibold text-amber-400">2 ausstehend</span>
                </div>
              </div>
            </FadeUp>

            {/* Copy */}
            <FadeUp delay={0.14}>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: product.colorHex }}>
                Pflichtschulungen
              </p>
              <h2 className="font-heading text-[48px] sm:text-[64px] font-normal leading-[0.9] tracking-tight text-gray-900 mb-6">
                Wer hat was<br />
                <span className="text-gray-300 italic">abgeschlossen?</span>
              </h2>
              <p className="text-[17px] text-gray-500 leading-relaxed max-w-[380px] mb-8">
                Weise Kurse ganzen Teams als Pflicht zu. Academy trackt den Fortschritt automatisch — und erinnert, wer noch ausstehend ist.
              </p>
              <ul className="space-y-3">
                {[
                  "Automatische Erinnerungen bei Nichtabschluss",
                  "Zuweisung nach Rolle, Abteilung oder Team",
                  "Manager-Dashboard mit Live-Fortschritt",
                ].map(f => (
                  <li key={f} className="flex items-center gap-3 text-[14px] text-gray-600">
                    <div className="size-[18px] rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${product.colorHex}30` }}>
                      <Check className="size-2.5" style={{ color: product.colorHex }} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ ZERTIFIKATE: Split ════════════════════════════════════════════════════ */}
      <section className="py-36 sm:py-52 bg-white border-t border-gray-100 overflow-hidden">
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

            {/* Certificate mockup */}
            <FadeUp className="order-2 lg:order-1">
              <div className="relative">
                <div aria-hidden className="absolute -inset-10 rounded-3xl blur-3xl opacity-12" style={{ background: product.colorHex }} />
                {/* Certificate card */}
                <div className="relative rounded-2xl border border-gray-200/70 bg-white overflow-hidden"
                  style={{ boxShadow: "0 24px 72px -12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)" }}>
                  {/* Certificate body */}
                  <div className="px-8 pt-8 pb-6 text-center relative">
                    {/* Corner decoration */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl" style={{ background: product.colorHex }} />
                    <div className="size-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{ background: `${product.colorHex}14` }}>
                      <Award className="size-8" style={{ color: product.colorHex }} />
                    </div>
                    <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] mb-2 text-gray-400">Zertifikat der Teilnahme</p>
                    <h3 className="font-heading text-[22px] font-normal text-gray-900 mb-1">HACCP Grundlagen 2025</h3>
                    <p className="text-[13px] text-gray-500 mb-5">Berghotel Zugspitz · Hostpartners Academy</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 mb-5">
                      <div className="size-6 rounded-full bg-indigo-100 flex items-center justify-center text-[9px] font-bold text-indigo-700">SK</div>
                      <span className="text-[11.5px] font-semibold text-gray-700">Sandra Köhler</span>
                      <span className="text-[10px] text-gray-400">HR-Leiterin</span>
                    </div>
                    <div className="flex items-center justify-center gap-6 text-[10px] text-gray-400">
                      <div className="text-center">
                        <p className="font-semibold text-gray-700 text-[11px]">15. Apr 2025</p>
                        <p>Ausgestellt</p>
                      </div>
                      <div className="w-px h-6 bg-gray-100" />
                      <div className="text-center">
                        <p className="font-semibold text-amber-600 text-[11px]">15. Apr 2026</p>
                        <p>Gültig bis</p>
                      </div>
                      <div className="w-px h-6 bg-gray-100" />
                      <div className="text-center">
                        <p className="font-semibold text-gray-700 text-[11px]">8 Lektionen</p>
                        <p>Abgeschlossen</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom actions */}
                  <div className="border-t border-gray-100 px-6 py-3.5 flex items-center gap-3 bg-[#fafafa]">
                    <div className="h-7 px-3 rounded-md text-[9.5px] font-semibold text-white flex items-center cursor-default"
                      style={{ background: product.colorHex }}>PDF herunterladen</div>
                    <div className="h-7 px-3 rounded-md text-[9.5px] font-medium text-gray-600 border border-gray-200 flex items-center cursor-default">
                      In Personalakte
                    </div>
                    <div className="ml-auto text-[8.5px] text-gray-400 font-mono">ID: ACAD-2025-8847</div>
                  </div>
                </div>

                {/* Floating "saved to file" badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10, rotate: 1.5 }}
                  animate={{ opacity: 1, y: 0, rotate: 1.5 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute -bottom-4 -right-4 sm:-right-8 rounded-xl bg-white border border-gray-200 px-3.5 py-2.5 z-10"
                  style={{ boxShadow: "0 8px 28px rgba(0,0,0,0.1)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <CheckCircle2 className="size-3.5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-[9.5px] font-bold text-gray-800 leading-tight">In Personalakte gespeichert</p>
                      <p className="text-[8px] text-gray-400 leading-tight">Sandra Köhler · jetzt</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeUp>

            {/* Copy */}
            <FadeUp delay={0.12} className="order-1 lg:order-2">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: product.colorHex }}>
                Zertifikate & Nachweise
              </p>
              <h2 className="font-heading text-[48px] sm:text-[64px] font-normal leading-[0.9] tracking-tight text-gray-900 mb-6">
                Automatisch.<br />
                <span className="text-gray-300 italic">Rechtssicher.</span>
              </h2>
              <p className="text-[17px] text-gray-500 leading-relaxed max-w-[380px] mb-8">
                Jeder abgeschlossene Kurs erzeugt ein offizielles Zertifikat — digital signiert, mit Ablaufdatum und automatisch in der Personalakte gespeichert.
              </p>
              <ul className="space-y-3">
                {[
                  "PDF-Download und direkte Ablage in Persona",
                  "Ablauffristen mit automatischer Erinnerung",
                  "Audit-sichere Nachweiskette für Behörden",
                ].map(f => (
                  <li key={f} className="flex items-center gap-3 text-[14px] text-gray-600">
                    <div className="size-[18px] rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${product.colorHex}18` }}>
                      <Check className="size-2.5" style={{ color: product.colorHex }} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ QUOTE (light) ════════════════════════════════════════════════════════ */}
      {product.quote && (
        <section className="product-quote-section py-32 sm:py-44 bg-[#f8fafc] border-t border-gray-100 relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse at 50% 0%, ${product.colorHex}08 0%, transparent 55%)` }} />
          <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8">
            <FadeUp className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-1 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="font-heading text-[26px] sm:text-[40px] lg:text-[48px] font-normal leading-[1.08] text-gray-900 mb-10">
                &ldquo;{product.quote.text}&rdquo;
              </p>
              <div className="inline-flex items-center gap-4">
                <div className="size-10 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0"
                  style={{ background: "#3b82f6" }}>TR</div>
                <div className="text-left">
                  <p className="text-[13px] font-semibold text-gray-700">{product.quote.author}</p>
                  <p className="text-[11px] text-gray-400">{product.quote.role} · {product.quote.company}</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      <AcademyClosing product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// FLOW — Process & Onboarding Automation
// Always-light: editorial white hero + onboarding mockup →
// task-routing split → process timeline → template browser → quote → CTA
// ══════════════════════════════════════════════════════════════════════════════

function FlowPage({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const mockupY     = useTransform(heroScroll, [0, 1], [0, 55])
  const textOpacity = useTransform(heroScroll, [0, 0.5], [1, 0])

  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 42, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 42, damping: 15 })
  const tiltX   = useTransform(springY, [-500, 500], [3.5, -3.5])
  const tiltY   = useTransform(springX, [-500, 500], [-4.5, 4.5])

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - r.left - r.width / 2)
    mouseY.set(e.clientY - r.top  - r.height / 2)
  }
  function handleLeave() { mouseX.set(0); mouseY.set(0) }

  const timelineRef = useRef<HTMLDivElement>(null)
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" })

  const steps = [
    { label: "Profil anlegen",       icon: Users,         done: true  },
    { label: "Willkommens-Mail",     icon: MessageSquare, done: true  },
    { label: "IT-Zugang",            icon: Lock,          done: true  },
    { label: "HACCP-Schulung",       icon: GraduationCap, done: false, active: true },
    { label: "Kücheneinweisung",     icon: BookOpen,      done: false },
    { label: "Vertrag unterschreiben", icon: FileText,    done: false },
  ]

  const routing = [
    { task: "Profil in Persona anlegen",  assignee: "Sandra K.", role: "HR",       color: "#6366f1", init: "SK", delay: 0.2  },
    { task: "Laptop & Zugänge einrichten",assignee: "Lena M.",   role: "IT",       color: "#0ea5e9", init: "LM", delay: 0.35 },
    { task: "Willkommens-E-Mail",         assignee: "Sandra K.", role: "HR",       color: "#6366f1", init: "SK", delay: 0.5  },
    { task: "Erste Kücheneinweisung",     assignee: "Maria H.",  role: "Teamleitung", color: "#10b981", init: "MH", delay: 0.65 },
    { task: "HACCP-Schulung zuweisen",    assignee: "System",    role: "Automatisch", color: "#7c3aed", init: "FL", delay: 0.8  },
  ]

  const templates = [
    { name: "Koch / Küche",      tasks: 9,  duration: "5 Tage",   icon: "🍳", color: "#f97316" },
    { name: "Rezeptionist",      tasks: 11, duration: "7 Tage",   icon: "🛎", color: "#0ea5e9" },
    { name: "Servicekraft",      tasks: 8,  duration: "4 Tage",   icon: "🍷", color: "#8b5cf6" },
    { name: "Auszubildende",     tasks: 14, duration: "14 Tage",  icon: "📚", color: "#10b981" },
    { name: "Saisonkraft",       tasks: 6,  duration: "2 Tage",   icon: "⛅", color: "#06b6d4" },
    { name: "Schichtleitung",    tasks: 12, duration: "10 Tage",  icon: "⭐", color: "#f59e0b" },
  ]

  return (
    <>
      {/* ══ HERO — always white, split layout ══════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen bg-white overflow-hidden"
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
      >
        {/* Subtle violet glow — top right */}
        <div aria-hidden className="pointer-events-none absolute right-0 top-0 w-[70%] h-[65%]"
          style={{ background: `radial-gradient(ellipse at 85% 10%, ${product.colorHex}0e 0%, transparent 60%)` }} />
        <Grain opacity={0.022} />

        <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8 w-full">
          <div className="pt-12 pb-4"><BackLink /></div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-12 items-center pt-10 pb-28">
            {/* Left: copy */}
            <motion.div style={{ opacity: textOpacity }}>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.22em] mb-10"
                style={{ color: product.colorHex }}
              >
                <span className="size-1.5 rounded-full inline-block" style={{ background: product.colorHex }} />
                {product.license}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-[64px] sm:text-[84px] lg:text-[96px] font-normal leading-[0.88] tracking-tight text-gray-900 mb-8"
              >
                Onboarding,<br />das nichts<br />
                <span className="italic" style={{ color: `${product.colorHex}55` }}>vergisst.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.28 }}
                className="text-[17px] text-gray-500 leading-relaxed max-w-[340px] mb-10"
              >
                {product.description}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.38 }}
                className="flex flex-wrap items-center gap-3 mb-14"
              >
                <Link href="/login"
                  className="inline-flex items-center gap-2 h-12 px-8 rounded-full text-[14px] font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: product.colorHex, boxShadow: `0 8px 28px ${product.colorHex}40` }}>
                  Demo buchen <ArrowRight className="size-4" />
                </Link>
                <Link href={accountCtaHref}
                  className="inline-flex items-center h-12 px-7 rounded-full border border-gray-200 text-gray-500 text-[14px] font-medium hover:border-gray-300 hover:text-gray-700 transition-all">
                  {accountCtaLabel}
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                className="flex items-center gap-10 border-t border-gray-100 pt-8"
              >
                {product.stats.map(s => (
                  <div key={s.label}>
                    <p className="font-heading text-[30px] font-normal leading-none mb-1" style={{ color: product.colorHex }}>{s.value}</p>
                    <p className="text-[10.5px] text-gray-400">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: App mockup — onboarding checklist */}
            <motion.div style={{ y: mockupY }} className="flex justify-center lg:justify-end">
              <motion.div
                style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
                className="w-full max-w-[540px] relative"
              >
                {/* Glow halo */}
                <div aria-hidden className="absolute -inset-6 -z-10 rounded-2xl blur-[60px] opacity-25"
                  style={{ background: product.colorHex }} />

                <motion.div
                  initial={{ opacity: 0, y: 44, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.3, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-[20px] border border-gray-200/80 bg-white overflow-hidden"
                  style={{ boxShadow: "0 40px 100px -20px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)" }}
                >
                  {/* App bar */}
                  <div className="h-11 bg-[#f8f8fc] border-b border-gray-100 flex items-center px-5 gap-2.5">
                    <div className="size-5 rounded-md flex items-center justify-center shrink-0"
                      style={{ background: product.colorHex }}>
                      <GitBranch className="size-3 text-white" />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700">Flow</span>
                    <ChevronRight className="size-3 text-gray-300" />
                    <span className="text-[11px] text-gray-400">Onboarding: Maria Huber</span>
                    <div className="ml-auto flex items-center gap-1.5">
                      <div className="h-[22px] px-2.5 rounded-full text-[8.5px] font-semibold text-emerald-700 bg-emerald-50 flex items-center">3/6 erledigt</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 bg-gray-100">
                    <motion.div className="h-full rounded-r-full"
                      style={{ background: product.colorHex }}
                      initial={{ width: "0%" }}
                      animate={{ width: "50%" }}
                      transition={{ delay: 0.9, duration: 1.4, ease: "easeOut" }}
                    />
                  </div>

                  {/* Task list */}
                  <div className="p-4 space-y-1.5">
                    {steps.map((step, i) => {
                      const Icon = step.icon
                      return (
                        <motion.div key={step.label}
                          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.42, delay: 0.55 + i * 0.09 }}
                          className={cn(
                            "flex items-center gap-3 px-3.5 py-3 rounded-xl cursor-default",
                            step.active
                              ? "border border-gray-200 shadow-sm bg-white"
                              : step.done ? "opacity-50" : "hover:bg-gray-50/80"
                          )}
                          style={step.active ? { borderColor: `${product.colorHex}30`, background: `${product.colorHex}04` } : {}}
                        >
                          {/* Status icon */}
                          <div className={cn("size-6 rounded-full flex items-center justify-center shrink-0",
                            step.done ? "bg-emerald-100" : step.active ? "border-2" : "bg-gray-100"
                          )}
                            style={step.active ? { borderColor: product.colorHex } : {}}
                          >
                            {step.done
                              ? <Check className="size-3.5 text-emerald-600" />
                              : <Icon className="size-3" style={{ color: step.active ? product.colorHex : "#9ca3af" }} />
                            }
                          </div>
                          <span className={cn("text-[11px] flex-1 font-medium",
                            step.done ? "line-through text-gray-400" : step.active ? "text-gray-900" : "text-gray-500"
                          )}>{step.label}</span>
                          {step.active && (
                            <span className="text-[8.5px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: `${product.colorHex}14`, color: product.colorHex }}>Aktiv</span>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-100 px-5 py-3 flex items-center gap-3 bg-[#fafafa]">
                    <div className="size-6 rounded-full bg-indigo-100 flex items-center justify-center text-[8px] font-bold text-indigo-700">MH</div>
                    <span className="text-[10px] text-gray-500">Maria Huber · Neue Köchin · Tag 1</span>
                    <div className="ml-auto text-[9px] text-gray-400">Frist: 25. Apr</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ TASK ROUTING: Split ═══════════════════════════════════════════════════ */}
      <section className="py-36 sm:py-52 bg-white border-t border-gray-100 overflow-hidden">
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

            {/* Routing mockup */}
            <FadeUp>
              <div className="relative">
                <div aria-hidden className="absolute -inset-10 rounded-3xl blur-3xl opacity-10"
                  style={{ background: product.colorHex }} />
                <div className="relative rounded-2xl border border-gray-200/70 bg-white overflow-hidden"
                  style={{ boxShadow: "0 24px 72px -12px rgba(0,0,0,0.13), 0 0 0 1px rgba(0,0,0,0.04)" }}>

                  {/* App bar */}
                  <div className="h-11 border-b border-gray-100 flex items-center px-5 gap-2.5 bg-white">
                    <div className="size-5 rounded-md flex items-center justify-center shrink-0"
                      style={{ background: product.colorHex }}>
                      <GitBranch className="size-3 text-white" />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700">Aufgaben-Routing</span>
                    <div className="ml-auto text-[9px] text-gray-400 font-mono">automatisch verteilt</div>
                  </div>

                  {/* Routing items */}
                  <div className="p-5 space-y-2.5">
                    {routing.map((r, i) => (
                      <motion.div key={r.task}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.42, delay: r.delay }}
                        className="flex items-center gap-3.5 p-3.5 rounded-xl border border-gray-100 bg-white cursor-default"
                        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                      >
                        {/* Arrow connector */}
                        <div className="size-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `${product.colorHex}12` }}>
                          <GitBranch className="size-3.5" style={{ color: product.colorHex }} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-[10.5px] font-semibold text-gray-800 truncate">{r.task}</p>
                        </div>

                        {/* Arrow */}
                        <ArrowRight className="size-3 text-gray-300 shrink-0" />

                        {/* Assignee */}
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="size-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white shrink-0"
                            style={{ background: r.color }}>{r.init}</div>
                          <div className="text-right">
                            <p className="text-[9.5px] font-semibold text-gray-700 leading-tight">{r.assignee}</p>
                            <p className="text-[8px] text-gray-400 leading-tight">{r.role}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-100 px-5 py-3 bg-[#fafafa] flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[9.5px] text-gray-500">5 Aufgaben automatisch zugewiesen · 0 offen</span>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Copy */}
            <FadeUp delay={0.14}>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: product.colorHex }}>
                Aufgaben-Routing
              </p>
              <h2 className="font-heading text-[48px] sm:text-[66px] font-normal leading-[0.9] tracking-tight text-gray-900 mb-6">
                Jede Aufgabe<br />
                <span className="text-gray-300 italic">zur richtigen Person.</span>
              </h2>
              <p className="text-[17px] text-gray-500 leading-relaxed max-w-[380px] mb-8">
                Flow verteilt Onboarding-Aufgaben automatisch — IT richtet den Account ein, HR bereitet Verträge vor, der Teamleiter macht die Einweisung. Kein manuelles Zuweisen.
              </p>
              <ul className="space-y-3">
                {[
                  "Routing nach Rolle, Abteilung oder Person",
                  "Automatische Erinnerungen bei Verzögerung",
                  "Jeder sieht nur seine eigenen Aufgaben",
                ].map(f => (
                  <li key={f} className="flex items-center gap-3 text-[14px] text-gray-600">
                    <div className="size-[18px] rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${product.colorHex}18` }}>
                      <Check className="size-2.5" style={{ color: product.colorHex }} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ PROCESS TIMELINE (light section, full-width) ══════════════════════════ */}
      <section className="py-36 sm:py-52 overflow-hidden" style={{ background: "#f8fafc", borderTop: "1px solid #e5e7eb" }}>
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
          <FadeUp className="text-center mb-20">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: product.colorHex }}>
              Schritt für Schritt
            </p>
            <h2 className="font-heading text-[46px] sm:text-[68px] font-normal leading-[0.9] tracking-tight text-gray-900">
              Jeder Schritt.<br />
              <span className="text-gray-300 italic">Automatisch.</span>
            </h2>
          </FadeUp>

          {/* Timeline */}
          <div ref={timelineRef} className="relative max-w-4xl mx-auto">
            {/* Connecting line (horizontal on desktop) */}
            <div className="hidden lg:block absolute top-8 left-8 right-8 h-px bg-gray-200 overflow-hidden">
              <motion.div className="h-full origin-left"
                style={{ background: product.colorHex }}
                initial={{ scaleX: 0 }}
                animate={timelineInView ? { scaleX: 1 } : {}}
                transition={{ duration: 2.2, delay: 0.3, ease: "easeInOut" }}
              />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div key={step.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.35 + i * 0.18, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className={cn(
                      "size-16 rounded-full border-2 flex items-center justify-center mb-4 relative z-10 bg-white",
                      step.done
                        ? "border-emerald-400"
                        : step.active
                        ? "border-[3px] shadow-lg"
                        : "border-gray-200"
                    )}
                      style={step.active ? { borderColor: product.colorHex, boxShadow: `0 0 0 6px ${product.colorHex}12` } : {}}
                    >
                      {step.done
                        ? <Check className="size-5 text-emerald-500" />
                        : <Icon className="size-5" style={{ color: step.active ? product.colorHex : "#d1d5db" }} />
                      }
                    </div>
                    <p className={cn("text-[11px] font-semibold leading-snug",
                      step.done ? "text-gray-400" : step.active ? "text-gray-900" : "text-gray-400"
                    )}>
                      {step.label}
                    </p>
                    {step.active && (
                      <span className="mt-1.5 text-[8.5px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: `${product.colorHex}14`, color: product.colorHex }}>Aktiv</span>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEMPLATES: Split ═════════════════════════════════════════════════════ */}
      <section className="py-36 sm:py-52 bg-white border-t border-gray-100 overflow-hidden">
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">

            {/* Copy */}
            <FadeUp className="lg:sticky lg:top-28">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: product.colorHex }}>
                Prozess-Templates
              </p>
              <h2 className="font-heading text-[48px] sm:text-[64px] font-normal leading-[0.9] tracking-tight text-gray-900 mb-6">
                Sofort starten.<br />
                <span className="text-gray-300 italic">Dann anpassen.</span>
              </h2>
              <p className="text-[17px] text-gray-500 leading-relaxed max-w-[380px] mb-8">
                Starte mit fertigen Onboarding-Vorlagen für die häufigsten Rollen in Hotellerie und Gastronomie — und passe sie per Drag & Drop an.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Aufgabenreihenfolge per Drag & Drop",
                  "Zuständige pro Aufgabe fest hinterlegen",
                  "Template für neue Mitarbeitende wiederverwenden",
                ].map(f => (
                  <li key={f} className="flex items-center gap-3 text-[14px] text-gray-600">
                    <div className="size-[18px] rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${product.colorHex}18` }}>
                      <Check className="size-2.5" style={{ color: product.colorHex }} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              {/* Stats */}
              <div className="flex items-center gap-8 border-t border-gray-100 pt-8">
                {product.stats.map(s => (
                  <div key={s.label}>
                    <p className="font-heading text-[28px] font-normal leading-none mb-1" style={{ color: product.colorHex }}>{s.value}</p>
                    <p className="text-[10.5px] text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Template cards */}
            <FadeUp delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((t, i) => (
                  <motion.div key={t.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3, boxShadow: "0 16px 48px rgba(0,0,0,0.09)" }}
                    className="p-5 rounded-2xl border border-gray-100 bg-white cursor-default"
                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                  >
                    {/* Icon */}
                    <div className="size-10 rounded-xl flex items-center justify-center mb-4 text-[20px]"
                      style={{ background: `${t.color}14` }}>
                      {t.icon}
                    </div>
                    <p className="text-[13px] font-semibold text-gray-900 mb-1">{t.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[9.5px] text-gray-400">{t.tasks} Aufgaben</span>
                      <span className="text-gray-200">·</span>
                      <span className="text-[9.5px] text-gray-400">{t.duration}</span>
                    </div>
                    {/* Mini progress bar decoration */}
                    <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full w-[65%]" style={{ background: t.color }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ QUOTE (light) ════════════════════════════════════════════════════════ */}
      <section className="py-32 sm:py-44 border-t border-gray-100 relative overflow-hidden" style={{ background: "#f8fafc" }}>
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${product.colorHex}07 0%, transparent 55%)` }} />
        <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8">
          <FadeUp className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-1 mb-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="font-heading text-[26px] sm:text-[40px] lg:text-[48px] font-normal leading-[1.08] text-gray-900 mb-10">
              &ldquo;Neue Mitarbeitende wissen vom ersten Tag genau, was auf sie zukommt. Der Onboarding-Stress ist weg — und nichts fällt mehr durchs Raster.&rdquo;
            </p>
            <div className="inline-flex items-center gap-4">
              <div className="size-10 rounded-full bg-violet-100 flex items-center justify-center text-[12px] font-bold text-violet-700 shrink-0">KM</div>
              <div className="text-left">
                <p className="text-[13px] font-semibold text-gray-700">Klaus M.</p>
                <p className="text-[11px] text-gray-400">Betriebsleiter · Hotel Vier Jahreszeiten, 210 MA</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <FlowClosing product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// TEMPO — Time Tracking & Leave Management
// Always-light hero with running timer mockup → stamp timeline split →
// team leave calendar → ArbZG dark compliance → quote → CTA
// ══════════════════════════════════════════════════════════════════════════════

function TempoPage({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const [elapsed, setElapsed] = useState(9480) // start at 2h 38m
  useEffect(() => {
    const t = setInterval(() => setElapsed(p => p + 1), 1000)
    return () => clearInterval(t)
  }, [])
  const eh = String(Math.floor(elapsed / 3600)).padStart(2, "0")
  const em = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0")
  const es = String(elapsed % 60).padStart(2, "0")

  const weekBars: { day: string; h: number; today?: boolean }[] = [
    { day: "Mo", h: 9.2 }, { day: "Di", h: 7.5 }, { day: "Mi", h: 10.5 },
    { day: "Do", h: Math.min(elapsed / 3600, 10), today: true },
    { day: "Fr", h: 0 }, { day: "Sa", h: 0 }, { day: "So", h: 0 },
  ]

  const teamLeaves: { name: string; init: string; color: string; leaves: { s: number; e: number; type: string }[] }[] = [
    { name: "S. Köhler",  init: "SK", color: "#6366f1", leaves: [{ s: 7,  e: 11, type: "U" }] },
    { name: "T. Richter", init: "TR", color: "#3b82f6", leaves: [{ s: 14, e: 18, type: "U" }] },
    { name: "M. Huber",   init: "MH", color: "#10b981", leaves: [{ s: 1,  e: 3,  type: "K" }] },
    { name: "A. Schmidt", init: "AS", color: "#f43f5e", leaves: [{ s: 22, e: 30, type: "E" }] },
    { name: "J. Müller",  init: "JM", color: "#8b5cf6", leaves: [{ s: 9,  e: 9,  type: "K" }] },
  ]
  const leaveColor: Record<string, string> = { U: product.colorHex, K: "#ef4444", E: "#8b5cf6" }
  const dailyHours = [9.2, 7.5, 10.5, 8.3, 0, 0, 0]

  return (
    <>
      {/* ══ HERO ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen bg-white overflow-hidden flex flex-col">
        {/* Orange-tinted dot grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, #fed7aa 1px, transparent 1px)",
          backgroundSize: "28px 28px", opacity: 0.25,
        }} />
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 65% 60% at 18% 42%, white 28%, transparent 70%)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse 50% 45% at 95% -5%, ${product.colorHex}10 0%, transparent 60%)` }} />
        <Grain opacity={0.015} />

        <div className="relative z-10 mx-auto max-w-screen-xl px-6 sm:px-8 w-full flex-1 flex flex-col">
          <div className="pt-12"><BackLink /></div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-12 items-center pt-8 pb-28 flex-1">

            {/* LEFT: Copy */}
            <div>
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] mb-9"
                style={{ color: product.colorHex }}>
                <span className="size-[5px] rounded-full" style={{ background: product.colorHex }} />
                {product.license}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.13, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-[68px] sm:text-[88px] lg:text-[100px] font-normal leading-[0.88] tracking-tight mb-7"
                style={{ color: "oklch(0.21 0 0)" }}
              >
                Zeit,<br />
                <span className="italic" style={{ color: `${product.colorHex}50` }}>die zählt.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.24 }}
                className="text-[17px] text-gray-500 leading-relaxed max-w-[300px] mb-10">
                Zeiterfassung, Urlaubsmanagement und Überstundenkonten — rechtssicher und vollautomatisch.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.33 }}
                className="flex items-center gap-3 mb-12">
                <Link href="/login"
                  className="inline-flex items-center gap-2.5 h-11 px-7 rounded-full text-[13.5px] font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: product.colorHex, boxShadow: `0 6px 24px ${product.colorHex}40` }}>
                  Demo buchen <ArrowRight className="size-3.5" />
                </Link>
                <Link href={accountCtaHref}
                  className="inline-flex items-center h-11 px-6 rounded-full border border-gray-200 text-gray-500 text-[13.5px] font-medium hover:border-gray-300 hover:text-gray-700 transition-all">
                  {accountCtaLabel}
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.48 }}
                className="flex items-center gap-8 pt-7 border-t border-gray-100">
                {product.stats.map(s => (
                  <div key={s.label}>
                    <p className="font-heading text-[30px] font-normal text-gray-900 leading-none mb-1">{s.value}</p>
                    <p className="text-[10.5px] text-gray-400">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT: App mockup */}
            <div className="hidden lg:flex justify-end">
              <motion.div className="relative w-full max-w-[620px]">

                {/* Badge 1: active stamp */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -top-5 -left-6 z-20 bg-white rounded-xl border border-gray-200 px-3.5 py-2.5 flex items-center gap-2.5"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}>
                  <div className="size-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <div>
                    <p className="text-[9.5px] font-bold text-gray-800 leading-tight">Eingestempelt 07:02</p>
                    <p className="text-[8px] text-gray-400 leading-tight">Frühschicht läuft</p>
                  </div>
                </motion.div>

                {/* Badge 2: weekly hours */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -bottom-4 -right-4 z-20 bg-white rounded-xl border border-gray-200 px-3.5 py-2.5 flex items-center gap-2.5"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}>
                  <div className="size-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${product.colorHex}14` }}>
                    <Clock className="size-3.5" style={{ color: product.colorHex }} />
                  </div>
                  <div>
                    <p className="text-[9.5px] font-bold text-gray-800 leading-tight">34,5 Std diese Woche</p>
                    <p className="text-[8px] text-gray-400 leading-tight">5,5 bis zum Soll</p>
                  </div>
                </motion.div>

                {/* Glow */}
                <div aria-hidden className="absolute -inset-6 -z-10 rounded-2xl blur-[72px] opacity-20"
                  style={{ background: product.colorHex }} />

                {/* Mockup window */}
                <motion.div
                  initial={{ opacity: 0, y: 52, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-[20px] bg-white overflow-hidden"
                  style={{ boxShadow: "0 40px 100px -20px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)" }}
                >
                  {/* Browser chrome */}
                  <div className="h-10 bg-[#f5f5f7] border-b border-gray-200/70 flex items-center px-4 gap-1.5">
                    <div className="size-[11px] rounded-full bg-[#ff5f57]" />
                    <div className="size-[11px] rounded-full bg-[#ffbd2e]" />
                    <div className="size-[11px] rounded-full bg-[#28c840]" />
                    <div className="mx-3 flex-1 h-[22px] max-w-[240px] rounded-md bg-white border border-gray-200/60 flex items-center px-2.5 gap-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
                      <div className="size-[7px] rounded-full opacity-60" style={{ background: product.colorHex }} />
                      <span className="text-[9px] text-gray-400 font-mono truncate">dashboard.hostpartners.de/berghotel/time</span>
                    </div>
                  </div>

                  {/* Sidebar + content */}
                  <div className="flex" style={{ height: 430 }}>

                    {/* Sidebar */}
                    <div className="w-[152px] border-r border-gray-100 bg-[#fafafa] flex flex-col shrink-0 p-2.5">
                      <p className="text-[7px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1.5 px-1.5">Zeiterfassung</p>
                      {(["Heute", "Diese Woche", "Berichte", "Urlaub", "Mein Team"] as const).map((label, ni) => {
                        const navIcons = [Clock, CalendarDays, BarChart3, CalendarDays, Users]
                        const NavIcon = navIcons[ni]
                        const active = ni === 0
                        return (
                          <div key={label}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-lg mb-0.5 cursor-default text-[9px] font-medium"
                            style={active ? { background: `${product.colorHex}12`, color: product.colorHex } : { color: "#9ca3af" }}>
                            <NavIcon className="size-3 shrink-0" />
                            {label}
                          </div>
                        )
                      })}
                    </div>

                    {/* Main content */}
                    <div className="flex-1 overflow-hidden flex flex-col">

                      {/* Active timer */}
                      <div className="px-5 pt-4 pb-3 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9.5px] font-semibold text-gray-600">Aktive Zeiterfassung</span>
                          <span className="inline-flex items-center gap-1 text-[8px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                            Läuft
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1.5 mb-2">
                          <span className="font-mono text-[34px] font-bold text-gray-900 tracking-tighter tabular-nums leading-none">{eh}:{em}</span>
                          <span className="font-mono text-[20px] font-normal tracking-tight tabular-nums leading-none"
                            style={{ color: `${product.colorHex}85` }}>:{es}</span>
                          <span className="text-[8.5px] text-gray-400 ml-auto self-end pb-0.5">Frühschicht · seit 07:02</span>
                        </div>
                        <div className="h-[3px] rounded-full bg-gray-100 overflow-hidden">
                          <motion.div className="h-full rounded-full" style={{ background: product.colorHex }}
                            initial={{ width: "0%" }}
                            animate={{ width: `${Math.min((elapsed / 28800) * 100, 100)}%` }}
                            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <div className="flex justify-between mt-0.5">
                          <span className="text-[7px] text-gray-400">0h</span>
                          <span className="text-[7px] text-gray-400">Soll: 8h</span>
                        </div>
                      </div>

                      {/* Today's entries */}
                      <div className="flex-1 px-4 py-3 overflow-hidden">
                        <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-gray-400 mb-2">Donnerstag, 17. April</p>
                        <div className="space-y-1.5">
                          {[
                            { start: "07:02", end: "laufend", dur: `${eh}:${em}h`, tag: "Frühschicht", active: true },
                            { start: "09:30", end: "10:00",   dur: "0:30h",        tag: "Pause",       active: false },
                          ].map((entry, i) => (
                            <motion.div key={i}
                              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.85 + i * 0.07 }}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border"
                              style={entry.active
                                ? { background: `${product.colorHex}07`, borderColor: `${product.colorHex}20` }
                                : { background: "white", borderColor: "#f3f4f6" }}>
                              <div className="w-[2.5px] h-7 rounded-full shrink-0"
                                style={{ background: entry.active ? product.colorHex : "#e5e7eb" }} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[9.5px] font-semibold text-gray-800">{entry.tag}</span>
                                  {entry.active && <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                                </div>
                                <span className="text-[8px] text-gray-400 font-mono">{entry.start} – {entry.end}</span>
                              </div>
                              <span className="text-[9.5px] font-mono font-semibold shrink-0"
                                style={{ color: entry.active ? product.colorHex : "#9ca3af" }}>{entry.dur}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Mini week chart */}
                      <div className="border-t border-gray-100 px-4 py-2.5">
                        <div className="flex items-end gap-1.5" style={{ height: 44 }}>
                          {weekBars.map((d, i) => {
                            const pct = d.h > 0 ? Math.min((d.h / 10) * 100, 100) : 0
                            return (
                              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                                <div className="w-full rounded-t-sm bg-gray-100 relative overflow-hidden" style={{ height: 32 }}>
                                  <motion.div className="absolute bottom-0 left-0 right-0 rounded-t-sm"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${pct}%` }}
                                    transition={{ delay: 0.9 + i * 0.06, duration: 0.6, ease: "easeOut" }}
                                    style={{ background: d.today ? product.colorHex : d.h > 0 ? `${product.colorHex}70` : "transparent" }}
                                  />
                                </div>
                                <span className="text-[6.5px] text-gray-400 font-mono">{d.day}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status bar */}
                  <div className="h-8 border-t border-gray-100 bg-[#fafafa] flex items-center px-5 gap-4">
                    <span className="text-[8.5px] text-gray-500">KW 16 · 34,5 / 40 Std Soll</span>
                    <div className="ml-auto flex items-center gap-1.5">
                      <div className="size-1.5 rounded-full animate-pulse bg-emerald-500" />
                      <span className="text-[8.5px] text-gray-500">ArbZG-konform</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ ZEITERFASSUNG SPLIT ═════════════════════════════════════════════════ */}
      <section className="bg-white py-32 sm:py-48 overflow-hidden">
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left: Stamp timeline card */}
            <FadeUp className="order-2 lg:order-1">
              <div className="relative">
                <div aria-hidden className="absolute -inset-10 blur-3xl opacity-10 rounded-3xl"
                  style={{ background: product.colorHex }} />
                <div className="relative rounded-2xl overflow-hidden border border-gray-200/70"
                  style={{ boxShadow: "0 24px 72px -12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)" }}>

                  {/* Card header */}
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-xl flex items-center justify-center"
                        style={{ background: `${product.colorHex}15` }}>
                        <Clock className="size-4" style={{ color: product.colorHex }} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-800">Sandra Köhler</p>
                        <p className="text-[9.5px] text-gray-400">Donnerstag, 17. April 2026</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                      <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Aktiv eingestempelt
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-white px-6 py-5">
                    <div className="relative pl-8">
                      <div className="absolute left-3 top-2 bottom-2 w-[2px] bg-gray-100 rounded-full" />
                      {[
                        { time: "07:02", label: "Eingestempelt",     sub: "Frühschicht",    filled: true,  color: product.colorHex },
                        { time: "09:30", label: "Pause begonnen",    sub: "30 Minuten",     filled: true,  color: "#d1d5db" },
                        { time: "10:00", label: "Weitergestempelt",  sub: "nach Pause",     filled: true,  color: product.colorHex },
                        { time: "--:--", label: "Ausstempeln geplant", sub: "∼15:00 Uhr",  filled: false, color: "#d1d5db" },
                      ].map((ev, i) => (
                        <div key={i} className="flex items-start gap-4 mb-5 last:mb-0 relative">
                          <div className="size-2.5 rounded-full border-2 absolute -left-[22px] top-1 shrink-0"
                            style={ev.filled
                              ? { background: ev.color, borderColor: ev.color }
                              : { background: "white", borderColor: "#d1d5db" }} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-[10px] font-semibold text-gray-800">{ev.label}</p>
                              <span className="font-mono text-[10px] text-gray-400 shrink-0">{ev.time}</span>
                            </div>
                            <p className="text-[9px] text-gray-400">{ev.sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Duration row */}
                  <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">Bisherige Arbeitszeit heute</span>
                    <span className="font-mono text-[16px] font-bold tabular-nums" style={{ color: product.colorHex }}>
                      {eh}:{em}:{es}
                    </span>
                  </div>

                  {/* Stamp button */}
                  <div className="px-6 py-4 bg-white">
                    <div className="w-full h-11 rounded-2xl flex items-center justify-center gap-2.5 text-white text-[13px] font-semibold cursor-default"
                      style={{ background: `linear-gradient(135deg, ${product.colorHex}ee, ${product.colorHex}bb)`, boxShadow: `0 6px 20px ${product.colorHex}35` }}>
                      <div className="size-4 rounded-full border-2 border-white/50 flex items-center justify-center">
                        <div className="size-1.5 rounded-full bg-white" />
                      </div>
                      Jetzt Ausstemp.
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Right: Copy */}
            <FadeUp delay={0.1} className="order-1 lg:order-2">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] mb-5"
                style={{ color: product.colorHex }}>Zeiterfassung</p>
              <h2 className="font-heading text-[44px] sm:text-[58px] lg:text-[68px] font-normal leading-[0.9] tracking-tight text-gray-900 mb-6">
                Stempeln.<br />
                <span className="italic text-gray-200">Überall.</span>
              </h2>
              <p className="text-[16px] text-gray-500 leading-relaxed mb-10 max-w-sm">
                Per Klick im Browser, per App auf dem Smartphone oder per NFC-Terminal — jeder Stempel landet sofort und sekundengenau in Hostpartners.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Clock,        title: "Echtzeit-Stempel",      body: "Sekundengenau eingestempelt. Keine manuelle Nachbearbeitung mehr." },
                  { icon: Shield,       title: "ArbZG-Konformität",      body: "Pausenregeln und Höchstzeiten werden automatisch überwacht." },
                  { icon: BarChart3,    title: "Überstundenkonten",      body: "Gleitzeitkonto mit automatischer Mehr- und Minusstundenberechnung." },
                  { icon: RefreshCw,    title: "Korrekturen per Antrag", body: "Vergessene Stempel können per Antrag nachträglich korrigiert werden." },
                ].map((f, i) => {
                  const FIcon = f.icon
                  return (
                    <FadeUp key={f.title} delay={0.18 + i * 0.07}>
                      <div className="flex items-start gap-3.5">
                        <div className="size-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border border-gray-100 bg-gray-50">
                          <FIcon className="size-3.5 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-gray-800 mb-0.5">{f.title}</p>
                          <p className="text-[12px] text-gray-500 leading-relaxed">{f.body}</p>
                        </div>
                      </div>
                    </FadeUp>
                  )
                })}
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ══ URLAUBSKALENDER ═══════════════════════════════════════════════════════ */}
      <section className="product-soft-section bg-[#faf9f7] py-32 sm:py-48 overflow-hidden">
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-16 lg:gap-20 items-start">

            {/* Copy — sticky */}
            <FadeUp className="lg:sticky lg:top-32">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] mb-5"
                style={{ color: product.colorHex }}>Urlaubsverwaltung</p>
              <h2 className="font-heading text-[44px] sm:text-[58px] lg:text-[66px] font-normal leading-[0.9] tracking-tight text-gray-900 mb-6">
                Urlaub.<br />
                <span className="italic text-gray-200">Transparent.</span>
              </h2>
              <p className="text-[15px] text-gray-500 leading-relaxed mb-8 max-w-xs">
                Anträge stellen, genehmigen und ablehnen — der Kalender zeigt immer, wer wann da ist.
              </p>
              <div className="space-y-2.5">
                {[
                  { label: "Urlaub",     color: product.colorHex },
                  { label: "Krank",      color: "#ef4444" },
                  { label: "Elternzeit", color: "#8b5cf6" },
                ].map(l => (
                  <div key={l.label} className="flex items-center gap-2.5">
                    <div className="size-2.5 rounded-sm" style={{ background: l.color }} />
                    <span className="text-[12px] text-gray-500">{l.label}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Calendar widget */}
            <FadeUp delay={0.1}>
              <div className="rounded-2xl border border-gray-200/70 overflow-hidden bg-white"
                style={{ boxShadow: "0 12px 40px -8px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.04)" }}>

                {/* Header */}
                <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-[13px] font-bold text-gray-800">April 2026</span>
                  <span className="text-[9.5px] text-gray-400">5 Mitarbeitende · max. 2 gleichzeitig</span>
                </div>

                {/* Day numbers */}
                <div className="border-b border-gray-100 px-5 py-1.5">
                  <div className="flex gap-0" style={{ marginLeft: 92 }}>
                    {Array.from({ length: 30 }, (_, i) => (
                      <div key={i} className="flex-1 text-center">
                        <span className="text-[6.5px] font-mono"
                          style={{ color: i === 16 ? product.colorHex : "#d1d5db", fontWeight: i === 16 ? 700 : 400 }}>
                          {(i + 1).toString().padStart(2, "0")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-gray-100/60">
                  {teamLeaves.map((member, mi) => (
                    <motion.div key={member.name}
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + mi * 0.07 }}
                      className="flex items-center px-5 py-2"
                    >
                      <div className="flex items-center gap-2 shrink-0" style={{ width: 88 }}>
                        <div className="size-5 rounded-full flex items-center justify-center text-[7px] font-bold text-white shrink-0"
                          style={{ background: member.color }}>{member.init}</div>
                        <span className="text-[9px] font-medium text-gray-600 truncate">{member.name.split(" ")[0]}</span>
                      </div>
                      <div className="flex flex-1 gap-0">
                        {Array.from({ length: 30 }, (_, di) => {
                          const day = di + 1
                          const leave = member.leaves.find(r => day >= r.s && day <= r.e)
                          const isStart = leave?.s === day
                          const isEnd   = leave?.e === day
                          return (
                            <div key={day} className="flex-1 h-7 relative">
                              {leave && (
                                <div className="absolute inset-y-[4px] left-0 right-0"
                                  style={{
                                    background: `${leaveColor[leave.type]}cc`,
                                    borderRadius: isStart && isEnd ? 4 : isStart ? "4px 0 0 4px" : isEnd ? "0 4px 4px 0" : 0,
                                    marginLeft: isStart ? 1 : 0,
                                    marginRight: isEnd ? 1 : 0,
                                  }} />
                              )}
                              {day === 17 && (
                                <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
                                  style={{ background: `${product.colorHex}40` }} />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50/50 flex items-center gap-4">
                  <span className="text-[9px] text-gray-400">15 Urlaubstage offen · 3 Anträge ausstehend</span>
                  <div className="ml-auto flex items-center gap-1.5">
                    <Check className="size-3 text-emerald-500" />
                    <span className="text-[9px] text-gray-500">Keine Engpässe erkannt</span>
                  </div>
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ══ ArbZG DARK ════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-32 sm:py-48 overflow-hidden relative border-t border-gray-100 dark:border-white/10 dark:bg-[#141416]">
        <Grain opacity={0.02} />
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse 55% 60% at 100% 50%, ${product.colorHex}12 0%, transparent 60%)` }} />

        <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left: Copy */}
            <FadeUp>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] mb-7"
                style={{ color: product.colorHex }}>Arbeitszeitgesetz</p>
              <h2 className="font-heading text-[44px] sm:text-[62px] lg:text-[72px] font-normal leading-[0.88] tracking-tight text-gray-900 mb-8">
                ArbZG.<br />
                <span className="italic text-gray-300">Automatisch.</span>
              </h2>
              <p className="text-[16px] leading-relaxed mb-12 max-w-sm text-gray-500">
                Tempo überwacht Ruhezeiten, Pausenregeln und Wochenhöchststunden automatisch — bevor eine Verletzung entsteht.
              </p>
              <div className="space-y-5">
                {[
                  { icon: Clock,     title: "Maximal 10h / Tag",         body: "Überschreitungen werden sofort erkannt und protokolliert." },
                  { icon: Shield,    title: "11h Mindestruhezeit",        body: "Automatische Prüfung zwischen Schichtende und -beginn." },
                  { icon: BarChart3, title: "48h / Woche als Schwelle",   body: "Gleitzeitkonto warnt bevor gesetzliche Grenzen überschritten werden." },
                ].map((p, i) => {
                  const PIcon = p.icon
                  return (
                    <FadeUp key={p.title} delay={0.1 + i * 0.09}>
                      <div className="flex items-start gap-4">
                        <div className="size-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${product.colorHex}20`, border: `1px solid ${product.colorHex}30` }}>
                          <PIcon className="size-4" style={{ color: product.colorHex }} />
                        </div>
                        <div>
                          <p className="text-[13.5px] font-semibold mb-1 text-gray-800">{p.title}</p>
                          <p className="text-[12.5px] leading-relaxed text-gray-500">{p.body}</p>
                        </div>
                      </div>
                    </FadeUp>
                  )
                })}
              </div>
            </FadeUp>

            {/* Right: Daily hours visualization */}
            <FadeUp delay={0.15}>
              <div className="relative">
                <div aria-hidden className="absolute -inset-8 blur-3xl opacity-15 rounded-2xl"
                  style={{ background: product.colorHex }} />
                <div className="relative rounded-2xl overflow-hidden"
                  style={{ background: "#ffffff", border: "1px solid rgba(15,23,42,0.08)", boxShadow: "0 28px 64px rgba(15,23,42,0.1)" }}>

                  {/* Header */}
                  <div className="px-5 py-3.5 border-b flex items-center gap-3"
                    style={{ borderColor: "rgba(15,23,42,0.08)", background: "#f8fafc" }}>
                    <div className="size-5 rounded-md flex items-center justify-center"
                      style={{ background: `${product.colorHex}28` }}>
                      <BarChart3 className="size-3" style={{ color: product.colorHex }} />
                    </div>
                    <span className="text-[11px] font-semibold" style={{ color: "#64748b" }}>
                      Tagesarbeitszeiten — KW 16
                    </span>
                    <div className="ml-auto">
                      <span className="text-[8.5px] px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: "rgba(239,68,68,0.15)", color: "rgba(239,68,68,0.9)", border: "1px solid rgba(239,68,68,0.2)" }}>
                        1 Überschreitung
                      </span>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="px-6 py-6">
                    <div className="relative" style={{ height: 180 }}>
                      {/* Reference lines */}
                      {[{ h: 10, label: "10h Max.", color: "rgba(239,68,68,0.42)" }, { h: 8, label: "8h Soll", color: "rgba(148,163,184,0.42)" }].map(line => (
                        <div key={line.h} className="absolute left-0 right-0 flex items-center gap-2"
                          style={{ bottom: `${(line.h / 12) * 100}%` }}>
                          <div className="flex-1 border-t border-dashed" style={{ borderColor: line.color }} />
                          <span className="text-[7.5px] font-mono shrink-0" style={{ color: line.color }}>{line.label}</span>
                        </div>
                      ))}

                      {/* Bars */}
                      <div className="absolute inset-0 flex items-end gap-3">
                        {(["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"] as const).map((d, i) => {
                          const h = dailyHours[i]
                          const pct = (h / 12) * 100
                          const isOver  = h > 10
                          const isToday = i === 3
                          return (
                            <div key={d} className="flex-1 flex flex-col items-center gap-1.5">
                              <div className="w-full relative flex items-end" style={{ height: 160 }}>
                                <motion.div className="w-full rounded-t-md"
                                  initial={{ height: 0 }}
                                  animate={{ height: `${pct}%` }}
                                  transition={{ delay: 0.4 + i * 0.07, duration: 0.7, ease: "easeOut" }}
                                  style={{
                                    background: isOver
                                      ? "linear-gradient(to top, rgba(239,68,68,0.85), rgba(239,68,68,0.5))"
                                      : isToday
                                      ? `linear-gradient(to top, ${product.colorHex}, ${product.colorHex}99)`
                                      : "linear-gradient(to top, rgba(191,219,254,0.92), rgba(125,211,252,0.78))",
                                    boxShadow: isOver
                                      ? "0 0 20px rgba(239,68,68,0.25)"
                                      : isToday ? `0 0 20px ${product.colorHex}30` : "none",
                                    border: "1px solid rgba(148,163,184,0.14)",
                                  }}
                                />
                              </div>
                              {h > 0 && (
                                <span className="text-[7.5px] font-mono"
                                  style={{ color: isOver ? "rgba(239,68,68,0.8)" : "#64748b" }}>
                                  {h.toFixed(1)}h
                                </span>
                              )}
                              <span className="text-[7.5px] font-mono" style={{ color: "#94a3b8" }}>{d}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 border-t flex items-center"
                    style={{ borderColor: "rgba(15,23,42,0.08)", background: "#f8fafc" }}>
                    <span className="text-[9px] font-mono" style={{ color: "#64748b" }}>
                      Ø 8,4h / Tag · 34,5h diese Woche
                    </span>
                    <div className="ml-auto flex items-center gap-1.5">
                      <div className="size-2 rounded-full" style={{ background: "rgba(239,68,68,0.8)" }} />
                      <span className="text-[9px]" style={{ color: "#64748b" }}>
                        Mi 10,5h — Benachrichtigung gesendet
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ══ QUOTE ═════════════════════════════════════════════════════════════════ */}
      {product.quote && (
        <section className="product-quote-section py-32 sm:py-44 bg-[#f8fafc] border-t border-gray-100 relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse at 50% 0%, ${product.colorHex}08 0%, transparent 55%)` }} />
          <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8">
            <FadeUp className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-1 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="font-heading text-[26px] sm:text-[40px] lg:text-[48px] font-normal leading-[1.08] text-gray-900 mb-10">
                &ldquo;{product.quote.text}&rdquo;
              </p>
              <div className="inline-flex items-center gap-4">
                <div className="size-10 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0"
                  style={{ background: product.colorHex }}>
                  {product.quote.author.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="text-left">
                  <p className="text-[13px] font-semibold text-gray-700">{product.quote.author}</p>
                  <p className="text-[11px] text-gray-400">{product.quote.role} · {product.quote.company}</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      <TempoClosing product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ROSTER — Shift Planning
// Always-light hero with weekly schedule mockup → Tauschbörse split →
// dark conflict-detection → KI-Planung split → quote → CTA
// ══════════════════════════════════════════════════════════════════════════════

function RosterPage({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const mockupY     = useTransform(scrollYProgress, [0, 1], [0, 60])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 14 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 14 })
  const tiltX   = useTransform(springY, [-500, 500], [3, -3])
  const tiltY   = useTransform(springX, [-500, 500], [-4, 4])

  const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]

  type Shift = "F" | "S" | "N" | "?" | null
  const team: { name: string; init: string; color: string; shifts: Shift[] }[] = [
    { name: "A. Weber",  init: "AW", color: "#3b82f6", shifts: ["F",  "F",  null, "S",  "F",  null, null] },
    { name: "M. Huber",  init: "MH", color: "#8b5cf6", shifts: [null, "S",  "S",  null, "N",  "F",  null] },
    { name: "K. Braun",  init: "KB", color: "#f43f5e", shifts: ["S",  null, "F",  "F",  null, "?",  "F" ] },
    { name: "L. Mayer",  init: "LM", color: "#f59e0b", shifts: ["F",  "N",  null, "S",  "F",  null, null] },
    { name: "J. Müller", init: "JM", color: "#10b981", shifts: [null, "F",  "N",  null, "S",  "F",  null] },
  ]

  const shiftStyle: Record<string, { label: string; bg: string; border: string; color: string }> = {
    F:   { label: "Früh",  bg: `${product.colorHex}18`, border: `${product.colorHex}35`, color: product.colorHex },
    S:   { label: "Spät",  bg: "#7c3aed18",             border: "#7c3aed35",             color: "#7c3aed" },
    N:   { label: "Nacht", bg: "#1e40af18",             border: "#1e40af35",             color: "#1e40af" },
    "?": { label: "?",     bg: "#fef9c3",               border: "#fde047",               color: "#a16207" },
  }

  return (
    <>
      {/* ══ HERO ════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen bg-white overflow-hidden flex flex-col"
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect()
          mouseX.set(e.clientX - r.left - r.width / 2)
          mouseY.set(e.clientY - r.top  - r.height / 2)
        }}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
      >
        {/* Rose dot grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, #fecdd3 1px, transparent 1px)",
          backgroundSize: "28px 28px", opacity: 0.3,
        }} />
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 65% 60% at 18% 42%, white 28%, transparent 70%)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse 50% 45% at 95% -5%, ${product.colorHex}0e 0%, transparent 60%)` }} />
        <Grain opacity={0.015} />

        <div className="relative z-10 mx-auto max-w-screen-xl px-6 sm:px-8 w-full flex-1 flex flex-col">
          <div className="pt-12"><BackLink /></div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.55fr] gap-8 lg:gap-12 items-center pt-8 pb-28 flex-1">

            {/* LEFT: Copy */}
            <motion.div style={{ opacity: textOpacity }}>
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] mb-9"
                style={{ color: product.colorHex }}>
                <span className="size-[5px] rounded-full" style={{ background: product.colorHex }} />
                {product.license}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.13, ease: [0.16, 1, 0.3, 1] }}
                className="roster-hero-title font-heading text-[62px] sm:text-[82px] lg:text-[96px] font-normal leading-[0.88] tracking-tight text-gray-900 mb-7">
                Jede Schicht.<br />
                <span className="roster-glow-accent italic">Geplant.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.24 }}
                className="text-[17px] text-gray-500 leading-relaxed max-w-[300px] mb-10">
                Schichtpläne erstellen, Tauschbörse verwalten und Konflikte erkennen — bevor sie entstehen.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.33 }}
                className="flex items-center gap-3 mb-12">
                <Link href="/login"
                  className="inline-flex items-center gap-2.5 h-11 px-7 rounded-full text-[13.5px] font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: product.colorHex, boxShadow: `0 6px 24px ${product.colorHex}40` }}>
                  Demo buchen <ArrowRight className="size-3.5" />
                </Link>
                <Link href={accountCtaHref}
                  className="inline-flex items-center h-11 px-6 rounded-full border border-gray-200 text-gray-500 text-[13.5px] font-medium hover:border-gray-300 hover:text-gray-700 transition-all">
                  {accountCtaLabel}
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.48 }}
                className="flex items-center gap-8 pt-7 border-t border-gray-100">
                {product.stats.map(s => (
                  <div key={s.label}>
                    <p className="font-heading text-[30px] font-normal text-gray-900 leading-none mb-1">{s.value}</p>
                    <p className="text-[10.5px] text-gray-400">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT: Schedule mockup */}
            <div className="hidden lg:flex justify-end">
              <motion.div style={{ y: mockupY }} className="relative w-full max-w-[680px]">

                {/* Badge 1 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -top-5 -left-6 z-20 bg-white rounded-xl border border-gray-200 px-3.5 py-2.5 flex items-center gap-2.5"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}>
                  <Check className="size-3.5 text-emerald-500 shrink-0" />
                  <div>
                    <p className="text-[9.5px] font-bold text-gray-800 leading-tight">KW 16 vollständig geplant</p>
                    <p className="text-[8px] text-gray-400 leading-tight">35 Schichten · alle besetzt</p>
                  </div>
                </motion.div>

                {/* Badge 2 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -bottom-4 -right-4 z-20 bg-white rounded-xl border border-gray-200 px-3.5 py-2.5 flex items-center gap-2.5"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}>
                  <div className="size-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${product.colorHex}14` }}>
                    <CalendarDays className="size-3.5" style={{ color: product.colorHex }} />
                  </div>
                  <div>
                    <p className="text-[9.5px] font-bold text-gray-800 leading-tight">1 Tauschantrag offen</p>
                    <p className="text-[8px] text-gray-400 leading-tight">Sa Früh · A. Weber</p>
                  </div>
                </motion.div>

                {/* Glow */}
                <div aria-hidden className="absolute -inset-6 -z-10 rounded-2xl blur-[72px] opacity-18"
                  style={{ background: product.colorHex }} />

                {/* Mockup window */}
                <motion.div
                  style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 52, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-[20px] bg-white overflow-hidden"
                    style={{ boxShadow: "0 40px 100px -20px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)" }}
                  >
                    {/* Browser chrome */}
                    <div className="h-10 bg-[#f5f5f7] border-b border-gray-200/70 flex items-center px-4 gap-1.5">
                      <div className="size-[11px] rounded-full bg-[#ff5f57]" />
                      <div className="size-[11px] rounded-full bg-[#ffbd2e]" />
                      <div className="size-[11px] rounded-full bg-[#28c840]" />
                      <div className="mx-3 flex-1 h-[22px] max-w-[240px] rounded-md bg-white border border-gray-200/60 flex items-center px-2.5 gap-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
                        <div className="size-[7px] rounded-full opacity-60" style={{ background: product.colorHex }} />
                        <span className="text-[9px] text-gray-400 font-mono truncate">dashboard.hostpartners.de/berghotel/shifts</span>
                      </div>
                      <div className="ml-auto">
                        <div className="h-[22px] px-2.5 rounded-md text-[8.5px] font-semibold text-white flex items-center"
                          style={{ background: product.colorHex }}>+ Schicht</div>
                      </div>
                    </div>

                    {/* Week nav bar */}
                    <div className="h-9 border-b border-gray-100 flex items-center px-4 gap-3 bg-white">
                      <div className="flex items-center gap-2">
                        <div className="size-5 rounded-md bg-gray-100 flex items-center justify-center cursor-default">
                          <span className="text-[9px] text-gray-500">‹</span>
                        </div>
                        <span className="text-[10.5px] font-semibold text-gray-800">KW 16 — 14.–20. April 2026</span>
                        <div className="size-5 rounded-md bg-gray-100 flex items-center justify-center cursor-default">
                          <span className="text-[9px] text-gray-500">›</span>
                        </div>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <div className="flex items-center gap-1.5 text-[8px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <div className="size-1.5 rounded-full bg-emerald-500" />
                          Vollständig
                        </div>
                      </div>
                    </div>

                    {/* Schedule grid */}
                    <div className="overflow-hidden">
                      {/* Day headers */}
                      <div className="grid border-b border-gray-100 bg-gray-50/60"
                        style={{ gridTemplateColumns: "88px repeat(7, 1fr)" }}>
                        <div className="px-3 py-2 text-[7.5px] font-semibold text-gray-400">Team</div>
                        {days.map((d, di) => (
                          <div key={d} className="px-1 py-2 text-center border-l border-gray-100">
                            <span className="text-[8px] font-semibold"
                              style={{ color: di === 3 ? product.colorHex : "#9ca3af" }}>{d}</span>
                            {di === 3 && <div className="w-1 h-1 rounded-full mx-auto mt-0.5" style={{ background: product.colorHex }} />}
                          </div>
                        ))}
                      </div>

                      {/* Team rows */}
                      {team.map((member, ri) => (
                        <motion.div key={member.name}
                          initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: 0.5 + ri * 0.07 }}
                          className="grid border-b border-gray-100/60 last:border-b-0"
                          style={{ gridTemplateColumns: "88px repeat(7, 1fr)" }}>
                          <div className="px-3 py-2 flex items-center gap-1.5">
                            <div className="size-5 rounded-full flex items-center justify-center text-[7px] font-bold text-white shrink-0"
                              style={{ background: member.color }}>{member.init}</div>
                            <span className="text-[8.5px] font-medium text-gray-700 truncate">{member.name.split(" ")[0]}</span>
                          </div>
                          {member.shifts.map((shift, ci) => (
                            <motion.div key={ci}
                              initial={{ opacity: 0, scale: 0.7 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.65 + ri * 0.06 + ci * 0.03, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              className="p-1 border-l border-gray-100/60 flex items-center">
                              {shift ? (
                                <div className="w-full h-7 rounded-md flex items-center justify-center text-[8px] font-bold border cursor-default"
                                  style={{
                                    background: shiftStyle[shift].bg,
                                    borderColor: shiftStyle[shift].border,
                                    color: shiftStyle[shift].color,
                                  }}>
                                  {shiftStyle[shift].label}
                                </div>
                              ) : (
                                <div className="w-full h-7 rounded-md bg-gray-50 flex items-center justify-center">
                                  <span className="text-[8px] text-gray-200">—</span>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </motion.div>
                      ))}
                    </div>

                    {/* Legend + status bar */}
                    <div className="h-9 border-t border-gray-100 bg-[#fafafa] flex items-center px-4 gap-4">
                      {[
                        { label: "Früh",  color: product.colorHex },
                        { label: "Spät",  color: "#7c3aed" },
                        { label: "Nacht", color: "#1e40af" },
                      ].map(l => (
                        <div key={l.label} className="flex items-center gap-1">
                          <div className="size-2 rounded-sm" style={{ background: l.color }} />
                          <span className="text-[7.5px] text-gray-400">{l.label}</span>
                        </div>
                      ))}
                      <div className="ml-auto flex items-center gap-1.5">
                        <span className="text-[8px] px-2 py-0.5 rounded-full font-medium"
                          style={{ background: "#fef9c3", color: "#a16207" }}>1 offen</span>
                        <span className="text-[8px] text-gray-400">35 Schichten</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TAUSCHBÖRSE SPLIT ══════════════════════════════════════════════════ */}
      <section className="bg-white py-32 sm:py-48 overflow-hidden">
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left: Swap request mockup */}
            <FadeUp className="order-2 lg:order-1">
              <div className="relative">
                <div aria-hidden className="absolute -inset-10 blur-3xl opacity-10 rounded-3xl"
                  style={{ background: product.colorHex }} />
                <div className="relative rounded-2xl overflow-hidden border border-gray-200/70"
                  style={{ boxShadow: "0 24px 72px -12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)" }}>

                  {/* Header */}
                  <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-3 bg-white">
                    <div className="size-7 rounded-xl flex items-center justify-center" style={{ background: `${product.colorHex}15` }}>
                      <RefreshCw className="size-3.5" style={{ color: product.colorHex }} />
                    </div>
                    <span className="text-[11px] font-bold text-gray-800">Tauschbörse</span>
                    <div className="ml-auto flex items-center gap-1.5">
                      <span className="text-[8.5px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">3 offen</span>
                    </div>
                  </div>

                  {/* Swap requests */}
                  <div className="divide-y divide-gray-100/60">
                    {[
                      {
                        from: "A. Weber", fromInit: "AW", fromColor: "#3b82f6",
                        to:   "K. Braun", toInit:   "KB", toColor:   "#f43f5e",
                        day: "Sa", shift: "Frühschicht", time: "06:00–14:00",
                        status: "ausstehend", statusBg: "#fef9c3", statusFg: "#a16207",
                      },
                      {
                        from: "J. Müller", fromInit: "JM", fromColor: "#10b981",
                        to:   "M. Huber",  toInit:   "MH", toColor:   "#8b5cf6",
                        day: "Do", shift: "Spätschicht", time: "14:00–22:00",
                        status: "genehmigt", statusBg: "#dcfce7", statusFg: "#15803d",
                      },
                      {
                        from: "L. Mayer", fromInit: "LM", fromColor: "#f59e0b",
                        to:   "A. Weber", toInit:   "AW", toColor:   "#3b82f6",
                        day: "Mi", shift: "Nachtschicht", time: "22:00–06:00",
                        status: "abgelehnt", statusBg: "#fee2e2", statusFg: "#b91c1c",
                      },
                    ].map((req, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.3 + i * 0.09 }}
                        className="px-5 py-4 bg-white">
                        <div className="flex items-center gap-3 mb-2.5">
                          {/* From → To */}
                          <div className="flex items-center gap-1.5">
                            <div className="size-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                              style={{ background: req.fromColor }}>{req.fromInit}</div>
                            <span className="text-[10px] font-medium text-gray-700">{req.from}</span>
                          </div>
                          <ArrowRight className="size-3 text-gray-300 shrink-0" />
                          <div className="flex items-center gap-1.5">
                            <div className="size-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                              style={{ background: req.toColor }}>{req.toInit}</div>
                            <span className="text-[10px] font-medium text-gray-700">{req.to}</span>
                          </div>
                          <div className="ml-auto">
                            <span className="text-[8px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: req.statusBg, color: req.statusFg }}>{req.status}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-0.5">
                          <div className="size-1.5 rounded-full" style={{ background: product.colorHex }} />
                          <span className="text-[9px] text-gray-500">{req.day} · {req.shift} · {req.time}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center gap-3">
                    <span className="text-[9px] text-gray-400">1 ausstehend · 1 genehmigt · 1 abgelehnt</span>
                    <div className="ml-auto">
                      <div className="h-7 px-3.5 rounded-xl text-[9.5px] font-semibold text-white flex items-center cursor-default"
                        style={{ background: product.colorHex }}>
                        Alle anzeigen
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Right: Copy */}
            <FadeUp delay={0.1} className="order-1 lg:order-2">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] mb-5"
                style={{ color: product.colorHex }}>Tauschbörse</p>
              <h2 className="font-heading text-[44px] sm:text-[58px] lg:text-[68px] font-normal leading-[0.9] tracking-tight text-gray-900 mb-6">
                Tauschen.<br />
                <span className="italic text-gray-200">Ohne Chaos.</span>
              </h2>
              <p className="text-[16px] text-gray-500 leading-relaxed mb-10 max-w-sm">
                Mitarbeitende beantragen Schichttausch direkt in der App — Führungskräfte genehmigen oder lehnen ab. Kein WhatsApp-Chaos.
              </p>
              <div className="space-y-4">
                {[
                  { icon: RefreshCw,    title: "Antrag in Sekunden",       body: "Mitarbeitende wählen eine Schicht und schlagen einen Tauschpartner vor." },
                  { icon: Check,        title: "Einmalige Genehmigung",    body: "Führungskraft bestätigt oder lehnt ab — alle sehen den aktuellen Status." },
                  { icon: Shield,       title: "Regelkonform",             body: "Ruhezeiten und Qualifikationen werden automatisch geprüft." },
                  { icon: CalendarDays, title: "Sofort im Dienstplan",     body: "Genehmigte Tausche werden automatisch im Dienstplan aktualisiert." },
                ].map((f, i) => {
                  const FIcon = f.icon
                  return (
                    <FadeUp key={f.title} delay={0.15 + i * 0.07}>
                      <div className="flex items-start gap-3.5">
                        <div className="size-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border border-gray-100 bg-gray-50">
                          <FIcon className="size-3.5 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-gray-800 mb-0.5">{f.title}</p>
                          <p className="text-[12px] text-gray-500 leading-relaxed">{f.body}</p>
                        </div>
                      </div>
                    </FadeUp>
                  )
                })}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ KONFLIKTERKENNUNG (DARK) ════════════════════════════════════════════ */}
      <section className="bg-white py-32 sm:py-48 overflow-hidden relative border-t border-gray-100">
        <Grain opacity={0.02} />
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse 55% 60% at 100% 50%, ${product.colorHex}12 0%, transparent 60%)` }} />

        <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left: Copy */}
            <FadeUp>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] mb-7"
                style={{ color: product.colorHex }}>Konflikterkennung</p>
              <h2 className="font-heading text-[44px] sm:text-[62px] lg:text-[72px] font-normal leading-[0.88] tracking-tight text-gray-900 mb-8 dark:text-white">
                Probleme.<br />
                <span className="italic text-gray-300 dark:text-white/68">Bevor sie entstehen.</span>
              </h2>
              <p className="text-[16px] leading-relaxed mb-12 max-w-sm text-gray-500 dark:text-white/60">
                Roster erkennt Konflikte im Dienstplan automatisch — Ruhezeiten, Doppelbuchungen, offene Schichten und ArbZG-Verstöße.
              </p>
              <div className="space-y-5">
                {[
                  { icon: Clock,        title: "Ruhezeiten-Verletzungen",  body: "Unterschreitung der 11-Stunden-Mindestruhezeit wird sofort angezeigt." },
                  { icon: Users,        title: "Doppelte Buchungen",       body: "Mitarbeitende können nicht zwei Schichten gleichzeitig eingeplant werden." },
                  { icon: CalendarDays, title: "Unbesetzte Schichten",     body: "Kritische Schichten ohne Abdeckung werden hervorgehoben — mit Lösungsvorschlag." },
                ].map((p, i) => {
                  const PIcon = p.icon
                  return (
                    <FadeUp key={p.title} delay={0.1 + i * 0.09}>
                      <div className="flex items-start gap-4">
                        <div className="size-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${product.colorHex}20`, border: `1px solid ${product.colorHex}30` }}>
                          <PIcon className="size-4" style={{ color: product.colorHex }} />
                        </div>
                        <div>
                          <p className="text-[13.5px] font-semibold mb-1 text-gray-800 dark:text-white/92">{p.title}</p>
                          <p className="text-[12.5px] leading-relaxed text-gray-500 dark:text-white/56">{p.body}</p>
                        </div>
                      </div>
                    </FadeUp>
                  )
                })}
              </div>
            </FadeUp>

            {/* Right: Conflict list mockup */}
            <FadeUp delay={0.15}>
              <div className="relative">
                <div aria-hidden className="absolute -inset-8 blur-3xl opacity-15 rounded-2xl"
                  style={{ background: product.colorHex }} />
                <div
                  className="relative overflow-hidden rounded-2xl border border-[#101114] bg-[#17181b] shadow-[0_28px_64px_rgba(0,0,0,0.38)]"
                  style={{ boxShadow: "0 28px 64px rgba(0,0,0,0.38)" }}
                >

                  {/* Header */}
                  <div
                    className="flex items-center gap-3 border-b border-white/8 bg-[#202127] px-5 py-3.5"
                  >
                    <div className="size-5 rounded-md flex items-center justify-center"
                      style={{ background: `${product.colorHex}28` }}>
                      <Zap className="size-3" style={{ color: product.colorHex }} />
                    </div>
                    <span className="text-[11px] font-semibold text-white/70">
                      Konflikte — KW 16
                    </span>
                    <div className="ml-auto">
                      <span className="text-[8.5px] px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: "rgba(239,68,68,0.15)", color: "rgba(239,68,68,0.9)", border: "1px solid rgba(239,68,68,0.2)" }}>
                        4 aktiv
                      </span>
                    </div>
                  </div>

                  {/* Conflict entries */}
                  <div className="divide-y divide-white/6 bg-[#17181b]">
                    {[
                      { severity: "kritisch", title: "Sa Frühschicht unbesetzt",       sub: "Keine Abdeckung 06:00–14:00",                 sc: "#ef4444" },
                      { severity: "warnung",  title: "M. Huber: 9h Ruhezeit Do→Fr",   sub: "Minimum 11h — ArbZG §5",                     sc: "#f59e0b" },
                      { severity: "kritisch", title: "Doppelbuchung K. Braun So",      sub: "Früh- und Spätschicht überlappen sich",       sc: "#ef4444" },
                      { severity: "warnung",  title: "L. Mayer 49h diese Woche",       sub: "Grenzwert 48h/Woche überschritten",           sc: "#f59e0b" },
                    ].map((c, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + i * 0.07 }}
                        className="flex items-start gap-3.5 px-5 py-3.5">
                        <div className="size-2 rounded-full mt-1.5 shrink-0" style={{ background: c.sc }} />
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-[10px] font-semibold text-white/92">{c.title}</p>
                          <p className="mt-0.5 truncate text-[9px] text-white/42">{c.sub}</p>
                        </div>
                        <span className="text-[8px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                          style={{
                            background: c.severity === "kritisch" ? "rgba(239,68,68,0.15)" : "rgba(245,158,11,0.15)",
                            color:      c.severity === "kritisch" ? "rgba(239,68,68,0.9)"  : "rgba(245,158,11,0.9)",
                            border:     `1px solid ${c.severity === "kritisch" ? "rgba(239,68,68,0.2)" : "rgba(245,158,11,0.2)"}`,
                          }}>
                          {c.severity}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center border-t border-white/8 bg-[#202127] px-5 py-3">
                    <span className="text-[9px] font-mono text-white/48">
                      2 kritisch · 2 Warnungen
                    </span>
                    <div className="ml-auto">
                      <div className="h-6 px-3 rounded-lg text-[8.5px] font-semibold flex items-center cursor-default"
                        style={{ background: `${product.colorHex}22`, color: product.colorHex }}>
                        Alle lösen →
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ KI-PLANUNG ════════════════════════════════════════════════════════════ */}
      <section className="product-soft-section bg-[#faf9f7] py-32 sm:py-48 overflow-hidden">
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left: Copy */}
            <FadeUp>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] mb-5"
                style={{ color: product.colorHex }}>KI-Assistent</p>
              <h2 className="font-heading text-[44px] sm:text-[58px] lg:text-[68px] font-normal leading-[0.9] tracking-tight text-gray-900 mb-6">
                KI plant.<br />
                <span className="italic text-gray-200">Du entscheidest.</span>
              </h2>
              <p className="text-[16px] text-gray-500 leading-relaxed mb-10 max-w-sm">
                Roster schlägt optimale Schichtbesetzungen auf Basis von Verfügbarkeiten, Qualifikationen und Arbeitszeiten vor. Du übernimmst auf Knopfdruck.
              </p>
              <div className="space-y-3.5">
                {[
                  "Berücksichtigt Verfügbarkeit und Präferenzen",
                  "Respektiert Ruhezeiten und Wochenstunden",
                  "Priorisiert qualifizierte Mitarbeitende",
                  "Jeder Vorschlag mit Konfidenzwert",
                ].map((point, i) => (
                  <FadeUp key={point} delay={0.12 + i * 0.06}>
                    <div className="flex items-center gap-3">
                      <div className="size-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `${product.colorHex}15` }}>
                        <Check className="size-3" style={{ color: product.colorHex }} />
                      </div>
                      <span className="text-[13px] text-gray-600">{point}</span>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>

            {/* Right: AI suggestion mockup */}
            <FadeUp delay={0.12}>
              <div className="relative">
                <div aria-hidden className="absolute -inset-10 blur-3xl opacity-10 rounded-3xl"
                  style={{ background: product.colorHex }} />
                <div className="relative rounded-2xl overflow-hidden border border-gray-200/70 bg-white"
                  style={{ boxShadow: "0 24px 72px -12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)" }}>

                  {/* Header */}
                  <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-3">
                    <div className="size-7 rounded-xl flex items-center justify-center"
                      style={{ background: `${product.colorHex}15` }}>
                      <Sparkles className="size-3.5" style={{ color: product.colorHex }} />
                    </div>
                    <span className="text-[11px] font-bold text-gray-800">KI-Schichtvorschlag</span>
                    <span className="ml-1 text-[8.5px] font-semibold text-white px-2 py-0.5 rounded-full"
                      style={{ background: product.colorHex }}>KW 16</span>
                    <div className="ml-auto text-[9px] text-gray-400">3 Vorschläge</div>
                  </div>

                  {/* AI suggestions */}
                  <div className="p-4 space-y-2.5">
                    {[
                      { day: "Sa", shift: "Frühschicht 06:00", name: "A. Weber",  init: "AW", color: "#3b82f6", conf: 94, reason: "Verfügbar, 35h/Woche, Qualifikation: Rezeption" },
                      { day: "So", shift: "Spätschicht 14:00", name: "K. Braun",  init: "KB", color: "#f43f5e", conf: 88, reason: "Kein Folgetag, 11h Ruhezeit eingehalten" },
                      { day: "Mo", shift: "Nachtschicht 22:00",name: "J. Müller", init: "JM", color: "#10b981", conf: 79, reason: "Verfügbar, 2 freie Tage davor" },
                    ].map((s, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.4 + i * 0.1 }}
                        className="rounded-xl border border-gray-100 bg-gray-50/50 p-3.5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-semibold text-gray-500 w-6">{s.day}</span>
                            <span className="text-[9.5px] font-semibold text-gray-700">{s.shift}</span>
                          </div>
                          <div className="ml-auto flex items-center gap-1.5">
                            {/* Confidence bar */}
                            <div className="w-16 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                              <motion.div className="h-full rounded-full"
                                style={{ background: product.colorHex }}
                                initial={{ width: 0 }}
                                animate={{ width: `${s.conf}%` }}
                                transition={{ delay: 0.6 + i * 0.1, duration: 0.7, ease: "easeOut" }}
                              />
                            </div>
                            <span className="text-[8.5px] font-mono font-semibold" style={{ color: product.colorHex }}>{s.conf}%</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <div className="size-6 rounded-full flex items-center justify-center text-[7.5px] font-bold text-white shrink-0"
                            style={{ background: s.color }}>{s.init}</div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-semibold text-gray-800">{s.name}</span>
                            <p className="text-[8.5px] text-gray-400 truncate">{s.reason}</p>
                          </div>
                          <div className="h-6 px-2.5 rounded-lg text-[8px] font-semibold flex items-center cursor-default"
                            style={{ background: `${product.colorHex}15`, color: product.colorHex }}>
                            Übernehmen
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action bar */}
                  <div className="px-5 py-3.5 border-t border-gray-100 flex items-center gap-3">
                    <span className="text-[9.5px] text-gray-400">Alle 3 Vorschläge erfüllen ArbZG-Anforderungen</span>
                    <div className="ml-auto">
                      <div className="h-8 px-4 rounded-xl text-[10px] font-semibold text-white flex items-center cursor-default"
                        style={{ background: product.colorHex, boxShadow: `0 4px 14px ${product.colorHex}35` }}>
                        Alle übernehmen
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ QUOTE ═════════════════════════════════════════════════════════════════ */}
      {product.quote && (
        <section className="product-quote-section py-32 sm:py-44 bg-[#f8fafc] border-t border-gray-100 relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse at 50% 0%, ${product.colorHex}08 0%, transparent 55%)` }} />
          <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8">
            <FadeUp className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-1 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="font-heading text-[26px] sm:text-[40px] lg:text-[48px] font-normal leading-[1.08] text-gray-900 mb-10">
                &ldquo;{product.quote.text}&rdquo;
              </p>
              <div className="inline-flex items-center gap-4">
                <div className="size-10 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0"
                  style={{ background: product.colorHex }}>
                  {product.quote.author.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="text-left">
                  <p className="text-[13px] font-semibold text-gray-700">{product.quote.author}</p>
                  <p className="text-[11px] text-gray-400">{product.quote.role} · {product.quote.company}</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      <RosterClosing product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// LUMEN — AI Assistant
// Bright editorial hero → scaled product mockup → trust → system sources → CTA
// ══════════════════════════════════════════════════════════════════════════════

function LumenPage({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 36])
  const mockupScale = useTransform(scrollYProgress, [0, 0.9], [1, 0.985])
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [chatPhase, setChatPhase] = useState(0)
  const [typing, setTyping] = useState("")
  const [typingDone, setTypingDone] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 48, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 48, damping: 18 })
  const tiltX = useTransform(springY, [-420, 420], [2.5, -2.5])
  const tiltY = useTransform(springX, [-420, 420], [-3.5, 3.5])

  const response = "Die HACCP-Checkliste für die Frühschicht liegt in Atlas unter 'Küche / Tageschecklisten'. Zuletzt aktualisiert von Maria Hoffmann am 2. April. Soll ich dir zusätzlich die Reinigungsroutine und die Temperaturgrenzen zusammenfassen?"

  useEffect(() => {
    const t1 = setTimeout(() => setChatPhase(1), 650)
    const t2 = setTimeout(() => setChatPhase(2), 1550)
    const t3 = setTimeout(() => setChatPhase(3), 2550)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  useEffect(() => {
    if (chatPhase < 2) return
    let i = 0
    const t = setInterval(() => {
      i++
      setTyping(response.slice(0, i))
      if (i >= response.length) {
        clearInterval(t)
        setTypingDone(true)
      }
    }, 16)
    return () => clearInterval(t)
  }, [chatPhase, response])

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - r.left - r.width / 2)
    mouseY.set(e.clientY - r.top - r.height / 2)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  const sources = [
    { icon: BookOpen, label: "Atlas", title: "Artikel & SOPs", desc: "Arbeitsanweisungen, Playbooks und Richtlinien mit Versionsstand." },
    { icon: GraduationCap, label: "Academy", title: "Kurse & Unterlagen", desc: "Pflichtschulungen, Lektionen und Lerninhalte für Teams." },
    { icon: Users, label: "Persona", title: "Rollen & Zuständigkeiten", desc: "Teams, Verantwortliche und organisatorischer Kontext." },
    { icon: GitBranch, label: "Flow", title: "Prozesse & Freigaben", desc: "Abläufe, Übergaben und standardisierte Prozessschritte." },
  ]

  const trustPoints = [
    { icon: Shield, title: "RLS-aware Antworten", body: "Lumen sieht nur Inhalte, die die anfragende Person auch selbst sehen darf." },
    { icon: Brain, title: "Kein Blindflug", body: "Antworten basieren auf deinen Quellen statt auf offenem Internet-Wissen." },
    { icon: Search, title: "Quellen sofort sichtbar", body: "Jede Antwort zeigt, woher sie kommt und wie aktuell der Inhalt ist." },
  ]

  const workflow = [
    { number: "01", title: "Frage verstehen", body: "Lumen erkennt Intention, Kontext und relevante Begriffe in natürlicher Sprache." },
    { number: "02", title: "Quellen gewichten", body: "Atlas, Academy, Persona und Flow werden nach Relevanz und Berechtigung sortiert." },
    { number: "03", title: "Antwort belegen", body: "Die Ausgabe kommt mit Fundstellen, Aktualität und nächsten sinnvollen Aktionen." },
  ]

  const useCases = [
    "Wo finde ich die HACCP-Checkliste für die Frühschicht?",
    "Welche Schritte gelten bei einer Gästereklamation?",
    "Fasse das Onboarding für neue Köch:innen zusammen.",
    "Welche Pflichtschulungen laufen diesen Monat ab?",
    "Wer ist für den Wareneingang im Spätdienst zuständig?",
    "Zeig mir unsere Brandschutzregeln für das Lager.",
  ]

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden bg-white"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Grain opacity={0.018} />
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.08]"
            style={{ backgroundImage: `linear-gradient(${product.colorHex}12 1px, transparent 1px), linear-gradient(90deg, ${product.colorHex}12 1px, transparent 1px)`, backgroundSize: "88px 88px" }}
          />
          <div className="absolute left-[8%] top-[14%] h-[24rem] w-[24rem] rounded-full blur-[88px]"
            style={{ backgroundColor: `${product.colorHex}0f` }} />
          <div className="absolute right-[10%] top-[18%] h-[18rem] w-[18rem] rounded-full blur-[80px]"
            style={{ backgroundColor: `${product.colorHex}0b` }} />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 sm:px-8">
          <div className="pt-12">
            <BackLink />
          </div>

          <div className="grid flex-1 grid-cols-1 items-center gap-14 pb-24 pt-8 lg:grid-cols-[1fr_1.02fr] lg:gap-20">
            <motion.div style={{ opacity: heroTextOpacity }}>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="mb-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em]"
                style={{ color: `${product.colorHex}90` }}
              >
                <span className="inline-block size-1.5 rounded-full" style={{ background: product.colorHex }} />
                {product.license}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 38 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="mb-7 font-heading text-[62px] font-normal leading-[0.86] tracking-tight text-foreground sm:text-[88px] lg:text-[104px]"
              >
                Antworten aus
                <br />
                <span className="italic" style={{ color: `${product.colorHex}66` }}>deinem Betrieb.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.28 }}
                className="mb-10 max-w-[34rem] text-[19px] leading-relaxed text-muted-foreground sm:text-[21px]"
              >
                Lumen beantwortet Fragen nicht generisch, sondern mit echtem Kontext aus Atlas, Academy, Persona und Flow. Schnell, belegbar und zugriffssicher.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
                className="mb-12 flex flex-wrap gap-3"
              >
                <Link
                  href="/login"
                  className="inline-flex h-12 items-center gap-2 rounded-full px-8 text-[14px] font-semibold text-white transition-all"
                  style={{ backgroundColor: product.colorHex, boxShadow: `0 12px 30px ${product.colorHex}20` }}
                >
                  Demo buchen <ArrowRight className="size-4" />
                </Link>
                <Link href={accountCtaHref} className="inline-flex h-12 items-center rounded-full border border-border px-8 text-[14px] font-medium text-muted-foreground transition-all hover:text-foreground">
                  {accountCtaLabel}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48 }}
                className="mb-10 flex flex-wrap gap-3"
              >
                {["Quellengebunden", "Rollenbasiert", "Streaming in Echtzeit"].map((label, i) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] text-muted-foreground"
                    style={{ borderColor: `${product.colorHex}22`, backgroundColor: i === 0 ? `${product.colorHex}0a` : "white" }}
                  >
                    <span className="size-1.5 rounded-full" style={{ backgroundColor: i === 0 ? product.colorHex : `${product.colorHex}66` }} />
                    {label}
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.58 }}
                className="grid grid-cols-3 gap-4 border-t border-border pt-8"
              >
                {product.stats.map(s => (
                  <div key={s.label}>
                    <p className="mb-1.5 font-heading text-[32px] font-normal leading-none sm:text-[42px]" style={{ color: product.colorHex }}>
                      {s.value}
                    </p>
                    <p className="text-[10px] text-muted-foreground/75">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: mockupY, scale: mockupScale }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
                className="relative mx-auto w-full max-w-[590px]"
              >
                <div aria-hidden className="absolute -inset-8 -z-10 rounded-[40px] blur-[54px]"
                  style={{ backgroundColor: `${product.colorHex}10` }} />

                <div
                  className="overflow-hidden rounded-[28px] border bg-white"
                  style={{ borderColor: `${product.colorHex}16`, boxShadow: "0 28px 90px -36px rgba(15,23,42,0.18)" }}
                >
                  <div
                    className="flex h-11 items-center gap-2 border-b px-5"
                    style={{ borderColor: `${product.colorHex}14`, backgroundColor: `${product.colorHex}05` }}
                  >
                    <div className="size-[10px] rounded-full bg-[#ff5f57]" />
                    <div className="size-[10px] rounded-full bg-[#ffbd2e]" />
                    <div className="size-[10px] rounded-full bg-[#28c840]" />
                    <div className="ml-3 flex h-7 flex-1 items-center gap-2 rounded-full border px-3"
                      style={{ borderColor: `${product.colorHex}16`, backgroundColor: "white" }}>
                      <Sparkles className="size-3" style={{ color: product.colorHex }} />
                      <span className="truncate text-[10px] text-muted-foreground">hostpartners.ai/lumen</span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="mb-4 rounded-[22px] border bg-white p-4"
                      style={{ borderColor: `${product.colorHex}14` }}>
                        <div className="mb-3 flex items-center gap-2">
                          <div className="flex size-9 items-center justify-center rounded-full"
                            style={{ backgroundColor: `${product.colorHex}16` }}>
                            <Sparkles className="size-4" style={{ color: product.colorHex }} />
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-foreground">Lumen</p>
                            <p className="text-[10px] text-muted-foreground">RAG-Assistent mit Quellenbezug</p>
                          </div>
                        </div>

                        <AnimatePresence>
                          {chatPhase >= 1 ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4 }}
                              className="mb-4 flex justify-end"
                            >
                              <div className="max-w-[80%] rounded-2xl rounded-br-md px-4 py-3 text-[13px] text-white"
                                style={{ backgroundColor: product.colorHex }}>
                                Wo finde ich die HACCP-Checkliste für die Frühschicht?
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>

                        <AnimatePresence>
                          {chatPhase >= 2 ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.42 }}
                              className="flex gap-3"
                            >
                              <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full"
                                style={{ backgroundColor: `${product.colorHex}16` }}>
                                <Sparkles className="size-3.5" style={{ color: product.colorHex }} />
                              </div>
                              <div className="max-w-[88%] rounded-2xl rounded-tl-md border bg-white px-4 py-3"
                                style={{ borderColor: `${product.colorHex}12`, boxShadow: `0 10px 24px ${product.colorHex}10` }}>
                                <p className="text-[13px] leading-relaxed text-foreground/80">
                                  {typing}
                                  {!typingDone && <span className="ml-0.5 animate-pulse opacity-60">▍</span>}
                                </p>
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>

                        <AnimatePresence>
                          {chatPhase >= 3 ? (
                            <motion.div
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.45 }}
                              className="mt-4 rounded-2xl border p-3"
                              style={{ borderColor: `${product.colorHex}12`, backgroundColor: `${product.colorHex}05` }}
                            >
                              <div className="mb-2 flex items-center justify-between">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Belegt durch</p>
                                <span className="text-[10px] font-semibold" style={{ color: product.colorHex }}>97%</span>
                              </div>
                              <div className="space-y-2">
                                {[
                                  "Atlas · Küche / Tageschecklisten",
                                  "Academy · Hygiene Basistraining",
                                ].map(item => (
                                  <div key={item} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2">
                                    <FileText className="size-3.5" style={{ color: product.colorHex }} />
                                    <span className="text-[11px] text-foreground/70">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>

                    <div className="rounded-[22px] border p-4"
                      style={{ borderColor: `${product.colorHex}12`, backgroundColor: `${product.colorHex}04` }}>
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Prompt Composer</p>
                        <div className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px]"
                          style={{ borderColor: `${product.colorHex}14`, color: product.colorHex, backgroundColor: "white" }}>
                          <Zap className="size-3" />
                          Streaming aktiv
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3"
                        style={{ borderColor: `${product.colorHex}14` }}>
                        <span className="flex-1 text-[13px] text-muted-foreground">Stelle Lumen eine Frage zu Prozessen, Schulungen oder Regeln…</span>
                        <ArrowRight className="size-4" style={{ color: product.colorHex }} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        className="border-t border-border py-24 sm:py-32"
        style={{ background: `linear-gradient(180deg, ${product.colorHex}04 0%, white 24%, white 100%)` }}
      >
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-18">
            <FadeUp className="lg:pt-6">
              <p className="mb-5 text-[10.5px] font-semibold uppercase tracking-[0.2em]" style={{ color: product.colorHex }}>
                Vertrauen statt Demo-Magie
              </p>
              <h2 className="font-heading text-[46px] font-normal leading-[0.92] tracking-tight text-foreground sm:text-[68px]">
                KI, die sich
                <br />
                <span className="italic" style={{ color: `${product.colorHex}66` }}>belegen muss.</span>
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted-foreground">
                Lumen zeigt transparent, welche Quelle verwendet wurde, warum sie relevant ist und ob die fragende Person darauf zugreifen darf.
              </p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {["Quellenbezug", "Zugriffssicher", "Aktualitaet sichtbar"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border bg-white px-4 py-2 text-[11px] font-semibold text-foreground/72"
                    style={{ borderColor: `${product.colorHex}12` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </FadeUp>

            <div
              className="rounded-[34px] border bg-white p-4 shadow-[0_28px_80px_-42px_rgba(15,23,42,0.18)] sm:p-5"
              style={{ borderColor: `${product.colorHex}12` }}
            >
              <div
                className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[24px] border px-4 py-3"
                style={{ borderColor: `${product.colorHex}10`, backgroundColor: `${product.colorHex}04` }}
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Antwort-Qualitaet</p>
                  <p className="mt-1 text-[14px] font-semibold text-foreground">Nachvollziehbar statt generisch</p>
                </div>
                <span
                  className="rounded-full border bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]"
                  style={{ borderColor: `${product.colorHex}12`, color: product.colorHex }}
                >
                  audit-ready
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {trustPoints.map((point, i) => {
                const PointIcon = point.icon
                return (
                  <FadeUp key={point.title} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ y: -5, boxShadow: `0 18px 42px ${product.colorHex}12` }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "h-full rounded-[28px] border bg-white p-7",
                        i === 0 && "sm:col-span-2"
                      )}
                      style={{
                        borderColor: `${product.colorHex}12`,
                        background: i === 0 ? `linear-gradient(135deg, ${product.colorHex}06 0%, white 38%)` : "white",
                      }}
                    >
                      <div className="mb-6 flex items-start justify-between gap-4">
                        <div className="flex size-11 items-center justify-center rounded-2xl"
                          style={{ backgroundColor: `${product.colorHex}12` }}>
                          <PointIcon className="size-5" style={{ color: product.colorHex }} />
                        </div>
                        <span
                          className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                          style={{ borderColor: `${product.colorHex}10`, color: product.colorHex }}
                        >
                          {i === 0 ? "Pflicht" : i === 1 ? "Signal" : "Proof"}
                        </span>
                      </div>
                      <h3 className="mb-2 text-[18px] font-semibold text-foreground">{point.title}</h3>
                      <p className="text-[14px] leading-relaxed text-muted-foreground">{point.body}</p>
                    </motion.div>
                  </FadeUp>
                )
              })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white py-32 sm:py-44">
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="mb-20 grid grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_auto]">
            <FadeUp>
              <p className="mb-5 text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: `${product.colorHex}90` }}>
                Wissensquellen
              </p>
              <h2 className="font-heading text-[48px] font-normal leading-[0.9] tracking-tight text-foreground sm:text-[72px]">
                Lumen verbindet
                <br />
                <span className="italic" style={{ color: `${product.colorHex}66` }}>deine Systeme.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="max-w-md text-[16px] leading-relaxed text-muted-foreground">
                Statt isolierter Antworten entsteht ein Kontextfenster aus Artikeln, Kursen, Rollen und Prozessen.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {sources.map((source, i) => {
                const SourceIcon = source.icon
                return (
                  <FadeUp key={source.label} delay={i * 0.06}>
                    <motion.div
                      whileHover={{ y: -4, boxShadow: `0 18px 40px ${product.colorHex}10` }}
                      transition={{ duration: 0.2 }}
                      className="rounded-[26px] border bg-white p-6"
                      style={{ borderColor: `${product.colorHex}12` }}
                    >
                      <div className="mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex size-11 items-center justify-center rounded-2xl"
                            style={{ backgroundColor: `${product.colorHex}12` }}>
                            <SourceIcon className="size-5" style={{ color: product.colorHex }} />
                          </div>
                          <div>
                            <p className="text-[14px] font-semibold text-foreground">{source.label}</p>
                            <p className="text-[11px] text-muted-foreground">{source.title}</p>
                          </div>
                        </div>
                        <span className="rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em]"
                          style={{ borderColor: `${product.colorHex}14`, color: product.colorHex }}>
                          live
                        </span>
                      </div>
                      <p className="text-[14px] leading-relaxed text-muted-foreground">{source.desc}</p>
                    </motion.div>
                  </FadeUp>
                )
              })}
            </div>

            <FadeUp delay={0.12}>
              <div className="rounded-[30px] border bg-white p-7" style={{ borderColor: `${product.colorHex}12` }}>
                <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Antwort-Pipeline</p>
                <div className="space-y-5">
                  {workflow.map((step, i) => (
                    <div
                      key={step.number}
                      className={cn("pb-5", i < workflow.length - 1 && "border-b")}
                      style={i < workflow.length - 1 ? { borderColor: `${product.colorHex}10` } : undefined}
                    >
                      <p className="mb-3 font-mono text-[12px]" style={{ color: product.colorHex }}>{step.number}</p>
                      <h3 className="mb-2 text-[18px] font-semibold text-foreground">{step.title}</h3>
                      <p className="text-[14px] leading-relaxed text-muted-foreground">{step.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white py-32 sm:py-44">
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
          <FadeUp className="mb-16 text-center">
            <p className="mb-5 text-[10.5px] font-semibold uppercase tracking-[0.2em]" style={{ color: product.colorHex }}>
              Praktische Fragen
            </p>
            <h2 className="font-heading text-[46px] font-normal leading-[0.92] tracking-tight text-foreground sm:text-[68px]">
              Frag einfach, wie
              <br />
              <span className="italic" style={{ color: `${product.colorHex}66` }}>dein Team denkt.</span>
            </h2>
          </FadeUp>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc, i) => (
              <FadeUp key={uc} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: `0 18px 42px ${product.colorHex}10` }}
                  transition={{ duration: 0.2 }}
                  className="cursor-default rounded-[22px] border bg-white px-5 py-5"
                  style={{ borderColor: `${product.colorHex}10` }}
                >
                  <MessageSquare className="mb-3 size-4" style={{ color: product.colorHex }} />
                  <p className="text-[14px] leading-snug text-foreground/75">{uc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <LumenClosing product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Page router
// ══════════════════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════════════════
// Hire — Recruiting & Bewerbermanagement
// ══════════════════════════════════════════════════════════════════════════════

function HirePage({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 48])
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [dragStage, setDragStage] = useState(0)

  useEffect(() => {
    const stages = [0, 1, 2, 3]
    let idx = 0
    const interval = setInterval(() => {
      idx = (idx + 1) % stages.length
      setDragStage(stages[idx])
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  const pipeline = [
    { label: "Eingang",   color: "#64748b", count: 12, key: 0 },
    { label: "Screening", color: "#0284c7", count: 7,  key: 1 },
    { label: "Interview", color: "#7c3aed", count: 3,  key: 2 },
    { label: "Angebot",   color: "#16a34a", count: 1,  key: 3 },
  ]

  const candidates = [
    { name: "Julia Maier",    role: "F&B Manager",       stage: 1, avatar: "JM", score: 91 },
    { name: "Thomas Brandt",  role: "Sous Chef",         stage: 2, avatar: "TB", score: 87 },
    { name: "Lisa Schulz",    role: "Rezeption",         stage: 0, avatar: "LS", score: 78 },
    { name: "Kai Hoffmann",   role: "Event Coordinator", stage: 3, avatar: "KH", score: 95 },
  ]

  const jobListings = [
    { title: "Senior Koch (m/w/d)", dept: "Küche", count: 3, status: "Aktiv" },
    { title: "Rezeptionistin",      dept: "Front Office", count: 8, status: "Aktiv" },
    { title: "F&B Manager",         dept: "Food & Beverage", count: 2, status: "Aktiv" },
  ]

  const interviewSlots = [
    { time: "09:00", name: "Julia Maier",   type: "Video-Interview", confirmed: true },
    { time: "11:30", name: "Thomas Brandt", type: "Vor Ort",         confirmed: true },
    { time: "14:00", name: "Lea Vogel",     type: "Video-Interview", confirmed: false },
    { time: "16:00", name: "Max Werner",    type: "Telefonat",       confirmed: true },
  ]

  const handoffSteps = [
    { icon: UserPlus, label: "Hire", desc: "Angebot angenommen",    color: "#0284c7" },
    { icon: CheckCircle2, label: "Vertrag",  desc: "Digital signiert",    color: "#7c3aed" },
    { icon: GitBranch, label: "Flow",    desc: "Onboarding startet", color: "#8b5cf6" },
    { icon: Users,    label: "Persona",  desc: "Profil erstellt",    color: "#475569" },
  ]

  const features = product.features

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden"
        style={{ background: "#f8faff" }}
      >
        <Grain opacity={0.020} />
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Dot grid */}
          <div className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #0284c720 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              opacity: 0.55,
            }}
          />
          {/* Soft sky glow */}
          <div className="absolute right-[5%] top-[10%] h-[42rem] w-[42rem] rounded-full blur-[120px]"
            style={{ backgroundColor: "#0284c70a" }} />
          <div className="absolute left-[10%] bottom-[10%] h-[24rem] w-[24rem] rounded-full blur-[80px]"
            style={{ backgroundColor: "#7c3aed07" }} />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 sm:px-8">
          <div className="flex flex-1 flex-col justify-center pt-28 pb-16 lg:flex-row lg:items-center lg:gap-20 lg:pt-0">

            {/* Left — editorial copy */}
            <motion.div style={{ opacity: heroTextOpacity }} className="lg:w-[48%]">
              <FadeUp>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5">
                  <UserPlus className="size-3.5 text-sky-600" />
                  <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-sky-700">Hire — Recruiting</span>
                </div>
              </FadeUp>
              <FadeUp delay={0.06}>
                <h1 className="font-heading text-[52px] sm:text-[68px] lg:text-[78px] font-normal leading-[0.9] tracking-[-0.02em] text-slate-900 text-balance">
                  Die beste<br />
                  <span className="italic" style={{ color: product.colorHex }}>Person gewinnen.</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.12}>
                <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-slate-500 sm:text-[18px]">
                  Hire macht aus chaotischen Bewerbungspostfächern einen strukturierten Recruiting-Prozess — mit Kanban-Pipeline, Karriereseite, Interview-Koordination und nahtlosem Übergabe-Flow direkt in das Onboarding.
                </p>
              </FadeUp>
              <FadeUp delay={0.18}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Link href={accountCtaHref}
                    className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-7 py-3.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-85">
                    {accountCtaLabel} <ArrowRight className="size-4" />
                  </Link>
                  <Link href="/kontakt"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-[14px] font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50">
                    Demo ansehen
                  </Link>
                </div>
              </FadeUp>

              {/* Floating badges */}
              <FadeUp delay={0.28}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2.5 rounded-2xl border border-sky-100 bg-white px-4 py-2.5 shadow-sm shadow-sky-100/60">
                    <div className="flex size-7 items-center justify-center rounded-xl bg-sky-600">
                      <UserPlus className="size-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-800 leading-none">Neue Bewerbung</p>
                      <p className="text-[10px] text-slate-400 leading-none mt-0.5">Julia Maier — F&B Manager</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-white px-4 py-2.5 shadow-sm shadow-emerald-100/60">
                    <div className="relative flex size-7 items-center justify-center rounded-xl bg-emerald-50">
                      <CheckCircle2 className="size-3.5 text-emerald-600" />
                      <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-800 leading-none">Interview bestätigt</p>
                      <p className="text-[10px] text-slate-400 leading-none mt-0.5">Morgen 11:30 — Thomas Brandt</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </motion.div>

            {/* Right — animated Kanban pipeline */}
            <motion.div style={{ y: mockupY }} className="mt-14 lg:mt-0 lg:w-[52%]">
              <FadeUp delay={0.2}>
                <div className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_80px_rgba(2,132,199,0.10)] overflow-hidden">
                  {/* Toolbar */}
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="size-2.5 rounded-full bg-slate-200" />
                        <div className="size-2.5 rounded-full bg-slate-200" />
                        <div className="size-2.5 rounded-full bg-slate-200" />
                      </div>
                      <span className="text-[11px] font-medium text-slate-400">Recruiting Pipeline</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5">
                        <Filter className="size-3 text-slate-400" />
                        <span className="text-[10px] text-slate-400">Filter</span>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5">
                        <UserPlus className="size-3 text-white" />
                        <span className="text-[10px] font-medium text-white">Stelle</span>
                      </div>
                    </div>
                  </div>

                  {/* Pipeline columns */}
                  <div className="grid grid-cols-4 gap-0 border-b border-slate-100">
                    {pipeline.map((stage) => (
                      <div key={stage.key} className={cn("border-r border-slate-100 px-3 py-3 last:border-r-0")}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-semibold text-slate-500">{stage.label}</span>
                          <motion.span
                            animate={{ backgroundColor: dragStage === stage.key ? stage.color : "#f1f5f9" }}
                            transition={{ duration: 0.3 }}
                            className="flex size-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
                            style={{ backgroundColor: dragStage === stage.key ? stage.color : "#f1f5f9", color: dragStage === stage.key ? "white" : "#64748b" }}
                          >
                            {stage.count}
                          </motion.span>
                        </div>
                        <div className="space-y-1.5">
                          {candidates
                            .filter(c => c.stage === stage.key)
                            .map(c => (
                              <motion.div
                                key={c.name}
                                animate={{ scale: dragStage === stage.key ? 1.02 : 1, boxShadow: dragStage === stage.key ? `0 4px 16px ${stage.color}18` : "none" }}
                                transition={{ duration: 0.35 }}
                                className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 cursor-default"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="flex size-6 items-center justify-center rounded-lg text-[9px] font-bold text-white shrink-0"
                                    style={{ backgroundColor: stage.color }}>
                                    {c.avatar}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-[10px] font-semibold text-slate-700 truncate leading-none">{c.name}</p>
                                    <p className="text-[9px] text-slate-400 truncate leading-none mt-0.5">{c.role}</p>
                                  </div>
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                  <div className="h-1 w-full max-w-[56px] overflow-hidden rounded-full bg-slate-200">
                                    <motion.div
                                      animate={{ width: `${c.score}%` }}
                                      transition={{ duration: 0.8, delay: 0.2 }}
                                      className="h-full rounded-full"
                                      style={{ backgroundColor: stage.color }}
                                    />
                                  </div>
                                  <span className="text-[9px] font-semibold text-slate-500">{c.score}%</span>
                                </div>
                              </motion.div>
                            ))
                          }
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom stats bar */}
                  <div className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-4">
                      {pipeline.map(s => (
                        <div key={s.key} className="flex items-center gap-1.5">
                          <div className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
                          <span className="text-[10px] text-slate-500">{s.label} <strong>{s.count}</strong></span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg border border-slate-100 px-3 py-1.5">
                      <Download className="size-3 text-slate-400" />
                      <span className="text-[10px] text-slate-400">Export</span>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Karriereseite ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-slate-100 bg-white py-28 sm:py-40">
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 80% 50%, #0284c708 0%, transparent 60%)" }} />
        <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">
            {/* Left text */}
            <FadeUp>
              <p className="mb-5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-sky-600">Karriereseite</p>
              <h2 className="font-heading text-[40px] sm:text-[58px] font-normal leading-[0.93] tracking-tight text-slate-900 text-balance">
                Deine Jobs.<br />
                <span className="text-slate-300">Dein Design.</span>
              </h2>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-slate-500">
                Hire erstellt automatisch eine gebrandete Karriereseite für dein Unternehmen. Neue Stellen erscheinen sofort — kein Webmaster, keine Wartezeiten, keine externen Tools.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  "Automatisch erzeugte Karriereseite",
                  "Eingehende Bewerbungen direkt in der Pipeline",
                  "SEO-optimierte Stellenanzeigen",
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex size-5 items-center justify-center rounded-full bg-sky-100">
                      <Check className="size-3 text-sky-600" />
                    </div>
                    <span className="text-[14px] text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Right — job listings mockup */}
            <FadeUp delay={0.1}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-[0_16px_56px_rgba(2,132,199,0.07)]">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <div className="size-2.5 rounded-full bg-slate-300" />
                    <div className="size-2.5 rounded-full bg-slate-300" />
                    <div className="size-2.5 rounded-full bg-slate-300" />
                  </div>
                  <div className="ml-3 flex h-5 flex-1 items-center rounded-md bg-white px-3 text-[10px] text-slate-400 border border-slate-200">
                    karriere.hotel-bergblick.de
                  </div>
                </div>
                {/* Karriereseite header */}
                <div className="bg-sky-600 px-6 py-8 text-white">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-200 mb-1">Hotel Bergblick</p>
                  <h3 className="text-[22px] font-bold leading-tight">Werde Teil unseres Teams</h3>
                  <p className="mt-1 text-[12px] text-sky-200">{jobListings.length} offene Stellen · Österreich</p>
                </div>
                {/* Job listings */}
                <div className="divide-y divide-slate-100 bg-white">
                  {jobListings.map((job, i) => (
                    <motion.div
                      key={job.title}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                      className="flex items-center justify-between px-6 py-4 hover:bg-sky-50/50 transition-colors cursor-pointer group"
                    >
                      <div>
                        <p className="text-[13px] font-semibold text-slate-800 group-hover:text-sky-700 transition-colors">{job.title}</p>
                        <p className="text-[11px] text-slate-400">{job.dept}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">{job.status}</span>
                        <span className="text-[10px] text-slate-400">{job.count} Bewerber</span>
                        <ArrowRight className="size-3.5 text-slate-300 group-hover:text-sky-500 transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Interview-Koordination ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28 sm:py-40" style={{ background: "#0c1523" }}>
        <Grain opacity={0.035} />
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[20%] top-[15%] h-[28rem] w-[28rem] rounded-full blur-[100px]"
            style={{ backgroundColor: "#0284c712" }} />
          <div className="absolute right-[10%] bottom-[10%] h-[20rem] w-[20rem] rounded-full blur-[80px]"
            style={{ backgroundColor: "#7c3aed0c" }} />
        </div>
        <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-24">

            {/* Left — calendar UI */}
            <FadeUp>
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.4)]"
                style={{ background: "#111827" }}>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="size-3.5 text-sky-400" />
                    <span className="text-[12px] font-semibold text-white">Interview-Kalender</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Heute · Mittwoch 23. April</span>
                </div>
                {/* Slots */}
                <div className="divide-y divide-white/[0.04] px-5 py-2">
                  {interviewSlots.map((slot, i) => (
                    <motion.div
                      key={slot.time}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-4 py-3.5"
                    >
                      <span className="w-10 shrink-0 text-[11px] font-semibold text-slate-500">{slot.time}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-white truncate">{slot.name}</p>
                        <p className="text-[10.5px] text-slate-500">{slot.type}</p>
                      </div>
                      {slot.confirmed ? (
                        <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1">
                          <div className="size-1.5 rounded-full bg-emerald-400" />
                          <span className="text-[10px] font-semibold text-emerald-400">Bestätigt</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1">
                          <div className="size-1.5 rounded-full bg-amber-400" />
                          <span className="text-[10px] font-semibold text-amber-400">Ausstehend</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                {/* Footer */}
                <div className="flex items-center gap-3 border-t border-white/[0.06] px-5 py-3">
                  <Mail className="size-3 text-sky-500" />
                  <span className="text-[10px] text-slate-500">Einladungen automatisch versandt · 4 Interviews heute</span>
                </div>
              </div>
            </FadeUp>

            {/* Right — text */}
            <FadeUp delay={0.12}>
              <p className="mb-5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-sky-500">Interview-Koordination</p>
              <h2 className="font-heading text-[40px] sm:text-[56px] font-normal leading-[0.93] tracking-tight text-white text-balance">
                Kein Ping-Pong<br />
                <span className="text-white/30">mehr per E-Mail.</span>
              </h2>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-slate-400">
                Hire koordiniert Interview-Termine direkt mit Kandidat:innen, schickt automatische Erinnerungen und hält alle Beteiligten auf dem Laufenden — ohne manuelle Abstimmung.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { icon: Mail, label: "Automatische Einladungen" },
                  { icon: CalendarDays, label: "Kalender-Sync" },
                  { icon: Phone, label: "Video & Vor-Ort" },
                  { icon: Send, label: "Follow-up-Reminders" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] px-4 py-3"
                    style={{ background: "#1a2535" }}>
                    <Icon className="size-3.5 text-sky-400 shrink-0" />
                    <span className="text-[12px] font-medium text-slate-300">{label}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Handoff zu Flow ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-slate-100 bg-white py-28 sm:py-40">
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 0%, #0284c706 0%, transparent 55%)" }} />
        <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8">
          <FadeUp className="mb-16 text-center">
            <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-sky-600">Nahtloser Übergang</p>
            <h2 className="font-heading text-[40px] sm:text-[62px] font-normal leading-[0.93] tracking-tight text-slate-900 text-balance">
              Angenommen — und sofort<br />
              <span className="text-slate-300">im System.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-slate-500">
              Sobald ein Kandidat das Angebot annimmt, übergibt Hire automatisch an Flow und Persona. Kein manueller Export, kein Datenverlust.
            </p>
          </FadeUp>

          <div className="relative flex flex-col items-center gap-0 sm:flex-row sm:justify-center">
            {handoffSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <React.Fragment key={step.label}>
                  <FadeUp delay={i * 0.1}>
                    <motion.div
                      whileHover={{ y: -6, boxShadow: `0 20px 48px ${step.color}1a` }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white px-8 py-8 shadow-sm w-40"
                    >
                      <div className="flex size-12 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: `${step.color}14` }}>
                        <Icon className="size-5" style={{ color: step.color }} />
                      </div>
                      <div className="text-center">
                        <p className="text-[13px] font-bold text-slate-800">{step.label}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{step.desc}</p>
                      </div>
                    </motion.div>
                  </FadeUp>
                  {i < handoffSteps.length - 1 && (
                    <FadeUp delay={i * 0.1 + 0.05}>
                      <div className="flex items-center justify-center w-8 sm:w-12">
                        <ArrowRight className="size-4 text-slate-300" />
                      </div>
                    </FadeUp>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-slate-100 bg-slate-50/60 py-28 sm:py-40">
        <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8">
          <FadeUp className="mb-14">
            <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-sky-600">Features</p>
            <h2 className="font-heading text-[38px] sm:text-[58px] font-normal leading-[0.93] tracking-tight text-slate-900 text-balance">
              Alles für deinen<br />
              <span className="text-slate-300">Recruiting-Alltag.</span>
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <FadeUp key={feature.title} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -5, boxShadow: "0 20px 48px rgba(2,132,199,0.08)" }}
                    transition={{ duration: 0.22 }}
                    className="h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                  >
                    <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-sky-50">
                      <Icon className="size-4.5 text-sky-600" />
                    </div>
                    <h3 className="mb-2 text-[15px] font-semibold text-slate-800">{feature.title}</h3>
                    <p className="text-[13.5px] leading-relaxed text-slate-500">{feature.body}</p>
                  </motion.div>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Quote ────────────────────────────────────────────────────────────── */}
      {product.quote && (
        <section className="relative overflow-hidden border-t border-slate-100 bg-white py-24 sm:py-36">
          <div className="relative mx-auto max-w-3xl px-6 sm:px-8 text-center">
            <FadeUp>
              <div className="mb-8 inline-flex size-12 items-center justify-center rounded-full bg-sky-50">
                <Star className="size-5 text-sky-500" />
              </div>
              <blockquote className="font-heading text-[26px] sm:text-[36px] font-normal leading-[1.15] tracking-tight text-slate-800 text-balance italic">
                "{product.quote.text}"
              </blockquote>
              <p className="mt-8 text-[13px] font-medium text-slate-400">
                — {product.quote.author}, {product.quote.role}
              </p>
            </FadeUp>
          </div>
        </section>
      )}

      <HireClosing product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Payroll — Gehaltsabrechnung & DATEV-Export
// ══════════════════════════════════════════════════════════════════════════════

function PayrollPage({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 44])
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Animated salary counter
  const counterRef = useRef<HTMLDivElement>(null)
  const counterInView = useInView(counterRef, { once: true, margin: "-100px" })
  const [displayValue, setDisplayValue] = useState(0)
  const TARGET = 24780

  useEffect(() => {
    if (!counterInView) return
    let start: number | null = null
    const duration = 1800
    function step(timestamp: number) {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(eased * TARGET))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [counterInView])

  const employees = [
    { initials: "AW", name: "Anna Weber",    gross: "3.840 €", net: "2.420 €", status: "Freigegeben", color: "#0d9488" },
    { initials: "MH", name: "Max Huber",     gross: "4.200 €", net: "2.650 €", status: "Freigegeben", color: "#0d9488" },
    { initials: "KB", name: "Klara Beck",    gross: "3.200 €", net: "2.050 €", status: "Freigegeben", color: "#0d9488" },
    { initials: "LB", name: "Lukas Brauer",  gross: "5.100 €", net: "3.110 €", status: "In Prüfung",  color: "#f59e0b" },
    { initials: "SR", name: "Sara Richter",  gross: "4.440 €", net: "2.790 €", status: "Freigegeben", color: "#0d9488" },
  ]

  const barData = [
    { day: "Mo", hrs: 8.5, over: 0.5 },
    { day: "Di", hrs: 9.0, over: 1.0 },
    { day: "Mi", hrs: 7.5, over: 0 },
    { day: "Do", hrs: 8.0, over: 0 },
    { day: "Fr", hrs: 9.5, over: 1.5 },
    { day: "Sa", hrs: 6.0, over: 0 },
    { day: "So", hrs: 0,   over: 0 },
  ]
  const maxHrs = 10

  const processSteps = [
    { n: "01", icon: ClipboardList, title: "Stunden prüfen",     body: "Alle Zeiterfassungsdaten aus Tempo werden automatisch importiert und auf Vollständigkeit geprüft." },
    { n: "02", icon: CheckCircle2,  title: "Abrechnung freigeben", body: "HR und Manager geben die Abrechnung Schritt für Schritt frei — mit Audit-Trail und Vieraugen-Prinzip." },
    { n: "03", icon: Download,      title: "DATEV exportieren",   body: "Ein Klick erzeugt eine DATEV-kompatible Exportdatei — sofort an den Steuerberater übergabefertig." },
  ]

  const features = product.features

  return (
    <>
      {/* ── Hero (dark) ─────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden"
        style={{ background: "#080f1a" }}
      >
        <Grain opacity={0.038} />
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Teal grid lines */}
          <div className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${product.colorHex}18 1px, transparent 1px), linear-gradient(90deg, ${product.colorHex}18 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
              opacity: 0.4,
            }}
          />
          <div className="absolute left-[15%] top-[20%] h-[36rem] w-[36rem] rounded-full blur-[110px]"
            style={{ backgroundColor: "#0d948810" }} />
          <div className="absolute right-[8%] bottom-[12%] h-[24rem] w-[24rem] rounded-full blur-[90px]"
            style={{ backgroundColor: "#0d948808" }} />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 sm:px-8">
          <div className="flex flex-1 flex-col justify-center pt-28 pb-16 lg:flex-row lg:items-center lg:gap-20 lg:pt-0">

            {/* Left text */}
            <motion.div style={{ opacity: heroTextOpacity }} className="lg:w-[45%]">
              <FadeUp>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-800/60 bg-teal-950/50 px-4 py-1.5">
                  <Wallet className="size-3.5 text-teal-400" />
                  <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-teal-400">Payroll — Abrechnung</span>
                </div>
              </FadeUp>
              <FadeUp delay={0.06}>
                <h1 className="font-heading text-[52px] sm:text-[68px] lg:text-[78px] font-normal leading-[0.9] tracking-[-0.02em] text-white text-balance">
                  Löhne.<br />
                  <span className="italic" style={{ color: product.colorHex }}>Pünktlich. Richtig.</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.12}>
                <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-slate-400 sm:text-[18px]">
                  Payroll übernimmt Zeitdaten aus Tempo, berechnet Brutto und Netto, koordiniert die Freigabe — und exportiert alles DATEV-kompatibel. Kein Postfach-Chaos, keine Fehler, kein Stress.
                </p>
              </FadeUp>
              <FadeUp delay={0.18}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Link href={accountCtaHref}
                    className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-85"
                    style={{ backgroundColor: product.colorHex }}>
                    {accountCtaLabel} <ArrowRight className="size-4" />
                  </Link>
                  <Link href="/kontakt"
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.05] px-7 py-3.5 text-[14px] font-medium text-slate-300 transition-colors hover:bg-white/[0.08]">
                    Demo ansehen
                  </Link>
                </div>
              </FadeUp>

              {/* Floating badges */}
              <FadeUp delay={0.26}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2.5 rounded-2xl border border-teal-800/50 bg-teal-950/60 px-4 py-2.5 shadow-lg">
                    <div className="flex size-7 items-center justify-center rounded-xl" style={{ backgroundColor: product.colorHex }}>
                      <Download className="size-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-white leading-none">DATEV-Export bereit</p>
                      <p className="text-[10px] text-teal-400/70 leading-none mt-0.5">April 2025 · 24 Mitarbeiter</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-4 py-2.5 shadow-lg">
                    <div className="relative flex size-7 items-center justify-center rounded-xl bg-emerald-950/80">
                      <CheckCircle2 className="size-3.5 text-emerald-400" />
                      <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-emerald-500 ring-2 ring-[#080f1a]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-white leading-none">7/7 Abrechnungen freigegeben</p>
                      <p className="text-[10px] text-slate-500 leading-none mt-0.5">Alle Departments bestätigt</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </motion.div>

            {/* Right — payroll dashboard */}
            <motion.div ref={counterRef} style={{ y: mockupY }} className="mt-14 lg:mt-0 lg:w-[55%]">
              <FadeUp delay={0.16}>
                <div className="overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_32px_100px_rgba(13,148,136,0.15)]"
                  style={{ background: "#0f1d2b" }}>
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <Wallet className="size-3.5 text-teal-400" />
                      <span className="text-[12px] font-semibold text-white">Payroll — April 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">Abgeschlossen</span>
                      <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-medium text-teal-400 border border-teal-800/50 hover:bg-teal-900/30 transition-colors">
                        <Download className="size-3" />
                        DATEV
                      </button>
                    </div>
                  </div>

                  {/* KPI row */}
                  <div className="grid grid-cols-3 divide-x divide-white/[0.05] border-b border-white/[0.06]">
                    <div className="px-5 py-4">
                      <p className="text-[10px] text-slate-500 mb-1">Gesamtlohnkosten</p>
                      <p className="font-heading text-[22px] font-semibold text-white leading-none">
                        {displayValue.toLocaleString("de-DE")} €
                      </p>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-[10px] text-slate-500 mb-1">Mitarbeiter</p>
                      <p className="font-heading text-[22px] font-semibold text-white leading-none">24</p>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-[10px] text-slate-500 mb-1">Status</p>
                      <div className="flex items-center gap-1.5">
                        <div className="size-2 rounded-full bg-emerald-400" />
                        <p className="text-[11px] font-semibold text-emerald-400">Freigegeben</p>
                      </div>
                    </div>
                  </div>

                  {/* Employee rows */}
                  <div className="divide-y divide-white/[0.04]">
                    {employees.map((emp, i) => (
                      <motion.div
                        key={emp.name}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, delay: 0.25 + i * 0.08 }}
                        className="flex items-center justify-between px-5 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex size-7 items-center justify-center rounded-lg text-[9px] font-bold text-white shrink-0"
                            style={{ backgroundColor: `${product.colorHex}30`, color: product.colorHex }}>
                            {emp.initials}
                          </div>
                          <div>
                            <p className="text-[12px] font-semibold text-white leading-none">{emp.name}</p>
                            <p className="text-[10px] text-slate-500 leading-none mt-0.5">{emp.gross} brutto</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-[12px] font-semibold text-teal-300">{emp.net} netto</p>
                          <div className="rounded-full px-2.5 py-0.5 text-[9.5px] font-semibold"
                            style={{
                              backgroundColor: emp.status === "Freigegeben" ? "#064e3b" : "#451a03",
                              color: emp.status === "Freigegeben" ? "#34d399" : "#fbbf24",
                            }}>
                            {emp.status}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3-Step Process (light) ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-slate-100 bg-white py-28 sm:py-40">
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 100%, #0d948807 0%, transparent 65%)" }} />
        <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8">
          <FadeUp className="mb-16 text-center">
            <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-teal-600">Prozess</p>
            <h2 className="font-heading text-[40px] sm:text-[62px] font-normal leading-[0.93] tracking-tight text-slate-900 text-balance">
              Drei Schritte.<br />
              <span className="text-slate-300">Abrechnung fertig.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-slate-500">
              Payroll strukturiert den gesamten Prozess von der Stundenkontrolle bis zum DATEV-Export — transparent, nachvollziehbar und rechtssicher.
            </p>
          </FadeUp>

          <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Connector line */}
            <div aria-hidden className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-[52px] hidden h-px bg-gradient-to-r from-teal-100 via-teal-200 to-teal-100 sm:block" />

            {processSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <FadeUp key={step.n} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(13,148,136,0.10)" }}
                    transition={{ duration: 0.25 }}
                    className="relative rounded-2xl border border-slate-100 bg-white p-8 shadow-sm text-center"
                  >
                    <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-teal-50 border border-teal-100 relative z-10">
                      <Icon className="size-6 text-teal-600" />
                    </div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-500">{step.n}</p>
                    <h3 className="mb-3 text-[16px] font-bold text-slate-800">{step.title}</h3>
                    <p className="text-[13.5px] leading-relaxed text-slate-500">{step.body}</p>
                  </motion.div>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Tempo Integration (dark) ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28 sm:py-40" style={{ background: "#070e1a" }}>
        <Grain opacity={0.032} />
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute right-[15%] top-[20%] h-[30rem] w-[30rem] rounded-full blur-[100px]"
            style={{ backgroundColor: "#0d948810" }} />
        </div>
        <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">

            {/* Left text */}
            <FadeUp>
              <p className="mb-5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-teal-500">Tempo-Integration</p>
              <h2 className="font-heading text-[40px] sm:text-[56px] font-normal leading-[0.93] tracking-tight text-white text-balance">
                Zeitdaten rein.<br />
                <span className="text-white/25">Abrechnung raus.</span>
              </h2>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-slate-400">
                Payroll liest Arbeitszeiten, Überstunden und Abwesenheiten direkt aus Tempo. Kein Export, kein Excel, kein manuelles Übertragen. Alle Daten fließen automatisch — und werden auf Vollständigkeit geprüft.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { icon: Clock, label: "Stunden automatisch" },
                  { icon: CalendarDays, label: "Urlaub & Abwesenheit" },
                  { icon: TrendingUp, label: "Überstunden erkannt" },
                  { icon: Shield, label: "Vollständigkeitsprüfung" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] px-4 py-3"
                    style={{ background: "#111d2b" }}>
                    <Icon className="size-3.5 text-teal-400 shrink-0" />
                    <span className="text-[12px] font-medium text-slate-300">{label}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Right — animated bar chart */}
            <FadeUp delay={0.1}>
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_24px_80px_rgba(13,148,136,0.12)]"
                style={{ background: "#0f1e2e" }}>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <Clock className="size-3.5 text-teal-400" />
                    <span className="text-[12px] font-semibold text-white">Wochenübersicht · KW 17</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="size-2 rounded-full bg-teal-500" />
                      <span className="text-[10px] text-slate-500">Arbeitszeit</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="size-2 rounded-full bg-amber-500" />
                      <span className="text-[10px] text-slate-500">Überstunden</span>
                    </div>
                  </div>
                </div>
                {/* Chart */}
                <div className="px-5 pt-6 pb-4">
                  <div className="flex items-end justify-between gap-2 h-36">
                    {barData.map((d, i) => (
                      <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                        <div className="flex w-full flex-col items-stretch justify-end gap-px" style={{ height: "120px" }}>
                          {d.over > 0 && (
                            <motion.div
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{ duration: 0.6, delay: 0.4 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                              style={{ height: `${(d.over / maxHrs) * 100}%`, backgroundColor: "#f59e0b", transformOrigin: "bottom", borderRadius: "3px 3px 0 0" }}
                            />
                          )}
                          {d.hrs > 0 && (
                            <motion.div
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{ duration: 0.7, delay: 0.3 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                              style={{ height: `${(d.hrs / maxHrs) * 100}%`, backgroundColor: product.colorHex, transformOrigin: "bottom", borderRadius: d.over > 0 ? "0" : "3px 3px 0 0", opacity: 0.85 }}
                            />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-600">{d.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Stats row */}
                <div className="grid grid-cols-3 divide-x divide-white/[0.05] border-t border-white/[0.06]">
                  <div className="px-4 py-3 text-center">
                    <p className="text-[10px] text-slate-500 mb-0.5">Ø Stunden/Tag</p>
                    <p className="text-[13px] font-bold text-white">7.6 h</p>
                  </div>
                  <div className="px-4 py-3 text-center">
                    <p className="text-[10px] text-slate-500 mb-0.5">Überstunden</p>
                    <p className="text-[13px] font-bold text-amber-400">+3.0 h</p>
                  </div>
                  <div className="px-4 py-3 text-center">
                    <p className="text-[10px] text-slate-500 mb-0.5">Vollständigkeit</p>
                    <p className="text-[13px] font-bold text-emerald-400">100 %</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-slate-100 bg-white py-28 sm:py-40">
        <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8">
          <FadeUp className="mb-14">
            <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-teal-600">Features</p>
            <h2 className="font-heading text-[38px] sm:text-[58px] font-normal leading-[0.93] tracking-tight text-slate-900 text-balance">
              Abrechnung ohne<br />
              <span className="text-slate-300">Kompromisse.</span>
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <FadeUp key={feature.title} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -5, boxShadow: "0 20px 48px rgba(13,148,136,0.08)" }}
                    transition={{ duration: 0.22 }}
                    className="h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                  >
                    <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-teal-50">
                      <Icon className="size-4.5 text-teal-600" />
                    </div>
                    <h3 className="mb-2 text-[15px] font-semibold text-slate-800">{feature.title}</h3>
                    <p className="text-[13.5px] leading-relaxed text-slate-500">{feature.body}</p>
                  </motion.div>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      <PayrollClosing product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Shared minimal final CTA strip
// ══════════════════════════════════════════════════════════════════════════════

function ProductFinalCTA({ product, accountCtaHref, accountCtaLabel }: ProductPageProps & { accountCtaHref: string; accountCtaLabel: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px 0px" as any })
  const Icon = product.icon
  return (
    <section ref={ref} className="py-24 bg-foreground relative overflow-hidden">
      <Grain opacity={0.04} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 60% 50%, ${product.colorHex}22 0%, transparent 55%)` }} />
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className={cn("size-14 rounded-2xl flex items-center justify-center mb-5", product.color)} style={{ boxShadow: `0 12px 40px ${product.colorHex}40` }}>
            <Icon className="size-7 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-background leading-[0.93] mb-3">
            {product.name} für dein Team.
          </h2>
          <p className="text-background/50 text-[15px] max-w-sm leading-relaxed">{product.tagline}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link href="/demo"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-background text-foreground text-[13px] font-semibold hover:opacity-90 transition-opacity">
            Demo buchen <ArrowRight className="size-4" />
          </Link>
          <Link href={accountCtaHref}
            className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-background/20 text-background/80 hover:text-background text-[13px] font-medium transition-colors">
            {accountCtaLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Persona closing — org chart + team analytics
// ══════════════════════════════════════════════════════════════════════════════

function PersonaClosing({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px 0px" as any })

  const depts = [
    { name: "Geschäftsführung", color: "bg-slate-400", people: 2, children: ["F&B", "Operations", "Marketing"] },
    { name: "F&B", color: "bg-emerald-500", people: 12, children: [] },
    { name: "Operations", color: "bg-violet-500", people: 24, children: [] },
    { name: "Marketing", color: "bg-sky-500", people: 8, children: [] },
  ]

  const stats = [
    { value: "247", label: "Mitarbeiter" },
    { value: "14", label: "Abteilungen" },
    { value: "38", label: "Positionen" },
    { value: "4.2", label: "Ø Dokumente/MA" },
  ]

  return (
    <>
      <section ref={ref} className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] rounded-full bg-slate-700/20 blur-[80px]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <defs><pattern id="pg" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#pg)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-4">Organisationsstruktur</p>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-[0.93] mb-6">
                Euer ganzes Team.<br /><span className="text-slate-400">Klar. Strukturiert. Aktuell.</span>
              </h2>
              <p className="text-slate-400 text-[15px] leading-relaxed mb-8">
                Persona ist das lebende Organigramm eurer Organisation — von der Unternehmensstruktur bis zum einzelnen Arbeitsprofil.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-4">
                    <div className="text-3xl font-black text-white tabular-nums mb-1">{s.value}</div>
                    <div className="text-[12px] text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-6">Organigramm — Mein Betrieb</div>
                <div className="flex flex-col items-center gap-0">
                  {/* Root */}
                  <div className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 flex items-center gap-3">
                    <div className="size-7 rounded-lg bg-slate-400 flex items-center justify-center text-[10px] font-bold text-white">GF</div>
                    <div>
                      <div className="text-[13px] font-semibold text-white">Geschäftsführung</div>
                      <div className="text-[10px] text-slate-500">2 Personen</div>
                    </div>
                  </div>
                  <div className="w-px h-5 bg-slate-700" />
                  <div className="w-full flex items-start justify-center gap-3 relative">
                    <div className="absolute top-0 left-1/4 right-1/4 h-px bg-slate-700" />
                    {[
                      { label: "F&B", color: "bg-emerald-600", count: 12 },
                      { label: "Operations", color: "bg-violet-600", count: 24 },
                      { label: "Marketing", color: "bg-sky-600", count: 8 },
                    ].map((d, i) => (
                      <div key={d.label} className="flex flex-col items-center">
                        <div className="w-px h-5 bg-slate-700" />
                        <div className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 flex items-center gap-2 min-w-0">
                          <div className={cn("size-6 rounded-md flex items-center justify-center text-[9px] font-bold text-white shrink-0", d.color)}>{d.label[0]}</div>
                          <div>
                            <div className="text-[12px] font-semibold text-white whitespace-nowrap">{d.label}</div>
                            <div className="text-[10px] text-slate-500">{d.count} MA</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 w-full flex items-center justify-between px-2">
                    {["Sarah K.", "Tom M.", "Julia R.", "Ben W."].map((name, i) => (
                      <div key={name} className="flex flex-col items-center gap-1.5">
                        <div className={cn("size-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white",
                          ["bg-emerald-500", "bg-violet-500", "bg-sky-500", "bg-rose-500"][i])}>
                          {name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="text-[9px] text-slate-500 whitespace-nowrap">{name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <ProductFinalCTA product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Atlas closing — search experience + knowledge stats
// ══════════════════════════════════════════════════════════════════════════════

function AtlasClosing({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px 0px" as any })

  const articles = [
    { title: "HACCP-Richtlinien für die Küche", cat: "Hygiene", views: "1.2k", updated: "Heute" },
    { title: "Einarbeitung neuer Mitarbeiter", cat: "HR", views: "834", updated: "Gestern" },
    { title: "Allergenkennzeichnung nach EU-VO", cat: "Compliance", views: "612", updated: "vor 3 Tagen" },
    { title: "Brandschutz — Notfallplan Hotel", cat: "Sicherheit", views: "409", updated: "vor 1 Woche" },
  ]

  return (
    <>
      <section ref={ref} className="py-24 bg-background border-t border-border">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="text-center mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600/60 mb-3">Wissensdatenbank</p>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">Alles findet sich.<br /><span className="text-muted-foreground">Sofort.</span></h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto mb-10">
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 shadow-lg shadow-emerald-500/5">
              <Search className="size-5 text-emerald-500 shrink-0" />
              <span className="text-[15px] text-emerald-700 dark:text-emerald-300 font-medium">HACCP Vorschriften Küche</span>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground">12 Treffer</span>
                <div className="h-5 w-px bg-border" />
                <span className="text-[11px] text-muted-foreground">in 0.08s</span>
              </div>
            </div>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-2">
            {articles.map((a, i) => (
              <motion.div key={a.title}
                initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                className="flex items-center gap-4 px-5 py-4 rounded-xl border border-border bg-background hover:bg-muted/40 transition-colors group cursor-pointer">
                <FileText className="size-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold text-foreground group-hover:text-emerald-600 transition-colors truncate">{a.title}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{a.updated} · {a.views} Aufrufe</div>
                </div>
                <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">{a.cat}</span>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto text-center">
            {[{ v: "2.400+", l: "Artikel" }, { v: "98 %", l: "Suchgenauigkeit" }, { v: "< 0.1s", l: "Suchzeit" }].map(s => (
              <div key={s.l} className="rounded-xl border border-border bg-muted/30 px-4 py-4">
                <div className="text-2xl font-black text-foreground">{s.v}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <ProductFinalCTA product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Academy closing — learning progress + certificate
// ══════════════════════════════════════════════════════════════════════════════

function AcademyClosing({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px 0px" as any })

  const formats = [
    { icon: "▶", label: "Video", desc: "Aufgezeichnete Lektionen & Screencasts", color: "bg-blue-600" },
    { icon: "✓", label: "Quiz", desc: "Multiple-Choice & Wissensfragen", color: "bg-violet-600" },
    { icon: "Aa", label: "Text", desc: "Rich-Text-Artikel mit Medien", color: "bg-slate-600" },
    { icon: "⚙", label: "SCORM", desc: "Import externer Lernpakete", color: "bg-sky-600" },
  ]

  return (
    <>
      <section ref={ref} className="py-24 bg-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] rounded-full bg-blue-800/20 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-400/60 mb-4">Lernformate</p>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-[0.93] mb-6">
                Jede Art zu lernen.<br /><span className="text-blue-400">In einem System.</span>
              </h2>
              <p className="text-blue-200/60 text-[15px] leading-relaxed mb-8">
                Academy unterstützt alle modernen Lernformate — egal ob selbstproduziert oder importiert.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {formats.map((f) => (
                  <div key={f.label} className="rounded-xl border border-blue-800 bg-blue-900/50 p-4">
                    <div className={cn("size-8 rounded-lg flex items-center justify-center text-white text-[13px] font-bold mb-3", f.color)}>{f.icon}</div>
                    <div className="text-[13px] font-bold text-white mb-1">{f.label}</div>
                    <div className="text-[11px] text-blue-300/60 leading-snug">{f.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.12 }}>
              <div className="rounded-2xl border border-blue-800 bg-blue-900/40 p-6 mb-4">
                <div className="text-[11px] font-semibold text-blue-400/60 uppercase tracking-wider mb-5">Team-Lernstand</div>
                <div className="flex items-end gap-8 mb-6">
                  {[{ pct: 78, label: "Abgeschlossen", color: "#3b82f6" }, { pct: 16, label: "In Bearbeitung", color: "#a78bfa" }, { pct: 6, label: "Fällig", color: "#f87171" }].map(r => (
                    <div key={r.label} className="flex-1 flex flex-col items-center">
                      <div className="relative size-16 mb-2">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                          <circle cx="18" cy="18" r="15" fill="none" stroke={r.color} strokeWidth="3"
                            strokeDasharray={`${r.pct * 0.94} 94`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[12px] font-black text-white">{r.pct}%</div>
                      </div>
                      <div className="text-[10px] text-blue-300/60 text-center leading-tight">{r.label}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {["HACCP — Grundlagen", "Brandschutz 2024", "Servicestandards Hotel"].map((c, i) => (
                    <div key={c} className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] text-white mb-1 truncate">{c}</div>
                        <div className="h-1.5 rounded-full bg-blue-900 overflow-hidden">
                          <div className="h-full rounded-full bg-blue-400" style={{ width: `${[78, 45, 92][i]}%` }} />
                        </div>
                      </div>
                      <div className="text-[11px] text-blue-400 font-semibold">{[78, 45, 92][i]}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-blue-700 bg-gradient-to-br from-blue-600 to-violet-700 p-5 flex items-center gap-4">
                <div className="size-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Award className="size-6 text-white" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-white">Zertifikat ausgestellt</div>
                  <div className="text-[12px] text-white/60 mt-0.5">Sarah K. · HACCP Grundlagen · heute</div>
                </div>
                <div className="ml-auto text-[11px] bg-white/20 px-2.5 py-1 rounded-full text-white font-semibold">✓ Bestanden</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <ProductFinalCTA product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Flow closing — onboarding phase timeline
// ══════════════════════════════════════════════════════════════════════════════

function FlowClosing({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px 0px" as any })

  const phases = [
    { num: "01", label: "Vorbereitung", sub: "Vor Tag 1", color: "border-violet-500 bg-violet-500/10", tasks: ["Account anlegen", "Geräte bestellen", "Buddy zuweisen"] },
    { num: "02", label: "Erste Woche", sub: "Tag 1–5", color: "border-violet-400 bg-violet-400/10", tasks: ["Intro-Meeting", "Tool-Einführung", "Erstgespräch HR"] },
    { num: "03", label: "Erster Monat", sub: "Woche 2–4", color: "border-violet-300 bg-violet-300/10", tasks: ["Erste Aufgaben", "Feedback-Runde", "Schulungen"] },
    { num: "04", label: "Abschluss", sub: "nach 90 Tagen", color: "border-violet-200 bg-violet-200/10", tasks: ["Review-Gespräch", "Ziele festlegen", "Abschluss ✓"] },
  ]

  return (
    <>
      <section ref={ref} className="py-24 bg-background border-t border-border">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="text-center mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-violet-500/60 mb-3">Onboarding-Phasen</p>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground">Vom ersten Tag<br /><span className="text-muted-foreground">bis zur vollen Wirkung.</span></h2>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {phases.map((phase, i) => (
                <motion.div key={phase.num}
                  initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={cn("relative rounded-2xl border-2 p-5", phase.color)}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="size-8 rounded-full border-2 border-violet-500 bg-background flex items-center justify-center text-[11px] font-black text-violet-600">{phase.num}</div>
                    <div>
                      <div className="text-[14px] font-bold text-foreground">{phase.label}</div>
                      <div className="text-[11px] text-muted-foreground">{phase.sub}</div>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {phase.tasks.map((t, j) => (
                      <li key={t} className="flex items-center gap-2 text-[12.5px] text-muted-foreground">
                        <div className={cn("size-4 rounded-full border flex items-center justify-center shrink-0",
                          j < 2 ? "bg-violet-500 border-violet-500" : "border-border")}>
                          {j < 2 && <Check className="size-2.5 text-white" />}
                        </div>
                        {t}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-12 flex flex-wrap justify-center gap-6">
            {[{ v: "340+", l: "Onboarding-Templates" }, { v: "14 Tage", l: "Ø Zeit bis Produktivität" }, { v: "94 %", l: "Abschlussquote" }].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-3xl font-black text-foreground">{s.v}</div>
                <div className="text-[12px] text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <ProductFinalCTA product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Tempo closing — weekly time grid + absence balance
// ══════════════════════════════════════════════════════════════════════════════

function TempoClosing({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px 0px" as any })

  const days = ["Mo", "Di", "Mi", "Do", "Fr"]
  const employees = [
    { name: "Sarah K.", blocks: [8.5, 8, 0, 7.5, 8] },
    { name: "Tom M.", blocks: [7, 8.5, 9, 8, 0] },
    { name: "Julia R.", blocks: [8, 0, 8, 9, 8.5] },
  ]

  const absences = [
    { label: "Resturlaub", used: 12, total: 30, color: "bg-orange-400" },
    { label: "Krankentage", used: 2, total: 15, color: "bg-rose-400" },
    { label: "Überstunden", used: 18.5, total: 40, color: "bg-amber-400" },
  ]

  return (
    <>
      <section ref={ref} className="py-24 bg-orange-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] rounded-full bg-orange-800/20 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="text-center mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-orange-400/60 mb-3">Zeiterfassung & Urlaub</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Jede Stunde.<br /><span className="text-orange-300">Klar erfasst.</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Week grid */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.08 }}
              className="lg:col-span-2 rounded-2xl border border-orange-800 bg-orange-900/40 p-5">
              <div className="text-[11px] font-semibold text-orange-400/60 uppercase tracking-wider mb-4">Wochenansicht — KW 21</div>
              <div className="grid grid-cols-6 gap-1 mb-2">
                <div />
                {days.map(d => <div key={d} className="text-[11px] text-orange-300/50 text-center font-semibold">{d}</div>)}
              </div>
              {employees.map((emp, ei) => (
                <div key={emp.name} className="grid grid-cols-6 gap-1 mb-1.5">
                  <div className="text-[11px] text-orange-200/60 flex items-center pr-1 truncate">{emp.name.split(" ")[0]}</div>
                  {emp.blocks.map((h, di) => (
                    <div key={di} className={cn("rounded-md h-8 flex items-center justify-center text-[10px] font-semibold",
                      h === 0 ? "bg-orange-900/30 text-orange-800" : "bg-orange-500/30 text-orange-200 border border-orange-500/30")}>
                      {h === 0 ? "–" : `${h}h`}
                    </div>
                  ))}
                </div>
              ))}
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-orange-500/10 border border-orange-500/20 px-3 py-2">
                <div className="size-1.5 rounded-full bg-orange-400 animate-pulse" />
                <span className="text-[12px] text-orange-200">Sarah K. ist seit 2h 14min eingestempelt</span>
              </div>
            </motion.div>

            {/* Absence balances */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.15 }}
              className="rounded-2xl border border-orange-800 bg-orange-900/40 p-5">
              <div className="text-[11px] font-semibold text-orange-400/60 uppercase tracking-wider mb-5">Abwesenheitssalden</div>
              <div className="space-y-5">
                {absences.map(a => (
                  <div key={a.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] text-orange-100 font-medium">{a.label}</span>
                      <span className="text-[12px] text-orange-300 font-mono">{a.used} / {a.total}</span>
                    </div>
                    <div className="h-2 rounded-full bg-orange-900 overflow-hidden">
                      <div className={cn("h-full rounded-full", a.color)} style={{ width: `${(a.used / a.total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-orange-700 bg-orange-500/15 px-4 py-3">
                <div className="text-[11px] text-orange-400/70 uppercase tracking-wider mb-1">Offene Anträge</div>
                <div className="text-2xl font-black text-white">3</div>
                <div className="text-[11px] text-orange-300/60 mt-0.5">warten auf Freigabe</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <ProductFinalCTA product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Roster closing — shift board
// ══════════════════════════════════════════════════════════════════════════════

function RosterClosing({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px 0px" as any })

  const rosterDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
  const shifts: Record<string, (string | null)[]> = {
    "Sarah K.":  ["Früh 6–14", "Früh 6–14", null, "Spät 14–22", "Früh 6–14", "Früh 6–14", null],
    "Tom M.":    [null, "Spät 14–22", "Spät 14–22", "Früh 6–14", null, "Spät 14–22", "Spät 14–22"],
    "Julia R.":  ["Spät 14–22", null, "Früh 6–14", null, "Spät 14–22", null, "Früh 6–14"],
    "Ben W.":    ["Nacht", "Nacht", "Nacht", null, null, "Nacht", "Nacht"],
  }
  const shiftColor = (s: string | null) => {
    if (!s) return "bg-transparent text-transparent border-transparent"
    if (s.startsWith("Früh")) return "bg-amber-500/20 text-amber-300 border-amber-500/30"
    if (s.startsWith("Spät")) return "bg-violet-500/20 text-violet-300 border-violet-500/30"
    return "bg-slate-500/20 text-slate-300 border-slate-500/30"
  }

  return (
    <>
      <section ref={ref} className="py-24 bg-rose-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[300px] rounded-full bg-rose-800/20 blur-[80px]" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-rose-400/60 mb-2">Schichtplan — KW 21</p>
              <h2 className="text-4xl font-black text-white">Wer wann wo.<br /><span className="text-rose-300">Immer aktuell.</span></h2>
            </div>
            <div className="flex gap-3 text-[11px]">
              {[{ dot: "bg-amber-400", label: "Früh" }, { dot: "bg-violet-400", label: "Spät" }, { dot: "bg-slate-400", label: "Nacht" }].map(l => (
                <div key={l.label} className="flex items-center gap-1.5 text-rose-200/60">
                  <div className={cn("size-2 rounded-full", l.dot)} />{l.label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-rose-800 bg-rose-900/40 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-rose-800">
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-rose-400/60 uppercase tracking-wider w-24">Mitarbeiter</th>
                    {rosterDays.map((d, i) => (
                      <th key={d} className={cn("px-2 py-3 text-center text-[11px] font-semibold",
                        i === 5 ? "text-rose-400" : "text-rose-300/50")}>{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(shifts).map(([name, slots], ri) => (
                    <tr key={name} className="border-b border-rose-900 last:border-0">
                      <td className="px-4 py-3 text-[12px] font-semibold text-rose-100">{name.split(" ")[0]}</td>
                      {slots.map((s, di) => (
                        <td key={di} className="px-1.5 py-2 text-center">
                          <div className={cn("rounded-md px-1 py-1.5 text-[9px] font-semibold border leading-tight", shiftColor(s))}>
                            {s ? s.split(" ")[0] : "–"}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-2 px-4 py-3 bg-rose-500/10 border-t border-rose-800">
              <div className="size-4 rounded-full bg-rose-500 flex items-center justify-center text-white text-[8px] font-bold shrink-0">!</div>
              <span className="text-[12px] text-rose-200">Samstag: Küche ist unterbesetzt — 1 Person fehlt für Frühschicht</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 grid grid-cols-3 gap-4">
            {[{ v: "98 %", l: "Schichten besetzt" }, { v: "4.2h", l: "Ø Reaktionszeit Tausch" }, { v: "0", l: "manuelle Anrufe/Woche" }].map(s => (
              <div key={s.l} className="rounded-xl border border-rose-800 bg-rose-900/40 px-4 py-4 text-center">
                <div className="text-2xl font-black text-white">{s.v}</div>
                <div className="text-[11px] text-rose-300/50 mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <ProductFinalCTA product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Lumen closing — AI chat showcase
// ══════════════════════════════════════════════════════════════════════════════

function LumenClosing({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px 0px" as any })

  const qa = [
    {
      q: "Welche HACCP-Vorschriften gelten speziell für unsere Hotelküche?",
      a: "Für Ihre Hotelküche gelten die HACCP-Grundsätze nach VO (EG) Nr. 852/2004. Kritische Kontrollpunkte sind: Anlieferungstemperaturen (max. 7°C für Kühles), Kerntemperaturen beim Garen (min. 70°C für 2 Min.) und lückenlose Dokumentation. Ihre Atlas-Wissensdatenbank enthält dazu 3 aktuelle Artikel.",
      sources: ["Atlas: HACCP Küche", "Atlas: EU-Verordnung 852"],
    },
    {
      q: "Wie viele Urlaubstage hat Tom Müller noch in diesem Jahr?",
      a: "Tom Müller hat 18 von 30 Urlaubstagen verbraucht. Es stehen noch 12 Tage zur Verfügung. 2 Tage sind bereits als Antrag gestellt (Genehmigung ausstehend).",
      sources: ["Tempo: Urlaubssaldo"],
    },
  ]

  return (
    <>
      <section ref={ref} className="py-24 bg-indigo-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-indigo-700/15 blur-[120px]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <defs><pattern id="pl" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#pl)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-400/60 mb-4">KI-Assistent</p>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-[0.93] mb-6">
                Fragen stellen.<br /><span className="text-indigo-300">Antworten bekommen.</span><br /><span className="text-indigo-500">Sofort.</span>
              </h2>
              <p className="text-indigo-200/50 text-[15px] leading-relaxed mb-8">
                Lumen durchsucht euren gesamten Wissensbestand — Atlas, Academy, Dokumente — und antwortet in natürlicher Sprache mit Quellenangaben.
              </p>
              <div className="space-y-3">
                {[
                  { label: "Wissensquellen", val: "Atlas, Academy, HR-Dokumente" },
                  { label: "Antwortzeit", val: "< 2 Sekunden" },
                  { label: "Sprachen", val: "DE, EN, + 18 weitere" },
                  { label: "Datenschutz", val: "Kein Training auf euren Daten" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-indigo-800/50">
                    <span className="text-[13px] text-indigo-300/60">{item.label}</span>
                    <span className="text-[13px] font-semibold text-indigo-100">{item.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.12 }}>
              <div className="rounded-2xl border border-indigo-800 bg-[#0f0f1a] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-indigo-900">
                  <div className="size-7 rounded-full bg-indigo-600 flex items-center justify-center">
                    <Sparkles className="size-3.5 text-white" />
                  </div>
                  <span className="text-[13px] font-semibold text-indigo-100">Lumen</span>
                  <div className="ml-auto flex items-center gap-1.5">
                    <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-indigo-400">Bereit</span>
                  </div>
                </div>
                <div className="p-4 space-y-5 max-h-[420px] overflow-hidden">
                  {qa.map((item, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-end">
                        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-indigo-600 px-4 py-3 text-[13px] text-white leading-relaxed">
                          {item.q}
                        </div>
                      </div>
                      <div className="flex gap-2.5">
                        <div className="size-6 rounded-full bg-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Sparkles className="size-3 text-indigo-200" />
                        </div>
                        <div className="flex-1">
                          <div className="rounded-2xl rounded-tl-sm bg-indigo-900/60 border border-indigo-800 px-4 py-3 text-[12.5px] text-indigo-100 leading-relaxed mb-2">
                            {item.a}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.sources.map(s => (
                              <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-800/60 text-indigo-300 border border-indigo-700">📎 {s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <ProductFinalCTA product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Hire closing — candidate pipeline
// ══════════════════════════════════════════════════════════════════════════════

function HireClosing({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px 0px" as any })

  const pipeline = [
    { stage: "Neu", color: "bg-slate-600", candidates: [{ init: "MK", col: "bg-slate-400" }, { init: "RL", col: "bg-slate-500" }, { init: "+4", col: "bg-slate-600" }] },
    { stage: "Screening", color: "bg-sky-600", candidates: [{ init: "TH", col: "bg-sky-400" }, { init: "AW", col: "bg-sky-500" }] },
    { stage: "Interview", color: "bg-violet-600", candidates: [{ init: "FB", col: "bg-violet-400" }] },
    { stage: "Angebot", color: "bg-amber-600", candidates: [{ init: "SJ", col: "bg-amber-400" }] },
    { stage: "Eingestellt", color: "bg-emerald-600", candidates: [{ init: "NK", col: "bg-emerald-400" }] },
  ]

  return (
    <>
      <section ref={ref} className="py-24 bg-background border-t border-border">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="text-center mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-500/60 mb-3">Recruiting-Pipeline</p>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground">Die besten Kandidaten.<br /><span className="text-muted-foreground">Immer im Blick.</span></h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
            className="overflow-x-auto pb-4">
            <div className="flex gap-3 min-w-[700px]">
              {pipeline.map((col, ci) => (
                <div key={col.stage} className="flex-1 min-w-[130px]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={cn("size-2 rounded-full", col.color)} />
                    <span className="text-[12px] font-semibold text-foreground">{col.stage}</span>
                    <span className="ml-auto text-[11px] text-muted-foreground">{col.candidates.length}</span>
                  </div>
                  <div className="space-y-2">
                    {col.candidates.map((c, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 transition-colors">
                        <div className={cn("size-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0", c.col)}>{c.init}</div>
                        <div className="flex-1 min-w-0">
                          <div className="h-1.5 rounded-full bg-border w-3/4" />
                          <div className="h-1.5 rounded-full bg-border/50 w-1/2 mt-1" />
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-center h-10 rounded-xl border border-dashed border-border text-[11px] text-muted-foreground hover:bg-muted/30 cursor-pointer transition-colors">
                      + Hinzufügen
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[{ v: "12", l: "Offene Stellen" }, { v: "8", l: "Aktive Kanäle" }, { v: "32 Tage", l: "Ø bis Einstellung" }, { v: "4.1×", l: "Mehr Bewerbungen" }].map(s => (
              <div key={s.l} className="rounded-xl border border-border bg-muted/30 px-4 py-4 text-center">
                <div className="text-2xl font-black text-foreground">{s.v}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <ProductFinalCTA product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Payroll closing — payslip + DATEV
// ══════════════════════════════════════════════════════════════════════════════

function PayrollClosing({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px 0px" as any })

  const breakdown = [
    { label: "Bruttogehalt", amount: "4.200,00 €", pct: 100, color: "bg-teal-400" },
    { label: "Lohnsteuer", amount: "− 820,00 €", pct: 20, color: "bg-rose-400" },
    { label: "Sozialversicherung", amount: "− 630,00 €", pct: 15, color: "bg-orange-400" },
    { label: "Nettogehalt", amount: "2.750,00 €", pct: 65, color: "bg-teal-500", bold: true },
  ]

  return (
    <>
      <section ref={ref} className="py-24 bg-background border-t border-border">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-teal-600/60 mb-4">Gehaltsabrechnung</p>
              <h2 className="text-4xl sm:text-5xl font-black text-foreground leading-[0.93] mb-6">
                Brutto zu Netto.<br /><span className="text-muted-foreground">Rechtskonform. Automatisch.</span>
              </h2>
              <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
                Payroll berechnet Gehaltsabrechnungen nach aktuellem Steuer- und Sozialversicherungsrecht und exportiert sie direkt nach DATEV.
              </p>

              <div className="space-y-3">
                {breakdown.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={cn("text-[13px]", item.bold ? "font-bold text-foreground" : "text-muted-foreground")}>{item.label}</span>
                      <span className={cn("text-[13px] tabular-nums", item.bold ? "font-black text-teal-600" : "font-medium text-foreground")}>{item.amount}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all", item.color)} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.12 }}>
              {/* Payslip card */}
              <div className="rounded-2xl border border-teal-500/20 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950 dark:to-emerald-950 p-6 mb-4">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-teal-200/30 dark:border-teal-800/30">
                  <div>
                    <div className="text-[11px] font-semibold text-teal-600/60 uppercase tracking-wider">Gehaltszettel</div>
                    <div className="text-[16px] font-bold text-foreground mt-1">Sarah Kellermann</div>
                    <div className="text-[12px] text-muted-foreground">Serviceleiterin · Mai 2025</div>
                  </div>
                  <div className="size-10 rounded-xl bg-teal-600 flex items-center justify-center">
                    <Receipt className="size-5 text-white" />
                  </div>
                </div>
                <div className="space-y-2 mb-5">
                  {[["Bruttogehalt", "4.200,00 €"], ["Lohnsteuer", "– 820,00 €"], ["KV/PV/RV/AV", "– 630,00 €"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-[13px]">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-medium text-foreground tabular-nums">{v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-3 border-t border-teal-200/40 dark:border-teal-800/40">
                    <span className="text-[14px] font-bold text-foreground">Nettolohn</span>
                    <span className="text-[14px] font-black text-teal-600 tabular-nums">2.750,00 €</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-teal-600/10 border border-teal-500/20 px-4 py-3">
                  <Download className="size-4 text-teal-600 shrink-0" />
                  <span className="text-[13px] font-semibold text-teal-700 dark:text-teal-300 flex-1">Als PDF herunterladen</span>
                  <span className="text-[11px] text-teal-600/60">DSGVO-konform</span>
                </div>
              </div>

              {/* DATEV export */}
              <div className="rounded-2xl border border-border bg-muted/30 p-5 flex items-center gap-4">
                <div className="size-12 rounded-xl bg-foreground flex items-center justify-center shrink-0">
                  <Send className="size-5 text-background" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-bold text-foreground">DATEV Export — Mai 2025</div>
                  <div className="text-[12px] text-muted-foreground mt-0.5">247 Mitarbeiter · Bereit zum Export</div>
                </div>
                <div className="shrink-0 text-[11px] font-bold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">✓ Validiert</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <ProductFinalCTA product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Chat — dark, kinetic messaging UI
// ══════════════════════════════════════════════════════════════════════════════

function ChatHero({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])

  const channels = [
    { name: "allgemein", count: 12, active: true },
    { name: "küche", count: 3, active: false },
    { name: "service", count: 7, active: false },
    { name: "management", count: 0, active: false },
  ]

  const messages = [
    { avatar: "bg-fuchsia-500", name: "Lisa M.", time: "09:41", text: "Wer kann morgen früh einspringen? 🙏", reaction: "❤️ 3" },
    { avatar: "bg-sky-500", name: "Tom K.", time: "09:42", text: "Ich kann! Wann fängt es an?", reaction: "" },
    { avatar: "bg-fuchsia-500", name: "Lisa M.", time: "09:42", text: "7 Uhr — danke Tom! 🎉", reaction: "🎉 5" },
    { avatar: "bg-amber-500", name: "Marco B.", time: "09:45", text: "Super, ich informiere die Küche", reaction: "👍 2" },
  ]

  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Animated fuchsia glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-fuchsia-600/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-purple-700/10 blur-[80px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="chat-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#chat-grid)" />
        </svg>
      </div>

      <motion.div style={{ y }} className="relative z-10 w-full max-w-screen-xl mx-auto px-5 sm:px-8 pt-28 pb-16">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 mb-8"
          >
            <div className="size-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
            <span className="text-[11px] font-semibold text-fuchsia-300 uppercase tracking-widest">Live in deinem Team</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none mb-6"
          >
            Dein Team.
            <br />
            <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Immer verbunden.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-xl mx-auto mb-10"
          >
            Echtzeit-Messaging, strukturierte Kanäle und direkte Nachrichten —
            alles integriert in die Hostpartners-Plattform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href={accountCtaHref}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold text-sm transition-colors"
            >
              Kostenlos starten <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-white/10 text-white/80 hover:text-white hover:border-white/20 text-sm font-medium transition-colors"
            >
              Demo ansehen
            </Link>
          </motion.div>
        </div>

        {/* Chat UI mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-2xl border border-white/10 bg-[#111118] overflow-hidden shadow-2xl shadow-fuchsia-900/20">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#0d0d14]">
              <div className="flex gap-1.5">
                <div className="size-3 rounded-full bg-red-500/60" />
                <div className="size-3 rounded-full bg-yellow-500/60" />
                <div className="size-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 text-center text-[11px] text-zinc-500 font-medium">Hostpartners Chat</div>
            </div>

            <div className="flex h-[360px]">
              {/* Sidebar */}
              <div className="w-52 border-r border-white/[0.06] bg-[#0d0d14] flex flex-col">
                <div className="px-3 py-3">
                  <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2 px-2">Kanäle</div>
                  {channels.map((ch) => (
                    <button
                      key={ch.name}
                      className={cn(
                        "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors",
                        ch.active ? "bg-fuchsia-500/15 text-fuchsia-300" : "text-zinc-500 hover:text-zinc-300"
                      )}
                    >
                      <Hash className="size-3 shrink-0" />
                      <span className="text-[12px] font-medium flex-1">{ch.name}</span>
                      {ch.count > 0 && (
                        <span className="text-[10px] bg-fuchsia-600 text-white px-1.5 rounded-full leading-5">{ch.count}</span>
                      )}
                    </button>
                  ))}
                  <div className="mt-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2 px-2">Direkt</div>
                  {["Tom K.", "Marco B."].map((name) => (
                    <button key={name} className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-zinc-500 hover:text-zinc-300 transition-colors">
                      <AtSign className="size-3 shrink-0" />
                      <span className="text-[12px]">{name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main chat area */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]">
                  <Hash className="size-4 text-zinc-500" />
                  <span className="text-[13px] font-semibold text-white">allgemein</span>
                  <span className="text-[11px] text-zinc-500 ml-1">Ganzes Team</span>
                </div>

                <div className="flex-1 overflow-hidden px-4 py-3 space-y-4">
                  {messages.map((msg, i) => (
                    <div key={i} className="flex items-start gap-2.5 group">
                      <div className={cn("size-7 rounded-full shrink-0 mt-0.5", msg.avatar)} />
                      <div>
                        <div className="flex items-baseline gap-2 mb-0.5">
                          <span className="text-[12px] font-semibold text-zinc-200">{msg.name}</span>
                          <span className="text-[10px] text-zinc-600">{msg.time}</span>
                        </div>
                        <p className="text-[12px] text-zinc-400 leading-relaxed">{msg.text}</p>
                        {msg.reaction && (
                          <div className="mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[10px] text-zinc-400">
                            {msg.reaction}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <Paperclip className="size-4 text-zinc-600" />
                    <span className="flex-1 text-[12px] text-zinc-600">Nachricht an #allgemein</span>
                    <Smile className="size-4 text-zinc-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function ChatFeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px 0px" })

  const features = [
    {
      icon: Hash,
      title: "Organisierte Kanäle",
      desc: "Erstelle Kanäle pro Abteilung, Schicht oder Projekt. Jeder sieht nur das, was relevant ist.",
      color: "text-fuchsia-400",
      bg: "bg-fuchsia-500/10",
    },
    {
      icon: AtSign,
      title: "Direktnachrichten",
      desc: "Private 1:1 oder Gruppenchats — ohne WhatsApp, ohne Datenschutzprobleme.",
      color: "text-pink-400",
      bg: "bg-pink-500/10",
    },
    {
      icon: Bell,
      title: "Smarte Benachrichtigungen",
      desc: "Werde nur bei relevanten Mentions und Kanälen benachrichtigt. Kein Lärm.",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      icon: Shield,
      title: "DSGVO-konform",
      desc: "Alle Nachrichten bleiben in eurer Hostpartners-Umgebung. Kein Drittanbieter.",
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      icon: Paperclip,
      title: "Datei-Sharing",
      desc: "Dokumente, Bilder, PDFs — direkt im Chat teilen und in Hostpartners speichern.",
      color: "text-fuchsia-400",
      bg: "bg-fuchsia-500/10",
    },
    {
      icon: Zap,
      title: "Echtzeit & Offline",
      desc: "Nachrichten kommen sofort an. Offline gespeichert, wenn kein Netz.",
      color: "text-pink-400",
      bg: "bg-pink-500/10",
    },
  ]

  return (
    <section ref={ref} className="py-28 bg-[#0a0a0f]">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-fuchsia-400/60 mb-3">Features</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Alles, was dein Team braucht</h2>
          <p className="text-zinc-400 max-w-md mx-auto">Kommunikation, die funktioniert — ohne externe Apps oder Datenschutzrisiken.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group p-6 rounded-2xl border border-white/[0.06] bg-[#111118] hover:border-fuchsia-500/20 hover:bg-[#14101c] transition-all"
            >
              <div className={cn("size-10 rounded-xl flex items-center justify-center mb-4", f.bg)}>
                <f.icon className={cn("size-5", f.color)} />
              </div>
              <h3 className="text-[15px] font-bold text-white mb-2">{f.title}</h3>
              <p className="text-[13px] text-zinc-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ChatIntegrationSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <section ref={ref} className="py-28 bg-[#08080d] border-t border-white/[0.04]">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-fuchsia-400/60 mb-4">Integration</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
              Kein Tool-Wechsel.
              <br />
              Alles in einem.
            </h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Chat ist kein Anhang — er ist tief in Hostpartners integriert. Teile Onboarding-Aufgaben, Knowledge-Artikel oder Urlaubsanträge direkt im Chat.
            </p>
            <div className="space-y-4">
              {[
                "Artikel aus Atlas direkt im Chat teilen",
                "Onboarding-Aufgaben aus Flow zuweisen",
                "Urlaubsanträge aus Tempo diskutieren",
                "Schichtpläne aus Roster ankündigen",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-zinc-300">
                  <div className="size-5 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center shrink-0">
                    <Check className="size-3 text-fuchsia-400" />
                  </div>
                  <span className="text-[14px]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-fuchsia-600/5 rounded-3xl blur-3xl" />
            <div className="relative rounded-2xl border border-white/10 bg-[#111118] p-6 space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
                <div className="size-8 rounded-full bg-fuchsia-500 flex items-center justify-center text-white text-[11px] font-bold">AI</div>
                <div>
                  <div className="text-[13px] font-semibold text-white">Flow-Bot</div>
                  <div className="text-[11px] text-zinc-500">Automatisch</div>
                </div>
              </div>
              {[
                { text: '📋 "HACCP-Schulung" wird fällig — 3 Mitarbeiter haben noch nicht abgeschlossen.', time: "Gerade eben" },
                { text: '🗓 Schichtplan für nächste Woche wurde veröffentlicht.', time: "vor 5 Min" },
                { text: '✅ Max M. hat das Onboarding abgeschlossen.', time: "vor 12 Min" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-2">
                  <div className="size-1.5 rounded-full bg-fuchsia-500 mt-2 shrink-0" />
                  <div className="flex-1">
                    <p className="text-[12px] text-zinc-300 leading-relaxed">{item.text}</p>
                    <p className="text-[10px] text-zinc-600 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ChatPage({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  return (
    <>
      <ChatHero product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
      <ChatFeaturesSection />
      <ChatIntegrationSection />
      <PageCTA product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// Admin Center — command-center aesthetic, enterprise dark
// ══════════════════════════════════════════════════════════════════════════════

function AdminHero({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])

  const stats = [
    { label: "Aktive Nutzer", value: "247", delta: "+12%" },
    { label: "Apps in Betrieb", value: "8/11", delta: null },
    { label: "Speicher belegt", value: "14.2 GB", delta: "-3 GB" },
    { label: "Uptime", value: "99.98%", delta: null },
  ]

  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#09090b]">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-zinc-800/30 blur-[100px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="admin-dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#admin-dots)" />
        </svg>
      </div>

      <motion.div style={{ y }} className="relative z-10 w-full max-w-screen-xl mx-auto px-5 sm:px-8 pt-28 pb-16">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700/60 bg-zinc-800/40 mb-8"
          >
            <Gauge className="size-3.5 text-zinc-400" />
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">Admin Center</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none mb-6"
          >
            Deine Plattform.
            <br />
            <span className="text-zinc-400">Vollständig im Griff.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-500 max-w-xl mx-auto mb-10"
          >
            Das Admin Center ist das Cockpit für Administratoren — Apps aktivieren,
            Nutzer verwalten, Lizenzen steuern, Einstellungen konfigurieren.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-100 transition-colors"
            >
              Demo anfragen <ArrowRight className="size-4" />
            </Link>
            <Link
              href={accountCtaHref}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 text-sm font-medium transition-colors"
            >
              {accountCtaLabel}
            </Link>
          </motion.div>
        </div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl border border-zinc-800 bg-[#111113] overflow-hidden shadow-2xl shadow-black/60">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-[#0d0d0f]">
              <div className="flex gap-1.5">
                <div className="size-3 rounded-full bg-red-500/50" />
                <div className="size-3 rounded-full bg-yellow-500/50" />
                <div className="size-3 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 text-center text-[11px] text-zinc-600 font-medium">admin.meinbetrieb.hostpartners.com</div>
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div className="w-44 border-r border-zinc-800 bg-[#0d0d0f] p-3 space-y-0.5">
                {[
                  { icon: Gauge, label: "Übersicht", active: true },
                  { icon: Package, label: "Apps", active: false },
                  { icon: Users, label: "Nutzer", active: false },
                  { icon: CreditCard, label: "Lizenzen", active: false },
                  { icon: BarChart2, label: "Analytics", active: false },
                  { icon: Settings, label: "Einstellungen", active: false },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left",
                      item.active ? "bg-white/[0.06] text-white" : "text-zinc-600 hover:text-zinc-400"
                    )}
                  >
                    <item.icon className="size-3.5 shrink-0" />
                    <span className="text-[11px] font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Main area */}
              <div className="flex-1 p-4 space-y-4">
                <div className="grid grid-cols-4 gap-3">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-lg border border-zinc-800 bg-[#0d0d0f] p-3">
                      <div className="text-[9px] text-zinc-600 uppercase tracking-wider mb-1">{s.label}</div>
                      <div className="text-[16px] font-bold text-white leading-none">{s.value}</div>
                      {s.delta && (
                        <div className={cn("text-[9px] mt-1 font-medium", s.delta.startsWith("+") ? "text-emerald-400" : "text-zinc-500")}>
                          {s.delta}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 rounded-lg border border-zinc-800 bg-[#0d0d0f] p-3">
                    <div className="text-[10px] text-zinc-600 font-semibold uppercase tracking-wider mb-3">Aktive Apps</div>
                    <div className="space-y-2">
                      {[
                        { name: "Persona", users: 247, status: "aktiv", color: "bg-slate-500" },
                        { name: "Atlas", users: 189, status: "aktiv", color: "bg-emerald-500" },
                        { name: "Academy", users: 203, status: "aktiv", color: "bg-blue-500" },
                        { name: "Chat", users: 247, status: "aktiv", color: "bg-fuchsia-500" },
                      ].map((app) => (
                        <div key={app.name} className="flex items-center gap-2">
                          <div className={cn("size-2 rounded-full", app.color)} />
                          <span className="text-[11px] text-zinc-400 flex-1">{app.name}</span>
                          <span className="text-[10px] text-zinc-600">{app.users} Nutzer</span>
                          <div className="h-3.5 px-1.5 rounded bg-emerald-500/15 border border-emerald-500/25 text-[8px] text-emerald-400 font-medium flex items-center">{app.status}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-zinc-800 bg-[#0d0d0f] p-3">
                    <div className="text-[10px] text-zinc-600 font-semibold uppercase tracking-wider mb-3">Lizenz</div>
                    <div className="text-[11px] text-zinc-400 mb-2">Professional</div>
                    <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden mb-1">
                      <div className="h-full w-[78%] bg-gradient-to-r from-zinc-400 to-zinc-300 rounded-full" />
                    </div>
                    <div className="text-[9px] text-zinc-600">195 / 250 Sitze</div>
                    <div className="mt-3 h-6 w-full rounded-md bg-white/[0.04] border border-zinc-700 text-[9px] text-zinc-500 flex items-center justify-center">
                      Upgrade
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function AdminFeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px 0px" })

  const features = [
    {
      icon: Package,
      title: "App-Management",
      desc: "Aktiviere und deaktiviere einzelne Apps für deine Organisation mit einem Klick.",
      accent: "text-zinc-300",
    },
    {
      icon: Users,
      title: "Nutzerverwaltung",
      desc: "Lade Mitarbeiter ein, weise Rollen zu und verwalte Zugriffsrechte zentral.",
      accent: "text-zinc-300",
    },
    {
      icon: CreditCard,
      title: "Lizenz & Abrechnung",
      desc: "Überblick über Sitzplatzkontingente, Abrechnungsperioden und Upgrade-Optionen.",
      accent: "text-zinc-300",
    },
    {
      icon: BarChart2,
      title: "Nutzungsanalyse",
      desc: "Wer nutzt welche App wie oft? Daten für fundierte Lizenzentscheidungen.",
      accent: "text-zinc-300",
    },
    {
      icon: Settings,
      title: "Organisationseinstellungen",
      desc: "Branding, DSGVO-Einstellungen, E-Mail-Templates und SSO-Konfiguration.",
      accent: "text-zinc-300",
    },
    {
      icon: Globe,
      title: "Subdomain & Branding",
      desc: "Eigene Subdomain, Logo und Farben — Hostpartners in eurer Corporate Identity.",
      accent: "text-zinc-300",
    },
  ]

  return (
    <section ref={ref} className="py-28 bg-[#09090b]">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500 mb-3">Volle Kontrolle</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Alles unter einem Dach</h2>
          <p className="text-zinc-500 max-w-md mx-auto">Das Admin Center ist der einzige Ort, den du brauchst, um deine gesamte Hostpartners-Umgebung zu steuern.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800/50 rounded-2xl overflow-hidden border border-zinc-800">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group p-7 bg-[#09090b] hover:bg-[#111113] transition-colors"
            >
              <div className="size-10 rounded-xl bg-zinc-800 border border-zinc-700/50 flex items-center justify-center mb-5 group-hover:border-zinc-600 transition-colors">
                <f.icon className="size-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
              </div>
              <h3 className="text-[15px] font-bold text-white mb-2">{f.title}</h3>
              <p className="text-[13px] text-zinc-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AdminControlSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <section ref={ref} className="py-28 bg-[#05050a] border-t border-zinc-900">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative order-first lg:order-last"
          >
            <div className="absolute inset-0 bg-zinc-500/5 rounded-3xl blur-3xl" />
            <div className="relative rounded-2xl border border-zinc-800 bg-[#111113] overflow-hidden">
              <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
                <span className="text-[12px] font-semibold text-zinc-300">Apps aktivieren</span>
                <div className="h-6 px-3 rounded-full border border-zinc-700 text-[10px] text-zinc-400 flex items-center">11 verfügbar</div>
              </div>
              <div className="p-4 space-y-2">
                {[
                  { name: "Persona", color: "bg-slate-600", active: true },
                  { name: "Atlas", color: "bg-emerald-600", active: true },
                  { name: "Academy", color: "bg-blue-600", active: true },
                  { name: "Flow", color: "bg-violet-600", active: true },
                  { name: "Tempo", color: "bg-orange-500", active: false },
                  { name: "Roster", color: "bg-rose-600", active: false },
                ].map((app) => (
                  <div key={app.name} className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-white/[0.02] transition-colors">
                    <div className={cn("size-7 rounded-lg flex items-center justify-center", app.color)}>
                      <div className="size-3 rounded-sm bg-white/40" />
                    </div>
                    <span className="text-[13px] font-medium text-zinc-300 flex-1">{app.name}</span>
                    <div className={cn(
                      "w-9 h-5 rounded-full flex items-center transition-all",
                      app.active ? "bg-emerald-500 justify-end" : "bg-zinc-700 justify-start"
                    )}>
                      <div className="size-4 rounded-full bg-white shadow m-0.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500 mb-4">Modulares System</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
              Nur was ihr braucht.
              <br />
              Nichts, was ihr nicht braucht.
            </h2>
            <p className="text-zinc-500 text-lg mb-8 leading-relaxed">
              Aktiviere einzelne Apps für deine Organisation — und zahle nur dafür. Später skalieren? Einfach eine weitere App freischalten.
            </p>
            <div className="space-y-4">
              {[
                "Apps jederzeit aktivieren und deaktivieren",
                "Keine Datenverluste bei Deaktivierung",
                "Rollout schrittweise nach Abteilung",
                "Sofortiger Zugriff nach Aktivierung",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-zinc-400">
                  <div className="size-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                    <Check className="size-3 text-zinc-300" />
                  </div>
                  <span className="text-[14px]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function AdminPage({ product, accountCtaHref, accountCtaLabel }: ProductPageProps) {
  return (
    <>
      <AdminHero product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
      <AdminFeaturesSection />
      <AdminControlSection />
      <PageCTA product={product} accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

const PAGE_MAP: Record<string, React.ComponentType<ProductPageProps>> = {
  persona: PersonaPage,
  atlas:   AtlasPage,
  academy: AcademyPage,
  flow:    FlowPage,
  tempo:   TempoPage,
  roster:  RosterPage,
  lumen:   LumenPage,
  hire:    HirePage,
  payroll: PayrollPage,
  chat:    ChatPage,
  admin:   AdminPage,
}

// ══════════════════════════════════════════════════════════════════════════════
// Main export — receives only slug (plain string, serializable)
// ══════════════════════════════════════════════════════════════════════════════

export function ProductPageClient({
  slug,
  isAuthenticated = false,
}: {
  slug: string
  isAuthenticated?: boolean
}) {
  const product = PRODUCTS[slug]
  if (!product) return null
  const accountCtaHref = isAuthenticated ? "/dashboard" : "/login"
  const accountCtaLabel = isAuthenticated ? "Zu den Apps" : "Anmelden"

  const PageComponent = PAGE_MAP[slug] ?? PersonaPage
  return (
    <div className="marketing-product-page">
      <PageComponent
        product={product}
        accountCtaHref={accountCtaHref}
        accountCtaLabel={accountCtaLabel}
      />
    </div>
  )
}

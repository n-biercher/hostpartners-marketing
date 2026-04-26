"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import {
  motion, useScroll, useInView, AnimatePresence,
  useMotionValue, useSpring, useTransform,
} from "framer-motion"
import {
  ArrowRight, Users, BookOpen, GraduationCap, GitBranch,
  Clock, CalendarDays, TrendingUp, Sparkles,
  Check, Building2, ChefHat, Factory, ChevronRight,
  Shield, Globe, Zap, UserPlus, Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type AppKey = "persona" | "atlas" | "academy" | "flow" | "tempo" | "roster" | "pulse" | "lumen" | "hire" | "payroll"
type SnippetKey = "academy" | "roster" | "flow"

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPS: { name: string; desc: string; icon: React.ComponentType<{ className?: string }>; color: string; key: AppKey }[] = [
  { name: "Persona",  desc: "Stammdaten & Organigramm",  icon: Users,         color: "bg-slate-600",   key: "persona" },
  { name: "Atlas",    desc: "Wissensdatenbank",           icon: BookOpen,      color: "bg-emerald-600", key: "atlas" },
  { name: "Academy",  desc: "Schulungen & Kurse",         icon: GraduationCap, color: "bg-blue-600",    key: "academy" },
  { name: "Flow",     desc: "Onboarding & Prozesse",      icon: GitBranch,     color: "bg-violet-600",  key: "flow" },
  { name: "Tempo",    desc: "Zeiterfassung & Urlaub",     icon: Clock,         color: "bg-orange-500",  key: "tempo" },
  { name: "Roster",   desc: "Schichtplanung",             icon: CalendarDays,  color: "bg-rose-600",    key: "roster" },
  { name: "Pulse",    desc: "Performance & OKRs",         icon: TrendingUp,    color: "bg-amber-500",   key: "pulse" },
  { name: "Lumen",    desc: "KI-Assistent",               icon: Sparkles,      color: "bg-indigo-600",  key: "lumen" },
  { name: "Hire",     desc: "Recruiting & Bewerbungen",   icon: UserPlus,      color: "bg-sky-600",     key: "hire" },
  { name: "Payroll",  desc: "Lohn & Abrechnung",          icon: Wallet,        color: "bg-teal-600",    key: "payroll" },
]

const INDUSTRIES = [
  { href: "/industrien/hotellerie",  icon: Building2, label: "Hotellerie",  desc: "Schichtplanung, Onboarding & Schulungen für Hotels und Resorts.", color: "bg-blue-600" },
  { href: "/industrien/gastronomie", icon: ChefHat,   label: "Gastronomie", desc: "Dienstpläne, Pflichtschulungen und Mitarbeiterverwaltung.", color: "bg-orange-500" },
  { href: "/industrien/industrie",   icon: Factory,   label: "Industrie",   desc: "Wechselschicht, Sicherheitsunterweisungen, Performance-Reviews.", color: "bg-slate-600" },
]

const FEATURES: { number: string; title: string; body: string; features: string[]; snippet: SnippetKey }[] = [
  {
    number: "01",
    title: "Schulungen, die wirklich ankommen.",
    body: "Academy bringt HACCP, Brandschutz und interne Prozesse in eine Plattform — mit Kursen, Quizzes und automatischen Zertifikaten.",
    features: ["Video-Lektionen", "Quiz-Module", "Zertifikate", "Fortschritts-Tracking"],
    snippet: "academy",
  },
  {
    number: "02",
    title: "Schichtpläne, die sich selbst erklären.",
    body: "Roster zeigt jedem Mitarbeitenden auf einen Blick, wann er arbeitet — Tausch, Verfügbarkeit und Benachrichtigungen in Echtzeit.",
    features: ["Drag & Drop Planung", "Tauschbörse", "Push-Benachrichtigungen", "Export"],
    snippet: "roster",
  },
  {
    number: "03",
    title: "Onboarding, das nichts vergisst.",
    body: "Flow digitalisiert den kompletten Einarbeitungsprozess — von der Kontoeröffnung über Schulungen bis zur Vertragsunterschrift.",
    features: ["Aufgaben-Checklisten", "Automatische Zuweisung", "Fristenüberwachung", "Dokumente"],
    snippet: "flow",
  },
]

const LOGOS = [
  "Hotel Maier & Söhne",
  "Berghotel Zugspitz",
  "Restaurant Goldener Hirsch",
  "Brauereigruppe Nord",
  "Fertigungsbetrieb Weiss",
  "Catering Südwest GmbH",
  "Landgasthof Almrausch",
]

// ─── Animation primitives ─────────────────────────────────────────────────────

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const fadeItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const } },
}

function FadeUp({
  children, delay = 0, className,
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Grain overlay ────────────────────────────────────────────────────────────

function Grain({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "160px 160px",
      }}
    />
  )
}

// ─── App Snippets (dark UI previews — intentionally dark, showing real app screens) ─

function SnippetChrome({ color, icon: Icon, title }: { color: string; icon: React.ComponentType<{ className?: string }>; title: string }) {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.07]">
      <div className="size-2.5 rounded-full bg-zinc-700" />
      <div className="size-2.5 rounded-full bg-zinc-700" />
      <div className="size-2.5 rounded-full bg-zinc-700" />
      <div className="flex items-center gap-2 ml-3">
        <div className={cn("size-5 rounded-md flex items-center justify-center", color)}>
          <Icon className="size-3 text-white" />
        </div>
        <span className="text-[12px] text-zinc-300 font-medium">{title}</span>
      </div>
    </div>
  )
}

function AcademySnippet() {
  const courses = [
    { name: "HACCP Grundlagen",      progress: 100, color: "bg-blue-600",   done: true },
    { name: "Brandschutz Hotellerie", progress: 68,  color: "bg-orange-500", done: false },
    { name: "Service Excellence",     progress: 35,  color: "bg-violet-600", done: false },
    { name: "Allergenkennzeichnung",  progress: 0,   color: "bg-rose-600",   done: false },
  ]
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-zinc-900 overflow-hidden shadow-2xl shadow-black/30">
      <SnippetChrome color="bg-blue-600" icon={GraduationCap} title="Academy · Meine Schulungen" />
      <div className="p-3 space-y-2">
        {courses.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.1 + 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl bg-zinc-800/70 p-3.5 flex items-center gap-3"
          >
            <div className={cn("size-9 rounded-xl flex items-center justify-center shrink-0", c.color)}>
              <GraduationCap className="size-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12.5px] font-medium text-white truncate">{c.name}</span>
                <span className="text-[10px] text-zinc-500 shrink-0 ml-2">{c.progress}%</span>
              </div>
              <div className="h-1 bg-zinc-700 rounded-full overflow-hidden">
                <motion.div
                  className={cn("h-full rounded-full", c.color)}
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: `${c.progress}%` } : {}}
                  transition={{ delay: i * 0.15 + 0.4, duration: 1.2, ease: "easeOut" }}
                />
              </div>
            </div>
            {c.done && (
              <div className="size-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <Check className="size-3 text-white" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[11px] text-zinc-600">1 abgeschlossen · 3 offen</span>
        <div className="flex items-center gap-1 text-[11px] text-blue-400">
          Alle Schulungen <ChevronRight className="size-3" />
        </div>
      </div>
    </div>
  )
}

function RosterSnippet() {
  const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
  const employees = [
    { name: "A. Weber",  color: "bg-blue-600",   shifts: ["F", "F", null, "S", "F", null, null] as (string | null)[] },
    { name: "M. Huber",  color: "bg-violet-600",  shifts: [null, "F", "F", null, "S", "F", null] as (string | null)[] },
    { name: "K. Braun",  color: "bg-rose-600",    shifts: ["S", null, "F", "F", null, "S", "F"] as (string | null)[] },
    { name: "L. Mayer",  color: "bg-amber-500",   shifts: ["F", "S", null, "F", "F", null, null] as (string | null)[] },
  ]
  const shiftColors: Record<string, string> = {
    F: "bg-blue-600/80 text-blue-100",
    S: "bg-rose-600/70 text-rose-100",
  }
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-zinc-900 overflow-hidden shadow-2xl shadow-black/30">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.07]">
        <div className="size-2.5 rounded-full bg-zinc-700" />
        <div className="size-2.5 rounded-full bg-zinc-700" />
        <div className="size-2.5 rounded-full bg-zinc-700" />
        <div className="flex items-center gap-2 ml-3">
          <div className="size-5 rounded-md bg-rose-600 flex items-center justify-center">
            <CalendarDays className="size-3 text-white" />
          </div>
          <span className="text-[12px] text-zinc-300 font-medium">Roster · KW 15 — April 2026</span>
        </div>
        <div className="ml-auto hidden sm:flex items-center gap-2">
          <span className="text-[9px] bg-blue-500/15 text-blue-400 px-1.5 py-0.5 rounded">F = Früh</span>
          <span className="text-[9px] bg-rose-500/15 text-rose-400 px-1.5 py-0.5 rounded">S = Spät</span>
        </div>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-[68px_repeat(7,1fr)] gap-1 mb-2 px-1">
          <div />
          {days.map(d => (
            <div key={d} className="text-center text-[10px] text-zinc-600 font-mono">{d}</div>
          ))}
        </div>
        <div className="space-y-1.5">
          {employees.map((emp, ri) => (
            <motion.div
              key={emp.name}
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: ri * 0.08 + 0.2, duration: 0.5 }}
              className="grid grid-cols-[68px_repeat(7,1fr)] gap-1 items-center"
            >
              <div className="flex items-center gap-1.5 overflow-hidden">
                <div className={cn("size-5 rounded-full shrink-0", emp.color)} />
                <span className="text-[10px] text-zinc-500 truncate">{emp.name}</span>
              </div>
              {emp.shifts.map((s, ci) => (
                <motion.div
                  key={ci}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: ri * 0.08 + ci * 0.03 + 0.3, duration: 0.3 }}
                  className={cn(
                    "h-8 rounded-md flex items-center justify-center text-[9px] font-bold",
                    s ? shiftColors[s] : "bg-zinc-800/50"
                  )}
                >
                  {s}
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="px-4 py-3 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[11px] text-zinc-600">4 Mitarbeitende · 18 Schichten</span>
        <div className="flex items-center gap-1 text-[11px] text-rose-400">
          Schicht erstellen <ChevronRight className="size-3" />
        </div>
      </div>
    </div>
  )
}

function FlowSnippet() {
  const steps = [
    { label: "Profil & Stammdaten anlegen",    done: true,  active: false },
    { label: "Willkommens-E-Mail versenden",    done: true,  active: false },
    { label: "IT-Zugang einrichten",            done: true,  active: false },
    { label: "HACCP-Schulung absolvieren",      done: false, active: true  },
    { label: "Einweisung in den Betrieb",       done: false, active: false },
    { label: "Erstgespräch mit Vorgesetztem",   done: false, active: false },
    { label: "Vertrag unterschreiben",          done: false, active: false },
  ]
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-zinc-900 overflow-hidden shadow-2xl shadow-black/30">
      <SnippetChrome color="bg-violet-600" icon={GitBranch} title="Flow · Onboarding: Maria Huber" />
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-zinc-500">3 von 7 Aufgaben erledigt</span>
          <span className="text-[11px] text-emerald-400 font-medium">43 %</span>
        </div>
        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-500 rounded-full"
            initial={{ width: "0%" }}
            animate={isInView ? { width: "43%" } : {}}
            transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>
      <div className="p-3 space-y-1.5">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.06 + 0.2, duration: 0.4 }}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl",
              step.active
                ? "bg-violet-500/10 border border-violet-500/20"
                : step.done ? "opacity-50" : "bg-zinc-800/40"
            )}
          >
            <div className={cn(
              "size-5 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold",
              step.done ? "bg-emerald-500 text-white" :
              step.active ? "bg-violet-500 text-white" :
              "bg-zinc-700 text-zinc-500"
            )}>
              {step.done ? "✓" : i + 1}
            </div>
            <span className={cn(
              "text-[12px] flex-1",
              step.done ? "text-zinc-600 line-through" :
              step.active ? "text-violet-200 font-medium" : "text-zinc-400"
            )}>
              {step.label}
            </span>
            {step.active && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-medium">
                Offen
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const SNIPPET_MAP: Record<SnippetKey, React.ComponentType> = {
  academy: AcademySnippet,
  roster:  RosterSnippet,
  flow:    FlowSnippet,
}

// ─── Hero dashboard preview (kept as dark app mockup) ─────────────────────────

function HeroDashboardPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [6, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [30, -20])

  const stats = [
    { label: "Mitarbeitende", value: "142", sub: "+4 diese Woche", color: "text-blue-400" },
    { label: "Schulungsquote", value: "94%", sub: "HACCP abgeschlossen", color: "text-emerald-400" },
    { label: "Offene Schichten", value: "8", sub: "KW 15 · 2 Tausche", color: "text-rose-400" },
    { label: "Onboardings", value: "3", sub: "Aktiv läuft", color: "text-violet-400" },
  ]

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, y, transformPerspective: 1200 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 30 }}
      transition={{ delay: 0.7, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto max-w-3xl w-full"
    >
      {/* Gradient fade at top blends into hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 inset-x-0 h-20 z-10"
        style={{ background: "linear-gradient(to bottom, hsl(var(--background)), transparent)" }}
      />

      {/* Browser chrome */}
      <div className="rounded-2xl border border-border/60 bg-zinc-900 overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.22)] ring-1 ring-foreground/[0.04]">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.07] bg-zinc-950/60">
          <div className="size-2.5 rounded-full bg-zinc-700" />
          <div className="size-2.5 rounded-full bg-zinc-700" />
          <div className="size-2.5 rounded-full bg-zinc-700" />
          <div className="ml-4 flex-1 h-5 bg-zinc-800/80 rounded-md max-w-[180px]" />
          <div className="ml-auto flex items-center gap-2">
            <div className="size-6 rounded bg-zinc-800" />
            <div className="size-6 rounded bg-zinc-800" />
          </div>
        </div>

        {/* App layout */}
        <div className="flex h-[320px] sm:h-[380px]">
          {/* Sidebar */}
          <div className="w-14 sm:w-48 border-r border-white/[0.06] p-2 sm:p-3 shrink-0 space-y-0.5">
            {[
              { icon: Users,         label: "Persona",  color: "bg-slate-600",   active: true  },
              { icon: BookOpen,      label: "Atlas",    color: "bg-emerald-600", active: false },
              { icon: GraduationCap, label: "Academy",  color: "bg-blue-600",    active: false },
              { icon: GitBranch,     label: "Flow",     color: "bg-violet-600",  active: false },
              { icon: Clock,         label: "Tempo",    color: "bg-orange-500",  active: false },
              { icon: CalendarDays,  label: "Roster",   color: "bg-rose-600",    active: false },
              { icon: TrendingUp,    label: "Pulse",    color: "bg-amber-500",   active: false },
              { icon: Sparkles,      label: "Lumen",    color: "bg-indigo-600",  active: false },
              { icon: UserPlus,      label: "Hire",     color: "bg-sky-600",     active: false },
              { icon: Wallet,        label: "Payroll",  color: "bg-teal-600",    active: false },
            ].map(item => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1 rounded-lg",
                    item.active ? "bg-white/[0.06]" : "opacity-35"
                  )}
                >
                  <div className={cn("size-5 rounded-md flex items-center justify-center shrink-0", item.color)}>
                    <Icon className="size-3 text-white" />
                  </div>
                  <span className="hidden sm:block text-[10px] text-zinc-400 font-medium truncate">
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] text-zinc-600 mb-0.5">Guten Morgen</p>
                <p className="text-[13px] font-semibold text-white">Übersicht</p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <div className="h-6 px-3 rounded-full bg-zinc-800 text-[10px] text-zinc-500 flex items-center">
                  KW 15
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {stats.map(s => (
                <div key={s.label} className="rounded-xl bg-zinc-800/60 p-2.5">
                  <p className={cn("text-[15px] sm:text-[18px] font-semibold mb-0.5", s.color)}>{s.value}</p>
                  <p className="text-[9px] sm:text-[10px] text-zinc-500 leading-tight">{s.label}</p>
                  <p className="hidden sm:block text-[9px] text-zinc-700 mt-0.5 leading-tight">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Activity feed */}
            <div className="space-y-1.5">
              {[
                { label: "Maria Huber hat HACCP abgeschlossen",        time: "vor 2 Min",  color: "bg-blue-600" },
                { label: "Roster KW 15 wurde veröffentlicht",          time: "vor 14 Min", color: "bg-rose-600" },
                { label: "Neues Onboarding: Lukas Brandt gestartet",   time: "vor 1 Std",  color: "bg-violet-600" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 py-1.5">
                  <div className={cn("size-1.5 rounded-full shrink-0", item.color)} />
                  <span className="text-[11px] text-zinc-400 flex-1 truncate">{item.label}</span>
                  <span className="text-[10px] text-zinc-700 shrink-0 hidden sm:block">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade — blends into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 inset-x-0 h-32 z-10"
        style={{ background: "linear-gradient(to top, hsl(var(--background)) 20%, transparent)" }}
      />
    </motion.div>
  )
}

// ─── Hero section (light) ─────────────────────────────────────────────────────

function HeroSection({
  accountCtaHref,
  accountCtaLabel,
}: {
  accountCtaHref: string
  accountCtaLabel: string
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(-9999)
  const mouseY = useMotionValue(-9999)
  const [mouseActive, setMouseActive] = useState(false)
  const springX = useSpring(mouseX, { stiffness: 35, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 35, damping: 30 })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  const stripOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!mouseActive) setMouseActive(true)
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col overflow-hidden bg-background"
      style={{ minHeight: "100svh" }}
    >
      {/* Static ambient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 10% 70%, rgba(139,92,246,0.055) 0%, transparent 55%), " +
            "radial-gradient(ellipse at 80% 15%, rgba(59,130,246,0.04) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.025) 0%, transparent 60%)",
        }}
      />

      {/* Mouse-follow glow */}
      {mouseActive && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            left: springX,
            top: springY,
            translateX: "-50%",
            translateY: "-50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.045) 0%, transparent 65%)",
          }}
        />
      )}

      <Grain opacity={0.035} />

      {/* Headline + CTAs */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col justify-center mx-auto max-w-screen-xl px-5 sm:px-8 pt-24 pb-10 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-16 items-end">
          <div>
            <motion.p variants={fadeItem} className="text-[11px] text-muted-foreground/50 uppercase tracking-[0.30em] font-mono mb-8">
              Die modulare HR-Plattform
            </motion.p>

            <h1 className="text-[44px] sm:text-[78px] lg:text-[94px] xl:text-[110px] leading-[0.94] tracking-tight text-foreground text-balance">
              <motion.span variants={fadeItem} className="block font-semibold">HR-Software,</motion.span>
              <motion.span variants={fadeItem} className="block font-semibold">die zur Branche</motion.span>
              <motion.span variants={fadeItem} className="block font-heading font-normal italic text-muted-foreground/70">
                passt.
              </motion.span>
            </h1>
          </div>

          <motion.div variants={fadeItem} className="lg:pb-3">
            <p className="text-[14px] text-muted-foreground leading-relaxed mb-8 sm:text-[15px]">
              Acht spezialisierte Apps für Hotellerie, Gastronomie und Industrie. Modular, DSGVO-konform, sofort einsatzbereit.
            </p>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-foreground text-background text-[13.5px] font-semibold hover:opacity-85 transition-opacity"
              >
                Demo buchen <ArrowRight className="size-4" />
              </Link>
              <Link
                href={accountCtaHref}
                className="inline-flex items-center justify-center h-11 px-6 rounded-xl border border-border text-muted-foreground text-[13.5px] font-medium hover:bg-muted/50 hover:text-foreground transition-all"
              >
                {accountCtaLabel}
              </Link>
            </div>
            <p className="mt-4 text-[11px] text-muted-foreground/40">
              DSGVO-konform · Modular einsetzbar · Für Hotel, Gastro & Industrie
            </p>
          </motion.div>
        </div>

        {/* Hero dashboard preview */}
        <div className="mt-16 sm:mt-20">
          <HeroDashboardPreview />
        </div>
      </motion.div>

      {/* App strip */}
      <motion.div
        style={{ opacity: stripOpacity }}
        className="border-t border-border shrink-0"
      >
        <div className="mx-auto max-w-screen-xl">
          <div className="grid grid-cols-5 sm:grid-cols-10">
            {APPS.map((app, i) => {
              const Icon = app.icon
              return (
                <Link
                  key={app.key}
                  href={`/produkte/${app.key}`}
                  className={cn(
                    "flex flex-col items-center gap-2 py-5 hover:bg-muted/40 transition-colors group",
                    i < 9 && "border-r border-border",
                    i < 5 && "border-b border-border sm:border-b-0"
                  )}
                >
                  <div className={cn(
                    "size-9 rounded-[12px] flex items-center justify-center",
                    "group-hover:scale-110 transition-transform duration-200",
                    app.color
                  )}>
                    <Icon className="size-[17px] text-white" />
                  </div>
                  <span className="text-[9.5px] text-muted-foreground/40 font-medium tracking-wide group-hover:text-muted-foreground transition-colors">
                    {app.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// ─── Social proof / logos section ─────────────────────────────────────────────

function LogosSection() {
  return (
    <section className="py-14 bg-muted/20 border-t border-border overflow-hidden relative">
      <Grain opacity={0.025} />
      <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
        <p className="text-center text-[11px] font-mono text-muted-foreground/40 uppercase tracking-[0.22em] mb-8">
          Bereits im Einsatz bei über 200 Betrieben
        </p>
        <div className="flex items-center gap-10 sm:gap-14 overflow-x-auto no-scrollbar pb-2 sm:justify-center">
          {LOGOS.map(name => (
            <span
              key={name}
              className="text-[12px] sm:text-[13px] font-medium text-muted-foreground/35 whitespace-nowrap hover:text-muted-foreground transition-colors cursor-default shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Interfere-style word-highlight section ───────────────────────────────────

const HIGHLIGHT_WORDS = [
  { word: "schult",         number: "01", accent: "#3b82f6" },
  { word: "plant",          number: "02", accent: "#f43f5e" },
  { word: "digitalisiert",  number: "03", accent: "#8b5cf6" },
]

function HighlightWord({ word, number, accent, delay }: { word: string; number: string; accent: string; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.span
      ref={ref}
      className="inline-flex items-baseline gap-[3px]"
      initial={{ opacity: 0.12 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="font-heading font-normal italic" style={{ color: accent }}>{word}</span>
      <span
        className="font-mono font-semibold leading-none"
        style={{ color: accent, opacity: 0.55, fontSize: "clamp(9px, 1.1vw, 11px)", verticalAlign: "super" }}
      >
        {number}
      </span>
    </motion.span>
  )
}

function InterfereSection() {
  return (
    <section className="py-32 sm:py-44 bg-background border-t border-border relative overflow-hidden">
      <Grain opacity={0.025} />
      <div className="mx-auto max-w-screen-xl px-5 sm:px-8">

        <FadeUp>
          <p className="text-[11px] font-mono text-muted-foreground/40 uppercase tracking-[0.24em] mb-8">
            Warum Hostpartners
          </p>
        </FadeUp>

        <FadeUp delay={0.05} className="mb-20 sm:mb-28">
          {/* Desktop: inline flow */}
          <h2 className="hidden sm:block text-[38px] sm:text-[46px] lg:text-[58px] xl:text-[68px] leading-[1.08] tracking-tight text-foreground font-semibold">
            Hostpartners{" "}
            <HighlightWord {...HIGHLIGHT_WORDS[0]} delay={0.2} />{" "}
            Teams,{" "}
            <HighlightWord {...HIGHLIGHT_WORDS[1]} delay={0.4} />{" "}
            Schichten
            <br />
            und{" "}
            <HighlightWord {...HIGHLIGHT_WORDS[2]} delay={0.6} />{" "}
            dein HR.
          </h2>
          {/* Mobile: stacked lines */}
          <div className="sm:hidden space-y-2 text-[32px] leading-[1.08] tracking-tight text-foreground font-semibold">
            <div>Hostpartners <HighlightWord {...HIGHLIGHT_WORDS[0]} delay={0.2} /> Teams,</div>
            <div><HighlightWord {...HIGHLIGHT_WORDS[1]} delay={0.4} /> Schichten</div>
            <div>und <HighlightWord {...HIGHLIGHT_WORDS[2]} delay={0.6} /> dein HR.</div>
          </div>
        </FadeUp>

        {/* 3 product preview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const Snippet = SNIPPET_MAP[f.snippet]
            return (
              <FadeUp key={f.number} delay={0.1 + i * 0.12}>
                <div className="mb-5">
                  <Snippet />
                </div>
                <div>
                  <span
                    className="text-[10px] font-mono tracking-widest block mb-2"
                    style={{ color: HIGHLIGHT_WORDS[i]?.accent ?? "#888" }}
                  >
                    {f.number}
                  </span>
                  <h3 className="text-[15px] font-semibold text-foreground mb-2 leading-snug">
                    {f.title}
                  </h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Sticky Feature Showcase ──────────────────────────────────────────────────

function StickyFeatureDesktop() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const [active, setActive] = useState(0)

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setActive(Math.min(Math.floor(v * FEATURES.length), FEATURES.length - 1))
    })
  }, [scrollYProgress])

  const ActiveSnippet = SNIPPET_MAP[FEATURES[active].snippet]

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${FEATURES.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <Grain opacity={0.025} />

        {/* Progress dots */}
        <div className="absolute right-8 xl:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              animate={{ scale: active === i ? 1 : 0.55, opacity: active === i ? 1 : 0.25 }}
              transition={{ duration: 0.3 }}
              className="size-1.5 rounded-full bg-foreground"
              title={f.title}
            />
          ))}
        </div>

        <div className="mx-auto max-w-screen-xl px-5 sm:px-8 w-full">
          <div className="grid grid-cols-2 gap-16 xl:gap-24 items-center">

            {/* Left: feature list */}
            <div className="space-y-12">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: active === i ? 1 : 0.16,
                    x: active === i ? 0 : -8,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <span
                    className="text-[10px] font-mono tracking-[0.22em] block mb-3"
                    style={{ color: HIGHLIGHT_WORDS[i]?.accent ?? "#888" }}
                  >
                    {f.number}
                  </span>
                  <h3 className="font-heading text-[28px] xl:text-[34px] text-foreground leading-tight mb-3">
                    {f.title}
                  </h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed mb-5">{f.body}</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                    {f.features.map(ft => (
                      <span key={ft} className="text-[12px] text-muted-foreground/60 flex items-center gap-1.5">
                        <span className="size-1 rounded-full bg-muted-foreground/30 inline-block" />
                        {ft}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: animated snippet */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={FEATURES[active].snippet}
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ActiveSnippet />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StickyFeatureSection() {
  return (
    <section className="bg-muted/20 border-t border-border">
      {/* Mobile: plain stacked sections */}
      <div className="lg:hidden py-20 space-y-20 relative overflow-hidden">
        <Grain opacity={0.025} />
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8 space-y-20">
          {FEATURES.map((f, i) => {
            const Snippet = SNIPPET_MAP[f.snippet]
            return (
              <FadeUp key={f.number} delay={0}>
                <div className="mb-6">
                  <Snippet />
                </div>
                <span
                  className="text-[10px] font-mono tracking-[0.22em] block mb-3"
                  style={{ color: HIGHLIGHT_WORDS[i]?.accent ?? "#888" }}
                >
                  {f.number}
                </span>
                <h3 className="text-[22px] font-semibold text-foreground mb-3 leading-tight">{f.title}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{f.body}</p>
              </FadeUp>
            )
          })}
        </div>
      </div>

      {/* Desktop: sticky scroll */}
      <div className="hidden lg:block">
        <StickyFeatureDesktop />
      </div>
    </section>
  )
}

// ─── Security / Trust section ─────────────────────────────────────────────────

function TrustSection() {
  const trustPoints = [
    { icon: Shield, title: "DSGVO-konform",   body: "Datenhaltung auf deutschen Servern. Vollständiger Audit-Trail, rollenbasierter Zugriff." },
    { icon: Globe,  title: "Multi-Mandant",   body: "Jede Organisation ist vollständig isoliert. Row-Level-Security auf Datenbankebene." },
    { icon: Zap,    title: "Modular & schnell", body: "Nur aktive Apps werden geladen. Keine ungenutzten Features, keine versteckten Kosten." },
  ]

  return (
    <section className="py-20 bg-background border-t border-border relative overflow-hidden">
      <Grain opacity={0.025} />
      <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
        <FadeUp>
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)" }}
            />
            <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.24em] mb-10">
              Sicherheit & Compliance
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
              {trustPoints.map((tp) => {
                const TIcon = tp.icon
                return (
                  <div key={tp.title}>
                    <div className="size-10 rounded-xl bg-muted border border-border flex items-center justify-center mb-5">
                      <TIcon className="size-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-foreground mb-2">{tp.title}</h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{tp.body}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── App Suite grid ───────────────────────────────────────────────────────────

function AppSuiteSection() {
  return (
    <section className="py-32 sm:py-44 bg-muted/20 border-t border-border relative overflow-hidden">
      <Grain opacity={0.025} />
      <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
        <FadeUp className="mb-16 sm:mb-24">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] font-mono text-muted-foreground/40 uppercase tracking-[0.24em] mb-4">App-Suite</p>
              <h2 className="text-[36px] sm:text-[52px] lg:text-[64px] leading-[0.95] tracking-tight text-foreground">
                <span className="font-semibold">Zehn Apps.</span><br />
                <span className="font-heading font-normal italic text-muted-foreground/60">Eine Plattform.</span>
              </h2>
            </div>
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-2 h-9 px-5 rounded-full border border-border text-muted-foreground text-[13px] hover:text-foreground hover:border-foreground/30 transition-all"
            >
              Alle entdecken <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </FadeUp>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {APPS.map((app, i) => {
            const Icon = app.icon
            return (
              <FadeUp key={app.key} delay={i * 0.04}>
                <Link
                  href={`/produkte/${app.key}`}
                  className="group flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card hover:border-foreground/20 hover:shadow-sm transition-all duration-300"
                >
                  <div className={cn(
                    "size-12 rounded-2xl flex items-center justify-center",
                    "group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-foreground/[0.08] transition-all duration-300",
                    app.color
                  )}>
                    <Icon className="size-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-foreground mb-1">{app.name}</p>
                    <p className="text-[12px] text-muted-foreground leading-snug">{app.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground/40 group-hover:text-muted-foreground transition-colors mt-auto">
                    Mehr erfahren <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Industries section ───────────────────────────────────────────────────────

function IndustriesSection() {
  return (
    <section className="py-32 sm:py-44 bg-muted/20 border-t border-border relative overflow-hidden">
      <Grain opacity={0.025} />
      <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
        <FadeUp className="mb-16 sm:mb-24">
          <p className="text-[11px] font-mono text-muted-foreground/40 uppercase tracking-[0.24em] mb-4">Branchen</p>
          <h2 className="text-[36px] sm:text-[52px] lg:text-[64px] leading-[0.95] tracking-tight text-foreground">
            <span className="font-semibold">Für jede Branche</span><br />
            <span className="font-heading font-normal italic text-muted-foreground/60">die richtige Lösung.</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon
            return (
              <FadeUp key={ind.href} delay={i * 0.1}>
                <Link
                  href={ind.href}
                  className="group flex flex-col gap-8 p-8 sm:p-10 rounded-2xl border border-border bg-card hover:border-foreground/20 hover:shadow-sm transition-all duration-300"
                >
                  <div className={cn("size-11 rounded-2xl flex items-center justify-center", ind.color)}>
                    <Icon className="size-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[22px] font-semibold text-foreground mb-2">{ind.label}</h3>
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed">{ind.desc}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground/50 group-hover:text-foreground transition-colors">
                    Mehr erfahren <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── CTA section ───────────────────────────────────────────────────────────────

function CTASection({
  accountCtaHref,
  accountCtaLabel,
}: {
  accountCtaHref: string
  accountCtaLabel: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-40 sm:py-60 bg-background overflow-hidden border-t border-border">
      <Grain opacity={0.02} />

      {/* Dramatic radial glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 2.5, delay: 0.2 }}
        style={{
          background: `radial-gradient(ellipse at 50% 105%, ${"#4f46e5"}12 0%, transparent 55%)`,
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(79,70,229,0.18), transparent)" }}
      />

      <div className="relative mx-auto max-w-screen-xl px-5 sm:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[11px] font-mono text-muted-foreground/40 uppercase tracking-[0.30em] mb-9"
        >
          Jetzt starten
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[42px] sm:text-[72px] lg:text-[96px] xl:text-[116px] leading-[0.94] tracking-tight text-foreground mb-8 text-balance"
        >
          <span className="font-semibold">Bereit für</span><br />
          <span className="font-heading font-normal italic text-muted-foreground/55">Hostpartners?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="text-[15px] sm:text-[17px] text-muted-foreground max-w-sm mx-auto mb-10 leading-relaxed"
        >
          Lerne Hostpartners in einer persönlichen Demo kennen — kostenlos und unverbindlich.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.36 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
        >
          <Link
            href="/login"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-foreground text-background text-[14px] font-semibold hover:opacity-90 transition-opacity"
          >
            Demo buchen <ArrowRight className="size-4" />
          </Link>
          <Link
            href={accountCtaHref}
            className="inline-flex items-center h-12 px-8 rounded-full border border-border text-muted-foreground text-[14px] font-medium hover:bg-muted/30 hover:text-foreground transition-all"
          >
            {accountCtaLabel}
          </Link>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {["Persönliche Demo", "DSGVO-konform", "Einführung begleitet", "Für Hotel, Gastro & Industrie"].map(trust => (
            <span key={trust} className="flex items-center gap-1.5 text-[12px] text-muted-foreground/70">
              <Check className="size-3 text-muted-foreground/50" />
              {trust}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function LandingPage({ isAuthenticated = false }: { isAuthenticated?: boolean }) {
  const accountCtaHref = isAuthenticated ? "/dashboard" : "/login"
  const accountCtaLabel = isAuthenticated ? "Zu den Apps" : "Anmelden"

  return (
    <>
      <HeroSection accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
      <LogosSection />
      <InterfereSection />
      <StickyFeatureSection />
      <TrustSection />
      <AppSuiteSection />
      <IndustriesSection />
      <CTASection accountCtaHref={accountCtaHref} accountCtaLabel={accountCtaLabel} />
    </>
  )
}

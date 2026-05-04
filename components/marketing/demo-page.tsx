"use client"

import { useState, useMemo, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useInView } from "framer-motion"
import {
  ChevronLeft, ChevronRight, Check, Clock, Video,
  ArrowLeft, CheckCircle2, Mail, Users, Building2,
  Sparkles, Globe, ArrowRight, CalendarDays,
  GraduationCap, GitBranch, BookOpen,
} from "lucide-react"
import {
  format, addMonths, subMonths, startOfMonth, endOfMonth,
  eachDayOfInterval, isSameDay, isBefore, startOfToday,
  getDay, isSameMonth,
} from "date-fns"
import { de } from "date-fns/locale"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = "date" | "form" | "confirmed"

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  role: string
  companySize: string
  message: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const WEEKDAYS_SHORT = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]

const TIME_SLOTS_MORNING = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"]
const TIME_SLOTS_AFTERNOON = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"]

const COMPANY_SIZES = [
  "1–10 Mitarbeitende",
  "11–50 Mitarbeitende",
  "51–200 Mitarbeitende",
  "201–500 Mitarbeitende",
  "500+ Mitarbeitende",
]

const WHAT_TO_EXPECT = [
  "Live-Demo der passenden Hostpartners-Apps",
  "Einblick in deine spezifische Branche",
  "Preise, Pakete & Implementierungszeitraum",
  "Antworten auf alle deine Fragen",
]

const SOCIAL_PROOF = [
  {
    quote: "Wir hatten innerhalb von 30 Minuten eine klare Entscheidungsgrundlage.",
    author: "Sandra K.",
    role: "HR-Leiterin, Berghotel Zugspitz",
  },
]

const STEPS = [
  { id: "date", label: "Datum & Zeit" },
  { id: "form", label: "Deine Angaben" },
  { id: "confirmed", label: "Bestätigt" },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getCalendarDays(month: Date): (Date | null)[] {
  const start = startOfMonth(month)
  const end = endOfMonth(month)
  const days = eachDayOfInterval({ start, end })
  let offset = getDay(start) // 0=Sun…6=Sat
  offset = offset === 0 ? 6 : offset - 1 // Mon=0…Sun=6
  return [...Array(offset).fill(null), ...days]
}

function isAvailable(date: Date): boolean {
  const today = startOfToday()
  if (isBefore(date, today) || isSameDay(date, today)) return false
  const d = getDay(date)
  return d !== 0 && d !== 6
}

// ─── Calendar component ───────────────────────────────────────────────────────

function CalendarPicker({
  selectedDate,
  onSelect,
}: {
  selectedDate: Date | null
  onSelect: (d: Date) => void
}) {
  const today = startOfToday()
  const [currentMonth, setCurrentMonth] = useState(() => startOfMonth(today))
  const days = useMemo(() => getCalendarDays(currentMonth), [currentMonth])
  const canGoPrev = !isSameMonth(currentMonth, today)

  return (
    <div className="w-full">
      {/* Month nav */}
      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth(m => subMonths(m, 1))}
          disabled={!canGoPrev}
          className="flex size-8 items-center justify-center rounded-xl border border-border/70 bg-card text-foreground/60 transition-all hover:border-border hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-25"
          aria-label="Vorheriger Monat"
        >
          <ChevronLeft className="size-4" />
        </button>
        <p className="text-[14px] font-semibold text-foreground">
          {format(currentMonth, "MMMM yyyy", { locale: de })}
        </p>
        <button
          onClick={() => setCurrentMonth(m => addMonths(m, 1))}
          className="flex size-8 items-center justify-center rounded-xl border border-border/70 bg-card text-foreground/60 transition-all hover:border-border hover:bg-muted/50"
          aria-label="Nächster Monat"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Weekday labels */}
      <div className="mb-2 grid grid-cols-7">
        {WEEKDAYS_SHORT.map(d => (
          <div
            key={d}
            className="py-1 text-center text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground/35"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {days.map((day, i) => {
          if (!day) return <div key={`e-${i}`} className="aspect-square" />
          const available = isAvailable(day)
          const selected = selectedDate ? isSameDay(day, selectedDate) : false
          const isToday = isSameDay(day, today)
          const isCurrentMonth = isSameMonth(day, currentMonth)

          return (
            <button
              key={day.toISOString()}
              disabled={!available}
              onClick={() => onSelect(day)}
              className={cn(
                "relative flex aspect-square w-full items-center justify-center rounded-xl text-[13px] font-medium transition-all",
                selected
                  ? "bg-foreground text-background shadow-sm scale-105"
                  : available
                    ? "text-foreground hover:bg-muted/60"
                    : "cursor-not-allowed text-muted-foreground/25",
                !isCurrentMonth && "opacity-40",
              )}
            >
              {format(day, "d")}
              {isToday && !selected && (
                <span className="absolute bottom-[3px] left-1/2 size-[3px] -translate-x-1/2 rounded-full bg-foreground/50" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Time slot picker ─────────────────────────────────────────────────────────

function TimeSlotPicker({
  selectedTime,
  onSelect,
  date,
}: {
  selectedTime: string | null
  onSelect: (t: string) => void
  date: Date
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Date header */}
      <div className="mb-5 border-b border-border/60 pb-4">
        <p className="text-[16px] font-semibold capitalize text-foreground">
          {format(date, "EEEE", { locale: de })}
        </p>
        <p className="mt-0.5 text-[13px] text-muted-foreground">
          {format(date, "d. MMMM yyyy", { locale: de })}
        </p>
      </div>

      {/* Slots — 2-column grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/40">
            Vormittag
          </p>
          <div className="space-y-2">
            {TIME_SLOTS_MORNING.map(t => (
              <TimeSlot key={t} time={t} selected={selectedTime === t} onSelect={onSelect} />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/40">
            Nachmittag
          </p>
          <div className="space-y-2">
            {TIME_SLOTS_AFTERNOON.map(t => (
              <TimeSlot key={t} time={t} selected={selectedTime === t} onSelect={onSelect} />
            ))}
          </div>
        </div>
      </div>

      {/* Timezone note */}
      <p className="mt-4 border-t border-border/60 pt-3 text-[11px] text-muted-foreground/40">
        Alle Zeiten in MEZ (UTC+1) · Berlin
      </p>
    </div>
  )
}

function TimeSlot({
  time,
  selected,
  onSelect,
}: {
  time: string
  selected: boolean
  onSelect: (t: string) => void
}) {
  return (
    <button
      onClick={() => onSelect(time)}
      className={cn(
        "group flex h-12 w-full items-center rounded-xl border px-4 text-[14px] font-medium transition-all",
        selected
          ? "border-foreground bg-foreground text-background shadow-sm"
          : "border-border/70 bg-background text-foreground hover:border-foreground/25 hover:bg-muted/40",
      )}
    >
      <span className="flex-1 text-left">{time}</span>
      {selected ? (
        <Check className="size-4 shrink-0" strokeWidth={2.5} />
      ) : (
        <span className="text-[11.5px] text-muted-foreground/35 transition-colors group-hover:text-muted-foreground/60">
          30 min
        </span>
      )}
    </button>
  )
}

// ─── Form fields ──────────────────────────────────────────────────────────────

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1.5 block text-[12.5px] font-semibold text-foreground/80">
      {children}
      {required && <span className="ml-0.5 text-muted-foreground/50">*</span>}
    </label>
  )
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="flex h-10 w-full rounded-xl border border-border/70 bg-background px-3.5 text-[13.5px] text-foreground placeholder:text-muted-foreground/35 transition-all focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/8"
    />
  )
}

function SelectField({
  value,
  onChange,
  options,
  placeholder,
  required,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
  required?: boolean
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className={cn(
          "flex h-10 w-full appearance-none rounded-xl border border-border/70 bg-background pl-3.5 pr-9 text-[13.5px] transition-all focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/8",
          value ? "text-foreground" : "text-muted-foreground/35",
        )}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronRight className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 rotate-90 text-muted-foreground/50" />
    </div>
  )
}

function Textarea({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className="flex w-full resize-none rounded-xl border border-border/70 bg-background px-3.5 py-3 text-[13.5px] text-foreground placeholder:text-muted-foreground/35 transition-all focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/8"
    />
  )
}

// ─── Step progress indicator ──────────────────────────────────────────────────

function StepIndicator({ current }: { current: Step }) {
  const idx = STEPS.findIndex(s => s.id === current)
  return (
    <div className="mb-7 flex items-center gap-2">
      {STEPS.map((s, i) => {
        const done = i < idx
        const active = i === idx
        return (
          <div key={s.id} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex size-6 items-center justify-center rounded-full text-[11px] font-bold transition-all",
                  done
                    ? "bg-foreground text-background"
                    : active
                      ? "border-2 border-foreground text-foreground"
                      : "border-2 border-border text-muted-foreground/30",
                )}
              >
                {done ? <Check className="size-3" strokeWidth={2.5} /> : i + 1}
              </div>
              <span
                className={cn(
                  "hidden text-[12px] font-medium sm:block",
                  active ? "text-foreground" : done ? "text-muted-foreground" : "text-muted-foreground/35",
                )}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn("h-px w-6 transition-colors sm:w-10", i < idx ? "bg-foreground/30" : "bg-border")} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function DemoPage() {
  const [step, setStep] = useState<Step>("date")
  const [activeTab, setActiveTab] = useState<"datum" | "zeit">("datum")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    companySize: "",
    message: "",
  })

  const rightRef = useRef<HTMLDivElement>(null)

  function handleDateSelect(date: Date) {
    setSelectedDate(date)
    setSelectedTime(null)
    // auto-advance to time tab
    setTimeout(() => setActiveTab("zeit"), 180)
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time)
  }

  function handleContinueToForm() {
    if (!selectedDate || !selectedTime) return
    setStep("form")
    rightRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStep("confirmed")
    rightRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }

  function setFormField<K extends keyof FormData>(k: K, v: string) {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  const canContinue = !!selectedDate && !!selectedTime

  return (
    <div className="min-h-screen bg-background">
      {/* Nav bar minimal */}
      <div className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="size-[26px] rounded-[7px] bg-white overflow-hidden transition-transform duration-200 group-hover:scale-105">
              <img src="/icon.png" alt="Hostpartners" className="w-full h-full object-contain" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              Hostpartners
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Zurück
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-screen-xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr]">

          {/* ── Left: Info panel ─────────────────────────────────────────────── */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/90 px-3 py-1.5 backdrop-blur-sm">
                <CalendarDays className="size-3.5 text-foreground/60" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Kostenlose Demo
                </span>
              </div>

              <h1 className="font-heading text-[38px] font-normal leading-[0.92] tracking-tight text-foreground sm:text-[46px] lg:text-[52px]">
                Demo
                <br />
                <span className="text-muted-foreground/55">buchen.</span>
              </h1>

              <p className="mt-5 text-[14.5px] leading-relaxed text-muted-foreground">
                30 Minuten. Kein Salesscript. Wir zeigen dir genau, was Hostpartners für deinen
                Betrieb tun kann.
              </p>

              {/* Meeting details */}
              <div className="mt-7 space-y-3">
                {[
                  { icon: Clock, text: "30 Minuten" },
                  { icon: Video, text: "Google Meet oder Microsoft Teams" },
                  { icon: Globe, text: "Auf Deutsch" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-card">
                      <Icon className="size-3.5 text-foreground/60" />
                    </div>
                    <span className="text-[13px] text-muted-foreground">{text}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="my-7 border-t border-border/60" />

              {/* What to expect */}
              <div>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/45">
                  Was dich erwartet
                </p>
                <ul className="space-y-2.5">
                  {WHAT_TO_EXPECT.map(item => (
                    <li key={item} className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-foreground/8">
                        <Check className="size-2.5 text-foreground/60" strokeWidth={2.5} />
                      </div>
                      <span className="text-[13px] leading-relaxed text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div className="my-7 border-t border-border/60" />

              {/* Social proof quote */}
              {SOCIAL_PROOF.map(({ quote, author, role }) => (
                <div
                  key={author}
                  className="rounded-[22px] border border-border/70 bg-card/60 p-5 backdrop-blur-sm"
                >
                  <p className="text-[13px] leading-relaxed text-muted-foreground">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-2.5">
                    <div className="flex size-7 items-center justify-center rounded-full border border-border/70 bg-muted/60">
                      <span className="text-[9.5px] font-bold text-foreground/50">
                        {author.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-foreground">{author}</p>
                      <p className="text-[11px] text-muted-foreground/55">{role}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Apps used */}
              <div className="mt-7">
                <p className="mb-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/45">
                  Hostpartners Apps
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { color: "bg-slate-600",   label: "Persona",  icon: Users },
                    { color: "bg-emerald-600", label: "Atlas",    icon: BookOpen },
                    { color: "bg-blue-600",    label: "Academy",  icon: GraduationCap },
                    { color: "bg-violet-600",  label: "Flow",     icon: GitBranch },
                    { color: "bg-indigo-600",  label: "Lumen",    icon: Sparkles },
                  ].map(({ color, label, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-1.5 rounded-full border border-border/70 bg-card/70 py-1 pl-1.5 pr-2.5"
                    >
                      <div className={cn("flex size-4.5 items-center justify-center rounded-full", color)}>
                        <Icon className="size-2.5 text-white" />
                      </div>
                      <span className="text-[11px] font-medium text-foreground/70">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Booking flow ───────────────────────────────────────────── */}
          <div ref={rightRef}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[32px] border border-border/70 bg-card/50 p-6 backdrop-blur-sm sm:p-8 lg:p-10"
            >
              {step !== "confirmed" && <StepIndicator current={step} />}

              <AnimatePresence mode="wait">
                {/* ── Step 1: Date + Time ──────────────────────────────────── */}
                {step === "date" && (
                  <motion.div
                    key="date"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h2 className="mb-1.5 text-[20px] font-semibold text-foreground sm:text-[22px]">
                      Termin wählen
                    </h2>
                    <p className="mb-6 text-[13.5px] text-muted-foreground">
                      Wähle einen Tag, dann eine Uhrzeit.
                    </p>

                    {/* ── Tab bar ── */}
                    <div className="mb-5 flex gap-1 rounded-2xl border border-border/70 bg-muted/25 p-1">
                      {/* Datum tab */}
                      <button
                        onClick={() => setActiveTab("datum")}
                        className={cn(
                          "relative flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-medium transition-all",
                          activeTab === "datum"
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <CalendarDays className="size-3.5 shrink-0" />
                        Datum
                        {selectedDate && (
                          <span className="flex size-4 items-center justify-center rounded-full bg-foreground">
                            <Check className="size-2.5 text-background" strokeWidth={3} />
                          </span>
                        )}
                      </button>

                      {/* Zeit tab */}
                      <button
                        onClick={() => selectedDate && setActiveTab("zeit")}
                        disabled={!selectedDate}
                        className={cn(
                          "relative flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-medium transition-all",
                          activeTab === "zeit"
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground",
                          !selectedDate && "cursor-not-allowed opacity-35",
                        )}
                      >
                        <Clock className="size-3.5 shrink-0" />
                        Uhrzeit
                        {selectedTime && (
                          <span className="flex size-4 items-center justify-center rounded-full bg-foreground">
                            <Check className="size-2.5 text-background" strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    </div>

                    {/* ── Tab content ── */}
                    <div className="rounded-2xl border border-border/70 bg-background">
                      <AnimatePresence mode="wait">
                        {activeTab === "datum" ? (
                          <motion.div
                            key="tab-datum"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="p-5 sm:p-7"
                          >
                            <CalendarPicker
                              selectedDate={selectedDate}
                              onSelect={handleDateSelect}
                            />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="tab-zeit"
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="p-5 sm:p-7"
                          >
                            {selectedDate && (
                              <TimeSlotPicker
                                date={selectedDate}
                                selectedTime={selectedTime}
                                onSelect={handleTimeSelect}
                              />
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Continue button */}
                    <div className="mt-7 flex items-center justify-between">
                      <div className="text-[12.5px] text-muted-foreground/50">
                        {selectedDate && selectedTime && (
                          <span className="text-foreground/70 font-medium">
                            {format(selectedDate, "EEEE, d. MMMM", { locale: de })} um {selectedTime} Uhr
                          </span>
                        )}
                      </div>
                      <button
                        onClick={handleContinueToForm}
                        disabled={!canContinue}
                        className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-7 text-[13.5px] font-semibold text-background transition-all hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        Weiter <ArrowRight className="size-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 2: Contact form ─────────────────────────────────── */}
                {step === "form" && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Booking summary chip */}
                    {selectedDate && selectedTime && (
                      <div className="mb-6 flex items-center justify-between rounded-xl border border-border/70 bg-background px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <CalendarDays className="size-4 text-foreground/50" />
                          <span className="text-[13px] font-medium text-foreground">
                            {format(selectedDate, "EEEE, d. MMMM", { locale: de })} · {selectedTime} Uhr
                          </span>
                        </div>
                        <button
                          onClick={() => setStep("date")}
                          className="text-[11.5px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                          Ändern
                        </button>
                      </div>
                    )}

                    <h2 className="mb-1.5 text-[20px] font-semibold text-foreground sm:text-[22px]">
                      Deine Angaben
                    </h2>
                    <p className="mb-7 text-[13.5px] text-muted-foreground">
                      Damit wir uns bestmöglich vorbereiten können.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name row */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <FieldLabel required>Vorname</FieldLabel>
                          <Input
                            value={form.firstName}
                            onChange={v => setFormField("firstName", v)}
                            placeholder="Anna"
                            required
                          />
                        </div>
                        <div>
                          <FieldLabel required>Nachname</FieldLabel>
                          <Input
                            value={form.lastName}
                            onChange={v => setFormField("lastName", v)}
                            placeholder="Müller"
                            required
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <FieldLabel required>E-Mail-Adresse</FieldLabel>
                        <Input
                          type="email"
                          value={form.email}
                          onChange={v => setFormField("email", v)}
                          placeholder="anna@berghotel.de"
                          required
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <FieldLabel required>Unternehmen</FieldLabel>
                        <Input
                          value={form.company}
                          onChange={v => setFormField("company", v)}
                          placeholder="Berghotel Zugspitz GmbH"
                          required
                        />
                      </div>

                      {/* Role + Size */}
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <FieldLabel>Funktion</FieldLabel>
                          <Input
                            value={form.role}
                            onChange={v => setFormField("role", v)}
                            placeholder="HR-Leitung, GM, Inhaber…"
                          />
                        </div>
                        <div>
                          <FieldLabel required>Unternehmensgröße</FieldLabel>
                          <SelectField
                            value={form.companySize}
                            onChange={v => setFormField("companySize", v)}
                            options={COMPANY_SIZES}
                            placeholder="Auswählen…"
                            required
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <FieldLabel>Was möchtest du besprechen? <span className="font-normal text-muted-foreground/40">(optional)</span></FieldLabel>
                        <Textarea
                          value={form.message}
                          onChange={v => setFormField("message", v)}
                          placeholder="z.B. digitales Onboarding, Schichtplanung, HACCP-Schulungen…"
                        />
                      </div>

                      {/* DSGVO note */}
                      <p className="text-[11.5px] leading-relaxed text-muted-foreground/40">
                        Deine Daten werden ausschließlich zur Terminbestätigung und Gesprächsvorbereitung genutzt.
                        Keine Weitergabe an Dritte. Details in unserer{" "}
                        <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-muted-foreground">
                          Datenschutzerklärung
                        </Link>
                        .
                      </p>

                      {/* Buttons */}
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep("date")}
                          className="flex h-11 items-center gap-1.5 rounded-full border border-border/70 px-5 text-[13.5px] font-medium text-foreground/70 transition-colors hover:bg-muted/40"
                        >
                          <ArrowLeft className="size-3.5" /> Zurück
                        </button>
                        <button
                          type="submit"
                          className="flex flex-1 h-11 items-center justify-center gap-2 rounded-full bg-foreground px-7 text-[13.5px] font-semibold text-background transition-opacity hover:opacity-85"
                        >
                          Demo jetzt buchen <ArrowRight className="size-4" />
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* ── Step 3: Confirmed ────────────────────────────────────── */}
                {step === "confirmed" && (
                  <motion.div
                    key="confirmed"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="py-6"
                  >
                    {/* Animated check */}
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="mb-8 flex size-16 items-center justify-center rounded-full border border-foreground/10 bg-foreground"
                    >
                      <Check className="size-7 text-background" strokeWidth={2.5} />
                    </motion.div>

                    <h2 className="mb-2 font-heading text-[32px] font-normal leading-[0.94] tracking-tight text-foreground sm:text-[40px]">
                      Demo bestätigt.
                    </h2>
                    <p className="mb-8 text-[15px] text-muted-foreground">
                      Wir freuen uns auf das Gespräch, {form.firstName || "dich"}.
                      Du bekommst in wenigen Minuten eine Bestätigung per E-Mail.
                    </p>

                    {/* Booking summary */}
                    <div className="mb-8 rounded-2xl border border-border/70 bg-background p-5 space-y-3">
                      {[
                        {
                          icon: CalendarDays,
                          label: "Termin",
                          value: selectedDate && selectedTime
                            ? `${format(selectedDate, "EEEE, d. MMMM yyyy", { locale: de })} · ${selectedTime} Uhr`
                            : "–",
                        },
                        {
                          icon: Clock,
                          label: "Dauer",
                          value: "30 Minuten",
                        },
                        {
                          icon: Video,
                          label: "Format",
                          value: "Video-Call (Link folgt per E-Mail)",
                        },
                        {
                          icon: Mail,
                          label: "Bestätigung an",
                          value: form.email || "–",
                        },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-start gap-3">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-card">
                            <Icon className="size-3.5 text-foreground/60" />
                          </div>
                          <div>
                            <p className="text-[11px] text-muted-foreground/50 font-medium">{label}</p>
                            <p className="text-[13px] font-medium text-foreground">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Link
                        href="/"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-7 text-[13.5px] font-semibold text-background transition-opacity hover:opacity-85"
                      >
                        Zur Startseite <ArrowRight className="size-4" />
                      </Link>
                      <Link
                        href="/produkte/persona"
                        className="inline-flex h-11 items-center justify-center rounded-full border border-border/70 bg-card px-7 text-[13.5px] font-medium text-foreground/80 transition-colors hover:bg-muted/40"
                      >
                        Produkte entdecken
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

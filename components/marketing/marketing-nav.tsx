"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Menu, X, ChevronDown, ArrowRight,
  Users, BookOpen, GraduationCap, GitBranch,
  Clock, CalendarDays, TrendingUp, Sparkles,
  Building2, ChefHat, Factory,
  UserPlus, Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"

const INDUSTRIES = [
  { href: "/industrien/hotellerie",  label: "Hotellerie",  desc: "Hotels, Resorts & Pensionen",   icon: Building2 },
  { href: "/industrien/gastronomie", label: "Gastronomie", desc: "Restaurants, Cafés & Catering", icon: ChefHat },
  { href: "/industrien/industrie",   label: "Industrie",   desc: "Produktion & Fertigung",         icon: Factory },
]

const APPS = [
  { slug: "persona", label: "Persona", desc: "Stammdaten & Organigramm",  icon: Users,         color: "bg-slate-600" },
  { slug: "atlas",   label: "Atlas",   desc: "Wissensdatenbank",           icon: BookOpen,      color: "bg-emerald-600" },
  { slug: "academy", label: "Academy", desc: "Schulungen & Kurse",         icon: GraduationCap, color: "bg-blue-600" },
  { slug: "flow",    label: "Flow",    desc: "Onboarding & Prozesse",      icon: GitBranch,     color: "bg-violet-600" },
  { slug: "tempo",   label: "Tempo",   desc: "Zeiterfassung & Urlaub",     icon: Clock,         color: "bg-orange-500" },
  { slug: "roster",  label: "Roster",  desc: "Schichtplanung",             icon: CalendarDays,  color: "bg-rose-600" },
  { slug: "pulse",   label: "Pulse",   desc: "Performance & OKRs",         icon: TrendingUp,    color: "bg-amber-500" },
  { slug: "lumen",   label: "Lumen",   desc: "KI-Assistent",               icon: Sparkles,      color: "bg-indigo-600" },
  { slug: "hire",    label: "Hire",    desc: "Recruiting & Bewerbungen",   icon: UserPlus,      color: "bg-sky-600" },
  { slug: "payroll", label: "Payroll", desc: "Gehaltsabrechnung & DATEV",  icon: Wallet,        color: "bg-teal-600" },
]

// Uses a close-delay so the mouse can travel from button → panel without flickering
function useHoverMenu() {
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const enter = () => {
    if (timer.current) clearTimeout(timer.current)
    setOpen(true)
  }
  const leave = () => {
    timer.current = setTimeout(() => setOpen(false), 120)
  }

  return { open, enter, leave, close: () => setOpen(false) }
}

export function MarketingNav({ isAuthenticated = false }: { isAuthenticated?: boolean }) {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const produkte   = useHoverMenu()
  const industrien = useHoverMenu()
  const accountCtaHref = isAuthenticated ? "/dashboard" : "/login"
  const accountCtaLabel = isAuthenticated ? "Zu den Apps" : "Anmelden"

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <>
      <header className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/96 backdrop-blur-2xl border-b border-border shadow-sm shadow-foreground/[0.04]"
          : "bg-transparent"
      )}>
        <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-5 sm:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="size-[26px] rounded-[7px] bg-foreground flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <span className="text-background text-[12px] font-bold tracking-tighter select-none">G</span>
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              Hostpartners
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">

            {/* ── Produkte dropdown ─────────────────────────────────── */}
            <div
              className="relative"
              onMouseEnter={produkte.enter}
              onMouseLeave={produkte.leave}
            >
              <button
                className="flex items-center gap-1 h-8 px-3 rounded-lg text-[13px] text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-colors"
                aria-expanded={produkte.open}
              >
                Produkte
                <ChevronDown className={cn("size-3 transition-transform duration-200", produkte.open && "rotate-180")} />
              </button>

              {/* Invisible bridge fills the gap between button bottom and panel top */}
              {produkte.open && (
                <div className="absolute top-full inset-x-0 h-3" />
              )}

              <div
                className={cn(
                  "absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50 transition-all duration-150",
                  produkte.open
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                )}
              >
                <div className="w-[680px] rounded-xl border border-border bg-background shadow-xl shadow-foreground/[0.09] overflow-hidden">
                  {/* Header row */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/20">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">
                      Die App-Suite — 10 Module
                    </p>
                    <Link
                      href="/"
                      className="text-[11px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                      onClick={produkte.close}
                    >
                      Alle Apps <ArrowRight className="size-3" />
                    </Link>
                  </div>
                  {/* 2-column grid */}
                  <div className="grid grid-cols-2">
                    {APPS.map((app, i) => {
                      const Icon = app.icon
                      return (
                        <Link
                          key={app.slug}
                          href={`/produkte/${app.slug}`}
                          className={cn(
                            "flex items-center gap-3.5 px-5 py-4 hover:bg-muted/40 transition-colors group",
                            i % 2 === 0 && "border-r border-border",
                            i < APPS.length - 2 && "border-b border-border"
                          )}
                          onClick={produkte.close}
                        >
                          <div className={cn("size-9 rounded-xl shrink-0 flex items-center justify-center shadow-sm", app.color)}>
                            <Icon className="size-4.5 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-semibold text-foreground leading-none mb-1">{app.label}</p>
                            <p className="text-[11.5px] text-muted-foreground truncate">{app.desc}</p>
                          </div>
                          <ArrowRight className="size-3.5 text-muted-foreground/0 group-hover:text-muted-foreground/50 transition-colors shrink-0" />
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Industrien dropdown ───────────────────────────────── */}
            <div
              className="relative"
              onMouseEnter={industrien.enter}
              onMouseLeave={industrien.leave}
            >
              <button
                className="flex items-center gap-1 h-8 px-3 rounded-lg text-[13px] text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-colors"
                aria-expanded={industrien.open}
              >
                Industrien
                <ChevronDown className={cn("size-3 transition-transform duration-200", industrien.open && "rotate-180")} />
              </button>

              {industrien.open && (
                <div className="absolute top-full inset-x-0 h-3" />
              )}

              <div
                className={cn(
                  "absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50 transition-all duration-150",
                  industrien.open
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                )}
              >
                <div className="w-[420px] rounded-xl border border-border bg-background shadow-xl shadow-foreground/[0.09] overflow-hidden">
                  <div className="px-5 py-3 border-b border-border bg-muted/20">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">Branchen</p>
                  </div>
                  {INDUSTRIES.map((ind, i) => {
                    const Icon = ind.icon
                    return (
                      <Link
                        key={ind.href}
                        href={ind.href}
                        className={cn(
                          "flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors group",
                          i < INDUSTRIES.length - 1 && "border-b border-border"
                        )}
                        onClick={industrien.close}
                      >
                        <div className="size-10 rounded-xl bg-muted/50 border border-border flex items-center justify-center shrink-0">
                          <Icon className="size-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-semibold text-foreground leading-none mb-1">{ind.label}</p>
                          <p className="text-[12px] text-muted-foreground">{ind.desc}</p>
                        </div>
                        <ArrowRight className="size-4 text-muted-foreground/0 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>

            <Link
              href="/ueber-uns"
              className="flex items-center h-8 px-3 rounded-lg text-[13px] text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-colors"
            >
              Über uns
            </Link>
            <Link
              href="/kontakt"
              className="flex items-center h-8 px-3 rounded-lg text-[13px] text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-colors"
            >
              Kontakt
            </Link>

          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-1.5">
            <Link
              href={accountCtaHref}
              className="h-9 px-5 rounded-full text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-colors inline-flex items-center"
            >
              {accountCtaLabel}
            </Link>
            <Link
              href="/login"
              className="group inline-flex items-center gap-1.5 h-9 px-5 rounded-full text-[13px] font-semibold bg-foreground text-background hover:opacity-85 transition-opacity"
            >
              Demo buchen
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-1.5 rounded-lg text-foreground hover:bg-foreground/[0.06] transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menü"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-14 overflow-y-auto md:hidden">
          <div className="px-5 py-8 space-y-8">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/40 mb-3 px-1">
                Branchen
              </p>
              <div className="space-y-0.5">
                {INDUSTRIES.map(ind => {
                  const Icon = ind.icon
                  return (
                    <Link
                      key={ind.href}
                      href={ind.href}
                      className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-muted/50 transition-colors group"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="size-8 rounded-lg bg-muted/60 border border-border flex items-center justify-center shrink-0">
                        <Icon className="size-4 text-muted-foreground" />
                      </div>
                      <div>
                        <span className="text-[14px] font-medium text-foreground block">{ind.label}</span>
                        <span className="text-[12px] text-muted-foreground">{ind.desc}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/40 mb-3 px-1">
                Produkte
              </p>
              <div className="grid grid-cols-2 gap-1">
                {APPS.map(app => {
                  const Icon = app.icon
                  return (
                    <Link
                      key={app.slug}
                      href={`/produkte/${app.slug}`}
                      className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className={cn("size-7 rounded-lg shrink-0 flex items-center justify-center", app.color)}>
                        <Icon className="size-3.5 text-white" />
                      </div>
                      <span className="text-[13px] font-medium text-foreground">{app.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-2.5">
              <div className="grid grid-cols-1 gap-1">
                <Link
                  href="/ueber-uns"
                  className="block w-full py-3 px-4 rounded-xl text-[14px] font-medium text-foreground hover:bg-muted/50 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Über uns
                </Link>
                <Link
                  href="/kontakt"
                  className="block w-full py-3 px-4 rounded-xl text-[14px] font-medium text-foreground hover:bg-muted/50 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Kontakt Vertrieb
                </Link>
              </div>
              <Link
                href={accountCtaHref}
                className="block w-full py-3 px-4 rounded-xl border border-border text-center text-[14px] font-medium text-foreground hover:bg-muted/50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {accountCtaLabel}
              </Link>
              <Link
                href="/login"
                className="flex w-full items-center justify-center gap-2 py-3 px-4 rounded-xl bg-foreground text-background text-[14px] font-semibold hover:opacity-85 transition-opacity"
                onClick={() => setMobileOpen(false)}
              >
                Demo buchen
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

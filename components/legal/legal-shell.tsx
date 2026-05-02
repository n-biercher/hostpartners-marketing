import Link from "next/link"
import { ArrowLeft, ArrowUp, Mail } from "lucide-react"
import { LegalToc } from "./legal-toc"

export interface LegalSection { id: string; title: string }

interface LegalShellProps {
  title: string
  category: string
  date: string
  sections: LegalSection[]
  children: React.ReactNode
}

export function LegalShell({ title, category, date, sections, children }: LegalShellProps) {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Document masthead ── */}
      <div className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-screen-lg px-5 sm:px-8 py-12 sm:py-16">
          <Link
            href="/legal"
            className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-3 transition-transform duration-150 group-hover:-translate-x-0.5" />
            Rechtliches
          </Link>

          <div className="flex items-start gap-4">
            <span className="mt-1 inline-block rounded border border-border bg-background px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 shrink-0">
              {category}
            </span>
          </div>

          <h1 className="mt-3 font-heading text-[40px] sm:text-[52px] font-normal leading-[1.08] tracking-tight text-foreground">
            {title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <span className="text-[12.5px] text-muted-foreground">
              Stand: <span className="tabular-nums">{date}</span>
            </span>
            <span className="text-border select-none">·</span>
            <span className="text-[12.5px] text-muted-foreground">Hostpartners GmbH</span>
            <span className="text-border select-none">·</span>
            <span className="text-[12.5px] text-muted-foreground">Version 1.0</span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="mx-auto max-w-screen-lg px-5 sm:px-8 pb-32 pt-10
        grid grid-cols-1
        lg:grid-cols-[220px_1fr]
        xl:grid-cols-[240px_1fr]
        gap-x-16 gap-y-0">

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-20 lg:self-start lg:pt-2 mb-10 lg:mb-0">
          {/* Desktop TOC */}
          <div className="hidden lg:block">
            <LegalToc sections={sections} />
          </div>

          {/* Mobile accordion */}
          <details className="lg:hidden group">
            <summary className="flex items-center justify-between cursor-pointer select-none text-[13px] font-medium text-foreground py-2.5 px-4 rounded-lg border border-border bg-muted/30 list-none">
              <span>Inhaltsverzeichnis</span>
              <span className="text-muted-foreground text-[11px] transition-transform duration-200 group-open:rotate-180">▾</span>
            </summary>
            <ul className="mt-2 space-y-0.5 border border-border rounded-lg p-2 bg-background">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-center gap-3 py-2 px-2.5 text-[12.5px] text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                  >
                    <span className="tabular-nums text-[11px] font-medium text-muted-foreground/40 w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.title.replace(/^\d+\.\s*/, "")}</span>
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </aside>

        {/* Document content */}
        <article className="min-w-0">
          <div className="space-y-12">
            {children}
          </div>

        </article>
      </div>

      {/* ── Full-width footer ── */}
      <footer className="mt-8 border-t border-border bg-muted/20">
        <div className="mx-auto max-w-screen-lg px-5 sm:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">

            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-white overflow-hidden shrink-0">
                  <img src="/icon.png" alt="Hostpartners" className="w-full h-full object-contain" />
                </div>
                <span className="text-[13px] font-semibold tracking-tight text-foreground">Hostpartners</span>
              </div>
              <p className="text-[12px] text-muted-foreground leading-relaxed max-w-[220px]">
                Die modulare HR-Plattform für Unternehmen in Hotellerie, Gastronomie und Industrie.
              </p>
            </div>

            {/* Legal links */}
            <div className="space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40">
                Rechtliches
              </p>
              <ul className="space-y-1.5">
                {[
                  { href: "/legal",          label: "Übersicht" },
                  { href: "/legal/agb",      label: "AGB" },
                  { href: "/legal/privacy",  label: "Datenschutzerklärung" },
                  { href: "/legal/impressum",label: "Impressum" },
                ].map(l => (
                  <li key={l.href}>
                    <Link href={l.href}
                      className="text-[12.5px] text-muted-foreground hover:text-foreground transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40">
                Kontakt
              </p>
              <ul className="space-y-1.5">
                {[
                  { label: "legal@hostpartners.com",   href: "mailto:legal@hostpartners.com",    note: "Rechtliches" },
                  { label: "privacy@hostpartners.com", href: "mailto:privacy@hostpartners.com",  note: "Datenschutz" },
                  { label: "support@hostpartners.com", href: "mailto:support@hostpartners.com",  note: "Support" },
                ].map(c => (
                  <li key={c.href} className="flex items-center gap-2">
                    <Mail className="size-3 text-muted-foreground/40 shrink-0" />
                    <a href={c.href}
                      className="text-[12.5px] text-muted-foreground hover:text-foreground transition-colors">
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t border-border">
            <p className="text-[11px] text-muted-foreground/40">
              © {new Date().getFullYear()} Hostpartners GmbH — Alle Rechte vorbehalten. · Musterstraße 1, 10115 Berlin
            </p>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 text-[11.5px] text-muted-foreground/40 hover:text-muted-foreground transition-colors group"
            >
              Nach oben
              <ArrowUp className="size-3 transition-transform duration-150 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

interface SectionProps {
  id: string
  title: string
  index: number
  children: React.ReactNode
}

export function LegalSection({ id, title, index, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-start gap-5 mb-6">
        <span className="mt-1.5 text-[11px] font-mono font-semibold tabular-nums text-muted-foreground/30 select-none shrink-0 w-7 text-right">
          {String(index).padStart(2, "0")}
        </span>
        <h2 className="font-heading text-[22px] sm:text-[25px] font-normal leading-snug tracking-tight text-foreground">
          {title.replace(/^\d+\.\s*/, "")}
        </h2>
      </div>
      <div className="ml-12 space-y-4 text-[14px] leading-[1.85] text-muted-foreground">
        {children}
      </div>
    </section>
  )
}

// ─── Prose helpers ────────────────────────────────────────────────────────────

export function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>
}

export function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="text-foreground font-medium">{children}</strong>
}

export function UL({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[9px] size-1 rounded-full bg-border shrink-0" />
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4 rounded-r-lg border-l-2 border-foreground/20 bg-muted/30 px-5 py-4 text-[13px] leading-relaxed text-muted-foreground">
      <span className="mt-0.5 size-1.5 rounded-full bg-foreground/20 shrink-0 mt-[7px]" />
      <div className="flex-1">{children}</div>
    </div>
  )
}

export function Table({ rows }: { rows: [string, string][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-muted/20">
      <table className="w-full text-[13px]">
        <tbody className="divide-y divide-border">
          {rows.map(([label, value], i) => (
            <tr key={i} className="group">
              <td className="px-4 py-3 font-medium text-foreground/80 whitespace-nowrap w-44 align-top bg-muted/10 group-first:rounded-tl-xl group-last:rounded-bl-xl">
                {label}
              </td>
              <td className="px-4 py-3 text-muted-foreground align-top">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

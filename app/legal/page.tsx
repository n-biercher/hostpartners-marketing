import Link from "next/link"
import { ArrowUpRight, Scale, ShieldCheck, Building2 } from "lucide-react"

export const metadata = { title: "Rechtliches – Hostpartners" }

const DOCS = [
  {
    href:        "/legal/agb",
    icon:        Scale,
    title:       "Allgemeine Geschäftsbedingungen",
    short:       "AGB",
    date:        "07. April 2026",
    description: "Vertragsschluss, Nutzungsrechte, Preise, Haftung und Kündigung für die Nutzung der Hostpartners-Plattform.",
  },
  {
    href:        "/legal/privacy",
    icon:        ShieldCheck,
    title:       "Datenschutzerklärung",
    short:       "DSGVO",
    date:        "07. April 2026",
    description: "Verarbeitung personenbezogener Daten, eingesetzte Dienstleister, Betroffenenrechte und technische Sicherheitsmaßnahmen.",
  },
  {
    href:        "/legal/impressum",
    icon:        Building2,
    title:       "Impressum",
    short:       "§ 5 DDG",
    date:        "07. April 2026",
    description: "Angaben zum Anbieter gemäß Digitale-Dienste-Gesetz sowie Hinweise zu Urheberrecht und Haftungsausschluss.",
  },
]

export default function LegalIndexPage() {
  return (
    <div className="mx-auto max-w-screen-lg px-5 sm:px-8 py-16 sm:py-24">

      {/* Heading */}
      <div className="mb-16 max-w-2xl">
        <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-muted-foreground/40 mb-4">
          Hostpartners · Rechtliches
        </p>
        <h1 className="font-heading text-[42px] sm:text-[54px] font-normal leading-[1.06] tracking-tight text-foreground">
          Rechtliche Dokumente
        </h1>
        <p className="mt-5 text-[15px] text-muted-foreground leading-relaxed">
          Alle rechtlich relevanten Dokumente auf einen Blick. Transparenz ist für uns
          keine Pflicht, sondern Grundlage einer vertrauensvollen Zusammenarbeit.
        </p>
      </div>

      {/* Document list */}
      <div className="divide-y divide-border border-y border-border">
        {DOCS.map(({ href, icon: Icon, title, short, date, description }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-start gap-6 py-7 hover:bg-muted/20 -mx-5 sm:-mx-8 px-5 sm:px-8 transition-colors duration-200"
          >
            {/* Icon */}
            <div className="size-10 rounded-lg border border-border bg-background flex items-center justify-center shrink-0 mt-0.5 group-hover:border-foreground/20 transition-colors">
              <Icon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[9.5px] font-semibold uppercase tracking-widest text-muted-foreground/40">
                    {short}
                  </span>
                  <span className="text-border/60 select-none text-[10px]">·</span>
                  <span className="text-[11px] tabular-nums text-muted-foreground/40">
                    {date}
                  </span>
                </div>
                <ArrowUpRight className="size-3.5 text-muted-foreground/30 group-hover:text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
              </div>
              <h2 className="text-[15px] font-medium text-foreground leading-snug mb-1.5">
                {title}
              </h2>
              <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
                {description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-10">
        <p className="text-[12px] text-muted-foreground/40 leading-relaxed">
          Fragen zu unseren rechtlichen Dokumenten?{" "}
          <a href="mailto:legal@hostpartners.com" className="text-muted-foreground/60 underline underline-offset-4 hover:text-foreground transition-colors">
            legal@hostpartners.com
          </a>
        </p>
      </div>
    </div>
  )
}

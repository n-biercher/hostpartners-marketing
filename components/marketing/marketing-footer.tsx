import Link from "next/link"

const FOOTER_COLS = [
  {
    heading: "Produkte",
    links: [
      { label: "Persona",  href: "/produkte/persona" },
      { label: "Atlas",    href: "/produkte/atlas" },
      { label: "Academy",  href: "/produkte/academy" },
      { label: "Flow",     href: "/produkte/flow" },
      { label: "Tempo",    href: "/produkte/tempo" },
      { label: "Roster",   href: "/produkte/roster" },
      { label: "Pulse",    href: "/produkte/pulse" },
      { label: "Lumen",    href: "/produkte/lumen" },
    ],
  },
  {
    heading: "Industrien",
    links: [
      { label: "Hotellerie",  href: "/industrien/hotellerie" },
      { label: "Gastronomie", href: "/industrien/gastronomie" },
      { label: "Industrie",   href: "/industrien/industrie" },
    ],
  },
  {
    heading: "Unternehmen",
    links: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Karriere", href: "#" },
      { label: "Presse",   href: "#" },
      { label: "Kontakt",  href: "/kontakt" },
    ],
  },
  {
    heading: "Rechtliches",
    links: [
      { label: "AGB",                href: "/legal/agb" },
      { label: "Datenschutz",        href: "/legal/privacy" },
      { label: "Impressum",          href: "/legal/impressum" },
      { label: "legal@hostpartners.com", href: "mailto:legal@hostpartners.com" },
    ],
  },
]

export function MarketingFooter() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-screen-xl px-5 sm:px-8 pt-16 pb-10">

        {/* Top: Brand + columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] mb-14">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-[15px] font-semibold tracking-tight text-foreground">Hostpartners</span>
            </Link>
            <p className="max-w-[20rem] text-[12.5px] leading-relaxed text-muted-foreground/60">
              Die modulare HR-Plattform für Hotellerie, Gastronomie und Industrie.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.heading}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/30 mb-4">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[12.5px] text-muted-foreground/60 hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t border-border">
          <p className="text-[11px] text-muted-foreground/30">
            © {new Date().getFullYear()} Hostpartners GmbH · Berlin, Deutschland
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/legal/privacy"   className="text-[11px] text-muted-foreground/30 hover:text-muted-foreground transition-colors">Datenschutz</Link>
            <Link href="/legal/agb"       className="text-[11px] text-muted-foreground/30 hover:text-muted-foreground transition-colors">AGB</Link>
            <Link href="/legal/impressum" className="text-[11px] text-muted-foreground/30 hover:text-muted-foreground transition-colors">Impressum</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

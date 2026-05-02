import Link from "next/link"

const LEGAL_NAV = [
  { href: "/legal/agb",       label: "AGB" },
  { href: "/legal/privacy",   label: "Datenschutz" },
  { href: "/legal/impressum", label: "Impressum" },
]

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background" id="top">
      {/* ── Navigation bar ── */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-11 max-w-screen-lg items-center justify-between gap-6 px-5 sm:px-8">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="h-6 w-6 rounded bg-white overflow-hidden shrink-0 group-hover:opacity-75 transition-opacity">
              <img src="/icon.png" alt="Hostpartners" className="w-full h-full object-contain" />
            </div>
            <span className="text-[13px] font-semibold tracking-tight text-foreground">Hostpartners</span>
          </Link>

          {/* Page links */}
          <nav className="flex items-center gap-1" aria-label="Rechtliche Dokumente">
            <Link
              href="/legal"
              className="h-6 px-2 rounded text-[11.5px] text-muted-foreground/60 hover:text-foreground hover:bg-muted/60 transition-colors inline-flex items-center"
            >
              Übersicht
            </Link>
            <span className="text-border/60 text-[11px] select-none">·</span>
            {LEGAL_NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="h-6 px-2 rounded text-[11.5px] text-muted-foreground/60 hover:text-foreground hover:bg-muted/60 transition-colors inline-flex items-center"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {children}
    </div>
  )
}

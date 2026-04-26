"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TocSection { id: string; title: string }

interface LegalTocProps {
  sections: TocSection[]
}

export function LegalToc({ sections }: LegalTocProps) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "")

  useEffect(() => {
    const targets = sections
      .map(s => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length === 0) return
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        )
        setActive(topmost.target.id)
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 }
    )

    targets.forEach(t => observer.observe(t))
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav aria-label="Inhaltsverzeichnis">
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/40 px-1">
        Inhalt
      </p>
      <ul className="space-y-px">
        {sections.map((s, i) => {
          const isActive = active === s.id
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={e => {
                  e.preventDefault()
                  document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
                  setActive(s.id)
                }}
                className={cn(
                  "group flex items-center gap-3 py-1.5 px-3 rounded-md",
                  "transition-all duration-150 text-[12.5px] leading-snug",
                  isActive
                    ? "bg-foreground/5 text-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <span className={cn(
                  "font-mono text-[10px] tabular-nums transition-colors shrink-0 w-5 text-right",
                  isActive ? "text-foreground/40" : "text-muted-foreground/30 group-hover:text-muted-foreground/50"
                )}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="truncate">{s.title.replace(/^\d+\.\s*/, "")}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

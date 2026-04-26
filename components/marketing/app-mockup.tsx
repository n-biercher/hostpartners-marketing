import { cn } from "@/lib/utils"

// ─── Generic skeleton helpers ──────────────────────────────────────────────────

function Bar({ w, h = "h-2", muted = false }: { w: string; h?: string; muted?: boolean }) {
  return <div className={cn(h, w, "rounded-full", muted ? "bg-border/60" : "bg-border")} />
}
function Circle({ size = "size-6", color = "bg-muted" }: { size?: string; color?: string }) {
  return <div className={cn(size, "rounded-full", color)} />
}
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-lg border border-border bg-background p-3", className)}>
      {children}
    </div>
  )
}

// ─── Per-app mockups ───────────────────────────────────────────────────────────

function PersonaMockup() {
  const people = [
    { color: "bg-slate-500",   name: 66, dept: 80 },
    { color: "bg-emerald-500", name: 52, dept: 68 },
    { color: "bg-blue-500",    name: 74, dept: 58 },
    { color: "bg-violet-500",  name: 48, dept: 76 },
  ]
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <Bar w="w-24" h="h-2.5" />
        <div className="ml-auto">
          <div className="h-6 w-16 rounded bg-foreground/10 border border-border" />
        </div>
      </div>
      {people.map((p, i) => (
        <Card key={i} className="flex items-center gap-3">
          <Circle size="size-7" color={p.color} />
          <div className="flex-1 space-y-1">
            <div className={cn("h-2 rounded-full bg-border", `w-[${p.name}%]`)} style={{ width: `${p.name}%` }} />
            <div className={cn("h-1.5 rounded-full bg-border/60", `w-[${p.dept}%]`)} style={{ width: `${p.dept}%` }} />
          </div>
          <div className="h-5 w-12 rounded border border-border bg-muted/30" />
        </Card>
      ))}
    </div>
  )
}

function RosterMockup() {
  const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
  const rows = [
    [1,1,0,1,1,0,0],
    [0,1,1,1,0,1,0],
    [1,0,1,0,1,1,1],
    [1,1,1,0,0,0,1],
  ]
  const colors = ["bg-blue-500", "bg-emerald-500", "bg-rose-500", "bg-amber-500"]
  return (
    <div>
      <div className="grid grid-cols-8 gap-1 mb-2">
        <div className="h-5" />
        {days.map(d => (
          <div key={d} className="text-[8px] font-mono text-center text-muted-foreground/60">{d}</div>
        ))}
      </div>
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-8 gap-1 mb-1.5">
          <Circle size="size-5" color={colors[i]} />
          {row.map((active, j) => (
            <div
              key={j}
              className={cn(
                "h-5 rounded text-[7px] flex items-center justify-center font-mono",
                active
                  ? cn(colors[i], "text-white")
                  : "bg-border/30"
              )}
            >
              {active ? "F" : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function AcademyMockup() {
  const courses = [
    { color: "bg-blue-500",    progress: 100, label: "HACCP" },
    { color: "bg-emerald-500", progress: 75,  label: "Brandschutz" },
    { color: "bg-violet-500",  progress: 40,  label: "Ersthelfer" },
    { color: "bg-orange-500",  progress: 0,   label: "Service" },
  ]
  return (
    <div className="space-y-2.5">
      {courses.map(c => (
        <Card key={c.label} className="flex items-center gap-3">
          <div className={cn("size-7 rounded-lg flex items-center justify-center text-white text-[8px] font-bold shrink-0", c.color)}>
            {c.label[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <Bar w="w-20" h="h-2" />
              <span className="text-[9px] font-mono text-muted-foreground">{c.progress}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
              <div className={cn("h-full rounded-full transition-all", c.color)} style={{ width: `${c.progress}%` }} />
            </div>
          </div>
          {c.progress === 100 && (
            <div className="size-5 rounded-full bg-emerald-500 flex items-center justify-center">
              <span className="text-white text-[8px]">✓</span>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

function FlowMockup() {
  const steps = [
    { done: true,  label: "Profil anlegen",    icon: "✓" },
    { done: true,  label: "Vertrag prüfen",    icon: "✓" },
    { done: false, label: "IT-Zugang",          icon: "3" },
    { done: false, label: "Schulung: HACCP",   icon: "4" },
    { done: false, label: "Einweisung Küche",  icon: "5" },
  ]
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <Bar w="w-28" h="h-2.5" />
        <div className="ml-auto h-5 w-12 rounded bg-blue-500/20 border border-blue-500/30" />
      </div>
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <div className={cn(
            "size-5 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0",
            s.done ? "bg-emerald-500 text-white" : "bg-border text-muted-foreground"
          )}>
            {s.icon}
          </div>
          <Bar w="flex-1" h="h-2" muted={!s.done} />
        </div>
      ))}
    </div>
  )
}

function TempoMockup() {
  const days = [
    { label: "Mo", h: 8.5 }, { label: "Di", h: 9 },
    { label: "Mi", h: 7.5 }, { label: "Do", h: 8 },
    { label: "Fr", h: 6 },   { label: "Sa", h: 0 }, { label: "So", h: 0 },
  ]
  const max = 10
  return (
    <div>
      <div className="flex items-end gap-1.5 h-20 mb-1">
        {days.map(d => (
          <div key={d.label} className="flex-1 flex flex-col items-center justify-end gap-1">
            <div
              className={cn("w-full rounded-t-sm transition-all", d.h > 0 ? "bg-orange-500" : "bg-border/30")}
              style={{ height: `${(d.h / max) * 80}px` }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        {days.map(d => (
          <div key={d.label} className="flex-1 text-center text-[7px] font-mono text-muted-foreground/60">{d.label}</div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { label: "Std.",  value: "39.0" },
          { label: "Urlaub", value: "18" },
          { label: "Über",  value: "+2.5" },
        ].map(s => (
          <div key={s.label} className="rounded border border-border p-2 text-center">
            <div className="text-[11px] font-semibold text-foreground">{s.value}</div>
            <div className="text-[8px] text-muted-foreground/60">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PulseMockup() {
  return (
    <div className="space-y-2">
      <Card className="space-y-2">
        <Bar w="w-32" h="h-2.5" />
        <div className="flex gap-1">
          {[80, 60, 90, 70, 85].map((v, i) => (
            <div key={i} className="flex-1 rounded bg-amber-500/20 border border-amber-500/30" style={{ height: `${v * 0.4}px` }} />
          ))}
        </div>
      </Card>
      {[
        { label: 78, bar: "w-[78%]", color: "bg-amber-500" },
        { label: 92, bar: "w-[92%]", color: "bg-emerald-500" },
        { label: 61, bar: "w-[61%]", color: "bg-blue-500" },
      ].map((r, i) => (
        <Card key={i} className="flex items-center gap-2">
          <Circle size="size-5" color={r.color} />
          <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
            <div className={cn("h-full rounded-full", r.color, r.bar)} />
          </div>
          <span className="text-[9px] font-mono text-muted-foreground">{r.label}%</span>
        </Card>
      ))}
    </div>
  )
}

function LumenMockup() {
  return (
    <div className="space-y-2">
      <Card className="bg-muted/30">
        <div className="flex gap-2 items-start">
          <div className="size-5 rounded-full bg-indigo-500 shrink-0 mt-0.5" />
          <div className="space-y-1 flex-1">
            <Bar w="w-full" />
            <Bar w="w-4/5" muted />
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex gap-2 items-start">
          <div className="size-5 rounded-full bg-muted border border-border shrink-0 mt-0.5" />
          <div className="space-y-1 flex-1">
            <Bar w="w-full" muted />
            <Bar w="w-3/4" muted />
          </div>
        </div>
      </Card>
      <Card className="bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800">
        <div className="flex gap-2 items-start">
          <div className="size-5 rounded-full bg-indigo-500 shrink-0 mt-0.5" />
          <div className="space-y-1 flex-1">
            <Bar w="w-full" />
            <Bar w="w-5/6" />
            <Bar w="w-2/3" muted />
            <div className="flex gap-1 mt-2">
              <div className="h-4 w-16 rounded bg-indigo-500/20 border border-indigo-400/30 text-[7px] flex items-center justify-center text-indigo-600 font-mono">§ Quelle</div>
            </div>
          </div>
        </div>
      </Card>
      <div className="h-7 rounded-lg border border-border bg-muted/30 flex items-center px-2.5 gap-2">
        <Bar w="w-24" muted />
        <div className="ml-auto size-4 rounded-full bg-indigo-500" />
      </div>
    </div>
  )
}

function AtlasMockup() {
  return (
    <div className="flex gap-2">
      <div className="w-24 shrink-0 space-y-1">
        {["Allgemein", "Küche", "Service", "Personal"].map((f, i) => (
          <div key={f} className={cn(
            "h-6 rounded px-2 flex items-center text-[8px]",
            i === 0 ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400" : "text-muted-foreground"
          )}>
            {f}
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-2">
        <Bar w="w-3/4" h="h-3" />
        <Bar w="w-full" muted />
        <Bar w="w-5/6" muted />
        <Bar w="w-full" muted />
        <Bar w="w-4/5" muted />
        <div className="mt-2 p-2 rounded bg-muted/40 border border-border space-y-1">
          <Bar w="w-full" muted />
          <Bar w="w-3/4" muted />
        </div>
      </div>
    </div>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────────

const MOCKUP_MAP: Record<string, React.ComponentType> = {
  persona:     PersonaMockup,
  roster:      RosterMockup,
  academy:     AcademyMockup,
  flow:        FlowMockup,
  tempo:       TempoMockup,
  pulse:       PulseMockup,
  lumen:       LumenMockup,
  atlas:       AtlasMockup,
}

interface AppMockupProps {
  slug:      string
  color:     string
  className?: string
}

export function AppMockup({ slug, color, className }: AppMockupProps) {
  const Mockup = MOCKUP_MAP[slug]
  if (!Mockup) return null

  return (
    <div className={cn(
      "relative rounded-2xl border border-border bg-background shadow-md overflow-hidden",
      className
    )}>
      {/* Colored top bar */}
      <div className={cn("h-1 w-full", color)} />

      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border">
        <div className="size-2 rounded-full bg-border" />
        <div className="size-2 rounded-full bg-border" />
        <div className="size-2 rounded-full bg-border" />
        <div className="mx-2 flex-1 h-4 rounded bg-muted/40 border border-border max-w-[120px]" />
      </div>

      {/* App content */}
      <div className="p-4">
        <Mockup />
      </div>
    </div>
  )
}

import {
  Building2, ChefHat, Factory, type LucideIcon,
  CalendarDays, GraduationCap, GitBranch, Clock,
  Users, TrendingUp, BookOpen, Sparkles,
} from "lucide-react"

export interface IndustryChallenge { problem: string; solution: string }
export interface IndustryStat     { value: string; label: string }
export interface IndustryStep     { number: string; title: string; body: string }

export interface IndustryApp {
  name:  string
  slug:  string
  desc:  string
  icon:  LucideIcon
  color: string
  tag:   string
}

export interface IndustryData {
  slug:        string
  name:        string
  tagline:     string
  heroHeadline: string[]   // multiline, last line will be italic
  heroSub:     string
  seoTitle:    string
  seoDesc:     string
  keywords:    string[]
  accentColor: string     // Tailwind bg
  icon:        LucideIcon
  stats:       IndustryStat[]
  challenges:  IndustryChallenge[]
  apps:        IndustryApp[]
  steps:       IndustryStep[]
  trustPoints: { title: string; body: string; icon: LucideIcon }[]
  quote?:      { text: string; author: string; role: string }
  otherIndustries: { slug: string; name: string }[]
}

export const INDUSTRIES: Record<string, IndustryData> = {

  hotellerie: {
    slug:        "hotellerie",
    name:        "Hotellerie",
    tagline:     "HR für Hotels, Resorts & Pensionen",
    heroHeadline: ["Von der Rezeption", "bis zum Housekeeping —", "alles im Griff."],
    heroSub:     "Hostpartners wurde mit Hoteliers entwickelt — für die konkrete Realität aus Saisonkräften, Schichtbetrieb und Pflichtschulungen.",
    seoTitle:    "HR Software für Hotellerie — Schichtplanung, Onboarding & Schulungen",
    seoDesc:     "Hostpartners für Hotels: Digitale Schichtplanung, HACCP-Schulungen, saisonales Onboarding und DSGVO-konforme Personalverwaltung für Hotels, Resorts und Pensionen.",
    keywords:    ["HR Software Hotel", "Schichtplanung Hotel", "HACCP Schulung Hotel", "Hotellerie Personal", "Hotel HR Tool"],
    accentColor: "bg-blue-600",
    icon:        Building2,
    stats: [
      { value: "–60%", label: "Onboarding-Aufwand" },
      { value: "100%", label: "HACCP-Nachweise digital" },
      { value: "< 5 Min", label: "für neue Schichtpläne" },
    ],
    challenges: [
      { problem: "Saisonale Fluktuation",         solution: "Flow standardisiert das Onboarding — neue Kräfte sind in der Hälfte der Zeit einsatzbereit." },
      { problem: "Schichtplanung über Abteilungen", solution: "Roster koordiniert Housekeeping, Rezeption und F&B in einem System — statt drei Excel-Tabellen." },
      { problem: "Pflichtschulungen & Nachweise",  solution: "Academy dokumentiert HACCP, Brandschutz und Ersthilfe lückenlos — auditierbar auf Knopfdruck." },
      { problem: "Arbeitszeitgesetz-Compliance",   solution: "Tempo prüft Ruhezeiten und Überstunden automatisch beim Stempeln — Verstöße werden sofort angezeigt." },
    ],
    apps: [
      { name: "Persona",  slug: "persona", desc: "Stammdaten für alle Mitarbeitenden — von der Rezeption bis zur Küche.",            icon: Users,         color: "bg-slate-700",   tag: "Basis" },
      { name: "Roster",   slug: "roster",  desc: "Schichtplanung für Früh-/Spätdienst, Wochenenddienste und Saisonspitzen.",         icon: CalendarDays,  color: "bg-rose-600",    tag: "Schichten" },
      { name: "Academy",  slug: "academy", desc: "HACCP, Brandschutz und Sicherheitsunterweisungen — digital und nachweisbar.",     icon: GraduationCap, color: "bg-blue-600",    tag: "Compliance" },
      { name: "Flow",     slug: "flow",    desc: "Strukturiertes Onboarding für Saisonkräfte mit Checklisten und Aufgaben-Routing.", icon: GitBranch,     color: "bg-violet-600",  tag: "Onboarding" },
      { name: "Tempo",    slug: "tempo",   desc: "Digitale Zeiterfassung inkl. ArbZG-Prüfung für Vollzeit, Teilzeit und Aushilfen.", icon: Clock,         color: "bg-orange-500",  tag: "Zeiterfassung" },
      { name: "Atlas",    slug: "atlas",   desc: "Interne Wissensdatenbank für Hausregeln, SOPs und Dienstanweisungen.",             icon: BookOpen,      color: "bg-emerald-600", tag: "Wissen" },
    ],
    steps: [
      { number: "01", title: "Onboarding starten",    body: "Neue Saisonkraft anlegen — Flow weist automatisch alle Aufgaben zu: Schlüsselausgabe, Einweisung, Schulungen." },
      { number: "02", title: "Schicht planen",        body: "Roster erstellt den Wochendienstplan — mit Verfügbarkeiten, Wünschen und automatischer ArbZG-Prüfung." },
      { number: "03", title: "Schulung nachweisen",   body: "Academy dokumentiert alle Pflichtschulungen. Zertifikate landen automatisch in der digitalen Personalakte." },
      { number: "04", title: "Zeit abrechnen",        body: "Tempo exportiert Monatsberichte für die Lohnbuchhaltung — in wenigen Minuten statt Stunden." },
    ],
    trustPoints: [
      { title: "DSGVO & Compliance",     body: "Alle Schulungsnachweise, Zeitaufzeichnungen und Personalakten DSGVO-konform in Frankfurt gespeichert.", icon: Users },
      { title: "Sofort einsatzbereit",   body: "Hotel-spezifische Onboarding-Templates, HACCP-Kurse und Schichtvorlagen sind ab Tag 1 verfügbar.",      icon: GraduationCap },
      { title: "Skaliert mit dir",       body: "Ob 15 oder 500 Mitarbeitende — Hostpartners wächst mit deinem Hotel. Saisonal flexibel buchbar.",            icon: TrendingUp },
    ],
    quote: {
      text:   "Mit Roster haben wir unsere Dienstplanung von 4 Stunden pro Woche auf unter 30 Minuten reduziert. Das Team ist zufriedener, weil Schichtwünsche endlich strukturiert erfasst werden.",
      author: "General Manager",
      role:   "4-Sterne-Hotel, 120 Mitarbeitende",
    },
    otherIndustries: [
      { slug: "gastronomie", name: "Gastronomie" },
      { slug: "industrie",   name: "Industrie" },
    ],
  },

  gastronomie: {
    slug:        "gastronomie",
    name:        "Gastronomie",
    tagline:     "HR für Restaurants, Cafés & Catering",
    heroHeadline: ["Vom Service", "bis zur Küche —", "HR ohne Chaos."],
    heroSub:     "Hostpartners unterstützt Restaurants, Cafés und Cateringunternehmen beim täglichen Personalmanagement — von der Schichtplanung bis zur Hygieneunterweisung.",
    seoTitle:    "HR Software für Gastronomie — Dienstplan, HACCP & Onboarding",
    seoDesc:     "Hostpartners für Restaurants: Digitaler Dienstplan, HACCP-Schulungen, schnelles Onboarding bei hoher Fluktuation und DSGVO-konforme Zeiterfassung für die Gastronomie.",
    keywords:    ["HR Software Restaurant", "Dienstplan Restaurant", "HACCP Schulung Gastronomie", "Gastronomie Personal", "Restaurant HR Tool"],
    accentColor: "bg-orange-500",
    icon:        ChefHat,
    stats: [
      { value: "–50%", label: "Einarbeitungszeit" },
      { value: "∞",    label: "Schichttausch digital" },
      { value: "0",    label: "Papier-Stundenzettel" },
    ],
    challenges: [
      { problem: "Hohe Fluktuation",              solution: "Flow standardisiert das Onboarding — neue Kräfte werden schnell und konsistent eingearbeitet." },
      { problem: "Hygiene- & Pflichtschulungen",   solution: "Academy dokumentiert HACCP, Allergenkunde und Ersthelfer lückenlos — inkl. automatischer Ablaufwarnungen." },
      { problem: "Spontane Dienstplanänderungen",  solution: "Roster ermöglicht Schichttausch und kurzfristige Verfügbarkeitsanfragen direkt im Tool." },
      { problem: "Unklare Arbeitszeitnachweise",   solution: "Tempo erfasst Arbeitszeiten digital — inkl. Pausenzeiten, Zuschlagsberechnung und Exportfunktion." },
    ],
    apps: [
      { name: "Persona",  slug: "persona", desc: "Alle Personaldaten zentral — für Service, Küche, Bar und Reinigung.",                icon: Users,         color: "bg-slate-700",   tag: "Basis" },
      { name: "Roster",   slug: "roster",  desc: "Wochendienstplan mit Verfügbarkeiten, Wünschen und Schichttauschbörse.",              icon: CalendarDays,  color: "bg-rose-600",    tag: "Dienstplan" },
      { name: "Academy",  slug: "academy", desc: "HACCP, Hygieneunterweisung, Allergenkunde — digital, mit automatischer Ablauferinnerung.", icon: GraduationCap, color: "bg-blue-600", tag: "Compliance" },
      { name: "Tempo",    slug: "tempo",   desc: "Stempeluhr für alle — inkl. automatischer Pausenberechnung und Zuschlagsermittlung.", icon: Clock,         color: "bg-orange-500",  tag: "Zeiterfassung" },
      { name: "Atlas",    slug: "atlas",   desc: "Interne Wissensdatenbank für Rezepte, Abläufe und Betriebsstandards.",                icon: BookOpen,      color: "bg-emerald-600", tag: "Wissen" },
      { name: "Flow",     slug: "flow",    desc: "Schnelles Onboarding für neue Servicekräfte mit Checklisten und automatischem Aufgaben-Routing.", icon: GitBranch, color: "bg-violet-600", tag: "Onboarding" },
    ],
    steps: [
      { number: "01", title: "Neue Kraft einarbeiten", body: "Flow erstellt automatisch die Onboarding-Checkliste — Hygieneschulung, Einweisung Küche, Kassensystem, Hausregeln." },
      { number: "02", title: "Dienstplan erstellen",   body: "Roster plant den Wochendienstplan in Minuten — Verfügbarkeiten und Wünsche sind bereits hinterlegt." },
      { number: "03", title: "Zeit erfassen",          body: "Mitarbeitende stempeln per Browser oder Kiosk. Pausen und Zuschläge werden automatisch berechnet." },
      { number: "04", title: "Schulungen nachweisen",  body: "HACCP und Hygieneschulungen sind jederzeit auditierbar — die Lebensmittelkontrolle wird entspannt." },
    ],
    trustPoints: [
      { title: "Fluktuation managen",    body: "Standardisiertes Onboarding macht auch hohe Fluktuation beherrschbar — neue Kräfte sind schneller produktiv.", icon: Users },
      { title: "Rechtssicher",           body: "Alle Schulungsnachweise, Zeitaufzeichnungen und Stundenzettel DSGVO-konform und revisionssicher gespeichert.", icon: GraduationCap },
      { title: "Keine langen Bindungen", body: "Monatlich kündbar. Saisonal anpassen — im Winter weniger, im Sommer mehr Lizenzen. Ohne Vertragsstress.",      icon: TrendingUp },
    ],
    quote: {
      text:   "Endlich kein Excel-Dienstplan mehr. Roster hat nicht nur Zeit gespart — unser Team ist zufriedener, weil Schichtwünsche jetzt ernst genommen und strukturiert erfasst werden.",
      author: "Inhaberin",
      role:   "Café & Catering, 35 Mitarbeitende",
    },
    otherIndustries: [
      { slug: "hotellerie", name: "Hotellerie" },
      { slug: "industrie",  name: "Industrie" },
    ],
  },

  industrie: {
    slug:        "industrie",
    name:        "Industrie",
    tagline:     "HR für Produktion, Fertigung & Logistik",
    heroHeadline: ["Schicht für Schicht —", "effizienter arbeiten,", "besser führen."],
    heroSub:     "Hostpartners unterstützt Industrieunternehmen bei Wechselschicht, Homeoffice-Verwaltung, Sicherheitsunterweisungen und strukturierten Performance-Reviews.",
    seoTitle:    "HR Software für Industrie & Produktion — Zeiterfassung, Schichten & Unterweisungen",
    seoDesc:     "Hostpartners für Industrie: Wechselschicht-Verwaltung, digitale Sicherheitsunterweisungen, Homeoffice-Anträge und Performance-Reviews für Produktionsunternehmen.",
    keywords:    ["HR Software Industrie", "Schichtplanung Produktion", "Zeiterfassung Industrie", "Sicherheitsunterweisung digital", "HR Fertigung"],
    accentColor: "bg-slate-700",
    icon:        Factory,
    stats: [
      { value: "3-Schicht", label: "problemlos verwaltet" },
      { value: "100%",      label: "Unterweisungen digital" },
      { value: "∞",         label: "Standorte" },
    ],
    challenges: [
      { problem: "Wechselschicht-Verwaltung",    solution: "Tempo unterstützt alle Schichtmodelle — 3-Schicht, Wechselschicht und Gleitzeit mit ArbZG-Prüfung." },
      { problem: "Homeoffice & hybride Teams",    solution: "Flow digitalisiert Homeoffice-Anträge und Genehmigungsprozesse vollständig — ohne E-Mail-Chaos." },
      { problem: "Sicherheitsunterweisungen",     solution: "Academy dokumentiert Unterweisungen, Maschineneinweisungen und Zertifizierungen lückenlos und auditierbar." },
      { problem: "Dezentrale Standorte",          solution: "Hostpartners funktioniert standortübergreifend — ein System für alle Werke, Rollen und Teams." },
    ],
    apps: [
      { name: "Persona",  slug: "persona",     desc: "Vollständige Personalakte für Produktionsmitarbeitende, Teamleiter und Verwaltung.",         icon: Users,         color: "bg-slate-700",   tag: "Basis" },
      { name: "Tempo",    slug: "tempo",       desc: "Wechselschicht, Frühschicht, Spätschicht — Zeiterfassung für jedes Schichtmodell.",          icon: Clock,         color: "bg-orange-500",  tag: "Schicht & Zeit" },
      { name: "Flow",     slug: "flow",        desc: "Homeoffice-Anträge, Urlaubsprozesse und Onboarding für neue Mitarbeitende digital abbilden.", icon: GitBranch,     color: "bg-violet-600",  tag: "Prozesse" },
      { name: "Pulse",    slug: "pulse",       desc: "Jahresgespräche, OKR-Zyklen und 1:1-Meetings — strukturiert und dokumentiert.",              icon: TrendingUp,    color: "bg-amber-500",   tag: "Performance" },
      { name: "Atlas",    slug: "atlas",       desc: "Betriebshandbücher, Arbeitsanweisungen und Prozessdokumentation — immer aktuell.",           icon: BookOpen,      color: "bg-emerald-600", tag: "Wissen" },
      { name: "Academy",  slug: "academy",     desc: "Sicherheitsunterweisungen, Maschinenschulungen und Pflichtfortbildungen — nachweisbar.",     icon: GraduationCap, color: "bg-blue-600",    tag: "Schulungen" },
    ],
    steps: [
      { number: "01", title: "Schichten verwalten",    body: "Tempo erfasst alle Schichtmodelle — Früh, Spät, Nacht, Wechselschicht — mit automatischer ArbZG-Prüfung." },
      { number: "02", title: "Prozesse digitalisieren", body: "Flow automatisiert Homeoffice-Anträge, Urlaubsworkflows und Onboarding — standortübergreifend." },
      { number: "03", title: "Wissen sichern",          body: "Atlas hält Betriebshandbücher und SOPs aktuell — Lumen macht sie per KI-Suche sofort auffindbar." },
      { number: "04", title: "Performance entwickeln",  body: "Pulse strukturiert Jahresgespräche und OKR-Zyklen — vom Schichtleiter bis zur Geschäftsführung." },
    ],
    trustPoints: [
      { title: "Compliance-ready",       body: "ArbZG, DSGVO, Betriebsrat-Anforderungen — Hostpartners ist auf die rechtlichen Anforderungen der Industrie vorbereitet.", icon: Users },
      { title: "Standortübergreifend",   body: "Mehrere Werke, ein System. Zentrale Verwaltung mit standortspezifischen Rollen und Sichtbarkeiten.",               icon: GraduationCap },
      { title: "Enterprise-Skalierung",  body: "Hostpartners wächst von 50 auf 5.000 Mitarbeitende — ohne Systemwechsel und ohne Datenverlust.",                         icon: TrendingUp },
    ],
    quote: {
      text:   "Wir verwalten drei Standorte mit über 400 Mitarbeitenden in Wechselschicht. Hostpartners hat unsere Zeiterfassung und die jährlichen Unterweisungen endlich in ein System gebracht.",
      author: "HR-Leitung",
      role:   "Industrieunternehmen, 3 Standorte",
    },
    otherIndustries: [
      { slug: "hotellerie",  name: "Hotellerie" },
      { slug: "gastronomie", name: "Gastronomie" },
    ],
  },
}

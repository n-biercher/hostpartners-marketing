import {
  Users, BookOpen, GraduationCap, GitBranch,
  Clock, CalendarDays, Sparkles,
  type LucideIcon,
  FileText, Search, Shield, Building2,
  Video, Award, CheckSquare, BarChart3,
  ArrowLeftRight, AlarmClock, Sun, Briefcase,
  RefreshCw, Map, Brain,
  UserCheck, FolderOpen, Lock, Eye,
  Layers, Bell, Activity,
  UserPlus, Wallet, Download, Receipt,
  Calculator, PieChart, Banknote, ClipboardList,
} from "lucide-react"

export interface ProductFeature {
  icon:  LucideIcon
  title: string
  body:  string
}

export interface ProductStep {
  number: string
  title:  string
  body:   string
}

export interface ProductQuote {
  text:    string
  author:  string
  role:    string
  company: string
}

export interface ProductData {
  slug:        string
  name:        string
  tagline:     string
  description: string
  seoTitle:    string
  seoDesc:     string
  keywords:    string[]
  color:       string        // Tailwind bg class
  colorHex:    string        // for JSON-LD / OG
  icon:        LucideIcon
  license:     string        // which license key activates this
  features:    ProductFeature[]
  steps:       ProductStep[]
  compatibleWith: string[]   // other app names
  stats: { value: string; label: string }[]
  quote?: ProductQuote
}

export const PRODUCTS: Record<string, ProductData> = {

  persona: {
    slug:        "persona",
    name:        "Persona",
    tagline:     "Das Fundament deines HR-Teams",
    description: "Digitale Personalakten, Organigramm und rollenbasierter Datenzugriff — DSGVO-konform von Anfang an.",
    seoTitle:    "Persona — Digitale Personalverwaltung & HR Core",
    seoDesc:     "Hostpartners Persona: Digitale Personalakte, Organigramm und DSGVO-konformes Stammdatenmanagement für Unternehmen in Hotellerie, Gastronomie und Industrie.",
    keywords:    ["Personalverwaltung Software", "digitale Personalakte", "HR Core", "Organigramm Software", "DSGVO HR"],
    color:       "bg-slate-700",
    colorHex:    "#334155",
    icon:        Users,
    license:     "Immer aktiv — kein Lizenzschlüssel erforderlich",
    stats: [
      { value: "100%", label: "DSGVO-konform" },
      { value: "0",    label: "Papierformulare" },
      { value: "∞",    label: "Personalakten" },
    ],
    features: [
      { icon: FileText,  title: "Digitale Personalakte", body: "Alle Dokumente, Verträge und Zertifikate eines Mitarbeitenden an einem Ort — versioniert, revisionssicher und mit Zugriffsschutz." },
      { icon: Building2, title: "Organigramm",           body: "Visualisiere die Unternehmensstruktur automatisch aus deinen Stammdaten. Abteilungen, Teams und Berichtslinien auf einen Blick." },
      { icon: Lock,      title: "Rollenbasierter Zugriff", body: "Manager sehen nur ihre eigene Reports-Kette — DB-seitig erzwungen durch Row-Level Security. Kein Datenleck durch Frontend-Filter." },
      { icon: Shield,    title: "DSGVO-Compliance",      body: "Löschanträge, Auskunftsersuchen und Datenexporte auf Knopfdruck. Vollständiger Audit-Trail für alle Datenzugriffe." },
      { icon: Search,    title: "Schnelle Suche",         body: "Finde jeden Mitarbeitenden sofort — nach Name, Abteilung, Standort oder Rolle. Auch in großen Teams mit tausenden Profilen." },
      { icon: Eye,       title: "Hierarchische Sichtbarkeit", body: "Die HR-Sichtbarkeit folgt der Unternehmenshierarchie. Teamleiter sehen ihr Team, Bereichsleiter ihren Bereich." },
    ],
    steps: [
      { number: "01", title: "Mitarbeitende anlegen",   body: "Neues Profil erstellen — mit allen relevanten Stammdaten, Kontaktinfos und Vertragsdaten." },
      { number: "02", title: "Dokumente hochladen",     body: "Verträge, Zeugnisse, Zertifikate und Formulare direkt in der digitalen Personalakte speichern." },
      { number: "03", title: "Zugriffsrechte vergeben", body: "Rollen und Berechtigungen zuweisen — wer darf was sehen und bearbeiten." },
    ],
    compatibleWith: ["Atlas", "Academy", "Flow"],
    quote: {
      text:    "Seit wir Persona nutzen, haben wir keine Papierakte mehr angefasst. Der Audit war in einer halben Stunde erledigt — früher haben wir dafür Tage gebraucht.",
      author:  "Sandra K.",
      role:    "HR-Leiterin",
      company: "Berghotel Zugspitz, 120 MA",
    },
  },

  atlas: {
    slug:        "atlas",
    name:        "Atlas",
    tagline:     "Das Wissen deines Unternehmens — immer griffbereit",
    description: "Wissensdatenbank, Artikeleditor und Volltextsuche. Von der Hausordnung bis zur Verfahrensanweisung — alles an einem Ort.",
    seoTitle:    "Atlas — Unternehmens-Wissensdatenbank für Hotellerie & Industrie",
    seoDesc:     "Hostpartners Atlas: Interne Wissensdatenbank mit Rich-Text-Editor, Ordnerstruktur, Versionierung und KI-Suche. Für Hotels, Restaurants und Industrieunternehmen.",
    keywords:    ["Wissensdatenbank Software", "internes Wiki", "Unternehmens-Wiki", "Knowledge Base", "Wissensmanagement"],
    color:       "bg-emerald-600",
    colorHex:    "#059669",
    icon:        BookOpen,
    license:     "Basic-Lizenz",
    stats: [
      { value: "∞",   label: "Artikel & Seiten" },
      { value: "100%", label: "durchsuchbar" },
      { value: "v3",   label: "Versionsverlauf" },
    ],
    features: [
      { icon: FileText,   title: "Rich-Text-Editor",      body: "Tiptap-basierter Editor mit Überschriften, Tabellen, Bildern, Code-Blöcken und eingebetteten Videos. Kein HTML-Wissen nötig." },
      { icon: FolderOpen, title: "Ordner & Kategorien",   body: "Strukturiere dein Wissen in Ordnern, Kategorien und Tags. Intuitive Navigation auch bei hunderten Artikeln." },
      { icon: Search,     title: "Volltextsuche",         body: "Suche über alle Artikel gleichzeitig — mit PostgreSQL Full-Text-Search. Ergebnisse in Millisekunden." },
      { icon: RefreshCw,  title: "Versionsverlauf",       body: "Jede Änderung wird versioniert. Sieh wer was wann geändert hat — und stelle ältere Versionen wieder her." },
      { icon: Sparkles,   title: "KI-Suche mit Lumen",    body: "Mit dem KI-Modul Lumen stellst du deiner Wissensdatenbank natürlichsprachliche Fragen und bekommst sofort Antworten." },
      { icon: Eye,        title: "Zugriffsschutz",        body: "Bestimme, wer welche Artikel sehen darf — auf Kategorieebene oder pro Artikel." },
    ],
    steps: [
      { number: "01", title: "Struktur aufbauen",        body: "Erstelle Ordner und Kategorien, die zu deiner Organisation passen — z.B. nach Abteilung oder Prozess." },
      { number: "02", title: "Wissen dokumentieren",     body: "Schreibe Artikel direkt im Browser — mit formatiertem Text, Bildern und eingebetteten Dateien." },
      { number: "03", title: "Team aktivieren",          body: "Teile Artikel intern, setze Pflichtlektüren fest und behalte über den Lesestatus den Überblick." },
    ],
    compatibleWith: ["Persona", "Academy", "Lumen"],
  },

  academy: {
    slug:        "academy",
    name:        "Academy",
    tagline:     "Schulungen, die wirklich ankommen",
    description: "Eigene Kurse erstellen, Pflichtschulungen zuweisen und Zertifikate ausstellen — digital, nachweisbar und skalierbar.",
    seoTitle:    "Academy — Digitale Schulungen & Mitarbeiterqualifikation",
    seoDesc:     "Hostpartners Academy: Erstelle Onlinekurse mit Video, Quizzes und Lernpfaden. Weise Pflichtschulungen zu und dokumentiere HACCP, Brandschutz und Sicherheitsunterweisungen automatisch.",
    keywords:    ["Schulungssoftware", "E-Learning Plattform", "HACCP Schulung digital", "Pflichtunterweisung Software", "LMS Hotellerie"],
    color:       "bg-blue-600",
    colorHex:    "#2563eb",
    icon:        GraduationCap,
    license:     "Academy-Lizenz (lernen)",
    stats: [
      { value: "3",    label: "Lektionstypen" },
      { value: "100%", label: "auditierbar" },
      { value: "∞",    label: "Zertifikate" },
    ],
    features: [
      { icon: Video,       title: "Video-Lektionen",        body: "Binde eigene Videos oder externe Quellen ein. Der Lernfortschritt wird automatisch gespeichert — auch bei Unterbrechung." },
      { icon: FileText,    title: "Text & Dokumente",       body: "Erstelle Textlektionen mit Rich-Text-Editor. PDFs, Checklisten und Formulare als Anhang." },
      { icon: CheckSquare, title: "Quizzes & Tests",        body: "Überprüfe das Wissen mit Multiple-Choice-Quizzes und verpflichtenden Mindest-Scores für Zertifikatsfreigabe." },
      { icon: Award,       title: "Zertifikate & Nachweise", body: "Automatische Zertifikatserstellung nach Kursabschluss. Zeitlich begrenzte Gültigkeit mit automatischer Ablauferinnerung." },
      { icon: Bell,        title: "Pflichtschulungen",       body: "Weise Kurse ganzen Teams, Abteilungen oder Einzelpersonen als Pflicht zu. Automatische Erinnerungen bei Nichtabschluss." },
      { icon: BarChart3,   title: "Fortschritts-Dashboard", body: "Sieh auf einen Blick, wer welche Kurse abgeschlossen hat — als Manager oder HR-Admin." },
    ],
    steps: [
      { number: "01", title: "Kurs erstellen",     body: "Füge Module und Lektionen hinzu — Video, Text oder Quiz. Reihenfolge per Drag & Drop anpassen." },
      { number: "02", title: "Team zuweisen",      body: "Weise den Kurs als Pflicht zu oder mache ihn freiwillig verfügbar. Startdatum und Deadline festlegen." },
      { number: "03", title: "Nachweise erhalten", body: "Zertifikate werden automatisch ausgestellt und in der Personalakte gespeichert." },
    ],
    compatibleWith: ["Persona", "Atlas", "Flow", "Lumen"],
    quote: {
      text:    "HACCP-Schulungen waren früher eine Logistik-Katastrophe. Mit Academy läuft alles digital — die Nachweise sind immer aktuell und das Gesundheitsamt war begeistert.",
      author:  "Thomas R.",
      role:    "Küchenchef & Betriebsleiter",
      company: "Restaurant Goldener Hirsch, 45 MA",
    },
  },

  flow: {
    slug:        "flow",
    name:        "Flow",
    tagline:     "Onboarding, Offboarding & Anträge ohne Chaos",
    description: "Strukturierte Prozesse für jeden Mitarbeitenden-Lifecycle — von der ersten Checkliste bis zum letzten Übergabegespräch.",
    seoTitle:    "Flow — Onboarding & Offboarding Prozesse digital abbilden",
    seoDesc:     "Hostpartners Flow: Digitales Onboarding und Offboarding mit Checklisten, Aufgaben-Routing und Automatisierungen. Für Hotellerie, Gastronomie und Industrie.",
    keywords:    ["Onboarding Software", "Offboarding Prozess", "HR Workflow", "digitales Onboarding", "Einarbeitung digitalisieren"],
    color:       "bg-violet-600",
    colorHex:    "#7c3aed",
    icon:        GitBranch,
    license:     "Basic-Lizenz",
    stats: [
      { value: "–60%", label: "Einarbeitungszeit" },
      { value: "100%", label: "Aufgaben nachverfolgbar" },
      { value: "∞",    label: "Prozess-Templates" },
    ],
    features: [
      { icon: CheckSquare,  title: "Onboarding-Templates",    body: "Vorgefertigte Checklisten für typische Rollen — Hotel-Rezeptionist, Köchin, Produktionsmitarbeiter. Anpassbar per Drag & Drop." },
      { icon: ArrowLeftRight,title: "Aufgaben-Routing",       body: "Aufgaben gehen automatisch an die richtige Person — IT richtet den Account ein, HR bereitet den Vertrag vor, Teamleiter macht die Einweisung." },
      { icon: Bell,          title: "Automatische Erinnerungen", body: "Niemand vergisst mehr eine Onboarding-Aufgabe. Erinnerungen gehen direkt an die verantwortliche Person." },
      { icon: Map,           title: "Fortschrittsansicht",    body: "Sieh auf einen Blick, wie weit ein neuer Mitarbeitender im Onboarding-Prozess ist — als Zeitleiste oder Kanban." },
      { icon: RefreshCw,     title: "Offboarding",            body: "Strukturierter Abschlussprozess mit Übergabedokumentation, Zugangsentzug und Exit-Interview." },
      { icon: Briefcase,     title: "Antragsprozesse",        body: "Urlaub, Homeoffice, Gehaltsanpassung — alle Anträge mit Genehmigungsworkflow und Statusverfolgung." },
    ],
    steps: [
      { number: "01", title: "Template auswählen", body: "Wähle ein vorbereitetes Onboarding-Template für die Rolle des neuen Mitarbeitenden." },
      { number: "02", title: "Aufgaben verteilen", body: "Flow routet alle Aufgaben automatisch an die richtigen Personen und Abteilungen." },
      { number: "03", title: "Fortschritt verfolgen", body: "Behalte den Überblick — welche Aufgaben sind erledigt, was steht noch aus." },
    ],
    compatibleWith: ["Persona", "Academy", "Tempo"],
  },

  tempo: {
    slug:        "tempo",
    name:        "Tempo",
    tagline:     "Zeiterfassung, die das Arbeitszeitgesetz kennt",
    description: "Digitales Stempeln, Urlaubsverwaltung und Abwesenheitskalender — mit automatischer ArbZG-Prüfung und Überstundenkonto.",
    seoTitle:    "Tempo — Digitale Zeiterfassung & Urlaubsverwaltung",
    seoDesc:     "Hostpartners Tempo: Digitale Zeiterfassung mit ArbZG-Compliance, Urlaubsanträge, Abwesenheitskalender und Überstundenkonto. Für Hotellerie, Gastronomie und Industrie.",
    keywords:    ["Zeiterfassung Software", "digitale Stempeluhr", "Urlaubsverwaltung", "Arbeitszeiterfassung", "ArbZG Software"],
    color:       "bg-orange-500",
    colorHex:    "#f97316",
    icon:        Clock,
    license:     "Tempo-Lizenz",
    stats: [
      { value: "§ ArbZG", label: "automatisch geprüft" },
      { value: "0",       label: "Übertragungsfehler" },
      { value: "∞",       label: "Mitarbeitende" },
    ],
    features: [
      { icon: AlarmClock,  title: "Digitales Stempeln",        body: "Einstempeln per Browser oder Mobile — mit automatischer Pausenberechnung nach ArbZG und Mindestlohngesetz." },
      { icon: Sun,         title: "Urlaubsanträge",            body: "Digitale Urlaubsanfragen mit Genehmigungsworkflow, Resturlaubsanzeige und Teamkalender." },
      { icon: BarChart3,   title: "Überstundenkonto",          body: "Alle Plus- und Minusstunden automatisch berechnet. Ausgleich durch Freizeitentnahme oder Auszahlung dokumentieren." },
      { icon: Shield,      title: "ArbZG-Compliance",          body: "Automatische Prüfung von Ruhezeiten, Höchstarbeitszeiten und Feiertagsregeln — Verstöße werden sofort angezeigt." },
      { icon: Activity,    title: "Abwesenheitskalender",      body: "Alle Abwesenheiten auf einen Blick — Urlaub, Krankheit, Elternzeit. Planungsrelevant für Schicht und Roster." },
      { icon: FileText,    title: "Export & Abrechnung",       body: "Stundenzettel und Monatsnachweise als PDF oder CSV — direkt für die Lohnbuchhaltung aufbereitet." },
    ],
    steps: [
      { number: "01", title: "Stempeln",          body: "Mitarbeitende stempeln per Browser oder Kiosk-Modus — Pausen werden automatisch erkannt." },
      { number: "02", title: "Genehmigen",        body: "Urlaub und Abwesenheiten werden digital beantragt und mit einem Klick genehmigt." },
      { number: "03", title: "Exportieren",       body: "Monatsreport mit einem Klick — als PDF oder CSV für die Lohnbuchhaltung." },
    ],
    compatibleWith: ["Persona", "Roster", "Flow"],
  },

  roster: {
    slug:        "roster",
    name:        "Roster",
    tagline:     "Schichtplanung ohne Excel-Chaos",
    description: "Wochendienstpläne erstellen, Verfügbarkeiten abfragen und Schichttausch ermöglichen — für Hotellerie, Gastronomie und Schichtbetrieb.",
    seoTitle:    "Roster — Digitale Schichtplanung für Hotellerie & Gastronomie",
    seoDesc:     "Hostpartners Roster: Digitaler Dienstplan mit Verfügbarkeitsmanagement, Schichttauschbörse und automatischer ArbZG-Prüfung. Speziell für Hotel, Restaurant und Schichtbetrieb.",
    keywords:    ["Schichtplanung Software", "Dienstplan digital", "Schichtplan erstellen", "Mitarbeiter Schichten", "Roster Software Hotel"],
    color:       "bg-rose-600",
    colorHex:    "#e11d48",
    icon:        CalendarDays,
    license:     "Roster-Lizenz",
    stats: [
      { value: "–70%", label: "Planungsaufwand" },
      { value: "∞",    label: "Schichtmodelle" },
      { value: "24/7", label: "Verfügbar" },
    ],
    features: [
      { icon: CalendarDays,  title: "Wochendienstplan",       body: "Erstelle Dienstpläne per Drag & Drop — für beliebig viele Abteilungen, Bereiche und Schichtmodelle gleichzeitig." },
      { icon: UserCheck,     title: "Verfügbarkeitsmanagement", body: "Mitarbeitende tragen ihre Verfügbarkeiten ein — Roster plant automatisch rund um Einschränkungen und Wünsche." },
      { icon: ArrowLeftRight,title: "Schichttauschbörse",     body: "Mitarbeitende können Schichten intern tauschen — mit digitaler Genehmigung durch den Teamleiter." },
      { icon: Bell,          title: "Benachrichtigungen",      body: "Neue Dienstpläne, Schichtänderungen und Tauschangebote werden automatisch per In-App-Benachrichtigung kommuniziert." },
      { icon: Shield,        title: "ArbZG-Check",            body: "Automatische Prüfung beim Speichern: Werden Ruhezeiten, Höchststunden und Feiertagsregeln eingehalten?" },
      { icon: Activity,      title: "Sync mit Tempo",         body: "Geplante Schichten fließen direkt in die Zeiterfassung — kein doppeltes Eintragen, keine Abweichungen." },
    ],
    steps: [
      { number: "01", title: "Schichten anlegen",        body: "Definiere deine Schichtmodelle — Frühschicht, Spätschicht, Teildienst. Einmalig, dann immer wieder nutzbar." },
      { number: "02", title: "Team einplanen",           body: "Weise Schichten per Drag & Drop zu oder lass Roster nach Verfügbarkeit vorschlagen." },
      { number: "03", title: "Plan veröffentlichen",     body: "Mit einem Klick sehen alle Mitarbeitenden ihren Dienstplan — im Browser oder auf dem Handy." },
    ],
    compatibleWith: ["Persona", "Tempo", "Flow"],
    quote: {
      text:    "Der Dienstplan-Stress am Montag ist weg. Roster spart uns mindestens 4 Stunden pro Woche — und die Mitarbeitenden können Tauschbörse selbst nutzen.",
      author:  "Julia M.",
      role:    "Teamleiterin Service",
      company: "Catering Südwest GmbH, 80 MA",
    },
  },

  lumen: {
    slug:        "lumen",
    name:        "Lumen",
    tagline:     "KI, die dein Unternehmen wirklich kennt",
    description: "RAG-basierter KI-Assistent über deine Wissensdatenbank und Schulungsunterlagen — keine Halluzinationen, echte Antworten.",
    seoTitle:    "Lumen — KI-Assistent für deine Wissensdatenbank",
    seoDesc:     "Hostpartners Lumen: RAG-basierter KI-Assistent, der Fragen über deine interne Wissensdatenbank, Schulungsunterlagen und Prozessdokumentation beantwortet. Sicher, DSGVO-konform.",
    keywords:    ["KI HR Software", "RAG KI Unternehmens-Wiki", "KI Wissensdatenbank", "AI HR Assistent", "ChatGPT für Unternehmen"],
    color:       "bg-indigo-600",
    colorHex:    "#4f46e5",
    icon:        Sparkles,
    license:     "Lumen-Lizenz (Premium)",
    stats: [
      { value: "< 2s",  label: "Antwortzeit" },
      { value: "100%",  label: "aus deinen Daten" },
      { value: "DSGVO", label: "konform" },
    ],
    features: [
      { icon: Brain,     title: "RAG-Technologie",         body: "Lumen liest nur deine eigenen Dokumente und Artikel — keine externen Quellen, keine Halluzinationen. Antworten mit Quellenangabe." },
      { icon: Search,    title: "Semantische Suche",       body: "Stell Fragen in natürlicher Sprache: 'Was ist unsere Urlaubsregelung für Teilzeitkräfte?' — Lumen findet die Antwort sofort." },
      { icon: Shield,    title: "Zugriffsbasierte Inhalte",body: "Lumen antwortet nur mit Inhalten, auf die der fragende Nutzer auch selbst Zugriff hat. Keine Datenlecks." },
      { icon: BookOpen,  title: "Verknüpft mit Atlas",     body: "Lumen nutzt deine Atlas-Wissensdatenbank als Grundlage — je mehr du dokumentierst, desto besser wird Lumen." },
      { icon: GraduationCap, title: "Kursunterstützung",  body: "Lumen beantwortet Fragen zu Academy-Kursen und hilft beim Wiederholen von Lerninhalten." },
      { icon: Activity,  title: "Streaming-Antworten",     body: "Antworten erscheinen in Echtzeit — dank Vercel AI SDK mit Claude 3 als Backend-Modell." },
    ],
    steps: [
      { number: "01", title: "Wissen befüllen",   body: "Je mehr Atlas-Artikel und Academy-Kurse vorhanden sind, desto besser ist Lumen informiert." },
      { number: "02", title: "Fragen stellen",    body: "Mitarbeitende tippen ihre Frage — Lumen sucht in Echtzeit über alle zugänglichen Dokumente." },
      { number: "03", title: "Antwort erhalten",  body: "Lumen antwortet mit Quellenangabe — transparent, nachvollziehbar und immer aus deinen eigenen Daten." },
    ],
    compatibleWith: ["Atlas", "Academy", "Persona"],
  },

  hire: {
    slug:        "hire",
    name:        "Hire",
    tagline:     "Recruiting, das Talente nicht verliert",
    description: "Von der Stellenausschreibung bis zum ersten Arbeitstag — Bewerbermanagement, Interview-Koordination und nahtlose Übergabe an Flow.",
    seoTitle:    "Hire — Recruiting & Bewerbermanagement Software",
    seoDesc:     "Hostpartners Hire: Digitales Recruiting mit Karriereseite, Bewerbertrichter, Interview-Koordination und automatischer Onboarding-Übergabe. Für Hotellerie, Gastronomie und Industrie.",
    keywords:    ["Recruiting Software", "Bewerbermanagement", "Talent Acquisition", "Stellenausschreibung Software", "ATS Hotel"],
    color:       "bg-sky-600",
    colorHex:    "#0284c7",
    icon:        UserPlus,
    license:     "Hire-Lizenz",
    stats: [
      { value: "–50%", label: "Time-to-Hire" },
      { value: "100%", label: "DSGVO-konform" },
      { value: "∞",    label: "Stellen gleichzeitig" },
    ],
    features: [
      { icon: Building2,    title: "Karriereseite",           body: "Eigene, gebrandete Karriereseite mit allen offenen Stellen — ohne Entwickler, ohne Drittanbieter." },
      { icon: Layers,       title: "Bewerbertrichter",        body: "Pipeline-Ansicht im Kanban-Stil — von der Eingangsmappe bis zum unterzeichneten Angebot." },
      { icon: CalendarDays, title: "Interview-Koordination", body: "Terminvorschläge, Bestätigungen und Absagen direkt im Tool. Keine E-Mail-Eskalation mehr." },
      { icon: FileText,     title: "Digitales Angebot",      body: "Angebot erstellen, versenden, gegenzeichnen — alles ohne PDF-Ping-Pong." },
      { icon: UserCheck,    title: "Talent-Pool",            body: "Vielversprechende Absagen speichern und für künftige Stellen reaktivieren." },
      { icon: GitBranch,    title: "Onboarding-Übergabe",   body: "Einstellung bestätigt → Flow startet automatisch den Onboarding-Prozess. Kein Informationsverlust zwischen Recruiting und HR." },
    ],
    steps: [
      { number: "01", title: "Stelle ausschreiben",    body: "Stelle anlegen, auf der Karriereseite veröffentlichen und optional auf externen Jobboards teilen." },
      { number: "02", title: "Bewerbungen verwalten",  body: "Alle Eingänge in einer Pipeline — priorisieren, kommentieren, Interviews koordinieren." },
      { number: "03", title: "Einstellung bestätigen", body: "Angebot digital versenden, Unterschrift einholen — und Onboarding in Flow startet automatisch." },
    ],
    compatibleWith: ["Flow", "Persona", "Academy"],
    quote: {
      text:    "Wir haben unsere Time-to-Hire von 6 Wochen auf 12 Tage gesenkt. Hire hält alles zusammen — vom ersten Kontakt bis zum ersten Arbeitstag.",
      author:  "Nina S.",
      role:    "People & Culture Lead",
      company: "Brauereigruppe Nord, 340 MA",
    },
  },

  payroll: {
    slug:        "payroll",
    name:        "Payroll",
    tagline:     "Lohnabrechnung ohne Überraschungen",
    description: "Gehaltsabrechnungen, Steuer- und Sozialversicherungsexporte und DATEV-Integration — Monat für Monat fehlerfrei und fristgerecht.",
    seoTitle:    "Payroll — Digitale Lohn- und Gehaltsabrechnung",
    seoDesc:     "Hostpartners Payroll: Automatische Lohnabrechnung mit DATEV-Export, Überstundenberechnung aus Tempo und digitalen Gehaltsetteln. Für Hotellerie, Gastronomie und Industrie.",
    keywords:    ["Lohnabrechnung Software", "Gehaltsabrechnung digital", "DATEV Export HR", "Payroll Software Hotel", "Lohnbuchhaltung"],
    color:       "bg-teal-600",
    colorHex:    "#0d9488",
    icon:        Wallet,
    license:     "Payroll-Lizenz",
    stats: [
      { value: "0",    label: "Fehlabrechnungen" },
      { value: "DATEV", label: "Export-bereit" },
      { value: "∞",    label: "Mitarbeitende" },
    ],
    features: [
      { icon: Calculator,  title: "Gehaltsabrechnung",        body: "Vollständige Lohn- und Gehaltsabrechnung mit automatischer Steuer- und Sozialversicherungsberechnung nach aktuellem Recht." },
      { icon: Download,    title: "DATEV-Export",             body: "Direktexport im DATEV-Format für den Steuerberater — auf Knopfdruck, ohne manuelle Nacharbeit." },
      { icon: Activity,    title: "Überstunden & Zulagen",    body: "Automatische Berechnung aus Tempo-Daten: Mehrarbeit, Nacht-, Feiertags- und Sonntagszuschläge." },
      { icon: Receipt,     title: "Digitale Gehaltszettel",   body: "Gehaltszettel werden automatisch erstellt und direkt in der Personalakte archiviert." },
      { icon: FileText,    title: "Lohnsteuerbescheinigung",  body: "Jährliche Lohnsteuerbescheinigungen auf Knopfdruck — für jeden Mitarbeitenden einzeln oder als Sammelexport." },
      { icon: PieChart,    title: "Personalkosten-Report",    body: "Übersicht der Lohnkosten nach Abteilung, Kostenstelle und Zeitraum — als Grundlage für Budgetplanung." },
    ],
    steps: [
      { number: "01", title: "Daten prüfen",         body: "Stunden, Zulagen und Abwesenheiten aus Tempo werden automatisch übernommen — manuell ergänzen was fehlt." },
      { number: "02", title: "Abrechnung freigeben", body: "Vorschau prüfen, Freigabe erteilen — Payroll berechnet Steuer, SV und Netto automatisch." },
      { number: "03", title: "Exportieren & senden", body: "DATEV-Export für den Steuerberater, Gehaltszettel digital an Mitarbeitende, Archiv in der Personalakte." },
    ],
    compatibleWith: ["Persona", "Tempo", "Flow"],
  },
}

export const PRODUCT_SLUGS = Object.keys(PRODUCTS)

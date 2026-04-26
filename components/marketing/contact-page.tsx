"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MessageSquareText,
  Phone,
} from "lucide-react"

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px 0px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Grain({ opacity = 0.018 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "180px 180px",
      }}
    />
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-muted-foreground/60">
      {children}
    </p>
  )
}

function ContactStage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-14 h-[420px] w-full sm:h-[500px] lg:mt-18 lg:h-[620px]"
      style={{ perspective: "1800px" }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-0 w-[min(100%,52rem)] -translate-x-1/2 rounded-[32px] border border-border/70 bg-card/92 p-3 shadow-[0_28px_100px_rgba(41,25,7,0.10)] backdrop-blur-xl sm:rounded-[40px] sm:p-4"
        style={{ transform: "translateX(-50%) rotateX(8deg) rotateY(-9deg)" }}
      >
        <div className="rounded-[26px] border border-border/70 bg-background/92 p-4 sm:rounded-[32px] sm:p-6">
          <div className="flex items-center justify-between border-b border-border/70 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl border border-border/70 bg-card">
                <MessageSquareText className="size-4 text-foreground/70" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-foreground">Erstgespräch</p>
                <p className="text-[11px] text-muted-foreground">Vertrieb · 30 Minuten · persönliche Einordnung</p>
              </div>
            </div>
            <div className="rounded-full border border-border/70 bg-muted/30 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
              Termin
            </div>
          </div>

          <div className="mt-4 space-y-4 sm:mt-5">
            <div className="rounded-[24px] border border-border/70 bg-card px-4 py-4 sm:px-5 sm:py-5">
              <p className="text-[13px] font-semibold text-foreground">Worum es im Gespräch wirklich geht</p>
              <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                Nicht um eine endlose Produktführung. Sondern um euren Betrieb, eure Reibung und die Frage,
                ob Hostpartners dafür jetzt schon Sinn ergibt.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex-1 rounded-[24px] border border-border/70 bg-card px-4 py-4 sm:px-5 sm:py-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-2xl border border-border/70 bg-background">
                    <CalendarDays className="size-4 text-foreground/70" />
                  </div>
                  <p className="text-[13px] font-semibold text-foreground">Was wir mit euch klären</p>
                </div>
                <div className="space-y-2.5">
                  {["Branche und Taktung", "größter operativer Hebel", "sinnvoller Startpunkt"].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-border/70 bg-background/80 px-4 py-3">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-foreground/75" />
                      <p className="text-[12px] text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full rounded-[24px] border border-border/70 bg-card px-4 py-4 sm:px-5 sm:py-5 lg:max-w-[250px]">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-2xl border border-border/70 bg-background">
                    <Clock3 className="size-4 text-foreground/70" />
                  </div>
                  <p className="text-[13px] font-semibold text-foreground">Ergebnis</p>
                </div>
                <p className="text-[12px] leading-relaxed text-muted-foreground">
                  Nach dem Gespräch soll klarer sein, ob Hostpartners passt und wie ein sinnvoller Einstieg aussehen kann.
                </p>
              </div>
            </div>

            <div className="rounded-[24px] border border-border/70 bg-card px-4 py-4 sm:px-5 sm:py-5">
              <p className="text-[13px] font-semibold text-foreground">Was wir bewusst nicht machen</p>
              <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                Kein künstlicher Zeitdruck, keine Demo ohne Kontext, kein Tunnel in Richtung Abschluss.
                Ein gutes Erstgespräch soll euch helfen, klarer zu sehen, nicht euch nur weiter durch einen Prozess zu schieben.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 11, 0], rotate: [-7, -5, -7] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-[2%] hidden w-[228px] rounded-[28px] border border-border/70 bg-card/92 p-4 shadow-[0_20px_80px_rgba(41,25,7,0.08)] backdrop-blur-xl xl:block"
      >
        <div className="rounded-[22px] border border-border/70 bg-background p-4">
          <div className="mb-4 flex size-10 items-center justify-center rounded-2xl border border-border/70 bg-card">
            <Mail className="size-4 text-foreground/70" />
          </div>
          <p className="text-[15px] font-semibold text-foreground">Mail</p>
          <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
            Wenn ihr schon tiefer in Preisrahmen, Auswahlprozess oder Rollout denkt.
          </p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0], rotate: [7, 5, 7] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 right-[2%] hidden w-[236px] rounded-[28px] border border-border/70 bg-card/92 p-4 shadow-[0_20px_80px_rgba(41,25,7,0.08)] backdrop-blur-xl xl:block"
      >
        <div className="rounded-[22px] border border-border/70 bg-background p-4">
          <div className="mb-4 flex size-10 items-center justify-center rounded-2xl border border-border/70 bg-card">
            <Phone className="size-4 text-foreground/70" />
          </div>
          <p className="text-[15px] font-semibold text-foreground">Direkt sprechen</p>
          <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
            Wenn es schnell gehen soll oder ein Mensch der bessere Anfang ist als ein Formular.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ContactPage() {
  const paths = [
    {
      icon: CalendarDays,
      step: "01",
      title: "Demo buchen",
      body: "Der richtige Weg, wenn du das Produkt live sehen und euren betrieblichen Kontext gemeinsam mit uns sortieren willst.",
      action: "Termin anfragen",
      href: "/login",
    },
    {
      icon: Mail,
      step: "02",
      title: "E-Mail schreiben",
      body: "Sinnvoll, wenn ihr schon tiefer in Auswahlprozess, Preisrahmen oder möglichem Rollout steckt und konkrete Fragen habt.",
      action: "vertrieb@hostpartners.com",
      href: "mailto:vertrieb@hostpartners.com",
    },
    {
      icon: Phone,
      step: "03",
      title: "Direkt sprechen",
      body: "Am besten, wenn es schnell gehen soll oder wenn du lieber sofort mit einem Menschen statt mit einem Formular beginnst.",
      action: "+49 30 5487 1290",
      href: "tel:+493054871290",
    },
  ]

  return (
    <>
      <section className="relative overflow-hidden bg-background pb-24 pt-24 sm:pb-32 sm:pt-28 lg:pb-40 lg:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20 dark:to-muted/10" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.88),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
        <Grain />

        <div className="relative mx-auto max-w-screen-xl px-5 sm:px-8">
          <FadeUp className="max-w-5xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/90 px-4 py-2 backdrop-blur-xl">
              <Mail className="size-3.5 text-foreground/65" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Kontakt Vertrieb
              </span>
            </div>

            <h1 className="max-w-5xl text-balance font-heading text-[46px] font-normal leading-[0.88] tracking-tight text-foreground sm:text-[72px] lg:text-[100px] xl:text-[116px]">
              Lass uns darüber sprechen,
              <br />
              ob Hostpartners
              <br />
              <span className="text-muted-foreground/65">für euch schon jetzt Sinn ergibt.</span>
            </h1>

            <div className="mt-8 max-w-2xl space-y-5 text-[16px] leading-relaxed text-muted-foreground sm:text-[18px]">
              <p>
                Ein Gespräch mit uns soll sich nicht wie Vertrieb anfühlen. Sondern wie eine klare,
                ehrliche Einordnung dessen, was euer Betrieb gerade wirklich braucht.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-7 text-[14px] font-semibold text-background transition-opacity hover:opacity-85"
              >
                Demo buchen <ArrowRight className="size-4" />
              </Link>
              <Link
                href="mailto:vertrieb@hostpartners.com"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border/70 bg-card/90 px-7 text-[14px] font-medium text-foreground/80 transition-colors hover:bg-muted/40"
              >
                vertrieb@hostpartners.com
              </Link>
            </div>
          </FadeUp>

          <ContactStage />
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <FadeUp>
            <Eyebrow>Wie wir an Gespräche herangehen</Eyebrow>
            <h2 className="text-balance font-heading text-[36px] font-normal leading-[0.94] tracking-tight text-foreground sm:text-[54px] lg:text-[68px]">
              Ein guter Kontakt
              <br />
              beginnt nicht mit
              <br />
              <span className="text-muted-foreground/65">einer Produktdemo.</span>
            </h2>
            <div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Oft beginnt er mit einem Gefühl: Das, was heute da ist, greift nicht mehr sauber ineinander.
                Zu viele Systeme. Zu viele Brüche. Zu wenig gemeinsames Bild.
              </p>
              <p>
                Im Gespräch versuchen wir deshalb zuerst zu verstehen, wie euer Alltag wirklich aussieht.
                Erst dann wird klar, ob Hostpartners der richtige nächste Schritt ist.
              </p>
              <p>Und wenn die Antwort noch nicht heute lautet, ist auch das ein gutes Ergebnis.</p>
              <p>
                Für uns ist das keine Nebensache. Gerade der erste Kontakt sollte schon zeigen, wie wir Produkte
                denken: konzentriert, respektvoll und näher an eurer Realität als an einem Standardskript.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="relative overflow-hidden bg-muted/20 py-20 sm:py-28 dark:bg-muted/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <FadeUp>
            <div className="overflow-hidden rounded-[30px] border border-border/70 bg-card/92 shadow-[0_20px_70px_rgba(41,25,7,0.08)] backdrop-blur-xl sm:rounded-[40px]">
              <div className="border-b border-border/70 px-6 py-6 sm:px-10">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                  Kontaktwege
                </p>
                <h2 className="mt-4 max-w-3xl font-heading text-[30px] font-normal leading-[1.02] tracking-tight text-foreground sm:text-[42px] lg:text-[52px]">
                  Such dir nicht den formellsten Weg aus.
                  <br />
                  Such dir den,
                  <span className="text-muted-foreground/65"> der zu eurer Lage passt.</span>
                </h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                  Manche Teams wollen sofort eine Demo. Andere brauchen erst eine Einordnung. Wieder andere
                  möchten einfach direkt mit jemandem sprechen. Deshalb gibt es bei uns keinen künstlich bevorzugten Weg.
                </p>
              </div>

              <div className="divide-y divide-border/70">
                {paths.map((item) => (
                  <div key={item.title} className="px-6 py-6 sm:px-10 sm:py-7">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex items-start gap-4 sm:gap-5">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-background">
                          <item.icon className="size-5 text-foreground/75" />
                        </div>
                        <div className="min-w-0">
                          <div className="mb-2 flex items-center gap-3">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/65">
                              {item.step}
                            </span>
                            <div className="h-px w-10 bg-border/80" />
                          </div>
                          <p className="text-[22px] font-semibold tracking-tight text-foreground sm:text-[24px]">
                            {item.title}
                          </p>
                          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
                            {item.body}
                          </p>
                        </div>
                      </div>

                      <div className="pl-16 sm:pl-[68px] lg:pl-0">
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-2 text-[13px] font-semibold text-foreground transition-opacity hover:opacity-80"
                        >
                          {item.action}
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <FadeUp>
            <Eyebrow>Worauf wir im Gespräch achten</Eyebrow>
            <h2 className="text-balance font-heading text-[36px] font-normal leading-[0.94] tracking-tight text-foreground sm:text-[54px] lg:text-[64px]">
              Nicht nur auf Funktionen.
              <br />
              Sondern auf den
              <br />
              <span className="text-muted-foreground/65">operativen Zusammenhang.</span>
            </h2>
            <div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Welche Teams arbeiten miteinander? Wo entstehen Übergaben? Welche Standards sind kritisch?
                Wo geht heute Zeit verloren? Welche Führungsebenen müssen mitgenommen werden? Genau diese Fragen
                sind am Anfang wichtiger als jede Feature-Demo.
              </p>
              <p>
                Wenn wir das verstehen, wird auch die Entscheidung über einen sinnvollen Einstieg deutlich einfacher:
                welches Modul zuerst, welcher Rollout-Rhythmus passt und welche Tiefe überhaupt nötig ist.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}

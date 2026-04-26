"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Factory,
  GitBranch,
  Quote,
  Sparkles,
  Users,
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

function AboutStage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-14 h-[420px] w-full sm:h-[500px] lg:mt-18 lg:h-[620px]"
      style={{ perspective: "1800px" }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-0 w-[min(100%,52rem)] -translate-x-1/2 rounded-[32px] border border-border/70 bg-card/92 p-3 shadow-[0_28px_100px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:rounded-[40px] sm:p-4"
        style={{ transform: "translateX(-50%) rotateX(8deg) rotateY(-9deg)" }}
      >
        <div className="rounded-[26px] border border-border/70 bg-background/90 p-4 sm:rounded-[32px] sm:p-6">
          <div className="flex items-center justify-between border-b border-border/70 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl border border-border/70 bg-card">
                <Sparkles className="size-4 text-foreground/70" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-foreground">Hostpartners</p>
                <p className="text-[11px] text-muted-foreground">Ein Betrieb, der wieder lesbar wird</p>
              </div>
            </div>
            <div className="rounded-full border border-border/70 bg-muted/30 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
              Heute
            </div>
          </div>

          <div className="mt-4 space-y-4 sm:mt-5">
            <div className="rounded-[24px] border border-border/70 bg-card px-4 py-4 sm:px-5 sm:py-5">
              <p className="text-[13px] font-semibold text-foreground">Ein neuer Mensch startet im Betrieb.</p>
              <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                Statt Aufgaben, Wissen und Übergaben in fünf Richtungen zu verlieren, entsteht eine
                klare Linie vom ersten Tag bis in den Alltag hinein.
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted/60">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "68%" }}
                  transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-foreground"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex-1 rounded-[24px] border border-border/70 bg-card px-4 py-4 sm:px-5 sm:py-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-2xl border border-border/70 bg-background">
                    <CalendarDays className="size-4 text-foreground/70" />
                  </div>
                  <p className="text-[13px] font-semibold text-foreground">Alltag, Orientierung, Sicherheit</p>
                </div>
                <div className="space-y-2.5">
                  {[
                    "Frühschicht steht und ist verständlich kommuniziert",
                    "Übergaben bleiben nachvollziehbar",
                    "Rolle, Standards und nächste Schritte sind klar",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/80 px-4 py-3">
                      <span className="size-2 rounded-full bg-foreground" />
                      <span className="text-[12px] text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full rounded-[24px] border border-border/70 bg-card px-4 py-4 sm:px-5 sm:py-5 lg:max-w-[250px]">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-2xl border border-border/70 bg-background">
                    <BookOpen className="size-4 text-foreground/70" />
                  </div>
                  <p className="text-[13px] font-semibold text-foreground">Wissen bleibt in Bewegung</p>
                </div>
                <p className="text-[12px] leading-relaxed text-muted-foreground">
                  Standards, Hinweise und Routine verschwinden nicht in Dokumenten, sondern werden Teil
                  dessen, was Teams täglich benutzen.
                </p>
              </div>
            </div>

            <div className="rounded-[24px] border border-border/70 bg-card px-4 py-4 sm:px-5 sm:py-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-2xl border border-border/70 bg-background">
                  <Quote className="size-4 text-foreground/70" />
                </div>
                <p className="text-[13px] font-semibold text-foreground">Wie wir Produkte verstehen</p>
              </div>
              <p className="max-w-3xl text-[12px] leading-relaxed text-muted-foreground">
                Gute Produktarbeit verdichtet Realität. Sie macht nicht alles größer, sondern das Relevante klarer.
                Genau daraus entsteht für uns Vertrauen in Software.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], rotate: [-7, -5, -7] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-2 left-[2%] hidden w-[230px] rounded-[28px] border border-border/70 bg-card/92 p-4 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl xl:block"
      >
        <div className="rounded-[22px] border border-border/70 bg-background p-4">
          <div className="mb-4 flex size-10 items-center justify-center rounded-2xl border border-border/70 bg-card">
            <GitBranch className="size-4 text-foreground/70" />
          </div>
          <p className="text-[15px] font-semibold text-foreground">Flow</p>
          <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
            Aufgaben und Übergaben, die nicht an Menschen hängen bleiben.
          </p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0], rotate: [7, 5, 7] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 right-[2%] hidden w-[236px] rounded-[28px] border border-border/70 bg-card/92 p-4 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl xl:block"
      >
        <div className="rounded-[22px] border border-border/70 bg-background p-4">
          <div className="mb-4 flex size-10 items-center justify-center rounded-2xl border border-border/70 bg-card">
            <Factory className="size-4 text-foreground/70" />
          </div>
          <p className="text-[15px] font-semibold text-foreground">Ein gemeinsames Bild</p>
          <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
            Werk, Haus, Küche und Führung werden nicht mehr getrennt verwaltet, sondern zusammen gedacht.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-background pb-24 pt-24 sm:pb-32 sm:pt-28 lg:pb-40 lg:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20 dark:to-muted/10" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
        <Grain />

        <div className="relative mx-auto max-w-screen-xl px-5 sm:px-8">
          <FadeUp className="max-w-5xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/90 px-4 py-2 backdrop-blur-xl">
              <Users className="size-3.5 text-foreground/65" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Über Hostpartners
              </span>
            </div>

            <h1 className="max-w-5xl text-balance font-heading text-[46px] font-normal leading-[0.88] tracking-tight text-foreground sm:text-[72px] lg:text-[100px] xl:text-[116px]">
              Wir bauen Software,
              <br />
              die nicht lauter wird,
              <br />
              <span className="text-muted-foreground/65">sondern klarer.</span>
            </h1>

            <div className="mt-8 max-w-2xl space-y-5 text-[16px] leading-relaxed text-muted-foreground sm:text-[18px]">
              <p>
                Hostpartners ist aus einer einfachen Beobachtung entstanden: Zu viele Systeme begleiten Arbeit,
                ohne sie wirklich zu verstehen.
              </p>
              <p>
                Uns ging es nie darum, noch ein weiteres Tool zu bauen. Sondern ein besseres Gefühl für den Betrieb.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kontakt"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-7 text-[14px] font-semibold text-background transition-opacity hover:opacity-85"
              >
                Mit uns sprechen <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border/70 bg-card/90 px-7 text-[14px] font-medium text-foreground/80 transition-colors hover:bg-muted/40"
              >
                Demo buchen
              </Link>
            </div>
          </FadeUp>

          <AboutStage />
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <FadeUp>
            <Eyebrow>Die eigentliche Geschichte</Eyebrow>
            <h2 className="text-balance font-heading text-[36px] font-normal leading-[0.94] tracking-tight text-foreground sm:text-[54px] lg:text-[68px]">
              Gute Produkte
              <br />
              beginnen oft
              <br />
              <span className="text-muted-foreground/65">mit einem Unbehagen.</span>
            </h2>
            <div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Wir haben gesehen, wie oft Wissen, Onboarding, Schicht, Unterweisung und Führung in verschiedene
                Richtungen auseinanderlaufen. Nicht spektakulär. Aber spürbar. Jeden Tag.
              </p>
              <p>
                Daraus entstand der Wunsch nach einem System, das sich weniger nach Verwaltung und mehr nach
                Orientierung anfühlt. Etwas, das Zusammenhänge sichtbar macht, statt sie zu zerlegen.
              </p>
              <p>
                Wenn neue Menschen schneller ankommen, Standards nicht verloren gehen und ein Betrieb wieder
                lesbarer wird, dann ist Produktarbeit für uns erfolgreich.
              </p>
              <p>
                Für uns bedeutet das auch, Software nicht nur als Oberfläche zu sehen. Sondern als Haltung:
                Wie spricht ein Produkt mit Menschen? Wie viel Ruhe gibt es ihnen? Wie viel Unschärfe nimmt
                es aus ihrem Tag?
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="relative overflow-hidden bg-muted/20 py-20 sm:py-28 dark:bg-muted/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
          <FadeUp>
            <div className="rounded-[32px] border border-border/70 bg-card/92 px-6 py-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:rounded-[40px] sm:px-10 sm:py-10">
              <Quote className="size-8 text-foreground/20" />
              <p className="mt-5 max-w-3xl font-heading text-[28px] font-normal leading-[1.06] tracking-tight text-foreground sm:text-[40px] lg:text-[54px]">
                Gute Software sollte nicht zwischen Menschen und Betrieb stehen.
                Sie sollte beide näher zusammenbringen.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <FadeUp>
            <Eyebrow>Für wen wir bauen</Eyebrow>
            <h2 className="text-balance font-heading text-[36px] font-normal leading-[0.94] tracking-tight text-foreground sm:text-[54px] lg:text-[64px]">
              Hotellerie.
              <br />
              Gastronomie.
              <br />
              <span className="text-muted-foreground/65">Industrie.</span>
            </h2>
            <div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Drei Branchen, die unterschiedlich wirken und doch dieselbe Frage teilen: Wie bleibt ein Betrieb
                klar, wenn Menschen, Wissen, Abläufe und Verantwortung jeden Tag in Bewegung sind?
              </p>
              <p>Genau für diese Frage bauen wir Hostpartners.</p>
              <p>
                In der Hotellerie zeigt sich das bei Übergaben, Saisonkräften und Servicetakt. In der Gastronomie
                bei Peak-Zeiten, Einarbeitung und konstantem Qualitätsdruck. In der Industrie bei Schichtmodellen,
                Unterweisungen und standortübergreifender Führung. Die Situationen unterscheiden sich. Der Bedarf
                nach Übersicht, Sicherheit und Rhythmus nicht.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="relative overflow-hidden bg-muted/20 py-20 sm:py-28 dark:bg-muted/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
          <FadeUp>
            <Eyebrow>Was wir daraus gelernt haben</Eyebrow>
            <h2 className="text-balance font-heading text-[36px] font-normal leading-[0.94] tracking-tight text-foreground sm:text-[54px] lg:text-[64px]">
              Ein Betrieb wird nicht
              <br />
              besser, weil Software
              <br />
              <span className="text-muted-foreground/65">mehr kann.</span>
            </h2>
            <div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Er wird besser, wenn weniger verloren geht. Wenn Zuständigkeiten klarer werden. Wenn Standards
                nicht nur dokumentiert, sondern benutzt werden. Wenn Führung näher am Alltag statt näher an
                Tabellen stattfindet.
              </p>
              <p>
                Deshalb interessiert uns nicht die möglichst große Featureliste. Uns interessiert, ob ein Produkt
                am Ende dazu beiträgt, dass Menschen sicherer, schneller und ruhiger arbeiten können.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}

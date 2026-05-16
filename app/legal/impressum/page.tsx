import Link from "next/link"
import { LegalShell, LegalSection, P, Strong, UL, InfoBox, Table } from "@/components/legal/legal-shell"

export const metadata = { title: "Impressum – Hostpartners" }

const SECTIONS = [
  { id: "angaben",         title: "Angaben gemäß § 5 DDG" },
  { id: "kontakt",         title: "Kontakt & Zuständigkeiten" },
  { id: "register",        title: "Handelsregister & Steuern" },
  { id: "inhalt",          title: "Verantwortlich für den Inhalt" },
  { id: "urheberrecht",    title: "Urheberrecht" },
  { id: "haftung",         title: "Haftungshinweise" },
  { id: "verbraucher",     title: "Verbraucherstreitbeilegung" },
  { id: "berufsrecht",     title: "Berufs- & aufsichtsrechtliche Angaben" },
]

export default function ImpressumPage() {
  return (
    <LegalShell
      title="Impressum"
      category="§ 5 DDG"
      date="07. April 2026"
      sections={SECTIONS}
    >
      <LegalSection id="angaben" title={SECTIONS[0].title} index={1}>
        <Table rows={[
          ["Unternehmen",   "Hostpartners GmbH"],
          ["Rechtsform",    "Gesellschaft mit beschränkter Haftung (GmbH)"],
          ["Adresse",       "Musterstraße 1, 10115 Berlin, Deutschland"],
          ["Postanschrift", "Postfach: Musterstraße 1, 10115 Berlin"],
          ["Geschäftsführung", "Max Mustermann"],
        ]} />
      </LegalSection>

      <LegalSection id="kontakt" title={SECTIONS[1].title} index={2}>
        <Table rows={[
          ["E-Mail allgemein",   "hallo@hostpartners.com"],
          ["E-Mail Support",     "support@hostpartners.com"],
          ["E-Mail Datenschutz", "privacy@hostpartners.com"],
          ["E-Mail Rechtliches", "legal@hostpartners.com"],
          ["Telefon",            "+49 30 123 456 789 (Mo–Fr, 09–17 Uhr MEZ)"],
          ["Website",            "https://hostpartners.com"],
        ]} />
        <InfoBox>
          Für Datenschutzanfragen wenden Sie sich bitte ausschließlich an{" "}
          <a href="mailto:privacy@hostpartners.com" className="text-foreground underline underline-offset-4">
            privacy@hostpartners.com
          </a>.{" "}
          Für Sicherheitslücken: <a href="mailto:security@hostpartners.com" className="text-foreground underline underline-offset-4">
            security@hostpartners.com
          </a>.
        </InfoBox>
      </LegalSection>

      <LegalSection id="register" title={SECTIONS[2].title} index={3}>
        <Table rows={[
          ["Handelsregister",  "Amtsgericht Berlin-Charlottenburg"],
          ["Registernummer",   "HRB 123456 B"],
          ["USt-IdNr.",        "DE 123 456 789 (gemäß § 27a UStG)"],
          ["Steuernummer",     "30/123/45678"],
        ]} />
      </LegalSection>

      <LegalSection id="inhalt" title={SECTIONS[3].title} index={4}>
        <P>
          Verantwortliche Person für den Inhalt dieser Website gemäß{" "}
          <Strong>§ 18 Abs. 2 Medienstaatsvertrag (MStV)</Strong> und
          journalistisch-redaktionell gestaltete Inhalte:
        </P>
        <Table rows={[
          ["Name",     "Max Mustermann"],
          ["Funktion", "Geschäftsführer, Hostpartners GmbH"],
          ["Adresse",  "Musterstraße 1, 10115 Berlin"],
          ["E-Mail",   "max.mustermann@hostpartners.com"],
        ]} />
        <P>
          Diese Angaben gelten nur, sofern auf dieser Website journalistisch-redaktionelle
          Inhalte i.S.d. § 18 MStV veröffentlicht werden. Für ausschließlich gewerbliche
          Angebote (SaaS) ist diese Angabe nicht zwingend erforderlich.
        </P>
      </LegalSection>

      <LegalSection id="urheberrecht" title={SECTIONS[4].title} index={5}>
        <P>
          Die durch die Hostpartners GmbH erstellten Inhalte und Werke auf dieser Website und
          in der Hostpartners-Plattform unterliegen dem deutschen <Strong>Urheberrecht</Strong>.
          Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb
          der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung von Hostpartners.
          Downloads und Kopien sind nur für den privaten, nicht-kommerziellen Gebrauch gestattet.
        </P>
        <P>
          Soweit Inhalte auf dieser Website nicht von Hostpartners erstellt wurden, werden die
          Urheberrechte Dritter beachtet. Inhalte Dritter sind als solche gekennzeichnet.
          Sollten Sie dennoch auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir
          um einen entsprechenden Hinweis an{" "}
          <a href="mailto:legal@hostpartners.com" className="text-foreground underline underline-offset-4 hover:no-underline">
            legal@hostpartners.com
          </a>. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
          umgehend entfernen.
        </P>
        <P>
          Das Hostpartners-Logo, die Produktnamen (Persona, Atlas, Academy, Flow, Tempo, Roster,
          Lumen, Hire, Payroll) und das Hostpartners-Erscheinungsbild sind Marken der Hostpartners GmbH.
          Eine Nutzung ohne ausdrückliche schriftliche Genehmigung ist nicht gestattet.
        </P>
      </LegalSection>

      <LegalSection id="haftung" title={SECTIONS[5].title} index={6}>
        <P>
          <Strong>Haftung für eigene Inhalte:</Strong> Als Diensteanbieter sind wir gemäß
          § 7 Abs. 1 DDG für eigene Inhalte auf unseren Seiten nach den allgemeinen
          Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter
          jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen
          zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen.
        </P>
        <P>
          <Strong>Haftung für Links:</Strong> Unser Angebot enthält Links zu externen
          Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte
          der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
          verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
          Links umgehend entfernen.
        </P>
        <UL items={[
          "Verlinkung externer Seiten erfolgt nach sorgfältiger Prüfung zum Zeitpunkt der Verlinkung.",
          "Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.",
          "Hinweise auf rechtlich bedenkliche Links können an legal@hostpartners.com gerichtet werden.",
        ]} />
      </LegalSection>

      <LegalSection id="verbraucher" title={SECTIONS[6].title} index={7}>
        <P>
          Hostpartners ist weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor
          einer Verbraucherschlichtungsstelle teilzunehmen.
        </P>
        <P>
          Hinweis gemäß <Strong>§ 36 VSBG</Strong> (Verbraucherstreitbeilegungsgesetz):
          Hostpartners richtet seine Angebote ausschließlich an Unternehmen (B2B) und schließt
          keine Verbraucherverträge ab. Die Europäische Kommission stellt unter{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            ec.europa.eu/consumers/odr/
          </a>{" "}
          eine Plattform zur Online-Streitbeilegung (OS) bereit — diese ist für uns
          mangels Verbrauchervertragsbeziehungen nicht einschlägig.
        </P>
      </LegalSection>

      <LegalSection id="berufsrecht" title={SECTIONS[7].title} index={8}>
        <P>
          Hostpartners GmbH ist ein gewerbliches Technologieunternehmen (SaaS). Es bestehen
          <Strong> keine besonders geregelten Berufe</Strong> i.S.d. § 5 Abs. 1 Nr. 5–7 DDG,
          die berufsrechtliche Angaben erfordern (z.B. Rechtsanwaltskanzlei, Steuerberater,
          Arztpraxis). Eine Kammer- oder Aufsichtsbehörde im berufsrechtlichen Sinne ist
          nicht zuständig.
        </P>
        <P>
          Für die Nutzung von Zahlungsdiensten (Stripe) unterliegt Hostpartners den einschlägigen
          Anforderungen der Zahlungsdiensteaufsicht, soweit Hostpartners als
          Zahlungsdienstleistungs-Vermittler tätig wird. Die Zahlungsabwicklung selbst
          erfolgt durch Stripe, der über eine entsprechende Lizenz der zuständigen
          Aufsichtsbehörde verfügt.
        </P>
        <InfoBox>
          Dieses Impressum wurde zuletzt am 07. April 2026 aktualisiert. Bei Fragen oder
          notwendigen Korrekturen wenden Sie sich an{" "}
          <a href="mailto:legal@hostpartners.com" className="text-foreground underline underline-offset-4">
            legal@hostpartners.com
          </a>.
        </InfoBox>
      </LegalSection>
    </LegalShell>
  )
}

import Link from "next/link"
import { LegalShell, LegalSection, P, Strong, UL, InfoBox, Table } from "@/components/legal/legal-shell"

export const metadata = { title: "Datenschutzerklärung – Hostpartners" }

const SECTIONS = [
  { id: "verantwortlicher",      title: "Verantwortlicher" },
  { id: "grundsaetze",           title: "Grundsätze der Verarbeitung" },
  { id: "zwecke",                title: "Verarbeitungszwecke & Rechtsgrundlagen" },
  { id: "hosting",               title: "Hosting, Infrastruktur & Logfiles" },
  { id: "cookies",               title: "Cookies & Session-Management" },
  { id: "konto",                 title: "Nutzerkonto & Plattformbetrieb" },
  { id: "auftragsverarbeitung",  title: "Hostpartners als Auftragsverarbeiter" },
  { id: "subprocessors",         title: "Unterauftragsverarbeiter & Drittdienstleister" },
  { id: "drittlander",           title: "Drittlandübermittlungen" },
  { id: "speicherdauer",         title: "Speicherdauer & Löschung" },
  { id: "rechte",                title: "Rechte der betroffenen Personen" },
  { id: "sicherheit",            title: "Technisch-organisatorische Maßnahmen" },
  { id: "ki",                    title: "KI-Features & Datenverarbeitung" },
  { id: "aenderungen",           title: "Änderungen dieser Erklärung" },
]

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Datenschutzerklärung"
      category="Datenschutz"
      date="07. April 2026"
      sections={SECTIONS}
    >
      <LegalSection id="verantwortlicher" title={SECTIONS[0].title} index={1}>
        <Table rows={[
          ["Unternehmen",   "Hostpartners GmbH"],
          ["Adresse",       "Musterstraße 1, 10115 Berlin, Deutschland"],
          ["E-Mail",        "legal@hostpartners.com"],
          ["Datenschutz",   "privacy@hostpartners.com"],
          ["Handelsregister", "HRB 123456 B, Amtsgericht Berlin-Charlottenburg"],
          ["USt-IdNr.",     "DE 123 456 789"],
          ["Vertreten durch", "Geschäftsführung Hostpartners GmbH"],
        ]} />
        <P>
          Bei Fragen zum Datenschutz wenden Sie sich bevorzugt per E-Mail an{" "}
          <a href="mailto:privacy@hostpartners.com" className="text-foreground underline underline-offset-4 hover:no-underline">
            privacy@hostpartners.com
          </a>.
        </P>
      </LegalSection>

      <LegalSection id="grundsaetze" title={SECTIONS[1].title} index={2}>
        <P>
          Hostpartners verarbeitet personenbezogene Daten nach den Grundsätzen des{" "}
          <Strong>Art. 5 DSGVO</Strong>: Rechtmäßigkeit, Verarbeitung nach Treu und Glauben,
          Transparenz, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung,
          Integrität und Vertraulichkeit.
        </P>
        <P>
          Diese Datenschutzerklärung gilt für die Website hostpartners.com und die Hostpartners-SaaS-Plattform
          in ihrer Funktion als <Strong>eigenverantwortliche Datenverarbeitung</Strong>{" "}
          (z.B. Kontaktdaten, Rechnungsadressen, Nutzungsstatistiken). Für die Verarbeitung
          personenbezogener Mitarbeiterdaten durch unsere Kunden als Verantwortliche verweisen
          wir auf{" "}
          <Link href="#auftragsverarbeitung" className="text-foreground underline underline-offset-4 hover:no-underline">
            §&thinsp;7
          </Link>.
        </P>
      </LegalSection>

      <LegalSection id="zwecke" title={SECTIONS[2].title} index={3}>
        <P>
          Wir verarbeiten personenbezogene Daten zu folgenden Zwecken auf den genannten
          Rechtsgrundlagen:
        </P>
        <UL items={[
          <><Strong>Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO):</Strong> Bereitstellung der Plattform, Nutzerkontoverwaltung, Rechnungsstellung, Support-Kommunikation.</>,
          <><Strong>Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO):</Strong> IT-Sicherheit, Missbrauchsprävention, Verbesserung der Plattformstabilität, aggregierte Nutzungsanalyse.</>,
          <><Strong>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO / § 25 TDDDG):</Strong> Optionale Cookies und Tracking-Technologien; Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden.</>,
          <><Strong>Rechtliche Verpflichtungen (Art. 6 Abs. 1 lit. c DSGVO):</Strong> Steuerliche Aufbewahrungspflichten (§ 147 AO, § 257 HGB), Auskunftspflichten gegenüber Behörden.</>,
          <><Strong>Auftragsverarbeitung (Art. 28 DSGVO):</Strong> Verarbeitung von Mitarbeiterdaten unserer Kunden ausschließlich auf Weisung; keine eigenständige Nutzung dieser Daten.</>,
        ]} />
      </LegalSection>

      <LegalSection id="hosting" title={SECTIONS[3].title} index={4}>
        <P>
          Die Hostpartners-Plattform wird auf Infrastruktur von <Strong>Supabase</Strong> und{" "}
          <Strong>Vercel</Strong> betrieben (Details unter{" "}
          <Link href="#subprocessors" className="text-foreground underline underline-offset-4 hover:no-underline">§&thinsp;8</Link>).
          Der primäre Datenbankserver befindet sich in der <Strong>EU (Frankfurt, Deutschland)</Strong>.
        </P>
        <P>
          Beim Aufruf der Plattform werden <Strong>Server-Logfiles</Strong> verarbeitet, die
          technisch zur Bereitstellung erforderlich sind. Diese enthalten:
        </P>
        <UL items={[
          "IP-Adresse (anonymisiert nach 7 Tagen, vollständig gelöscht nach 30 Tagen)",
          "Datum und Uhrzeit des Zugriffs",
          "Aufgerufene URL, HTTP-Statuscode",
          "Browser-Typ und -Version, Betriebssystem",
          "Referrer-URL (sofern übermittelt)",
        ]} />
        <P>
          Rechtsgrundlage: <Strong>Art. 6 Abs. 1 lit. f DSGVO</Strong> (berechtigtes Interesse
          an Plattformstabilität und IT-Sicherheit). Eine Zusammenführung mit anderen Datenbeständen
          oder eine Identifizierung einzelner Nutzer findet nicht statt.
        </P>
      </LegalSection>

      <LegalSection id="cookies" title={SECTIONS[4].title} index={5}>
        <P>
          Hostpartners verwendet <Strong>ausschließlich technisch notwendige Cookies</Strong> (Session-Cookies,
          Authentifizierungs-Tokens) sowie einen einwilligungspflichtigen Cookie für die
          Speicherung von Theme-Präferenzen. Tracking-, Werbe- oder Analyse-Cookies werden
          nicht eingesetzt.
        </P>
        <UL items={[
          <><Strong>sb-access-token / sb-refresh-token:</Strong> Authentifizierungs-Session, HttpOnly, Secure. Laufzeit: Session bzw. max. 7 Tage (Refresh-Token). Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.</>,
          <><Strong>hostpartners-active-org:</Strong> Speichert die zuletzt aktive Organisation für das Routing. Laufzeit: 30 Tage. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.</>,
          <><Strong>hostpartners-theme:</Strong> Speichert die Farbschema-Präferenz (Hell/Dunkel/System). Laufzeit: 1 Jahr. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung via Cookie-Banner).</>,
          <><Strong>hostpartners-cookie-consent:</Strong> Speichert das Ergebnis der Cookie-Einwilligung. Laufzeit: 1 Jahr. Rechtsgrundlage: § 25 TDDDG.</>,
        ]} />
        <InfoBox>
          Sie können Cookies jederzeit über die Einstellungen Ihres Browsers löschen oder blockieren.
          Das Blockieren technisch notwendiger Cookies kann die Funktionsfähigkeit der Plattform
          beeinträchtigen.
        </InfoBox>
      </LegalSection>

      <LegalSection id="konto" title={SECTIONS[5].title} index={6}>
        <P>
          Nutzerkonten werden von <Strong>Administratoren der jeweiligen Organisation</Strong>{" "}
          angelegt — eine Selbstregistrierung ist nicht möglich. Dabei werden folgende Daten
          verarbeitet:
        </P>
        <UL items={[
          "Vorname, Nachname",
          "E-Mail-Adresse",
          "Systemrolle innerhalb der Organisation",
          "Datum und Uhrzeit der Kontoerstellung",
          "Letzter Login-Zeitpunkt (für Sicherheitszwecke)",
        ]} />
        <P>
          Rechtsgrundlage: <Strong>Art. 6 Abs. 1 lit. b DSGVO</Strong> (Erfüllung des Nutzungsvertrags).
          Passwörter werden ausschließlich in gehashter Form gespeichert (bcrypt); eine
          Entschlüsselung durch Hostpartners ist technisch nicht möglich.
        </P>
        <P>
          Bei der Nutzung der Plattform werden Aktionsprotokolle gespeichert
          (z.B. Kursabschlüsse, Onboarding-Fortschritt, Zeiteinträge). Diese Daten
          dienen der Vertragserfüllung und der Bereitstellung der Plattformfunktionen;
          die Verantwortlichkeit für diese Daten liegt beim jeweiligen Kunden als Auftraggeber.
        </P>
      </LegalSection>

      <LegalSection id="auftragsverarbeitung" title={SECTIONS[6].title} index={7}>
        <P>
          Soweit Kunden von Hostpartners personenbezogene Daten ihrer Mitarbeitenden und
          Beschäftigten über die Plattform verarbeiten, handelt Hostpartners als{" "}
          <Strong>Auftragsverarbeiter i.S.d. Art. 28 DSGVO</Strong>. Die datenschutzrechtliche
          Verantwortlichkeit für diese Daten verbleibt beim jeweiligen Kunden als Verantwortlichem
          i.S.d. Art. 4 Nr. 7 DSGVO.
        </P>
        <P>
          Mit jedem Kunden wird ein <Strong>Auftragsverarbeitungsvertrag (AVV/DPA)</Strong>{" "}
          nach Art. 28 Abs. 3 DSGVO geschlossen, der die Weisungsgebundenheit von Hostpartners,
          die Pflichten der Parteien, technische und organisatorische Maßnahmen (TOM) sowie
          die eingesetzten Unterauftragsverarbeiter regelt.
        </P>
        <P>
          Hostpartners verarbeitet die im Auftrag verarbeiteten Daten:
        </P>
        <UL items={[
          "ausschließlich auf dokumentierte Weisung des Kunden",
          "nicht für eigene Zwecke oder zugunsten Dritter",
          "innerhalb der EU/EWR, soweit nicht abweichend vereinbart",
          "unter Einhaltung der vereinbarten technischen und organisatorischen Maßnahmen",
        ]} />
      </LegalSection>

      <LegalSection id="subprocessors" title={SECTIONS[7].title} index={8}>
        <P>
          Hostpartners setzt folgende Unterauftragsverarbeiter ein, mit denen jeweils ein
          Auftragsverarbeitungsvertrag nach Art. 28 DSGVO besteht:
        </P>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">Anbieter</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">Zweck</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">Serverstandort</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">Grundlage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Supabase Inc., San Francisco (USA)", "Datenbankhosting, Authentifizierung, Dateispeicherung, Edge Functions", "EU (Frankfurt, DE)", "SCCs (Art. 46 DSGVO)"],
                ["Vercel Inc., San Francisco (USA)", "Web-Hosting, CDN, Serverless-Funktionen", "EU/USA", "SCCs (Art. 46 DSGVO)"],
                ["Stripe Inc., San Francisco (USA)", "Zahlungsabwicklung, Abonnementverwaltung", "EU/USA", "SCCs (Art. 46 DSGVO)"],
                ["Resend Inc., San Francisco (USA)", "Transaktions-E-Mails (Systembenachrichtigungen)", "USA", "SCCs (Art. 46 DSGVO)"],
                ["Anthropic PBC, San Francisco (USA)", "KI-Funktionen (Lumen-Modul, nur wenn aktiviert)", "USA", "SCCs (Art. 46 DSGVO)"],
              ].map(([anbieter, zweck, ort, grundlage], i) => (
                <tr key={i} className="bg-background even:bg-muted/10">
                  <td className="px-4 py-3 font-medium text-foreground text-[12.5px]">{anbieter}</td>
                  <td className="px-4 py-3 text-muted-foreground text-[12.5px]">{zweck}</td>
                  <td className="px-4 py-3 text-muted-foreground text-[12.5px] whitespace-nowrap">{ort}</td>
                  <td className="px-4 py-3 text-muted-foreground text-[12.5px] whitespace-nowrap">{grundlage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <P>
          Aktuelle Änderungen an der Liste der Unterauftragsverarbeiter werden Kunden
          mindestens <Strong>14 Tage im Voraus</Strong> per E-Mail mitgeteilt. Kunden
          haben das Recht, gegen neue Unterauftragsverarbeiter Einwände zu erheben.
        </P>
      </LegalSection>

      <LegalSection id="drittlander" title={SECTIONS[8].title} index={9}>
        <P>
          Einige unserer Unterauftragsverarbeiter haben ihren Sitz in den <Strong>USA</Strong>.
          Die Übermittlung personenbezogener Daten erfolgt auf Grundlage der{" "}
          <Strong>EU-Standardvertragsklauseln (SCCs)</Strong> gemäß Art. 46 Abs. 2 lit. c
          DSGVO sowie der ergänzenden technischen und organisatorischen Maßnahmen (TOMs)
          der jeweiligen Anbieter.
        </P>
        <P>
          Für Stripe-Verarbeitungen auf dem EU-Serverstandort (stripe.com/eu) gilt der
          EU-U.S. Data Privacy Framework (Art. 45 DSGVO). Für alle übrigen US-Übermittlungen
          stützen wir uns auf die SCCs der Europäischen Kommission (Durchführungsbeschluss
          2021/914).
        </P>
        <InfoBox>
          Auf Anfrage stellen wir Ihnen die abgeschlossenen SCCs sowie die Transfer-Impact-Assessments
          (TIAs) zur Verfügung. Bitte wenden Sie sich dazu an{" "}
          <a href="mailto:privacy@hostpartners.com" className="text-foreground underline underline-offset-4">
            privacy@hostpartners.com
          </a>.
        </InfoBox>
      </LegalSection>

      <LegalSection id="speicherdauer" title={SECTIONS[9].title} index={10}>
        <P>
          Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck
          erforderlich ist oder gesetzliche Aufbewahrungsfristen dies vorschreiben.
        </P>
        <UL items={[
          <><Strong>Nutzerkontodaten:</Strong> Für die Dauer des aktiven Nutzungsvertrags. Nach Vertragsende und Ablauf der Exportfrist (30 Tage) werden alle personenbezogenen Daten gelöscht oder unwiderruflich anonymisiert.</>,
          <><Strong>Rechnungs- und Vertragsdaten:</Strong> 10 Jahre ab Entstehung (§ 147 AO, § 257 HGB).</>,
          <><Strong>Server-Logfiles:</Strong> Anonymisierung der IP-Adresse nach 7 Tagen, vollständige Löschung nach 30 Tagen.</>,
          <><Strong>E-Mail-Kommunikation:</Strong> 3 Jahre ab letztem Kontakt (Verjährungsfrist), sofern kein längerer gesetzlicher Aufbewahrungszeitraum gilt.</>,
          <><Strong>Cookies:</Strong> Gemäß den in § 5 genannten Fristen.</>,
          <><Strong>Im Auftrag verarbeitete Mitarbeiterdaten:</Strong> Nach Weisung des Kunden (Verantwortlicher); nach Vertragsende gemäß AVV und DSGVO.</>,
        ]} />
      </LegalSection>

      <LegalSection id="rechte" title={SECTIONS[10].title} index={11}>
        <P>
          Als betroffene Person stehen Ihnen gegenüber Hostpartners als Verantwortlichem
          folgende Rechte zu:
        </P>
        <UL items={[
          <><Strong>Auskunft (Art. 15 DSGVO):</Strong> Sie können Auskunft über die von uns gespeicherten personenbezogenen Daten verlangen.</>,
          <><Strong>Berichtigung (Art. 16 DSGVO):</Strong> Sie können die Berichtigung unrichtiger oder unvollständiger Daten verlangen.</>,
          <><Strong>Löschung (Art. 17 DSGVO):</Strong> Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</>,
          <><Strong>Einschränkung (Art. 18 DSGVO):</Strong> Sie können unter bestimmten Voraussetzungen die Einschränkung der Verarbeitung verlangen.</>,
          <><Strong>Datenübertragbarkeit (Art. 20 DSGVO):</Strong> Sie haben Anspruch auf Herausgabe Ihrer Daten in einem maschinenlesbaren Format.</>,
          <><Strong>Widerspruch (Art. 21 DSGVO):</Strong> Sie können der Verarbeitung auf Basis berechtigter Interessen jederzeit widersprechen.</>,
          <><Strong>Widerruf von Einwilligungen (Art. 7 Abs. 3 DSGVO):</Strong> Erteilte Einwilligungen können jederzeit mit Wirkung für die Zukunft widerrufen werden.</>,
          <><Strong>Beschwerde (Art. 77 DSGVO):</Strong> Sie haben das Recht zur Beschwerde bei der zuständigen Aufsichtsbehörde, z.B. der Berliner Beauftragten für Datenschutz und Informationsfreiheit (BlnBDI), Friedrichstr. 219, 10969 Berlin.</>,
        ]} />
        <P>
          Anfragen richten Sie bitte an{" "}
          <a href="mailto:privacy@hostpartners.com" className="text-foreground underline underline-offset-4 hover:no-underline">
            privacy@hostpartners.com
          </a>.{" "}
          Wir bearbeiten Anfragen innerhalb von <Strong>30 Tagen</Strong> (Art. 12 Abs. 3 DSGVO).
        </P>
        <InfoBox>
          Hinweis: Bei Daten, die Hostpartners im Auftrag eines Kunden verarbeitet (Mitarbeiterdaten),
          ist der jeweilige Kunde Verantwortlicher. Anfragen betroffener Mitarbeitender sind
          in diesem Fall zunächst an die jeweilige Organisation zu richten.
        </InfoBox>
      </LegalSection>

      <LegalSection id="sicherheit" title={SECTIONS[11].title} index={12}>
        <P>
          Hostpartners trifft dem Stand der Technik entsprechende technische und organisatorische
          Maßnahmen (TOM) gemäß <Strong>Art. 32 DSGVO</Strong>, um ein dem Risiko angemessenes
          Schutzniveau zu gewährleisten.
        </P>
        <UL items={[
          <><Strong>Verschlüsselung:</Strong> TLS 1.3 für alle Datenübertragungen; AES-256-Verschlüsselung für Daten-at-Rest in der Datenbank.</>,
          <><Strong>Authentifizierung:</Strong> Mehrfaktor-Authentifizierung (MFA) für Administratoren; sicheres Session-Management mit kurzlebigen JWTs.</>,
          <><Strong>Zugriffskontrolle:</Strong> Rollenbasiertes Berechtigungsmodell (RBAC) mit Row-Level-Security auf Datenbankebene; Prinzip der minimalen Rechte.</>,
          <><Strong>Mandantentrennung:</Strong> Vollständige logische Trennung aller Kundendaten durch Row-Level-Security (RLS) auf Datenbankebene.</>,
          <><Strong>Backups:</Strong> Tägliche automatisierte Backups mit 30-tägiger Aufbewahrung; Point-in-Time-Recovery (PITR).</>,
          <><Strong>Monitoring:</Strong> Kontinuierliches Sicherheits-Monitoring, automatische Anomalieerkennung, Penetrationstests (mindestens jährlich).</>,
          <><Strong>Incident Response:</Strong> Verfahren zur Erkennung, Bewertung und Meldung von Datenschutzverletzungen gemäß Art. 33/34 DSGVO innerhalb von 72 Stunden.</>,
        ]} />
      </LegalSection>

      <LegalSection id="ki" title={SECTIONS[12].title} index={13}>
        <P>
          Das optionale Modul <Strong>Lumen (KI-Assistent)</Strong> verwendet KI-Technologie
          von <Strong>Anthropic PBC</Strong> (Claude API), um semantische Suche und
          natürlichsprachliche Anfragen über die betriebliche Wissensbasis zu ermöglichen.
        </P>
        <P>
          Bei Nutzung des KI-Moduls werden Anfragen und relevante Wissensinhalte zur
          Verarbeitung an die Anthropic API übermittelt. Anthropic verarbeitet diese Daten
          ausschließlich zur Beantwortung der jeweiligen Anfrage; eine Verwendung zum
          Training von Modellen findet gemäß API-Vereinbarung nicht statt.
        </P>
        <UL items={[
          <>Das KI-Modul ist <Strong>standardmäßig deaktiviert</Strong> und muss vom Administrator explizit aktiviert werden.</>,
          <>Personenbezogene Daten werden nur insoweit an die KI-API übermittelt, wie sie in den vom Nutzer angefragten Wissensinhalten enthalten sind.</>,
          <>Anthropic ist als Unterauftragsverarbeiter im AVV aufgeführt; der Datentransfer erfolgt auf Basis von SCCs.</>,
          <>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) i.V.m. Art. 28 DSGVO.</>,
        ]} />
      </LegalSection>

      <LegalSection id="aenderungen" title={SECTIONS[13].title} index={14}>
        <P>
          Hostpartners behält sich vor, diese Datenschutzerklärung anzupassen, wenn sich
          rechtliche Anforderungen, technische Verarbeitungsprozesse oder der Kreis der
          eingesetzten Dienstleister ändern.
        </P>
        <P>
          Wesentliche Änderungen werden registrierten Kunden mindestens{" "}
          <Strong>2 Wochen im Voraus</Strong> per E-Mail mitgeteilt. Die jeweils aktuelle
          Version ist dauerhaft unter{" "}
          <Link href="/legal/privacy" className="text-foreground underline underline-offset-4 hover:no-underline">
            hostpartners.com/legal/privacy
          </Link>{" "}
          abrufbar. Das Datum der letzten Änderung ist am Anfang dieses Dokuments ausgewiesen.
        </P>
        <InfoBox>
          Stand: 07. April 2026. Diese Datenschutzerklärung gilt für die Hostpartners-Plattform
          ab Version 2.0. Bei Fragen schreiben Sie uns an{" "}
          <a href="mailto:privacy@hostpartners.com" className="text-foreground underline underline-offset-4">
            privacy@hostpartners.com
          </a>.
        </InfoBox>
      </LegalSection>
    </LegalShell>
  )
}

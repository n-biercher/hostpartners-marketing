import Link from "next/link"
import { LegalShell, LegalSection, P, Strong, UL, InfoBox } from "@/components/legal/legal-shell"

export const metadata = { title: "AGB – Hostpartners" }

const SECTIONS = [
  { id: "geltungsbereich",  title: "Geltungsbereich & Vertragspartner" },
  { id: "leistungen",       title: "Leistungsbeschreibung" },
  { id: "vertragsschluss",  title: "Vertragsschluss & Testphase" },
  { id: "preise",           title: "Preise, Abrechnung & Zahlungen" },
  { id: "lizenzen",         title: "Lizenzen & Nutzerverwaltung" },
  { id: "mitwirkung",       title: "Mitwirkungspflichten der Kunden" },
  { id: "nutzungsrechte",   title: "Nutzungsrechte & Inhalte" },
  { id: "verfuegbarkeit",   title: "Verfügbarkeit, Wartung & Änderungen" },
  { id: "haftung",          title: "Gewährleistung & Haftung" },
  { id: "datenschutz",      title: "Datenschutz & Auftragsverarbeitung" },
  { id: "laufzeit",         title: "Laufzeit & Kündigung" },
  { id: "schluss",          title: "Schlussbestimmungen" },
]

export default function AGBPage() {
  return (
    <LegalShell
      title="Allgemeine Geschäftsbedingungen"
      category="AGB"
      date="07. April 2026"
      sections={SECTIONS}
    >
      <LegalSection id="geltungsbereich" title={SECTIONS[0].title} index={1}>
        <P>
          Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB") regeln die Rechtsbeziehung
          zwischen der <Strong>Hostpartners GmbH</Strong>, Musterstraße 1, 10115 Berlin, Deutschland
          (nachfolgend „Hostpartners"), und ihren Kunden hinsichtlich der Nutzung der
          Software-as-a-Service-Lösung „Hostpartners" — einer modularen HR-Plattform für
          Unternehmen im Gastgewerbe und verwandten Branchen.
        </P>
        <P>
          Hostpartners richtet seine Leistungen ausschließlich an Unternehmer im Sinne des{" "}
          <Strong>§ 14 BGB</Strong> sowie juristische Personen des öffentlichen Rechts (B2B).
          Verbraucherverträge werden nicht geschlossen.
        </P>
        <P>
          Abweichende, entgegenstehende oder ergänzende Allgemeine Geschäftsbedingungen der
          Kunden werden nicht Vertragsbestandteil, es sei denn, Hostpartners stimmt ihrer Geltung
          ausdrücklich in Textform zu. Dies gilt auch dann, wenn Hostpartners Leistungen vorbehaltlos
          erbringt, obwohl Abweichungen bekannt sind.
        </P>
      </LegalSection>

      <LegalSection id="leistungen" title={SECTIONS[1].title} index={2}>
        <P>
          Hostpartners stellt eine mandantenfähige HR-Plattform als Software-as-a-Service bereit.
          Der konkrete Leistungsumfang richtet sich nach dem jeweils gebuchten Tarif und den
          aktivierten App-Modulen. Folgende Module stehen grundsätzlich zur Verfügung:
        </P>
        <UL items={[
          <><Strong>HR Core (Persona)</Strong> — Stammdaten, Organigramm, Dokumentenverwaltung, Rollen & Berechtigungen. Dieser Bereich ist in jedem Tarif enthalten.</>,
          <><Strong>Wissen (Atlas)</Strong> — Wissensdatenbank, Artikel, volltext- und semantische Suche.</>,
          <><Strong>Lernen (Academy)</Strong> — Schulungen, Kurse, Lernpfade, Zertifikate.</>,
          <><Strong>Prozesse (Flow)</Strong> — Onboarding, Offboarding, Antragsflows und Genehmigungsprozesse.</>,
          <><Strong>Zeit & Abwesenheit (Tempo)</Strong> — Zeiterfassung, Urlaubsverwaltung und Abwesenheitssalden.</>,
          <><Strong>Schichtplanung (Roster)</Strong> — Schichtpläne, Verfügbarkeiten und Tauschbörse.</>,
          <><Strong>Recruiting (Hire)</Strong> — Bewerbermanagement, Karriereseite und Onboarding-Übergabe.</>,
          <><Strong>KI-Assistent (Lumen)</Strong> — KI-gestützte Suche und Chat über die betriebliche Wissensbasis.</>,
        ]} />
        <P>
          Verfügbarkeitsziel: <Strong>99,5 % monatlich</Strong> (gemessen außerhalb geplanter
          Wartungsfenster). Support: E-Mail werktags 09:00–17:00 Uhr MEZ/MESZ. Hostpartners behält
          sich vor, Funktionen weiterzuentwickeln und den Leistungsumfang zumutbar anzupassen.
        </P>
      </LegalSection>

      <LegalSection id="vertragsschluss" title={SECTIONS[2].title} index={3}>
        <P>
          Der Vertrag kommt durch Abschluss des Online-Bestellprozesses und anschließende
          Bestätigung durch Hostpartners (E-Mail oder automatisierte Aktivierung des Kontos)
          zustande. Ein Rechtsanspruch auf Vertragsschluss besteht nicht.
        </P>
        <P>
          Hostpartners kann nach eigenem Ermessen eine <Strong>kostenlose Testphase</Strong>{" "}
          von bis zu 14 Tagen gewähren. Umfang und Dauer werden im Bestellprozess angezeigt.
          Mit Ablauf der Testphase ohne Kündigung wechselt das Konto automatisch in den
          gebuchten kostenpflichtigen Tarif. Eine Kündigung der Testphase ist jederzeit über
          die Kontoeinstellungen möglich.
        </P>
        <InfoBox>
          Während der Testphase kann Hostpartners bestimmte Funktionen oder Kontingente einschränken.
          In der Testphase eingegebene Daten bleiben nach Übergang in den Regelbetrieb vollständig erhalten.
        </InfoBox>
      </LegalSection>

      <LegalSection id="preise" title={SECTIONS[3].title} index={4}>
        <P>
          Es gelten die zum Zeitpunkt des Vertragsschlusses im Bestellprozess ausgewiesenen Preise
          zuzüglich der gesetzlich geschuldeten Umsatzsteuer. Die Abrechnung erfolgt{" "}
          <Strong>monatlich im Voraus</Strong> zum Ersten des jeweiligen Kalendermonats.
        </P>
        <UL items={[
          <>Akzeptierte Zahlungsmethoden: SEPA-Lastschrift, Kreditkarte (Visa, Mastercard, American Express) sowie weitere im Checkout angebotene Verfahren.</>,
          <>Bei Zahlungsverzug gelten gesetzliche Verzugszinsen (§§ 286, 288 BGB). Nach erfolgloser Mahnung ist Hostpartners berechtigt, den Zugang zur Plattform zu sperren bis zum Ausgleich des offenen Betrags.</>,
          <>Preisanpassungen werden mindestens <Strong>4 Wochen</Strong> vor Wirksamwerden per E-Mail angekündigt. Bei einer Preiserhöhung von mehr als 10 % steht dem Kunden ein Sonderkündigungsrecht zum Zeitpunkt des Inkrafttretens zu.</>,
          <>Lizenzmengen werden monatlich abgerechnet; Änderungen (Hinzufügen oder Entfernen von Lizenzen) werden <Strong>tagesgenau anteilig</Strong> (Proration) berechnet oder gutgeschrieben.</>,
          <>Alle Preise verstehen sich netto zuzüglich der jeweils geltenden gesetzlichen Mehrwertsteuer.</>,
        ]} />
      </LegalSection>

      <LegalSection id="lizenzen" title={SECTIONS[4].title} index={5}>
        <P>
          Hostpartners verwendet ein <Strong>1:1-Lizenzmodell</Strong>: Jede Lizenz entspricht
          genau einem Benutzeraccount. Die Nutzung einer Lizenz durch mehrere Personen
          (Account-Sharing) ist nicht gestattet.
        </P>
        <P>
          Der Kunde verwaltet Lizenzen über das Admin Center. Das Hinzufügen und Entfernen
          von Lizenzen ist jederzeit möglich; Änderungen wirken sich auf die nächste
          Abrechnungsperiode aus (anteilig ab dem Tag der Änderung).
        </P>
        <P>
          Einzelne Lizenzen können unabhängig voneinander zum Monatsende gekündigt werden,
          ohne den Gesamtvertrag zu beenden. Die Mindestlizenzanzahl beträgt 1.
        </P>
      </LegalSection>

      <LegalSection id="mitwirkung" title={SECTIONS[5].title} index={6}>
        <P>
          Kunden sind verpflichtet, alle zur Vertragserfüllung erforderlichen Informationen
          wahrheitsgemäß anzugeben und aktuell zu halten. Insbesondere:
        </P>
        <UL items={[
          <>Pflege korrekter Rechnungs- und Kontaktdaten im Admin Center.</>,
          <>Verwaltung eigener Inhalte (Stammdaten, Dokumente, Kursunterlagen, Wissensbeiträge).</>,
          <>Kein Hochladen oder Verbreiten rechtswidriger Inhalte; Beachtung von Urheber-, Marken- und Persönlichkeitsrechten Dritter.</>,
          <>Angemessene Sicherung von Zugangsdaten (Passwörter, 2FA) sowie unverzügliche Meldung bei Kenntnis von Missbrauch an <a href="mailto:security@hostpartners.com" className="text-foreground underline underline-offset-4 hover:no-underline">security@hostpartners.com</a>.</>,
          <>Einhaltung der datenschutzrechtlichen Pflichten bei der Verarbeitung personenbezogener Mitarbeiterdaten über die Plattform; die Verantwortlichkeit i.S.d. Art. 4 Nr. 7 DSGVO verbleibt beim Kunden.</>,
        ]} />
      </LegalSection>

      <LegalSection id="nutzungsrechte" title={SECTIONS[6].title} index={7}>
        <P>
          Hostpartners räumt dem Kunden für die Dauer des Vertrags ein{" "}
          <Strong>einfaches, nicht exklusives, nicht übertragbares und nicht
          unterlizenzierbares Nutzungsrecht</Strong> an der Plattform und der
          zugehörigen Dokumentation ein, begrenzt auf den vertraglich vereinbarten Zweck.
        </P>
        <P>
          Der Kunde bleibt <Strong>Inhaber aller von ihm eingestellten Inhalte</Strong>{" "}
          (Daten, Dokumente, Kurse, Wissensartikel). Er räumt Hostpartners die zur Vertragserfüllung
          erforderlichen technischen Nutzungsrechte ein (Speicherung, Verarbeitung, Darstellung,
          Backup). Hostpartners verwendet Kundendaten ausschließlich zur Vertragserfüllung und nicht
          für eigene Zwecke.
        </P>
        <P>
          Reverse-Engineering, Dekompilierung, Disassemblierung oder sonstige Umgehung
          technischer Schutzmaßnahmen sind nicht gestattet. Automatisierte Massenabfragen
          (Scraping) bedürfen der vorherigen schriftlichen Zustimmung.
        </P>
      </LegalSection>

      <LegalSection id="verfuegbarkeit" title={SECTIONS[7].title} index={8}>
        <P>
          Hostpartners ist berechtigt, die Plattform im Rahmen der technischen Weiterentwicklung
          anzupassen, Funktionen zu ergänzen oder zu modifizieren, sofern dies dem Kunden
          zumutbar ist und der vertraglich vereinbarte Leistungsstandard erhalten bleibt.
        </P>
        <UL items={[
          <>Planbare Wartungsfenster werden mindestens <Strong>48 Stunden</Strong> im Voraus per E-Mail und auf <a href="https://status.hostpartners.com" className="text-foreground underline underline-offset-4 hover:no-underline">status.hostpartners.com</a> angekündigt und vorzugsweise außerhalb der Kernzeiten (Mo–Fr, 08:00–18:00 Uhr MEZ) durchgeführt.</>,
          <>Unvorhersehbare Störungen durch höhere Gewalt (Naturkatastrophen, Cyberangriffe, Ausfälle kritischer Infrastruktur) begründen keinen Schadensersatzanspruch und werden auf das Verfügbarkeitsziel nicht angerechnet.</>,
          <>Wesentliche Änderungen am Leistungsumfang werden dem Kunden mindestens <Strong>4 Wochen</Strong> vor Wirksamwerden in Textform mitgeteilt.</>,
        ]} />
      </LegalSection>

      <LegalSection id="haftung" title={SECTIONS[8].title} index={9}>
        <P>
          Hostpartners gewährleistet die vertragsgemäße Bereitstellung der Plattform. Bei
          Mängeln, die bei Vertragsschluss bestanden oder nachträglich auftreten, gelten
          die gesetzlichen Vorschriften zum Mängelrecht.
        </P>
        <P>
          <Strong>Unbeschränkte Haftung:</Strong> Hostpartners haftet unbeschränkt bei Vorsatz
          und grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit
          und nach dem Produkthaftungsgesetz.
        </P>
        <P>
          <Strong>Beschränkte Haftung:</Strong> Bei einfacher Fahrlässigkeit haftet Hostpartners
          nur bei der Verletzung wesentlicher Vertragspflichten (Kardinalpflichten), deren
          Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht
          und auf deren Einhaltung der Kunde regelmäßig vertrauen darf. Die Haftung ist in
          diesem Fall auf den typischen, bei Vertragsschluss vorhersehbaren Schaden begrenzt,
          höchstens jedoch auf den Betrag der im betroffenen Monat gezahlten Vergütung.
        </P>
        <P>
          Weitergehende Haftung für mittelbare Schäden, entgangenen Gewinn, Datenverlust oder
          Schäden Dritter ist — soweit gesetzlich zulässig — ausgeschlossen. Die vorstehenden
          Haftungsbeschränkungen gelten auch zugunsten von Erfüllungsgehilfen von Hostpartners.
        </P>
      </LegalSection>

      <LegalSection id="datenschutz" title={SECTIONS[9].title} index={10}>
        <P>
          Soweit der Kunde über die Plattform personenbezogene Daten seiner Mitarbeitenden
          verarbeitet, ist Hostpartners Auftragsverarbeiter i.S.d. <Strong>Art. 28 DSGVO</Strong>.
          Die Parteien schließen einen Auftragsverarbeitungsvertrag (AVV/DPA), der auf Anfrage
          bereitgestellt wird oder als Anlage zum Hauptvertrag beigefügt ist.
        </P>
        <P>
          Die Verarbeitung personenbezogener Daten des Kunden im Rahmen der Vertragsbeziehung
          (z.B. Rechnungsdaten, Kontaktpersonen) ist in unserer{" "}
          <Link href="/legal/privacy" className="text-foreground underline underline-offset-4 hover:no-underline">
            Datenschutzerklärung
          </Link>{" "}
          geregelt.
        </P>
      </LegalSection>

      <LegalSection id="laufzeit" title={SECTIONS[10].title} index={11}>
        <P>
          Verträge laufen auf <Strong>unbestimmte Zeit</Strong> und können von beiden Seiten
          mit einer Frist von <Strong>30 Tagen zum Ende des jeweiligen Kalendermonats</Strong>{" "}
          in Textform gekündigt werden, sofern im Einzelvertrag nichts anderes vereinbart ist.
        </P>
        <UL items={[
          <>Kündigung per E-Mail an <a href="mailto:kuendigung@hostpartners.com" className="text-foreground underline underline-offset-4 hover:no-underline">kuendigung@hostpartners.com</a> oder über die Kontoeinstellungen im Admin Center.</>,
          <>Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund für Hostpartners liegt insbesondere vor bei schwerwiegenden Vertragsverletzungen des Kunden, Zahlungsverzug von mehr als 60 Tagen oder bei Insolvenzantrag des Kunden.</>,
          <>Nach Vertragsende stellt Hostpartners dem Kunden einen Datenexport (Standardformate: JSON, CSV) für <Strong>30 Tage</Strong> bereit. Danach werden die Daten gemäß DSGVO und AVV endgültig gelöscht.</>,
          <>Bereits geleistete Zahlungen für den laufenden Monat werden nicht erstattet, es sei denn, die Kündigung erfolgt aus wichtigem Grund auf Veranlassung des Kunden.</>,
        ]} />
      </LegalSection>

      <LegalSection id="schluss" title={SECTIONS[11].title} index={12}>
        <UL items={[
          <><Strong>Anwendbares Recht:</Strong> Deutsches Recht unter Ausschluss des UN-Kaufrechts (CISG) und der Kollisionsnormen des internationalen Privatrechts.</>,
          <><Strong>Gerichtsstand:</Strong> Berlin, sofern der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist oder keinen allgemeinen Gerichtsstand in Deutschland hat.</>,
          <><Strong>AGB-Änderungen:</Strong> Hostpartners kündigt Änderungen mindestens 4 Wochen vor Inkrafttreten per E-Mail an. Widerspricht der Kunde nicht innerhalb von 4 Wochen nach Zugang, gelten die neuen AGB als angenommen. Auf das Widerspruchsrecht wird in der Ankündigung ausdrücklich hingewiesen.</>,
          <><Strong>Vertragsübernahme:</Strong> Hostpartners ist berechtigt, Rechte und Pflichten aus diesem Vertrag auf ein verbundenes Unternehmen (§§ 15 ff. AktG) zu übertragen. Der Kunde wird hierüber vorab informiert und hat ein Sonderkündigungsrecht.</>,
          <><Strong>Salvatorische Klausel:</Strong> Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchführbar sein oder werden, bleiben die übrigen Bestimmungen davon unberührt.</>,
          <><Strong>Schriftformerfordernis:</Strong> Änderungen und Ergänzungen dieser AGB bedürfen der Textform; mündliche Nebenabreden bestehen nicht.</>,
        ]} />
        <InfoBox>
          Stand dieser AGB: 07. April 2026. Die jeweils aktuelle Fassung ist unter{" "}
          <Link href="/legal/agb" className="text-foreground underline underline-offset-4">
            hostpartners.com/legal/agb
          </Link>{" "}
          abrufbar.
        </InfoBox>
      </LegalSection>
    </LegalShell>
  )
}

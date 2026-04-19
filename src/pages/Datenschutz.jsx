import { PageMeta } from '@/components/layout/PageMeta'

const S = {
  article: { maxWidth: 720, margin: '0 auto', padding: '72px 24px 96px', lineHeight: 1.85 },
  h1: { marginBottom: 8, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' },
  h2: { fontSize: '0.78rem', marginBottom: 12, color: 'var(--neon-blue)', letterSpacing: '0.1em', textTransform: 'uppercase' },
  section: { marginBottom: 36 },
  p: { color: 'rgba(238,242,255,0.82)', marginBottom: 12 },
  ul: { color: 'rgba(238,242,255,0.82)', paddingLeft: 20, lineHeight: 2 },
  a: { color: 'var(--neon-blue)', textDecoration: 'none' },
  small: { color: 'rgba(238,242,255,0.55)', fontSize: 13 },
}

function Section({ title, children }) {
  return (
    <section style={S.section}>
      <h2 style={S.h2}>{title}</h2>
      {children}
    </section>
  )
}

export default function Datenschutz() {
  return (
    <>
      <PageMeta
        title="Datenschutz"
        description="Datenschutzerklärung der Giga Arena Aachen gemäß DSGVO — VIWA Entertainment GmbH"
      />
      <article style={S.article}>
        <h1 style={S.h1}>Datenschutzerklärung</h1>
        <hr className="neon-line" style={{ marginBottom: 40, border: 'none' }} />

        <Section title="1. Verantwortlicher">
          <p style={S.p}>
            <strong style={{ color: 'var(--text-primary)' }}>VIWA Entertainment GmbH</strong><br />
            Holzgraben 11, 52062 Aachen<br />
            E-Mail:{' '}
            <a href="mailto:info@viwa-entertainment.de" style={S.a}>
              info@viwa-entertainment.de
            </a>
          </p>
        </Section>

        <Section title="2. Grundsätze der Datenverarbeitung">
          <p style={S.p}>
            Wir verarbeiten personenbezogene Daten nur soweit dies zur Bereitstellung einer
            funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Eine
            Verarbeitung personenbezogener Daten erfolgt regelmäßig nur nach Einwilligung der
            betroffenen Person oder wenn die Verarbeitung durch gesetzliche Vorschriften erlaubt ist.
          </p>
        </Section>

        <Section title="3. Datenerfassung auf dieser Website">
          <p style={S.p}>
            <strong style={{ color: 'var(--text-primary)' }}>Server-Log-Dateien</strong><br />
            Der Hostinganbieter dieser Website erhebt und speichert automatisch Informationen in
            sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt:
          </p>
          <ul style={S.ul}>
            <li>Browsertyp und -version</li>
            <li>verwendetes Betriebssystem</li>
            <li>Referrer-URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse (anonymisiert)</li>
          </ul>
          <p style={{ ...S.p, marginTop: 12 }}>
            Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </Section>

        <Section title="4. Kontaktformular & E-Mail-Kontakt">
          <p style={S.p}>
            Wenn du uns per E-Mail oder über unser Kontaktformular kontaktierst, werden die
            angegebenen Daten (Name, E-Mail-Adresse, Nachricht) zum Zweck der Bearbeitung der
            Anfrage gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) bzw. Art. 6 Abs. 1
            lit. f DSGVO (berechtigtes Interesse).
          </p>
        </Section>

        <Section title="5. Cookies">
          <p style={S.p}>
            Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb
            der Website unbedingt erforderlich sind. Für diese Cookies ist keine Einwilligung
            erforderlich (§ 25 Abs. 2 Nr. 2 TTDSG). Wir verwenden keine Analyse-, Marketing- oder
            Tracking-Cookies.
          </p>
        </Section>

        <Section title="6. Externe Dienste & Einbindungen">
          <p style={S.p}>
            <strong style={{ color: 'var(--text-primary)' }}>Google Maps</strong><br />
            Diese Website verlinkt auf Google Maps zur Darstellung von Wegbeschreibungen. Google
            Maps wird von Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland
            betrieben. Bei Nutzung des Links können Daten an Google übertragen werden. Weitere
            Informationen findest du in der{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" style={S.a}>
              Datenschutzerklärung von Google
            </a>
            .
          </p>
          <p style={S.p}>
            <strong style={{ color: 'var(--text-primary)' }}>Web Fonts</strong><br />
            Diese Website verwendet lokal eingebundene Schriftarten. Es findet keine Übertragung an
            externe Server statt.
          </p>
        </Section>

        <Section title="7. Deine Rechte als betroffene Person">
          <p style={S.p}>Du hast gemäß DSGVO folgende Rechte:</p>
          <ul style={S.ul}>
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
            <li>Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
          </ul>
          <p style={{ ...S.p, marginTop: 12 }}>
            Zur Geltendmachung deiner Rechte wende dich bitte an:{' '}
            <a href="mailto:info@viwa-entertainment.de" style={S.a}>
              info@viwa-entertainment.de
            </a>
          </p>
        </Section>

        <Section title="8. Datensicherheit">
          <p style={S.p}>
            Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
            personenbezogener Daten eine SSL-/TLS-Verschlüsselung. Du erkennst eine verschlüsselte
            Verbindung daran, dass die Adresszeile des Browsers von »http://« auf »https://«
            wechselt.
          </p>
        </Section>

        <Section title="9. Aufsichtsbehörde">
          <p style={S.p}>
            Zuständige Datenschutzaufsichtsbehörde ist die Landesbeauftragte für Datenschutz und
            Informationsfreiheit Nordrhein-Westfalen (LDI NRW):<br />
            <a href="https://www.ldi.nrw.de" target="_blank" rel="noreferrer" style={S.a}>
              www.ldi.nrw.de
            </a>
          </p>
        </Section>

        <section>
          <p style={S.small}>
            Stand: April 2026 &mdash; Diese Datenschutzerklärung wird bei Bedarf aktualisiert.
          </p>
        </section>
      </article>
    </>
  )
}

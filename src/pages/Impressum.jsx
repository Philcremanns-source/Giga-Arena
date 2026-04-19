import { PageMeta } from '@/components/layout/PageMeta'

export default function Impressum() {
  return (
    <>
      <PageMeta title="Impressum" description="Impressum der Giga Arena Aachen — VIWA Entertainment GmbH" />
      <article style={{ maxWidth: 680, margin: '0 auto', padding: '72px 24px 80px', lineHeight: 1.85 }}>
        <h1 style={{ marginBottom: 8, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>Impressum</h1>
        <hr className="neon-line" style={{ marginBottom: 40, border: 'none' }} />

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1rem', marginBottom: 12, color: 'var(--neon-blue)', letterSpacing: '0.08em' }}>
            ANGABEN GEMÄSS § 5 TMG
          </h2>
          <p style={{ color: 'rgba(238,242,255,0.85)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>VIWA Entertainment GmbH</strong><br />
            Holzgraben 11<br />
            52062 Aachen<br />
            Deutschland
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1rem', marginBottom: 12, color: 'var(--neon-blue)', letterSpacing: '0.08em' }}>
            KONTAKT
          </h2>
          <p style={{ color: 'rgba(238,242,255,0.85)' }}>
            E-Mail:{' '}
            <a href="mailto:info@viwa-entertainment.de" style={{ color: 'var(--neon-blue)' }}>
              info@viwa-entertainment.de
            </a>
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1rem', marginBottom: 12, color: 'var(--neon-blue)', letterSpacing: '0.08em' }}>
            HANDELSREGISTER
          </h2>
          <p style={{ color: 'rgba(238,242,255,0.85)' }}>
            Registergericht: Amtsgericht Aachen<br />
            Registernummer: HRB XXXXX
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1rem', marginBottom: 12, color: 'var(--neon-blue)', letterSpacing: '0.08em' }}>
            UMSATZSTEUER-ID
          </h2>
          <p style={{ color: 'rgba(238,242,255,0.85)' }}>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
            DE XXXXXXXXX
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1rem', marginBottom: 12, color: 'var(--neon-blue)', letterSpacing: '0.08em' }}>
            VERANTWORTLICH FÜR DEN INHALT
          </h2>
          <p style={{ color: 'rgba(238,242,255,0.85)' }}>
            Geschäftsführung der VIWA Entertainment GmbH<br />
            Holzgraben 11, 52062 Aachen
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1rem', marginBottom: 12, color: 'var(--neon-blue)', letterSpacing: '0.08em' }}>
            HAFTUNGSAUSSCHLUSS
          </h2>
          <p style={{ color: 'rgba(238,242,255,0.75)', fontSize: 14, lineHeight: 1.8 }}>
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte
            externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber
            verantwortlich. Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die
            Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr
            übernehmen.
          </p>
        </section>
      </article>
    </>
  )
}

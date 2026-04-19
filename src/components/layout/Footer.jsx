import { NavLink } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'

export function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 4,
        marginTop: 80,
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      {/* Animated neon line at top */}
      <div className="neon-line" style={{ height: 1, opacity: 0.6 }} />

      <div
        style={{
          width: 'min(1200px, calc(100% - 32px))',
          margin: '0 auto',
          padding: '52px 0 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 24,
        }}
      >
        {/* Brand column */}
        <div style={{ display: 'grid', gap: 14 }}>
          <Logo />
          <p style={{ color: 'rgba(238,242,255,0.65)', maxWidth: 260, fontSize: 14, lineHeight: 1.7 }}>
            Aachens Arcade- und VR-Erlebniswelt. Retro-Automaten, Room-Scale VR und Racing auf
            Spitzenniveau &mdash; mitten in der City.
          </p>
          {/* Status dot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              display: 'inline-block',
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--neon-green)',
              boxShadow: '0 0 8px var(--neon-green)',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }} />
            <span style={{ fontSize: 12, color: 'rgba(238,242,255,0.55)', letterSpacing: '0.06em' }}>
              SYSTEM ONLINE
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--neon-blue)', marginBottom: 4 }}>
            NAVIGATION
          </div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/attraktionen">Attraktionen</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/preise">Preise</NavLink>
          <NavLink to="/kontakt">Kontakt</NavLink>
          <NavLink to="/karte">Karte & Anfahrt</NavLink>
        </div>

        {/* Hours */}
        <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--neon-blue)', marginBottom: 4 }}>
            ÖFFNUNGSZEITEN
          </div>
          <div style={{ color: 'rgba(238,242,255,0.72)', fontSize: 14, lineHeight: 1.7 }}>
            <div>Mo&ndash;Do: 13:00&ndash;23:00</div>
            <div>Fr: 13:00&ndash;01:00</div>
            <div>Sa: 12:00&ndash;01:00</div>
            <div>So: 12:00&ndash;23:00</div>
          </div>
        </div>

        {/* Contact */}
        <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--neon-blue)', marginBottom: 4 }}>
            KONTAKT
          </div>
          <div style={{ color: 'rgba(238,242,255,0.72)', fontSize: 14 }}>Holzgraben 11</div>
          <div style={{ color: 'rgba(238,242,255,0.72)', fontSize: 14 }}>52062 Aachen</div>
          <a href="mailto:info@viwa-entertainment.de" style={{ fontSize: 14 }}>
            info@viwa-entertainment.de
          </a>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Holzgraben+11+52062+Aachen"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 14 }}
          >
            Route planen →
          </a>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '14px 0',
          color: 'var(--text-muted)',
          fontSize: 12,
        }}
      >
        <div
          style={{
            width: 'min(1200px, calc(100% - 32px))',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ letterSpacing: '0.06em' }}>© 2026 VIWA Entertainment GmbH</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <NavLink to="/impressum">Impressum</NavLink>
            <NavLink to="/datenschutz">Datenschutz</NavLink>
          </div>
        </div>
      </div>

      <style>{`
        footer a { color: rgba(238,242,255,0.65); text-decoration: none; font-size: 14px; transition: color 200ms; }
        footer a:hover { color: var(--neon-blue); }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 900px) {
          footer > div:nth-child(2) { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 520px) {
          footer > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

export default Footer

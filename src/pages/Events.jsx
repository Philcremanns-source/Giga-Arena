import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { PricingCard } from '@/components/ui/PricingCard'
import { PageMeta } from '@/components/layout/PageMeta'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { GlitchText } from '@/components/motion/GlitchText'

const BASE = 'https://www.giga-arena.de'

const TABS = [
  { id: 'geburtstag', label: 'Geburtstag' },
  { id: 'jga',        label: 'JGA / Männerabend' },
  { id: 'firma',      label: 'Firmenevent' },
  { id: 'schule',     label: 'Schulausflug' },
]

const PACKAGES = {
  geburtstag: [
    {
      name: 'STARTER',
      price: 'ab 15€',
      credits: '20',
      badge: null,
      features: ['Arcade 2 Stunden', 'Gruppenbereich reserviert', 'Bis 8 Personen'],
    },
    {
      name: 'PARTY',
      price: 'ab 25€',
      credits: '50',
      badge: 'Beliebteste Wahl',
      featured: true,
      features: ['Arcade + VR 3 Stunden', 'Reservierter Bereich', 'Getränke-Flatrate', 'Bis 16 Personen'],
    },
    {
      name: 'PREMIUM',
      price: 'Auf Anfrage',
      credits: '135+',
      badge: null,
      features: ['Exklusiver Bereich', 'Racing Simulator inklusive', 'Catering inklusive', 'Unbegrenzte Personen'],
    },
  ],
  jga: [
    {
      name: 'ABEND',
      price: 'ab 20€',
      credits: '40',
      badge: null,
      features: ['3 Stunden Arcade', 'Gruppenbereich', 'Bis 10 Personen'],
    },
    {
      name: 'CHALLENGE',
      price: 'ab 30€',
      credits: '70',
      badge: 'Empfohlen',
      featured: true,
      features: ['Racing-Simulator-Wettbewerb', 'VR-Gruppenspiele', 'Getränke-Paket', 'Bis 16 Personen'],
    },
    {
      name: 'VIP',
      price: 'Auf Anfrage',
      credits: '150+',
      badge: null,
      features: ['Komplette Exklusivbuchung', 'Racing + VR + Arcade', 'Bar-Paket', 'Unbegrenzte Personen'],
    },
  ],
  firma: [
    {
      name: 'TEAM',
      price: 'ab 25€',
      credits: '50',
      badge: null,
      features: ['3 Stunden Arcade + VR', 'Gruppenbereich', 'Bis 15 Personen'],
    },
    {
      name: 'CORPORATE',
      price: 'ab 40€',
      credits: '90',
      badge: 'Meistgebucht',
      featured: true,
      features: ['Racing-Simulator-Turnier', 'VR-Teambuilding', 'Catering-Option', 'Bis 30 Personen'],
    },
    {
      name: 'ENTERPRISE',
      price: 'Auf Anfrage',
      credits: '200+',
      badge: null,
      features: ['Komplette Exklusivbuchung', 'Individuelles Programm', 'Full-Service-Catering', 'Bis 80 Personen'],
    },
  ],
  schule: [
    {
      name: 'KLASSE',
      price: 'ab 12€',
      credits: '20',
      badge: null,
      features: ['2 Stunden Arcade', 'Lehrerbegleitung frei', 'Ab 10 Schüler'],
    },
    {
      name: 'ERLEBNIS',
      price: 'ab 18€',
      credits: '40',
      badge: 'Empfohlen',
      featured: true,
      features: ['Arcade + VR 3 Stunden', 'Einführung durch Personal', 'Gruppenbereich', 'Ab 15 Schüler'],
    },
    {
      name: 'PROJEKTTAG',
      price: 'Auf Anfrage',
      credits: '80+',
      badge: null,
      features: ['Ganztages-Programm', 'Pädagogische Begleitung', 'Catering-Option', 'Ab 20 Schüler'],
    },
  ],
}

const TIMELINE = [
  { step: '01', title: 'Anfragen', text: 'Schreib uns dein Datum, die Gruppengrö&szlig;e und dein Wunschpaket.' },
  { step: '02', title: 'Bestätigung', text: 'Wir melden uns innerhalb von 24 Stunden mit einem individuellen Angebot.' },
  { step: '03', title: 'Event erleben', text: 'Komm pünktlich, dein Bereich wartet &mdash; wir kümmern uns um den Rest.' },
  { step: '04', title: 'Erinnerungen mitnehmen', text: 'Bestzeiten auf dem Simulator, VR-Highscores und unvergessliche Momente.' },
]

export default function Events() {
  const [tab, setTab] = useState('geburtstag')

  return (
    <>
      <PageMeta
        title="Events"
        description="Geburtstag, JGA, Firmenevent oder Schulausflug — die Giga Arena plant dein Event von A bis Z. Pakete ab 15 € pro Person."
      />
      {/* §1 HERO */}
      <section style={{ position: 'relative', height: '60svh', minHeight: 380, overflow: 'hidden' }}>
        <img
          src={`${BASE}/photos/graffiti-mural.jpg`}
          alt="Giga Arena — Events und Feiern"
          width={1920}
          height={1080}
          loading="eager"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(7,9,15,0.9))',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: 56,
        }}>
          <div style={{ width: 'min(1200px, calc(100% - 32px))', margin: '0 auto' }}>
            <ScrollReveal>
              <h1 style={{ marginBottom: 14 }}>
                <GlitchText duration={1000} delay={100}>DEIN EVENT. UNSER SPIELFELD.</GlitchText>
              </h1>
              <p style={{ color: 'rgba(238,242,255,0.82)', maxWidth: 540 }}>
                Geburtstag, JGA, Firmenevent oder Schulausflug &mdash; wir planen mit dir.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* §2 TABS + PRICING */}
      <section style={{ padding: '72px 0 0' }}>
        <div style={{ width: 'min(1200px, calc(100% - 32px))', margin: '0 auto' }}>
          <ScrollReveal>
            {/* Tab Row */}
            <div style={{
              display: 'flex',
              gap: 4,
              marginBottom: 40,
              borderBottom: '1px solid var(--border-subtle)',
              overflowX: 'auto',
              paddingBottom: 0,
            }}>
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    padding: '12px 20px',
                    background: 'none',
                    border: 'none',
                    borderBottom: tab === t.id ? '2px solid var(--neon-blue)' : '2px solid transparent',
                    color: tab === t.id ? 'var(--text-primary)' : 'var(--text-muted)',
                    fontWeight: tab === t.id ? 700 : 500,
                    fontSize: 14,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    minHeight: 44,
                    transition: 'color 200ms, border-color 200ms',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Pricing cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 20,
                alignItems: 'start',
              }}
            >
              {PACKAGES[tab].map((pkg, i) => (
                <PricingCard
                  key={pkg.name}
                  {...pkg}
                  onSelect={() => {}}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* §3 TIMELINE */}
      <section style={{ padding: '96px 0 0' }}>
        <div style={{ width: 'min(1200px, calc(100% - 32px))', margin: '0 auto' }}>
          <ScrollReveal>
            <h2 style={{ marginBottom: 48, whiteSpace: 'normal', textAlign: 'center' }}>
              SO LÄUFT ES AB
            </h2>
          </ScrollReveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
            position: 'relative',
          }}>
            {TIMELINE.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', textAlign: 'center' }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    border: '2px solid var(--neon-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 18,
                    color: 'var(--neon-blue)',
                    background: 'rgba(0,200,255,0.08)',
                    boxShadow: 'var(--glow-blue)',
                    flexShrink: 0,
                  }}>
                    {step.step}
                  </div>
                  <h3 style={{ whiteSpace: 'normal' }}>{step.title}</h3>
                  <p
                    style={{ color: 'rgba(238,242,255,0.7)', fontSize: 14, lineHeight: 1.6 }}
                    dangerouslySetInnerHTML={{ __html: step.text }}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div style={{ textAlign: 'center', marginTop: 56 }}>
              <Button as={Link} to="/kontakt" variant="primary">
                Event anfragen
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* §4 GALLERY */}
      <section style={{ padding: '96px 0 80px' }}>
        <div style={{ width: 'min(1200px, calc(100% - 32px))', margin: '0 auto' }}>
          <ScrollReveal>
            <h2 style={{ marginBottom: 32 }}>IMPRESSIONEN</h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { src: `${BASE}/photos/arcade-hall.jpg`, alt: 'Giga Arena Spielhalle in Aachen' },
              { src: `${BASE}/photos/racing-sim.jpg`,  alt: 'Racing-Simulator-Bereich' },
              { src: `${BASE}/photos/vr-area.jpg`,     alt: 'VR-Bereich mit PICO-Headsets' },
              { src: `${BASE}/photos/graffiti-mural.jpg`, alt: 'Atmosphärisches Graffiti-Mural' },
            ].map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '16/9', position: 'relative' }}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={340}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
          section div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
          section div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

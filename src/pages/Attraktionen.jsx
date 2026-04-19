import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { PageMeta } from '@/components/layout/PageMeta'
import { FilterBar } from '@/components/ui/FilterBar'
import { AttractionCard } from '@/components/ui/AttractionCard'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { attractions, attractionCategories } from '@/data/attractions'
import { GlitchText } from '@/components/motion/GlitchText'

const BASE = 'https://www.giga-arena.de'
const racing = attractions.find((a) => a.id === 'racing-simulator')

export default function Attraktionen() {
  const [activeCategory, setActiveCategory] = useState('Alle')

  const filtered = activeCategory === 'Alle'
    ? attractions.filter((a) => a.id !== 'racing-simulator')
    : attractions.filter((a) => a.category === activeCategory && a.id !== 'racing-simulator')

  return (
    <>
      <PageMeta
        title="Attraktionen"
        description="Racing Simulator, Room-Scale VR, Classic Arcade und mehr — über 50 Attraktionen in der Giga Arena Aachen. Jetzt entdecken."
      />
      {/* §1 HERO */}
      <section style={{ position: 'relative', height: '60svh', minHeight: 380, overflow: 'hidden' }}>
        <img
          src={`${BASE}/photos/arcade-hall.jpg`}
          alt="Giga Arena Aachen — Spielhallen-Übersicht"
          width={1920}
          height={1080}
          loading="eager"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(7,9,15,0.88))',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: 56,
        }}>
          <div style={{ width: 'min(1200px, calc(100% - 32px))', margin: '0 auto' }}>
            <ScrollReveal>
              <h1 style={{ marginBottom: 16 }}>
                <GlitchText duration={1000} delay={100}>UNSERE ATTRAKTIONEN</GlitchText>
              </h1>
              <p style={{ color: 'rgba(238,242,255,0.82)', maxWidth: 540 }}>
                Von der Rennstrecke bis zum Retroarcade &mdash; alles unter einem Dach.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* §2 RACING FEATURED */}
      <section style={{ padding: '72px 0 0' }}>
        <div style={{
          width: 'min(1200px, calc(100% - 32px))',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '55% 1fr',
          gap: 48,
          alignItems: 'center',
        }}>
          <ScrollReveal>
            <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3' }}>
              <img
                src={`${BASE}/photos/racing-sim.jpg`}
                alt="Profi-Racing-Simulator der Giga Arena"
                width={700}
                height={525}
                loading="eager"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div style={{ display: 'grid', gap: 16, position: 'relative', paddingLeft: 24 }}>
              <div style={{
                position: 'absolute',
                left: 0, top: 0, bottom: 0,
                width: 3,
                background: 'var(--neon-blue)',
                boxShadow: 'var(--glow-blue)',
                borderRadius: 999,
              }} />
              <Badge color="yellow">Nr. 2 in Europa &mdash; Bester Racing Simulator Aachens</Badge>
              <h2 style={{ whiteSpace: 'normal', lineHeight: 1.1 }}>
                RACING SIMULATOR
              </h2>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['1–4 Spieler', 'Alle Schwierigkeitsgrade', 'Force Feedback'].map((tag) => (
                  <span key={tag} className="badge" style={{
                    background: 'rgba(0,200,255,0.1)',
                    border: '1px solid rgba(0,200,255,0.2)',
                    color: 'var(--neon-blue)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              <p style={{ color: 'rgba(238,242,255,0.78)', lineHeight: 1.75 }}>
                Professionelles Multi-Screen-Cockpit, authentisches Fahrgefühl, präzise
                Force-Feedback-Technik &mdash; für Einsteiger und erfahrene Fahrer. Gehört zu
                den zwei besten Racing Simulatoren in ganz Europa.
              </p>
              <Button as={Link} to="/preise" variant="primary" style={{ alignSelf: 'flex-start' }}>
                Credits kaufen
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* §3 FILTER BAR */}
      <div style={{ marginTop: 64 }}>
        <FilterBar
          categories={attractionCategories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* §4 GRID */}
      <section style={{ padding: '40px 0 80px' }}>
        <div style={{ width: 'min(1200px, calc(100% - 32px))', margin: '0 auto' }}>
          <motion.div layout style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((attraction) => (
                <motion.div
                  key={attraction.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AttractionCard {...attraction} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              Keine Attraktionen in dieser Kategorie gefunden.
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section > div[style*="55%"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

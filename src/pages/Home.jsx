import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageMeta } from '@/components/layout/PageMeta'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { GlassCard } from '@/components/ui/GlassCard'
import { Card3D } from '@/components/motion/Card3D'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { Counter } from '@/components/motion/Counter'
import { Marquee } from '@/components/motion/Marquee'
import { GlitchText } from '@/components/motion/GlitchText'
import { AttractionCard } from '@/components/ui/AttractionCard'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { attractions } from '@/data/attractions'
import './Home.css'

const BASE = 'https://www.giga-arena.de'

const MARQUEE_ITEMS = [
  'RACING SIMULATOR',
  'VR',
  'ARCADE',
  'AIR HOCKEY',
  'GEBURTSTAGE',
  'FIRMENEVENTS',
  'SKY FIGHTER',
  'GUN STORM',
  'SPEED RACER',
  'JGA',
  'SCHULAUSFLUG',
]

const testimonials = [
  {
    name: 'Lukas M.',
    text: 'Der Racing Simulator hat mich komplett umgehauen. So viel Realismus hatte ich nicht erwartet. Wir kommen definitiv wieder.',
    date: 'März 2026',
    rating: 5,
  },
  {
    name: 'Sarah K.',
    text: 'Tolle Location für Gruppenevents. Die Mitarbeiter waren super freundlich und der VR-Bereich hat uns alle begeistert.',
    date: 'Februar 2026',
    rating: 5,
  },
  {
    name: 'Jonas T.',
    text: 'Fantastische Auswahl an Attraktionen. Das Preis-Leistungs-Verhältnis mit dem Credit-System ist absolut fair.',
    date: 'Januar 2026',
    rating: 5,
  },
]

export default function Home() {
  const heroRef = useRef(null)
  const [imgError, setImgError] = useState(false)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <>
      <PageMeta
        title="Home"
        description="Aachens größte Indoor-Erlebniswelt — über 50 Attraktionen: Racing Simulator (Nr. 2 in Europa), Room-Scale VR, Classic Arcade. Kein Eintritt."
      />
      {/* §1 HERO */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          height: '100svh',
          minHeight: 600,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            y: heroY,
            willChange: 'transform',
          }}
        >
          {!imgError ? (
            <img
              src={`${BASE}/photos/arcade-hall.jpg`}
              alt="Giga Arena Aachen — Spielhallen-Atmosphäre"
              width={1920}
              height={1080}
              fetchPriority="high"
              loading="eager"
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #07090F 0%, #0D1120 40%, #131929 100%)',
            }} />
          )}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(7,9,15,0.3) 50%, rgba(7,9,15,0.85) 100%)',
          }} />
        </motion.div>

        {/* HUD corner decorations */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}>
          {/* top-left bracket */}
          <div style={{ position: 'absolute', top: 80, left: 24, width: 32, height: 32,
            borderTop: '2px solid rgba(0,200,255,0.6)', borderLeft: '2px solid rgba(0,200,255,0.6)' }} />
          {/* top-right bracket */}
          <div style={{ position: 'absolute', top: 80, right: 24, width: 32, height: 32,
            borderTop: '2px solid rgba(0,200,255,0.6)', borderRight: '2px solid rgba(0,200,255,0.6)' }} />
          {/* bottom-right bracket */}
          <div style={{ position: 'absolute', bottom: 60, right: 24, width: 32, height: 32,
            borderBottom: '2px solid rgba(0,200,255,0.3)', borderRight: '2px solid rgba(0,200,255,0.3)' }} />
          {/* HUD readout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            style={{
              position: 'absolute', top: 92, right: 48,
              fontFamily: 'monospace', fontSize: 11,
              color: 'rgba(0,200,255,0.55)', letterSpacing: '0.1em',
              lineHeight: 1.8,
            }}
          >
            <div>SYS: ONLINE</div>
            <div>LOC: AACHEN-DE</div>
            <div>ATTR: 50+</div>
          </motion.div>
          {/* scan line */}
          <motion.div
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(0,200,255,0.18), transparent)',
            }}
          />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 2,
          width: 'min(1200px, calc(100% - 32px))',
          margin: '0 auto',
          paddingTop: 'calc(var(--ticker-h) + var(--nav-h))',
        }}>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.01 }}
            style={{
              fontSize: 'clamp(2.2rem, 7vw, 5.5rem)',
              letterSpacing: '-0.04em',
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            <GlitchText as="span" duration={1100} delay={200} style={{ display: 'block' }}>
              DEIN SPIELFELD.
            </GlitchText>
            <GlitchText as="span" duration={1100} delay={700} style={{ display: 'block', color: 'var(--neon-blue)' }}>
              DEINE REGELN.
            </GlitchText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
            style={{
              fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
              color: 'rgba(238,242,255,0.88)',
              marginBottom: 36,
              maxWidth: 520,
            }}
          >
            Aachens gr&ouml;&szlig;te Indoor-Erlebniswelt &mdash; Arcade, VR &amp; Racing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5, ease: 'easeOut' }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <Button as={Link} to="/attraktionen" variant="primary">
              Arena betreten
            </Button>
            <Button as={Link} to="/events" variant="secondary">
              Events entdecken
            </Button>
          </motion.div>

        </div>

        {/* Scroll indicator — anchored to bottom of section, outside content div */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            position: 'absolute',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            pointerEvents: 'none',
          }}
        >
          <motion.div
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 1,
              height: 40,
              background: 'linear-gradient(to bottom, rgba(0,200,255,0.8), transparent)',
              transformOrigin: 'top',
            }}
          />
          <span style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Entdecken
          </span>
        </motion.div>
      </section>

      {/* §2 MARQUEE */}
      <section style={{ marginTop: 40 }}>
        <Marquee items={MARQUEE_ITEMS} direction="left"  speed={28} color="var(--neon-pink)" />
        <Marquee items={MARQUEE_ITEMS} direction="right" speed={32} color="rgba(244,63,142,0.55)" />
      </section>

      {/* §3 RACING SIMULATOR SPOTLIGHT */}
      <section style={{ padding: '96px 0 0', position: 'relative', overflow: 'hidden' }}>
        <div className="section-num" style={{ position: 'absolute', top: 32, right: -12, userSelect: 'none', pointerEvents: 'none' }}>01</div>
        <div className="two-col-spotlight" style={{
          width: 'min(1200px, calc(100% - 32px))',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '55% 1fr',
          gap: 56,
          alignItems: 'center',
        }}>
          <ScrollReveal>
            <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3' }}>
              <img
                src={`${BASE}/photos/racing-sim.jpg`}
                alt="Profi-Racing-Simulator — Nr. 2 in Europa"
                width={700}
                height={525}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div style={{ position: 'relative', display: 'grid', gap: 18, paddingLeft: 24, minWidth: 0 }}>
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 3,
                background: 'var(--neon-blue)',
                boxShadow: 'var(--glow-blue)',
                borderRadius: 999,
              }} />

              <Badge color="yellow">Nr. 2 in Europa</Badge>

              <h2 style={{ whiteSpace: 'normal', lineHeight: 1.1 }}>
                RACING AUF EUROPÄISCHEM SPITZENNIVEAU.
              </h2>

              <p style={{ color: 'rgba(238,242,255,0.78)', lineHeight: 1.75 }}>
                Unser Racing Simulator gehört zu den zwei besten in ganz Europa. Professionelles
                Multi-Screen-Cockpit, authentisches Fahrgefühl, präzise Force-Feedback-Technik
                &mdash; für Einsteiger und erfahrene Fahrer.
              </p>

              <Button as={Link} to="/attraktionen" variant="primary" style={{ alignSelf: 'flex-start' }}>
                Simulator erleben
              </Button>
            </div>
          </ScrollReveal>
        </div>

      </section>

      {/* §4 USP STRIP */}
      <section style={{ padding: '96px 0 0', position: 'relative', overflow: 'hidden' }}>
        <div className="section-num" style={{ position: 'absolute', top: 32, left: -8, userSelect: 'none', pointerEvents: 'none' }}>02</div>
        <div className="home-usp-grid" style={{
          width: 'min(1200px, calc(100% - 32px))',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
        }}>
          {[
            { stat: 50, suffix: '+', label: 'Attraktionen' },
            { stat: 2, prefix: '#', label: 'Racing Simulator in Europa' },
            { stat: 7, label: 'Tage die Woche geöffnet' },
            { stat: 0, prefix: '', suffix: '€', label: 'Eintritt — du zahlst nur, was du spielst' },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Card3D style={{ height: '100%' }}>
                <GlassCard style={{ padding: '28px 22px', textAlign: 'center', height: '100%' }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                    letterSpacing: '-0.04em',
                    color: 'var(--neon-blue)',
                    lineHeight: 1,
                  }}>
                    {item.prefix ?? ''}
                    <Counter target={item.stat} suffix={item.suffix ?? ''} />
                  </div>
                  <p style={{ color: 'rgba(238,242,255,0.78)', fontSize: 14, marginTop: 10, lineHeight: 1.5 }}>
                    {item.label}
                  </p>
                </GlassCard>
              </Card3D>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* §5 ATTRACTIONS PREVIEW */}
      <section style={{ padding: '96px 0 0', position: 'relative', overflow: 'hidden' }}>
        <div className="section-num" style={{ position: 'absolute', top: 32, right: -12, userSelect: 'none', pointerEvents: 'none' }}>03</div>
        <div style={{ width: 'min(1200px, calc(100% - 32px))', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ marginBottom: 40, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <h2>UNSERE ATTRAKTIONEN</h2>
              <Link to="/attraktionen" style={{ color: 'var(--neon-blue)', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>
                Alle anzeigen
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ display: 'inline', marginLeft: 5, verticalAlign: 'middle' }}>
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <div className="home-attractions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {attractions.slice(0, 3).map((a, i) => (
              <ScrollReveal key={a.id} delay={i * 0.08}>
                <AttractionCard {...a} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* §6 EVENT TEASER */}
      <section style={{ padding: '96px 0 0' }}>
        <div style={{ width: 'min(1200px, calc(100% - 32px))', margin: '0 auto' }}>
          <ScrollReveal>
            <motion.div
              animate={{
                background: [
                  'linear-gradient(135deg, #0D1120 0%, #1A1040 50%, #0D1120 100%)',
                  'linear-gradient(135deg, #0D1120 0%, #0D2020 50%, #1A1040 100%)',
                  'linear-gradient(135deg, #1A1040 0%, #0D1120 50%, #0D2020 100%)',
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
              style={{
                borderRadius: 20,
                padding: 'clamp(40px, 6vw, 72px)',
                minHeight: 320,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: 20,
                border: '1px solid rgba(139,92,246,0.2)',
                boxShadow: 'var(--glow-purple)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                top: -60,
                right: -60,
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <h2 style={{ color: 'var(--text-primary)', whiteSpace: 'normal', position: 'relative', zIndex: 1 }}>
                GEBURTSTAG. JGA. FIRMENEVENT.
              </h2>
              <p style={{ color: 'rgba(238,242,255,0.78)', maxWidth: 520, position: 'relative', zIndex: 1 }}>
                Wir gestalten dein Event von A bis Z. Reservierter Bereich, abgestimmtes Programm
                und auf Wunsch Catering &mdash; alles aus einer Hand.
              </p>
              <Button as={Link} to="/events" variant="cta" style={{ position: 'relative', zIndex: 1 }}>
                Pakete ansehen
              </Button>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* §7 SOCIAL PROOF */}
      <section style={{ padding: '96px 0 0', position: 'relative', overflow: 'hidden' }}>
        <div className="section-num" style={{ position: 'absolute', top: 32, left: -8, userSelect: 'none', pointerEvents: 'none' }}>04</div>
        <div style={{ width: 'min(1200px, calc(100% - 32px))', margin: '0 auto' }}>
          <ScrollReveal>
            <div className="home-social-proof-strip" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)',
              marginBottom: 48,
            }}>
              {[
                { label: 'Besucher', value: 10000, suffix: '+' },
                { label: 'Events veranstaltet', value: 500, suffix: '+' },
                { label: 'Bewertung', value: 4, suffix: ',8 / 5' },
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '28px 20px',
                  textAlign: 'center',
                  background: 'var(--bg-surface)',
                  borderRight: i < 2 ? '1px solid var(--border-subtle)' : 'none',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                    letterSpacing: '-0.04em',
                    color: 'var(--neon-green)',
                    lineHeight: 1,
                  }}>
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ color: 'rgba(238,242,255,0.65)', fontSize: 14, marginTop: 8 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="home-testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <TestimonialCard {...t} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* §8 LOCATION TEASER */}
      <section style={{ padding: '96px 0 80px' }}>
        <div style={{ width: 'min(1200px, calc(100% - 32px))', margin: '0 auto' }}>
          <ScrollReveal>
            <div className="home-location-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center' }}>
              {/* Left: info */}
              <div style={{ display: 'grid', gap: 20 }}>
                <h2 style={{ whiteSpace: 'normal' }}>SO FINDEST DU UNS</h2>
                <div style={{ display: 'grid', gap: 12, color: 'rgba(238,242,255,0.78)' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Adresse</div>
                    <div>Holzgraben 11, 52062 Aachen</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Öffnungszeiten</div>
                    <div>So&ndash;Do: 13:00&ndash;23:00 Uhr</div>
                    <div>Fr&ndash;Sa: 12:00&ndash;01:00 Uhr</div>
                  </div>
                </div>
                <Button
                  as="a"
                  href="https://www.google.com/maps/dir/?api=1&destination=Holzgraben+11+52062+Aachen"
                  variant="secondary"
                  style={{ alignSelf: 'flex-start' }}
                >
                  Route planen
                </Button>
              </div>

              {/* Right: styled map card */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Holzgraben+11+52062+Aachen"
                target="_blank"
                rel="noreferrer"
                aria-label="Route zur Giga Arena auf Google Maps planen"
              >
                <GlassCard style={{
                  padding: 28,
                  minHeight: 220,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 14,
                  backgroundImage: 'linear-gradient(rgba(0,200,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.045) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="16" r="6" stroke="var(--neon-blue)" strokeWidth="2.5"/>
                    <path d="M18 2C10.27 2 4 8.13 4 15.78 4 23.43 18 34 18 34S32 23.43 32 15.78C32 8.13 25.73 2 18 2z" stroke="var(--neon-blue)" strokeWidth="2.5" fill="none"/>
                  </svg>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>Holzgraben 11</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>52062 Aachen &mdash; Innenstadt</div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--neon-blue)', fontWeight: 600 }}>
                    Auf Google Maps öffnen
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: 'inline', marginLeft: 4, verticalAlign: 'middle' }}>
                      <path d="M2 10L10 2M5 2h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </GlassCard>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </>
  )
}

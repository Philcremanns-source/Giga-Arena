import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { PageMeta } from '@/components/layout/PageMeta'
import { Badge } from '@/components/ui/Badge'
import { GlassCard } from '@/components/ui/GlassCard'
import { Accordion } from '@/components/ui/Accordion'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { GlitchText } from '@/components/motion/GlitchText'
import { faq } from '@/data/faq'

const PACKAGES = [
  {
    name: 'Starter',
    price: '10€',
    credits: 20,
    badge: null,
    note: 'Zum Kennenlernen',
  },
  {
    name: 'Standard',
    price: '20€',
    credits: 50,
    badge: 'Beliebt',
    featured: true,
    note: '0,40€ pro Credit',
  },
  {
    name: 'Plus',
    price: '50€',
    credits: 135,
    badge: null,
    note: '0,37€ pro Credit',
  },
  {
    name: 'Premium',
    price: '100€',
    credits: 285,
    badge: 'Beste Preis-Leistung',
    note: '0,35€ pro Credit',
  },
]

const HOW_IT_WORKS = [
  {
    title: 'Credits kaufen',
    text: 'Wähle dein Paket an der Kasse oder am Automaten und lade Credits auf deine Giga Arena Karte.',
  },
  {
    title: 'Spiele wählen',
    text: 'Halte deine Karte an die Attraktion deiner Wahl und die Credits werden automatisch abgezogen.',
  },
  {
    title: 'Nur zahlen, was du spielst',
    text: 'Kein Eintritt, keine versteckten Kosten. Restguthaben bleibt auf deiner Karte und verfällt nicht.',
  },
]

export default function Preise() {
  return (
    <>
      <PageMeta
        title="Preise & Credits"
        description="Kein Eintritt — du zahlst nur, was du spielst. Credits ab 10 €. Starter, Standard, Plus und Premium Pakete in der Giga Arena Aachen."
      />
      {/* §1 HERO */}
      <section style={{
        minHeight: '50svh',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: 64,
        position: 'relative',
        background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-surface) 50%, var(--bg-primary) 100%)',
        overflow: 'hidden',
      }}>
        <motion.div
          aria-hidden="true"
          animate={{
            background: [
              'radial-gradient(ellipse 60% 50% at 20% 60%, rgba(0,200,255,0.12) 0%, transparent 70%)',
              'radial-gradient(ellipse 60% 50% at 80% 40%, rgba(0,200,255,0.12) 0%, transparent 70%)',
              'radial-gradient(ellipse 60% 50% at 20% 60%, rgba(0,200,255,0.12) 0%, transparent 70%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        />
        <div style={{ width: 'min(1200px, calc(100% - 32px))', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <h1 style={{ marginBottom: 14, color: 'var(--neon-blue)' }}>
              <GlitchText duration={1000} delay={100}>TRANSPARENT. FAIR. EINFACH.</GlitchText>
            </h1>
            <p style={{ color: 'rgba(238,242,255,0.82)', maxWidth: 540 }}>
              Du kaufst Credits und nutzt sie für deine Lieblingsattraktionen. Kein Eintritt,
              keine Überraschungen &mdash; nur das, was du wirklich spielst.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* §2 CREDIT PACKAGES */}
      <section style={{ padding: '72px 0 0' }}>
        <div style={{ width: 'min(1200px, calc(100% - 32px))', margin: '0 auto' }}>
          <ScrollReveal>
            <h2 style={{ marginBottom: 40 }}>CREDIT-PAKETE</h2>
          </ScrollReveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            alignItems: 'end',
          }}>
            {PACKAGES.map((pkg, i) => (
              <ScrollReveal key={pkg.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <GlassCard style={{
                    padding: '28px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    position: 'relative',
                    border: pkg.featured
                      ? '1px solid rgba(139,92,246,0.45)'
                      : '1px solid var(--border-subtle)',
                    boxShadow: pkg.featured ? 'var(--glow-purple)' : 'none',
                    transform: pkg.featured ? 'scale(1.04)' : 'scale(1)',
                  }}>
                    {pkg.badge && (
                      <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)' }}>
                        <Badge color={pkg.featured ? 'purple' : 'blue'}>{pkg.badge}</Badge>
                      </div>
                    )}

                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                      {pkg.name}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 'clamp(2rem, 4vw, 2.6rem)',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      color: pkg.featured ? 'var(--neon-purple)' : 'var(--text-primary)',
                    }}>
                      {pkg.price}
                    </div>
                    <div style={{ color: 'var(--neon-blue)', fontWeight: 600, fontSize: 16 }}>
                      {pkg.credits} Credits
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                      {pkg.note}
                    </div>
                    <Button
                      as={Link}
                      to="/kontakt"
                      variant={pkg.featured ? 'cta' : 'secondary'}
                      style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
                    >
                      Auswählen
                    </Button>
                  </GlassCard>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* §3 HOW CREDITS WORK */}
      <section style={{ padding: '96px 0 0' }}>
        <div style={{ width: 'min(1200px, calc(100% - 32px))', margin: '0 auto' }}>
          <ScrollReveal>
            <h2 style={{ marginBottom: 40 }}>SO FUNKTIONIEREN CREDITS</h2>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {HOW_IT_WORKS.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <GlassCard style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'rgba(0,200,255,0.12)',
                    border: '1px solid rgba(0,200,255,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 18,
                    color: 'var(--neon-blue)',
                  }}>
                    {i + 1}
                  </div>
                  <h3 style={{ whiteSpace: 'normal' }}>{step.title}</h3>
                  <p style={{ color: 'rgba(238,242,255,0.72)', fontSize: 14, lineHeight: 1.7 }}>
                    {step.text}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* §4 VOUCHER */}
      <section style={{ padding: '96px 0 0' }}>
        <div style={{ width: 'min(1200px, calc(100% - 32px))', margin: '0 auto' }}>
          <ScrollReveal>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <GlassCard style={{
                padding: '40px 36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 32,
                flexWrap: 'wrap',
                border: '1px solid rgba(0,232,135,0.25)',
                boxShadow: 'var(--glow-green)',
              }}>
                <div style={{ display: 'grid', gap: 12, flex: 1, minWidth: 240 }}>
                  <h2 style={{ color: 'var(--neon-green)', whiteSpace: 'normal' }}>GUTSCHEINE</h2>
                  <p style={{ color: 'rgba(238,242,255,0.78)', maxWidth: 400 }}>
                    Verschenke ein unvergessliches Erlebnis. Gutscheine für beliebige Credit-Beträge
                    sind sofort erhältlich.
                  </p>
                </div>
                <Button as={Link} to="/kontakt" variant="primary" style={{ flexShrink: 0 }}>
                  Gutschein anfragen
                </Button>
              </GlassCard>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* §5 FAQ */}
      <section style={{ padding: '96px 0 80px' }}>
        <div style={{ width: 'min(1200px, calc(100% - 32px))', margin: '0 auto' }}>
          <ScrollReveal>
            <h2 style={{ marginBottom: 36 }}>HÄUFIGE FRAGEN</h2>
          </ScrollReveal>
          <Accordion items={faq} />
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          section div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          section div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 520px) {
          section div[style*="repeat(4, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

import { useMemo, useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { PageMeta } from '@/components/layout/PageMeta'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { GlassCard } from '@/components/ui/GlassCard'

// ─── 3-D MAP CARD ───────────────────────────────────────────────────────────
const MAPS_URL = 'https://www.google.com/maps/dir/?api=1&destination=Holzgraben+11+52062+Aachen'

function Map3D() {
  const cardRef = useRef(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)

  const springX = useSpring(rotX, { stiffness: 180, damping: 22 })
  const springY = useSpring(rotY, { stiffness: 180, damping: 22 })

  const handleMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotX.set(-y * 18)
    rotY.set(x * 18)
  }
  const handleLeave = () => {
    rotX.set(0)
    rotY.set(0)
  }

  return (
    <a
      href={MAPS_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Route zur Giga Arena Aachen auf Google Maps planen"
      style={{ display: 'block', textDecoration: 'none' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          perspective: 900,
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
        }}
      >
        <GlassCard
          style={{
            padding: '36px 32px',
            minHeight: 360,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            backgroundImage: [
              'linear-gradient(rgba(0,200,255,0.06) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(0,200,255,0.06) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '28px 28px',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(0,200,255,0.18)',
          }}
        >
          {/* Glow blob */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Pulse rings */}
          {[1, 2, 3].map((n) => (
            <motion.div
              key={n}
              animate={{ scale: [1, 1.5 + n * 0.3], opacity: [0.5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: n * 0.6, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: '1.5px solid var(--neon-blue)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
          ))}

          {/* Pin SVG */}
          <motion.div
            style={{ position: 'relative', zIndex: 3 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="48" height="60" viewBox="0 0 48 60" fill="none">
              <path
                d="M24 0C10.75 0 0 10.75 0 24C0 42 24 60 24 60C24 60 48 42 48 24C48 10.75 37.25 0 24 0Z"
                fill="rgba(0,200,255,0.15)"
                stroke="var(--neon-blue)"
                strokeWidth="2"
              />
              <circle cx="24" cy="24" r="8" fill="var(--neon-blue)" />
            </svg>
          </motion.div>

          {/* Info */}
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 3, transform: 'translateZ(20px)' }}>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
              GIGA ARENA AACHEN
            </div>
            <div style={{ color: 'rgba(238,242,255,0.65)', fontSize: 14, marginTop: 4 }}>
              Holzgraben 11 &mdash; 52062 Aachen
            </div>
          </div>

          {/* Info tags */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 3 }}>
            {[
              { icon: '🕐', label: 'So–Do: 13–23 Uhr' },
              { icon: '🕐', label: 'Fr–Sa: 12–01 Uhr' },
              { icon: '🚗', label: 'Parkhaus Holzgraben' },
            ].map((tag) => (
              <div key={tag.label} style={{
                background: 'rgba(0,200,255,0.08)',
                border: '1px solid rgba(0,200,255,0.2)',
                borderRadius: 999,
                padding: '4px 12px',
                fontSize: 12,
                color: 'rgba(238,242,255,0.8)',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}>
                <span>{tag.icon}</span>
                <span>{tag.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: 'var(--neon-blue)',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.06em',
            position: 'relative',
            zIndex: 3,
          }}>
            Route auf Google Maps
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M6 2h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Corner brackets */}
          {['tl', 'tr', 'bl', 'br'].map((c) => (
            <div key={c} className={`bracket-${c}`} style={{
              position: 'absolute',
              width: 16,
              height: 16,
              borderColor: 'rgba(0,200,255,0.4)',
              borderStyle: 'solid',
              borderWidth: c.includes('t') ? '2px 0 0' : '0 0 2px',
              ...(c.includes('l') ? { left: 12, borderLeftWidth: 2, borderRightWidth: 0 } : { right: 12, borderRightWidth: 2, borderLeftWidth: 0 }),
              ...(c.includes('t') ? { top: 12 } : { bottom: 12 }),
            }} />
          ))}
        </GlassCard>
      </motion.div>
    </a>
  )
}

// ─── ANFAHRT INFO ────────────────────────────────────────────────────────────
const TRANSPORT = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--neon-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: 'Mit dem Auto',
    desc: 'Parkhaus Holzgraben direkt nebenan. Alternativ: Parkhaus Büchel, ca. 3 Gehminuten.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--neon-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="12" height="20" rx="2"/><path d="M6 10h12M6 14h12M10 18h4"/>
      </svg>
    ),
    title: 'Mit Bus & Bahn',
    desc: 'Haltestelle Bushof/Aachen HBF (5 Min.) oder Elisenbrunnen (7 Min.) zu Fuß.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--neon-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-1a4 4 0 0 0-3-3.87M1 21v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1"/><circle cx="9" cy="7" r="4"/>
      </svg>
    ),
    title: 'Innenstadt',
    desc: 'Direkt in der Aachener Altstadt — ideale Lage zum Kombinieren mit Restaurants & Shopping.',
  },
]

// ─── FORM SECTION 3D CARD ────────────────────────────────────────────────────
function FormCard3D() {
  const wrapRef = useRef(null)
  const cachedRect = useRef(null)
  const rotX = useMotionValue(5)
  const rotY = useMotionValue(-12)
  const springX = useSpring(rotX, { stiffness: 160, damping: 18 })
  const springY = useSpring(rotY, { stiffness: 160, damping: 18 })

  const shineX = useMotionValue(50)
  const shineY = useMotionValue(50)

  const shineStyle = useTransform(
    [shineX, shineY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.13) 0%, transparent 62%)`,
  )

  const glowOpacity = useTransform(
    [springX, springY],
    ([x, y]) => 0.08 + (Math.min(Math.abs(x) + Math.abs(y), 20) / 20) * 0.14,
  )
  const boxShadow = useTransform(
    glowOpacity,
    (o) => `0 0 0 1px rgba(0,200,255,0.18), 0 16px 48px rgba(0,0,0,0.6), 0 0 60px rgba(0,200,255,${o.toFixed(3)})`,
  )

  const handleMouseEnter = () => {
    if (wrapRef.current) cachedRect.current = wrapRef.current.getBoundingClientRect()
  }
  const handleMouseMove = (e) => {
    const rect = cachedRect.current
    if (!rect) return
    const x = Math.max(-1, Math.min(1, (e.clientX - rect.left) / rect.width  - 0.5)) * 2
    const y = Math.max(-1, Math.min(1, (e.clientY - rect.top)  / rect.height - 0.5)) * 2
    rotX.set(-y * 14)
    rotY.set( x * 14)
    shineX.set(((e.clientX - rect.left) / rect.width)  * 100)
    shineY.set(((e.clientY - rect.top)  / rect.height) * 100)
  }
  const handleMouseLeave = () => {
    rotX.set(5)
    rotY.set(-12)
    shineX.set(50)
    shineY.set(50)
    cachedRect.current = null
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <motion.div
        ref={wrapRef}
        className="form-card-3d"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: 240,
          height: 150,
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
          perspective: 900,
          boxShadow,
          borderRadius: 16,
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {/* Glow halo */}
        <motion.div style={{
          position: 'absolute', inset: -24, borderRadius: 32, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,200,255,0.15) 0%, transparent 65%)',
          zIndex: -1,
        }}
          animate={{ opacity: [0.6, 1, 0.6], scale: [0.97, 1.03, 0.97] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Card face */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 16, overflow: 'hidden',
          background: 'linear-gradient(135deg, #0d1525 0%, #131929 60%, #0a0f1e 100%)',
          border: '1px solid rgba(0,200,255,0.22)',
        }}>
          {/* Crosshatch pattern */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: [
              'repeating-linear-gradient(45deg, rgba(0,200,255,0.018) 0px, rgba(0,200,255,0.018) 1px, transparent 1px, transparent 18px)',
              'repeating-linear-gradient(-45deg, rgba(139,92,246,0.014) 0px, rgba(139,92,246,0.014) 1px, transparent 1px, transparent 18px)',
            ].join(', '),
          }} />

          {/* Shine overlay */}
          <motion.div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 16, background: shineStyle,
          }} />

          {/* Card content */}
          <div style={{ position: 'absolute', inset: '14px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', color: 'var(--neon-blue)', textShadow: '0 0 10px rgba(0,200,255,0.5)' }}>
                GIGA ARENA
              </span>
              <svg width="14" height="22" viewBox="0 0 14 28" fill="none">
                <rect x="0" y="0" width="5" height="28" rx="2.5" fill="#00C8FF"/>
                <rect x="8" y="4" width="5" height="24" rx="2.5" fill="#00C8FF" opacity="0.5"/>
              </svg>
            </div>

            {/* Chip */}
            <div style={{
              width: 26, height: 20, borderRadius: 4,
              background: 'linear-gradient(135deg, #c8a44a 0%, #f0d070 40%, #b8903a 100%)',
              border: '0.5px solid rgba(255,220,100,0.3)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
            }} />

            {/* Bottom */}
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 8, fontWeight: 800, letterSpacing: '0.18em', color: 'rgba(238,242,255,0.6)', marginBottom: 6 }}>
                GA — XXXX — XXXX
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 7, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(238,242,255,0.4)', textTransform: 'uppercase' }}>
                  MITGLIEDSKARTE
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 7, fontWeight: 800, letterSpacing: '0.14em',
                  color: 'var(--neon-green)', background: 'rgba(0,232,135,0.1)',
                  border: '1px solid rgba(0,232,135,0.3)', borderRadius: 4, padding: '2px 6px',
                  textShadow: '0 0 8px rgba(0,232,135,0.4)',
                }}>
                  AKTIV
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(238,242,255,0.35)', textTransform: 'uppercase', marginBottom: 6 }}>
          Deine Karte
        </div>
        <p style={{ fontSize: 12, color: 'rgba(238,242,255,0.28)', lineHeight: 1.6, maxWidth: 200 }}>
          Verknüpfe deine physische Karte mit dem Formular.
        </p>
      </div>
    </div>
  )
}

// ─── FORM ─────────────────────────────────────────────────────────────────────
export default function Karte() {
  const [values, setValues] = useState({ name: '', email: '', phone: '', cardId: '' })
  const [touched, setTouched] = useState({})
  const [state, setState] = useState('idle')

  const errors = useMemo(() => validate(values), [values])
  const canSubmit = Object.keys(errors).length === 0

  const submit = (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true, cardId: true })
    if (!canSubmit) return
    setState('loading')
    const subject = encodeURIComponent('Giga Arena Karte registrieren')
    const body = encodeURIComponent(
      `Name: ${values.name}\nE-Mail: ${values.email}${values.phone ? `\nTelefon: ${values.phone}` : ''}\nKarten-ID: ${values.cardId}`,
    )
    window.location.href = `mailto:info@viwa-entertainment.de?subject=${subject}&body=${body}`
    setState('success')
  }

  return (
    <div style={{ paddingTop: 56, paddingBottom: 80 }}>
      <PageMeta
        title="Karte & Anfahrt"
        description="Finde die Giga Arena Aachen — Holzgraben 11. Registriere deine Karte und plane deine Anfahrt."
      />

      {/* HERO */}
      <section style={container}>
        <ScrollReveal>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
            KARTE &amp; ANFAHRT
          </h1>
          <p style={{ color: 'rgba(238,242,255,0.72)', maxWidth: 560 }}>
            Wir sind mitten in der Aachener Innenstadt. Registriere deine Arcade-Karte und verknüpfe
            dein Guthaben — alles an einem Ort.
          </p>
        </ScrollReveal>
      </section>

      {/* 3-D MAP + TRANSPORT */}
      <section style={{ ...container, marginTop: 48 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr)',
          gap: 36,
          alignItems: 'start',
        }}
        className="karte-grid"
        >
          <ScrollReveal>
            <Map3D />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div style={{ display: 'grid', gap: 18 }}>
              {TRANSPORT.map((t) => (
                <GlassCard key={t.title} style={{ padding: '20px 22px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}>{t.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 4 }}>{t.title}</div>
                    <div style={{ fontSize: 13, color: 'rgba(238,242,255,0.65)', lineHeight: 1.65 }}>{t.desc}</div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CARD REGISTRATION */}
      <section style={{ ...container, marginTop: 72 }}>
        <ScrollReveal>
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10 }}>
              KARTE REGISTRIEREN
            </h2>
            <p style={{ color: 'rgba(238,242,255,0.65)', maxWidth: 480 }}>
              Verknüpfe deine Karten-ID, um dein Guthaben zu verwalten und Buchungen zu vereinfachen.
            </p>
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) 280px',
          gap: 56,
          alignItems: 'center',
        }}
        className="karte-reg-grid"
        >
          <ScrollReveal delay={0.05}>
            <form onSubmit={submit} style={card}>
              <Field
                label="Name"
                value={values.name}
                onChange={(v) => setValues((s) => ({ ...s, name: v }))}
                error={touched.name ? errors.name : null}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              />
              <Field
                label="E-Mail"
                value={values.email}
                onChange={(v) => setValues((s) => ({ ...s, email: v }))}
                error={touched.email ? errors.email : null}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                type="email"
                autoComplete="email"
              />
              <Field
                label="Telefon (optional)"
                value={values.phone}
                onChange={(v) => setValues((s) => ({ ...s, phone: v }))}
                error={touched.phone ? errors.phone : null}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                type="tel"
                autoComplete="tel"
              />
              <Field
                label="Karten-ID"
                value={values.cardId}
                onChange={(v) => setValues((s) => ({ ...s, cardId: v }))}
                error={touched.cardId ? errors.cardId : null}
                onBlur={() => setTouched((t) => ({ ...t, cardId: true }))}
                placeholder="z.B. GA-XXXX-XXXX"
              />

              <div style={{ color: 'var(--text-muted)', fontSize: 12, textAlign: 'center' }}>
                Die Karten-ID findest du auf der Rückseite deiner Karte.
              </div>

              <motion.button
                type="submit"
                disabled={state === 'loading'}
                whileHover={state === 'loading' ? undefined : { scale: 1.01 }}
                whileTap={state === 'loading' ? undefined : { scale: 0.99 }}
                style={{
                  marginTop: 4,
                  minHeight: 46,
                  borderRadius: 12,
                  border: state === 'success'
                    ? '1px solid rgba(0,232,135,0.55)'
                    : '1px solid rgba(0,200,255,0.3)',
                  background: state === 'success'
                    ? 'rgba(0,232,135,0.14)'
                    : 'linear-gradient(135deg, rgba(0,200,255,0.2), rgba(139,92,246,0.15))',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: '0.06em',
                  cursor: state === 'loading' ? 'default' : 'pointer',
                  boxShadow: state === 'success' ? 'var(--glow-green)' : 'var(--glow-blue)',
                  transition: 'box-shadow 0.3s',
                }}
              >
                {state === 'loading' ? 'Verknüpfe…' : state === 'success' ? '✓ Karte verknüpft' : 'KARTE REGISTRIEREN'}
              </motion.button>

              <div style={{ color: 'var(--text-muted)', fontSize: 12, textAlign: 'center' }}>
                Mit dem Absenden akzeptierst du unsere{' '}
                <a href="/datenschutz" style={{ color: 'var(--neon-blue)' }}>Datenschutz-Hinweise</a>.
              </div>
            </form>
          </ScrollReveal>

          {/* 3D card visual — hidden on small screens via CSS */}
          <ScrollReveal delay={0.15} className="karte-card-col">
            <FormCard3D />
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

function Field({ label, value, onChange, onBlur, error, type = 'text', autoComplete, placeholder }) {
  const id = `f_${label.replaceAll(' ', '_')}`
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <label style={labelStyle} htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        style={inputStyle(error)}
      />
      {error ? <div style={errorStyle}>{error}</div> : null}
    </div>
  )
}

function validate(v) {
  const out = {}
  if (!v.name.trim()) out.name = 'Bitte gib deinen Namen an.'
  if (!v.email.trim()) out.email = 'Bitte gib deine E-Mail an.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) out.email = 'Gültige E-Mail erforderlich.'
  if (v.phone && v.phone.trim().length > 0 && !/^[0-9 +()/.-]{6,}$/.test(v.phone)) {
    out.phone = 'Gültige Telefonnummer erforderlich.'
  }
  if (!v.cardId.trim()) out.cardId = 'Bitte gib deine Karten-ID an.'
  else if (!/^GA-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(v.cardId.trim())) {
    out.cardId = 'Format: GA-XXXX-XXXX'
  }
  return out
}

const container = {
  width: 'min(1200px, calc(100% - 32px))',
  margin: '0 auto',
  paddingTop: 28,
}

const card = {
  background: 'rgba(13, 17, 32, 0.72)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 16,
  padding: 24,
  display: 'grid',
  gap: 14,
  backdropFilter: 'blur(20px)',
}

const labelStyle = { fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }

const inputStyle = (error) => ({
  minHeight: 44,
  borderRadius: 10,
  border: error ? '1px solid rgba(255,68,68,0.7)' : '1px solid rgba(255,255,255,0.09)',
  background: 'rgba(7, 9, 15, 0.55)',
  color: 'var(--text-primary)',
  padding: '10px 14px',
  outline: 'none',
  fontSize: 14,
  transition: 'border-color 0.2s',
})

const errorStyle = { fontSize: 12, color: 'rgba(255,120,120,0.95)' }

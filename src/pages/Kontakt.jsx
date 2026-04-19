import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { PageMeta } from '@/components/layout/PageMeta'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlitchText } from '@/components/motion/GlitchText'
import { ScrollReveal } from '@/components/motion/ScrollReveal'

const reasons = [
  'Allgemeine Anfrage',
  'Geburtstag',
  'Firmenevent',
  'JGA / Männerabend',
  'Schulausflug',
  'Gutschein',
  'Sonstiges',
]

const INFO = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--neon-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Adresse',
    value: 'Holzgraben 11\n52062 Aachen',
    link: 'https://www.google.com/maps/dir/?api=1&destination=Holzgraben+11+52062+Aachen',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--neon-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: 'Öffnungszeiten',
    value: 'So–Do: 13:00–23:00\nFr–Sa: 12:00–01:00',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--neon-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'E-Mail',
    value: 'info@viwa-entertainment.de',
    link: 'mailto:info@viwa-entertainment.de',
  },
]

export default function Kontakt() {
  const [values, setValues] = useState({ name: '', email: '', reason: reasons[0], message: '' })
  const [touched, setTouched] = useState({})
  const [state, setState] = useState('idle')

  const errors = useMemo(() => validate(values), [values])
  const canSubmit = Object.keys(errors).length === 0

  const submit = (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, reason: true, message: true })
    if (!canSubmit) return
    setState('loading')
    const subject = encodeURIComponent(`Giga Arena Anfrage: ${values.reason}`)
    const body = encodeURIComponent(
      `Name: ${values.name}\nE-Mail: ${values.email}\nAnlass: ${values.reason}\n\nNachricht:\n${values.message}`,
    )
    window.location.href = `mailto:info@viwa-entertainment.de?subject=${subject}&body=${body}`
    setState('success')
  }

  return (
    <div style={{ paddingTop: 56, paddingBottom: 80 }}>
      <PageMeta
        title="Kontakt"
        description="Schreib uns für Gruppenevents, Geburtstage, Firmenevents oder allgemeine Anfragen. Giga Arena Aachen — Holzgraben 11, 52062 Aachen."
      />

      <section style={container}>
        <ScrollReveal>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
            <GlitchText duration={1000} delay={100}>KOMM VORBEI. WIR FREUEN UNS.</GlitchText>
          </h1>
          <p style={{ color: 'rgba(238,242,255,0.72)', maxWidth: 540 }}>
            Schreib uns kurz, worum es geht — wir melden uns so schnell wie möglich zurück.
          </p>
        </ScrollReveal>
      </section>

      <section style={{ ...container, marginTop: 40 }}>
        <div className="kontakt-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: 20, alignItems: 'start' }}>

          {/* FORM */}
          <ScrollReveal>
            <GlassCard style={{ padding: 28, display: 'grid', gap: 16 }}>
              <form onSubmit={submit} style={{ display: 'grid', gap: 16 }}>
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

                <div style={{ display: 'grid', gap: 6 }}>
                  <label style={labelStyle} htmlFor="reason">ANLASS</label>
                  <select
                    id="reason"
                    value={values.reason}
                    onChange={(e) => setValues((s) => ({ ...s, reason: e.target.value }))}
                    onBlur={() => setTouched((t) => ({ ...t, reason: true }))}
                    style={inputStyle(touched.reason ? errors.reason : null)}
                  >
                    {reasons.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  {touched.reason && errors.reason ? <div style={errorStyle}>{errors.reason}</div> : null}
                </div>

                <div style={{ display: 'grid', gap: 6 }}>
                  <label style={labelStyle} htmlFor="message">NACHRICHT</label>
                  <textarea
                    id="message"
                    value={values.message}
                    onChange={(e) => setValues((s) => ({ ...s, message: e.target.value }))}
                    onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                    rows={6}
                    style={{ ...inputStyle(touched.message ? errors.message : null), resize: 'vertical' }}
                  />
                  {touched.message && errors.message ? <div style={errorStyle}>{errors.message}</div> : null}
                </div>

                <motion.button
                  type="submit"
                  disabled={state === 'loading'}
                  whileHover={state === 'loading' ? undefined : { scale: 1.01 }}
                  whileTap={state === 'loading' ? undefined : { scale: 0.99 }}
                  style={{
                    marginTop: 4,
                    minHeight: 48,
                    borderRadius: 12,
                    border: state === 'success'
                      ? '1px solid rgba(0,232,135,0.55)'
                      : '1px solid rgba(0,200,255,0.3)',
                    background: state === 'success'
                      ? 'rgba(0,232,135,0.14)'
                      : 'linear-gradient(135deg, rgba(0,200,255,0.18), rgba(139,92,246,0.12))',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: '0.08em',
                    cursor: state === 'loading' ? 'default' : 'pointer',
                    boxShadow: state === 'success' ? 'var(--glow-green)' : 'var(--glow-blue)',
                    transition: 'box-shadow 0.3s',
                  }}
                >
                  {state === 'loading' ? (
                    'Sende…'
                  ) : state === 'success' ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      {/* SVG checkmark: stroke-dashoffset animates from full path length → 0 on success */}
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <motion.path
                          d="M3 9l4.5 4.5L15 5"
                          stroke="var(--neon-green)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      </svg>
                      Nachricht gesendet
                    </span>
                  ) : (
                    'NACHRICHT SENDEN'
                  )}
                </motion.button>
              </form>
            </GlassCard>
          </ScrollReveal>

          {/* SIDEBAR */}
          <ScrollReveal delay={0.1}>
            <div style={{ display: 'grid', gap: 14 }}>
              {INFO.map((item) => (
                <GlassCard
                  key={item.label}
                  style={{ padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}
                >
                  <div style={{ flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--neon-blue)', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 4 }}>
                      {item.label}
                    </div>
                    {item.link ? (
                      <a
                        href={item.link}
                        target={item.link.startsWith('http') ? '_blank' : undefined}
                        rel={item.link.startsWith('http') ? 'noreferrer' : undefined}
                        style={{ color: 'rgba(238,242,255,0.82)', textDecoration: 'none', fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-line', display: 'block' }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div style={{ color: 'rgba(238,242,255,0.82)', fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                        {item.value}
                      </div>
                    )}
                  </div>
                </GlassCard>
              ))}

              {/* Quick facts */}
              <GlassCard style={{ padding: '18px 20px' }}>
                <div style={{ fontSize: 11, color: 'var(--neon-blue)', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 12 }}>
                  ANTWORTZEIT
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--neon-green)', boxShadow: 'var(--glow-green)', flexShrink: 0 }}
                  />
                  <span style={{ color: 'rgba(238,242,255,0.78)', fontSize: 14 }}>
                    Wir antworten innerhalb von 24 Stunden
                  </span>
                </div>
              </GlassCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .kontakt-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

function Field({ label, value, onChange, onBlur, error, type = 'text', autoComplete }) {
  const id = `f_${label.replaceAll(' ', '_')}`
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <label style={labelStyle} htmlFor={id}>{label.toUpperCase()}</label>
      <input
        id={id}
        type={type}
        value={value}
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
  if (!v.reason) out.reason = 'Bitte wähle einen Anlass.'
  if (!v.message.trim()) out.message = 'Bitte schreib eine kurze Nachricht.'
  else if (v.message.trim().length < 20) out.message = 'Mindestens 20 Zeichen erforderlich.'
  return out
}

const container = {
  width: 'min(1200px, calc(100% - 32px))',
  margin: '0 auto',
  paddingTop: 28,
}

const labelStyle = {
  fontSize: 11,
  color: 'var(--text-muted)',
  letterSpacing: '0.08em',
  fontWeight: 600,
}

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

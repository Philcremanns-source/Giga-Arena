import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: '80svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 16px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        style={{ textAlign: 'center', maxWidth: 480 }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 20vw, 9rem)',
            fontWeight: 800,
            letterSpacing: '-0.06em',
            lineHeight: 1,
            color: 'var(--neon-blue)',
            opacity: 0.18,
            marginBottom: 16,
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', marginBottom: 16 }}>
          SEITE NICHT GEFUNDEN
        </h1>
        <p style={{ color: 'rgba(238,242,255,0.65)', marginBottom: 32 }}>
          Diese Seite existiert nicht. Vielleicht hast du dich vertippt oder der Link ist veraltet.
        </p>
        <Button as={Link} to="/" variant="primary">
          Zur Startseite
        </Button>
      </motion.div>
    </section>
  )
}

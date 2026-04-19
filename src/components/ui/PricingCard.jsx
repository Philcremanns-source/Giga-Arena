import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export function PricingCard({ name, price, credits, features = [], badge, featured = false, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ height: '100%' }}
    >
      <GlassCard
        style={{
          padding: '32px 28px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          position: 'relative',
          border: featured
            ? '1px solid rgba(139,92,246,0.45)'
            : '1px solid var(--border-subtle)',
          boxShadow: featured ? 'var(--glow-purple)' : 'none',
          transform: featured ? 'scale(1.04)' : 'scale(1)',
        }}
      >
        {badge && (
          <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)' }}>
            <Badge color={featured ? 'purple' : 'blue'}>{badge}</Badge>
          </div>
        )}

        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            letterSpacing: '-0.02em',
            marginBottom: 6,
          }}>
            {name}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            color: featured ? 'var(--neon-purple)' : 'var(--text-primary)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}>
            {price}
          </div>
          <div style={{ color: 'var(--neon-blue)', fontWeight: 600, fontSize: 14, marginTop: 4 }}>
            {credits} Credits
          </div>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {features.map((f, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'rgba(238,242,255,0.85)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flex: '0 0 auto', marginTop: 2 }}>
                <circle cx="8" cy="8" r="7" stroke="var(--neon-green)" strokeWidth="1.5"/>
                <path d="M5 8l2 2 4-4" stroke="var(--neon-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {f}
            </li>
          ))}
        </ul>

        <Button
          as={Link}
          to="/kontakt"
          variant={featured ? 'cta' : 'secondary'}
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={onSelect}
        >
          Anfragen
        </Button>
      </GlassCard>
    </motion.div>
  )
}

export default PricingCard

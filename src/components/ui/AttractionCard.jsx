import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card3D } from '@/components/motion/Card3D'
import { Badge } from '@/components/ui/Badge'
import { GlassCard } from '@/components/ui/GlassCard'

export function AttractionCard({ name, description, image, alt, players, badge, badgeColor = 'blue', to = '/attraktionen' }) {
  return (
    <Card3D style={{ height: '100%' }}>
      <GlassCard style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'relative', height: 200, overflow: 'hidden', flexShrink: 0 }}>
          <motion.img
            src={image}
            alt={alt}
            loading="lazy"
            decoding="async"
            width={400}
            height={200}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* colour overlay fades in on parent hover */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(7,9,15,0.85) 100%)',
            pointerEvents: 'none',
          }} />
          {badge && (
            <div style={{ position: 'absolute', top: 12, left: 12 }}>
              <Badge color={badgeColor}>{badge}</Badge>
            </div>
          )}
          {players && (
            <div style={{
              position: 'absolute',
              bottom: 10,
              right: 12,
              fontSize: 11,
              color: 'var(--neon-blue)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              fontFamily: 'monospace',
            }}>
              {players}
            </div>
          )}
        </div>

        <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          <h3 style={{ fontSize: '1rem', lineHeight: 1.2 }}>{name}</h3>
          <p style={{ color: 'rgba(238,242,255,0.72)', fontSize: 13.5, lineHeight: 1.65, flex: 1 }}>
            {description}
          </p>
          <Link
            to={to}
            style={{
              color: 'var(--neon-blue)',
              fontSize: 13,
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              marginTop: 4,
              letterSpacing: '0.04em',
            }}
          >
            Mehr erfahren
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </GlassCard>
    </Card3D>
  )
}

export default AttractionCard

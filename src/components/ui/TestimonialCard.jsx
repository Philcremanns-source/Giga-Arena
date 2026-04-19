import { GlassCard } from '@/components/ui/GlassCard'

function StarRow({ rating = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill={i < rating ? '#FFD84D' : 'none'}>
          <path
            d="M7 1l1.545 3.13 3.455.502-2.5 2.437.59 3.44L7 8.885l-3.09 1.624.59-3.44-2.5-2.437 3.455-.502L7 1z"
            stroke="#FFD84D"
            strokeWidth="0.8"
          />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialCard({ name, text, date, rating = 5 }) {
  return (
    <GlassCard style={{ padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <StarRow rating={rating} />
      <p style={{ color: 'rgba(238,242,255,0.88)', fontSize: 14, lineHeight: 1.65, flex: 1 }}>
        {text}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{name}</span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{date}</span>
      </div>
    </GlassCard>
  )
}

export default TestimonialCard

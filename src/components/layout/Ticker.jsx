import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useOpenStatus } from '@/hooks/useOpenStatus'

function formatClock(date) {
  const berlin = new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  const parts = berlin.formatToParts(date)
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]))
  return `${map.day}.${map.month}.${map.year} · ${map.hour}:${map.minute}`
}

function useIsCompact() {
  const [compact, setCompact] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 480px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 480px)')
    const handler = (e) => setCompact(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return compact
}

export function Ticker() {
  const [now, setNow] = useState(() => new Date())
  const status = useOpenStatus()
  const compact = useIsCompact()

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--ticker-h)',
        zIndex: 50,
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 'min(1200px, calc(100% - 32px))',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          fontSize: 13,
          letterSpacing: '0.02em',
          color: 'var(--text-muted)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <motion.span
            aria-hidden="true"
            animate={status.state === 'OPEN' ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            transition={
              status.state === 'OPEN'
                ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.2 }
            }
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background:
                status.state === 'OPEN'
                  ? 'var(--neon-green)'
                  : status.state === 'HOLIDAY'
                    ? 'var(--neon-yellow)'
                    : '#FF4444',
              boxShadow: status.state === 'OPEN' ? '0 0 16px rgba(0, 232, 135, 0.45)' : 'none',
              flex: '0 0 auto',
            }}
          />
          <span
            style={{
              color: 'var(--text-primary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {compact ? status.shortText : status.text}
          </span>
        </div>

        <div style={{ flex: '0 0 auto', whiteSpace: 'nowrap' }}>{formatClock(now)}</div>
      </div>
    </div>
  )
}

export default Ticker

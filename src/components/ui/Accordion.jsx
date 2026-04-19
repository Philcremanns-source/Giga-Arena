import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Accordion({ items }) {
  const [open, setOpen] = useState(null)
  const reduced = useReducedMotion()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div
            key={i}
            style={{
              background: 'rgba(13,17,32,0.7)',
              border: isOpen ? '1px solid rgba(0,200,255,0.25)' : '1px solid var(--border-subtle)',
              borderRadius: 12,
              overflow: 'hidden',
              transition: 'border-color 200ms ease',
            }}
          >
            <button
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: '100%',
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                textAlign: 'left',
                minHeight: 44,
              }}
            >
              <span style={{ flex: 1 }}>{item.question}</span>
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={reduced ? {} : { type: 'spring', stiffness: 300, damping: 22 }}
                style={{ flex: '0 0 auto', color: 'var(--neon-blue)' }}
              >
                <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </motion.svg>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduced ? {} : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '0 22px 18px', color: 'rgba(238,242,255,0.78)', fontSize: 14, lineHeight: 1.7 }}>
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion

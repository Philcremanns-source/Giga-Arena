import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatWindow } from './ChatWindow'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="window"
            initial={reduced ? false : { opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? {} : { opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            style={{
              position: 'fixed',
              bottom: 'clamp(72px, 12vh, 88px)',
              right: 'clamp(8px, 3vw, 24px)',
              left: 'clamp(8px, 3vw, auto)',
              zIndex: 900,
            }}
          >
            <ChatWindow onClose={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 950,
        }}
      >
        {!open && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          >
            <motion.div
              animate={reduced ? {} : { scale: [1, 1.6], opacity: [0.35, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'rgba(0,200,255,0.25)',
              }}
            />
          </div>
        )}

        <motion.button
          aria-label={open ? 'Chat schliessen' : 'Chat öffnen — Fragen? Ich helfe dir.'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          whileHover={reduced ? {} : { scale: 1.08 }}
          whileTap={reduced ? {} : { scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            position: 'relative',
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'var(--neon-blue)',
            boxShadow: 'var(--glow-blue)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#07090F',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.svg
                key="close"
                initial={reduced ? false : { rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={reduced ? {} : { rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </motion.svg>
            ) : (
              <motion.svg
                key="chat"
                initial={reduced ? false : { rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={reduced ? {} : { rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M11 2C6.03 2 2 5.79 2 10.4c0 2.65 1.36 5 3.5 6.5L5 20l3.5-1.5c.78.2 1.62.3 2.5.3 4.97 0 9-3.79 9-8.4C20 5.79 15.97 2 11 2z"
                  fill="currentColor"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  )
}

export default ChatBot

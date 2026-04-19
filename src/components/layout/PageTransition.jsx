import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Logo } from '@/components/ui/Logo'

let hasLoadedOnce = false

export function PageTransition({ children }) {
  const reduced = useReducedMotion()
  const [loading, setLoading] = useState(!hasLoadedOnce)

  useEffect(() => {
    if (hasLoadedOnce) return
    const t = setTimeout(() => {
      setLoading(false)
      hasLoadedOnce = true
    }, 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading && !reduced && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'var(--bg-primary)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 28,
            }}
          >
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Logo width={200} height={35} />
            </motion.div>

            <div style={{ width: 280, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 999, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                style={{ height: '100%', background: 'var(--neon-blue)', boxShadow: 'var(--glow-blue)', borderRadius: 999 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? {} : { opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ minHeight: '60svh' }}
      >
        {children}
      </motion.div>
    </>
  )
}

export default PageTransition

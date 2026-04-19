import { motion, useTransform, useMotionValue } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Layer 2 — Atmosphere
 *
 * Three overlapping radial gradients that define the ambient light sources
 * of the scene, plus a deep vignette at the bottom to ground all content.
 *
 * Depth mechanisms:
 * - Atmospheric perspective: lower opacity than foreground → recedes
 * - Differential velocity: stiffness 60 — reacts faster than grid, slower than cards
 * - 14s slow pulse: background "breathes" without competing with content
 * - atmOpacity scroll link: atmosphere fades as user reads deeper → keeps focus on content
 */
export function AtmosphereLayer({ atmX, atmY, atmOpacity }) {
  const reduced = useReducedMotion()

  const fallX = useMotionValue(0)
  const fallY = useMotionValue(0)
  const dx = useTransform(atmX ?? fallX, (v) => v * 28)
  const dy = useTransform(atmY ?? fallY, (v) => v * 16)

  return (
    <>
      {/* Primary ambient light sources — mouse-reactive */}
      <motion.div
        aria-hidden="true"
        animate={reduced ? undefined : { opacity: [1, 0.82] }}
        transition={
          reduced
            ? undefined
            : { duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
        }
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          backgroundImage: [
            // Bottom-left: primary blue light source
            'radial-gradient(ellipse 72% 56% at 12% 88%, rgba(0,200,255,0.11) 0%, transparent 60%)',
            // Top-right: purple accent
            'radial-gradient(ellipse 52% 48% at 88% 12%, rgba(139,92,246,0.09) 0%, transparent 55%)',
            // Center-top: subtle blue zenith
            'radial-gradient(ellipse 60% 40% at 50% -5%, rgba(0,200,255,0.06) 0%, transparent 60%)',
          ].join(', '),
          opacity: atmOpacity ?? 1,
          x: reduced ? 0 : dx,
          y: reduced ? 0 : dy,
        }}
      />

      {/* Deep bottom vignette — always static, grounds the scene */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 110% 55% at 50% 115%, rgba(0,0,0,0.80) 0%, transparent 58%)',
        }}
      />

      {/* Top edge darkener — keeps nav readable */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 160,
          zIndex: 2,
          pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(7,9,15,0.65) 0%, transparent 100%)',
        }}
      />
    </>
  )
}

export default AtmosphereLayer

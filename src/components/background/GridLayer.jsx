import { motion, useTransform, useAnimationControls, useMotionValue } from 'framer-motion'
import { useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Layer 1 — Perspective Grid
 *
 * CSS perspective floor that recedes to a vanishing point.
 * Enhanced with:
 * - Horizon glow: radial bloom at the vanishing point (y=35%)
 * - Moving scanline: a bright grid row that sweeps upward every 6s
 * - Differential velocity: gridX/gridY springs (stiffness 40) → slowest parallax layer
 * - Atmospheric perspective: lines at 4.5% opacity, masked at edges
 *
 * Depth mechanisms:
 * - rotateX(72deg): tilts flat plane into a receding floor
 * - mask-image: fade top/bottom → perceived infinite depth
 * - Horizon glow: bright spot at vanishing point draws the eye in
 */
export function GridLayer({ gridX, gridY }) {
  const reduced = useReducedMotion()
  const controls = useAnimationControls()

  useEffect(() => {
    if (reduced) return
    // Ambient Y scroll — grid lines advance toward the viewer
    controls.start({
      backgroundPositionY: ['0px', '80px'],
      transition: { duration: 10, repeat: Infinity, ease: 'linear' },
    })
  }, [reduced, controls])

  // Fallback MotionValues so hook call order is stable even if props arrive late
  const fallX = useMotionValue(0)
  const fallY = useMotionValue(0)
  // Differential velocity: distant layer reacts minimally to mouse
  const dx = useTransform(gridX ?? fallX, (v) => v * 22)
  const dy = useTransform(gridY ?? fallY, (v) => v * 12)

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        perspective: '600px',
        perspectiveOrigin: '50% 35%',
      }}
    >
      {/* Main perspective grid */}
      <motion.div
        animate={controls}
        style={{
          position: 'absolute',
          width: '100%',
          height: '250%',
          top: '-80%',
          rotateX: '72deg',
          x: reduced ? 0 : dx,
          y: reduced ? 0 : dy,
          backgroundImage: [
            'linear-gradient(rgba(0,200,255,0.045) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(0,200,255,0.045) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '80px 80px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 68%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 68%, transparent 100%)',
        }}
      />

      {/* Horizon glow — vanishing point radial bloom */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '35%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,200,255,0.07) 0%, rgba(0,200,255,0.02) 40%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Sweeping scanline — a bright row that travels up the grid every 7s */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          animate={{ top: ['100%', '20%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeIn', repeatDelay: 3 }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 2,
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,200,255,0.35) 20%, rgba(0,200,255,0.7) 50%, rgba(0,200,255,0.35) 80%, transparent 100%)',
            boxShadow: '0 0 12px rgba(0,200,255,0.4), 0 0 30px rgba(0,200,255,0.15)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}

export default GridLayer

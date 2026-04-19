import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Layer 5: stiffness 150, damping 12 — fastest reaction, overshoot allowed
const SPRING = { stiffness: 150, damping: 12 }

// True when the device has no hover capability (touch devices, stylus-only)
const noHover =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none)').matches

/**
 * Card3D — 3D tilt on hover, spring overshoot for physical mass sensation.
 *
 * Depth mechanism:
 * - Spring overshoot: damping 12 (under-damped) → card overshoots on fast move
 *   → physical sense of mass and nearness (Layer 5, closest to user)
 * - translateZ: +12px on hover → card advances toward viewer
 * - glowOpacity: neon shadow intensity follows tilt angle → light response
 *
 * On @media (hover: none) or prefers-reduced-motion: plain <div>, no transforms.
 */
export function Card3D({ children, className, style }) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  // Cache rect on mouseenter (neutral position, before any transform) to prevent
  // the getBoundingClientRect feedback loop that causes crazy spinning at edges
  const cachedRect = useRef(null)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRX = useSpring(rotateX, SPRING)
  const springRY = useSpring(rotateY, SPRING)

  // Glow opacity scales with tilt magnitude — light follows card angle
  const glowOpacity = useTransform(
    [springRX, springRY],
    ([x, y]) => (Math.min(Math.abs(x) + Math.abs(y), 12) / 12) * 0.3,
  )

  const shadow = useTransform(
    glowOpacity,
    (o) => `0 8px 32px rgba(0,0,0,0.45), 0 0 40px rgba(0,200,255,${o.toFixed(3)})`,
  )

  // No hover capability or reduced motion → plain div, no transforms
  if (reduced || noHover) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  const handleMouseEnter = () => {
    // Capture bounds before any spring animation has moved the element
    if (ref.current) cachedRect.current = ref.current.getBoundingClientRect()
  }

  const handleMouseMove = (e) => {
    const rect = cachedRect.current || ref.current?.getBoundingClientRect()
    if (!rect) return
    // Clamp to ±0.5 so overshooting the edge never produces unbounded values
    const x = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width  - 0.5))
    const y = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top)  / rect.height - 0.5))
    rotateX.set(y * -10)
    rotateY.set(x *  10)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    cachedRect.current = null
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // translateZ: card advances 12px toward viewer on hover — Layer 5 depth cue
      whileHover={{ translateZ: 12 }}
      transition={SPRING}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        // preserve-3d ensures children also participate in the 3D space
        transformStyle: 'preserve-3d',
        perspective: 1000,
        boxShadow: shadow,
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}

export default Card3D

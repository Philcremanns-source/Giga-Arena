import { useEffect } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

/**
 * Central parallax hook — single source of truth for all mouse-driven motion.
 * BackgroundEngine is the sole consumer. It passes the right spring values
 * down to each layer as props. No layer registers its own mouse listener.
 *
 * Z-space stiffness/damping follows the layer architecture:
 *   Layer 1 (Grid)      → stiffness 40,  damping 25  — slowest, most distant
 *   Layer 2 (Atm)       → stiffness 60,  damping 20
 *   Layer 5 (Cards)     → stiffness 150, damping 12  — fastest, closest, overshoot allowed
 */
export function useMouseParallax() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth  - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  return {
    // Layer 1 — Grid (slowest reaction, most distant)
    gridX: useSpring(mouseX, { stiffness: 40,  damping: 25 }),
    gridY: useSpring(mouseY, { stiffness: 40,  damping: 25 }),
    // Layer 2 — Atmosphere
    atmX:  useSpring(mouseX, { stiffness: 60,  damping: 20 }),
    atmY:  useSpring(mouseY, { stiffness: 60,  damping: 20 }),
    // Layer 5 — Cards (fastest, overshoot allowed)
    cardX: useSpring(mouseX, { stiffness: 150, damping: 12 }),
    cardY: useSpring(mouseY, { stiffness: 150, damping: 12 }),
    // Raw values for canvas loops that need .get()
    mouseX,
    mouseY,
  }
}

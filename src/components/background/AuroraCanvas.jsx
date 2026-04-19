import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * AuroraCanvas — Layer 0 background
 *
 * Floating radial-gradient "orbs" blended with 'screen' compositing.
 * This is the technique used by Unicorn Studio / Stripe / Vercel for their
 * ambient backgrounds — organic, alive, never competes with content.
 *
 * Design rules:
 * - Each orb opacity: 0.08–0.16 (very transparent individually)
 * - 'screen' blend: colours add without clipping, dark areas stay dark
 * - Movement: slow sinusoidal paths (18–28s per cycle) → breathing quality
 * - No wireframes, no shapes — pure volumetric light feel
 * - Total visual weight stays under 22% even with all orbs overlapping
 */

// Neon brand palette — these are the only colours allowed in the background
const C = {
  blue:   [0,   200, 255],
  purple: [139,  92, 246],
  green:  [0,   232, 135],
}

const ORBS = [
  // Bottom-left blue bloom — anchors the scene
  { bx: 0.12, by: 0.82, rx: 0.20, ry: 0.16, speed: 0.22, phase: 0.0,  rgb: C.blue,   a: 0.16, radius: 0.68 },
  // Top-right purple accent
  { bx: 0.85, by: 0.14, rx: 0.16, ry: 0.20, speed: 0.18, phase: 2.1,  rgb: C.purple, a: 0.12, radius: 0.54 },
  // Center-bottom green undertone
  { bx: 0.50, by: 1.05, rx: 0.32, ry: 0.18, speed: 0.15, phase: 4.4,  rgb: C.green,  a: 0.09, radius: 0.80 },
  // Mid-right blue secondary
  { bx: 0.78, by: 0.55, rx: 0.18, ry: 0.24, speed: 0.19, phase: 1.3,  rgb: C.blue,   a: 0.08, radius: 0.46 },
  // Upper-left purple whisper
  { bx: 0.20, by: 0.28, rx: 0.22, ry: 0.20, speed: 0.24, phase: 3.7,  rgb: C.purple, a: 0.07, radius: 0.52 },
  // Deep center pulse — very subtle, large radius
  { bx: 0.45, by: 0.60, rx: 0.28, ry: 0.22, speed: 0.12, phase: 5.9,  rgb: C.blue,   a: 0.05, radius: 0.90 },
]

export function AuroraCanvas({ mouseX, mouseY }) {
  const ref   = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let rafId
    let running = true

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    function draw(timestamp) {
      if (!running) return
      rafId = requestAnimationFrame(draw)

      const W = canvas.width
      const H = canvas.height
      const t = timestamp * 0.001 // seconds

      // Mouse offset — orbs subtly lean toward the cursor (very gentle, 2%)
      const mx = mouseX ? mouseX.get() : 0 // -0.5 to 0.5
      const my = mouseY ? mouseY.get() : 0

      ctx.clearRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'screen'

      for (const orb of ORBS) {
        // Sinusoidal path — two different frequencies for x/y give non-repeating Lissajous curve
        const cx = (orb.bx + Math.sin(t * orb.speed + orb.phase) * orb.rx + mx * 0.04) * W
        const cy = (orb.by + Math.cos(t * orb.speed * 0.73 + orb.phase) * orb.ry + my * 0.04) * H
        const r  = orb.radius * Math.min(W, H) * 0.75

        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        const [R, G, B] = orb.rgb
        grd.addColorStop(0,   `rgba(${R},${G},${B},${orb.a})`)
        grd.addColorStop(0.4, `rgba(${R},${G},${B},${(orb.a * 0.4).toFixed(3)})`)
        grd.addColorStop(1,   `rgba(${R},${G},${B},0)`)

        ctx.fillStyle = grd
        ctx.fillRect(0, 0, W, H)
      }

      ctx.globalCompositeOperation = 'source-over'
    }

    rafId = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [reduced, mouseX, mouseY])

  if (reduced) return null

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}

export default AuroraCanvas

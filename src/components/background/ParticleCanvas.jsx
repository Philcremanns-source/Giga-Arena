import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function isTouchDevice() {
  return typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)
}

/**
 * Layer 3 — Particle Canvas
 * z-index: 3, vanilla JS rAF loop (not Framer — too expensive for per-frame work)
 *
 * Depth mechanisms:
 * - z value per particle (0=far, 1=near): controls size, alpha, speed, color
 * - size: 0.25 + z*0.75 → near particles appear larger (depth-of-field)
 * - alpha: (0.3 + z*0.7) → near particles are brighter
 * - color: cool blue at distance, warmer near → atmospheric perspective
 * - speed: near particles move faster → motion parallax depth cue
 * - Mouse connection lines: fading line to cursor at distance < 120px
 *   lineAlpha: 0.35 * particle.z → near particles connect more visibly
 *
 * Accepts mouseX/mouseY MotionValues from BackgroundEngine.
 * No additional mouse listener registered here.
 */
export function ParticleCanvas({ mouseX, mouseY }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    // Hidden entirely on touch devices
    if (reduced || isTouchDevice()) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let running = true

    const dprRef = { current: Math.min(window.devicePixelRatio || 1, 2) }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      dprRef.current = dpr
      canvas.width  = Math.floor(window.innerWidth  * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width  = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Count: 80 desktop / 40 tablet / 0 mobile (touch devices exit above)
    const count = window.innerWidth >= 1024 ? 80 : 40

    const particles = []
    for (let i = 0; i < count; i++) {
      const z = Math.random()
      particles.push({
        x:  Math.random() * window.innerWidth,
        y:  Math.random() * window.innerHeight,
        // Near particles (z→1) move faster — motion parallax depth cue
        vx: (Math.random() - 0.5) * (0.3 + z * 0.7),
        vy: (Math.random() - 0.5) * (0.2 + z * 0.5),
        z,
      })
    }

    const loop = () => {
      if (!running) return

      const w = window.innerWidth
      const h = window.innerHeight

      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      // Current mouse position in screen pixels (from MotionValues)
      const mx = mouseX ? (mouseX.get() + 0.5) * w : -9999
      const my = mouseY ? (mouseY.get() + 0.5) * h : -9999

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -20)  p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20)  p.y = h + 20
        if (p.y > h + 20) p.y = -20

        // Depth-of-field: size grows with z (near particles look larger)
        const size = 0.25 + p.z * 0.75
        // Atmospheric perspective: near particles are brighter
        const alpha = 0.18 + p.z * 0.22
        // Color: cool blue at distance (z=0) → warm teal near (z=1)
        const r = Math.round(p.z * 200)
        const g = Math.round(180 + p.z * 75)

        ctx.fillStyle = `rgba(${r},${g},255,${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fill()

        // Mouse connection lines: near particles connect more visibly
        const dist = Math.hypot(p.x - mx, p.y - my)
        if (dist < 120) {
          // lineAlpha: 0.35 * z → near particles show stronger connection
          const lineAlpha = 0.35 * p.z * (1 - dist / 120)
          ctx.strokeStyle = `rgba(0,200,255,${lineAlpha})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mx, my)
          ctx.stroke()
        }
      }

      ctx.globalCompositeOperation = 'source-over'
      raf = window.requestAnimationFrame(loop)
    }

    raf = window.requestAnimationFrame(loop)

    return () => {
      // Cancel rAF on unmount to prevent memory leaks
      running = false
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(raf)
    }
  }, [reduced, mouseX, mouseY])

  // Hidden on touch devices and reduced motion
  if (reduced || isTouchDevice()) return null

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 3, pointerEvents: 'none' }}
    />
  )
}

export default ParticleCanvas

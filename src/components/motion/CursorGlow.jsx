import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const isTouchDevice =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)

/**
 * CursorGlow — soft radial glow that follows the cursor.
 * Desktop only, hidden on touch devices.
 *
 * Spring: stiffness 80, damping 20 — smooth tracking with slight lag
 * Scale: 1.0 → 1.4 when hovering any interactive element
 *
 * 600px circle, radial-gradient center rgba(0,200,255,0.04) → transparent
 * z-index: 0 — always behind all content
 */
export function CursorGlow() {
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const visible = useRef(false)

  const cursorX = useMotionValue(-9999)
  const cursorY = useMotionValue(-9999)

  const springCfg = { stiffness: 80, damping: 20 }
  const x = useSpring(cursorX, springCfg)
  const y = useSpring(cursorY, springCfg)

  useEffect(() => {
    if (reduced || isTouchDevice) return

    const onMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible.current) visible.current = true
    }

    // Scale up when over any interactive element
    const onOver = (e) => {
      const el = e.target
      if (
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.tagName === 'SELECT' ||
        el.closest('a, button, [role="button"], [tabindex]')
      ) {
        setHovered(true)
      }
    }
    const onOut = () => setHovered(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover',  onOver)
    document.addEventListener('mouseout',   onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mouseout',   onOut)
    }
  }, [reduced, cursorX, cursorY])

  if (reduced || isTouchDevice) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        // Center the 600px circle on the cursor
        left: -300,
        top: -300,
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,200,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
        // translateX/Y moves the center to the cursor position
        x,
        y,
        scale: hovered ? 1.4 : 1,
      }}
      transition={{ scale: { type: 'spring', stiffness: 200, damping: 20 } }}
    />
  )
}

export default CursorGlow

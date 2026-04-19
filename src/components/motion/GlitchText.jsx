import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%■▓░'

function scramble(target, progress) {
  return target
    .split('')
    .map((char, i) => {
      if (char === ' ' || char === '.' || char === '!' || char === '—') return char
      if (i / target.length < progress) return char
      return CHARS[Math.floor(Math.random() * CHARS.length)]
    })
    .join('')
}

/**
 * Renders text with a sci-fi character-scramble reveal animation.
 * @param {string}  children  - The final text to reveal
 * @param {string}  as        - HTML tag (default: 'span')
 * @param {number}  duration  - Animation duration in ms (default: 900)
 * @param {number}  delay     - Start delay in ms (default: 0)
 * @param {boolean} trigger   - Set to true to start animation (default: true)
 */
export function GlitchText({
  children,
  as: As = 'span',
  duration = 900,
  delay = 0,
  trigger = true,
  ...props
}) {
  const [displayed, setDisplayed] = useState(trigger ? scramble(children, 0) : children)
  const raf = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    if (!trigger) {
      setDisplayed(children)
      return
    }

    const begin = performance.now() + delay
    startRef.current = begin

    const animate = (now) => {
      if (startRef.current !== begin) return // stale effect
      const elapsed = Math.max(0, now - begin)
      const progress = Math.min(elapsed / duration, 1)
      setDisplayed(scramble(children, progress))
      if (progress < 1) {
        raf.current = requestAnimationFrame(animate)
      }
    }

    raf.current = requestAnimationFrame(animate)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [children, duration, delay, trigger])

  return <As {...props}>{displayed}</As>
}

export default GlitchText

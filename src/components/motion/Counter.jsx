import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3)
}

export function Counter({ target, suffix = '', prefix = '', duration = 1800 }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [value, setValue] = useState(reduced ? target : 0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!inView || reduced || startedRef.current) return
    startedRef.current = true

    const start = performance.now()
    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.round(easeOut(progress) * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, reduced, target, duration])

  return (
    <span ref={ref}>
      {prefix}{value.toLocaleString('de-DE')}{suffix}
    </span>
  )
}

export default Counter

import { useEffect } from 'react'
import Lenis from 'lenis'

const isTouch =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)

/**
 * Smooth scroll via Lenis — StrictMode-safe.
 *
 * The `running` flag is the correct way to stop the recursive rAF loop.
 * cancelAnimationFrame(id) only cancels ONE pending frame — the next rAF
 * inside raf() would re-schedule infinitely. The running flag makes raf()
 * exit early instead.
 */
export function useLenis() {
  useEffect(() => {
    if (isTouch) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let running = true
    function raf(time) {
      if (!running) return
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      running = false
      lenis.destroy()
    }
  }, [])
}

import { lazy, Suspense, Component } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { AuroraCanvas } from '@/components/background/AuroraCanvas'
import { GridLayer } from '@/components/background/GridLayer'
import { AtmosphereLayer } from '@/components/background/AtmosphereLayer'
import { ParticleCanvas } from '@/components/background/ParticleCanvas'

// Lazy-load Three.js so the 940KB chunk never blocks first paint
const Scene3D = lazy(() => import('@/components/three/Scene3D'))

// Isolates any Three.js crash — rest of app still renders
class Scene3DErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

/**
 * BackgroundEngine — sole consumer of useMouseParallax.
 *
 * Layer z-stack:
 *   0a — AuroraCanvas   (CSS canvas: flowing neon gradient orbs)
 *   0b — Scene3D        (Three.js: neon rings, gems, particles, bloom)
 *   1  — GridLayer      (CSS perspective floor, stiffness 40)
 *   2  — AtmosphereLayer (radial lights + vignettes, stiffness 60)
 *   3  — ParticleCanvas  (canvas depth field, cursor lines)
 *   4  — Content
 *   5  — Cards (closest, stiffness 150)
 */
export function BackgroundEngine() {
  const { gridX, gridY, atmX, atmY, mouseX, mouseY } = useMouseParallax()

  const { scrollYProgress } = useScroll()
  const atmOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.55])

  return (
    <>
      {/* Z=0a: Aurora — flowing color orbs, 'screen' compositing, mouse-reactive */}
      <AuroraCanvas mouseX={mouseX} mouseY={mouseY} />

      {/* Z=0b: Three.js — neon rings, floating gems, bloom — lazy-loaded */}
      <Scene3DErrorBoundary>
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </Scene3DErrorBoundary>

      {/* Z=1: CSS perspective grid (stiffness 40 — slowest parallax) */}
      <GridLayer gridX={gridX} gridY={gridY} />

      {/* Z=2: Atmospheric light sources (stiffness 60) + scroll-linked fade */}
      <AtmosphereLayer atmX={atmX} atmY={atmY} atmOpacity={atmOpacity} />

      {/* Z=3: Canvas particle field — desktop only */}
      <ParticleCanvas mouseX={mouseX} mouseY={mouseY} />
    </>
  )
}

export default BackgroundEngine

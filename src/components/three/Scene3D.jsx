import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, Suspense } from 'react'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Module-level mouse pointer — zero React overhead
const ptr = { x: 0, y: 0 }
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    ptr.x = (e.clientX / window.innerWidth  - 0.5) * 2
    ptr.y = (e.clientY / window.innerHeight - 0.5) * 2
  }, { passive: true })
}

const isMobile =
  typeof window !== 'undefined' &&
  (window.innerWidth < 768 || 'ontouchstart' in window)

// ── Neon ring — solid tube with glow, not wireframe ───────────────────────
function NeonRing({ position, color, rx = 0, rz = 0, radius = 3.0, tube = 0.025, speed = 1 }) {
  const ref = useRef()
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.z += dt * 0.06 * speed
    ref.current.rotation.x += dt * 0.03 * speed
  })
  return (
    <mesh ref={ref} position={position} rotation={[rx, 0, rz]}>
      <torusGeometry args={[radius, tube, 8, 120]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={4.5}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

// ── Floating gem — icosahedron with glass-like surface ────────────────────
function FloatingGem({ position, color, scale = 1, phaseOffset = 0 }) {
  const ref = useRef()
  useFrame((state, dt) => {
    if (!ref.current) return
    ref.current.rotation.x += dt * 0.14
    ref.current.rotation.y += dt * 0.09
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.45 + phaseOffset) * 0.35
  })
  return (
    <mesh ref={ref} position={[...position]} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2.2}
        roughness={0.0}
        metalness={0.3}
        transparent
        opacity={0.55}
      />
    </mesh>
  )
}

// ── Central orb — large translucent sphere, very slow rotation ────────────
function CentralOrb() {
  const ref = useRef()
  useFrame((state, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.06
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.15
  })
  return (
    <mesh ref={ref} position={[2.8, 0, -7]}>
      <sphereGeometry args={[2.2, 48, 48]} />
      <meshStandardMaterial
        color="#00C8FF"
        emissive="#003850"
        emissiveIntensity={0.8}
        roughness={0.1}
        metalness={0.6}
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ── Depth particle field ──────────────────────────────────────────────────
function Particles({ count = 400 }) {
  const ref = useRef()

  const { positions, colors, sizes } = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const col  = new Float32Array(count * 3)
    const sz   = new Float32Array(count)
    const palette = [
      new THREE.Color('#00C8FF'),
      new THREE.Color('#8B5CF6'),
      new THREE.Color('#00E887'),
    ]
    for (let i = 0; i < count; i++) {
      // Distribute in a shell around the viewer for depth perception
      const phi   = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const r     = 4 + Math.random() * 10
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi) - 3

      const c = palette[i % 3]
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b

      // Size varies by z-depth: closer particles look larger
      const z = pos[i * 3 + 2]
      sz[i] = Math.max(0.02, 0.06 - z * 0.004)
    }
    return { positions: pos, colors: col, sizes: sz }
  }, [count])

  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.009
    ref.current.rotation.x += dt * 0.003
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={count} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.75}
      />
    </points>
  )
}

// ── Camera rig — smooth mouse tracking ────────────────────────────────────
function CameraRig() {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (ptr.x * 1.2 - camera.position.x) * 0.03
    camera.position.y += (-ptr.y * 0.8 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })
  return null
}

// ── Scene content ─────────────────────────────────────────────────────────
function SceneContent({ reduced }) {
  return (
    <>
      <ambientLight intensity={0.02} />
      <pointLight position={[5,  4,  3]}  color="#00C8FF" intensity={4}   />
      <pointLight position={[-5,-3,  2]}  color="#8B5CF6" intensity={3}   />
      <pointLight position={[0,  2, 8]}   color="#00E887" intensity={1.2} />
      <pointLight position={[0,  0, -12]} color="#00C8FF" intensity={2}   />

      {/* Central glowing orb — gives the scene a focal depth anchor */}
      <CentralOrb />

      {/* Neon rings — different planes for spatial depth */}
      <NeonRing position={[0.5,  0.3, -9]}  color="#00C8FF" rx={0.4}  rz={0.1}  radius={3.8} tube={0.022} speed={1}   />
      <NeonRing position={[-2,   1.0, -12]} color="#8B5CF6" rx={0.7}  rz={-0.3} radius={4.5} tube={0.018} speed={0.7} />
      <NeonRing position={[3,   -1.5, -7]}  color="#00E887" rx={-0.3} rz={0.5}  radius={2.4} tube={0.016} speed={1.3} />
      <NeonRing position={[-4,   2.0, -15]} color="#00C8FF" rx={1.1}  rz={0.2}  radius={5.5} tube={0.014} speed={0.5} />

      {/* Floating gems — translucent octahedra with glow */}
      <FloatingGem position={[-3.8, 1.5, -5.5]} color="#8B5CF6" scale={0.9}  phaseOffset={0.0} />
      <FloatingGem position={[5.2, -2.2, -7.5]} color="#00E887" scale={0.55} phaseOffset={2.1} />
      <FloatingGem position={[-1.5, 3.0, -10]}  color="#00C8FF" scale={0.4}  phaseOffset={4.3} />

      {/* Particle depth field */}
      <Particles count={isMobile ? 100 : 450} />

      {/* Camera responds to mouse — desktop only */}
      {!reduced && !isMobile && <CameraRig />}

      {/* Post-processing: strong bloom + vignette */}
      <EffectComposer>
        <Bloom
          intensity={3.5}
          luminanceThreshold={0.04}
          luminanceSmoothing={0.92}
          mipmapBlur
        />
        <Vignette darkness={0.52} offset={0.25} />
      </EffectComposer>
    </>
  )
}

// ── Export ────────────────────────────────────────────────────────────────
export function Scene3D() {
  const reduced = useReducedMotion()
  if (reduced) return null

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
      >
        <Suspense fallback={null}>
          <SceneContent reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene3D

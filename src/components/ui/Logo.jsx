import { useId } from 'react'

/**
 * Logo — uses useId() so every instance gets a unique SVG filter ID.
 * Multiple Logo renders (nav + footer) would otherwise share <filter id="neon">
 * causing the filter to break in browsers that resolve the first match.
 */
export function Logo({ width = 160, height = 28 }) {
  const uid = useId().replace(/:/g, '_')
  const filterId = `logo_neon_${uid}`
  const gradId   = `logo_grad_${uid}`

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 70"
      role="img"
      aria-label="Giga Arena"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        {/* Glow filter for ARENA text */}
        <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feColorMatrix in="blur" type="matrix"
            values="0 0 0 0 0  0 0.78 0 0 1  0 0 1 0 1  0 0 0 0.55 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradient for the G-icon */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#00C8FF" stopOpacity="1" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* G-icon — two stacked parallelograms forming a stylised ‹G› bracket */}
      <g transform="translate(0, 5)">
        {/* Back shard */}
        <polygon
          points="30,4 52,4 38,56 16,56"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="5"
          strokeLinejoin="round"
          opacity="0.45"
        />
        {/* Front shard */}
        <polygon
          points="16,4 38,4 24,56 2,56"
          fill="none"
          stroke="#00C8FF"
          strokeWidth="5"
          strokeLinejoin="round"
          opacity="0.95"
        />
      </g>

      {/* Wordmark */}
      <text
        x="72"
        y="50"
        fontFamily="Syne, system-ui, sans-serif"
        fontWeight="800"
        fontSize="44"
        letterSpacing="2"
        fill="#EEF2FF"
      >
        GIGA
      </text>
      <text
        x="220"
        y="50"
        fontFamily="Syne, system-ui, sans-serif"
        fontWeight="800"
        fontSize="44"
        letterSpacing="2"
        fill="#00C8FF"
        filter={`url(#${filterId})`}
      >
        ARENA
      </text>
    </svg>
  )
}

export default Logo

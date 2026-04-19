import { useMemo } from 'react'
import { motion } from 'framer-motion'

const stylesByVariant = {
  primary: {
    background: 'var(--neon-green)',
    color: '#06110A',
    border: '1px solid rgba(0,0,0,0.15)',
    boxShadow: 'var(--glow-green)',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid rgba(0,200,255,0.45)',
    boxShadow: '0 0 0 rgba(0,0,0,0)',
  },
  cta: {
    background: 'rgba(0,200,255,0.14)',
    color: 'var(--text-primary)',
    border: '1px solid rgba(0,200,255,0.32)',
    boxShadow: 'var(--glow-blue)',
  },
}

export function Button({ as: As = 'button', variant = 'primary', children, style, ...props }) {
  const v = stylesByVariant[variant] || stylesByVariant.primary
  // motion(As) outside render would be ideal; useMemo avoids recreating per-render
  // As rarely changes so this is effectively stable
  const MotionAs = useMemo(() => motion(As), [As])

  return (
    <MotionAs
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      {...props}
      style={{
        ...v,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '10px 14px',
        borderRadius: 12,
        fontWeight: 600,
        fontSize: 14,
        minHeight: 44,
        minWidth: 44,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </MotionAs>
  )
}

export default Button

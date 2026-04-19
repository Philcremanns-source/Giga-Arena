const colorMap = {
  yellow:  { bg: 'var(--neon-yellow)',  color: '#07090F' },
  blue:    { bg: 'rgba(0,200,255,0.15)', color: 'var(--neon-blue)', border: '1px solid rgba(0,200,255,0.3)' },
  green:   { bg: 'rgba(0,232,135,0.15)', color: 'var(--neon-green)', border: '1px solid rgba(0,232,135,0.3)' },
  purple:  { bg: 'rgba(139,92,246,0.15)', color: 'var(--neon-purple)', border: '1px solid rgba(139,92,246,0.3)' },
  pink:    { bg: 'rgba(244,63,142,0.15)', color: 'var(--neon-pink)', border: '1px solid rgba(244,63,142,0.3)' },
}

export function Badge({ children, color = 'blue' }) {
  const scheme = colorMap[color] ?? colorMap.blue
  return (
    <span
      className="badge"
      style={{
        background: scheme.bg,
        color: scheme.color,
        border: scheme.border ?? 'none',
      }}
    >
      {children}
    </span>
  )
}

export default Badge

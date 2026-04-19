export function GlassCard({ children, className, style, ...props }) {
  return (
    <div
      className={['glass-card', className].filter(Boolean).join(' ')}
      style={{
        background: 'rgba(13,17,32,0.72)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export default GlassCard

export function Marquee({ items, direction = 'left', speed = 28, color = 'var(--neon-pink)' }) {
  const content = [...items, ...items].join(' · ')

  return (
    <div
      style={{
        overflow: 'hidden',
        width: '100%',
        height: 48,
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          willChange: 'transform',
          animation: `marquee-${direction} ${speed}s linear infinite`,
          color,
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(0.8rem, 2vw, 1rem)',
          letterSpacing: '0.08em',
        }}
      >
        {content}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {content}
      </div>

      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

export default Marquee

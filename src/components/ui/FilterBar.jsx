import { motion } from 'framer-motion'

export function FilterBar({ categories, active, onChange }) {
  return (
    <div
      style={{
        position: 'sticky',
        top: 'calc(var(--ticker-h) + var(--nav-h))',
        zIndex: 30,
        background: 'rgba(7,9,15,0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '10px 0',
      }}
    >
      <div
        style={{
          width: 'min(1200px, calc(100% - 32px))',
          margin: '0 auto',
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        {categories.map((cat) => {
          const isActive = cat === active
          return (
            <motion.button
              key={cat}
              onClick={() => onChange(cat)}
              whileTap={{ scale: 0.96 }}
              style={{
                position: 'relative',
                padding: '7px 16px',
                borderRadius: 999,
                border: isActive ? 'none' : '1px solid var(--border-subtle)',
                background: isActive ? 'var(--neon-blue)' : 'transparent',
                color: isActive ? '#07090F' : 'rgba(238,242,255,0.7)',
                fontWeight: isActive ? 700 : 500,
                fontSize: 13,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                minHeight: 36,
                transition: 'color 150ms, background 150ms, border-color 150ms',
              }}
            >
              {cat}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default FilterBar

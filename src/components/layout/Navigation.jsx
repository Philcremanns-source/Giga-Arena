import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './Navigation.css'

const links = [
  { to: '/',             label: 'Home' },
  { to: '/attraktionen', label: 'Attraktionen' },
  { to: '/events',       label: 'Events' },
  { to: '/preise',       label: 'Preise' },
  { to: '/kontakt',      label: 'Kontakt' },
  { to: '/karte',        label: 'Karte' },
]

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showFloatingCta, setShowFloatingCta] = useState(false)
  const ctaRef = useRef(null)
  const menuRef = useRef(null)
  const location = useLocation()
  const reduced = useReducedMotion()

  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 80], ['rgba(7,9,15,0)', 'rgba(7,9,15,0.92)'])
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Focus trap for mobile menu
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return
    const focusable = menuRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    first?.focus()
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); return }
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  // Floating CTA: appears when desktop "Jetzt buchen" scrolls out of view.
  // Only active on desktop where ctaRef is visible; on mobile the element is
  // display:none so we guard with a media query check.
  const isDesktop = useCallback(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 769px)').matches,
    [],
  )
  useEffect(() => {
    if (!ctaRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (isDesktop()) setShowFloatingCta(!entry.isIntersecting)
      },
      { threshold: 0 },
    )
    obs.observe(ctaRef.current)
    return () => obs.disconnect()
  }, [isDesktop])

  return (
    <>
      <motion.header
        style={{
          position: 'sticky',
          top: 'var(--ticker-h)',
          zIndex: 40,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          background: bg,
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'rgba(255,255,255,0.06)',
            opacity: borderOpacity,
          }}
        />

        <div
          style={{
            height: 'var(--nav-h)',
            width: 'min(1200px, calc(100% - 32px))',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 14,
          }}
        >
          {/* Logo */}
          <NavLink to="/" aria-label="Zur Startseite" style={{ flexShrink: 0 }}>
            <Logo />
          </NavLink>

          {/* Desktop Nav */}
          <nav
            className="desktop-nav"
            aria-label="Hauptnavigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              flex: '1 1 auto',
              justifyContent: 'center',
            }}
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                style={({ isActive }) => ({
                  position: 'relative',
                  padding: '10px 12px',
                  borderRadius: 10,
                  color: isActive ? 'var(--text-primary)' : 'rgba(238,242,255,0.75)',
                  fontSize: 14,
                  minHeight: 44,
                  display: 'inline-flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  transition: 'color 150ms',
                })}
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        style={{
                          position: 'absolute',
                          left: 12,
                          right: 12,
                          bottom: 7,
                          height: 2,
                          borderRadius: 999,
                          background: 'var(--neon-blue)',
                          boxShadow: '0 0 8px rgba(0,200,255,0.5)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div ref={ctaRef} className="desktop-cta" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <Button as={NavLink} to="/kontakt" variant="primary" aria-label="Jetzt buchen">
              Jetzt buchen
            </Button>
            <Button as={NavLink} to="/karte" variant="secondary" aria-label="Karte registrieren">
              Karte
            </Button>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="hamburger"
            aria-label={menuOpen ? 'Menü schliessen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 10,
              minWidth: 44,
              minHeight: 44,
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--neon-blue)',
              flexShrink: 0,
            }}
          >
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
              <motion.path
                d="M1 1h20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                animate={menuOpen ? { d: 'M2 16L20 2', opacity: 1 } : { d: 'M1 1h20', opacity: 1 }}
                transition={reduced ? {} : { duration: 0.25 }}
              />
              <motion.path
                d="M1 9h20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{ opacity: menuOpen ? 0 : 1 }}
                transition={reduced ? {} : { duration: 0.15 }}
              />
              <motion.path
                d="M1 17h20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                animate={menuOpen ? { d: 'M2 2L20 16', opacity: 1 } : { d: 'M1 17h20', opacity: 1 }}
                transition={reduced ? {} : { duration: 0.25 }}
              />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobilmenü"
            initial={reduced ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reduced ? {} : { x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(320px, 85vw)',
              background: 'rgba(13,17,32,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderLeft: '1px solid var(--border-subtle)',
              zIndex: 200,
              display: 'flex',
              flexDirection: 'column',
              padding: '24px 0',
            }}
          >
            {/* Close */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 20px 20px' }}>
              <button
                aria-label="Menü schliessen"
                onClick={() => setMenuOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  minWidth: 44,
                  minHeight: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav aria-label="Mobilnavigation" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 12px', gap: 4 }}>
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={reduced ? false : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={reduced ? {} : { delay: 0.06 + i * 0.05, duration: 0.3, ease: 'easeOut' }}
                >
                  <NavLink
                    to={l.to}
                    onClick={() => setMenuOpen(false)}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      padding: '14px 16px',
                      borderRadius: 12,
                      background: isActive ? 'rgba(0,200,255,0.08)' : 'transparent',
                      color: isActive ? 'var(--neon-blue)' : 'rgba(238,242,255,0.85)',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: 16,
                      minHeight: 52,
                      transition: 'background 150ms, color 150ms',
                    })}
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Mobile CTA at bottom */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduced ? {} : { delay: 0.38, duration: 0.3 }}
              style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}
            >
              <Button as={NavLink} to="/kontakt" variant="primary" style={{ width: '100%', justifyContent: 'center' }}>
                Jetzt buchen
              </Button>
              <Button as={NavLink} to="/karte" variant="secondary" style={{ width: '100%', justifyContent: 'center' }}>
                Karte registrieren
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.55)',
              zIndex: 199,
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Floating CTA (bottom-left, appears when desktop CTA scrolls out) */}
      <AnimatePresence>
        {showFloatingCta && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? {} : { opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className="floating-cta"
            style={{
              position: 'fixed',
              bottom: 16,
              left: 16,
              zIndex: 100,
              display: 'none',
            }}
          >
            <Button as={NavLink} to="/kontakt" variant="primary">
              Jetzt buchen
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  )
}

export default Navigation

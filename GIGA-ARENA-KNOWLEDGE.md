# GIGA ARENA — Project Knowledge Base
*Single source of truth. Read this before every task on this project.*

---

## 1. BUSINESS CONTEXT

| Key | Value |
|-----|-------|
| Venue | Giga Arena Aachen |
| Operator | VIWA Entertainment GmbH |
| Address | Holzgraben 11, 52062 Aachen |
| Email | info@viwa-entertainment.de |
| USP | Nr. 2 Racing Simulator in Europe, 50+ attractions, no entry fee (credit-only) |
| Attractions | Racing Simulator, Room-Scale VR, Classic Arcade, Air Hockey, Sky Fighter, Gun Storm, Speed Racer |
| Events | Birthday, JGA, corporate events, school trips |
| Opening hours | Mo–Do 13–23, Fr 13–01, Sa 12–01, So 12–23 |

---

## 2. TECH STACK

```
React 18.3       — UI framework
Vite 5.4         — build + dev server
React Router 6   — client-side routing
Framer Motion 11 — ALL animations (transform, spring, scroll, layout)
Lenis 1.3        — smooth scroll (native mode, rAF loop, running-flag cleanup)
Three.js 0.184   — 3D scene (lazy-loaded, ~940KB chunk)
@react-three/fiber 8   — React bindings for Three.js
@react-three/postprocessing 2 — Bloom, Vignette
GSAP 3 (installed, NOT used — keep for future ScrollTrigger needs)
```

---

## 3. DESIGN SYSTEM

### Colour tokens (src/styles/tokens.css)
```
--neon-blue:   #00C8FF   primary accent, CTAs, active states
--neon-purple: #8B5CF6   secondary accent
--neon-green:  #00E887   success, open status
--neon-pink:   #F43F8E   marquee, decorative
--neon-yellow: #FFD84D   warnings, badges
--bg-primary:  #07090F   page background
--bg-secondary:#0D1120
--bg-surface:  #131929   cards, modals
--text-primary:#EEF2FF
--text-muted:  #64748B
```

### Typography
```
--font-display: Syne 800   — headings, logo, counters
--font-body:    DM Sans 400/600
```

### Key utilities (src/styles/futuristic.css)
- `.neon-line` — animated gradient divider
- `.section-num` — oversized watermark number
- `.glass-card` — glassmorphism with shimmer hover
- `.bracket-tl/tr/bl/br` — HUD corner decorations
- `.scan-line` — animated vertical scan line

---

## 4. BACKGROUND SYSTEM (critical — read carefully)

### Architecture
```
Z=0a  AuroraCanvas  — canvas, 'screen' blend, 6 floating gradient orbs
Z=0b  Scene3D       — Three.js, lazy-loaded: neon rings + gems + bloom
Z=1   GridLayer     — CSS perspective 600px floor grid, scanline sweep
Z=2   AtmosphereLayer — radial glows + bottom vignette + top darkener
Z=3   ParticleCanvas — canvas particles, depth-by-size, cursor lines
Z=4   Content       — page sections
Z=5   Card3D        — 3D tilt cards, closest layer
```

### Single hook rule
`useMouseParallax` is called ONLY in `BackgroundEngine.jsx`.
All layers receive springs as props. No layer registers its own mouse listener.

### Spring config by layer
```
Grid:  stiffness 40,  damping 25  — slowest, most distant
Atm:   stiffness 60,  damping 20
Cards: stiffness 150, damping 12  — fastest, overshoot allowed
```

### Design rules
- Background total visual weight: under 25%
- AuroraCanvas orb opacity: 0.05–0.16 per orb
- Grid lines: rgba(0,200,255,0.045) — 4.5% opacity
- Bloom luminanceThreshold: 0.04 (very sensitive, makes everything glow)
- NO wireframe geometry — surfaces only (opacity 0.12–0.55)

---

## 5. ANIMATION SPEC

| Context | Duration | Easing | Notes |
|---------|----------|--------|-------|
| Page transition | 300ms | easeOut | opacity + y:20 |
| Loading bar | 600ms | [0.4,0,0.2,1] | initial load only |
| Scroll reveal | 600ms | [0.22,1,0.36,1] | once, threshold 0.15 |
| Card 3D spring | spring | stiffness 150, damping 12 | translateZ:12 on hover |
| Marquee | 28s | linear infinite | CSS-only |
| Aurora pulse | 14s | easeInOut | opacity 1→0.82 |
| Grid drift | 10s | linear | backgroundPositionY |
| Grid scanline | 7s sweep + 3s pause | easeIn | repeats |
| Counter | 1800ms | easeOut | on enter viewport |
| Chatbot dots | 150ms stagger | easeInOut | scale pulse |
| SVG checkmark | 600ms | easeOut | pathLength 0→1 |
| Accordion | auto | spring | height: 'auto' |

### Performance rules
- Animate ONLY `transform` and `opacity`
- Canvas particle loop: max 80 particles, cancel rAF on unmount
- `BackgroundEngine` renders ONCE at app root, never inside pages

---

## 6. COMPONENT LIBRARY

```
src/components/
  background/
    AuroraCanvas    — flowing neon gradient orbs (canvas)
    BackgroundEngine — orchestrates all background layers
    AtmosphereLayer  — radial glows + vignette
    GridLayer        — CSS perspective grid + scanline
    ParticleCanvas   — depth particle field
  layout/
    Navigation       — sticky, blur on scroll, mobile overlay
    Ticker           — fixed top bar, open/closed status
    Footer           — 4-col grid
    PageTransition   — loading bar + fade-in
    PageMeta         — title + description
  motion/
    Card3D           — 3D tilt wrapper (hover:none guard)
    CursorGlow       — 600px radial glow, springs, desktop only
    GlitchText       — character scramble reveal on hero h1s
    ScrollReveal     — fade+y:40 on enter viewport
    Counter          — animated number count-up
    Marquee          — CSS scroll ticker
  three/
    Scene3D          — neon rings, gems, particles, bloom
  ui/
    AttractionCard   — image zoom + overlay on hover
    GlassCard        — glassmorphism panel
    Button           — primary/secondary/cta variants
    Badge            — coloured pill
    Logo             — SVG wordmark (unique filter IDs via useId)
    PricingCard      — credit pricing
    TestimonialCard  — star rating
    FilterBar        — tag filter
    Accordion        — animated height:auto
```

---

## 7. PAGES & ROUTES

| Route | File | Notes |
|-------|------|-------|
| / | Home.jsx | Hero + GlitchText, marquee, racing spotlight, USP grid, attractions |
| /attraktionen | Attraktionen.jsx | Filter bar, attraction grid |
| /events | Events.jsx | Timeline, packages |
| /preise | Preise.jsx | Credit pricing, FAQ accordion |
| /kontakt | Kontakt.jsx | Form → mailto, SVG checkmark on success |
| /karte | Karte.jsx | 3D tilt map card, transport info |
| /impressum | Impressum.jsx | Legal |
| /datenschutz | Datenschutz.jsx | GDPR compliant, 9 sections |
| * | NotFound.jsx | 404 |

---

## 8. KNOWN BUGS & FIXES APPLIED

| Bug | Root cause | Fix |
|-----|-----------|-----|
| Black screen | @react-three/fiber v9 requires React 19 | Downgraded to R3F v8 |
| Scroll broken | `html, body { height: 100% }` constrained document height | Changed to `min-height: 100%` |
| Scroll broken v2 | Lenis rAF loop leaked in StrictMode (cancelAnimationFrame didn't stop loop) | `running` flag stops recursive rAF |
| Logo filter broken | Duplicate SVG filter `id="neon"` in Nav + Footer | `useId()` generates unique IDs per instance |
| GSAP ticker leak | `gsap.ticker.add()` not removed on cleanup | Replaced with plain rAF loop |
| Multiple Vite servers | Stale HMR from previous sessions | `pkill -f vite` before each session |

---

## 9. REFERENCE SITES (quality bar)

| Site | What to extract |
|------|----------------|
| unicorn.studio | Layered ambient backgrounds that breathe — `screen` blend, low opacity orbs |
| godly.website | Scroll rhythm — each viewport-section = one idea, tight reveal threshold |
| spline.design | Depth WITHOUT heavy WebGL — CSS perspective + blur + opacity gradients |
| reactbits.dev | Composable motion primitives — one hook, props passed down |

### Key principle: "Background Cinema, Foreground Clarity"
Background lives BEHIND content. Any animation that competes with text → remove it.

---

## 10. WORKFLOW RULES (for every task)

1. Read this file first
2. Check KNOWN BUGS list before diagnosing
3. Use `useId()` for any SVG/CSS IDs that appear in multiple instances
4. Always `pointer-events: none` on all background layers
5. Always check `useReducedMotion()` in animated components
6. Build: `npm run build` — must exit clean, zero errors
7. After every web design task: compare against reference sites, write improvement tips
8. After every change: open browser, verify scroll works, verify logo renders

---

## 11. IMPROVEMENT TIPS (vs professional sites)

*Updated after each major revision.*

### vs unicorn.studio
- Their backgrounds breathe more organically — consider adding a noise-displacement layer
- Their color temperature shifts as you scroll (warm top → cool bottom)
- **Action**: Add scroll-linked color temperature shift to AtmosphereLayer

### vs godly.website
- Their section spacing is more aggressive — 120px+ between sections
- Every section has ONE clear focal point; our USP grid feels cluttered
- **Action**: Increase section padding, reduce card count on home from 4→3

### vs spline.design
- Their 3D elements have physical weight — heavy drop shadows, not just bloom
- Our gems feel too light — increase emissiveIntensity, add stronger point light
- **Action**: Boost point light intensity, add contact shadows under gems

### vs reactbits.dev
- Their page transitions are 200ms (faster than our 300ms) — feels snappier
- Hover states respond in <100ms — ours use spring which adds lag
- **Action**: Reduce CTA button hover from spring to 80ms CSS transition

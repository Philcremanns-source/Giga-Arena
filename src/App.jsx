import { Route, Routes, useLocation } from 'react-router-dom'
import { Suspense, lazy, Component } from 'react'

// Catches any unhandled render errors so a single broken component
// never takes down the whole page.
class ErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}
import { useLenis } from '@/hooks/useLenis'
import { AnimatePresence } from 'framer-motion'
import { Ticker } from '@/components/layout/Ticker'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/layout/PageTransition'
import { BackgroundEngine } from '@/components/background/BackgroundEngine'
import { ChatBot } from '@/chatbot/ChatBot'
import { CursorGlow } from '@/components/motion/CursorGlow'

const Home = lazy(() => import('@/pages/Home.jsx'))
const Attraktionen = lazy(() => import('@/pages/Attraktionen.jsx'))
const Events = lazy(() => import('@/pages/Events.jsx'))
const Preise = lazy(() => import('@/pages/Preise.jsx'))
const Kontakt = lazy(() => import('@/pages/Kontakt.jsx'))
const Karte = lazy(() => import('@/pages/Karte.jsx'))
const Impressum = lazy(() => import('@/pages/Impressum.jsx'))
const Datenschutz = lazy(() => import('@/pages/Datenschutz.jsx'))
const NotFound = lazy(() => import('@/pages/NotFound.jsx'))

function PageFallback() {
  return (
    <div style={{ minHeight: '80svh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: '2px solid rgba(0,200,255,0.15)',
        borderTopColor: 'var(--neon-blue)',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  useLenis()

  return (
    <ErrorBoundary>
    <>
      <a className="skip-link" href="#content">
        Zum Inhalt springen
      </a>

      <BackgroundEngine />
      <Ticker />
      <Navigation />

      <main id="content" style={{ position: 'relative', zIndex: 4 }}>
        <Suspense fallback={<PageFallback />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                }
              />
              <Route
                path="/attraktionen"
                element={
                  <PageTransition>
                    <Attraktionen />
                  </PageTransition>
                }
              />
              <Route
                path="/events"
                element={
                  <PageTransition>
                    <Events />
                  </PageTransition>
                }
              />
              <Route
                path="/preise"
                element={
                  <PageTransition>
                    <Preise />
                  </PageTransition>
                }
              />
              <Route
                path="/kontakt"
                element={
                  <PageTransition>
                    <Kontakt />
                  </PageTransition>
                }
              />
              <Route
                path="/karte"
                element={
                  <PageTransition>
                    <Karte />
                  </PageTransition>
                }
              />
              <Route
                path="/impressum"
                element={
                  <PageTransition>
                    <Impressum />
                  </PageTransition>
                }
              />
              <Route
                path="/datenschutz"
                element={
                  <PageTransition>
                    <Datenschutz />
                  </PageTransition>
                }
              />
              <Route
                path="*"
                element={
                  <PageTransition>
                    <NotFound />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer />
      <ChatBot />
      <CursorGlow />
    </>
    </ErrorBoundary>
  )
}

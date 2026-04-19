import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { getResponse } from './chatLogic'
import { greetingMessage, suggestionChips } from '@/data/chatResponses'

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 5, padding: '12px 16px', alignItems: 'center' }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--neon-blue)',
            display: 'block',
          }}
        />
      ))}
    </div>
  )
}

function formatTime(date) {
  return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
}

export function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: greetingMessage, time: new Date() },
  ])
  const [showChips, setShowChips]   = useState(true)
  const [typing, setTyping]         = useState(false)
  const [input, setInput]           = useState('')
  const bottomRef                   = useRef(null)
  const inputRef                    = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 100)
    return () => clearTimeout(t)
  }, [])

  const send = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return

    setMessages((prev) => [...prev, { role: 'user', text: trimmed, time: new Date() }])
    setInput('')
    setShowChips(false)
    setTyping(true)

    setTimeout(() => {
      const reply = getResponse(trimmed)
      setTyping(false)
      setMessages((prev) => [...prev, { role: 'bot', text: reply, time: new Date() }])
    }, 900)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    send(input)
  }

  return (
    <GlassCard
      style={{
        width: 'min(360px, calc(100vw - 16px))',
        height: 'min(480px, calc(100dvh - 140px))',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '16px 18px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(7,9,15,0.5)',
      }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em' }}>
            GIGA BOT
          </div>
          <div style={{ fontSize: 11, color: 'var(--neon-green)', marginTop: 1 }}>Online</div>
        </div>
        <button
          aria-label="Chat schliessen"
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            padding: 6,
            minWidth: 44,
            minHeight: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          touchAction: 'pan-y',
          WebkitOverflowScrolling: 'touch',
          padding: '16px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
        onWheel={(e) => e.stopPropagation()}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: 3 }}>
            <div style={{
              maxWidth: '82%',
              padding: '10px 14px',
              borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: msg.role === 'user'
                ? 'rgba(0,200,255,0.18)'
                : 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              fontSize: 13.5,
              lineHeight: 1.6,
              color: 'var(--text-primary)',
            }}>
              {msg.text}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{formatTime(msg.time)}</div>
          </div>
        ))}

        {typing && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px 16px 16px 4px' }}>
              <TypingDots />
            </div>
          </div>
        )}

        <AnimatePresence>
          {showChips && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}
            >
              {suggestionChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => send(chip)}
                  style={{
                    background: 'rgba(0,200,255,0.08)',
                    border: '1px solid rgba(0,200,255,0.25)',
                    borderRadius: 999,
                    padding: '5px 12px',
                    fontSize: 12,
                    color: 'var(--neon-blue)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {chip}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        style={{
          padding: '10px 14px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: 8,
          background: 'rgba(7,9,15,0.5)',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Schreib etwas..."
          aria-label="Nachricht eingeben"
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 10,
            padding: '8px 14px',
            color: 'var(--text-primary)',
            fontSize: 14,
            outline: 'none',
            minHeight: 40,
          }}
        />
        <button
          type="submit"
          aria-label="Nachricht senden"
          disabled={!input.trim()}
          style={{
            background: input.trim() ? 'var(--neon-blue)' : 'rgba(0,200,255,0.15)',
            border: 'none',
            borderRadius: 10,
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: input.trim() ? 'pointer' : 'not-allowed',
            color: '#07090F',
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 8H2M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </form>
    </GlassCard>
  )
}

export default ChatWindow

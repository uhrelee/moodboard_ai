import { useState, useRef, useEffect } from 'react'

const EXAMPLES = [
  "I'm in my Harry's House era",
  "I'm in my Kendrick Lamar era",
  "I'm in my 2016 Golden State Warriors era",
  "I'm in my Cowboy Bebop era",
  "I'm in my Lana Del Rey Born to Die era",
  "I'm in my Outer Wilds era",
  "I'm in my Bad Bunny Un Verano Sin Ti era",
  "I'm in my early 2000s R&B era",
]

export default function LandingScreen({ onGenerate, error, apiKeys, onEditKeys }) {
  const [input, setInput] = useState('')
  const [placeholder, setPlaceholder] = useState(EXAMPLES[0])
  const [showKeys, setShowKeys] = useState(false)
  const inputRef = useRef(null)
  const exIdx = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      exIdx.current = (exIdx.current + 1) % EXAMPLES.length
      setPlaceholder(EXAMPLES[exIdx.current])
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = () => {
    const val = input.trim()
    if (!val) return
    onGenerate(val)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  const fillExample = (ex) => {
    setInput(ex)
    inputRef.current?.focus()
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* bg texture */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse at 20% 50%, rgba(139,111,90,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(196,149,106,0.08) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', width: '100%', animation: 'fadeUp 0.7s ease forwards' }}>

        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.25)',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            Your fandom. Your aesthetic. Your era.
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 12vw, 8rem)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            color: '#f0ede8',
            marginBottom: '1.5rem',
          }}>
            ERA
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '16px',
            lineHeight: 1.7,
            fontWeight: 300,
            maxWidth: '440px',
            margin: '0 auto',
          }}>
            Tell us what era you're in. We'll build a living moodboard — colors, photos, music, the whole vibe.
          </p>
        </div>

        {/* Input */}
        <div style={{
          position: 'relative',
          marginBottom: '1.5rem',
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={placeholder}
            style={{
              width: '100%',
              padding: '1.1rem 5rem 1.1rem 1.5rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              color: '#f0ede8',
              fontSize: '18px',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              outline: 'none',
              transition: 'all 0.2s',
              fontStyle: input ? 'normal' : 'italic',
            }}
            onFocus={e => {
              e.target.style.borderColor = 'rgba(255,255,255,0.3)'
              e.target.style.background = 'rgba(255,255,255,0.07)'
            }}
            onBlur={e => {
              e.target.style.borderColor = 'rgba(255,255,255,0.12)'
              e.target.style.background = 'rgba(255,255,255,0.05)'
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '8px 16px',
              background: input.trim() ? '#f0ede8' : 'rgba(255,255,255,0.08)',
              color: input.trim() ? '#0a0a0a' : 'rgba(255,255,255,0.2)',
              borderRadius: '5px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              transition: 'all 0.2s',
            }}
          >
            GO →
          </button>
        </div>

        {error && (
          <div style={{
            padding: '12px 16px',
            background: 'rgba(220, 80, 80, 0.1)',
            border: '1px solid rgba(220, 80, 80, 0.3)',
            borderRadius: '6px',
            color: '#ff8080',
            fontSize: '13px',
            fontFamily: 'var(--font-mono)',
            marginBottom: '1.5rem',
          }}>
            {error}
          </div>
        )}

        {/* Examples */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)', marginBottom: '12px', letterSpacing: '0.08em' }}>
            TRY ONE:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {EXAMPLES.slice(0, 5).map((ex, i) => (
              <button
                key={i}
                onClick={() => fillExample(ex)}
                style={{
                  padding: '6px 14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '100px',
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'italic',
                  transition: 'all 0.15s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.target.style.background = 'rgba(255,255,255,0.08)'
                  e.target.style.color = 'rgba(255,255,255,0.7)'
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'rgba(255,255,255,0.04)'
                  e.target.style.color = 'rgba(255,255,255,0.45)'
                }}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '1.5rem',
        }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)' }}>
            Gemini + Google Search · Fully free tier
          </p>
          <button
            onClick={() => setShowKeys(s => !s)}
            style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)', transition: 'color 0.15s' }}
            onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.25)'}
          >
            [ edit api keys ]
          </button>
        </div>

        {showKeys && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['gemini', 'google', 'googleCx'].map(k => (
              <div key={k}>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                  {k === 'googleCx' ? 'Search Engine ID' : k === 'google' ? 'Google API Key' : 'Gemini Key'}
                </p>
                <input
                  type="password"
                  defaultValue={apiKeys[k]}
                  onChange={e => onEditKeys({ ...apiKeys, [k]: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', color: '#f0ede8', fontSize: '13px', fontFamily: 'var(--font-mono)', outline: 'none' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

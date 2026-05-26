import { useState } from 'react'

export default function ApiSetup({ apiKeys, onSave }) {
  const [keys, setKeys] = useState({ llama: apiKeys.llama || '', unsplash: apiKeys.unsplash || '' })
  const [show, setShow] = useState(false)

  const ready = !!(keys.llama && keys.unsplash)

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: '#0a0a0a',
    }}>
      <div style={{ maxWidth: '480px', width: '100%', animation: 'fadeUp 0.6s ease forwards' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            ERA — Setup
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem', color: '#f0ede8' }}>
            Connect your keys
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: 1.7 }}>
            ERA uses Open Router to generate your moodboard and Unsplash for photos. Both are completely free.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <KeyField
            label="OpenRouter API Key"
            hint={<>Free at <a href="https://openrouter.ai" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>openrouter.ai</a> → Sign up → Keys → Create Key</>}
            value={keys.llama}
            onChange={v => setKeys(k => ({ ...k, llama: v }))}
            show={show}
            placeholder="sk-or-v1..."
          />
          <KeyField
            label="Unsplash Access Key"
            hint={<>Free at <a href="https://unsplash.com/developers" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>unsplash.com/developers</a> → New Application → copy Access Key</>}
            value={keys.unsplash}
            onChange={v => setKeys(k => ({ ...k, unsplash: v }))}
            show={show}
            placeholder="your-unsplash-access-key"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <button
            onClick={() => setShow(s => !s)}
            style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', fontFamily: 'var(--font-mono)' }}
          >
            {show ? '[ hide keys ]' : '[ show keys ]'}
          </button>
        </div>

        <button
          onClick={() => ready && onSave(keys)}
          style={{
            width: '100%',
            padding: '1rem',
            background: ready ? '#f0ede8' : 'rgba(255,255,255,0.08)',
            color: ready ? '#0a0a0a' : 'rgba(255,255,255,0.2)',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            letterSpacing: '0.08em',
            borderRadius: '4px',
            transition: 'all 0.2s ease',
            fontWeight: 700,
            cursor: ready ? 'pointer' : 'not-allowed',
          }}
        >
          ENTER THE ERA →
        </button>

        <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.2)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
          Keys saved locally in your browser only.
        </p>
      </div>
    </div>
  )
}

function KeyField({ label, hint, value, onChange, show, placeholder }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
        {label}
      </label>
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px 14px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '4px',
          color: '#f0ede8',
          fontSize: '14px',
          fontFamily: 'var(--font-mono)',
          outline: 'none',
          transition: 'border-color 0.2s',
          boxSizing: 'border-box',
        }}
        onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
      {hint && <p style={{ marginTop: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>{hint}</p>}
    </div>
  )
}

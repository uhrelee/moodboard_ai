import { useState } from 'react'

export default function ApiSetup({ apiKeys, onSave }) {
<<<<<<< HEAD
  const [keys, setKeys] = useState(apiKeys)
  const [show, setShow] = useState(false)

  const handleSave = () => {
    if (!keys.gemini || !keys.google || !keys.googleCx) return
    onSave(keys)
  }
=======
  const [keys, setKeys] = useState({ gemini: apiKeys.gemini || '', unsplash: apiKeys.unsplash || '' })
  const [show, setShow] = useState(false)

  const ready = !!(keys.gemini && keys.unsplash)
>>>>>>> ab1baba (reinitialize project with new files)

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: '#0a0a0a',
    }}>
<<<<<<< HEAD
      <div style={{
        maxWidth: '480px',
        width: '100%',
        animation: 'fadeUp 0.6s ease forwards',
      }}>
=======
      <div style={{ maxWidth: '480px', width: '100%', animation: 'fadeUp 0.6s ease forwards' }}>
>>>>>>> ab1baba (reinitialize project with new files)
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            ERA — Setup
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem', color: '#f0ede8' }}>
            Connect your keys
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: 1.7 }}>
<<<<<<< HEAD
            ERA uses Gemini AI + Google Custom Search. Both have generous free tiers — you won't pay a cent for demos.
=======
            ERA uses Gemini AI to generate your moodboard and Unsplash for photos. Both are completely free.
>>>>>>> ab1baba (reinitialize project with new files)
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <KeyField
            label="Gemini API Key"
<<<<<<< HEAD
            hint={<>Free at <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>aistudio.google.com</a></>}
            value={keys.gemini}
            onChange={v => setKeys(k => ({ ...k, gemini: v }))}
            show={show}
            placeholder="AIza..."
          />
          <KeyField
            label="Unsplash Access Key"
            hint={<>Free at <a href="https://unsplash.com/developers" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>unsplash.com/developers</a></>}
=======
            hint={<>Free at <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>aistudio.google.com</a> → Get API Key</>}
            value={keys.gemini}
            onChange={v => setKeys(k => ({ ...k, gemini: v }))}
            show={show}
            placeholder="AIzaSy..."
          />
          <KeyField
            label="Unsplash Access Key"
            hint={<>Free at <a href="https://unsplash.com/developers" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>unsplash.com/developers</a> → New Application → copy Access Key</>}
>>>>>>> ab1baba (reinitialize project with new files)
            value={keys.unsplash}
            onChange={v => setKeys(k => ({ ...k, unsplash: v }))}
            show={show}
            placeholder="your-unsplash-access-key"
          />
        </div>

<<<<<<< HEAD
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '1.5rem' }}>
=======
        <div style={{ marginBottom: '1.5rem' }}>
>>>>>>> ab1baba (reinitialize project with new files)
          <button
            onClick={() => setShow(s => !s)}
            style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', fontFamily: 'var(--font-mono)' }}
          >
<<<<<<< HEAD
            {show ? '[ hide ]' : '[ show ]'}
=======
            {show ? '[ hide keys ]' : '[ show keys ]'}
>>>>>>> ab1baba (reinitialize project with new files)
          </button>
        </div>

        <button
<<<<<<< HEAD
          onClick={handleSave}
          disabled={!keys.gemini || !keys.google || !keys.googleCx}
          style={{
            width: '100%',
            padding: '1rem',
            background: keys.gemini && keys.google && keys.googleCx ? '#f0ede8' : 'rgba(255,255,255,0.08)',
            color: keys.gemini && keys.google && keys.googleCx ? '#0a0a0a' : 'rgba(255,255,255,0.2)',
=======
          onClick={() => ready && onSave(keys)}
          style={{
            width: '100%',
            padding: '1rem',
            background: ready ? '#f0ede8' : 'rgba(255,255,255,0.08)',
            color: ready ? '#0a0a0a' : 'rgba(255,255,255,0.2)',
>>>>>>> ab1baba (reinitialize project with new files)
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            letterSpacing: '0.08em',
            borderRadius: '4px',
            transition: 'all 0.2s ease',
            fontWeight: 700,
<<<<<<< HEAD
=======
            cursor: ready ? 'pointer' : 'not-allowed',
>>>>>>> ab1baba (reinitialize project with new files)
          }}
        >
          ENTER THE ERA →
        </button>

        <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.2)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
<<<<<<< HEAD
          Keys saved locally in your browser. Never sent anywhere except directly to Google/Gemini.
=======
          Keys saved locally in your browser only.
>>>>>>> ab1baba (reinitialize project with new files)
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
<<<<<<< HEAD
        }}
        onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
      {hint && <p style={{ marginTop: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>{hint}</p>}
=======
          boxSizing: 'border-box',
        }}
        onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
      {hint && <p style={{ marginTop: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>{hint}</p>}
>>>>>>> ab1baba (reinitialize project with new files)
    </div>
  )
}

export default function LoadingScreen({ message, era }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      gap: '2rem',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '1.5px solid rgba(255,255,255,0.1)',
        borderTop: '1.5px solid rgba(255,255,255,0.6)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />

      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.7)',
          marginBottom: '0.5rem',
        }}>
          {era}
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.08em',
          animation: 'pulse 1.8s ease infinite',
        }}>
          {message}
        </p>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'

export default function MoodboardScreen({ data, images, era, onBack, onNew }) {
  const [newInput, setNewInput] = useState('')
  const [imgErrors, setImgErrors] = useState({})
  const p = data.palette || {}
  const primary = p.primary || '#e8d5b7'
  const secondary = p.secondary || '#8b6f5a'
  const accent = p.accent || '#c4956a'
  const dark = p.dark || '#1a1210'
  const light = p.light || '#f5ede0'

  const goodImages = images.filter((_, i) => !imgErrors[i])

  return (
    <div style={{
      minHeight: '100vh',
      background: dark,
      color: light,
      fontFamily: 'var(--font-body)',
    }}>
      {/* Hero header */}
      <div style={{
        position: 'relative',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem) clamp(2rem, 5vw, 3rem)',
        borderBottom: `1px solid ${hexAlpha(light, 0.1)}`,
        overflow: 'hidden',
      }}>
        {/* bg gradient */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: `radial-gradient(ellipse at 30% 60%, ${hexAlpha(accent, 0.18)} 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, ${hexAlpha(primary, 0.12)} 0%, transparent 50%)`,
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <button
              onClick={onBack}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: hexAlpha(light, 0.35),
                letterSpacing: '0.08em',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.target.style.color = hexAlpha(light, 0.7)}
              onMouseLeave={e => e.target.style.color = hexAlpha(light, 0.35)}
            >
              ← NEW ERA
            </button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: hexAlpha(light, 0.2), letterSpacing: '0.15em' }}>
              {data.years}
            </span>
          </div>

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: hexAlpha(accent, 0.8),
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            You are in your —
          </p>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: light,
            marginBottom: '1.5rem',
            maxWidth: '800px',
          }}>
            {data.era || data.subject}
          </h1>

          <p style={{
            fontSize: '16px',
            fontWeight: 300,
            fontStyle: 'italic',
            color: hexAlpha(light, 0.55),
            maxWidth: '600px',
            lineHeight: 1.6,
          }}>
            {data.aesthetic}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem)' }}>

        {/* Color palette */}
        <Section title="THE PALETTE" accent={accent} light={light}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[primary, secondary, accent, dark, light].map((color, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: 'clamp(50px, 10vw, 80px)',
                  height: 'clamp(50px, 10vw, 80px)',
                  background: color,
                  borderRadius: '6px',
                  border: `1px solid ${hexAlpha(light, 0.08)}`,
                  transition: 'transform 0.2s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: hexAlpha(light, 0.35) }}>
                  {p.names?.[i] || color}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Poem */}
        {data.poem && (
          <Section title="THE FEELING" accent={accent} light={light}>
            <div style={{
              padding: '2rem',
              background: hexAlpha(primary, 0.08),
              borderLeft: `3px solid ${hexAlpha(accent, 0.5)}`,
              borderRadius: '0 8px 8px 0',
            }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                lineHeight: 1.8,
                color: hexAlpha(light, 0.85),
                whiteSpace: 'pre-line',
              }}>
                {data.poem}
              </p>
            </div>
          </Section>
        )}

        {/* Image grid */}
        {goodImages.length > 0 && (
          <Section title="THE AESTHETIC" accent={accent} light={light}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '10px',
            }}>
              {goodImages.map((img, i) => (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    aspectRatio: i % 7 === 0 ? '16/9' : i % 5 === 0 ? '1/1.3' : '1/1',
                    gridColumn: i % 7 === 0 ? 'span 2' : 'span 1',
                    overflow: 'hidden',
                    borderRadius: '6px',
                    background: hexAlpha(light, 0.05),
                    animation: `fadeIn 0.4s ease ${i * 0.05}s both`,
                  }}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    onError={() => setImgErrors(e => ({ ...e, [i]: true }))}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                      display: 'block',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Keywords */}
        {data.keywords?.length > 0 && (
          <Section title="THE KEYWORDS" accent={accent} light={light}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {data.keywords.map((kw, i) => (
                <span
                  key={i}
                  style={{
                    padding: '8px 18px',
                    background: hexAlpha(accent, 0.1),
                    border: `1px solid ${hexAlpha(accent, 0.25)}`,
                    borderRadius: '100px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: hexAlpha(light, 0.7),
                    letterSpacing: '0.05em',
                    animation: `fadeIn 0.3s ease ${i * 0.04}s both`,
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Two-col: tracklist + fan archetype */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
        }}>
          {/* Track moods */}
          {data.tracklistMoods?.length > 0 && (
            <div>
              <SectionTitle title="THE SONGS" accent={accent} light={light} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {data.tracklistMoods.map((t, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 16px',
                    background: hexAlpha(light, 0.03),
                    border: `1px solid ${hexAlpha(light, 0.07)}`,
                    borderRadius: '8px',
                    animation: `fadeUp 0.4s ease ${i * 0.07}s both`,
                  }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: t.color || accent,
                      flexShrink: 0,
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '14px', fontWeight: 500, color: light, marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {t.track}
                      </p>
                      <p style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: hexAlpha(light, 0.4) }}>
                        {t.mood}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fan archetype + vibe check */}
          <div>
            {data.fanArchetype && (
              <>
                <SectionTitle title="YOUR ARCHETYPE" accent={accent} light={light} />
                <div style={{
                  padding: '1.5rem',
                  background: `linear-gradient(135deg, ${hexAlpha(accent, 0.12)}, ${hexAlpha(primary, 0.08)})`,
                  border: `1px solid ${hexAlpha(accent, 0.2)}`,
                  borderRadius: '10px',
                  marginBottom: '1.5rem',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                    fontStyle: 'italic',
                    color: light,
                    lineHeight: 1.6,
                  }}>
                    "{data.fanArchetype}"
                  </p>
                </div>
              </>
            )}

            {data.vibeCheck && (
              <>
                <SectionTitle title="VIBE CHECK" accent={accent} light={light} />
                <p style={{
                  fontSize: '15px',
                  color: hexAlpha(light, 0.6),
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  padding: '1rem',
                  background: hexAlpha(light, 0.03),
                  borderRadius: '8px',
                  border: `1px solid ${hexAlpha(light, 0.07)}`,
                }}>
                  {data.vibeCheck}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Recommended artists */}
        {data.recommendedArtists?.length > 0 && (
          <Section title="IF YOU'RE IN THIS ERA, YOU'LL LOVE" accent={accent} light={light}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '12px',
            }}>
              {data.recommendedArtists.map((a, i) => (
                <div key={i} style={{
                  padding: '16px',
                  background: hexAlpha(light, 0.03),
                  border: `1px solid ${hexAlpha(light, 0.08)}`,
                  borderRadius: '10px',
                  animation: `fadeUp 0.4s ease ${i * 0.06}s both`,
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = hexAlpha(accent, 0.3)
                    e.currentTarget.style.background = hexAlpha(accent, 0.07)
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = hexAlpha(light, 0.08)
                    e.currentTarget.style.background = hexAlpha(light, 0.03)
                  }}
                >
                  <p style={{ fontSize: '15px', fontWeight: 500, color: light, marginBottom: '6px' }}>{a.name}</p>
                  <p style={{ fontSize: '12px', color: hexAlpha(light, 0.4), lineHeight: 1.5 }}>{a.reason}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* New era input */}
        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          background: hexAlpha(light, 0.03),
          border: `1px solid ${hexAlpha(light, 0.08)}`,
          borderRadius: '12px',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontStyle: 'italic', color: hexAlpha(light, 0.6), marginBottom: '1.5rem' }}>
            Enter a new era
          </p>
          <div style={{ display: 'flex', gap: '10px', maxWidth: '500px', margin: '0 auto' }}>
            <input
              value={newInput}
              onChange={e => setNewInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && newInput.trim() && onNew(newInput.trim())}
              placeholder="I'm in my ________ era"
              style={{
                flex: 1,
                padding: '12px 16px',
                background: hexAlpha(light, 0.05),
                border: `1px solid ${hexAlpha(light, 0.12)}`,
                borderRadius: '6px',
                color: light,
                fontSize: '16px',
                fontFamily: 'var(--font-body)',
                fontStyle: 'italic',
                outline: 'none',
              }}
            />
            <button
              onClick={() => newInput.trim() && onNew(newInput.trim())}
              style={{
                padding: '12px 20px',
                background: newInput.trim() ? light : hexAlpha(light, 0.08),
                color: newInput.trim() ? dark : hexAlpha(light, 0.2),
                borderRadius: '6px',
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
        </div>

        <div style={{ height: '4rem' }} />
      </div>
    </div>
  )
}

function Section({ title, accent, light, children }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <SectionTitle title={title} accent={accent} light={light} />
      {children}
    </div>
  )
}

function SectionTitle({ title, accent, light }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '0.2em',
        color: hexAlpha(accent, 0.7),
        textTransform: 'uppercase',
      }}>
        {title}
      </span>
      <div style={{ flex: 1, height: '1px', background: hexAlpha(light, 0.08) }} />
    </div>
  )
}

function hexAlpha(hex, alpha) {
  if (!hex || !hex.startsWith('#')) return `rgba(240,237,232,${alpha})`
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

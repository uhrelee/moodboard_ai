import React from 'react'
import './index.css'

export default function AuraApp() {
  const [input, setInput] = React.useState('')
  const [interests, setInterests] = React.useState(() => {
    const saved = localStorage.getItem('aura_interests')
    return saved ? JSON.parse(saved) : []
  })

  const [briefing, setBriefing] = React.useState(() => {
    return localStorage.getItem('aura_briefing') || ''
  })

  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    localStorage.setItem('aura_interests', JSON.stringify(interests))
  }, [interests])

  React.useEffect(() => {
    if (briefing) {
      localStorage.setItem('aura_briefing', briefing)
    }
  }, [briefing])

  const addInterest = () => {
    if (!input.trim()) return
    if (interests.length >= 5) return

    setInterests([...interests, input.trim()])
    setInput('')
  }

  const removeInterest = (index) => {
    setInterests(interests.filter((_, i) => i !== index))
  }

  const generateBriefing = async () => {
    setLoading(true)

    const prompt = `You are Aura, an emotionally intelligent AI cultural identity system.

The user loves these things:
${interests.map(i => `- ${i}`).join('\n')}

Generate a DAILY VIBE BRIEFING.

The tone should feel like:
- early internet
- Tumblr era emotional writing
- poetic but concise
- culturally observant
- slightly futuristic

Respond in this exact format:

Today's energy:
[1-2 sentence emotional summary]

You're drawn toward worlds that are:
- bullet
- bullet
- bullet

Current aesthetic drift:
[aesthetic phrase]

Recommended:
- Watch: something specific
- Album: something specific
- Stream vibe: something specific
- Bonus obsession: something specific

Keep it under 180 words.`

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      })

      const data = await res.json()
      const text = data.choices?.[0]?.message?.content || 'Aura could not read your vibe today.'

      setBriefing(text)
    } catch (err) {
      setBriefing('Connection lost in the cultural ether. Try again.')
    }

    setLoading(false)
  }

  const clearAura = () => {
    localStorage.removeItem('aura_interests')
    localStorage.removeItem('aura_briefing')
    setInterests([])
    setBriefing('')
  }

  return (
    <div className="app">
      <div className="topbar">
        <div>◉ ◉ ◉</div>
        <div>AURA.exe — cultural identity system</div>
        <div>online</div>
      </div>

      <div className="container">
        <div className="window">
          <div className="window-header">
            <h1>AURA</h1>
            <p>build 2003</p>
          </div>

          <div className="content-grid">
            <div>
              <div className="panel blue-panel">
                <p className="panel-title">enter 3–5 things you love</p>

                <div className="input-row">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addInterest()}
                    placeholder="arcane, mitski, giants baseball..."
                  />

                  <button onClick={addInterest}>add</button>
                </div>

                <div className="interest-list">
                  {interests.map((item, index) => (
                    <div key={index} className="interest-tag">
                      <span>{item}</span>
                      <button onClick={() => removeInterest(index)}>
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel pink-panel">
                <p className="panel-title">aura memory</p>

                <p>
                  Aura remembers your cultural identity and adapts future generations based on your emotional and aesthetic patterns.
                </p>
              </div>

              <div className="button-row">
                <button
                  className="generate-btn"
                  onClick={generateBriefing}
                  disabled={interests.length < 3 || loading}
                >
                  {loading ? 'reading your vibe...' : 'generate briefing'}
                </button>

                <button className="reset-btn" onClick={clearAura}>
                  reset aura
                </button>
              </div>
            </div>

            <div>
              <div className="terminal">
                <div className="terminal-title">
                  AURA PERSONALITY TERMINAL v1.3
                </div>

                {briefing ? (
                  <div>{briefing}</div>
                ) : (
                  <div className="placeholder">
                    {'>'} waiting for cultural input...
                    <br />
                    <br />
                    example profile:
                    <br />- arcane
                    <br />- mitski
                    <br />- san francisco giants
                    <br />- jerma985
                    <br />- rosalía
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>memory layer</h3>
            <p>
              Aura stores your cultural preferences locally and adapts future generations.
            </p>
          </div>

          <div className="feature-card">
            <h3>identity modeling</h3>
            <p>
              The AI identifies emotional and aesthetic patterns across fandoms and media.
            </p>
          </div>

          <div className="feature-card">
            <h3>proactive personalization</h3>
            <p>
              Daily briefings evolve as the user's taste profile changes over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


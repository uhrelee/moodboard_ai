import { useState, useEffect, useRef } from 'react'
import LandingScreen from './components/LandingScreen'
import MoodboardScreen from './components/MoodboardScreen'
import LoadingScreen from './components/LoadingScreen'
import ApiSetup from './components/ApiSetup'

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [eraInput, setEraInput] = useState('')
  const [moodboardData, setMoodboardData] = useState(null)
  const [images, setImages] = useState([])
  const [apiKeys, setApiKeys] = useState(() => {
    try {
      return {
        gemini: localStorage.getItem('era_gemini_key') || '',
        unsplash: localStorage.getItem('era_unsplash_key') || '',
      }
    } catch { return { gemini: '', google: '', googleCx: '' } }
  })
  const [loadingMessage, setLoadingMessage] = useState('')
  const [error, setError] = useState('')

  const saveKeys = (keys) => {
    setApiKeys(keys)
    try {
      localStorage.setItem('era_gemini_key', keys.gemini)
      localStorage.setItem('era_unsplash_key', keys.unsplash)
    } catch {}
  }

  const hasKeys = apiKeys.gemini && apiKeys.unsplash

  const generateMoodboard = async (input) => {
    setEraInput(input)
    setScreen('loading')
    setError('')

    const messages = [
      'Reading the energy...',
      'Feeling the aesthetic...',
      'Pulling the vibes together...',
      'Almost ready...',
    ]
    let i = 0
    setLoadingMessage(messages[0])
    const interval = setInterval(() => {
      i = (i + 1) % messages.length
      setLoadingMessage(messages[i])
    }, 1800)

    try {
      const geminiData = await callGemini(input, apiKeys.gemini)
      const imageResults = await searchImages(geminiData.imageQueries, apiKeys.unsplash)
      clearInterval(interval)
      setMoodboardData(geminiData)
      setImages(imageResults)
      setScreen('moodboard')
    } catch (err) {
      clearInterval(interval)
      setError(err.message || 'Something went wrong. Check your API keys.')
      setScreen('landing')
    }
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {!hasKeys && screen === 'landing' && (
        <ApiSetup apiKeys={apiKeys} onSave={saveKeys} />
      )}
      {screen === 'landing' && hasKeys && (
        <LandingScreen onGenerate={generateMoodboard} error={error} apiKeys={apiKeys} onEditKeys={saveKeys} />
      )}
      {screen === 'loading' && (
        <LoadingScreen message={loadingMessage} era={eraInput} />
      )}
      {screen === 'moodboard' && moodboardData && (
        <MoodboardScreen
          data={moodboardData}
          images={images}
          era={eraInput}
          onBack={() => setScreen('landing')}
          onNew={(input) => generateMoodboard(input)}
        />
      )}
    </div>
  )
}

async function callGemini(input, apiKey) {
  const prompt = `You are an AI that creates deeply personal, culturally rich era moodboards. The user has typed: "${input}"

Extract the subject (artist, album, show, game, team, era, vibe) and generate a rich moodboard profile.

Respond ONLY with a valid JSON object, no markdown, no backticks, exactly this shape:
{
  "subject": "Harry Styles - Harry's House",
  "era": "Harry's House Era",
  "years": "2022",
  "palette": {
    "primary": "#e8d5b7",
    "secondary": "#8b6f5a",
    "accent": "#c4956a",
    "dark": "#2a1f1a",
    "light": "#f5ede0",
    "names": ["Linen", "Warm Walnut", "Honey Gold", "Espresso", "Ivory"]
  },
  "aesthetic": "cottagecore maximalism meets 70s pop warmth — sunlit rooms, worn-in comfort, vintage clutter with intention",
  "poem": "Four lines of evocative poetry that captures the emotional essence of this era. Make it beautiful and specific.",
  "keywords": ["cozy", "nostalgic", "warm", "domestic", "tender", "indie pop", "70s revival"],
  "font": "serif",
  "imageQueries": [
    "Harry Styles Harry's House album 2022",
    "Harry Styles As It Was photoshoot",
    "cottagecore aesthetic warm tones interior",
    "vintage 70s warm living room aesthetic",
    "Harry Styles concert tour 2022 outfits",
    "sunlit kitchen botanical aesthetic",
    "Harry Styles Coachella 2022",
    "warm honey golden hour photography aesthetic"
  ],
  "tracklistMoods": [
    { "track": "Music For a Sushi Restaurant", "mood": "playful opener", "color": "#e8956a" },
    { "track": "Late Night Talking", "mood": "giddy 3am energy", "color": "#f4c892" },
    { "track": "Grapejuice", "mood": "wistful and golden", "color": "#c4956a" },
    { "track": "As It Was", "mood": "bittersweet anthem", "color": "#8b9bb4" },
    { "track": "Daylight", "mood": "morning optimism", "color": "#f0d4a0" }
  ],
  "vibeCheck": "This era is for people who make their bed with fresh lavender, have a favorite mug, and know that comfort can be radical.",
  "recommendedArtists": [
    { "name": "Benee", "reason": "same warm indie pop softness" },
    { "name": "Phoebe Bridgers", "reason": "emotional vulnerability with gorgeous production" },
    { "name": "Rex Orange County", "reason": "sunny bedroom pop with real heart" },
    { "name": "Clairo", "reason": "intimate, domestic, quietly profound" },
    { "name": "Steve Lacy", "reason": "70s-inflected genre-bending cool" }
  ],
  "fanArchetype": "The Tender Maximalist — you collect things that matter, you cry at chord progressions, you make places feel like home"
}

Be specific to the actual subject. If it's a sports team, adapt the fields accordingly (replace tracks with key moments/games, replace artists with similar team vibes). If it's a video game, adapt for that world. The fields should feel authentic to the fandom.`

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.85, maxOutputTokens: 2000 }
    })
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(`Gemini error: ${err.error?.message || res.status}`)
  }

  const data = await res.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

  try {
    return JSON.parse(cleaned)
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/)
    if (match) return JSON.parse(match[0])
    throw new Error('Could not parse Gemini response')
  }
}

async function searchImages(queries, unsplashKey) {
  const results = []
  const toSearch = queries?.slice(0, 5) || []

  for (const query of toSearch) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=4&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${unsplashKey}` } }
      )
      if (!res.ok) continue
      const data = await res.json()
      data.results?.forEach(photo => {
        results.push({
          url: photo.urls.regular,
          thumb: photo.urls.small,
          title: photo.alt_description || query,
          query,
        })
      })
    } catch {}
  }

  return results.slice(0, 18)
}

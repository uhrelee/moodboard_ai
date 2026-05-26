# ERA — Your Fandom Moodboard

> Tell us what era you're in. We'll build a living moodboard — colors, photos, music, the whole vibe.

## What it does

Type "I'm in my Harry's House era" (or any artist / album / team / show / game) and ERA generates:
- **Color palette** — extracted and named for your era
- **Aesthetic descriptor** — the vibe in one sentence
- **A poem** — 4 lines capturing the emotional essence
- **Photo grid** — real images pulled from Google Custom Search
- **Keywords** — the cultural vocabulary of your era
- **Track moods** — each song/moment with a color and feeling
- **Fan archetype** — who you are as a fan of this thing
- **Vibe check** — a one-liner that either nails you or roasts you
- **Recommendations** — 5 artists/creators with the same energy

## Stack

- **React + Vite** — frontend
- **Gemini 2.0 Flash** — AI generation (free tier: ~1000 requests/day)
- **Google Custom Search API** — image search (free tier: 100 queries/day)
- **Vercel** — hosting (free)

## Deploy to Vercel (2 minutes)

### Option A: GitHub + Vercel (recommended)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects Vite — just click Deploy
4. Done. Your app is live.

### Option B: Vercel CLI
```bash
npm install -g vercel
vercel
```

## API Keys Setup

You need 3 free keys:

### 1. Gemini API Key
- Go to [aistudio.google.com](https://aistudio.google.com)
- Click "Get API Key" → Create API Key
- Free tier: 15 requests/min, 1500/day

### 2. Google Custom Search API Key
- Go to [console.cloud.google.com](https://console.cloud.google.com)
- Create a project → Enable "Custom Search API"
- APIs & Services → Credentials → Create API Key
- Free tier: 100 queries/day

### 3. Custom Search Engine ID
- Go to [programmablesearchengine.google.com](https://programmablesearchengine.google.com)
- Create a search engine → set to "Search the entire web"
- Copy the "Search engine ID" (cx value)
- Free, no limits

Keys are stored in localStorage — never sent anywhere except directly to Google's APIs.

## Local dev

```bash
npm install
npm run dev
```

## How this relates to an AI OS

This app is a prototype of the **personalization layer** of an AI OS:
- Natural language input → context understanding
- "I'm in my X era" is an identity signal the OS would ingest passively
- The moodboard IS the dynamic environment — what your device would look/feel like if it reflected who you are right now
- Proactive personalization: the OS notices you've been in this era and adapts
# moodboard_ai

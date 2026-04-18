# Stylist AI 👗✨

A luxury AI-powered personal stylist — daily outfits synced to your local weather, built with React + Vite + Claude AI.

## Features

- **Weather-Synced OOTD** — Fetches live weather via Open-Meteo (no key needed) and generates a daily outfit recommendation powered by Claude AI
- **AI Wardrobe Tagging** — Upload a clothing photo and Claude Vision auto-tags category, color, and style
- **Missing Piece Algorithm** — Detects gaps in your wardrobe relative to the weather and surfaces targeted affiliate recommendations
- **Inspo Feed** — Community outfits with weather context and heart interactions
- **PWA-ready** — Mobile-first, installable on iOS & Android

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 + CSS Variables |
| Animation | Framer Motion 11 |
| AI Engine | Claude claude-sonnet-4-20250514 (Vision + Text) |
| Weather | Open-Meteo (free, no key) |
| Icons | Lucide React |

## Getting Started

### 1. Clone & install

```bash
git clone <your-repo>
cd stylist-ai
npm install
```

### 2. Add your Anthropic API key

```bash
cp .env.example .env
# Edit .env and paste your key:
# ANTHROPIC_API_KEY=sk-ant-...
```

Get a key at [console.anthropic.com](https://console.anthropic.com).

### 3. Run the dev server

```bash
npm run dev
```

Vite proxies `/api/claude → api.anthropic.com` and injects your API key server-side — it never reaches the browser bundle.

Open [http://localhost:5173](http://localhost:5173) in your browser, or scan the QR code shown in the terminal to test on your phone.

## Project Structure

```
src/
├── App.jsx                  # Root — state, routing, AI orchestration
├── main.jsx                 # React entry point
├── index.css                # Global styles + CSS design tokens
│
├── lib/
│   ├── constants.js         # Sample data, affiliate items, category colors
│   ├── weather.js           # Open-Meteo integration + WMO code parser
│   └── ai.js                # Claude API calls (tagImage, generateOOTD)
│
├── components/
│   ├── ui.jsx               # Spinner, Toast, ClothIcon, useToast hook
│   ├── BottomNav.jsx        # Tab navigation
│   ├── WeatherCard.jsx      # Weather display card
│   ├── OOTDCard.jsx         # Outfit display + tip + skeleton
│   ├── AffiliateCard.jsx    # "Complete the Look" affiliate card
│   ├── ItemModal.jsx        # Bottom sheet for wardrobe item detail
│   └── InspoCard.jsx        # Community post card with like
│
└── screens/
    ├── HomeScreen.jsx       # Today tab — OOTD + weather
    ├── WardrobeScreen.jsx   # Wardrobe tab — upload + grid
    └── InspoScreen.jsx      # Inspo tab — community feed
```

## Production Deployment

> ⚠️ The Vite proxy is for **local development only**. In production, your API key must live on a backend.

For production, create a small serverless function (Vercel Edge Function, Cloudflare Worker, or Express endpoint) that:
1. Receives requests from the frontend
2. Adds your `ANTHROPIC_API_KEY` header
3. Forwards to `https://api.anthropic.com/v1/messages`

Then update `src/lib/ai.js` to point to your new endpoint instead of `/api/claude/v1/messages`.

## Extending the App

### Add Supabase auth + storage
1. `npm install @supabase/supabase-js`
2. Create a `src/lib/supabase.js` client
3. Replace `useState(SAMPLE_WARDROBE)` in `App.jsx` with a Supabase query
4. Upload images to Supabase Storage instead of storing as base64

### Add background removal
Integrate `remove.bg` API in `src/lib/ai.js` before tagging:
```js
// Call remove.bg, get clean PNG, then pass to tagImage()
```

### Real Amazon affiliate links
Replace the `q` query strings in `src/lib/constants.js` with your actual Amazon Associate tracking links.

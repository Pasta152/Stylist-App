import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

import BottomNav          from './components/BottomNav'
import GDPRBanner         from './components/GDPRBanner'
import { Toast, useToast } from './components/ui'

import HomeScreen     from './screens/HomeScreen'
import WardrobeScreen from './screens/WardrobeScreen'
import InspoScreen    from './screens/InspoScreen'

import { SAMPLE_WARDROBE, pickAffiliate } from './lib/constants'
import { fetchWeather, FALLBACK_WEATHER }  from './lib/weather'
import { generateOOTD }                    from './lib/ai'
import {
  canGenerateOOTD,
  canUploadItem,
  recordOOTD,
  recordUpload,
  getUsageInfo,
} from './lib/usageLimit'

export default function App() {
  /* ── Tab routing ─────────────────────────────────────────── */
  const [tab, setTab] = useState('home')

  /* ── Wardrobe state ──────────────────────────────────────── */
  const [wardrobe, setWardrobe] = useState(SAMPLE_WARDROBE)

  /* ── Weather state ───────────────────────────────────────── */
  const [weather, setWeather]               = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(true)

  /* ── OOTD state ──────────────────────────────────────────── */
  const [ootd, setOotd]             = useState(null)
  const [ootdLoading, setOotdLoading] = useState(false)
  const [ootdLimitHit, setOotdLimitHit] = useState(false)

  /* ── Community likes ─────────────────────────────────────── */
  const [liked, setLiked] = useState(new Set())

  /* ── Toast notifications ─────────────────────────────────── */
  const { toast, notify } = useToast()

  /* ── Fetch weather on mount ──────────────────────────────── */
  useEffect(() => {
    fetchWeather()
      .then((w) => { setWeather(w); setWeatherLoading(false) })
      .catch(() => { setWeather(FALLBACK_WEATHER); setWeatherLoading(false) })
  }, [])

  /* ── Auto-generate OOTD once weather + wardrobe are ready ── */
  useEffect(() => {
    if (weather && wardrobe.length > 0 && !ootd && !ootdLoading) {
      runOOTD(weather)
    }
  }, [weather]) // eslint-disable-line

  /* ── OOTD generation with usage limit check ──────────────── */
  async function runOOTD(w = weather) {
    if (!w || wardrobe.length === 0) return

    // Check daily limit
    if (!canGenerateOOTD()) {
      setOotdLimitHit(true)
      return
    }

    setOotdLoading(true)
    setOotdLimitHit(false)

    try {
      const data      = await generateOOTD(wardrobe, w)
      const affiliate = pickAffiliate(w, data)
      setOotd({ ...data, affiliate })
      recordOOTD() // track usage after success
    } catch (err) {
      if (err.message === 'RATE_LIMIT') {
        setOotdLimitHit(true)
        notify('Daily limit reached. Come back tomorrow!', 'info')
      } else {
        console.error('OOTD generation failed:', err)
        // Graceful fallback
        const fallback = {
          outfit:          wardrobe.slice(0, 3).map((i) => i.name),
          description:     `It's ${w.temp}°C and ${w.condition.label.toLowerCase()} in ${w.city} — a perfect day for a curated everyday look.`,
          vibe:            'Casual',
          tip:             'Tuck your top on one side for an effortless, intentional silhouette.',
          missingCategory: null,
        }
        setOotd({ ...fallback, affiliate: pickAffiliate(w, fallback) })
        recordOOTD()
      }
    }

    setOotdLoading(false)
  }

  /* ── Remix handler ───────────────────────────────────────── */
  function handleRemix() {
    if (!canGenerateOOTD()) {
      setOotdLimitHit(true)
      notify('Daily limit reached. Come back tomorrow!', 'info')
      return
    }
    setOotd(null)
    runOOTD()
  }

  /* ── Reset OOTD when wardrobe changes ────────────────────── */
  function handleOotdReset() { setOotd(null) }

  /* ── Like toggle ─────────────────────────────────────────── */
  function toggleLike(id) {
    setLiked((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  /* ── Wardrobe upload with limit check ────────────────────── */
  function handleUploadCheck() {
    if (!canUploadItem()) {
      notify('Daily upload limit reached. Come back tomorrow!', 'info')
      return false
    }
    recordUpload()
    return true
  }

  /* ── Render ──────────────────────────────────────────────── */
  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} />}
      <GDPRBanner />

      <div style={{ paddingBottom: 80 }}>
        <AnimatePresence mode="wait">
          {tab === 'home' && (
            <HomeScreen
              key="home"
              weather={weather}
              weatherLoading={weatherLoading}
              ootd={ootd}
              ootdLoading={ootdLoading}
              ootdLimitHit={ootdLimitHit}
              wardrobe={wardrobe}
              onRemix={handleRemix}
              usageInfo={getUsageInfo()}
            />
          )}

          {tab === 'wardrobe' && (
            <WardrobeScreen
              key="wardrobe"
              wardrobe={wardrobe}
              setWardrobe={setWardrobe}
              onNotify={notify}
              onOotdReset={handleOotdReset}
              onUploadCheck={handleUploadCheck}
            />
          )}

          {tab === 'inspo' && (
            <InspoScreen
              key="inspo"
              liked={liked}
              toggleLike={toggleLike}
            />
          )}
        </AnimatePresence>
      </div>

      <BottomNav tab={tab} setTab={setTab} />
    </>
  )
}

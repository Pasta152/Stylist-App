import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

import BottomNav     from './components/BottomNav'
import { Toast, useToast } from './components/ui'

import HomeScreen    from './screens/HomeScreen'
import WardrobeScreen from './screens/WardrobeScreen'
import InspoScreen   from './screens/InspoScreen'

import { SAMPLE_WARDROBE, pickAffiliate } from './lib/constants'
import { fetchWeather, FALLBACK_WEATHER }  from './lib/weather'
import { generateOOTD }                    from './lib/ai'

export default function App() {
  /* ── Tab routing ─────────────────────────────────────────── */
  const [tab, setTab] = useState('home')

  /* ── Wardrobe state ──────────────────────────────────────── */
  const [wardrobe, setWardrobe] = useState(SAMPLE_WARDROBE)

  /* ── Weather state ───────────────────────────────────────── */
  const [weather, setWeather]             = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(true)

  /* ── OOTD state ──────────────────────────────────────────── */
  const [ootd, setOotd]         = useState(null)
  const [ootdLoading, setOotdLoading] = useState(false)

  /* ── Community likes ─────────────────────────────────────── */
  const [liked, setLiked] = useState(new Set())

  /* ── Toast notifications ─────────────────────────────────── */
  const { toast, notify } = useToast()

  /* ── Fetch weather on mount ──────────────────────────────── */
  useEffect(() => {
    fetchWeather()
      .then((w) => {
        setWeather(w)
        setWeatherLoading(false)
      })
      .catch(() => {
        setWeather(FALLBACK_WEATHER)
        setWeatherLoading(false)
      })
  }, [])

  /* ── Auto-generate OOTD once weather + wardrobe are ready ── */
  useEffect(() => {
    if (weather && wardrobe.length > 0 && !ootd && !ootdLoading) {
      runOOTD(weather)
    }
  }, [weather]) // eslint-disable-line

  /* ── OOTD generation ─────────────────────────────────────── */
  async function runOOTD(w = weather) {
    if (!w || wardrobe.length === 0) return
    setOotdLoading(true)
    try {
      const data      = await generateOOTD(wardrobe, w)
      const affiliate = pickAffiliate(w, data)
      setOotd({ ...data, affiliate })
    } catch (err) {
      console.error('OOTD generation failed:', err)
      // Graceful fallback — pick first 3 items from wardrobe
      const fallback = {
        outfit:          wardrobe.slice(0, 3).map((i) => i.name),
        description:     `It's ${w.temp}°C and ${w.condition.label.toLowerCase()} in ${w.city} — a perfect day for a curated everyday look.`,
        vibe:            'Casual',
        tip:             'Tuck your top on one side for an effortless, intentional silhouette.',
        missingCategory: null,
      }
      setOotd({ ...fallback, affiliate: pickAffiliate(w, fallback) })
    }
    setOotdLoading(false)
  }

  /* ── Remix handler ───────────────────────────────────────── */
  function handleRemix() {
    setOotd(null)
    runOOTD()
  }

  /* ── Reset OOTD when wardrobe changes ────────────────────── */
  function handleOotdReset() {
    setOotd(null)
  }

  /* ── Like toggle ─────────────────────────────────────────── */
  function toggleLike(id) {
    setLiked((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  /* ── Render ──────────────────────────────────────────────── */
  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      <div style={{ paddingBottom: 80 }}>
        <AnimatePresence mode="wait">
          {tab === 'home' && (
            <HomeScreen
              key="home"
              weather={weather}
              weatherLoading={weatherLoading}
              ootd={ootd}
              ootdLoading={ootdLoading}
              wardrobe={wardrobe}
              onRemix={handleRemix}
            />
          )}

          {tab === 'wardrobe' && (
            <WardrobeScreen
              key="wardrobe"
              wardrobe={wardrobe}
              setWardrobe={setWardrobe}
              onNotify={notify}
              onOotdReset={handleOotdReset}
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

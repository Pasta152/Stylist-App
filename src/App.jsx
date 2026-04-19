import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

import BottomNav          from './components/BottomNav'
import { Toast, useToast } from './components/ui'

import AuthScreen    from './screens/AuthScreen'
import HomeScreen    from './screens/HomeScreen'
import WardrobeScreen from './screens/WardrobeScreen'
import InspoScreen   from './screens/InspoScreen'
import ProfileScreen from './screens/ProfileScreen'

import { SAMPLE_WARDROBE, pickAffiliate } from './lib/constants'
import { fetchWeather, FALLBACK_WEATHER }  from './lib/weather'
import { generateOOTD }                    from './lib/ai'
import {
  getCurrentUser,
  getUserWardrobe,
  saveUserWardrobe,
  getUserLiked,
  saveUserLiked,
} from './lib/auth'

export default function App() {
  /* ── Auth state ──────────────────────────────────────────── */
  const [user, setUser] = useState(() => getCurrentUser())

  /* ── Tab routing ─────────────────────────────────────────── */
  const [tab, setTab] = useState('home')

  /* ── Wardrobe state (per-user) ───────────────────────────── */
  const [wardrobe, setWardrobeState] = useState(() => {
    if (!user) return SAMPLE_WARDROBE
    return getUserWardrobe(user.id) ?? SAMPLE_WARDROBE
  })

  /* ── Weather state ───────────────────────────────────────── */
  const [weather, setWeather]               = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(true)

  /* ── OOTD state ──────────────────────────────────────────── */
  const [ootd, setOotd]           = useState(null)
  const [ootdLoading, setOotdLoading] = useState(false)

  /* ── Community likes (per-user) ──────────────────────────── */
  const [liked, setLikedState] = useState(() => {
    if (!user) return new Set()
    return getUserLiked(user.id)
  })

  /* ── Toast notifications ─────────────────────────────────── */
  const { toast, notify } = useToast()

  /* ── Persist wardrobe on change ──────────────────────────── */
  function setWardrobe(nextOrUpdater) {
    setWardrobeState(prev => {
      const next = typeof nextOrUpdater === 'function' ? nextOrUpdater(prev) : nextOrUpdater
      if (user) saveUserWardrobe(user.id, next)
      return next
    })
  }

  /* ── Persist likes on change ─────────────────────────────── */
  function setLiked(updater) {
    setLikedState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (user) saveUserLiked(user.id, next)
      return next
    })
  }

  /* ── Load user data on login ─────────────────────────────── */
  function handleAuth(loggedInUser) {
    setUser(loggedInUser)
    setWardrobeState(getUserWardrobe(loggedInUser.id) ?? SAMPLE_WARDROBE)
    setLikedState(getUserLiked(loggedInUser.id))
    setOotd(null)
    setTab('home')
  }

  /* ── Clear state on logout ───────────────────────────────── */
  function handleLogout() {
    setUser(null)
    setWardrobeState(SAMPLE_WARDROBE)
    setLikedState(new Set())
    setOotd(null)
    setTab('home')
  }

  /* ── Update user profile in state ────────────────────────── */
  function handleUserUpdate(updated) {
    setUser(updated)
    notify('Το προφίλ ενημερώθηκε', 'success')
  }

  /* ── Fetch weather on mount ──────────────────────────────── */
  useEffect(() => {
    fetchWeather()
      .then(w => { setWeather(w); setWeatherLoading(false) })
      .catch(() => { setWeather(FALLBACK_WEATHER); setWeatherLoading(false) })
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
      const fallback = {
        outfit:          wardrobe.slice(0, 3).map(i => i.name),
        description:     `It's ${w.temp}°C and ${w.condition.label.toLowerCase()} in ${w.city} — a perfect day for a curated everyday look.`,
        vibe:            'Casual',
        tip:             'Tuck your top on one side for an effortless, intentional silhouette.',
        missingCategory: null,
      }
      setOotd({ ...fallback, affiliate: pickAffiliate(w, fallback) })
    }
    setOotdLoading(false)
  }

  function handleRemix()    { setOotd(null); runOOTD() }
  function handleOotdReset() { setOotd(null) }

  function toggleLike(id) {
    setLiked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  /* ── Show auth screen if not logged in ───────────────────── */
  if (!user) {
    return <AuthScreen onAuth={handleAuth} />
  }

  /* ── Main app ────────────────────────────────────────────── */
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

          {tab === 'profile' && (
            <ProfileScreen
              key="profile"
              user={user}
              wardrobe={wardrobe}
              liked={liked}
              onLogout={handleLogout}
              onUserUpdate={handleUserUpdate}
            />
          )}
        </AnimatePresence>
      </div>

      <BottomNav tab={tab} setTab={setTab} />
    </>
  )
}

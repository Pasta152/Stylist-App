import { motion } from 'framer-motion'
import { RefreshCw, Sparkles } from 'lucide-react'
import WeatherCard from '../components/WeatherCard'
import OOTDCard, { OOTDSkeleton } from '../components/OOTDCard'
import { ClothIcon } from '../components/ui'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning'
  if (h < 17) return 'Good Afternoon'
  return 'Good Evening'
}

function dateString() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month:   'long',
    day:     'numeric',
  })
}

export default function HomeScreen({ weather, weatherLoading, ootd, ootdLoading, wardrobe, onRemix }) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '52px 20px 28px' }}
    >
      {/* Page header */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.13em', marginBottom: 4 }}>
          {dateString()}
        </p>
        <h1 className="font-display" style={{ fontSize: 38, fontWeight: 300, lineHeight: 1.1, color: 'var(--txt)' }}>
          {greeting()} ✨
        </h1>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 5 }}>Your AI stylist is ready</p>
      </div>

      {/* Weather */}
      <WeatherCard weather={weather} loading={weatherLoading} />

      {/* OOTD section */}
      <div style={{ marginTop: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={16} color="var(--gold)" fill="var(--gold)" />
            <h2 className="font-display" style={{ fontSize: 24, fontWeight: 500, color: 'var(--txt)' }}>
              Today's Look
            </h2>
          </div>
          <button
            onClick={onRemix}
            disabled={ootdLoading}
            style={{
              display:      'flex',
              alignItems:   'center',
              gap:          6,
              background:   'var(--gold2)',
              border:       '1px solid var(--gold3)',
              borderRadius: 20,
              padding:      '6px 14px',
              cursor:       ootdLoading ? 'default' : 'pointer',
              opacity:      ootdLoading ? 0.6 : 1,
            }}
          >
            <RefreshCw size={12} color="var(--gold)" />
            <span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 500 }}>Remix</span>
          </button>
        </div>

        {wardrobe.length === 0 ? (
          <EmptyWardrobe />
        ) : ootdLoading || !ootd ? (
          <OOTDSkeleton />
        ) : (
          <OOTDCard ootd={ootd} wardrobe={wardrobe} />
        )}
      </div>
    </motion.div>
  )
}

function EmptyWardrobe() {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: 36, textAlign: 'center' }}
    >
      <ClothIcon color="var(--muted)" size={36} />
      <p className="font-display" style={{ fontSize: 22, fontWeight: 500, marginTop: 12, marginBottom: 4 }}>
        Your wardrobe is empty
      </p>
      <p style={{ fontSize: 13, color: 'var(--muted)' }}>
        Add clothes in the Wardrobe tab to get your daily look
      </p>
    </motion.div>
  )
}

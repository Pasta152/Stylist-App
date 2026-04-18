import { motion } from 'framer-motion'

export default function WeatherCard({ weather, loading }) {
  if (loading) {
    return (
      <div
        className="card skeleton"
        style={{ height: 90 }}
      />
    )
  }

  if (!weather) return null

  const warm  = weather.temp > 22
  const cold  = weather.temp < 12
  const badge = warm
    ? { bg: 'rgba(200,169,107,.12)', c: 'var(--gold)', t: 'Warm Day'    }
    : cold
    ? { bg: 'rgba(110,154,201,.12)', c: 'var(--blue)', t: 'Cold Day'    }
    : { bg: 'rgba(90,184,138,.12)',  c: 'var(--green)', t: 'Perfect Day' }

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{ padding: '18px 20px', borderColor: 'rgba(200,169,107,.1)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left: emoji + temp */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 44, lineHeight: 1 }}>{weather.condition.em}</span>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <span
                className="font-display"
                style={{ fontSize: 44, fontWeight: 300, lineHeight: 1 }}
              >
                {weather.temp}
              </span>
              <span style={{ fontSize: 18, color: 'var(--muted)', fontWeight: 300 }}>°C</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>
              📍 {weather.city} · {weather.condition.label}
            </p>
          </div>
        </div>

        {/* Right: badge + wind */}
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              background:   badge.bg,
              color:        badge.c,
              fontSize:     11,
              fontWeight:   700,
              padding:      '5px 12px',
              borderRadius: 20,
              marginBottom: 6,
            }}
          >
            {badge.t}
          </div>
          <p style={{ fontSize: 11, color: 'var(--muted)' }}>💨 {weather.wind} km/h</p>
        </div>
      </div>
    </motion.div>
  )
}

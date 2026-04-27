import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

function HeartIcon({ filled }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? 'var(--red)' : 'none'}
      stroke={filled ? 'var(--red)' : 'var(--muted)'}
      strokeWidth="1.8"
      style={filled ? { animation: 'heartPop 0.3s ease' } : {}}
    >
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  )
}

export default function InspoCard({ post, liked, onLike, index = 0 }) {
  const [count, setCount] = useState(post.likes)
  const [imgErr, setImgErr] = useState(false)

  function handleLike() {
    onLike()
    setCount((n) => (liked ? n - 1 : n + 1))
  }

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      style={{ overflow: 'hidden' }}
    >
      {/* Image */}
      {!imgErr && (
        <div style={{ position: 'relative' }}>
          <img
            src={post.img}
            alt={post.desc}
            className="inspo-img"
            loading="lazy"
            onError={() => setImgErr(true)}
          />
          {/* Weather badge */}
          <div
            style={{
              position:       'absolute',
              top:            12,
              left:           12,
              background:     'rgba(9,9,12,.72)',
              backdropFilter: 'blur(8px)',
              borderRadius:   20,
              padding:        '5px 12px',
              display:        'flex',
              alignItems:     'center',
              gap:            4,
            }}
          >
            <MapPin size={10} color="var(--gold)" />
            <span style={{ fontSize: 11, color: 'var(--txt)' }}>{post.loc}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', marginBottom: 2 }}>
              @{post.user}
            </p>
            <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>{post.desc}</p>
            <p style={{ fontSize: 11, color: 'var(--gold)' }}>{post.items}</p>
          </div>

          {/* Like button */}
          <button
            onClick={handleLike}
            style={{
              background:   liked ? 'rgba(217,92,92,.1)' : 'var(--s2)',
              border:       liked ? '1px solid rgba(217,92,92,.28)' : '1px solid var(--b2)',
              borderRadius: 12,
              padding:      '8px 12px',
              cursor:       'pointer',
              display:      'flex',
              flexDirection: 'column',
              alignItems:   'center',
              gap:          2,
              flexShrink:   0,
              transition:   'all 0.2s',
            }}
          >
            <HeartIcon filled={liked} />
            <span style={{ fontSize: 11, fontWeight: 600, color: liked ? 'var(--red)' : 'var(--muted)' }}>
              {count}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

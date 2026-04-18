import { motion } from 'framer-motion'
import { CAT_COLOR } from '../lib/constants'
import { ClothIcon } from './ui'
import AffiliateCard from './AffiliateCard'

function OutfitChip({ name, wardrobe }) {
  const item     = wardrobe.find(
    (w) =>
      w.name.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(w.name.toLowerCase())
  )
  const category = item?.category ?? 'Item'
  const cc       = CAT_COLOR[category] ?? 'var(--gold)'

  return (
    <div
      style={{
        flexShrink: 0,
        display:    'flex',
        alignItems: 'center',
        gap:        8,
        padding:    '8px 12px',
        borderRadius: 12,
        background: 'var(--s2)',
        border:     `1px solid ${cc}20`,
      }}
    >
      {item?.dataUrl ? (
        <img
          src={item.dataUrl}
          alt={name}
          style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover' }}
        />
      ) : (
        <div
          style={{
            width:          32,
            height:         32,
            borderRadius:   8,
            background:     `${cc}18`,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
          }}
        >
          <ClothIcon color={cc} size={16} />
        </div>
      )}
      <div>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--txt)' }}>{name}</p>
        <p style={{ fontSize: 10, color: 'var(--muted)' }}>{category}</p>
      </div>
    </div>
  )
}

export function OOTDSkeleton() {
  return (
    <div className="card" style={{ padding: 20 }}>
      {[['70%', 16], ['90%', 8], ['60%', 20]].map(([w, mb], i) => (
        <div key={i} className="skeleton" style={{ height: 14, width: w, marginBottom: mb }} />
      ))}
      <div style={{ display: 'flex', gap: 8 }}>
        {[1, 2, 3].map((k) => (
          <div key={k} className="skeleton" style={{ height: 52, flex: 1, borderRadius: 12 }} />
        ))}
      </div>
    </div>
  )
}

export default function OOTDCard({ ootd, wardrobe }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="card" style={{ padding: 20, marginBottom: 12, borderColor: 'rgba(200,169,107,.08)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span className="tag">{ootd.vibe}</span>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>✦ AI Styled</span>
        </div>

        {/* Description */}
        <p style={{ fontSize: 14, color: 'var(--txt)', lineHeight: 1.65, marginBottom: 16 }}>
          {ootd.description}
        </p>

        {/* Outfit chips */}
        <div
          className="hide-scroll"
          style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}
        >
          {ootd.outfit.map((name, i) => (
            <OutfitChip key={i} name={name} wardrobe={wardrobe} />
          ))}
        </div>

        {/* Style tip */}
        <div className="tip-box" style={{ marginTop: 14 }}>
          <p style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 700, marginBottom: 3 }}>
            💡 STYLE TIP
          </p>
          <p style={{ fontSize: 12, color: 'var(--txt)', opacity: 0.82 }}>{ootd.tip}</p>
        </div>
      </div>

      {/* Affiliate section */}
      {ootd.affiliate && <AffiliateCard item={ootd.affiliate} />}
    </motion.div>
  )
}

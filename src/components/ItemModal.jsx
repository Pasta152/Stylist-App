import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { CAT_COLOR } from '../lib/constants'
import { ClothIcon } from './ui'

export default function ItemModal({ item, onClose, onRemove }) {
  const cc = CAT_COLOR[item.category] ?? 'var(--gold)'

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position:   'fixed',
          inset:      0,
          background: 'rgba(0,0,0,.78)',
          zIndex:     100,
          display:    'flex',
          alignItems: 'flex-end',
        }}
      >
        {/* Sheet */}
        <motion.div
          key="sheet"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background:   'var(--s1)',
            borderRadius: '24px 24px 0 0',
            padding:      24,
            width:        '100%',
            maxWidth:     430,
            margin:       '0 auto',
          }}
        >
          {/* Drag handle */}
          <div style={{ width: 36, height: 4, background: 'var(--b2)', borderRadius: 2, margin: '0 auto 20px' }} />

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
            <div>
              <span className="tag" style={{ marginBottom: 8 }}>{item.category}</span>
              <h3
                className="font-display"
                style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.1, marginTop: 4 }}
              >
                {item.name}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>{item.color}</p>
            </div>
            <button
              onClick={onClose}
              style={{
                background:     'var(--s2)',
                border:         'none',
                borderRadius:   20,
                width:          34,
                height:         34,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                cursor:         'pointer',
              }}
            >
              <X size={16} color="var(--muted)" />
            </button>
          </div>

          {/* Image or placeholder */}
          {item.dataUrl ? (
            <div style={{ borderRadius: 14, overflow: 'hidden', marginBottom: 16, aspectRatio: '4/3' }}>
              <img
                src={item.dataUrl}
                alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div
              style={{
                borderRadius:   14,
                background:     'var(--s2)',
                height:         120,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                marginBottom:   16,
                border:         `1px solid ${cc}20`,
              }}
            >
              <ClothIcon color={cc} size={40} />
            </div>
          )}

          {/* Tags */}
          {item.tags?.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
              {item.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          )}

          <button className="btn-danger" onClick={() => onRemove(item.id)}>
            Remove from Wardrobe
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

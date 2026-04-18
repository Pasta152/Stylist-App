import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload } from 'lucide-react'
import { CAT_COLOR } from '../lib/constants'
import { tagImage } from '../lib/ai'
import { Spinner, ClothIcon } from '../components/ui'
import ItemModal from '../components/ItemModal'

/* ── Category filter bar ──────────────────────────────────── */
function FilterBar({ categories, active, setActive }) {
  return (
    <div
      className="hide-scroll"
      style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 16 }}
    >
      {categories.map((cat) => (
        <button
          key={cat}
          className={`chip${active === cat ? ' active' : ''}`}
          onClick={() => setActive(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

/* ── Single wardrobe item tile ────────────────────────────── */
function ItemTile({ item, index, onClick }) {
  const cc = CAT_COLOR[item.category] ?? 'var(--muted)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        borderRadius: 14,
        overflow:     'hidden',
        cursor:       'pointer',
        background:   'var(--s1)',
        border:       '1px solid var(--b1)',
      }}
    >
      {/* Image / placeholder */}
      <div
        style={{
          aspectRatio:    '1',
          background:     'var(--s2)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          overflow:       'hidden',
        }}
      >
        {item.dataUrl ? (
          <img
            src={item.dataUrl}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <ClothIcon color={cc} size={26} />
            <p style={{ fontSize: 9, color: 'var(--muted)', textAlign: 'center', padding: '0 4px' }}>
              {item.color}
            </p>
          </div>
        )}
      </div>

      {/* Label */}
      <div style={{ padding: '8px 10px' }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt)', lineHeight: 1.3, marginBottom: 1 }}>
          {item.name}
        </p>
        <p style={{ fontSize: 10, color: 'var(--muted)' }}>{item.category}</p>
      </div>
    </motion.div>
  )
}

/* ── Upload zone ──────────────────────────────────────────── */
function UploadZone({ uploading, onClick }) {
  return (
    <div className="upload-zone" onClick={onClick} style={{ marginBottom: 20 }}>
      {uploading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Spinner />
          <p style={{ fontSize: 13, color: 'var(--gold)' }}>AI is tagging your item…</p>
          <p style={{ fontSize: 11, color: 'var(--muted)' }}>Identifying category, color & style</p>
        </div>
      ) : (
        <>
          <Upload size={24} color="var(--muted)" style={{ margin: '0 auto 8px', display: 'block' }} />
          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--txt)', marginBottom: 2 }}>
            Upload a clothing photo
          </p>
          <p style={{ fontSize: 11, color: 'var(--muted)' }}>AI auto-tags category, color &amp; style</p>
        </>
      )}
    </div>
  )
}

/* ── Main WardrobeScreen ──────────────────────────────────── */
export default function WardrobeScreen({ wardrobe, setWardrobe, onNotify, onOotdReset }) {
  const [uploading, setUploading]   = useState(false)
  const [filter, setFilter]         = useState('All')
  const [selected, setSelected]     = useState(null)
  const fileRef                     = useRef(null)

  const categories = ['All', ...new Set(wardrobe.map((i) => i.category))]
  const shown      = filter === 'All' ? wardrobe : wardrobe.filter((i) => i.category === filter)

  /* ── Handle file upload + AI tagging ─── */
  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    onNotify('Analyzing your item…', 'info')

    try {
      const base64 = await new Promise((res, rej) => {
        const reader = new FileReader()
        reader.onload  = () => res(reader.result.split(',')[1])
        reader.onerror = rej
        reader.readAsDataURL(file)
      })

      const dataUrl = `data:${file.type};base64,${base64}`
      const parsed  = await tagImage(base64, file.type)
      const newItem = { id: Date.now().toString(), ...parsed, dataUrl }

      setWardrobe((prev) => [newItem, ...prev])
      onOotdReset()
      onNotify(`"${parsed.name}" added to wardrobe!`, 'success')
    } catch (err) {
      console.error(err)
      onNotify('Could not analyze item. Please try again.', 'error')
    }

    setUploading(false)
    e.target.value = ''
  }

  function removeItem(id) {
    setWardrobe((prev) => prev.filter((i) => i.id !== id))
    setSelected(null)
    onNotify('Item removed from wardrobe', 'info')
  }

  return (
    <motion.div
      key="wardrobe"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '52px 20px 28px' }}
    >
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.13em', marginBottom: 4 }}>
          Your Closet
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 className="font-display" style={{ fontSize: 38, fontWeight: 300, color: 'var(--txt)' }}>
            Wardrobe
          </h1>
          <button
            className="btn-gold"
            onClick={() => !uploading && fileRef.current?.click()}
            disabled={uploading}
            style={{
              width:          44,
              height:         44,
              borderRadius:   14,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              flexShrink:     0,
              opacity:        uploading ? 0.7 : 1,
            }}
          >
            {uploading ? (
              <Spinner size={18} color="#09090C" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#09090C" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5"  y1="12" x2="19" y2="12" />
              </svg>
            )}
          </button>
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
          {wardrobe.length} item{wardrobe.length !== 1 ? 's' : ''} · AI-tagged
        </p>
      </div>

      {/* Hidden file input */}
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />

      {/* Upload zone */}
      <UploadZone uploading={uploading} onClick={() => !uploading && fileRef.current?.click()} />

      {/* Category filters */}
      <FilterBar categories={categories} active={filter} setActive={setFilter} />

      {/* Grid */}
      {shown.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p style={{ color: 'var(--muted)', fontSize: 13 }}>No items in this category</p>
        </div>
      ) : (
        <div className="wardrobe-grid">
          {shown.map((item, i) => (
            <ItemTile key={item.id} item={item} index={i} onClick={() => setSelected(item)} />
          ))}
        </div>
      )}

      {/* Item detail modal */}
      <AnimatePresence>
        {selected && (
          <ItemModal item={selected} onClose={() => setSelected(null)} onRemove={removeItem} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

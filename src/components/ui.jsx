import { useEffect, useState } from 'react'

/* ── Spinner ──────────────────────────────────────────────── */
export function Spinner({ size = 20, color = 'var(--gold)' }) {
  return (
    <svg
      className="spin"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
    >
      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".25" />
      <path d="M21 12a9 9 0 00-9-9" />
    </svg>
  )
}

/* ── Toast notification ───────────────────────────────────── */
export function Toast({ msg, type = 'info' }) {
  const bg =
    type === 'success' ? 'var(--green)' :
    type === 'error'   ? 'var(--red)'   : 'var(--s2)'
  const clr = type === 'info' ? 'var(--txt)' : '#fff'

  return (
    <div
      style={{
        position:    'fixed',
        top:         20,
        left:        '50%',
        transform:   'translateX(-50%)',
        background:  bg,
        color:       clr,
        padding:     '10px 20px',
        borderRadius: 12,
        fontSize:    13,
        fontWeight:  500,
        zIndex:      300,
        whiteSpace:  'nowrap',
        animation:   'fadeUp 0.3s ease',
        boxShadow:   '0 8px 32px rgba(0,0,0,0.4)',
        border:      type === 'info' ? '1px solid var(--b2)' : 'none',
      }}
    >
      {msg}
    </div>
  )
}

/* ── Clothing icon (SVG) ──────────────────────────────────── */
export function ClothIcon({ color = 'var(--muted)', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}

/* ── Chevron right ────────────────────────────────────────── */
export function ChevronRight({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

/* ── useToast hook ────────────────────────────────────────── */
export function useToast() {
  const [toast, setToast] = useState(null)

  function notify(msg, type = 'info', duration = 2800) {
    setToast({ msg, type })
    setTimeout(() => setToast(null), duration)
  }

  return { toast, notify }
}

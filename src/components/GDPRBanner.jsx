/**
 * src/components/GDPRBanner.jsx
 *
 * GDPR cookie consent banner — legally required in the EU.
 * Shows once, user accepts → stored in localStorage forever.
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GDPRBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('stylist_gdpr_consent')
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('stylist_gdpr_consent', 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('stylist_gdpr_consent', 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position:     'fixed',
            bottom:       90,
            left:         12,
            right:        12,
            zIndex:       1000,
            background:   'var(--s1)',
            border:       '1px solid var(--b1)',
            borderRadius: 18,
            padding:      '16px 18px',
            boxShadow:    '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', marginBottom: 4 }}>
            🍪 We use cookies
          </p>
          <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14 }}>
            We use cookies to remember your wardrobe and daily usage. We also show affiliate product
            links — if you buy through them, we earn a small commission at no extra cost to you.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={accept}
              style={{
                flex:         1,
                background:   'var(--gold)',
                color:        '#09090C',
                border:       'none',
                borderRadius: 10,
                padding:      '9px 0',
                fontWeight:   700,
                fontSize:     13,
                cursor:       'pointer',
              }}
            >
              Accept
            </button>
            <button
              onClick={decline}
              style={{
                flex:         1,
                background:   'transparent',
                color:        'var(--muted)',
                border:       '1px solid var(--b1)',
                borderRadius: 10,
                padding:      '9px 0',
                fontSize:     13,
                cursor:       'pointer',
              }}
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

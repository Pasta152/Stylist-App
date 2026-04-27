/**
 * src/components/UpgradePrompt.jsx
 *
 * Shown when a free user hits their daily AI usage limit.
 * This is your freemium upsell — directs users to upgrade or come back tomorrow.
 */
import { motion } from 'framer-motion'
import { Sparkles, Clock } from 'lucide-react'

export default function UpgradePrompt({ type = 'ootd' }) {
  const isOotd = type === 'ootd'

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
      style={{ padding: 28, textAlign: 'center' }}
    >
      <div
        style={{
          width:          52,
          height:         52,
          borderRadius:   '50%',
          background:     'var(--gold2)',
          border:         '1px solid var(--gold3)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          margin:         '0 auto 16px',
        }}
      >
        <Sparkles size={22} color="var(--gold)" />
      </div>

      <h3
        className="font-display"
        style={{ fontSize: 22, fontWeight: 500, color: 'var(--txt)', marginBottom: 8 }}
      >
        {isOotd ? "You've used today's free looks" : "Daily upload limit reached"}
      </h3>

      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 20 }}>
        {isOotd
          ? 'Free users get 3 AI outfit generations per day. Come back tomorrow — or upgrade for unlimited looks.'
          : 'Free users can upload 5 items per day. Come back tomorrow — or upgrade for unlimited uploads.'}
      </p>

      {/* Come back tomorrow note */}
      <div
        style={{
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'center',
          gap:          6,
          background:   'var(--s2)',
          borderRadius: 10,
          padding:      '10px 14px',
          marginBottom: 16,
        }}
      >
        <Clock size={13} color="var(--muted)" />
        <p style={{ fontSize: 12, color: 'var(--muted)' }}>
          Resets at midnight — or upgrade to unlock unlimited
        </p>
      </div>

      {/* Upgrade CTA — link to your future payment page */}
      <a
        href="mailto:hello@stylist-ai.app?subject=I want to upgrade to Pro"
        style={{
          display:      'block',
          background:   'var(--gold)',
          color:        '#09090C',
          borderRadius: 12,
          padding:      '12px 0',
          fontWeight:   700,
          fontSize:     14,
          textDecoration: 'none',
          cursor:       'pointer',
        }}
      >
        ✨ Upgrade to Pro — Unlimited
      </a>

      <p style={{ fontSize: 10, color: 'var(--muted2)', marginTop: 10 }}>
        Pro is coming soon · Join the waitlist above
      </p>
    </motion.div>
  )
}

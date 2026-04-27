import { motion } from 'framer-motion'
import { ChevronRight } from './ui'
import { ShoppingBag } from 'lucide-react'

export default function AffiliateCard({ item }) {
  // item.url is now a real affiliate link from constants.js
  const url = item.url || '#'

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.1em' }}>
          Complete the Look
        </p>
        {item.store && (
          <p style={{ fontSize: 9, color: 'var(--muted2)', textTransform: 'uppercase', letterSpacing: '.08em' }}>
            via {item.store}
          </p>
        )}
      </div>

      <motion.div
        className="card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}
      >
        {/* Icon */}
        <div style={{ width: 56, height: 56, borderRadius: 12, background: 'linear-gradient(135deg, var(--s2), var(--s3))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ShoppingBag size={24} color="var(--gold)" />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', marginBottom: 2 }}>{item.name}</p>
          <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.4, marginBottom: 6 }}>{item.reason}</p>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--gold)' }}>{item.price}</p>
        </div>

        {/* CTA */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold"
          style={{ padding: '9px 14px', borderRadius: 10, textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4 }}
        >
          Shop <ChevronRight size={12} />
        </a>
      </motion.div>

      {/* Disclosure — legally required for affiliate links */}
      <p style={{ fontSize: 9, color: 'var(--muted2)', textAlign: 'center', marginTop: 6 }}>
        Affiliate link — we may earn a commission if you purchase
      </p>
    </div>
  )
}

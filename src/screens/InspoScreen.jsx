import { motion } from 'framer-motion'
import { INSPO_POSTS } from '../lib/constants'
import InspoCard from '../components/InspoCard'

export default function InspoScreen({ liked, toggleLike }) {
  return (
    <motion.div
      key="inspo"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '52px 20px 28px' }}
    >
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.13em', marginBottom: 4 }}>
          Community
        </p>
        <h1 className="font-display" style={{ fontSize: 38, fontWeight: 300, color: 'var(--txt)' }}>
          Inspo Feed
        </h1>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Real outfits, real weather</p>
      </div>

      {/* Posts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {INSPO_POSTS.map((post, i) => (
          <InspoCard
            key={post.id}
            post={post}
            index={i}
            liked={liked.has(post.id)}
            onLike={() => toggleLike(post.id)}
          />
        ))}
      </div>

      {/* End-of-feed nudge */}
      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted2)', marginTop: 32 }}>
        ✦ &nbsp; More outfits coming soon
      </p>
    </motion.div>
  )
}

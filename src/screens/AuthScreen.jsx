import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { login, register } from '../lib/auth'

const inputStyle = {
  width:        '100%',
  background:   'var(--s2)',
  border:       '1px solid var(--b2)',
  borderRadius: 12,
  color:        'var(--txt)',
  fontSize:     15,
  padding:      '13px 16px',
  outline:      'none',
  fontFamily:   'DM Sans, sans-serif',
  transition:   'border-color 0.2s',
}

function Input({ label, type = 'text', value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...inputStyle, borderColor: focused ? 'var(--gold)' : 'var(--b2)' }}
        autoComplete={type === 'password' ? 'current-password' : type === 'email' ? 'email' : 'name'}
      />
    </div>
  )
}

export default function AuthScreen({ onAuth }) {
  const [mode, setMode]       = useState('login')   // 'login' | 'register'
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email || !password) { setError('Συμπλήρωσε όλα τα πεδία'); return }
    if (mode === 'register' && !name.trim()) { setError('Συμπλήρωσε το όνομά σου'); return }
    if (password.length < 6) { setError('Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες'); return }

    setLoading(true)
    try {
      const user = mode === 'login'
        ? login(email, password)
        : register(name, email, password)
      onAuth(user)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  function switchMode() {
    setMode(m => m === 'login' ? 'register' : 'login')
    setError('')
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div style={{
      minHeight:      '100dvh',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        '24px 20px',
      background:     'var(--bg)',
    }}>
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: 40 }}
      >
        <div style={{
          width:        64,
          height:       64,
          borderRadius: 20,
          background:   'var(--gold2)',
          border:       '1px solid var(--gold3)',
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'center',
          margin:       '0 auto 16px',
        }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </div>
        <h1 className="font-display" style={{ fontSize: 32, fontWeight: 600, color: 'var(--gold)', margin: 0, letterSpacing: '-0.02em' }}>
          Stylist AI
        </h1>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>
          Ο προσωπικός σου AI stylist
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          width:        '100%',
          maxWidth:     390,
          background:   'var(--s1)',
          border:       '1px solid var(--b1)',
          borderRadius: 20,
          padding:      '28px 24px',
        }}
      >
        {/* Mode toggle */}
        <div style={{
          display:      'flex',
          background:   'var(--s2)',
          borderRadius: 12,
          padding:      4,
          marginBottom: 28,
        }}>
          {['login', 'register'].map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError('') }}
              style={{
                flex:         1,
                padding:      '9px 0',
                borderRadius: 9,
                border:       'none',
                background:   mode === m ? 'var(--b1)' : 'transparent',
                color:        mode === m ? 'var(--txt)' : 'var(--muted)',
                fontSize:     13,
                fontWeight:   600,
                cursor:       'pointer',
                fontFamily:   'DM Sans, sans-serif',
                transition:   'all 0.2s',
              }}
            >
              {m === 'login' ? 'Σύνδεση' : 'Εγγραφή'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <AnimatePresence>
            {mode === 'register' && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <Input label="Όνομα" value={name} onChange={setName} placeholder="π.χ. Μαρία" />
              </motion.div>
            )}
          </AnimatePresence>

          <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="email@example.com" />
          <Input label="Κωδικός" type="password" value={password} onChange={setPassword} placeholder="Τουλάχιστον 6 χαρακτήρες" />

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background:   'rgba(217,92,92,0.1)',
                border:       '1px solid rgba(217,92,92,0.25)',
                borderRadius: 10,
                padding:      '10px 14px',
                fontSize:     13,
                color:        'var(--red)',
              }}
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold"
            style={{ padding: '14px 0', fontSize: 15, marginTop: 4, opacity: loading ? 0.6 : 1 }}
          >
            {loading ? '...' : mode === 'login' ? 'Σύνδεση' : 'Δημιουργία λογαριασμού'}
          </button>
        </form>
      </motion.div>

      <p style={{ marginTop: 20, fontSize: 13, color: 'var(--muted)' }}>
        {mode === 'login' ? 'Δεν έχεις λογαριασμό;' : 'Έχεις ήδη λογαριασμό;'}{' '}
        <button
          onClick={switchMode}
          style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600 }}
        >
          {mode === 'login' ? 'Εγγραφή' : 'Σύνδεση'}
        </button>
      </p>
    </div>
  )
}

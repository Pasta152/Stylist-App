import { useState } from 'react'
import { motion } from 'framer-motion'
import { logout, updateProfile } from '../lib/auth'

function Avatar({ name, size = 72 }) {
  const initials = name.trim().split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div style={{
      width:          size,
      height:         size,
      borderRadius:   '50%',
      background:     'var(--gold2)',
      border:         '2px solid var(--gold3)',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      fontSize:       size * 0.36,
      fontWeight:     700,
      color:          'var(--gold)',
      fontFamily:     'DM Sans, sans-serif',
      flexShrink:     0,
    }}>
      {initials}
    </div>
  )
}

function StatBox({ label, value }) {
  return (
    <div style={{
      flex:           1,
      background:     'var(--s2)',
      border:         '1px solid var(--b1)',
      borderRadius:   14,
      padding:        '14px 10px',
      textAlign:      'center',
    }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--gold)' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3, fontWeight: 500 }}>{label}</div>
    </div>
  )
}

export default function ProfileScreen({ user, wardrobe, liked, onLogout, onUserUpdate }) {
  const [editing, setEditing]   = useState(false)
  const [newName, setNewName]   = useState(user.name)
  const [nameErr, setNameErr]   = useState('')

  const joinedDate = new Date(user.createdAt).toLocaleDateString('el-GR', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  function saveEdit() {
    if (!newName.trim()) { setNameErr('Το όνομα δεν μπορεί να είναι κενό'); return }
    try {
      const updated = updateProfile(user.id, { name: newName })
      onUserUpdate(updated)
      setEditing(false)
      setNameErr('')
    } catch (err) {
      setNameErr(err.message)
    }
  }

  function handleLogout() {
    logout()
    onLogout()
  }

  return (
    <motion.div
      key="profile"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      style={{ padding: '24px 16px 32px' }}
    >
      {/* Header */}
      <h2 className="font-display" style={{ fontSize: 26, fontWeight: 600, margin: '0 0 24px', color: 'var(--txt)' }}>
        Προφίλ
      </h2>

      {/* Profile card */}
      <div className="card" style={{ padding: '24px 20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <Avatar name={user.name} />
          <div style={{ flex: 1, minWidth: 0 }}>
            {editing ? (
              <div>
                <input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  autoFocus
                  style={{
                    width:        '100%',
                    background:   'var(--s2)',
                    border:       '1px solid var(--gold)',
                    borderRadius: 10,
                    color:        'var(--txt)',
                    fontSize:     16,
                    padding:      '8px 12px',
                    outline:      'none',
                    fontFamily:   'DM Sans, sans-serif',
                    fontWeight:   600,
                    marginBottom: 8,
                  }}
                />
                {nameErr && <div style={{ fontSize: 12, color: 'var(--red)', marginBottom: 6 }}>{nameErr}</div>}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={saveEdit}
                    className="btn-gold"
                    style={{ padding: '6px 16px', fontSize: 13 }}
                  >
                    Αποθήκευση
                  </button>
                  <button
                    onClick={() => { setEditing(false); setNewName(user.name); setNameErr('') }}
                    className="btn-ghost"
                    style={{ padding: '6px 14px', fontSize: 13 }}
                  >
                    Άκυρο
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--txt)' }}>{user.name}</span>
                  <button
                    onClick={() => setEditing(true)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--muted)', lineHeight: 1 }}
                    title="Επεξεργασία ονόματος"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>{user.email}</div>
                <div style={{ fontSize: 11, color: 'var(--muted2)', marginTop: 4 }}>Μέλος από {joinedDate}</div>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 10 }}>
          <StatBox label="Ρούχα" value={wardrobe.length} />
          <StatBox label="Αγαπημένα" value={liked.size} />
        </div>
      </div>

      {/* Logout */}
      <button className="btn-danger" onClick={handleLogout}>
        Αποσύνδεση
      </button>
    </motion.div>
  )
}

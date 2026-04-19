/* ── Bottom Navigation ───────────────────────────────────── */

function HomeIcon()     { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 12L12 3l9 9"/><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/></svg> }
function WardrobeIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> }
function InspoIcon()    { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg> }
function ProfileIcon()  { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> }

const TABS = [
  { id: 'home',     label: 'Today',    Icon: HomeIcon },
  { id: 'wardrobe', label: 'Wardrobe', Icon: WardrobeIcon },
  { id: 'inspo',    label: 'Inspo',    Icon: InspoIcon },
  { id: 'profile',  label: 'Προφίλ',  Icon: ProfileIcon },
]

export default function BottomNav({ tab, setTab }) {
  return (
    <nav className="bottom-nav">
      {TABS.map(({ id, label, Icon }) => {
        const active = tab === id
        return (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              background:    'none',
              border:        'none',
              display:       'flex',
              flexDirection: 'column',
              alignItems:    'center',
              gap:           3,
              padding:       '4px 16px',
              cursor:        'pointer',
              color:         active ? 'var(--gold)' : 'var(--muted)',
              transition:    'color 0.2s',
              position:      'relative',
            }}
          >
            <Icon />
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              {label}
            </span>
            {active && (
              <span style={{
                position:     'absolute',
                bottom:       6,
                width:        4,
                height:       4,
                borderRadius: '50%',
                background:   'var(--gold)',
              }} />
            )}
          </button>
        )
      })}
    </nav>
  )
}

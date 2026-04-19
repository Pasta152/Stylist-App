const USERS_KEY   = 'stylist_users'
const SESSION_KEY = 'stylist_session'

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || [] }
  catch { return [] }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getCurrentUser() {
  const id = localStorage.getItem(SESSION_KEY)
  if (!id) return null
  return getUsers().find(u => u.id === id) || null
}

export function register(name, email, password) {
  const users = getUsers()
  if (users.find(u => u.email === email.trim().toLowerCase())) {
    throw new Error('Το email χρησιμοποιείται ήδη')
  }
  const user = {
    id:        crypto.randomUUID(),
    name:      name.trim(),
    email:     email.trim().toLowerCase(),
    password:  btoa(unescape(encodeURIComponent(password))),
    createdAt: new Date().toISOString(),
  }
  saveUsers([...users, user])
  localStorage.setItem(SESSION_KEY, user.id)
  return user
}

export function login(email, password) {
  const users = getUsers()
  const user  = users.find(u => u.email === email.trim().toLowerCase())
  if (!user) throw new Error('Δεν βρέθηκε λογαριασμός με αυτό το email')
  if (user.password !== btoa(unescape(encodeURIComponent(password)))) {
    throw new Error('Λανθασμένος κωδικός πρόσβασης')
  }
  localStorage.setItem(SESSION_KEY, user.id)
  return user
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

export function updateProfile(id, { name }) {
  const users = getUsers()
  const idx   = users.findIndex(u => u.id === id)
  if (idx === -1) throw new Error('User not found')
  users[idx] = { ...users[idx], name: name.trim() }
  saveUsers(users)
  return users[idx]
}

export function getUserWardrobe(userId) {
  try { return JSON.parse(localStorage.getItem(`stylist_wardrobe_${userId}`)) }
  catch { return null }
}

export function saveUserWardrobe(userId, wardrobe) {
  localStorage.setItem(`stylist_wardrobe_${userId}`, JSON.stringify(wardrobe))
}

export function getUserLiked(userId) {
  try {
    const arr = JSON.parse(localStorage.getItem(`stylist_liked_${userId}`)) || []
    return new Set(arr)
  } catch { return new Set() }
}

export function saveUserLiked(userId, liked) {
  localStorage.setItem(`stylist_liked_${userId}`, JSON.stringify([...liked]))
}

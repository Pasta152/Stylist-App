/**
 * src/lib/usageLimit.js
 *
 * Tracks daily free AI usage in localStorage.
 * Free users get 3 OOTD generations + 5 wardrobe uploads per day.
 * When the limit is hit, we show an upsell prompt.
 */

const FREE_OOTD_LIMIT    = 3
const FREE_UPLOAD_LIMIT  = 5

function getTodayKey() {
  return new Date().toISOString().slice(0, 10) // "2026-04-27"
}

function getUsage() {
  try {
    const raw = localStorage.getItem('stylist_usage')
    const parsed = raw ? JSON.parse(raw) : {}
    const today = getTodayKey()
    // Reset if it's a new day
    if (parsed.date !== today) return { date: today, ootd: 0, uploads: 0 }
    return parsed
  } catch {
    return { date: getTodayKey(), ootd: 0, uploads: 0 }
  }
}

function saveUsage(usage) {
  try {
    localStorage.setItem('stylist_usage', JSON.stringify(usage))
  } catch {}
}

export function canGenerateOOTD() {
  return getUsage().ootd < FREE_OOTD_LIMIT
}

export function canUploadItem() {
  return getUsage().uploads < FREE_UPLOAD_LIMIT
}

export function recordOOTD() {
  const usage = getUsage()
  usage.ootd += 1
  saveUsage(usage)
}

export function recordUpload() {
  const usage = getUsage()
  usage.uploads += 1
  saveUsage(usage)
}

export function getUsageInfo() {
  const usage = getUsage()
  return {
    ootdUsed:      usage.ootd,
    ootdLimit:     FREE_OOTD_LIMIT,
    ootdRemaining: Math.max(0, FREE_OOTD_LIMIT - usage.ootd),
    uploadUsed:    usage.uploads,
    uploadLimit:   FREE_UPLOAD_LIMIT,
    uploadRemaining: Math.max(0, FREE_UPLOAD_LIMIT - usage.uploads),
  }
}

/**
 * api/chat.js — Secure AI proxy (Vercel Serverless Function)
 *
 * This runs on Vercel's servers, NOT in the user's browser.
 * Your OPENAI_API_KEY is never exposed to the public.
 *
 * Also enforces a daily rate limit per IP address so you
 * don't get surprise API bills.
 */

// Simple in-memory rate limiter (resets on each cold start, ~good enough for launch)
const rateLimitMap = new Map()

const FREE_LIMIT_PER_DAY = 10 // max AI calls per IP per day

function getRateLimitKey(ip) {
  const today = new Date().toISOString().slice(0, 10) // "2026-04-27"
  return `${ip}:${today}`
}

function isRateLimited(ip) {
  const key = getRateLimitKey(ip)
  const count = rateLimitMap.get(key) || 0
  if (count >= FREE_LIMIT_PER_DAY) return true
  rateLimitMap.set(key, count + 1)
  return false
}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // CORS headers — allow your frontend domain
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  // Rate limiting by IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Daily limit reached. Please try again tomorrow.' })
  }

  // Check API key is configured
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'AI service not configured. Contact support.' })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('OpenAI error:', data)
      return res.status(response.status).json({ error: 'AI service error. Please try again.' })
    }

    return res.status(200).json(data)
  } catch (err) {
    console.error('Proxy error:', err)
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}

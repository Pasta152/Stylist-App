/**
 * src/lib/ai.js — AI calls via secure backend proxy
 * API key lives on the server, never in the browser.
 */

const MODEL = 'gpt-4o'
const API_URL = '/api/chat'

async function callAI(messages) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, max_tokens: 1024, messages }),
  })
  if (res.status === 429) throw new Error('RATE_LIMIT')
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `AI error ${res.status}`)
  }
  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? ''
}

function parseJSON(raw) {
  return JSON.parse(raw.replace(/```json|```/g, '').trim())
}

export async function tagImage(base64, mimeType) {
  const text = await callAI([{
    role: 'user',
    content: [
      { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64}` } },
      { type: 'text', text: 'Analyze this clothing item. Reply ONLY with valid JSON, no markdown:\n{"name":"<n>","category":"<Top|Bottom|Shoes|Outerwear|Accessory|Dress>","color":"<color>","tags":["<tag1>","<tag2>"]}' }
    ]
  }])
  return parseJSON(text)
}

export async function generateOOTD(wardrobe, weather) {
  const list = wardrobe.map(i => `- ${i.name} (${i.category}, ${i.color})`).join('\n')
  const text = await callAI([
    { role: 'system', content: 'You are a personal stylist. Reply with valid JSON only, no markdown.' },
    { role: 'user', content: `Create an outfit.\nWEATHER: ${weather.temp}°C, ${weather.condition.label}, ${weather.city}\nWARDROBE:\n${list}\n\nReply ONLY with JSON:\n{"outfit":["<name1>","<name2>","<name3>"],"description":"<1-2 sentences>","vibe":"<one word>","tip":"<one tip>","missingCategory":"<category or null>"}` }
  ])
  return parseJSON(text)
}

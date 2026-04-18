const MODEL = 'gpt-4o'
const API_URL = 'https://api.openai.com/v1/chat/completions'

async function callOpenAI(messages) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ model: MODEL, max_tokens: 1024, messages }),
  })
  if (!res.ok) throw new Error(`OpenAI error ${res.status}: ${await res.text()}`)
  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? ''
}

function parseJSON(raw) {
  return JSON.parse(raw.replace(/```json|```/g, '').trim())
}

export async function tagImage(base64, mimeType) {
  const text = await callOpenAI([{
    role: 'user',
    content: [
      { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64}` } },
      { type: 'text', text: `Analyze this clothing item. Reply ONLY with valid JSON, no markdown:\n{"name":"<name>","category":"<Top|Bottom|Shoes|Outerwear|Accessory|Dress>","color":"<color>","tags":["<tag1>","<tag2>"]}` }
    ]
  }])
  return parseJSON(text)
}

export async function generateOOTD(wardrobe, weather) {
  const list = wardrobe.map(i => `- ${i.name} (${i.category}, ${i.color})`).join('\n')
  const text = await callOpenAI([
    { role: 'system', content: 'You are a personal stylist. Reply with valid JSON only, no markdown.' },
    { role: 'user', content: `Create an outfit.\nWEATHER: ${weather.temp}°C, ${weather.condition.label}, ${weather.city}\nWARDROBE:\n${list}\n\nReply ONLY with JSON:\n{"outfit":["<name1>","<name2>","<name3>"],"description":"<1-2 sentences>","vibe":"<one word>","tip":"<one tip>","missingCategory":"<category or null>"}` }
  ])
  return parseJSON(text)
}
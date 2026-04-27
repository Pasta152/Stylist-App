// ── Category accent colors ───────────────────────────────────
export const CAT_COLOR = {
  Top:       '#C8A96B',
  Bottom:    '#6E9AC9',
  Shoes:     '#5AB88A',
  Outerwear: '#C96EA0',
  Accessory: '#9E6EC9',
  Dress:     '#C96E6E',
}

// ── Default wardrobe (shown before user uploads anything) ───
export const SAMPLE_WARDROBE = [
  { id: 's1', name: 'White T-Shirt',  category: 'Top',       color: 'White',     dataUrl: null, tags: ['casual', 'basic'] },
  { id: 's2', name: 'Dark Jeans',     category: 'Bottom',    color: 'Dark Blue', dataUrl: null, tags: ['casual', 'versatile'] },
  { id: 's3', name: 'White Sneakers', category: 'Shoes',     color: 'White',     dataUrl: null, tags: ['casual', 'clean'] },
  { id: 's4', name: 'Trench Coat',    category: 'Outerwear', color: 'Beige',     dataUrl: null, tags: ['classic', 'chic'] },
  { id: 's5', name: 'Black Blazer',   category: 'Outerwear', color: 'Black',     dataUrl: null, tags: ['formal', 'sharp'] },
  { id: 's6', name: 'Silk Blouse',    category: 'Top',       color: 'Cream',     dataUrl: null, tags: ['elegant', 'feminine'] },
]

// ── Community inspo posts ────────────────────────────────────
export const INSPO_POSTS = [
  {
    id: 'p1', user: 'sofia_m',
    desc: 'Summer market vibes 🍋',
    items: 'Linen Set · Espadrilles',
    loc: '28°C · Athens',
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=400&fit=crop&crop=top',
    likes: 342,
  },
  {
    id: 'p2', user: 'nikos_style',
    desc: 'Business casual done right',
    items: 'Navy Blazer · Chinos',
    loc: '18°C · Athens',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop&crop=top',
    likes: 218,
  },
  {
    id: 'p3', user: 'elena_v',
    desc: 'Evening at the Acropolis ✨',
    items: 'Midi Dress · Mules',
    loc: '24°C · Athens',
    img: 'https://images.unsplash.com/photo-1529635696745-12e9f5e0f5e7?w=500&h=400&fit=crop&crop=top',
    likes: 567,
  },
  {
    id: 'p4', user: 'paris_chic',
    desc: 'Rainy day editorial 🌧',
    items: 'Trench Coat · Chelsea Boots',
    loc: '15°C · Athens',
    img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=400&fit=crop&crop=top',
    likes: 189,
  },
]

// ── Affiliate items ──────────────────────────────────────────
//
// HOW TO EARN MONEY FROM THESE:
//
// 1. AMAZON ASSOCIATES (easiest to start, worldwide):
//    → Sign up at: https://affiliate-program.amazon.com
//    → Replace "YOUR-TAG-20" below with your real tracking tag
//    → You earn 3-10% on every purchase
//
// 2. ZALANDO PARTNER (great for EU/Europe):
//    → Sign up at: https://www.zalando.com/partner-program/
//    → Replace the Zalando URLs with your affiliate links
//
// 3. ASOS AFFILIATE (worldwide fashion):
//    → Sign up at: https://www.asos.com/affiliate-programme/
//
// Once you have your affiliate tag, just replace "YOUR-TAG-20" everywhere below.
// ─────────────────────────────────────────────────────────────

const AMAZON_TAG = 'YOUR-TAG-20' // ← REPLACE THIS with your Amazon Associates tag

function amazonLink(searchTerm) {
  const encoded = encodeURIComponent(searchTerm)
  return `https://www.amazon.com/s?k=${encoded}&tag=${AMAZON_TAG}`
}

// Zalando links (EU-focused, great commission rates)
// Replace these with your Zalando affiliate links after signing up
function zalandoLink(searchTerm) {
  const encoded = encodeURIComponent(searchTerm)
  return `https://www.zalando.com/catalog/?q=${encoded}`
}

export const AFFILIATES = {
  rain: {
    name: 'Transparent Rain Mac',
    reason: "Essential for today's rain — stay chic, stay dry",
    price: '€49.99',
    url: zalandoLink('transparent minimal rain mac'),
    store: 'Zalando',
  },
  snow: {
    name: 'Shearling Chelsea Boots',
    reason: 'Stay warm and effortlessly stylish in the cold',
    price: '€119.99',
    url: zalandoLink('shearling lined chelsea boots'),
    store: 'Zalando',
  },
  cold: {
    name: 'Oversized Merino Sweater',
    reason: "Layer up beautifully — it's chilly today",
    price: '€59.99',
    url: amazonLink('oversized merino wool sweater minimal'),
    store: 'Amazon',
  },
  hot: {
    name: 'Linen Wide-Leg Trousers',
    reason: 'Stay cool and editorial in the heat',
    price: '€44.99',
    url: zalandoLink('white linen wide leg trousers'),
    store: 'Zalando',
  },
  sun: {
    name: 'Polarized Aviator Sunglasses',
    reason: 'The perfect finishing touch for a sunny day',
    price: '€34.99',
    url: amazonLink('minimal polarized aviator sunglasses gold'),
    store: 'Amazon',
  },
  noOuterwear: {
    name: 'Classic Beige Trench Coat',
    reason: 'A versatile layering piece your wardrobe needs',
    price: '€129.99',
    url: zalandoLink('classic beige trench coat minimal'),
    store: 'Zalando',
  },
  noShoes: {
    name: 'White Leather Sneakers',
    reason: 'Clean sneakers that instantly elevate any look',
    price: '€89.99',
    url: zalandoLink('clean white leather minimal sneakers'),
    store: 'Zalando',
  },
}

/** Pick the most relevant affiliate item for current conditions */
export function pickAffiliate(weather, ootd) {
  const icon = weather?.condition?.icon || 'sun'
  if (icon === 'rain' || icon === 'storm') return AFFILIATES.rain
  if (icon === 'snow')                      return AFFILIATES.snow
  if ((weather?.temp ?? 22) < 10)           return AFFILIATES.cold
  if ((weather?.temp ?? 22) > 28)           return AFFILIATES.hot
  if (ootd?.missingCategory === 'Outerwear') return AFFILIATES.noOuterwear
  if (ootd?.missingCategory === 'Shoes')     return AFFILIATES.noShoes
  return AFFILIATES.sun
}

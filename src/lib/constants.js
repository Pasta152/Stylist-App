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

// ── Affiliate recommendation items ───────────────────────────
export const AFFILIATES = {
  rain: {
    name: 'Transparent Rain Mac',
    reason: 'Essential for today\'s rain — stay chic, stay dry',
    price: '€49.99',
    q: 'transparent+minimal+rain+mac+clear',
  },
  snow: {
    name: 'Shearling Chelsea Boots',
    reason: 'Stay warm and effortlessly stylish in the cold',
    price: '€119.99',
    q: 'shearling+lined+chelsea+boots+women',
  },
  cold: {
    name: 'Oversized Merino Sweater',
    reason: 'Layer up beautifully — it\'s chilly in Athens today',
    price: '€59.99',
    q: 'oversized+merino+wool+sweater+minimal',
  },
  hot: {
    name: 'Linen Wide-Leg Trousers',
    reason: 'Stay cool and editorial in the Athens heat',
    price: '€44.99',
    q: 'white+linen+wide+leg+trousers+minimal',
  },
  sun: {
    name: 'Polarized Aviator Sunglasses',
    reason: 'The perfect finishing touch for a clear sunny day',
    price: '€34.99',
    q: 'minimal+polarized+aviator+sunglasses+gold',
  },
  noOuterwear: {
    name: 'Classic Beige Trench Coat',
    reason: 'A versatile layering piece your wardrobe needs',
    price: '€129.99',
    q: 'classic+beige+trench+coat+minimal+women',
  },
  noShoes: {
    name: 'White Leather Sneakers',
    reason: 'Clean sneakers that instantly elevate any look',
    price: '€89.99',
    q: 'clean+white+leather+minimal+sneakers',
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

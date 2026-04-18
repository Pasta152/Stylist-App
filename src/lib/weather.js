/** WMO weather interpretation codes → human label + emoji */
export function wmoInfo(code) {
  if (code === 0)             return { label: 'Clear',         em: '☀️',  icon: 'sun' }
  if (code <= 3)              return { label: 'Partly Cloudy', em: '⛅',  icon: 'cloud' }
  if (code <= 49)             return { label: 'Foggy',         em: '🌫️', icon: 'fog' }
  if (code <= 67)             return { label: 'Rainy',         em: '🌧️', icon: 'rain' }
  if (code <= 77)             return { label: 'Snowy',         em: '❄️',  icon: 'snow' }
  if (code <= 82)             return { label: 'Showery',       em: '🌦️', icon: 'rain' }
  return                             { label: 'Stormy',        em: '⛈️', icon: 'storm' }
}

/** Resolve device coordinates, falling back to Athens, GR */
async function getCoords() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ lat: 37.9838, lon: 23.7275, city: 'Athens' })
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          city: 'Your Location',
        }),
      () => resolve({ lat: 37.9838, lon: 23.7275, city: 'Athens' }),
      { timeout: 5000 }
    )
  })
}

/**
 * Fetch current weather from Open-Meteo (free, no API key needed).
 * @returns {{ temp: number, condition: object, wind: number, city: string }}
 */
export async function fetchWeather() {
  const coords = await getCoords()
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${coords.lat}&longitude=${coords.lon}` +
    `&current=temperature_2m,weathercode,windspeed_10m` +
    `&temperature_unit=celsius`

  const res  = await fetch(url)
  const data = await res.json()
  const cur  = data.current

  return {
    temp:      Math.round(cur.temperature_2m),
    condition: wmoInfo(cur.weathercode),
    wind:      Math.round(cur.windspeed_10m),
    city:      coords.city,
  }
}

/** Friendly fallback when network / geolocation fails */
export const FALLBACK_WEATHER = {
  temp:      22,
  condition: { label: 'Clear', em: '☀️', icon: 'sun' },
  wind:      12,
  city:      'Athens',
}

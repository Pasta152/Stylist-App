/** WMO weather interpretation codes → human label + emoji */
export function wmoInfo(code) {
  if (code === 0)        return { label: 'Clear',         em: '☀️',  icon: 'sun'   }
  if (code <= 3)         return { label: 'Partly Cloudy', em: '⛅',  icon: 'cloud' }
  if (code <= 49)        return { label: 'Foggy',         em: '🌫️', icon: 'fog'   }
  if (code <= 67)        return { label: 'Rainy',         em: '🌧️', icon: 'rain'  }
  if (code <= 77)        return { label: 'Snowy',         em: '❄️',  icon: 'snow'  }
  if (code <= 82)        return { label: 'Showery',       em: '🌦️', icon: 'rain'  }
  return                        { label: 'Stormy',        em: '⛈️', icon: 'storm' }
}

/** Resolve device coordinates + city name via reverse geocoding */
async function getCoords() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ lat: 37.9838, lon: 23.7275, city: 'Αθήνα' })
      return
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords
        let city = 'Your Location'
        try {
          const res  = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=el`
          )
          const data = await res.json()
          city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            'Your Location'
        } catch { /* keep default */ }
        resolve({ lat, lon, city })
      },
      () => resolve({ lat: 37.9838, lon: 23.7275, city: 'Αθήνα' }),
      { timeout: 6000 }
    )
  })
}

/**
 * Fetch current weather from Open-Meteo (free, no API key needed).
 * @returns {{ temp: number, feelsLike: number, condition: object, wind: number, city: string }}
 */
export async function fetchWeather() {
  const coords = await getCoords()
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${coords.lat}&longitude=${coords.lon}` +
    `&current=temperature_2m,apparent_temperature,weather_code,windspeed_10m` +
    `&temperature_unit=celsius&wind_speed_unit=kmh`

  const res  = await fetch(url)
  if (!res.ok) throw new Error(`Weather API error ${res.status}`)
  const data = await res.json()
  const cur  = data.current

  return {
    temp:      Math.round(cur.temperature_2m),
    feelsLike: Math.round(cur.apparent_temperature),
    condition: wmoInfo(cur.weather_code ?? cur.weathercode ?? 0),
    wind:      Math.round(cur.windspeed_10m),
    city:      coords.city,
  }
}

/** Friendly fallback when network / geolocation fails */
export const FALLBACK_WEATHER = {
  temp:      20,
  feelsLike: 18,
  condition: { label: 'Clear', em: '☀️', icon: 'sun' },
  wind:      10,
  city:      'Αθήνα',
}

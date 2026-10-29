const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const ICON_URL = 'https://openweathermap.org/img/wn'
const MS_TO_KMH = 3.6

export const ERROR_TYPES = {
  NOT_FOUND: 'NOT_FOUND',
  GENERAL: 'GENERAL',
}

export class WeatherError extends Error {
  constructor(type, message) {
    super(message)
    this.name = 'WeatherError'
    this.type = type
  }
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const regionNames = new Intl.DisplayNames(['es'], { type: 'region' })

function getCountryName(code) {
  if (!code) return ''
  try {
    return regionNames.of(code) ?? code
  } catch {
    return code
  }
}

// OpenWeather da la hora en UTC y el desfase de la ciudad en segundos
function getLocalTime(timestamp, timezoneOffset) {
  return new Date((timestamp + timezoneOffset) * 1000).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  })
}

// Convierte la respuesta de OpenWeather al formato que usa la interfaz
function mapWeather(data) {
  const [condition] = data.weather

  return {
    city: data.name,
    country: getCountryName(data.sys.country),
    localTime: getLocalTime(data.dt, data.timezone),
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: capitalize(condition.description),
    iconUrl: `${ICON_URL}/${condition.icon}@2x.png`,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * MS_TO_KMH),
  }
}

export async function getCurrentWeather(city, { signal } = {}) {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

  if (!apiKey) {
    throw new WeatherError(ERROR_TYPES.GENERAL, 'Falta configurar la API key de OpenWeather.')
  }

  const params = new URLSearchParams({
    q: city,
    appid: apiKey,
    units: 'metric',
    lang: 'es',
  })

  let response
  try {
    response = await fetch(`${BASE_URL}?${params}`, { signal })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new WeatherError(ERROR_TYPES.GENERAL, 'No se pudo conectar con el servicio del clima.')
  }

  if (response.status === 404) {
    throw new WeatherError(ERROR_TYPES.NOT_FOUND, 'Ciudad no encontrada')
  }

  if (!response.ok) {
    throw new WeatherError(ERROR_TYPES.GENERAL, 'Ocurrió un error al consultar el clima.')
  }

  return mapWeather(await response.json())
}

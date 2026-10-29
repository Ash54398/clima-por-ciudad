import { useCallback, useRef, useState } from 'react'
import { ERROR_TYPES, getCurrentWeather } from '../services/weatherApi'

export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

export function useWeather() {
  const [status, setStatus] = useState(STATUS.IDLE)
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  const controllerRef = useRef(null)

  const search = useCallback(async (city) => {
    // Cancela una búsqueda anterior que siga en curso
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    setStatus(STATUS.LOADING)
    setError(null)

    try {
      const data = await getCurrentWeather(city, { signal: controller.signal })
      setWeather(data)
      setStatus(STATUS.SUCCESS)
    } catch (err) {
      if (err.name === 'AbortError') return
      setWeather(null)
      setError({
        type: err.type ?? ERROR_TYPES.GENERAL,
        message: err.type ? err.message : 'Ocurrió un error inesperado.',
      })
      setStatus(STATUS.ERROR)
    }
  }, [])

  return { status, weather, error, search }
}

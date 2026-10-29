import Loader from './components/Loader'
import SearchForm from './components/SearchForm'
import StatusMessage from './components/StatusMessage'
import WeatherCard from './components/WeatherCard'
import { STATUS, useWeather } from './hooks/useWeather'
import { ERROR_TYPES } from './services/weatherApi'

function WeatherResult({ status, weather, error }) {
  if (status === STATUS.LOADING) return <Loader />
  if (status === STATUS.SUCCESS) return <WeatherCard weather={weather} />

  if (status === STATUS.ERROR) {
    return error.type === ERROR_TYPES.NOT_FOUND ? (
      <StatusMessage
        variant="warning"
        title="Ciudad no encontrada"
        description="Revisa que el nombre esté bien escrito o prueba agregando el país, por ejemplo “León, MX”."
      />
    ) : (
      <StatusMessage
        variant="error"
        title="No se pudo consultar el clima"
        description="Revisa tu conexión a internet y vuelve a buscar."
      />
    )
  }

  return <p className="text-ink-soft">Busca una ciudad para ver cómo está el clima ahora mismo.</p>
}

export default function App() {
  const { status, weather, error, search } = useWeather()

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pt-10 pb-16 sm:px-6 sm:pt-20">
        <header className="mb-8">
          <h1 className="text-xl font-semibold">Clima por ciudad</h1>
          <p className="mt-1 text-ink-soft">Temperatura, humedad y viento en este momento.</p>
        </header>

        <SearchForm
          onSearch={search}
          isLoading={status === STATUS.LOADING}
          showSuggestions={status === STATUS.IDLE}
        />

        <section aria-live="polite" aria-label="Resultado" className="mt-10">
          <WeatherResult status={status} weather={weather} error={error} />
        </section>
      </main>

      <footer className="mx-auto w-full max-w-2xl px-4 py-6 text-sm text-ink-soft sm:px-6">
        Datos de{' '}
        <a
          href="https://openweathermap.org/"
          target="_blank"
          rel="noreferrer"
          className="rounded-sm text-ink underline decoration-line underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          OpenWeather
        </a>
      </footer>
    </div>
  )
}

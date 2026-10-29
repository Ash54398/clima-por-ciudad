import { useState } from 'react'

const SUGGESTED_CITIES = ['Querétaro', 'Monterrey', 'Madrid', 'Buenos Aires']

export default function SearchForm({ onSearch, isLoading, showSuggestions }) {
  const [query, setQuery] = useState('')
  const [validationError, setValidationError] = useState('')

  function submitCity(value) {
    if (isLoading) return

    const city = value.trim()
    if (!city) {
      setValidationError('Escribe el nombre de una ciudad.')
      return
    }

    setValidationError('')
    setQuery(city)
    onSearch(city)
  }

  function handleSubmit(event) {
    event.preventDefault()
    submitCity(query)
  }

  function handleChange(event) {
    setQuery(event.target.value)
    if (validationError) setValidationError('')
  }

  return (
    <form onSubmit={handleSubmit} noValidate role="search">
      <label htmlFor="city" className="mb-2 block font-medium">
        Ciudad
      </label>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-0">
        <input
          id="city"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Ej. Querétaro"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
          aria-invalid={Boolean(validationError)}
          aria-describedby={validationError ? 'city-error' : undefined}
          className="min-h-12 w-full flex-1 rounded-md border border-line bg-white px-4 text-base text-ink placeholder:text-ink-soft focus:border-focus focus:outline-2 focus:outline-offset-0 focus:outline-focus/30 aria-invalid:border-red-700 sm:rounded-r-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-ink px-6 font-medium text-white hover:bg-[#24384a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:bg-ink-soft sm:rounded-l-none"
        >
          {isLoading && (
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
            />
          )}
          {isLoading ? 'Buscando' : 'Buscar'}
        </button>
      </div>

      {validationError && (
        <p id="city-error" role="alert" className="mt-2 text-sm text-red-700">
          {validationError}
        </p>
      )}

      {showSuggestions && (
        <div className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2 text-sm text-ink-soft">
          <span className="mr-1">Prueba con</span>
          {SUGGESTED_CITIES.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => submitCity(city)}
              className="min-h-8 rounded-full border border-line bg-white px-3 text-ink hover:border-ink-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </form>
  )
}

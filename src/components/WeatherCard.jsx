import TemperatureScale from './TemperatureScale'
import WeatherStat from './WeatherStat'

export default function WeatherCard({ weather }) {
  const { city, country, localTime, temperature, feelsLike, description, iconUrl, humidity, windSpeed } =
    weather

  return (
    <article>
      <h2 className="text-2xl font-semibold sm:text-3xl">
        {city}
        {country && <span className="font-normal text-ink-soft">, {country}</span>}
      </h2>
      <p className="mt-1 text-sm text-ink-soft">Hora local {localTime}</p>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <p className="text-8xl leading-none font-semibold tracking-tighter tabular-nums sm:text-9xl">
          {temperature}
          <span className="align-top text-4xl font-normal tracking-normal text-ink-soft sm:text-5xl">
            °C
          </span>
        </p>
        <div className="flex items-center gap-2 pb-2">
          <img
            src={iconUrl}
            alt=""
            width="56"
            height="56"
            className="size-14 rounded-full bg-[#c9d8e4]"
          />
          <p className="text-lg font-medium">{description}</p>
        </div>
      </div>

      <TemperatureScale temperature={temperature} />

      <dl className="mt-10 grid grid-cols-3 divide-x divide-line border-t border-line pt-5">
        <WeatherStat label="Sensación térmica" value={feelsLike} unit="°C" />
        <WeatherStat label="Humedad" value={humidity} unit="%" />
        <WeatherStat label="Viento" value={windSpeed} unit="km/h" />
      </dl>
    </article>
  )
}

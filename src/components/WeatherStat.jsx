export default function WeatherStat({ label, value, unit }) {
  return (
    <div className="py-1 pl-4 first:pl-0">
      <dt className="text-sm text-ink-soft">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold tabular-nums">
        {value}
        <span className="ml-1 text-base font-normal text-ink-soft">{unit}</span>
      </dd>
    </div>
  )
}

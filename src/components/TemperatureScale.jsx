const MIN = -10
const MAX = 45

// Escala de frío a calor; el marcador indica dónde cae la temperatura actual
export default function TemperatureScale({ temperature }) {
  const toPercent = (value) => ((value - MIN) / (MAX - MIN)) * 100
  const position = toPercent(Math.min(Math.max(temperature, MIN), MAX))

  return (
    <div aria-hidden="true" className="mt-8">
      <div className="relative h-2 rounded-full bg-[linear-gradient(to_right,#3e6fb0,#79b4c9_30%,#e8c766_58%,#e08a45_78%,#c2412d)]">
        <span
          className="absolute top-1/2 h-5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink ring-2 ring-paper"
          style={{ left: `${position}%` }}
        />
      </div>
      <div className="relative mt-2 h-4 text-xs text-ink-soft tabular-nums">
        <span className="absolute left-0">{MIN}°</span>
        <span className="absolute -translate-x-1/2" style={{ left: `${toPercent(0)}%` }}>
          0°
        </span>
        <span className="absolute -translate-x-1/2" style={{ left: `${toPercent(20)}%` }}>
          20°
        </span>
        <span className="absolute right-0">{MAX}°</span>
      </div>
    </div>
  )
}

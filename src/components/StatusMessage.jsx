const VARIANTS = {
  warning: 'text-amber-800',
  error: 'text-red-700',
}

export default function StatusMessage({ title, description, variant }) {
  return (
    <div role="alert">
      <p className={`text-lg font-semibold ${VARIANTS[variant]}`}>{title}</p>
      {description && <p className="mt-1 max-w-prose text-ink-soft">{description}</p>}
    </div>
  )
}

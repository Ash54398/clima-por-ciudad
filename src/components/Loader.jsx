export default function Loader() {
  return (
    <div role="status" className="animate-pulse motion-reduce:animate-none">
      <span className="sr-only">Consultando el clima…</span>
      <div aria-hidden="true">
        <div className="h-6 w-48 rounded bg-line" />
        <div className="mt-6 h-24 w-40 rounded bg-line" />
        <div className="mt-8 h-2 w-full rounded-full bg-line" />
        <div className="mt-10 grid grid-cols-3 gap-4">
          <div className="h-12 rounded bg-line" />
          <div className="h-12 rounded bg-line" />
          <div className="h-12 rounded bg-line" />
        </div>
      </div>
    </div>
  )
}

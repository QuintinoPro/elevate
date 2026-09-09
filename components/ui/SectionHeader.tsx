export function SectionHeader({
  eyebrow,
  headline,
  className = '',
}: {
  eyebrow: string
  headline: string
  className?: string
}) {
  return (
    <header className={className}>
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-sm">
        {eyebrow}
      </p>
      <h2 className="mt-5 max-w-[20ch] text-display-md font-bold sm:text-display-lg">{headline}</h2>
    </header>
  )
}

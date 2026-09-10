import type { Headline } from '@/lib/content'

/**
 * Headline pode vir como string ou como o objeto de três partes do content.ts.
 * No segundo caso o miolo sai em azul — é assim que a página grifa a palavra
 * que carrega a promessa sem precisar de JSX espalhado pelas seções.
 */
export function AccentHeadline({ headline }: { headline: string | Headline }) {
  if (typeof headline === 'string') return <>{headline}</>
  return (
    <>
      {headline.before}
      <span className="text-accent">{headline.accent}</span>
      {headline.after}
    </>
  )
}

export function SectionHeader({
  eyebrow,
  headline,
  className = '',
  align = 'left',
}: {
  eyebrow: string
  headline: string | Headline
  className?: string
  /** Centralizado só onde a seção inteira é centralizada (oferta, fechos). */
  align?: 'left' | 'center'
}) {
  const centered = align === 'center'
  return (
    <header className={`${centered ? 'text-center' : ''} ${className}`}>
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-sm">
        {eyebrow}
      </p>
      <h2
        className={`mt-5 max-w-[20ch] text-display-md font-bold sm:text-display-lg ${
          centered ? 'mx-auto max-w-[22ch]' : ''
        }`}
      >
        <AccentHeadline headline={headline} />
      </h2>
    </header>
  )
}

import { Fragment } from 'react'
import type { Headline } from '@/lib/content'

/**
 * Transforma os "\n" da copy em <br> de verdade.
 *
 * Com `quebra: 'md'` o <br> nasce `display:none` e só passa a quebrar a partir
 * do md — um <br> escondido não quebra linha, então abaixo disso o texto volta
 * a se arranjar sozinho. Serve para headline cuja linha só cabe inteira em
 * tela grande: no celular, forçar o corte deixaria uma palavra órfã embaixo.
 */
function comQuebras(texto: string | undefined, quebra: Headline['quebra']) {
  if (!texto) return null
  return texto.split('\n').map((parte, i) => (
    <Fragment key={i}>
      {i > 0 && <br className={quebra === 'md' ? 'hidden md:inline' : undefined} />}
      {parte}
    </Fragment>
  ))
}

/**
 * Headline pode vir como string ou como o objeto de três partes do content.ts.
 * No segundo caso o miolo sai em azul — é assim que a página grifa a palavra
 * que carrega a promessa sem precisar de JSX espalhado pelas seções.
 */
export function AccentHeadline({ headline }: { headline: string | Headline }) {
  if (typeof headline === 'string') return <>{headline}</>
  return (
    <>
      {comQuebras(headline.before, headline.quebra)}
      <span className="text-accent">{headline.accent}</span>
      {comQuebras(headline.after, headline.quebra)}
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
      {/* Uma classe de largura só. Emitir max-w-[20ch] e max-w-[22ch] juntas
          deixava o resultado na mão da ordem das regras no CSS gerado — as duas
          casavam, e vencia a que o Tailwind escrevesse por último. */}
      <h2
        className={`mt-5 text-balance text-display-md font-bold sm:text-display-lg ${
          centered ? 'mx-auto max-w-[22ch]' : 'max-w-[20ch]'
        }`}
      >
        <AccentHeadline headline={headline} />
      </h2>
    </header>
  )
}

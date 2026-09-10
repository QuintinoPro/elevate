import { MoonAssetLazy } from '@/components/ui/MoonAssetLazy'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { comoFunciona } from '@/lib/content'

/**
 * Sempre vertical: são seis passos e uma sequência real, então o trilho contínuo
 * comunica melhor que uma grade — e seis colunas não caberiam no desktop.
 */
export function ComoFunciona() {
  const total = comoFunciona.passos.length

  return (
    <Section id="como-funciona" stars className="border-y border-line/25">
      <SectionHeader eyebrow={comoFunciona.eyebrow} headline={comoFunciona.headline} />

      {/* Passos à esquerda, lua à direita: a coluna da direita estava vazia
          e a ilustração dá peso visual à sequência sem competir com ela. */}
      <div className="mt-14 grid items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-16">
      <ol className="max-w-2xl">
        {comoFunciona.passos.map((passo, i) => (
          <li key={passo.title} className="relative pb-10 pl-14 last:pb-0">
            {i < total - 1 && (
              <span aria-hidden className="absolute left-[17px] top-10 h-full w-px bg-line/50" />
            )}
            <span
              aria-hidden
              className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-ink text-sm font-bold tabular-nums text-accent"
            >
              {i + 1}
            </span>

            <h3 className="pt-1 text-xl font-bold">{passo.title}</h3>
            <p className="mt-2 leading-relaxed text-paper/55">{passo.body}</p>
          </li>
        ))}
        </ol>

        <MoonAssetLazy className="mx-auto aspect-square w-full max-w-sm lg:w-[24rem]" />
      </div>
    </Section>
  )
}

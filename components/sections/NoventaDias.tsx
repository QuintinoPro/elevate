import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { noventaDias } from '@/lib/content'

/**
 * Linha do tempo: horizontal no desktop, vertical no mobile. A progressão é o
 * argumento — por isso trilho e marcadores, e não uma grade de cards.
 */
export function NoventaDias() {
  const total = noventaDias.marcos.length

  return (
    <Section id="noventa-dias" stars className="border-y border-line/25">
      <SectionHeader eyebrow={noventaDias.eyebrow} headline={noventaDias.headline} />

      <ol className="mt-14 grid gap-10 lg:grid-cols-4 lg:gap-8">
        {noventaDias.marcos.map((marco, i) => (
          <li key={marco.quando} className="relative pl-9 lg:pl-0 lg:pt-12">
            {/* trilho: desce no mobile, atravessa no desktop; some no último */}
            {i < total - 1 && (
              <span
                aria-hidden
                // No desktop o trilho precisa cobrir também o vão entre as
                // colunas (gap-8 = 2rem), senão vira linha tracejada.
                className="absolute left-[5px] top-4 h-full w-px bg-line/50 lg:left-3 lg:top-[5px] lg:h-px lg:w-[calc(100%+2rem)]"
              />
            )}
            <span
              aria-hidden
              className="absolute left-0 top-2 h-[11px] w-[11px] rounded-full bg-accent lg:top-0"
            />

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
              {marco.quando}
            </p>
            <h3 className="mt-3 text-xl font-bold">{marco.title}</h3>
            <p className="mt-2 leading-relaxed text-paper/55">{marco.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

import { GlobePulseLazy } from '@/components/ui/GlobePulseLazy'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { oQueE } from '@/lib/content'

/**
 * Uma ideia só: o Elevate Pro é ambiente, não curso. O globo diz o resto sem
 * texto — a rede espalhada pelo Brasil, com os pulsos marcando de onde as
 * pessoas vêm. Ele baixa tarde e só desenha quando está na tela, então não
 * disputa orçamento com o canvas do hero.
 */
export function OQueE() {
  return (
    <Section id="o-que-e">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* Texto primeiro no DOM: o argumento vem antes da ilustração para
            quem usa leitor de tela. */}
        <div>
          <SectionHeader eyebrow={oQueE.eyebrow} headline={oQueE.headline} />
          <p className="mt-8 max-w-prose text-lg leading-relaxed text-paper/65">{oQueE.body}</p>
        </div>

        {/* aspect-square no wrapper, e não só dentro do GlobePulse: sem altura
            reservada o alvo do IntersectionObserver nasce com 0px, o observer
            não dispara e o globo nunca chega a montar. De quebra, o espaço já
            fica guardado e a seção não pula quando o canvas entra. */}
        <GlobePulseLazy className="mx-auto aspect-square w-full max-w-sm lg:w-[24rem]" />
      </div>

      {/* Os quatro pilares em faixa: é o resumo da seção em quatro palavras, e
          precisa ler como carimbo. No celular vira grade 2×2 para nenhuma
          palavra ser cortada ou espremida. */}
      <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/30 bg-line/30 sm:grid-cols-4">
        {oQueE.pilares.map((pilar) => (
          <li
            key={pilar}
            className="bg-ink px-4 py-6 text-center text-xs font-bold uppercase tracking-[0.16em] text-paper sm:py-7 sm:text-sm"
          >
            {pilar}
          </li>
        ))}
      </ul>
    </Section>
  )
}

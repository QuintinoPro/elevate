import { Button } from '@/components/ui/Button'
import { FlowConverge } from '@/components/ui/FlowConverge'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import {
  CTA_LABEL_OFERTA,
  PRICE,
  PRICE_PARCELA,
  PRICE_PARCELAS,
  PRODUCT,
  QUIZ_PATH,
} from '@/lib/constants'
import { oferta } from '@/lib/content'

/**
 * A seção de decisão. Tudo centralizado e num card só: preço, o que inclui e
 * o botão no mesmo campo de visão, sem o olho ter que ir e voltar entre duas
 * colunas. Os caminhos do FlowConverge medem o botão e convergem nele — a
 * metáfora fecha exatamente no ponto da conversão.
 */
export function Oferta() {
  return (
    <Section
      id="oferta"
      backdrop={
        <>
          <FlowConverge />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(30,144,255,0.16),transparent_65%)]"
          />
        </>
      }
    >
      <SectionHeader eyebrow={oferta.eyebrow} headline={oferta.headline} align="center" />

      <article className="relative mx-auto mt-14 max-w-2xl overflow-hidden rounded-2xl border border-accent/40 bg-ink/70 p-7 backdrop-blur-sm sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,144,255,0.16),transparent_60%)]"
        />

        <div className="relative text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">{PRODUCT}</p>

          {/* O número grande é a parcela, e o valor à vista vem abaixo. No
              celular o tipo cai um degrau (text-5xl): "12x de R$41,42" é mais
              que o dobro de caracteres do valor cheio e no text-6xl estourava a
              largura do card em 360px. items-baseline alinha o "12x de" pela
              base dos dígitos, não pelo topo da caixa. */}
          <p className="mt-5 flex flex-wrap items-baseline justify-center gap-x-2.5 font-bold tracking-[-0.03em]">
            <span className="text-xl text-paper/65 sm:text-3xl">{PRICE_PARCELAS}x de</span>
            <span className="text-5xl sm:text-7xl">{PRICE_PARCELA}</span>
          </p>
          <p className="mt-3 text-base text-paper/75 sm:text-lg">
            ou <strong className="font-bold text-paper">{PRICE}</strong> à vista
          </p>
          <p className="mt-2 text-sm text-paper/60 sm:text-base">{oferta.notaPreco}</p>
        </div>

        {/* Uma coluna no celular e duas a partir do sm. Em duas colunas num
            aparelho estreito os itens mais longos quebram em duas linhas cada e
            a lista fica mais alta do que empilhada. */}
        <ul className="relative mt-10 grid grid-cols-1 gap-x-8 gap-y-3.5 border-y border-line/30 py-8 text-left sm:grid-cols-2">
          {oferta.inclui.map((item) => (
            <li key={item} className="flex items-start gap-3 leading-snug text-paper/80">
              <span aria-hidden className="mt-0.5 shrink-0 font-bold text-accent">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="relative mt-9 text-center">
          {/* data-flow-target: o FlowConverge mede este elemento e faz as
              linhas convergirem exatamente aqui. */}
          <div className="block sm:inline-block" data-flow-target>
            <Button href={QUIZ_PATH} className="w-full sm:w-auto">
              {CTA_LABEL_OFERTA}
            </Button>
          </div>

          {/* Ressalva no lugar de contador regressivo: honesta e discreta. */}
          <p className="mx-auto mt-6 max-w-[46ch] text-xs leading-relaxed text-paper/55 sm:text-sm">
            {oferta.ressalva}
          </p>
          <p className="mx-auto mt-3 max-w-[46ch] text-xs leading-relaxed text-paper/55 sm:text-sm">
            {oferta.garantia}
          </p>
        </div>
      </article>
    </Section>
  )
}

import { Button } from '@/components/ui/Button'
import { FlowConverge } from '@/components/ui/FlowConverge'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CTA_LABEL_OFERTA, PRODUCT, QUIZ_PATH } from '@/lib/constants'
import { oferta } from '@/lib/content'

/**
 * A seção de decisão. Tudo centralizado e num card só: o que inclui e o botão
 * no mesmo campo de visão, sem o olho ter que ir e voltar entre duas colunas.
 * Os caminhos do FlowConverge medem o botão e convergem nele — a metáfora
 * fecha exatamente no ponto da conversão.
 *
 * Sem preço desde 21/10/2026: o número grande saiu e o card passou a dizer o
 * que a primeira turma recebe e o que acontece depois do cadastro. Ver a
 * regra em lib/constants.ts antes de trazer qualquer valor de volta.
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

      {/* px-5 no celular, não p-7: com 28px de cada lado a lista de duas
          colunas e o botão ficavam espremidos em 360px. */}
      <article className="relative mx-auto mt-14 max-w-2xl overflow-hidden rounded-2xl border border-accent/40 bg-ink/70 px-5 py-8 backdrop-blur-sm sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,144,255,0.16),transparent_60%)]"
        />

        <div className="relative text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">{PRODUCT}</p>
          <h3 className="mt-4 text-balance text-2xl font-bold tracking-[-0.02em] sm:text-4xl">
            {oferta.titulo}
          </h3>
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
            <Button href={QUIZ_PATH} compacto className="w-full sm:w-auto">
              {CTA_LABEL_OFERTA}
            </Button>
          </div>

          <p className="mx-auto mt-6 max-w-[46ch] text-sm leading-relaxed text-paper/60">
            {oferta.processo}
          </p>
        </div>
      </article>
    </Section>
  )
}

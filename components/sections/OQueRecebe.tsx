import { ICONES, type IconeNome } from '@/components/ui/IconesRecebe'
import { Section } from '@/components/ui/Section'
import { AccentHeadline, SectionHeader } from '@/components/ui/SectionHeader'
import { oQueRecebe } from '@/lib/content'

/**
 * Grade bento: o desenho carrega a hierarquia, então nenhum card precisa dizer
 * "este é mais importante". No desktop são 3 colunas × 3 linhas que fecham
 * exatas — o herói ocupa 2×2, a mentoria a coluna alta ao lado, e os três
 * últimos formam a base. Nenhuma célula sobra, que é o que separa bento de
 * grade com buraco.
 *
 * A ordem do DOM é a ordem de importância, e a grade foi montada para que
 * `grid-auto-flow` sozinho já coloque cada card no lugar certo. Reordenar o
 * array em content.ts reordena o desenho junto.
 */

const CARD_BASE =
  'group relative flex flex-col overflow-hidden rounded-2xl border p-7 transition-colors duration-300 sm:p-8'

export function OQueRecebe() {
  return (
    <Section id="o-que-recebe">
      <SectionHeader eyebrow={oQueRecebe.eyebrow} headline={oQueRecebe.headline} />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:auto-rows-[15.5rem] lg:grid-cols-3">
        {/* Herói: 2×2. A textura da marca fica só no canto superior direito e
            quase invisível: a 0.05 sem máscara ela cobria o card inteiro e
            virava estampa, que é exatamente o que o PRODUCT.md proíbe. A
            máscara também tira o padrão de baixo do texto. */}
        <article
          className={`${CARD_BASE} justify-end border-accent/40 bg-surface/40 sm:col-span-2 lg:row-span-2`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-brand-pattern opacity-[0.035] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_60%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(30,144,255,0.2),transparent_62%)]"
          />

          <div className="relative">
            {/* Pílula com ponto pulsando: o mesmo sinal de "acontecendo agora"
                que a seção inteira está vendendo. */}
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
              <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
              {oQueRecebe.destaque.badge}
            </span>

            <h3 className="mt-6 max-w-[14ch] text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl">
              {oQueRecebe.destaque.title}
            </h3>
            <p className="mt-5 max-w-prose leading-relaxed text-paper/70 sm:text-lg">
              {oQueRecebe.destaque.body}
            </p>
          </div>
        </article>

        {oQueRecebe.cards.map((card) => {
          const Icone = ICONES[card.icone as IconeNome]
          const alto = 'alto' in card && card.alto

          return (
            <article
              key={typeof card.title === 'string' ? card.title : card.title.accent}
              className={`${CARD_BASE} border-line/35 bg-surface/20 hover:border-accent/45 ${
                alto ? 'justify-end lg:row-span-2' : 'justify-start'
              }`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,rgba(30,144,255,0.12),transparent_65%)]"
              />

              <div className="relative">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-colors duration-300 group-hover:border-accent/50">
                  <Icone className="h-5 w-5" />
                </span>
              </div>

              {/* No card alto tudo desce para o pé, como no herói ao lado: o
                  espaço sobra em cima, onde lê como respiro, em vez de abrir um
                  vão entre o ícone e o título, onde lia como erro. O título vai
                  num corpo bem maior de propósito — é ele que dá peso à coluna
                  alta. */}
              <div className={`relative ${alto ? 'mt-8' : 'mt-6'}`}>
                <h3
                  className={`font-bold leading-[1.12] ${alto ? 'text-3xl sm:text-[2.1rem]' : 'text-lg'}`}
                >
                  <AccentHeadline headline={card.title} />
                </h3>
                <p className={`mt-3 leading-relaxed text-paper/65 ${alto ? 'sm:text-lg' : ''}`}>
                  {card.body}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}

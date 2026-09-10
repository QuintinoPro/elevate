import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { oQueRecebe } from '@/lib/content'

export function OQueRecebe() {
  return (
    <Section id="o-que-recebe">
      <SectionHeader eyebrow={oQueRecebe.eyebrow} headline={oQueRecebe.headline} />

      {/* O acesso aos outros membros é o que a página vende: é a única coisa da
          lista que não dá pra comprar em outro lugar. Por isso ele é o card
          largo. Ver PRODUCT.md — essa hierarquia já foi o contrário. */}
      <article className="relative mt-14 overflow-hidden rounded-2xl border border-accent/40 bg-surface/40 p-8 sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(30,144,255,0.14),transparent_60%)]"
        />
        <div className="relative">
          <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
            {oQueRecebe.destaque.badge}
          </span>
          <h3 className="mt-6 max-w-[16ch] text-3xl font-bold leading-tight sm:text-4xl">
            {oQueRecebe.destaque.title}
          </h3>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-paper/70">
            {oQueRecebe.destaque.body}
          </p>
        </div>
      </article>

      {/* 2 colunas no tablet e 4 no desktop: com 4 cards, três colunas deixaria
          um órfão sozinho na segunda linha.

          Fundo próprio e texto mais claro que a versão anterior: esses quatro
          são diferencial, não sobra do card de cima. A hierarquia continua
          existindo — o que sumiu foi a aparência de rodapé. */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {oQueRecebe.cards.map((card) => (
          <article
            key={card.title}
            className="rounded-2xl border border-line/35 bg-surface/20 p-7 transition-colors hover:border-accent/40"
          >
            <h3 className="text-lg font-bold">{card.title}</h3>
            <p className="mt-3 leading-relaxed text-paper/65">{card.body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

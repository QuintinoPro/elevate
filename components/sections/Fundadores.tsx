import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { asset } from '@/lib/constants'
import { fundadores } from '@/lib/content'

export function Fundadores() {
  return (
    <Section id="fundadores" className="border-y border-line/25 bg-surface/20">
      <SectionHeader eyebrow={fundadores.eyebrow} headline={fundadores.headline} />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {fundadores.pessoas.map((p) => (
          <article
            key={p.nome}
            className="overflow-hidden rounded-2xl border border-line/30 bg-ink"
          >
            {/* Retrato real dos dois. As fotos nasceram com temperaturas de cor
                opostas (palco azul / estúdio laranja): foram dessaturadas de
                leve e recortadas na mesma escala para não brigarem lado a lado.
                O degradê no pé costura a foto com o fundo do card. */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={asset(p.foto)}
                alt={p.nome}
                width={480}
                height={640}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent"
              />
            </div>

            <div className="p-7 pt-6 sm:p-9 sm:pt-6">
            <h3 className="text-2xl font-bold">{p.nome}</h3>
            <p className="mt-1 text-sm font-bold uppercase tracking-wider text-accent">{p.papel}</p>
            <p className="mt-4 leading-relaxed text-paper/55">{p.bio}</p>

            <a
              href={p.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm text-paper/40 transition-colors hover:text-accent"
            >
              {p.handle}
            </a>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 max-w-prose text-lg leading-relaxed text-paper/70">{fundadores.fecho}</p>
    </Section>
  )
}

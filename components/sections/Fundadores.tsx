import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { asset } from '@/lib/constants'
import { fundadores } from '@/lib/content'

export function Fundadores() {
  return (
    <Section id="fundadores" stars className="border-y border-line/25 bg-surface/20">
      <SectionHeader eyebrow={fundadores.eyebrow} headline={fundadores.headline} />

      {/* A grade é estreitada de propósito (max-w-4xl dentro do container de
          6xl): em 2 colunas cheias o card passava de 600px de altura e a foto
          virava o assunto da seção. Aqui os dois cards ainda cabem lado a lado,
          mas o retrato para de competir com a headline. */}
      <div className="mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
        {fundadores.pessoas.map((p) => (
          <article
            key={p.nome}
            className="flex flex-col overflow-hidden rounded-2xl border border-line/30 bg-ink"
          >
            {/* Retrato real dos dois. As fotos nasceram com temperaturas de cor
                opostas (palco azul / estúdio laranja): foram dessaturadas de
                leve e recortadas na mesma escala para não brigarem lado a lado.
                O degradê no pé costura a foto com o fundo do card. */}
            <div className="relative aspect-[5/4] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(p.foto)}
                alt={p.nome}
                // 5:4, igual ao aspect-[5/4] do contêiner. Estava 480×640
                // (3:4), então a proporção reservada antes da imagem carregar
                // era a errada.
                width={600}
                height={480}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink to-transparent"
              />
            </div>

            <div className="flex flex-1 flex-col p-6 pt-5">
              <h3 className="text-xl font-bold">{p.nome}</h3>

              {/* Credencial antes da bio: cargo e empresa são o que dá lastro
                  ao card. Em coluna, não separados por ponto — dois cargos numa
                  linha só quebram feio na largura estreita do card. */}
              <ul className="mt-2 space-y-0.5">
                {p.cargos.map((cargo) => (
                  <li key={cargo} className="text-sm font-medium leading-snug text-accent">
                    {cargo}
                  </li>
                ))}
              </ul>

              <p className="mt-3 text-sm leading-relaxed text-paper/55">{p.bio}</p>

              <a
                href={p.instagram}
                target="_blank"
                rel="noopener noreferrer"
                // mt-auto: um dos dois tem dois cargos, então sem isso o
                // handle de cada card para numa altura diferente e o par
                // parece desalinhado.
                className="mt-auto inline-block pt-4 text-sm text-paper/55 transition-colors hover:text-accent"
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

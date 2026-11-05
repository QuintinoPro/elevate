import { Esteira } from '@/components/ui/Esteira'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { asset } from '@/lib/constants'
import { fundadores } from '@/lib/content'

type Pessoa = (typeof fundadores.pessoas)[number]

function CardPessoa({ p }: { p: Pessoa }) {
  return (
    <article className="flex w-[17.5rem] flex-col overflow-hidden rounded-2xl border border-line/30 bg-ink sm:w-[19rem]">
      {/* Retratos reais. As fotos nasceram com temperaturas de cor diferentes
          (palco azul, estúdio laranja): foram dessaturadas de leve e
          recortadas na mesma escala para não brigarem lado a lado. O degradê
          no pé costura a foto com o fundo do card. */}
      <div className="relative aspect-[5/4] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(p.foto)}
          alt={p.nome}
          // 5:4, igual ao aspect-[5/4] do contêiner. Estava 480×640 (3:4),
          // então a proporção reservada antes da imagem carregar era a errada.
          width={600}
          height={480}
          loading="lazy"
          className="h-full w-full object-cover"
          // Cada retrato tem o rosto numa altura: ver `enquadramento` no
          // content.ts. O padrão é o topo.
          style={{ objectPosition: 'enquadramento' in p ? p.enquadramento : '50% 0%' }}
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6 pt-5">
        <h3 className="text-xl font-bold">{p.nome}</h3>

        {/* Credencial antes da bio: cargo e empresa são o que dá lastro ao
            card. Em coluna, não separados por ponto: dois cargos numa linha
            só quebram feio na largura estreita do card. */}
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
          // mt-auto: os cards têm número de cargos diferente, e na esteira
          // todos esticam até a altura do mais alto. Sem isso o @ de cada um
          // para numa altura e a fileira parece desalinhada.
          // min-h-11 com o texto no pé: área de toque de 44px sem mudar onde
          // o @ aparece.
          className="mt-auto inline-flex min-h-11 items-end self-start pt-4 text-sm text-paper/55 transition-colors hover:text-accent"
        >
          {p.handle}
        </a>
      </div>
    </article>
  )
}

export function Fundadores() {
  return (
    <Section id="fundadores" stars className="border-y border-line/25 bg-surface/20">
      <SectionHeader eyebrow={fundadores.eyebrow} headline={fundadores.headline} />

      {/* Esteira infinita desde 05/11/2026, a pedido do Lucas: com 5 pessoas
          a grade virava duas fileiras e a seção ficava comprida. Correndo de
          lado, cabe gente nova sem a seção crescer. Card de largura fixa: a
          foto 5:4 fica com ~240px de altura e não vira o assunto da seção. */}
      <div className="mt-14">
        <Esteira
          rotulo="Quem está por trás da Elevate League"
          itens={fundadores.pessoas.map((p) => (
            <CardPessoa key={p.nome} p={p} />
          ))}
        />
      </div>

      <p className="mt-10 max-w-prose text-lg leading-relaxed text-paper/70">{fundadores.fecho}</p>
    </Section>
  )
}

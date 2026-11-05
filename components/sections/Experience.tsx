import { Button } from '@/components/ui/Button'
import { Carrossel } from '@/components/ui/Carrossel'
import { Logo } from '@/components/ui/Logo'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { asset } from '@/lib/constants'
import {
  experiencias,
  type EdicaoDestino,
  type EdicaoExperience,
  type EdicaoSurpresa,
  type StatusExperience,
} from '@/lib/content'

const STATUS: Record<StatusExperience, string> = {
  'em-breve': 'Em breve',
  'inscricoes-abertas': 'Inscrições abertas',
  encerrada: 'Edição encerrada',
}

/**
 * Corte de paralelogramo das faixas do cartaz. Em clip-path e não em skew: o
 * texto fica reto, e como o recuo é em em, o ângulo acompanha o tamanho da
 * letra de cada faixa.
 */
const CORTE = 'polygon(0.55em 0, 100% 0, calc(100% - 0.55em) 100%, 0 100%)'

/** Granulado fino por cima do desfoque do card surpresa: tira a cara de degradê de CSS. */
const GRAO =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

/** "2026-12-29" vira "29/12". Fatiando a string, sem Date: nada de fuso puxando o dia pra trás. */
const diaMes = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}`

/**
 * Texto branco sobre o azul da marca dá contraste 3,2:1, que só vale para
 * letra grande em negrito (a partir de ~19px). Por isso nenhuma faixa desce de
 * 1.2rem: é o piso que mantém o branco do cartaz sem reprovar no AA.
 */
function Faixa({
  children,
  tom = 'azul',
  className = '',
}: {
  children: React.ReactNode
  tom?: 'azul' | 'branco'
  className?: string
}) {
  return (
    <span
      className={`inline-block px-[0.9em] py-[0.32em] font-bold leading-tight ${
        tom === 'azul' ? 'bg-accent text-paper' : 'bg-paper text-surface'
      } ${className}`}
      style={{ clipPath: CORTE }}
    >
      {children}
    </span>
  )
}

/**
 * O nome do destino é o "FLORIPA" gigante do cartaz e tem que caber numa linha
 * na largura do card, seja qual for o nome. A letra sai da largura do próprio
 * card (cqi) dividida pelo número de letras. Medido na Sora Bold em caixa
 * alta: FLORIPA ocupa 4,2em, ~0,6em por letra; 0,66 deixa folga para nome com
 * M e W.
 */
function tamanhoDestino(nome: string) {
  const largura = Math.max(nome.length, 5) * 0.66
  return `min(7rem, calc(100cqi / ${largura}))`
}

/**
 * O que os dois tipos de card têm em comum: formato 4:5 (o mesmo do cartaz do
 * Instagram), logo e selo em cima, título no meio, chamada no pé.
 *
 * Sem overflow-hidden no article de propósito: com ele, o aspect-ratio vira
 * altura fixa e um texto maior que o previsto seria cortado. Sem ele, o card
 * cresce se precisar. Quem recorta o fundo nos cantos é a camada do fundo.
 */
function Moldura({
  edicao,
  fundo,
  titulo,
  credito,
}: {
  edicao: EdicaoExperience
  fundo: React.ReactNode
  titulo: React.ReactNode
  credito?: string
}) {
  return (
    // pb maior que o resto: o crédito da foto mora ali, solto no canto.
    <article className="relative isolate flex aspect-[4/5] w-full flex-col rounded-2xl border border-line/30 bg-surface p-4 pb-7 sm:p-6 sm:pb-8">
      <div aria-hidden={edicao.tipo === 'surpresa'} className="absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
        {fundo}
      </div>

      {/* flex-wrap: no card mais estreito (iPhone SE) logo e selo não cabem
          lado a lado, e o selo desce em vez de estourar o card. */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <Logo height={22} className="text-paper" />
        <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-paper/25 bg-ink/50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-paper backdrop-blur-sm">
          <span
            aria-hidden
            className={`h-1.5 w-1.5 rounded-full bg-accent ${edicao.status === 'em-breve' ? 'motion-safe:animate-pulse' : ''}`}
          />
          {STATUS[edicao.status]}
        </span>
      </div>

      {/* container-type num bloco de largura cheia: é contra ele que o cqi do
          destino mede. Se o contêiner fosse o próprio título, a largura
          dependeria da letra e a letra da largura. */}
      <div className="mt-5 [container-type:inline-size]">{titulo}</div>

      {/* mt-auto: a chamada encosta no pé do card, como no cartaz. */}
      <div className="mt-auto pt-4">
        {/* Mesmo vidro do selo de status, pra ler como informação e não
            como mais uma faixa do cartaz. */}
        {edicao.periodo && (
          <p className="mb-3 flex w-fit items-center gap-2 rounded-full border border-paper/25 bg-ink/55 px-3 py-1.5 text-sm font-bold text-paper backdrop-blur-sm">
            <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
              <path d="M3.5 10h17M8 3v4M16 3v4" strokeLinecap="round" />
            </svg>
            <span>
              <time dateTime={edicao.periodo.inicio}>{diaMes(edicao.periodo.inicio)}</time> a{' '}
              <time dateTime={edicao.periodo.fim}>{diaMes(edicao.periodo.fim)}</time>
            </span>
          </p>
        )}
        <Faixa className="max-w-full text-balance text-[1.2rem]">{edicao.chamada}</Faixa>
        {edicao.cta && (
          <Button href={edicao.cta.href} compacto className="mt-4 w-full">
            {edicao.cta.label}
          </Button>
        )}
      </div>

      {/* Fora do fluxo: se ocupasse linha, a chamada do card com foto subiria
          e deixaria de alinhar com a do card sem foto, ao lado. */}
      {credito && (
        <p className="absolute bottom-2.5 right-4 text-[10px] leading-none text-paper/50 sm:right-6">{credito}</p>
      )}
    </article>
  )
}

function CardDestino({ edicao }: { edicao: EdicaoDestino }) {
  const { foto } = edicao
  const srcSet = foto.larguras.map((w) => `${asset(`${foto.base}-${w}.webp`)} ${w}w`).join(', ')

  return (
    <Moldura
      edicao={edicao}
      credito={foto.credito}
      fundo={
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(`${foto.base}-${foto.larguras[0]}.webp`)}
            srcSet={srcSet}
            sizes="(min-width: 640px) 336px, 78vw"
            alt={foto.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            style={{ objectPosition: foto.enquadramento ?? '50% 50%' }}
          />
          {/* Escurece em cima (título) e embaixo (chamada), com o meio aberto
              para a praia. Azul-marinho em cima e não preto: preto deixava as
              nuvens cinza e a praia com cara de tempo fechado. */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,22,40,0.8)_0%,rgba(0,44,73,0.45)_42%,rgba(0,44,73,0.05)_66%,rgba(0,0,0,0.6)_100%)]" />
        </>
      }
      titulo={
        // Mesma hierarquia do cartaz: faixa azul em cima, destino gigante, e
        // as faixas da edição alinhadas pela direita do destino.
        <h3 className="inline-grid justify-items-start text-[1.2rem] uppercase">
          <Faixa>Elevate Experience</Faixa>
          {/* Sombra larga e fraca: no celular o nome passa por cima da areia
              clara, e sem ela o branco some nas bordas das letras. */}
          <span
            className="mt-[0.06em] block font-bold leading-[0.86] tracking-[-0.03em] text-paper [text-shadow:0_2px_24px_rgba(0,20,40,0.45)]"
            style={{ fontSize: tamanhoDestino(edicao.destino) }}
          >
            {edicao.destino}
          </span>
          <span className="mt-2 flex flex-col items-end gap-1.5 justify-self-end">
            <Faixa tom="branco">Edition</Faixa>
            {edicao.ocasiao && <Faixa>{edicao.ocasiao}</Faixa>}
          </span>
        </h3>
      }
    />
  )
}

/**
 * O card que gera procura: mesmo desenho do cartaz, mas o destino é uma
 * mancha desfocada sobre um fundo de luz azul fora de foco. Sem foto de
 * propósito: qualquer paisagem ali seria uma dica (ou uma promessa) de
 * destino que ainda não existe.
 */
function CardSurpresa({ edicao }: { edicao: EdicaoSurpresa }) {
  return (
    <Moldura
      edicao={edicao}
      fundo={
        <>
          <div className="absolute -left-1/4 top-[8%] h-3/4 w-3/4 rounded-full bg-accent/60 blur-3xl" />
          <div className="absolute -right-1/4 bottom-[-10%] h-2/3 w-3/4 rounded-full bg-[#4FB0FF]/35 blur-3xl" />
          <div className="absolute left-[30%] top-[38%] h-1/3 w-1/2 rounded-full bg-paper/20 blur-3xl" />
          {/* Textura da marca só como sussurro, apagando para o pé: com mais
              que isso o card vira papel de parede. */}
          <div className="absolute inset-0 bg-brand-pattern opacity-[0.025] [mask-image:linear-gradient(180deg,black,transparent_70%)]" />
          <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay" style={{ backgroundImage: GRAO }} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,22,40,0.55)_0%,transparent_45%,rgba(0,0,0,0.7)_100%)]" />
        </>
      }
      titulo={
        <h3 className="inline-grid justify-items-start text-[1.2rem] uppercase">
          <Faixa>Elevate Experience</Faixa>
          {/* A palavra borrada é só forma: ninguém lê, e o leitor de tela
              ouve o texto escondido logo abaixo. O blur é em em para
              continuar ilegível em qualquer tamanho de card. */}
          <span
            aria-hidden
            className="mt-[0.06em] block select-none font-bold leading-[0.86] tracking-[-0.03em] text-paper/90 blur-[0.24em]"
            style={{ fontSize: tamanhoDestino('Destino') }}
          >
            Destino
          </span>
          <span className="sr-only">Destino ainda não revelado.</span>
          <span className="mt-2 flex flex-col items-end gap-1.5 justify-self-end">
            <Faixa tom="branco">{edicao.rotulo}</Faixa>
          </span>
        </h3>
      }
    />
  )
}

/**
 * As viagens da liga, num carrossel. Cada card recria em código o cartaz da
 * Elevate Experience (faixas azuis, destino gigante, chamada no pé): o texto
 * fica nítido em qualquer tela e a próxima edição é só um item a mais em
 * `experiencias.edicoes`, sem arte nova pro site.
 *
 * Card de largura fixa, não fração da tela: no desktop cabem três e meio, e
 * no celular o seguinte aparece cortado na borda, que é o convite pra arrastar.
 */
export function Experience() {
  return (
    <Section id="experience">
      <SectionHeader eyebrow={experiencias.eyebrow} headline={experiencias.headline} />
      <p className="mt-8 max-w-prose text-lg leading-relaxed text-paper/65">{experiencias.intro}</p>

      <div className="mt-12">
        <Carrossel rotulo="Viagens da Elevate Experience">
          {experiencias.edicoes.map((edicao) => (
            <li key={edicao.id} className="flex w-[78vw] max-w-[21rem] shrink-0 snap-start sm:w-[21rem]">
              {edicao.tipo === 'destino' ? <CardDestino edicao={edicao} /> : <CardSurpresa edicao={edicao} />}
            </li>
          ))}
        </Carrossel>
      </div>
    </Section>
  )
}

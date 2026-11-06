'use client'

import { useEffect, useRef, useState } from 'react'

/** Quanto o ponteiro precisa andar para virar arrasto. Abaixo disso é clique (no @ do card, por exemplo). */
const LIMIAR_ARRASTO = 6

/**
 * Rapidez com que a velocidade volta ao ritmo normal (por segundo). Depois de
 * um arrasto, o embalo vai se fundindo com o andar automático em vez de parar
 * e recomeçar: 2,5 leva ~1,5s. Também é o que faz a pausa e a retomada serem
 * suaves.
 */
const ACOMODACAO = 2.5

/** Teto do embalo em px/s: um arremesso forte não pode mandar a fila longe demais. */
const EMBALO_MAX = 2500

/**
 * Faixa que corre sozinha para o lado, sem fim, e que também dá pra pegar e
 * girar: arrastando com o mouse, com o dedo ou com o trackpad (pedidos do
 * Lucas, 05/11/2026). Ao soltar, ela continua com o embalo, que vai se
 * fundindo de volta no ritmo normal. Não para com o mouse em cima: o Lucas
 * quer que ela continue girando, e quem quer parar pra ler pega e segura.
 *
 * Como o laço fecha: o trilho tem duas metades iguais, e a posição é sempre
 * trazida de volta para dentro de uma metade. Quando a segunda metade chega
 * onde a primeira estava, a posição volta e ninguém vê o pulo. Cada metade
 * repete a lista até ter `minimoPorVolta` itens (e pelo menos duas cópias):
 * com poucos cards, uma metade seria mais estreita que um monitor largo e
 * apareceria um buraco no fim da fila.
 *
 * Movida por JavaScript e não por animação CSS: animação CSS não deixa a
 * pessoa assumir o controle no meio do caminho.
 *
 * Só uma cópia da lista é "de verdade", a primeira da segunda metade. As
 * outras são `inert`: o leitor de tela não lê a mesma pessoa várias vezes e o
 * Tab não passa pelos mesmos links de novo. Ela fica no meio para que, quando
 * o teclado foca um card, sempre exista conteúdo dos dois lados dele.
 *
 * Movimento automático precisa de um jeito de parar (WCAG 2.2.2): o botão
 * "Pausar", e ela também para com o foco do teclado num card.
 * Ela gira mesmo com "reduzir movimento" ligado no sistema: decisão do
 * Lucas (06/11/2026), que quer a esteira andando pra todo mundo. Quem é
 * sensível a movimento tem o botão Pausar, que por isso aparece sempre.
 */
export function Esteira({
  itens,
  rotulo,
  segundosPorItem = 8,
  minimoPorVolta = 10,
}: {
  itens: React.ReactNode[]
  rotulo: string
  /** Velocidade: quanto tempo cada card leva para passar. */
  segundosPorItem?: number
  minimoPorVolta?: number
}) {
  const janela = useRef<HTMLDivElement>(null)
  const trilho = useRef<HTMLDivElement>(null)
  const [pausada, setPausada] = useState(false)

  // Tudo que muda a cada quadro mora em ref, não em state: re-renderizar o
  // React 60 vezes por segundo pra mexer um transform seria desperdício.
  const estado = useRef({
    /** Deslocamento do trilho em px. Fora do foco, sempre em (-metade, 0]. */
    x: 0,
    metade: 0,
    /** px/s do modo automático (o ritmo normal). */
    velocidade: 0,
    /** px/s de agora. Negativo anda pra esquerda. Persegue o ritmo normal. */
    v: 0,
    pausada: false,
    foco: false,
    arrasto: null as null | { id: number; ultimoX: number; ultimoT: number; percorrido: number },
    /** Se o último toque virou arrasto: aí o clique que vem junto é engolido. */
    arrastou: false,
  })

  const copiasPorMetade = Math.max(2, Math.ceil(minimoPorVolta / itens.length))
  const grupos = copiasPorMetade * 2
  const itensPorMetade = copiasPorMetade * itens.length

  useEffect(() => {
    const el = trilho.current
    const jan = janela.current
    if (!el || !jan) return
    const s = estado.current

    const medir = () => {
      s.metade = el.scrollWidth / 2
      s.velocidade = s.metade / (itensPorMetade * segundosPorItem)
    }
    const ro = new ResizeObserver(medir)
    ro.observe(el)

    let raf = 0
    let anterior = 0
    const quadro = (t: number) => {
      // Teto de 50ms: na volta de uma aba em segundo plano, o intervalo seria
      // de minutos e a esteira daria um salto.
      const dt = anterior ? Math.min((t - anterior) / 1000, 0.05) : 0
      anterior = t

      if (!s.arrasto) {
        const alvo = s.pausada || s.foco ? 0 : -s.velocidade
        s.v += (alvo - s.v) * (1 - Math.exp(-ACOMODACAO * dt))
        s.x += s.v * dt
      }

      // Com o foco do teclado num card, não dá a volta: o card focado tem que
      // continuar na tela, e a volta trocaria ele por uma cópia (inert) igual.
      if (!s.foco && s.metade > 0) s.x = (((s.x % s.metade) - s.metade) % s.metade) || 0
      el.style.transform = `translate3d(${s.x}px,0,0)`
      // O navegador rola a janela sozinho para mostrar um link focado, mesmo
      // com overflow hidden. Quem posiciona aqui é o transform; zera a rolagem.
      if (jan.scrollLeft) jan.scrollLeft = 0

      raf = requestAnimationFrame(quadro)
    }

    // Só anima quando a seção está na tela: fora dela é bateria jogada fora.
    let rodando = false
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !rodando) {
        rodando = true
        anterior = 0
        raf = requestAnimationFrame(quadro)
      } else if (!e.isIntersecting && rodando) {
        rodando = false
        cancelAnimationFrame(raf)
      }
    })
    io.observe(jan)

    // Trackpad: o deslize lateral de dois dedos move a esteira. Precisa ser
    // listener não passivo para o preventDefault segurar o "voltar página"
    // do Chrome no Mac. Deslize vertical passa direto e rola a página.
    const roda = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      s.v = 0
      s.x -= e.deltaX
    }
    jan.addEventListener('wheel', roda, { passive: false })

    return () => {
      ro.disconnect()
      io.disconnect()
      cancelAnimationFrame(raf)
      jan.removeEventListener('wheel', roda)
    }
  }, [itensPorMetade, segundosPorItem])

  const soltar = (e: React.PointerEvent) => {
    const s = estado.current
    if (!s.arrasto || s.arrasto.id !== e.pointerId) return
    // Segurou parado antes de soltar: sem embalo, e a esteira só retoma o
    // ritmo devagar a partir dali.
    if (e.timeStamp - s.arrasto.ultimoT > 80) s.v = 0
    s.v = Math.max(-EMBALO_MAX, Math.min(EMBALO_MAX, s.v))
    s.arrasto = null
    if (janela.current) janela.current.style.cursor = ''
  }

  return (
    <div>
      {/* mx-[calc(50%-50vw)]: a faixa sai do container e vai de borda a
          borda da tela. O 100vw conta a barra de rolagem no Windows, mas a
          seção já tem overflow-hidden (por causa das estrelas) e corta a
          sobra. A máscara apaga as pontas pra os cards entrarem e saírem
          sem corte seco.
          touch-pan-y: no celular o deslize vertical continua rolando a
          página; só o lateral vem pra cá. */}
      <div
        ref={janela}
        className="mx-[calc(50%-50vw)] cursor-grab touch-pan-y select-none overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_7%,black_93%,transparent)]"
        onPointerDown={(e) => {
          if (e.pointerType === 'mouse' && e.button !== 0) return
          const s = estado.current
          s.arrasto = { id: e.pointerId, ultimoX: e.clientX, ultimoT: e.timeStamp, percorrido: 0 }
          s.arrastou = false
          // Segurou: a esteira para na mão, mesmo antes de virar arrasto.
          s.v = 0
        }}
        onPointerMove={(e) => {
          const s = estado.current
          const a = s.arrasto
          if (!a || a.id !== e.pointerId) return
          const dx = e.clientX - a.ultimoX
          const dt = Math.max(e.timeStamp - a.ultimoT, 1) / 1000
          a.percorrido += Math.abs(dx)
          // A captura só entra quando vira arrasto de verdade: capturar no
          // pointerdown desviaria o clique de quem só queria abrir o @.
          if (!s.arrastou && a.percorrido > LIMIAR_ARRASTO) {
            s.arrastou = true
            janela.current?.setPointerCapture(e.pointerId)
            if (janela.current) janela.current.style.cursor = 'grabbing'
          }
          s.x += dx
          // Média móvel: o embalo sai do jeito que a pessoa vinha arrastando
          // nos últimos movimentos, não só do último, que costuma ser ruído.
          s.v = s.v * 0.6 + (dx / dt) * 0.4
          a.ultimoX = e.clientX
          a.ultimoT = e.timeStamp
        }}
        onPointerUp={soltar}
        onPointerCancel={soltar}
        // Arrastou por cima de um @ e soltou: o navegador ainda dispara o
        // clique no link. Se foi arrasto, engole.
        onClickCapture={(e) => {
          if (!estado.current.arrastou) return
          e.preventDefault()
          e.stopPropagation()
          estado.current.arrastou = false
        }}
        // Sem isso, arrastar em cima da foto ou do link puxa o "fantasma"
        // de arrastar imagem do navegador.
        onDragStart={(e) => e.preventDefault()}
        onFocus={(e) => {
          // Só foco de teclado. Clique no @ também foca o link, e aí
          // travar a volta da esteira atrapalharia o arrasto.
          const alvo = e.target as HTMLElement
          if (!alvo.matches(':focus-visible')) return
          const s = estado.current
          s.foco = true
          s.v = 0
          const card = alvo.closest('li')
          const jan = janela.current
          if (card && jan) s.x = -card.offsetLeft + (jan.clientWidth - card.offsetWidth) / 2
        }}
        onBlur={(e) => {
          if (!janela.current?.contains(e.relatedTarget as Node | null)) estado.current.foco = false
        }}
      >
        {/* relative: é contra o trilho que o offsetLeft dos cards mede, na
            hora de centralizar o card que recebeu foco. */}
        <div ref={trilho} className="relative flex w-max will-change-transform">
          {Array.from({ length: grupos }, (_, g) => {
            const real = g === copiasPorMetade
            return (
              // pr igual ao gap: sem ele, a emenda entre uma cópia e a outra
              // ficaria sem espaço e a metade não cairia certinho no começo
              // da segunda.
              <ul
                key={g}
                inert={!real}
                aria-hidden={!real || undefined}
                aria-label={real ? rotulo : undefined}
                className="flex shrink-0 gap-5 pr-5 sm:gap-6 sm:pr-6"
              >
                {itens.map((item, i) => (
                  <li key={i} className="flex">
                    {item}
                  </li>
                ))}
              </ul>
            )
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => {
            const s = estado.current
            s.pausada = !pausada
            // Pausar para na hora; continuar acelera suave a partir do zero.
            if (s.pausada) s.v = 0
            setPausada(!pausada)
          }}
          aria-pressed={pausada}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-bold text-paper/80 transition-colors hover:border-accent hover:text-accent"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            {pausada ? <path d="M8 5.5v13l10.5-6.5z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
          </svg>
          {pausada ? 'Continuar' : 'Pausar'}
        </button>
      </div>
    </div>
  )
}

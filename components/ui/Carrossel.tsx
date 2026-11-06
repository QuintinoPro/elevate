'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Faixa horizontal com rolagem nativa e snap. No celular é o dedo que manda, e
 * o card seguinte aparecendo pela metade na borda é o aviso de que dá pra
 * arrastar. Do sm pra cima entram as setas, mas só quando há o que rolar: com
 * dois cards num desktop largo, tudo cabe e elas nem aparecem.
 *
 * Os filhos precisam ser <li>, e cada um define a própria largura.
 */
export function Carrossel({ children, rotulo }: { children: React.ReactNode; rotulo: string }) {
  const trilho = useRef<HTMLUListElement>(null)
  const [pode, setPode] = useState({ voltar: false, avancar: false })

  useEffect(() => {
    const el = trilho.current
    if (!el) return
    const medir = () => {
      const max = el.scrollWidth - el.clientWidth
      setPode({ voltar: el.scrollLeft > 4, avancar: el.scrollLeft < max - 4 })
    }
    // A primeira medida vem do próprio ResizeObserver, que dispara ao
    // começar a observar. Chamar medir() direto aqui seria setState síncrono
    // dentro do efeito.
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    el.addEventListener('scroll', medir, { passive: true })
    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', medir)
    }
  }, [])

  const passo = (direcao: 1 | -1) => {
    const el = trilho.current
    if (!el) return
    const item = el.querySelector('li')
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const largura = item ? item.getBoundingClientRect().width + gap : el.clientWidth * 0.8
    el.scrollBy({ left: direcao * largura, behavior: 'smooth' })
  }

  const temSetas = pode.voltar || pode.avancar

  return (
    <div>
      {/* -mx/px iguais ao padding do Container: o trilho vaza até a borda da
          tela, então o card cortado na direita encosta no vidro em vez de
          sumir numa margem. O scroll-px faz o snap parar alinhado ao texto.
          tabIndex: os cards não têm link, então sem isso quem usa teclado não
          teria como rolar a faixa. */}
      <ul
        ref={trilho}
        aria-label={rotulo}
        tabIndex={0}
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:gap-5 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>

      {temSetas && (
        <div className="mt-6 hidden justify-end gap-3 sm:flex">
          <Seta direcao={-1} ativa={pode.voltar} onClick={() => passo(-1)} />
          <Seta direcao={1} ativa={pode.avancar} onClick={() => passo(1)} />
        </div>
      )}
    </div>
  )
}

function Seta({ direcao, ativa, onClick }: { direcao: 1 | -1; ativa: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!ativa}
      aria-label={direcao === 1 ? 'Próxima experiência' : 'Experiência anterior'}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
        <path
          d={direcao === 1 ? 'M9 6l6 6-6 6' : 'M15 6l-6 6 6 6'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

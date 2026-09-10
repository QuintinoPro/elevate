'use client'

import { useEffect, useRef } from 'react'

/**
 * Caminhos que convergem para um ponto só: a metáfora da peneira — gente
 * vindo de todo lado para uma entrada única.
 *
 * Escrito do zero de propósito. A referência que originou isto era um iframe
 * que baixava Tailwind CDN, GSAP, ScrollTrigger, Iconify, Google Fonts e um
 * formulário de login inteiro, só para escondê-los depois e deixar o canvas à
 * mostra — cerca de 1 MB e cinco dependências externas para desenhar beziers
 * pontilhadas. Aqui é canvas puro, sem dependência nenhuma.
 */

const CAMINHOS = 56
const ACENTO = '30, 144, 255'

type Caminho = {
  esquerda: boolean
  y: number
  t: number
  velocidade: number
}

export function FlowConverge({ className = '' }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduzido =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let raf = 0
    let visivel = true
    const caminhos: Caminho[] = []

    function semear() {
      caminhos.length = 0
      const n = w < 768 ? Math.round(CAMINHOS * 0.55) : CAMINHOS
      for (let i = 0; i < n; i++) {
        caminhos.push({
          esquerda: i % 2 === 0,
          // Espalha além da altura para as pontas não começarem todas na borda.
          y: (i / n) * h * 2.2 - h * 0.6,
          t: Math.random(),
          velocidade: 0.0016 + Math.random() * 0.0022,
        })
      }
    }

    function medir() {
      const r = host!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(1, r.width)
      h = Math.max(1, r.height)
      canvas!.width = Math.round(w * dpr)
      canvas!.height = Math.round(h * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      semear()
    }

    const estreito = () => w < 768

    /**
     * As linhas convergem no CTA: é o único lugar da seção onde a metáfora
     * fecha — muitos caminhos, uma entrada. A posição é medida do elemento
     * marcado com `data-flow-target`, não fixada em porcentagem, para
     * acompanhar a quebra de linha do texto em qualquer largura.
     */
    function alvo() {
      const marca = host!.closest('section')?.querySelector('[data-flow-target]')
      if (marca) {
        const a = marca.getBoundingClientRect()
        const b = host!.getBoundingClientRect()
        return { x: a.left - b.left + a.width / 2, y: a.top - b.top + a.height / 2 }
      }
      return estreito() ? { x: w * 0.9, y: h * 0.8 } : { x: w * 0.72, y: h * 0.5 }
    }

    function bezier(t: number, p0: P, p1: P, p2: P, p3: P) {
      const u = 1 - t
      return {
        x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
        y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y,
      }
    }
    type P = { x: number; y: number }

    /**
     * Curvatura espelhada: os dois pontos de controle usam a mesma fração da
     * distância até o alvo de cada lado. Com o CTA centralizado, qualquer
     * diferença entre esquerda e direita vira assimetria visível no leque.
     */
    const CURVA_ENTRADA = 0.45
    const CURVA_CHEGADA = 0.82

    function pontos(c: Caminho, a: P) {
      const x0 = c.esquerda ? -w * 0.05 : w * 1.05
      return {
        p0: { x: x0, y: c.y },
        p1: { x: c.esquerda ? a.x * CURVA_ENTRADA : w - (w - a.x) * CURVA_ENTRADA, y: c.y },
        p2: { x: c.esquerda ? a.x * CURVA_CHEGADA : w - (w - a.x) * CURVA_CHEGADA, y: a.y },
        p3: a,
      }
    }

    function desenhar() {
      ctx!.clearRect(0, 0, w, h)

      // Uma medição por quadro: alvo() lê geometria do DOM, e chamá-lo dentro
      // do laço custava uma leitura de layout por caminho a cada frame.
      const a = alvo()

      for (const c of caminhos) {
        const { p0, p1, p2, p3 } = pontos(c, a)

        // Trilho pontilhado, bem apagado: é o caminho, não o assunto.
        ctx!.beginPath()
        ctx!.moveTo(p0.x, p0.y)
        ctx!.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
        ctx!.strokeStyle = estreito() ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.11)'
        ctx!.lineWidth = 1
        ctx!.setLineDash([1, 4])
        ctx!.stroke()
        ctx!.setLineDash([])

        if (!reduzido) {
          c.t += c.velocidade
          if (c.t > 1) {
            c.t = 0
            c.y += (Math.random() - 0.5) * 12
          }
        }

        const pos = bezier(c.t, p0, p1, p2, p3)
        // Acende conforme se aproxima do alvo: quem chega perto de entrar
        // aparece mais. O ponto some ao encostar, em vez de empilhar no centro.
        const perto = Math.pow(c.t, 2.2)
        const some = 1 - Math.pow(c.t, 12)
        const alpha = (0.25 + perto * 0.75) * some * (estreito() ? 0.55 : 1)
        const azul = perto > 0.45

        ctx!.fillStyle = azul
          ? `rgba(${ACENTO}, ${alpha.toFixed(3)})`
          : `rgba(255, 255, 255, ${(alpha * 0.7).toFixed(3)})`
        const s = 2 + perto * 2
        ctx!.fillRect(pos.x - s / 2, pos.y - s / 2, s, s)
      }
    }

    function tick() {
      if (!visivel) {
        raf = requestAnimationFrame(tick)
        return
      }
      desenhar()
      raf = requestAnimationFrame(tick)
    }

    medir()
    desenhar()
    if (!reduzido) raf = requestAnimationFrame(tick)

    const ro = new ResizeObserver(() => {
      medir()
      desenhar()
    })
    ro.observe(host)

    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting
    })
    io.observe(host)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <div ref={hostRef} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}

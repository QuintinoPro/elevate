'use client'

import createGlobe from 'cobe'
import { useCallback, useEffect, useRef } from 'react'

/**
 * Globo com pontos pulsando, adaptado para a liga. Três desvios do original:
 *
 *  - **Marcadores no Brasil.** O original marca Londres, Nova York, Tóquio e
 *    Sydney. A liga é brasileira; o globo tem que mostrar o país de onde as
 *    pessoas vêm, senão a imagem conta uma história que não é a nossa.
 *  - **Paleta da marca** no lugar do ciano do original.
 *  - **`touch-action: pan-y`** em vez de `none`. Com `none` o canvas engole a
 *    rolagem no celular: a pessoa tenta descer a página com o dedo em cima do
 *    globo e fica presa girando. Assim o navegador fica com a rolagem vertical
 *    e só o arrasto horizontal gira.
 *
 * Os anéis pulsantes usam CSS Anchor Positioning, que hoje só existe no
 * Chromium. Onde não houver, a variável `--cobe-visible-*` não é definida e
 * eles ficam com opacidade 0 — some o pulso, o globo continua inteiro.
 */

type Marcador = { id: string; location: [number, number]; delay: number }

const ACENTO = '#1E90FF'

/**
 * O centro do globo acompanha a longitude de `phi` em graus. O Brasil está por
 * volta de -50°, então -0,87 rad o deixa de frente na abertura. (Medido: 1,78
 * rad ≈ +102° mostrava a Ásia.)
 */
const PHI_BRASIL = -0.87

const CIDADES: Marcador[] = [
  { id: 'sp', location: [-23.55, -46.63], delay: 0 },
  { id: 'rj', location: [-22.91, -43.17], delay: 0.4 },
  { id: 'bh', location: [-19.92, -43.94], delay: 0.8 },
  { id: 'rec', location: [-8.05, -34.88], delay: 1.2 },
  { id: 'poa', location: [-30.03, -51.23], delay: 1.6 },
  { id: 'bsb', location: [-15.79, -47.88], delay: 2 },
]

export default function GlobePulse({
  markers = CIDADES,
  className = '',
  speed = 0.0012,
  ativo = true,
}: {
  markers?: Marcador[]
  className?: string
  speed?: number
  ativo?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const arrastando = useRef<{ x: number; y: number } | null>(null)
  const delta = useRef({ phi: 0, theta: 0 })
  const phiAcc = useRef(0)
  const thetaAcc = useRef(0)
  const pausado = useRef(false)
  const naTela = useRef(true)

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    arrastando.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
    pausado.current = true
  }, [])

  const onPointerUp = useCallback(() => {
    if (arrastando.current !== null) {
      phiAcc.current += delta.current.phi
      thetaAcc.current += delta.current.theta
      delta.current = { phi: 0, theta: 0 }
    }
    arrastando.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
    pausado.current = false
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (arrastando.current !== null) {
        delta.current = {
          phi: (e.clientX - arrastando.current.x) / 300,
          theta: (e.clientY - arrastando.current.y) / 1000,
        }
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [onPointerUp])

  useEffect(() => {
    naTela.current = ativo
  }, [ativo])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let globe: ReturnType<typeof createGlobe> | null = null
    let raf = 0
    let phi = PHI_BRASIL

    // A regra de movimento reduzido do globals.css só alcança animação e
    // transição de CSS — um laço de requestAnimationFrame passa por baixo dela.
    // Quem pediu movimento reduzido recebe o globo parado com o Brasil de
    // frente: a imagem continua inteira, o que some é a rotação (e o gasto de
    // bateria de manter WebGL desenhando).
    const reduzido =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function init() {
      const width = canvas!.offsetWidth
      if (width === 0 || globe) return

      globe = createGlobe(canvas!, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        // Abre com o Brasil de frente. Todos os marcadores são daqui, então
        // começar em Greenwich mostraria oceano vazio no primeiro olhar.
        phi: PHI_BRASIL,
        theta: 0.35,
        dark: 1,
        diffuse: 1.4,
        mapSamples: 16000,
        mapBrightness: 7,
        baseColor: [0.28, 0.32, 0.38],
        markerColor: [0.118, 0.565, 1],
        glowColor: [0.05, 0.09, 0.16],
        markerElevation: 0,
        markers: markers.map((m) => ({ location: m.location, size: 0.03, id: m.id })),
        opacity: 0.9,
      })

      function animate() {
        // Fora da tela o laço continua vivo, mas não desenha: recriar o globo
        // a cada volta custaria mais que um requestAnimationFrame ocioso.
        if (!naTela.current) {
          raf = requestAnimationFrame(animate)
          return
        }
        if (!pausado.current && !reduzido) phi += speed
        globe!.update({
          phi: phi + phiAcc.current + delta.current.phi,
          theta: 0.35 + thetaAcc.current + delta.current.theta,
        })
        raf = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = '1'))
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((e) => {
        if (e[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (globe) globe.destroy()
    }
  }, [markers, speed])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <style>{`
        @keyframes pulso-liga {
          0%   { transform: scale(0.3); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          opacity: 0,
          transition: 'opacity 1.2s ease',
          borderRadius: '50%',
          touchAction: 'pan-y',
        }}
      />

      {markers.map((m) => (
        <div
          key={m.id}
          style={{
            position: 'absolute',
            positionAnchor: `--cobe-${m.id}`,
            bottom: 'anchor(center)',
            left: 'anchor(center)',
            translate: '-50% 50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
            transition: 'opacity 0.4s, filter 0.4s',
          }}
        >
          {[0, 0.5].map((atraso) => (
            <span
              key={atraso}
              style={{
                position: 'absolute',
                inset: 0,
                border: `2px solid ${ACENTO}`,
                borderRadius: '50%',
                opacity: 0,
                animation: `pulso-liga 2s ease-out infinite ${m.delay + atraso}s`,
              }}
            />
          ))}
          <span
            style={{
              width: 9,
              height: 9,
              background: ACENTO,
              borderRadius: '50%',
              boxShadow: `0 0 0 3px #000, 0 0 0 5px ${ACENTO}`,
            }}
          />
        </div>
      ))}
    </div>
  )
}

'use client'

import dynamic from 'next/dynamic'
import { useVisibility } from './useVisibility'

/** Mesmo padrão da lua: baixa perto, desenha só quando está na tela. */
const GlobePulse = dynamic(() => import('./GlobePulse'), { ssr: false })

export function GlobePulseLazy({ className = '' }: { className?: string }) {
  const { ref, montado, visivel } = useVisibility<HTMLDivElement>()

  return (
    <div ref={ref} className={className} aria-hidden>
      {montado && <GlobePulse ativo={visivel} />}
    </div>
  )
}

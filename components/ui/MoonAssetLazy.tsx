'use client'

import dynamic from 'next/dynamic'
import { useVisibility } from './useVisibility'

/**
 * Só baixa o Three.js quando a pessoa chega perto da seção — sem isso o peso
 * da biblioteca entraria no carregamento inicial e cobraria o LCP, que é a
 * métrica que o brief proíbe sacrificar por decisão visual.
 *
 * `touch-action: pan-y` devolve a rolagem vertical ao navegador: com os
 * controles de órbita ligados, o canvas engoliria o gesto de rolar no celular.
 */
const MoonAsset = dynamic(() => import('./MoonAsset'), { ssr: false })

export function MoonAssetLazy({ className = '' }: { className?: string }) {
  const { ref, montado, visivel } = useVisibility<HTMLDivElement>()

  return (
    <div ref={ref} className={className} style={{ touchAction: 'pan-y' }} aria-hidden>
      {montado && <MoonAsset ativo={visivel} />}
    </div>
  )
}

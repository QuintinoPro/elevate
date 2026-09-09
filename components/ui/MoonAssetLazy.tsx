'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

/**
 * Só baixa o Three.js quando a pessoa chega perto da seção. Sem isto, o peso
 * da biblioteca entraria no carregamento inicial e cobraria o LCP — que é a
 * métrica que o brief proíbe sacrificar por decisão visual.
 */
const MoonAsset = dynamic(() => import('./MoonAsset'), { ssr: false })

export function MoonAssetLazy({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [perto, setPerto] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPerto(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={className} aria-hidden>
      {perto && <MoonAsset />}
    </div>
  )
}

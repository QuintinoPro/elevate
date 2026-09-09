'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Dois estados para assets 3D pesados:
 *  - `montado`: já chegou perto uma vez, então vale baixar e criar a cena.
 *  - `visivel`: está na tela agora, então vale gastar quadro.
 *
 * Sem o segundo, uma cena WebGL continua desenhando a 60fps para sempre depois
 * de montada, mesmo com a pessoa dez seções abaixo — e o custo se acumula a
 * cada asset novo na página.
 */
export function useVisibility<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [montado, setMontado] = useState(false)
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const perto = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setMontado(true)
          perto.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    const naTela = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting))

    perto.observe(el)
    naTela.observe(el)
    return () => {
      perto.disconnect()
      naTela.disconnect()
    }
  }, [])

  return { ref, montado, visivel }
}

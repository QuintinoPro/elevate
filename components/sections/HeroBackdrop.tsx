'use client'

import { useEffect, useState } from 'react'
import { OrbitalHeroSection, type Planet } from '@/components/ui/orbital-hero-section'

/**
 * O sistema orbital recolorido para a paleta da Elevate: preto, branco e a
 * escala de azuis. Os elementos orbitais são os reais (J2000) — o que muda é
 * só a cor de cada corpo, porque planeta laranja e vermelho brigaria com a
 * identidade da marca.
 *
 * O acento #1E90FF fica no corpo mais brilhante, na posição da Terra: é o
 * único ponto onde a cor da marca aparece em força, e todo o resto orbita
 * em torno dele.
 */
const LIGA: Planet[] = [
  { name: 'a', a: 0.3871, e: 0.20563, i: 7.005, node: 48.331, peri: 29.125, M0: 174.796, color: '#FFFFFF', size: 2.2 },
  { name: 'b', a: 0.72333, e: 0.00677, i: 3.395, node: 76.68, peri: 54.853, M0: 50.115, color: '#BBDEFF', size: 3.2 },
  { name: 'c', a: 1.0, e: 0.01671, i: 0, node: 348.739, peri: 114.208, M0: 357.517, color: '#1E90FF', size: 4.0, glow: 1.25 },
  { name: 'd', a: 1.52371, e: 0.09339, i: 1.85, node: 49.558, peri: 286.483, M0: 19.373, color: '#7FC4FF', size: 2.9 },
  { name: 'e', a: 5.2029, e: 0.04839, i: 1.303, node: 100.464, peri: 273.867, M0: 20.02, color: '#5FB8FF', size: 5.0, glow: 0.85 },
  { name: 'f', a: 9.537, e: 0.05386, i: 2.485, node: 113.665, peri: 339.392, M0: 317.02, color: '#E6F3FF', size: 4.4, glow: 0.8 },
]

function useNarrow(query = '(max-width: 767px)') {
  const [narrow, setNarrow] = useState(false)
  useEffect(() => {
    const m = window.matchMedia(query)
    const sync = () => setNarrow(m.matches)
    sync()
    m.addEventListener('change', sync)
    return () => m.removeEventListener('change', sync)
  }, [query])
  return narrow
}

export function HeroBackdrop({ children }: { children: React.ReactNode }) {
  const narrow = useNarrow()

  return (
    <OrbitalHeroSection
      planets={LIGA}
      sunColor="#DCEEFF"
      // Calmo de propósito: o brief pede sóbrio, e uma órbita rápida vira
      // distração em cima da headline.
      yearSeconds={narrow ? 30 : 24}
      // No celular a arte fica embaixo e a copy em cima; no desktop, lado a lado.
      // No mobile o sol desce quase ao rodapé e o rastro é encurtado: as espirais
      // subiam até a linha de apoio e comiam a legibilidade dela.
      focus={narrow ? [0.5, 0.95] : [0.72, 0.44]}
      trailYears={narrow ? 1.7 : 2.6}
      scrim={narrow ? 'top' : 'left'}
      scrimStrength={narrow ? 0.96 : 0.92}
      viewRadius={narrow ? 1.9 : 3.1}
      lead={narrow ? 0.04 : 0.12}
      // No celular o texto ocupa quase a tela toda, então a arte recua para
      // textura. Menos estrelas também aliviam a CPU no WebView do Instagram.
      glow={narrow ? 0.55 : 1}
      starCount={narrow ? 550 : 1100}
      interactive={!narrow}
    >
      {children}
    </OrbitalHeroSection>
  )
}

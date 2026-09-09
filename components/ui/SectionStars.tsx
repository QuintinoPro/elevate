'use client'

import { useEffect, useState } from 'react'
import { OrbitalHeroSection } from '@/components/ui/orbital-hero-section'

/**
 * O mesmo céu do hero, sem o sistema orbital, como textura de fundo de uma
 * seção. Reaproveita o motor do hero de propósito: a deriva e o paralaxe por
 * profundidade ficam idênticos, e é isso que faz a página inteira parecer um
 * lugar só em vez de duas artes diferentes.
 *
 * Aqui as estrelas são fundo atrás de texto, não protagonista — daí a
 * densidade e o brilho bem menores que no hero. Se elas competirem com a
 * leitura, o número a mexer é o `glow`.
 *
 * Cada instância pausa sozinha quando sai da tela (IntersectionObserver dentro
 * do componente), então só a seção visível gasta quadro.
 */
export function SectionStars({ className = '' }: { className?: string }) {
  const [narrow, setNarrow] = useState(false)

  useEffect(() => {
    const m = window.matchMedia('(max-width: 767px)')
    const sync = () => setNarrow(m.matches)
    sync()
    m.addEventListener('change', sync)
    return () => m.removeEventListener('change', sync)
  }, [])

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <OrbitalHeroSection
        starsOnly
        // Sem sol na cena, o "foco" é só o ponto que a câmera acompanha; no
        // centro as estrelas se espalham parelho pela seção inteira.
        focus={[0.5, 0.5]}
        lead={0}
        scrim="none"
        // O que importa é a razão driftSpeed/yearSeconds: ela dá a velocidade
        // da câmera pelo campo. Aqui ~1,5 unidade/s, contra ~0,06 do hero.
        //
        // Sem os planetas, o hero-padrão fica parado demais: as estrelas dele
        // andam ~2px/s, e quem dá vida à cena são os rastros. Mas acelerar sem
        // limite piora: acima de ~4 unidades/s as estrelas trocam de
        // profundidade rápido demais, acendem e apagam em vez de viajar, e o
        // resultado lê como cintilação — mais parado, não menos.
        driftSpeed={6}
        yearSeconds={narrow ? 6 : 4}
        // Campo mais fechado que o do hero: pxPerAU dobra, então a mesma
        // deriva percorre o dobro de pixels por segundo. Acelera o que se vê
        // sem tocar na razão de profundidade, que é o que causa cintilação.
        viewRadius={narrow ? 1.2 : 1.6}
        starCount={narrow ? 260 : 520}
        glow={0.8}
        interactive={false}
      />
    </div>
  )
}

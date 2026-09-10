/**
 * Os quatro ícones da seção "o que você recebe". Escritos à mão em vez de vir
 * de uma biblioteca: são quatro desenhos num lugar só da página, e o
 * PRODUCT.md fecha a regra de não empilhar dependência no funil.
 *
 * Todos no mesmo contrato — 24×24, sem preenchimento, traço em currentColor
 * com 1.5 de espessura e pontas arredondadas — para não parecer que vieram de
 * quatro pacotes diferentes. Quem define a cor é o card, via text-*.
 */

type Props = { className?: string }

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

/** Duas pessoas de frente uma pra outra: a call individual, não a aula em grupo. */
export function IconeMentoria({ className = '' }: Props) {
  return (
    <svg {...base} className={className}>
      <circle cx="7" cy="7.5" r="2.75" />
      <path d="M2.5 18.5a4.5 4.5 0 0 1 9 0" />
      <circle cx="17" cy="7.5" r="2.75" />
      <path d="M12.5 18.5a4.5 4.5 0 0 1 9 0" />
    </svg>
  )
}

/** Camadas empilhadas: os módulos da plataforma, um sobre o outro. */
export function IconeModulos({ className = '' }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" />
      <path d="M3 12.25 12 16.75l9-4.5" />
      <path d="M3 16.75 12 21.25l9-4.5" />
    </svg>
  )
}

/** Play com ondas saindo: transmissão acontecendo agora. */
export function IconeAoVivo({ className = '' }: Props) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="3.25" />
      <path d="m11.25 10.9 2 1.1-2 1.1v-2.2Z" fill="currentColor" stroke="none" />
      <path d="M6.7 6.7a7.5 7.5 0 0 0 0 10.6" />
      <path d="M17.3 17.3a7.5 7.5 0 0 0 0-10.6" />
      <path d="M3.9 3.9a11.5 11.5 0 0 0 0 16.2" opacity="0.45" />
      <path d="M20.1 20.1a11.5 11.5 0 0 0 0-16.2" opacity="0.45" />
    </svg>
  )
}

/** Documento com um "+": o acervo que continua crescendo. */
export function IconeConteudos({ className = '' }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M14 2.75H6.75A1.75 1.75 0 0 0 5 4.5v15a1.75 1.75 0 0 0 1.75 1.75h10.5A1.75 1.75 0 0 0 19 19.5V7.75L14 2.75Z" />
      <path d="M13.75 3v4.5h4.75" />
      <path d="M12 11.75v5.5M9.25 14.5h5.5" />
    </svg>
  )
}

export const ICONES = {
  mentoria: IconeMentoria,
  modulos: IconeModulos,
  aovivo: IconeAoVivo,
  conteudos: IconeConteudos,
} as const

export type IconeNome = keyof typeof ICONES

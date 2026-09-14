import Link from 'next/link'

type Variant = 'primary' | 'ghost'

// Sem px e sem tamanho de fonte aqui: os dois variam com `compacto`, e passar
// px-4 por className junto de um px-7 da base deixaria o resultado na mão da
// ordem das regras no CSS. text-balance é a rede de segurança: se um rótulo
// ainda quebrar numa tela muito estreita, quebra em duas metades, não com uma
// palavra sozinha embaixo.
const base =
  'inline-flex items-center justify-center rounded-full py-4 text-center font-bold text-balance transition-[filter,background-color,border-color] duration-200'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-ink hover:brightness-110',
  ghost: 'border border-line text-paper hover:border-accent hover:text-accent',
}

export function Button({
  href,
  children,
  variant = 'primary',
  compacto = false,
  className = '',
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
  /** Menos respiro lateral e 15px no celular, pra rótulo longo caber numa linha dentro de card. */
  compacto?: boolean
  className?: string
}) {
  const isExternal = href.startsWith('http')
  const tamanho = compacto ? 'px-4 text-[15px] sm:px-7 sm:text-base' : 'px-7 text-base'
  const classes = `${base} ${tamanho} ${variants[variant]} ${className}`

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}

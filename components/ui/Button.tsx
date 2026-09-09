import Link from 'next/link'

type Variant = 'primary' | 'ghost'

const base =
  'inline-flex items-center justify-center rounded-full px-7 py-4 text-base font-bold transition-[filter,background-color,border-color] duration-200'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-ink hover:brightness-110',
  ghost: 'border border-line text-paper hover:border-accent hover:text-accent',
}

export function Button({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
  className?: string
}) {
  const isExternal = href.startsWith('http')
  const classes = `${base} ${variants[variant]} ${className}`

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

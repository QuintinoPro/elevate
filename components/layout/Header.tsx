import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { BRAND, CTA_LABEL_SHORT, QUIZ_PATH } from '@/lib/constants'

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <Container className="flex items-center justify-between py-6">
        {/* O lockup da marca, não o ícone com o nome em Sora ao lado: o
            "ELEVATE" tem letreiro próprio (Tanjiro contornado) e escrever o
            nome com a fonte de texto era logo errada na porta de entrada.
            O aria-label fica no link — é ele que o leitor de tela anuncia. */}
        <Link href="/" className="flex items-center" aria-label={BRAND.name}>
          <Logo height={30} />
        </Link>

        <Link
          href={QUIZ_PATH}
          className="hidden rounded-full border border-line px-5 py-2.5 text-sm font-bold transition-colors hover:border-accent hover:text-accent sm:inline-flex"
        >
          {CTA_LABEL_SHORT}
        </Link>
      </Container>
    </header>
  )
}

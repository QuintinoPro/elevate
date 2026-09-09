import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { BRAND, CTA_LABEL, QUIZ_PATH, asset } from '@/lib/constants'

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <Container className="flex items-center justify-between py-6">
        <Link href="/" className="flex items-center gap-3" aria-label={BRAND.name}>
          {/* Ícone é vetor outline de verdade. O wordmark horizontal da marca ainda
              não existe vetorizado (fonte Tanjiro ausente), então o nome vai em Sora. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/brand/icon.svg")} alt="" width={28} height={28} className="h-7 w-7" />
          <span className="text-sm font-bold uppercase tracking-[0.28em]">Elevate</span>
        </Link>

        <Link
          href={QUIZ_PATH}
          className="hidden rounded-full border border-line px-5 py-2.5 text-sm font-bold transition-colors hover:border-accent hover:text-accent sm:inline-flex"
        >
          {CTA_LABEL}
        </Link>
      </Container>
    </header>
  )
}

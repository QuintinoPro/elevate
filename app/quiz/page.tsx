import type { Metadata } from 'next'
import Link from 'next/link'
import { Peneira } from '@/components/quiz/Peneira'
import { Container } from '@/components/ui/Container'
import { SectionStars } from '@/components/ui/SectionStars'
import { BRAND, asset } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'A peneira',
  description: 'Onze perguntas. No fim você descobre em qual trilha entra — ou que ainda não é a sua hora.',
  robots: { index: false },
}

/**
 * A peneira tem página própria e chrome mínimo: só a marca, sem CTA no topo e
 * sem barra fixa. Aqui já existe uma ação em andamento, e a regra do CTA único
 * vale mais nesta tela do que em qualquer outra da landing.
 *
 * O céu é o mesmo motor do hero, via SectionStars — é o que faz a peneira
 * parecer o mesmo lugar que a página, e não um formulário de terceiro.
 */
export default function QuizPage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <SectionStars />

      <header className="relative z-10">
        <Container className="py-6">
          <Link href="/" className="inline-flex items-center gap-3" aria-label={BRAND.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/brand/icon.svg')} alt="" width={28} height={28} className="h-7 w-7" />
            <span className="text-sm font-bold uppercase tracking-[0.28em]">Elevate</span>
          </Link>
        </Container>
      </header>

      <main className="relative z-10 flex flex-1 items-center py-12 sm:py-16">
        <Container>
          <Peneira />
        </Container>
      </main>
    </div>
  )
}

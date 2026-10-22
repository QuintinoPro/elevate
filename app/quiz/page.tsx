import type { Metadata } from 'next'
import Link from 'next/link'
import { Peneira } from '@/components/quiz/Peneira'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { SectionStars } from '@/components/ui/SectionStars'
import { BRAND } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'A peneira',
  description: 'Sete perguntas, um minuto. No fim você descobre sua trilha e faz seu cadastro na primeira turma da Elevate League.',
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
        <Container className="py-4 sm:py-6">
          {/* Mesmo lockup e mesma altura do header da landing: quem clica no CTA
              e cai aqui tem que reconhecer o lugar na hora. */}
          <Link href="/" className="-my-2 inline-flex items-center py-2" aria-label={BRAND.name}>
            <Logo height={30} />
          </Link>
        </Container>
      </header>

      {/* pt-4 no celular: com py-12, pergunta de 6 opções deixava o botão
          abaixo da dobra num Android de 360×740. */}
      <main className="relative z-10 flex flex-1 items-center pb-12 pt-4 sm:py-16">
        <Container>
          <Peneira />
        </Container>
      </main>
    </div>
  )
}

import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'A peneira',
  description: 'Responda algumas perguntas e descubra se você tem perfil pra Liga.',
  robots: { index: false },
}

export default function QuizPage() {
  return (
    <main className="flex min-h-dvh flex-col justify-center">
      <Container className="py-24">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">A peneira</p>
        <h1 className="mt-4 max-w-prose text-display-md font-bold">Em construção.</h1>
        <p className="mt-6 max-w-prose text-lg text-paper/60">
          As perguntas da peneira entram aqui.
        </p>
        <div className="mt-10">
          <Button href="/" variant="ghost">
            Voltar
          </Button>
        </div>
      </Container>
    </main>
  )
}

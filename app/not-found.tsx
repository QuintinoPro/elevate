import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col justify-center">
      <Container className="py-24">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Erro 404</p>
        <h1 className="mt-4 max-w-prose text-display-md font-bold">Essa página não existe.</h1>
        <p className="mt-6 max-w-prose text-lg text-paper/60">
          O link pode estar quebrado ou a página pode ter saído do ar.
        </p>
        <div className="mt-10">
          <Button href="/">Voltar pro início</Button>
        </div>
      </Container>
    </main>
  )
}

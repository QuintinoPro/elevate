import { Container } from './Container'

export function Section({
  children,
  id,
  className = '',
}: {
  children: React.ReactNode
  id?: string
  className?: string
}) {
  return (
    <section id={id} className={`py-20 lg:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

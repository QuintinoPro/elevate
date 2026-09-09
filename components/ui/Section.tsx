import { Container } from './Container'
import { SectionStars } from './SectionStars'

export function Section({
  children,
  id,
  className = '',
  stars = false,
}: {
  children: React.ReactNode
  id?: string
  className?: string
  /**
   * Liga o campo de estrelas atrás da seção. Deliberadamente não é o padrão:
   * se toda seção tiver, o efeito deixa de marcar qualquer uma e o hero perde
   * o impacto. Usar em algumas, alternando com seções limpas.
   */
  stars?: boolean
}) {
  return (
    <section
      id={id}
      className={`relative py-20 lg:py-28 ${stars ? 'overflow-hidden' : ''} ${className}`}
    >
      {stars && <SectionStars />}
      <Container className="relative">{children}</Container>
    </section>
  )
}

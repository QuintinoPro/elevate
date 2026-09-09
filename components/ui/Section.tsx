import { Container } from './Container'
import { SectionStars } from './SectionStars'

export function Section({
  children,
  id,
  className = '',
  stars = false,
  backdrop,
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
  /**
   * Fundo que ocupa a seção inteira. Precisa vir por aqui, e não como filho:
   * os filhos são embrulhados no Container, que é `relative` e limitado a
   * max-w-6xl — um `absolute inset-0` lá dentro ancora no container do texto
   * e o fundo aparece como um retângulo no meio da seção.
   */
  backdrop?: React.ReactNode
}) {
  return (
    <section
      id={id}
      className={`relative py-20 lg:py-28 ${stars || backdrop ? 'overflow-hidden' : ''} ${className}`}
    >
      {stars && <SectionStars />}
      {backdrop}
      <Container className="relative">{children}</Container>
    </section>
  )
}

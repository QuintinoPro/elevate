import { HeroBackdrop } from '@/components/sections/HeroBackdrop'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { CTA_LABEL, QUIZ_PATH } from '@/lib/constants'
import { hero } from '@/lib/content'

/**
 * A seção continua sendo server component: o texto vai como children para o
 * fundo animado, então ele é renderizado no build e está no HTML estático.
 * O LCP continua sendo o <h1>, e o canvas é decoração que entra depois.
 */
export function Hero() {
  return (
    <section className="relative min-h-[92svh] w-full md:min-h-dvh">
      <HeroBackdrop>
        {/* pt-28 no mobile e py-32 no desktop mantêm a copy longe do header fixo. */}
        <div className="flex min-h-[92svh] items-start pt-28 pb-10 md:min-h-dvh md:items-center md:py-32">
          <Container>
            {/* Um pouco mais largo e um degrau menor de tipo que antes: a
                headline fecha em menos linhas e o bloco não empurra o CTA. */}
            <div className="max-w-[36rem]">
              <h1 className="text-display-md font-bold lg:text-display-lg">
                {hero.headline.before}
                <span className="text-accent">{hero.headline.accent}</span>
                {hero.headline.after}
              </h1>

              <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-paper/70">{hero.sub}</p>

              <div className="mt-9">
                <Button href={QUIZ_PATH}>{CTA_LABEL}</Button>
              </div>
            </div>
          </Container>
        </div>
      </HeroBackdrop>
    </section>
  )
}

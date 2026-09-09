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
            <div className="max-w-[34rem]">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-sm">
                {hero.eyebrow}
              </p>

              <h1 className="mt-6 text-display-md font-bold sm:text-display-lg lg:text-display-xl">
                {hero.headline}
              </h1>

              <p className="mt-7 max-w-prose text-lg leading-relaxed text-paper/70">{hero.sub}</p>

              <div className="mt-10">
                <Button href={QUIZ_PATH}>{CTA_LABEL}</Button>
                <p className="mt-5 max-w-prose text-sm text-paper/45">{hero.support}</p>
              </div>
            </div>
          </Container>
        </div>
      </HeroBackdrop>
    </section>
  )
}

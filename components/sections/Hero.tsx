import { HeroBackdrop } from '@/components/sections/HeroBackdrop'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { CTA_LABEL, PRICE, QUIZ_PATH } from '@/lib/constants'
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
        {/* pt-28 no mobile mantém a copy longe do header fixo; pb-32 mantém o
            preço longe da barra de CTA fixa, que come ~5rem do rodapé.
            min-h em svh e não vh: no Safari a barra de endereço já está
            descontada, então nada é cortado quando ela recolhe. */}
        <div className="flex min-h-[92svh] items-start pt-28 pb-32 md:min-h-dvh md:items-center md:py-32">
          <Container>
            <div className="max-w-[36rem]">
              {/* Três degraus de tipo: no celular a headline tem 62 caracteres
                  e a display-md quebraria em seis linhas, empurrando o CTA
                  para fora da primeira tela. */}
              <h1 className="text-[1.875rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-display-md lg:text-display-lg">
                {hero.headline.before}
                <span className="text-accent">{hero.headline.accent}</span>
                {hero.headline.after}
              </h1>

              <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-paper/70 sm:mt-6 sm:text-lg">
                {hero.sub}
              </p>

              {/* Os quatro pilares como assinatura, não como lista. No celular as
                  quatro palavras quebram em duas linhas, e aí o separador some:
                  senão a segunda linha começa com um "•" órfão. Do sm para cima
                  tudo cabe numa linha só e o bullet volta. */}
              <ul className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-[0.16em] text-paper/60 sm:gap-x-3 sm:text-sm">
                {hero.kicker.map((palavra, i) => (
                  <li key={palavra} className="flex items-center gap-x-3">
                    {i > 0 && (
                      <span aria-hidden className="hidden text-accent/70 sm:inline">
                        •
                      </span>
                    )}
                    {palavra}
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                <Button href={QUIZ_PATH} className="w-full sm:w-auto">
                  {CTA_LABEL}
                </Button>
                {/* O preço é âncora, não rodapé do botão: entra grande o
                    bastante para ser lido antes do scroll. */}
                <p className="mt-4 text-sm text-paper/60 sm:text-base">
                  Primeiras vagas por{' '}
                  <strong className="font-bold text-paper">{PRICE}</strong>
                </p>
              </div>
            </div>
          </Container>
        </div>
      </HeroBackdrop>
    </section>
  )
}

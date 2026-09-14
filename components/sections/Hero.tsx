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
      {/* Esmaece o pé do hero. Sem isso, os rastros das órbitas terminavam num
          corte reto onde a seção acaba — no celular, onde o sol fica embaixo, a
          linha aparecia inteira. A altura é a mesma do pb-20 do conteúdo: o
          degradê nunca chega no botão, nem na tela curta do Instagram. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-b from-transparent to-ink md:h-32"
      />
      <HeroBackdrop>
        {/* pt-28 no mobile mantém a copy longe do header fixo; o pb menor
            entrou quando o preço saiu do hero (11/09) — não há mais nada
            embaixo do botão para proteger.
            min-h em svh e não vh: no Safari a barra de endereço já está
            descontada, então nada é cortado quando ela recolhe. */}
        <div className="flex min-h-[92svh] items-start pt-28 pb-20 md:min-h-dvh md:items-center md:py-32">
          <Container>
            <div className="max-w-[36rem]">
              {/* Três degraus de tipo: no celular a headline tem 62 caracteres
                  e a display-md quebraria em seis linhas, empurrando o CTA
                  para fora da primeira tela. */}
              {/* text-balance + grifo sem quebra: no celular de 390px a quebra
                  gulosa partia "ambiente / certo" e deixava a última linha com
                  uma palavra só. Balanceado, cada linha fica com ~17 caracteres
                  e o trecho azul chega inteiro. */}
              <h1 className="text-balance text-[1.875rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-display-md lg:text-display-lg">
                {hero.headline.before}
                <span className="whitespace-nowrap text-accent">{hero.headline.accent}</span>
                {hero.headline.after}
              </h1>

              <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-paper/70 sm:mt-6 sm:text-lg">
                {hero.sub}
              </p>

              {/* Os quatro pilares como assinatura, não como lista. No celular
                  viram grade 2×2 e o separador some: soltas no flex-wrap, em 390px
                  caíam três numa linha e "EXECUÇÃO" sozinha na outra. Do sm para
                  cima tudo cabe numa linha só e o bullet volta. */}
              <ul className="mt-7 grid w-fit grid-cols-2 gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-[0.16em] text-paper/60 sm:flex sm:flex-wrap sm:items-center sm:gap-x-3 sm:text-sm">
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
              </div>
            </div>
          </Container>
        </div>
      </HeroBackdrop>
    </section>
  )
}

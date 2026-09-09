import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { CTA_LABEL, QUIZ_PATH } from '@/lib/constants'
import { ctaFinal } from '@/lib/content'

export function CtaFinal() {
  return (
    <Section id="cta-final" stars>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,144,255,0.14),transparent_65%)]"
      />
      <div className="relative">
        <h2 className="max-w-[18ch] text-display-md font-bold sm:text-display-lg">
          {ctaFinal.headline}
        </h2>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-paper/60">{ctaFinal.sub}</p>
        <div className="mt-10">
          <Button href={QUIZ_PATH}>{CTA_LABEL}</Button>
        </div>
      </div>
    </Section>
  )
}

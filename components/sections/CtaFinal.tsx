import { Button } from '@/components/ui/Button'
import { FlowConverge } from '@/components/ui/FlowConverge'
import { Section } from '@/components/ui/Section'
import { CTA_LABEL, QUIZ_PATH } from '@/lib/constants'
import { ctaFinal } from '@/lib/content'

export function CtaFinal() {
  return (
    <Section id="cta-final" className="overflow-hidden lg:min-h-[34rem] lg:flex lg:items-center">
      <FlowConverge />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(30,144,255,0.16),transparent_60%)]"
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

import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CTA_LABEL, QUIZ_PATH } from '@/lib/constants'
import { faq } from '@/lib/content'

export function Faq() {
  return (
    <Section id="faq" className="border-t border-line/25">
      <SectionHeader eyebrow={faq.eyebrow} headline={faq.headline} />

      {/* <details> nativo: acessível, funciona sem JS e não custa bundle. */}
      <div className="mt-12 divide-y divide-line/25 border-y border-line/25">
        {faq.items.map((item) => (
          <details key={item.q} className="group py-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-bold [&::-webkit-details-marker]:hidden">
              {item.q}
              <span
                aria-hidden
                className="mt-1 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-4 max-w-prose leading-relaxed text-paper/55">{item.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-6">
        <Button href={QUIZ_PATH}>{CTA_LABEL}</Button>
        <p className="text-sm text-paper/45">Leva menos de dois minutos.</p>
      </div>
    </Section>
  )
}

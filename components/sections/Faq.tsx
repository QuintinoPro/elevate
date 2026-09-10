import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { faq } from '@/lib/content'

/**
 * Última seção da página, e de propósito sem CTA no fim (decisão do Lucas em
 * 10/09/2026). No mobile a barra fixa cobre a saída; no desktop o último botão
 * passa a ser o da oferta, logo acima. Se a conversão do desktop cair, este é
 * o primeiro lugar a olhar.
 */
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
    </Section>
  )
}

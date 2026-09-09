import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { comoFunciona } from '@/lib/content'

export function ComoFunciona() {
  return (
    <Section id="como-funciona" className="border-y border-line/25 bg-surface/20">
      <SectionHeader eyebrow={comoFunciona.eyebrow} headline={comoFunciona.headline} />

      <ol className="mt-14 space-y-px overflow-hidden rounded-2xl border border-line/30 bg-line/30">
        {comoFunciona.passos.map((passo, i) => (
          <li key={passo.title} className="flex gap-6 bg-ink p-7 sm:gap-8 sm:p-9">
            <span
              aria-hidden
              className="shrink-0 text-2xl font-bold tabular-nums text-accent sm:text-3xl"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="text-xl font-bold">{passo.title}</h3>
              <p className="mt-2 max-w-prose leading-relaxed text-paper/55">{passo.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

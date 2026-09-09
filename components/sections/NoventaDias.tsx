import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { noventaDias } from '@/lib/content'

export function NoventaDias() {
  return (
    <Section id="noventa-dias" className="border-y border-line/25 bg-surface/20">
      <SectionHeader eyebrow={noventaDias.eyebrow} headline={noventaDias.headline} />

      <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line/30 bg-line/30 sm:grid-cols-2">
        {noventaDias.items.map((item) => (
          <li key={item.title} className="bg-ink p-7 sm:p-9">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-paper/55">{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

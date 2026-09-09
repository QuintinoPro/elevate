import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { problema } from '@/lib/content'

export function Problema() {
  return (
    <Section id="problema">
      <SectionHeader eyebrow={problema.eyebrow} headline={problema.headline} />

      <div className="mt-10 max-w-prose space-y-6 text-lg leading-relaxed text-paper/60">
        {problema.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <p className="mt-12 max-w-[24ch] border-l-2 border-accent pl-6 text-2xl font-bold leading-snug sm:text-3xl">
        {problema.punchline}
      </p>
    </Section>
  )
}

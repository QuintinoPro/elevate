import { NetworkGraphic } from '@/components/ui/NetworkGraphic'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { problema } from '@/lib/content'

export function Problema() {
  return (
    <Section id="problema">
      <SectionHeader eyebrow={problema.eyebrow} headline={problema.headline} />

      <div className="mt-10 grid items-center gap-12 lg:mt-14 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div className="space-y-5 text-lg leading-relaxed text-paper/60">
          {problema.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <NetworkGraphic className="w-full max-w-md lg:w-[26rem]" />
      </div>

      <p className="mt-12 max-w-[24ch] border-l-2 border-accent pl-6 text-2xl font-bold leading-snug sm:text-3xl">
        {problema.punchline}
      </p>
    </Section>
  )
}

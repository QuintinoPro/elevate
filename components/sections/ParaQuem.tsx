import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { paraQuem } from '@/lib/content'

export function ParaQuem() {
  return (
    <Section id="para-quem">
      <SectionHeader eyebrow={paraQuem.eyebrow} headline={paraQuem.headline} />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-accent/40 bg-accent/[0.06] p-7 sm:p-9">
          <h3 className="text-xl font-bold text-accent">{paraQuem.sim.title}</h3>
          <ul className="mt-6 space-y-4">
            {paraQuem.sim.items.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-paper/75">
                <span aria-hidden className="mt-0.5 font-bold text-accent">
                  +
                </span>
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-line/30 p-7 sm:p-9">
          <h3 className="text-xl font-bold text-paper/70">{paraQuem.nao.title}</h3>
          <ul className="mt-6 space-y-4">
            {paraQuem.nao.items.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-paper/55">
                <span aria-hidden className="mt-0.5 font-bold text-paper/30">
                  −
                </span>
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  )
}

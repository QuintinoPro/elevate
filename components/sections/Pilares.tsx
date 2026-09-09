import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { pilares } from '@/lib/content'

export function Pilares() {
  return (
    <Section id="pilares">
      <SectionHeader eyebrow={pilares.eyebrow} headline={pilares.headline} />

      {/* A mentoria carrega a oferta — por isso ocupa mais espaço que os outros três. */}
      <article className="relative mt-14 overflow-hidden rounded-2xl border border-accent/40 bg-surface/40 p-8 sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(30,144,255,0.14),transparent_60%)]"
        />
        <div className="relative">
          <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
            {pilares.destaque.badge}
          </span>
          <h3 className="mt-6 max-w-[16ch] text-3xl font-bold sm:text-4xl">
            {pilares.destaque.title}
          </h3>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-paper/70">
            {pilares.destaque.body}
          </p>
        </div>
      </article>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {pilares.outros.map((p) => (
          <article
            key={p.title}
            className="rounded-2xl border border-line/30 p-7 transition-colors hover:border-line/60"
          >
            <h3 className="text-lg font-bold">{p.title}</h3>
            <p className="mt-3 leading-relaxed text-paper/55">{p.body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CTA_LABEL, QUIZ_PATH } from '@/lib/constants'
import { vagas } from '@/lib/content'

export function Vagas() {
  return (
    <Section id="vagas">
      <SectionHeader eyebrow={vagas.eyebrow} headline={vagas.headline} />

      <p className="mt-8 max-w-prose text-lg leading-relaxed text-paper/60">{vagas.motivo}</p>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <article className="relative overflow-hidden rounded-2xl border border-accent/40 bg-surface/40 p-8 sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(30,144,255,0.16),transparent_60%)]"
          />
          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-wider text-accent">
              Acesso à liga · primeira turma
            </p>

            <p className="mt-6 flex items-baseline gap-3">
              <span className="text-5xl font-bold sm:text-6xl">{vagas.precoAtual}</span>
              <span className="text-lg text-paper/40">à vista</span>
            </p>

            <p className="mt-3 text-sm text-paper/50">
              {vagas.nota} Depois da primeira turma, {vagas.precoDepois}.
            </p>

            <div className="mt-8">
              <Button href={QUIZ_PATH} className="w-full sm:w-auto">
                {CTA_LABEL}
              </Button>
            </div>

            <p className="mt-6 border-t border-line/30 pt-6 text-sm leading-relaxed text-paper/50">
              {vagas.garantia}
            </p>
          </div>
        </article>

        <article className="rounded-2xl border border-line/30 p-8 sm:p-10">
          <h3 className="text-lg font-bold">O que está incluído</h3>
          <ul className="mt-6 space-y-4">
            {vagas.inclui.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-paper/70">
                <span aria-hidden className="mt-0.5 font-bold text-accent">
                  +
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

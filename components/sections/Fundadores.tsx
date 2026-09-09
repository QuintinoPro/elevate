import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { fundadores } from '@/lib/content'

export function Fundadores() {
  return (
    <Section id="fundadores" className="border-y border-line/25 bg-surface/20">
      <SectionHeader eyebrow={fundadores.eyebrow} headline={fundadores.headline} />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {fundadores.pessoas.map((p) => (
          <article key={p.nome} className="rounded-2xl border border-line/30 bg-ink p-7 sm:p-9">
            {/* TODO: trocar pelo retrato real. Foto de banco de imagem derruba conversão —
                enquanto não temos a foto dos dois, fica o monograma. */}
            <div
              aria-hidden
              className="flex h-16 w-16 items-center justify-center rounded-full border border-line/50 bg-surface/60 text-xl font-bold text-accent"
            >
              {p.nome.charAt(0)}
            </div>

            <h3 className="mt-6 text-2xl font-bold">{p.nome}</h3>
            <p className="mt-1 text-sm font-bold uppercase tracking-wider text-accent">{p.papel}</p>
            <p className="mt-4 leading-relaxed text-paper/55">{p.bio}</p>

            <a
              href={p.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm text-paper/40 transition-colors hover:text-accent"
            >
              {p.handle}
            </a>
          </article>
        ))}
      </div>

      <p className="mt-10 max-w-prose text-lg leading-relaxed text-paper/70">{fundadores.fecho}</p>
    </Section>
  )
}

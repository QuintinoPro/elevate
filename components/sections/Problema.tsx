import { MoonAssetLazy } from '@/components/ui/MoonAssetLazy'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { problema } from '@/lib/content'

export function Problema() {
  return (
    <Section id="problema">
      <SectionHeader eyebrow={problema.eyebrow} headline={problema.headline} />

      {/* Asset à esquerda, copy à direita. A ordem do DOM mantém o texto
          primeiro — quem usa leitor de tela ouve o argumento antes da
          ilustração; a troca é só visual, via order. */}
      <div className="mt-10 grid items-center gap-12 lg:mt-14 lg:grid-cols-[auto_1fr] lg:gap-16">
        <div className="space-y-5 text-lg leading-relaxed text-paper/60 lg:order-2">
          {problema.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <MoonAssetLazy className="aspect-square w-full max-w-md lg:order-1 lg:w-[26rem]" />
      </div>

      <p className="mt-12 max-w-[24ch] border-l-2 border-accent pl-6 text-2xl font-bold leading-snug sm:text-3xl">
        {problema.punchline}
      </p>
    </Section>
  )
}

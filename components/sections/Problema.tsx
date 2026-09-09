import { MoonAssetLazy } from '@/components/ui/MoonAssetLazy'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { problema } from '@/lib/content'

export function Problema() {
  return (
    <Section id="problema">
      {/* Lua sozinha na coluna da esquerda; todo o texto corrido na direita.
          A ordem do DOM mantém o texto primeiro — quem usa leitor de tela
          ouve o argumento antes de chegar na ilustração. */}
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="lg:order-2">
          <SectionHeader eyebrow={problema.eyebrow} headline={problema.headline} />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-paper/60">
            {problema.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <MoonAssetLazy className="aspect-square w-full max-w-lg lg:order-1" />
      </div>

      {/* Fecho da seção, alinhado à esquerda e fora da grade: é a frase que
          precisa respirar sozinha depois do argumento. */}
      <p className="mt-16 max-w-[24ch] border-l-2 border-accent pl-6 text-2xl font-bold leading-snug sm:text-3xl">
        {problema.punchline}
      </p>
    </Section>
  )
}

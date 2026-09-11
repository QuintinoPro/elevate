import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { BRAND } from '@/lib/constants'

/**
 * Assinatura, não menu. A página tem um CTA só e nenhum destino secundário —
 * um rodapé com colunas de links inventaria navegação que não existe. Então
 * fica no mínimo honesto: marca, slogan, o Instagram da liga e o ano.
 *
 * Uma fileira só: no desktop os quatro itens correm na horizontal, no mobile a
 * mesma ordem empilha. Nada é duplicado pra trocar de layout.
 *
 * A virada é no lg, não no sm: entre 640 e 1024 os quatro itens até cabem numa
 * linha, mas encostam uns nos outros — o slogan quebra em duas linhas e cola no
 * @. Empilhado ali fica melhor, e continua menor que o rodapé antigo.
 *
 * Não tem mais folga extra embaixo: ela existia só para a barra fixa do CTA no
 * mobile, que o Lucas tirou em 11/09/2026. Se a barra voltar, a folga volta
 * junto — e no rodapé, não no `<main>`, senão a barra cobre o rodapé inteiro.
 */

// Texto secundário em /55, não menos: /45 dá 4,43:1 sobre o preto e o mínimo
// AA para 12px é 4,5:1. /55 dá 6,25:1 e continua lendo como secundário.
// Carimbado no build. O site é export estático com deploy a cada push, então
// não existe página parada tempo suficiente pra mostrar ano errado.
const ANO = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line/30">
      <Container className="flex flex-col gap-5 py-8 lg:flex-row lg:items-center lg:gap-6">
        <Logo height={36} className="shrink-0 text-paper" />

        <span aria-hidden="true" className="hidden h-9 w-px shrink-0 bg-line/40 lg:block" />

        <p className="text-xs leading-relaxed text-paper/55">
          {BRAND.slogan}
        </p>

        <div className="flex items-center gap-5 text-xs text-paper/55 lg:ml-auto">
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-accent"
          >
            <IconeInstagram className="h-4 w-4" />
            @elevate.league
          </a>
          <span aria-hidden="true" className="h-3.5 w-px bg-line/40" />
          <p className="whitespace-nowrap">
            © {ANO} {BRAND.name}
          </p>
        </div>
      </Container>
    </footer>
  )
}

/** Mesmo contrato dos ícones da página: 24×24, traço 1.5 em currentColor. */
function IconeInstagram({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

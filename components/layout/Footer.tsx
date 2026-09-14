import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { BRAND, CONTATO_EMAIL, EMPRESA, PRIVACIDADE_PATH } from '@/lib/constants'

/**
 * Assinatura, não menu. A página tem um CTA só e nenhum destino secundário —
 * um rodapé com colunas de links inventaria navegação que não existe. Então
 * fica no mínimo honesto: marca, slogan, os dois canais de contato e, embaixo,
 * a linha legal.
 *
 * Duas fileiras desde 13/09/2026. A de cima é a assinatura (marca, slogan,
 * Instagram, e-mail). A de baixo é a obrigação: ano, identificação da empresa e
 * a política de privacidade. Numa fileira só não cabia — em 1024 os seis itens
 * encostavam uns nos outros —, e separar deixa o CNPJ com lugar próprio quando
 * ele chegar, sem empurrar a assinatura.
 *
 * A virada da fileira de cima é no lg, não no sm: entre 640 e 1024 os itens até
 * cabem numa linha, mas o slogan quebra em duas e cola no @. Empilhado ali fica
 * melhor.
 *
 * Não tem folga extra embaixo: ela existia só para a barra fixa do CTA no
 * mobile, que o Lucas tirou em 11/09/2026. Se a barra voltar, a folga volta
 * junto — e no rodapé, não no `<main>`, senão a barra cobre o rodapé inteiro.
 */

// Texto secundário em /55, não menos: /45 dá 4,43:1 sobre o preto e o mínimo
// AA para 12px é 4,5:1. /55 dá 6,25:1 e continua lendo como secundário.
// Carimbado no build. O site é export estático com deploy a cada push, então
// não existe página parada tempo suficiente pra mostrar ano errado.
const ANO = new Date().getFullYear()

// py-3.5 no celular pra área de toque chegar a 44px (16 de linha + 28); no
// desktop, com mouse, volta ao py-1 e o rodapé não incha.
const link = 'inline-flex items-center gap-2 py-3.5 transition-colors hover:text-accent lg:py-1'

export function Footer() {
  // Razão social e CNPJ só aparecem quando existirem — ver EMPRESA.
  const legal = [`© ${ANO} ${BRAND.name}`, EMPRESA.razaoSocial, EMPRESA.cnpj && `CNPJ ${EMPRESA.cnpj}`]
    .filter(Boolean)
    .join(' · ')

  return (
    <footer className="border-t border-line/30">
      <Container className="py-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-6">
          <Logo height={36} className="shrink-0 text-paper" />

          <span aria-hidden="true" className="hidden h-9 w-px shrink-0 bg-line/40 lg:block" />

          <p className="text-xs leading-relaxed text-paper/55">{BRAND.slogan}</p>

          <div className="-my-3 flex flex-col text-xs text-paper/55 sm:flex-row sm:items-center sm:gap-6 lg:my-0 lg:ml-auto">
            <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className={link}>
              <IconeInstagram className="h-4 w-4" />
              @elevate.league
            </a>
            <a href={`mailto:${CONTATO_EMAIL}`} className={link}>
              <IconeEmail className="h-4 w-4" />
              {CONTATO_EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col border-t border-line/20 pt-6 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{legal}</p>
          <Link href={PRIVACIDADE_PATH} className={`${link} underline-offset-4 hover:underline`}>
            Política de privacidade
          </Link>
        </div>
      </Container>
    </footer>
  )
}

/** Mesmo contrato do ícone do Instagram: 24×24, traço 1.5 em currentColor. */
function IconeEmail({ className = '' }: { className?: string }) {
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
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
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

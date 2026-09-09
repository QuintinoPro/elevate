import { Container } from '@/components/ui/Container'
import { BRAND, FOUNDERS, asset } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-line/30 py-14">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/brand/icon.svg")} alt={BRAND.name} width={32} height={32} className="h-8 w-8" />
          <p className="mt-4 max-w-xs text-sm text-paper/40">{BRAND.slogan}</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-paper/50">
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            @elevate.league
          </a>
          <a href={FOUNDERS.lucas.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            @quintinopro
          </a>
          <a href={FOUNDERS.khayllan.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            @khayllan.midias
          </a>
        </nav>
      </Container>
    </footer>
  )
}

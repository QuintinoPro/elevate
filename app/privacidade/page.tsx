import type { Metadata } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { BRAND, CONTATO_EMAIL, EMPRESA, PRIVACIDADE_PATH, SITE_URL } from '@/lib/constants'
import { privacidade } from '@/lib/privacidade'

export const metadata: Metadata = {
  title: privacidade.titulo,
  description: 'Como a Elevate League usa os dados de quem faz a peneira.',
  alternates: { canonical: `${SITE_URL}${PRIVACIDADE_PATH}` },
}

/** Troca `{email}` pelo link de verdade, sem precisar de JSX dentro da copy. */
function comEmail(texto: string) {
  return texto.split('{email}').map((parte, i) => (
    <Fragment key={i}>
      {i > 0 && (
        <a
          href={`mailto:${CONTATO_EMAIL}`}
          className="text-accent underline underline-offset-4 hover:brightness-110"
        >
          {CONTATO_EMAIL}
        </a>
      )}
      {parte}
    </Fragment>
  ))
}

/**
 * Página de leitura, não de venda: sem CTA, sem céu animado, coluna estreita.
 * Quem chega aqui veio conferir uma coisa específica, geralmente saindo da
 * peneira numa aba nova, e precisa achar e voltar.
 */
export default function PrivacidadePage() {
  const identificacao = [EMPRESA.razaoSocial, EMPRESA.cnpj && `CNPJ ${EMPRESA.cnpj}`]
    .filter(Boolean)
    .join(' · ')

  return (
    <>
      <header>
        <Container className="py-6">
          <Link href="/" className="-my-2 inline-flex items-center py-2" aria-label={BRAND.name}>
            <Logo height={30} />
          </Link>
        </Container>
      </header>

      <main>
        <Container className="pb-24 pt-12 sm:pt-16">
          <article className="max-w-prose">
            <h1 className="text-balance text-display-md font-bold">{privacidade.titulo}</h1>
            <p className="mt-4 text-sm text-paper/55">
              Última atualização: {privacidade.atualizacao}
            </p>
            <p className="mt-8 text-pretty text-lg text-paper/80">{privacidade.resumo}</p>

            {privacidade.secoes.map((secao, i) => (
              <section key={secao.titulo} className="mt-12">
                <h2 className="text-xl font-bold">{secao.titulo}</h2>
                {'paragrafos' in secao &&
                  secao.paragrafos?.map((p) => (
                    <p key={p} className="mt-4 text-pretty leading-relaxed text-paper/70">
                      {comEmail(p)}
                    </p>
                  ))}
                {/* A identificação legal entra logo depois de "quem cuida", e só
                    quando existir — ver EMPRESA em lib/constants.ts. */}
                {i === 0 && identificacao && (
                  <p className="mt-4 leading-relaxed text-paper/70">{identificacao}</p>
                )}
                {'itens' in secao && secao.itens && (
                  <ul className="mt-4 grid gap-3">
                    {secao.itens.map((item) => (
                      <li key={item} className="flex gap-3 leading-relaxed text-paper/70">
                        <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span className="text-pretty">{comEmail(item)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {'fecho' in secao &&
                  secao.fecho?.map((p) => (
                    <p key={p} className="mt-4 text-pretty leading-relaxed text-paper/70">
                      {comEmail(p)}
                    </p>
                  ))}
              </section>
            ))}
          </article>
        </Container>
      </main>

      <Footer />
    </>
  )
}

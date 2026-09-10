import { BRAND, FOUNDERS, SITE_URL, asset } from '@/lib/constants'
import { faq } from '@/lib/content'

/**
 * JSON-LD da página. Duas coisas, e só duas:
 *
 *  - `FAQPage`, que é o único bloco da landing com formato que o Google
 *    entende de verdade e pode devolver como rich result.
 *  - `Organization`, que amarra a marca aos perfis do Instagram — é o que
 *    evita a busca por "Elevate League" cair em homônimo.
 *
 * Não declaramos `Product`/`Offer` de propósito: o schema pede disponibilidade
 * e validade do preço, e a página diz justamente que a condição pode mudar sem
 * data. Marcar oferta que a gente não pode sustentar rende penalidade, não
 * clique — quando o checkout existir e o prazo estiver fechado, aí entra.
 */
export function DadosEstruturados() {
  const dados = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}#organizacao`,
        name: BRAND.name,
        url: SITE_URL,
        logo: `${SITE_URL}${asset('/brand/icon.svg')}`,
        description: BRAND.slogan,
        sameAs: [BRAND.instagram, FOUNDERS.lucas.instagram, FOUNDERS.khayllan.instagram],
        founder: [
          { '@type': 'Person', name: FOUNDERS.khayllan.name, sameAs: FOUNDERS.khayllan.instagram },
          { '@type': 'Person', name: FOUNDERS.lucas.name, sameAs: FOUNDERS.lucas.instagram },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}#faq`,
        // As perguntas vêm do content.ts: mudar a copy muda o dado estruturado
        // junto, sem ninguém precisar lembrar de atualizar os dois.
        mainEntity: faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      // JSON-LD precisa entrar cru. O conteúdo é nosso e estático — não há
      // entrada de usuário aqui —, e o replace fecha o único vetor real:
      // um "</script>" dentro de uma string encerraria a tag mais cedo.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(dados).replace(/</g, '\\u003c'),
      }}
    />
  )
}

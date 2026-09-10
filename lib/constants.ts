// Prefixo de caminho quando o site não está na raiz do domínio. Precisa bater
// com o basePath do next.config.ts — os dois leem a mesma variável.
// O Next já prefixa next/link e next/image sozinho; isto aqui é para o que ele
// não toca: <img src> cru e url() dentro de CSS.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const asset = (path: string) => `${BASE_PATH}${path}`

// TODO: trocar pelo domínio próprio quando o Lucas comprar — afeta metadata, OG,
// sitemap e o CNAME do Pages.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quintinopro.github.io/elevate'

export const BRAND = {
  name: 'Elevate League',
  slogan: 'Bem-vindo à liga de quem não joga sozinho.',
  instagram: 'https://www.instagram.com/elevate.league/',
} as const

export const FOUNDERS = {
  lucas: {
    name: 'Lucas Quintino',
    instagram: 'https://www.instagram.com/quintinopro/',
  },
  khayllan: {
    name: 'Khayllan Martins',
    instagram: 'https://www.instagram.com/khayllan.midias/',
  },
} as const

// O produto vendido na landing. A marca continua sendo a Elevate League.
export const PRODUCT = 'Elevate Pro'

// Preço da primeira turma, assinado pelo Lucas em 10/09/2026. Aparece no hero,
// na barra fixa do mobile, no card de oferta e no CTA de fecho do FAQ — todos
// leem daqui, então trocar aqui troca na página inteira.
export const PRICE = 'R$497'

// Os CTAs da página. Todos levam ao mesmo lugar (a peneira); o que muda é o
// tamanho do rótulo, porque o botão do header e a barra do mobile não comportam
// a frase inteira. Se o texto mudar, muda aqui e vale na página toda.
export const CTA_LABEL = `Quero entrar para o ${PRODUCT}`
export const CTA_LABEL_SHORT = 'Entrar na liga'
export const CTA_LABEL_MOBILE = `Quero entrar — ${PRICE}`
export const CTA_LABEL_OFERTA = `Garantir minha vaga por ${PRICE}`
export const CTA_LABEL_FAQ = `${CTA_LABEL} — ${PRICE}`
export const QUIZ_PATH = '/quiz/'

// TODO: preencher quando o Khayllan definir a plataforma de checkout.
export const CHECKOUT_URL = ''

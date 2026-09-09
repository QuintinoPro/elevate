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

// CTA único da página inteira. Se mudar, muda em todo lugar de uma vez.
export const CTA_LABEL = 'Fazer a peneira'
export const QUIZ_PATH = '/quiz/'

// TODO: preencher quando o Khayllan definir a plataforma de checkout.
export const CHECKOUT_URL = ''

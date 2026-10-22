// Prefixo de caminho quando o site não está na raiz do domínio. Precisa bater
// com o basePath do next.config.ts — os dois leem a mesma variável.
// O Next já prefixa next/link e next/image sozinho; isto aqui é para o que ele
// não toca: <img src> cru e url() dentro de CSS.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const asset = (path: string) => `${BASE_PATH}${path}`

// Domínio próprio, comprado na Hostinger e apontado em 14/09/2026. Vale para
// metadata, OG, canonical, sitemap e robots. O arquivo public/CNAME tem que
// dizer a mesma coisa.
// Interruptor explícito do índice do Google. Fica desligado por padrão: a
// página só entra no índice quando alguém decidir ligar, nunca por consequência
// de mudar de domínio.
export const INDEXAVEL = process.env.NEXT_PUBLIC_INDEXAVEL === '1'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://elevateleague.com.br'

export const BRAND = {
  name: 'Elevate League',
  slogan: 'Bem-vindo à liga de quem não joga sozinho.',
  instagram: 'https://www.instagram.com/elevate.league/',
} as const

// E-mail de contato do rodapé e da política de privacidade. É a caixa da
// própria liga, trocada pelo Lucas em 13/09/2026 (antes era o da Agência Stocks).
export const CONTATO_EMAIL = 'elevateleague07@gmail.com'

// Quem responde legalmente pelo site e pelos dados da peneira. O Lucas vai
// mandar o CNPJ. Enquanto os campos estiverem vazios, o rodapé e a política
// simplesmente não mostram a linha — nada de "[CNPJ]" publicado.
export const EMPRESA = {
  razaoSocial: '',
  cnpj: '',
} as const

export const PRIVACIDADE_PATH = '/privacidade/'

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

// SEM PREÇO NO SITE desde 21/10/2026. Decisão do Lucas: a estratégia mudou, e a
// página deixou de vender. A pessoa faz o cadastro pela peneira, o lead vai pra
// planilha, e o time da Elevate League chama no WhatsApp pra decidir se ela
// entra — valor e pagamento são assunto dessa conversa, nunca da página.
// Nada aqui pode dar indício de que entrar custa dinheiro: nem valor, nem
// parcela, nem garantia de reembolso, nem link de checkout.
//
// O que existia antes está no Git: R$497 / 12x de R$41,42 (commit bbb0ee4) e o
// checkout da Hubla, https://pay.hub.la/rtaV0GK8PicrmE9JsGTf (commit ad57524).

// Os CTAs da página. Todos levam ao mesmo lugar (a peneira); o que muda é o
// tamanho do rótulo, porque o botão do header não comporta a frase inteira.
// Se o texto mudar, muda aqui e vale na página toda.
export const CTA_LABEL = `Quero entrar para o ${PRODUCT}`
export const CTA_LABEL_SHORT = 'Entrar na liga'
export const CTA_LABEL_OFERTA = 'Fazer meu cadastro'
export const QUIZ_PATH = '/quiz/'

// Web App do Google Apps Script que grava as respostas da peneira na planilha
// "Elevate — Peneira", na conta stocksservicosti@gmail.com (publicado em
// 21/10/2026). O código e o passo a passo pra atualizar vivem em
// AUTOMACOES/PENEIRA/. Não é segredo: a URL vai no JavaScript da página de
// qualquer jeito. Atualizar o script com `clasp update-deployment` mantém esta
// URL; criar uma implantação nova muda a URL e exige trocar aqui.
export const QUIZ_ENDPOINT =
  process.env.NEXT_PUBLIC_QUIZ_ENDPOINT ??
  'https://script.google.com/macros/s/AKfycbyST8Jfi0jWvq2AHp1RYBAvZjs8c94p09k6u7XM5WV4lmG9BrF4r_dbGxVLYJrAU3I/exec'

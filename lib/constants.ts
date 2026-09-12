// Prefixo de caminho quando o site não está na raiz do domínio. Precisa bater
// com o basePath do next.config.ts — os dois leem a mesma variável.
// O Next já prefixa next/link e next/image sozinho; isto aqui é para o que ele
// não toca: <img src> cru e url() dentro de CSS.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const asset = (path: string) => `${BASE_PATH}${path}`

// TODO: trocar pelo domínio próprio quando o Lucas comprar — afeta metadata, OG,
// sitemap e o CNAME do Pages.
// Interruptor explícito do índice do Google. Fica desligado por padrão: a
// página só entra no índice quando alguém decidir ligar, nunca por consequência
// de mudar de domínio.
export const INDEXAVEL = process.env.NEXT_PUBLIC_INDEXAVEL === '1'

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

// Preço da primeira turma, assinado pelo Lucas em 10/09/2026. Saiu do hero em
// 11/09; hoje aparece no card de oferta, no rótulo do botão e na peneira —
// todos leem daqui, então trocar aqui troca na página inteira.
export const PRICE = 'R$497'

// Parcelamento exibido no card de oferta (11/09/2026). O número grande passou a
// ser a parcela, e o valor à vista entra abaixo, como na referência que o Lucas
// trouxe (laje-ac.com.br).
//
// ATENÇÃO: R$41,42 é R$497 dividido por 12 **sem juros** — só é verdade se o
// checkout da Hubla estiver configurado para absorver os juros. Se a Hubla
// repassar, a parcela real sobe (costuma ficar na casa dos R$50) e a página
// passa a anunciar um valor que o checkout não cobra. Conferir antes de indexar
// e ajustar as duas linhas abaixo.
export const PRICE_PARCELAS = 12
export const PRICE_PARCELA = 'R$41,42'

// Os CTAs da página. Todos levam ao mesmo lugar (a peneira); o que muda é o
// tamanho do rótulo, porque o botão do header não comporta a frase inteira.
// Se o texto mudar, muda aqui e vale na página toda.
export const CTA_LABEL = `Quero entrar para o ${PRODUCT}`
export const CTA_LABEL_SHORT = 'Entrar na liga'
export const CTA_LABEL_OFERTA = `Garantir minha vaga por ${PRICE}`
export const QUIZ_PATH = '/quiz/'

// Checkout da primeira turma, na Hubla (link do Lucas, 10/09/2026). Não é
// segredo — é o link de compra, e o repositório é público de qualquer forma.
// Preenchido, o botão do resultado da peneira sai do estado desativado sozinho.
export const CHECKOUT_URL = 'https://pay.hub.la/rtaV0GK8PicrmE9JsGTf'

// Web App do Google Apps Script que grava as respostas da peneira na planilha.
// O código do script vive em AUTOMACOES/PENEIRA/ — subir lá, publicar como
// "qualquer pessoa", e colar a URL /exec aqui (ou em .env.local, que não vai
// pro repositório público).
export const QUIZ_ENDPOINT = process.env.NEXT_PUBLIC_QUIZ_ENDPOINT ?? ''

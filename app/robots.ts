import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

// Obrigatório com output: 'export', igual ao sitemap.
export const dynamic = 'force-static'

/**
 * Libera tudo, sempre — inclusive enquanto a página está com noindex. Parece
 * contraditório e não é: quem tira a página do Google é a meta `robots` do
 * layout, e o robô só lê essa meta se puder entrar. Bloquear aqui faria o
 * Google indexar a URL sem conteúdo quando alguém linkasse, justamente o
 * contrário do que o noindex quer.
 *
 * Só vale na raiz do domínio: em quintinopro.github.io/elevate/robots.txt ele é
 * ignorado. Passa a contar quando o domínio próprio entrar.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}

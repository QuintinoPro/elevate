import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

// Obrigatório com output: 'export' — sem isso o build quebra.
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // Com a barra no fim: o site é exportado com trailingSlash, então
      // https://elevateleague.com.br/ é a URL real e é a do canonical.
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}

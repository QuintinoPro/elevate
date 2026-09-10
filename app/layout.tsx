import type { Metadata, Viewport } from 'next'
import { Sora } from 'next/font/google'
import { asset, BASE_PATH, BRAND, SITE_URL } from '@/lib/constants'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-sora',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Elevate Pro — você não precisa de mais conteúdo',
    template: '%s · Elevate League',
  },
  description:
    'Entre para uma liga de jovens empreendedores que estão construindo, vendendo, criando e crescendo juntos. Plataforma, encontros ao vivo, networking e 2 horas de mentoria individual.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: BRAND.name,
    title: 'Elevate Pro — você não precisa de mais conteúdo',
    description:
      'Entre para uma liga de jovens empreendedores que estão construindo, vendendo, criando e crescendo juntos. Plataforma, encontros ao vivo, networking e 2 horas de mentoria individual.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elevate Pro — você não precisa de mais conteúdo',
    description: 'A liga de jovens empreendedores que estão construindo juntos. Primeiras vagas por R$497.',
  },
  alternates: { canonical: SITE_URL },
  // O deploy do GitHub Pages é prévia, não lançamento: sai do índice enquanto
  // preço, garantia e números dos fundadores não têm sign-off. No domínio
  // próprio não haverá BASE_PATH e a página volta a ser indexável.
  robots: BASE_PATH ? { index: false, follow: false } : undefined,
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={sora.variable}>
      <body
        className="font-sans"
        style={{ '--brand-pattern': `url(${asset('/brand/pattern.svg')})` } as React.CSSProperties}
      >
        {children}
      </body>
    </html>
  )
}

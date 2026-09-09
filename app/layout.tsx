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
    default: 'Elevate League — a liga de quem não joga sozinho',
    template: '%s · Elevate League',
  },
  description:
    'Uma liga para quem tem 18 a 28 anos e cansou de crescer sozinho. Mentoria individual com os fundadores, rede de verdade e conteúdo que destrava os primeiros contratos.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: BRAND.name,
    title: 'Elevate League — a liga de quem não joga sozinho',
    description:
      'Uma liga para quem tem 18 a 28 anos e cansou de crescer sozinho. Mentoria individual com os fundadores, rede de verdade e conteúdo que destrava os primeiros contratos.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elevate League — a liga de quem não joga sozinho',
    description: 'Uma liga para quem tem 18 a 28 anos e cansou de crescer sozinho.',
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

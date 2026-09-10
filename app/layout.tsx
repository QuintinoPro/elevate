import type { Metadata, Viewport } from 'next'
import { Sora } from 'next/font/google'
import { asset, BRAND, INDEXAVEL, SITE_URL } from '@/lib/constants'
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
    'Entre para uma liga de jovens empreendedores que estão construindo, vendendo, criando e crescendo juntos. Plataforma, encontros ao vivo, networking e mentorias individuais com os fundadores.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: BRAND.name,
    title: 'Elevate Pro — você não precisa de mais conteúdo',
    description:
      'Entre para uma liga de jovens empreendedores que estão construindo, vendendo, criando e crescendo juntos. Plataforma, encontros ao vivo, networking e mentorias individuais com os fundadores.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elevate Pro — você não precisa de mais conteúdo',
    description: 'A liga de jovens empreendedores que estão construindo juntos. Primeiras vagas por R$497.',
  },
  alternates: { canonical: SITE_URL },
  // Enquanto for prévia, fica fora do índice. Amarrar isso ao BASE_PATH era
  // uma armadilha: no dia que o domínio próprio entrasse, a página passaria a
  // ser indexável sozinha, com pendência aberta (hoje: o prazo de acesso que o
  // FAQ responde). Agora é uma variável explícita — pôr NEXT_PUBLIC_INDEXAVEL=1
  // no ambiente é uma decisão consciente, não efeito colateral de deploy.
  robots: INDEXAVEL ? undefined : { index: false, follow: false },
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

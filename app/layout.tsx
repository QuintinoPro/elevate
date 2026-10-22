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

// Até ~155 caracteres: acima disso o Google corta no resultado de busca. A
// versão anterior tinha 190 (revisão de 21/10/2026).
const DESCRICAO =
  'Uma liga de jovens empreendedores construindo, vendendo e crescendo juntos. Plataforma, encontros ao vivo, networking e mentorias com os fundadores.'

export const metadata: Metadata = {
  // Só a origem, sem caminho. O Next já prefixa o basePath nos arquivos de
  // metadata (opengraph-image, ícones); com o SITE_URL inteiro aqui, a imagem de
  // compartilhamento saía em /elevate/elevate/ no Pages. No domínio próprio as
  // duas formas dão no mesmo.
  metadataBase: new URL(new URL(SITE_URL).origin),
  title: {
    default: 'Elevate League — você não precisa de mais conteúdo',
    template: '%s · Elevate League',
  },
  description: DESCRICAO,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: BRAND.name,
    title: 'Elevate League — você não precisa de mais conteúdo',
    description: DESCRICAO,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elevate League — você não precisa de mais conteúdo',
    description: 'A liga de jovens empreendedores que estão construindo juntos. Cadastro aberto pra primeira turma.',
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

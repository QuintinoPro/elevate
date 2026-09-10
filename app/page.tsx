import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { StickyCta } from '@/components/layout/StickyCta'
import { Faq } from '@/components/sections/Faq'
import { Fundadores } from '@/components/sections/Fundadores'
import { Hero } from '@/components/sections/Hero'
import { Oferta } from '@/components/sections/Oferta'
import { ParaQuem } from '@/components/sections/ParaQuem'
import { OQueE } from '@/components/sections/OQueE'
import { OQueRecebe } from '@/components/sections/OQueRecebe'

/**
 * Sete seções, nessa ordem, e nada além disso. Cada uma responde uma pergunta
 * da decisão de compra: o que é, o que eu recebo, quem está por trás, isso é
 * pra mim, quanto custa, e o que ainda me trava. Se uma seção nova não
 * responder uma dessas, ela não entra.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-24 sm:pb-0">
        <Hero />
        <OQueE />
        <OQueRecebe />
        <Fundadores />
        {/* A qualificação vem logo antes do preço: quem se reconhece nela chega
            no valor já convencido de que a liga é pra ele, e quem não se
            reconhece sai antes — que é o ponto da seção. */}
        <ParaQuem />
        <Oferta />
        <Faq />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}

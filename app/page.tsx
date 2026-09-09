import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { StickyCta } from '@/components/layout/StickyCta'
import { ComoFunciona } from '@/components/sections/ComoFunciona'
import { CtaFinal } from '@/components/sections/CtaFinal'
import { Faq } from '@/components/sections/Faq'
import { Fundadores } from '@/components/sections/Fundadores'
import { Hero } from '@/components/sections/Hero'
import { NoventaDias } from '@/components/sections/NoventaDias'
import { ParaQuem } from '@/components/sections/ParaQuem'
import { Pilares } from '@/components/sections/Pilares'
import { Problema } from '@/components/sections/Problema'
import { Vagas } from '@/components/sections/Vagas'

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-24 sm:pb-0">
        <Hero />
        <Problema />
        <NoventaDias />
        <Pilares />
        <Fundadores />
        <ParaQuem />
        <ComoFunciona />
        <Vagas />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}

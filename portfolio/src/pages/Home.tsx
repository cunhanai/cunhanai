import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

import { Grain } from "@/components/common/Grain"
import { Icon } from "@/components/common/Icon"
import { ScrollProgress } from "@/components/common/ScrollProgress"
import { About } from "@/components/home/About"
import { Footer } from "@/components/home/Footer"
import { Hero } from "@/components/home/Hero"
import { Projects } from "@/components/home/Projects"
import { Stack } from "@/components/home/Stack"
import { TechStrip } from "@/components/home/TechStrip"
import { Toolbox } from "@/components/home/Toolbox"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { COMMON } from "@/data/common"
import { useDict } from "@/i18n/lang"

/** Vindo de outra página com /#secao: rola até a seção depois de montar. */
function useScrollToHash() {
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(decodeURIComponent(hash.slice(1)))
    el?.scrollIntoView()
  }, [hash])
}

export default function Home() {
  const c = useDict(COMMON)
  useScrollToHash()

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink">
      <Grain />
      <ScrollProgress />
      <SiteHeader
        page="home"
        mobileExtra={(close) => (
          <Link
            to="/tools"
            onClick={close}
            className="mt-4 flex items-center justify-between gap-3 border-3 border-white bg-main px-[18px] py-4 text-[15px] font-bold text-white"
          >
            {c.ctaTools}
            <Icon icon={faArrowUpRightFromSquare} />
          </Link>
        )}
      />
      <main id="top" className="relative z-[1]">
        <Hero />
        <TechStrip />
        <About />
        <Stack />
        <Projects />
        <Toolbox />
        <Footer />
      </main>
    </div>
  )
}

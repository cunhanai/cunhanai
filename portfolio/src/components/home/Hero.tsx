import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { faArrowRight, faEnvelope, faGraduationCap, faToolbox } from "@fortawesome/free-solid-svg-icons"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { Container } from "@/components/common/Container"
import { Icon } from "@/components/common/Icon"
import { COMMON } from "@/data/common"
import { HOME, LINKS } from "@/data/home"
import { useDict } from "@/i18n/lang"

const SOCIALS: [label: string, href: string, icon: IconDefinition][] = [
  ["GitHub", LINKS.github, faGithub],
  ["LinkedIn", LINKS.linkedin, faLinkedinIn],
  ["Lattes", LINKS.lattes, faGraduationCap],
  ["E-mail", LINKS.email, faEnvelope],
]

/** Efeito de digitação: 38ms por caractere; com movimento reduzido mostra o texto inteiro. */
function useTyping(text: string) {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (reduce) return
    setCount(0)
    const id = setInterval(() => {
      setCount((n) => {
        if (n >= text.length) clearInterval(id)
        return Math.min(n + 1, text.length)
      })
    }, 38)
    return () => clearInterval(id)
  }, [text, reduce])
  return reduce ? text : text.slice(0, count)
}

/** Blobs roxos flutuando, com parallax leve (~12% da velocidade do scroll). */
function Blobs() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, (v) => v * 0.12)
  return (
    <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ y }}>
      <motion.div
        className="absolute -top-[90px] -left-[110px] size-[360px] rounded-full bg-[radial-gradient(circle,#A74DE1_0%,rgba(154,77,255,0)_68%)] opacity-60 blur-[34px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-[120px] -bottom-[130px] size-[330px] rounded-full bg-[radial-gradient(circle,#ff7ae0_0%,rgba(255,122,224,0)_70%)] opacity-30 blur-[38px]"
        animate={{ x: [0, -50, 0], y: [0, -20, 0], scale: [1.1, 0.95, 1.1] }}
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
      />
    </motion.div>
  )
}

export function Hero() {
  const t = useDict(HOME)
  const c = useDict(COMMON)
  const typed = useTyping(t.role)

  return (
    <section className="relative overflow-hidden pt-[26px] pb-14">
      <Blobs />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-[26px] desk:grid-cols-[1.05fr_.95fr] desk:items-center desk:gap-12">
          <div>
            <h1 className="m-0 font-display text-[70px] leading-[.86] font-bold tracking-[-0.035em] uppercase desk:text-[96px]">
              Ana Júlia
            </h1>
            <div className="mt-2 flex items-center gap-3">
              <motion.span
                aria-hidden
                className="h-[3px] flex-1 origin-left bg-main"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: [0.2, 0.7, 0.3, 1] }}
              />
              <span className="font-display text-[30px] font-medium whitespace-nowrap text-lilac italic desk:text-[46px]">
                da Cunha
              </span>
            </div>
            <p className="mt-[18px] min-h-5 text-[13px] font-semibold tracking-[0.14em] text-lilac-2 uppercase">
              <span className="sr-only">{t.role}</span>
              <span aria-hidden>{typed}</span>
              <span aria-hidden className="inline-block w-[9px] animate-caret bg-main text-transparent">
                .
              </span>
            </p>
            <p className="mt-[22px] font-display text-[28px] leading-[1.22] text-pretty text-white">
              {t.heroLead1}
              <em className="text-lilac">{t.heroLead2}</em>.
            </p>
            <p className="mt-3 max-w-[44ch] text-base leading-relaxed text-pretty text-soft">{t.heroSub}</p>

            <div className="mt-[26px] flex flex-wrap gap-3">
              <a
                href="#projetos"
                className="flex items-center gap-[9px] border-3 border-white bg-main px-5 py-[13px] text-sm font-bold text-white nb-5 nb-light nb-press"
              >
                {t.ctaProjects}
                <Icon icon={faArrowRight} />
              </a>
              <Link
                to="/tools"
                className="flex items-center gap-[9px] border-3 border-white bg-panel px-5 py-[13px] text-sm font-bold text-white nb-5 nb-press"
              >
                {c.ctaTools}
                <Icon icon={faToolbox} className="text-main" />
              </Link>
            </div>

            <div className="mt-[30px] flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-bold tracking-[0.14em] text-lilac-3 uppercase">{t.findMe}</span>
              <div className="flex gap-2.5">
                {SOCIALS.map(([label, href, icon]) => (
                  <a
                    key={label}
                    href={href}
                    title={label}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="grid size-[46px] place-items-center border-3 border-line-2 bg-panel text-soft-2 nb-4 nb-press hover:border-white hover:bg-main hover:text-white"
                  >
                    <Icon icon={icon} className="text-[20px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* TODO: trocar pelo retrato/banner real */}
          <div className="flex h-[280px] items-end justify-center border-3 border-white bg-[repeating-linear-gradient(90deg,#261739_0_7px,#1c1129_7px_14px)] p-3.5 nb-12 desk:h-[440px]">
            <span className="text-[11px] font-semibold tracking-[0.1em] text-lilac-3 uppercase">{t.photoSlot}</span>
          </div>
        </div>
      </Container>
    </section>
  )
}

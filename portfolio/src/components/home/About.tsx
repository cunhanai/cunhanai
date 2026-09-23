import { faClock, faGlobe, faUser } from "@fortawesome/free-solid-svg-icons"

import { Container } from "@/components/common/Container"
import { Icon } from "@/components/common/Icon"
import { Reveal } from "@/components/common/Reveal"
import { SectionHeading } from "@/components/common/SectionHeading"
import { CountUp } from "@/components/home/CountUp"
import { HOME } from "@/data/home"
import { useDict } from "@/i18n/lang"
import { cn } from "@/lib/utils"

export function About() {
  const t = useDict(HOME)
  return (
    <section id="sobre" className="scroll-mt-[74px] pt-14 pb-2.5">
      <Container>
        <SectionHeading icon={faUser} num="01" title={t.aboutTitle} className="mb-[22px]" />

        <div className="grid grid-cols-1 gap-[18px] desk:grid-cols-2 desk:gap-[26px]">
          <Reveal>
            <p className="m-0 text-[17px] leading-[1.65] text-pretty text-soft-3">{t.aboutP1}</p>
            <p className="mt-4 text-[17px] leading-[1.65] text-pretty text-soft">{t.aboutP2}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="flex flex-none items-center gap-[7px] text-[11px] font-bold tracking-[0.12em] text-lilac-3 uppercase">
                <Icon icon={faGlobe} className="text-[13px]" />
                {t.langsLabel}
              </span>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {t.langs.map((l) => (
                  <li key={l.name} className="flex items-baseline gap-1.5 border-2 border-line-2 px-2.5 py-[5px]">
                    <span className="text-[13px] font-semibold text-soft-2">{l.name}</span>
                    <span className="text-[11px] text-lilac-3">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-3.5">
            {t.funFacts.map((f, i) => (
              <Reveal key={f.label} index={i}>
                <div
                  className={cn(
                    "flex items-center gap-3.5 border-3 border-white px-4 py-3.5 nb-6",
                    f.accent ? "bg-main nb-light" : "bg-panel",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-[34px] flex-none place-items-center border-2 text-[13px]",
                      f.accent ? "border-white text-white" : "border-line-2 text-lilac",
                    )}
                  >
                    <Icon icon={f.icon} />
                  </span>
                  <span className="flex min-w-0 flex-1 items-baseline gap-2.5">
                    <span className="flex-none font-display text-4xl leading-none font-bold whitespace-nowrap">
                      <CountUp value={f.value} />
                      {f.sub && (
                        <span className={cn("text-xl font-bold", f.accent ? "text-[#e5d3ff]" : "text-lilac-3")}>{f.sub}</span>
                      )}
                    </span>
                    <span
                      className={cn(
                        "text-xs leading-[1.35] font-bold tracking-[0.06em] text-pretty uppercase",
                        f.accent ? "text-[#f6f0ff]" : "text-lilac-2",
                      )}
                    >
                      {f.label}
                    </span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-7 border-3 border-white bg-panel nb-8">
          <div className="flex items-center justify-between gap-3 border-b-3 border-white bg-panel-2 px-4 py-3">
            <span className="flex flex-none items-center gap-[9px] text-xs font-bold tracking-[0.14em] whitespace-nowrap text-lilac uppercase">
              <Icon icon={faClock} className="text-main" />
              {t.nowLabel}
            </span>
            <span className="text-xs text-lilac-3">{t.nowSub}</span>
          </div>
          <div className="grid grid-cols-1 gap-3 p-4 desk:grid-cols-3">
            {t.nowItems.map((n) => (
              <div key={n.label} className="flex items-start gap-3 border-2 border-line-2 bg-ink p-3.5">
                <span aria-hidden className="grid size-[34px] flex-none place-items-center border-2 border-main text-[13px] text-lilac">
                  <Icon icon={n.icon} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold tracking-[0.12em] text-main uppercase">{n.label}</span>
                  <span className="mt-1 block text-[15px] leading-[1.45] text-pretty text-soft-3">{n.text}</span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

import { faLayerGroup } from "@fortawesome/free-solid-svg-icons"

import { Container } from "@/components/common/Container"
import { Icon } from "@/components/common/Icon"
import { Reveal } from "@/components/common/Reveal"
import { SectionHeading } from "@/components/common/SectionHeading"
import { HOME } from "@/data/home"
import { useDict } from "@/i18n/lang"
import { cn } from "@/lib/utils"

export function Stack() {
  const t = useDict(HOME)
  return (
    <section id="stack" className="scroll-mt-[74px] pt-14 pb-2.5">
      <Container>
        <SectionHeading icon={faLayerGroup} num="02" title={t.stackTitle} />
        <p className="mb-[22px] max-w-[56ch] text-[15px] leading-relaxed text-pretty text-lilac-2">{t.stackLead}</p>

        <div className="grid grid-cols-1 gap-[18px] desk:grid-cols-2 desk:gap-[26px]">
          {t.stackGroups.map((g, i) => (
            <Reveal key={g.label} index={i}>
              <div className="h-full border-3 border-white bg-panel nb-6 nb-press">
                <div className="flex items-center gap-2.5 border-b-3 border-white bg-panel-2 px-3.5 py-3">
                  <span aria-hidden className="grid size-[30px] flex-none place-items-center border-2 border-main text-xs text-lilac">
                    <Icon icon={g.icon} />
                  </span>
                  <h3 className="m-0 text-xs font-bold tracking-[0.14em] text-soft-2 uppercase">{g.label}</h3>
                </div>
                <ul className="m-0 flex list-none flex-wrap gap-2 p-3.5">
                  {g.items.map(([name, daily]) => (
                    <li
                      key={name}
                      className={cn(
                        "border-2 px-[11px] py-[7px] text-[13px] font-bold tracking-[0.03em]",
                        daily ? "border-white bg-main text-white" : "border-line-2 bg-transparent text-lilac-2",
                      )}
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2.5 text-xs text-lilac-3">
          <span className="flex items-center gap-[7px]">
            <span className="size-3.5 flex-none border-2 border-white bg-main" />
            {t.stackDaily}
          </span>
          <span className="flex items-center gap-[7px]">
            <span className="size-3.5 flex-none border-2 border-line-2" />
            {t.stackKnown}
          </span>
        </div>
      </Container>
    </section>
  )
}

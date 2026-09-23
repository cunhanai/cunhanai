import { faArrowRight, faChevronDown, faScrewdriverWrench, faToolbox } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Link } from "react-router-dom"

import { Container } from "@/components/common/Container"
import { Icon } from "@/components/common/Icon"
import { Reveal } from "@/components/common/Reveal"
import { SectionHeading } from "@/components/common/SectionHeading"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { HOME } from "@/data/home"
import { TOOL_ICONS, TOOL_IDS } from "@/data/tools"
import { useDict } from "@/i18n/lang"
import { cn } from "@/lib/utils"

export function Toolbox() {
  const t = useDict(HOME)
  const [open, setOpen] = useState(true)

  return (
    <section id="ferramentas" className="scroll-mt-[74px] pt-14 pb-2.5">
      <Container>
        <SectionHeading icon={faScrewdriverWrench} num="04" title={t.toolsTitle} />
        <p className="mb-[22px] max-w-[56ch] text-[15px] leading-relaxed text-pretty text-lilac-2">{t.toolsLead}</p>

        <Reveal className="border-3 border-white bg-panel nb-10">
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between gap-3 border-0 border-b-3 border-white bg-main px-4 py-[13px] text-left font-sans">
              <span className="flex items-center gap-[9px] text-xs font-bold tracking-[0.14em] text-white uppercase">
                <Icon icon={faToolbox} />
                toolbox
              </span>
              <span className="flex items-center gap-2.5 text-xs font-bold text-[#f0e4ff]">
                {t.toolsCount}
                <Icon icon={faChevronDown} className={cn("transition-transform duration-[240ms]", open && "rotate-180")} />
              </span>
            </CollapsibleTrigger>
            {/* altura animada pelo Base UI (--collapsible-panel-height) */}
            <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-[280ms] ease-out data-ending-style:h-0 data-starting-style:h-0">
              <ul className="m-0 list-none p-0">
                {TOOL_IDS.map((id) => {
                  const [name, desc] = t.tools[id]
                  return (
                    <li key={id}>
                      <Link
                        to={{ pathname: "/tools", hash: id }}
                        className="flex items-center gap-3.5 border-b-2 border-line px-4 py-3.5 text-white transition-colors hover:bg-panel-2"
                      >
                        <span aria-hidden className="grid size-[38px] flex-none place-items-center border-2 border-line-2 bg-ink text-sm text-lilac">
                          <Icon icon={TOOL_ICONS[id]} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[15px] leading-[1.3] font-bold">{name}</span>
                          <span className="mt-0.5 block text-[13px] text-lilac-3">{desc}</span>
                        </span>
                        <Icon icon={faArrowRight} className="flex-none text-main" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </CollapsibleContent>
          </Collapsible>
          <Link to="/tools" className="flex items-center justify-center gap-2.5 bg-panel-2 p-4 text-sm font-bold text-white">
            {t.toolsAll}
            <Icon icon={faArrowRight} className="text-lilac" />
          </Link>
        </Reveal>
      </Container>
    </section>
  )
}

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Reveal } from "@/components/common/Reveal"
import { cn } from "@/lib/utils"

export function SectionHeading({
  icon,
  num,
  title,
  className,
}: {
  icon: IconDefinition
  num: string
  title: string
  className?: string
}) {
  return (
    <Reveal className={cn("mb-2.5 flex flex-wrap items-center gap-3", className)}>
      <span className="grid size-9 flex-none place-items-center border-3 border-main text-lilac" aria-hidden>
        <FontAwesomeIcon icon={icon} className="text-[16px]" />
      </span>
      <span className="font-display text-[15px] font-bold text-main">{num}</span>
      <h2 className="m-0 font-display text-4xl font-bold tracking-[-0.02em] desk:text-[52px]">{title}</h2>
    </Reveal>
  )
}

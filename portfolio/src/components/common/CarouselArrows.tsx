import { faArrowLeft, faArrowRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

import { Icon } from "@/components/common/Icon"
import { cn } from "@/lib/utils"

/** Par de setas neobrutalistas; a desabilitada fica apagada e sem sombra branca. */
export function CarouselArrows({
  onPrev,
  onNext,
  canPrev,
  canNext,
  prevLabel,
  nextLabel,
  size = "md",
  controls,
}: {
  onPrev: () => void
  onNext: () => void
  canPrev: boolean
  canNext: boolean
  prevLabel: string
  nextLabel: string
  size?: "sm" | "md"
  /** id do trilho que as setas controlam */
  controls?: string
}) {
  const base = cn(
    "grid place-items-center border-3 border-white text-white disabled:cursor-default",
    size === "md" ? "size-[46px] text-lg" : "size-10 text-sm",
  )
  const on = "bg-main nb-4 nb-light nb-press"
  const off = "bg-panel opacity-45 shadow-[4px_4px_0_var(--color-line-2)]"
  return (
    <div className={cn("flex items-center", size === "md" ? "gap-2.5" : "gap-2")}>
      <button type="button" onClick={onPrev} disabled={!canPrev} aria-label={prevLabel} aria-controls={controls} className={cn(base, canPrev ? on : off)}>
        <Icon icon={size === "md" ? faArrowLeft : faChevronLeft} />
      </button>
      <button type="button" onClick={onNext} disabled={!canNext} aria-label={nextLabel} aria-controls={controls} className={cn(base, canNext ? on : off)}>
        <Icon icon={size === "md" ? faArrowRight : faChevronRight} />
      </button>
    </div>
  )
}

import { faArrowLeft, faArrowRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

import { Icon } from "@/components/common/Icon"
import { cn } from "@/lib/utils"

/** Par de setas neobrutalistas. Sempre ativas: o carrossel dá a volta nas pontas. */
export function CarouselArrows({
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
  size = "md",
  controls,
}: {
  onPrev: () => void
  onNext: () => void
  prevLabel: string
  nextLabel: string
  size?: "sm" | "md"
  /** id do trilho que as setas controlam */
  controls?: string
}) {
  const cls = cn(
    "grid place-items-center border-3 border-white bg-main text-white nb-4 nb-light nb-press",
    size === "md" ? "size-[46px] text-lg" : "size-10 text-sm",
  )
  return (
    <div className={cn("flex items-center", size === "md" ? "gap-2.5" : "gap-2")}>
      <button type="button" onClick={onPrev} aria-label={prevLabel} aria-controls={controls} className={cls}>
        <Icon icon={size === "md" ? faArrowLeft : faChevronLeft} />
      </button>
      <button type="button" onClick={onNext} aria-label={nextLabel} aria-controls={controls} className={cls}>
        <Icon icon={size === "md" ? faArrowRight : faChevronRight} />
      </button>
    </div>
  )
}

/** Indicador de posição (os tracinhos): os itens visíveis ficam longos e roxos. */
export function CarouselDots({ count, index, visible, size = "md" }: { count: number; index: number; visible: number; size?: "sm" | "md" }) {
  return (
    <div className="flex flex-wrap gap-2" aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const on = i >= index && i < index + visible
        return (
          <span
            key={i}
            className={cn(
              "border-2 transition-all duration-300",
              size === "md" ? "h-1.5" : "h-[5px]",
              on
                ? cn("border-white bg-main", size === "md" ? "w-10" : "w-6")
                : cn("border-line-2 bg-transparent", size === "md" ? "w-[18px]" : "w-3"),
            )}
          />
        )
      })}
    </div>
  )
}

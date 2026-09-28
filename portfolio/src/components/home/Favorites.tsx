import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import {
  faBook,
  faCompactDisc,
  faDragon,
  faFilm,
  faGamepad,
  faHeart,
  faScrewdriverWrench,
  faTv,
} from "@fortawesome/free-solid-svg-icons"

import { CarouselArrows } from "@/components/common/CarouselArrows"
import { Icon } from "@/components/common/Icon"
import { useCarousel } from "@/components/common/useCarousel"
import { FAVORITES, HOME, type FavoriteKind } from "@/data/home"
import { useDict } from "@/i18n/lang"
import { cn } from "@/lib/utils"

const KIND_ICONS: Record<FavoriteKind, IconDefinition> = {
  album: faCompactDisc,
  movie: faFilm,
  anime: faDragon,
  book: faBook,
  tool: faScrewdriverWrench,
  game: faGamepad,
  series: faTv,
}

// capas de placeholder alternam o listrado para a fileira não ficar chapada
const STRIPES = [
  "bg-[repeating-linear-gradient(135deg,#2a1940_0_8px,#1e1230_8px_16px)]",
  "bg-[repeating-linear-gradient(90deg,#261739_0_7px,#1c1129_7px_14px)]",
  "bg-[repeating-linear-gradient(45deg,#2d1a45_0_6px,#20122f_6px_12px)]",
]

/** Linha de favoritos: mini-carrossel de capas 2:3 com tag de categoria e título. */
export function Favorites() {
  const t = useDict(HOME)
  const carousel = useCarousel<HTMLUListElement>()

  return (
    <div className="mt-[34px]">
      <div className="mb-3.5 flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
          <Icon icon={faHeart} className="text-main" />
          <h3 className="m-0 text-xs font-bold tracking-[0.14em] text-lilac uppercase">{t.favTitle}</h3>
          <span className="hidden text-xs text-lilac-3 tab:inline">{t.favSub}</span>
        </div>
        <CarouselArrows
          size="sm"
          onPrev={() => carousel.go(-1, 3)}
          onNext={() => carousel.go(1, 3)}
          canPrev={carousel.canPrev}
          canNext={carousel.canNext}
          prevLabel={t.prevFavs}
          nextLabel={t.nextFavs}
          controls="favorites-track"
        />
      </div>

      <ul
        id="favorites-track"
        ref={carousel.ref}
        tabIndex={0}
        aria-label={t.favTitle}
        className="-mx-5 -mt-1 flex snap-x snap-mandatory list-none gap-3 overflow-x-auto scroll-smooth scroll-px-5 px-5 pt-1 pb-3.5 [scrollbar-width:none] desk:mx-0 desk:scroll-px-0 desk:gap-4 desk:px-0 desk:pr-2 [&::-webkit-scrollbar]:hidden"
      >
        {FAVORITES.map((f, i) => (
          <li
            key={`${f.kind}-${f.title}`}
            className="w-[116px] flex-none snap-start border-3 border-white bg-panel nb-4 desk:w-[136px]"
          >
            <div className={cn("relative grid aspect-[2/3] place-items-center overflow-hidden border-b-3 border-white", !f.cover && STRIPES[i % 3])}>
              {f.cover ? (
                <img src={f.cover} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
              ) : (
                <Icon icon={KIND_ICONS[f.kind]} className="text-3xl text-line-3" />
              )}
              <span className="absolute top-1.5 left-1.5 border-2 border-line-2 bg-ink px-1.5 py-[3px] text-[9px] leading-none font-bold tracking-[0.08em] text-lilac uppercase">
                {t.favKinds[f.kind]}
              </span>
            </div>
            <div className="px-2.5 py-2">
              <p title={f.title} className="m-0 truncate text-sm leading-[1.3] font-bold">
                {f.title}
              </p>
              <p title={f.author} className="m-0 mt-0.5 truncate text-xs leading-[1.3] text-lilac-3">
                {f.author}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

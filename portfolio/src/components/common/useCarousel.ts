import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Estado de um carrossel feito com scroll nativo (scroll-snap): funciona com
 * swipe no celular, trackpad/shift+roda no desktop e setas via `prev`/`next`.
 * Os itens são os filhos diretos do elemento em `ref`.
 */
export function useCarousel<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [state, setState] = useState({ index: 0, visible: 1, count: 0, canPrev: false, canNext: false })

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    const items = Array.from(el.children) as HTMLElement[]
    if (!items.length) return
    const step = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : items[0].offsetWidth
    const index = Math.round(el.scrollLeft / step)
    const visible = Math.max(1, Math.floor((el.clientWidth + 1) / step))
    const max = el.scrollWidth - el.clientWidth
    setState({
      index: Math.min(index, items.length - 1),
      visible,
      count: items.length,
      canPrev: el.scrollLeft > 4,
      canNext: el.scrollLeft < max - 4,
    })
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    measure()
    el.addEventListener("scroll", measure, { passive: true })
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => {
      el.removeEventListener("scroll", measure)
      ro.disconnect()
    }
  }, [measure])

  /** Anda `pages` "telas" (padrão: um item por vez). */
  const go = useCallback((dir: 1 | -1, byItems = 1) => {
    const el = ref.current
    if (!el) return
    const items = Array.from(el.children) as HTMLElement[]
    const step = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : el.clientWidth
    el.scrollBy({ left: dir * step * byItems, behavior: "smooth" })
  }, [])

  return { ref, ...state, go }
}

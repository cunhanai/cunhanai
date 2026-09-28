import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Estado de um carrossel feito com scroll nativo (scroll-snap): swipe com o dedo
 * no celular, trackpad/shift+roda no desktop e setas via `go`. As setas dão a
 * volta: depois do último item vão para o primeiro, e antes do primeiro, para o
 * último. Os itens são os filhos diretos do elemento em `ref`.
 */
export function useCarousel<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [state, setState] = useState({ index: 0, visible: 1, count: 0 })

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    const items = Array.from(el.children) as HTMLElement[]
    if (!items.length) return
    const step = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : items[0].offsetWidth
    const visible = Math.max(1, Math.floor((el.clientWidth + 1) / step))
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4
    // no fim do trilho, o último grupo visível conta como posição atual
    const index = atEnd ? Math.max(0, items.length - visible) : Math.round(el.scrollLeft / step)
    setState({ index: Math.min(index, items.length - 1), visible, count: items.length })
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

  /** Anda `byItems` itens na direção `dir`, dando a volta nas pontas. */
  const go = useCallback((dir: 1 | -1, byItems = 1) => {
    const el = ref.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    if (dir === 1 && el.scrollLeft >= max - 4) return el.scrollTo({ left: 0, behavior: "smooth" })
    if (dir === -1 && el.scrollLeft <= 4) return el.scrollTo({ left: max, behavior: "smooth" })
    const items = Array.from(el.children) as HTMLElement[]
    const step = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : el.clientWidth
    el.scrollBy({ left: dir * step * byItems, behavior: "smooth" })
  }, [])

  return { ref, ...state, go }
}

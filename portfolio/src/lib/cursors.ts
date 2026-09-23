import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import {
  faArrowPointer,
  faHandPointer,
} from "@fortawesome/free-solid-svg-icons"

/**
 * Cursores customizados do design, gerados a partir dos ícones do Font Awesome
 * (arrow-pointer e hand-pointer): miolo branco, contorno escuro e uma cópia
 * roxa deslocada fazendo a sombra neobrutalista.
 */
function cursorFrom(icon: IconDefinition, size: number, hotspot: [number, number], fallback: string) {
  const [w, h, , , path] = icon.icon
  const d = Array.isArray(path) ? path.join(" ") : path
  const scale = size / h
  const pad = 2
  const shadow = 2.5
  const W = Math.ceil(w * scale + pad * 2 + shadow)
  const H = Math.ceil(size + pad * 2 + shadow)
  const stroke = 2 / scale
  const shape = (dx: number, fill: string, extra = "") =>
    `<path d='${d}' transform='translate(${pad + dx} ${pad + dx}) scale(${scale})' fill='${fill}' ${extra}/>`
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}'>` +
    shape(shadow, "#A74DE1") +
    shape(0, "#ffffff", `stroke='#170d24' stroke-width='${stroke}' stroke-linejoin='miter' paint-order='stroke'`) +
    `</svg>`
  const url = `data:image/svg+xml,${encodeURIComponent(svg)}`
  return `url("${url}") ${hotspot[0]} ${hotspot[1]}, ${fallback}`
}

export function installCursors() {
  const root = document.documentElement.style
  root.setProperty("--cursor-default", cursorFrom(faArrowPointer, 22, [3, 3], "auto"))
  root.setProperty("--cursor-pointer", cursorFrom(faHandPointer, 24, [10, 3], "pointer"))
}

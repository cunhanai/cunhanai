import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import {
  faArrowPointer,
  faHandPointer,
  faICursor,
} from "@fortawesome/free-solid-svg-icons"

/**
 * Cursores customizados do design, gerados a partir dos ícones do Font Awesome
 * (arrow-pointer, hand-pointer e i-cursor): miolo branco, contorno escuro e uma cópia
 * roxa deslocada fazendo a sombra neobrutalista.
 */
function cursorFrom(icon: IconDefinition, size: number, hotspot: [number, number], fallback: string) {
  const [w, h, , , path] = icon.icon
  const d = Array.isArray(path) ? path.join(" ") : path
  const scale = size / h
  const pad = 3
  const shadow = 2.5
  const W = Math.ceil(w * scale + pad * 2 + shadow)
  const H = Math.ceil(size + pad * 2 + shadow)
  // contorno escuro de 3px (antes 2px)
  const stroke = 3 / scale
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
  root.setProperty("--cursor-default", cursorFrom(faArrowPointer, 22, [4, 4], "auto"))
  root.setProperty("--cursor-pointer", cursorFrom(faHandPointer, 24, [11, 4], "pointer"))
  // cursor de texto: hotspot no meio da barra
  root.setProperty("--cursor-text", cursorFrom(faICursor, 24, [9, 15], "text"))
}

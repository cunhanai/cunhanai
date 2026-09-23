import { FontAwesomeIcon, type FontAwesomeIconProps } from "@fortawesome/react-fontawesome"

/** Ícone decorativo (aria-hidden) — a maioria dos ícones do site acompanha texto. */
export function Icon(props: FontAwesomeIconProps) {
  return <FontAwesomeIcon aria-hidden {...props} />
}

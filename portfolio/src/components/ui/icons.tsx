// Ícones usados pelos componentes do neobrutalism.dev, trocados de lucide-react
// para Font Awesome. Mesma API (className), para os componentes ficarem iguais ao upstream.
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome"
import {
  faCheck,
  faChevronDown,
  faChevronRight,
  faChevronUp,
  faCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"

type Props = Omit<FontAwesomeIconProps, "icon">

const make = (icon: IconDefinition) =>
  function Icon(props: Props) {
    return <FontAwesomeIcon icon={icon} aria-hidden {...props} />
  }

export const X = make(faXmark)
export const Check = make(faCheck)
export const ChevronDown = make(faChevronDown)
export const ChevronUp = make(faChevronUp)
export const ChevronRight = make(faChevronRight)
export const Circle = make(faCircle)

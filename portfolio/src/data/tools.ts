import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import {
  faClock,
  faCode,
  faCodeCompare,
  faFingerprint,
  faFont,
  faHashtag,
  faLock,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons"

export type ToolId = "case" | "count" | "json" | "uuid" | "b64" | "diff" | "time" | "csv"

export const TOOL_IDS: ToolId[] = ["case", "count", "json", "uuid", "b64", "diff", "time", "csv"]

/** Ícones das ferramentas (no protótipo eram glifos de texto: Aa, #, {}, ID, 64, ±, ⏱, ⇄). */
export const TOOL_ICONS: Record<ToolId, IconDefinition> = {
  case: faFont,
  count: faHashtag,
  json: faCode,
  uuid: faFingerprint,
  b64: faLock,
  diff: faCodeCompare,
  time: faClock,
  csv: faTableCells,
}

export function isToolId(value: string): value is ToolId {
  return (TOOL_IDS as string[]).includes(value)
}

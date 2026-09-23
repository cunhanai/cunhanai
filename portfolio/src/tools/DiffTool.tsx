import { useMemo, useState } from "react"

import type { ToolsDict } from "@/data/toolsPage"
import { Field, FieldLabel, IO } from "@/tools/fields"
import { lcsDiff } from "@/tools/lib"
import { cn } from "@/lib/utils"

export function DiffTool({ t }: { t: ToolsDict }) {
  const [a, setA] = useState("")
  const [b, setB] = useState("")
  const rows = useMemo(() => (a || b ? lcsDiff(a, b) : []), [a, b])

  return (
    <div>
      <IO>
        <div>
          <FieldLabel htmlFor="diff-a">{t.original}</FieldLabel>
          <Field id="diff-a" value={a} onChange={(e) => setA(e.target.value)} className="text-sm" />
        </div>
        <div>
          <FieldLabel htmlFor="diff-b">{t.modified}</FieldLabel>
          <Field id="diff-b" value={b} onChange={(e) => setB(e.target.value)} className="text-sm" />
        </div>
      </IO>
      <div className="mt-4 max-h-[300px] overflow-auto border-3 border-white bg-ink" aria-live="polite">
        {rows.map(([mark, text], i) => (
          <div
            key={i}
            className={cn(
              "border-b-2 border-line px-3 py-[7px] font-mono text-sm leading-[1.45] break-words whitespace-pre-wrap",
              mark === "+" && "bg-[rgba(64,255,150,.10)] text-[#d9ffe8]",
              mark === "-" && "bg-alert/10 text-[#ffd6ea]",
              mark === "=" && "text-[#cbbbe4]",
            )}
          >
            <span className="inline-block w-[22px] font-bold text-lilac-3" aria-label={mark === "+" ? "adicionado" : mark === "-" ? "removido" : undefined}>
              {mark === "=" ? " " : mark}
            </span>
            {text || " "}
          </div>
        ))}
      </div>
    </div>
  )
}

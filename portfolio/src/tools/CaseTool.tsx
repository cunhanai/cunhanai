import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"

import { Icon } from "@/components/common/Icon"
import { Button } from "@/components/ui/button"
import type { ToolsDict } from "@/data/toolsPage"
import { Field, FieldLabel, IO, Toolbar } from "@/tools/fields"
import { CASE_MODES, convertCase, type CaseMode } from "@/tools/lib"

export function CaseTool({
  t,
  text,
  setText,
  mode,
  setMode,
}: {
  t: ToolsDict
  text: string
  setText: (v: string) => void
  mode: CaseMode
  setMode: (m: CaseMode) => void
}) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(undefined)
  const out = convertCase(text, mode)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(out)
    } catch {
      /* sem permissão de clipboard */
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div>
      <Toolbar className="gap-2">
        {CASE_MODES.map(([id, label]) => (
          <Button
            key={id}
            variant="chip"
            size="sm"
            aria-pressed={id === mode}
            onClick={() => {
              setMode(id)
              setCopied(false)
            }}
            className="h-11"
          >
            {label}
          </Button>
        ))}
      </Toolbar>
      <IO>
        <div>
          <FieldLabel htmlFor="case-in">{t.input}</FieldLabel>
          <Field id="case-in" value={text} onChange={(e) => setText(e.target.value)} placeholder={t.phText} spellCheck />
        </div>
        <div>
          <FieldLabel htmlFor="case-out">{t.output}</FieldLabel>
          <Field id="case-out" output value={out} />
          <Button onClick={copy} className="mt-2.5">
            <Icon icon={copied ? faCheck : faCopy} />
            <span aria-live="polite">{copied ? t.copied : t.copy}</span>
          </Button>
        </div>
      </IO>
    </div>
  )
}

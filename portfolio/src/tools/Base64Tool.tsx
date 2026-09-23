import { useState } from "react"

import { Button } from "@/components/ui/button"
import type { ToolsDict } from "@/data/toolsPage"
import { Field, FieldLabel, IO, Toolbar } from "@/tools/fields"
import { b64Decode, b64Encode } from "@/tools/lib"

export function Base64Tool({ t }: { t: ToolsDict }) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const run = (fn: (s: string) => string) => {
    try {
      setOutput(fn(input))
    } catch (err) {
      setOutput("⚠ " + (err as Error).message)
    }
  }

  return (
    <div>
      <Toolbar className="gap-2">
        <Button onClick={() => run(b64Encode)}>{t.encode}</Button>
        <Button variant="neutral" onClick={() => run(b64Decode)}>
          {t.decode}
        </Button>
      </Toolbar>
      <IO>
        <div>
          <FieldLabel htmlFor="b64-in">{t.input}</FieldLabel>
          <Field id="b64-in" value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.phText} className="text-sm" />
        </div>
        <div>
          <FieldLabel htmlFor="b64-out">{t.output}</FieldLabel>
          <Field id="b64-out" output value={output} className="text-sm" />
        </div>
      </IO>
    </div>
  )
}

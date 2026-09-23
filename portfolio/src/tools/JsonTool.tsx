import { useState } from "react"

import { Button } from "@/components/ui/button"
import type { ToolsDict } from "@/data/toolsPage"
import { Field, FieldLabel, FieldSelect, IO, Toolbar } from "@/tools/fields"

const INDENTS = [
  { value: "2", label: "2 spaces" },
  { value: "4", label: "4 spaces" },
  { value: "tab", label: "Tab" },
]

export function JsonTool({ t }: { t: ToolsDict }) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [indent, setIndent] = useState("2")

  const run = (minify: boolean) => {
    try {
      const parsed = JSON.parse(input)
      setOutput(minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent === "tab" ? "\t" : Number(indent)))
      setError("")
    } catch (err) {
      setOutput("")
      setError((err as Error).message)
    }
  }

  return (
    <div>
      <Toolbar className="gap-2">
        <Button onClick={() => run(false)}>{t.format}</Button>
        <Button variant="neutral" onClick={() => run(true)}>
          {t.minify}
        </Button>
        <FieldSelect label={t.indent} value={indent} onChange={setIndent} items={INDENTS} />
      </Toolbar>
      <IO>
        <div>
          <FieldLabel htmlFor="json-in">{t.input}</FieldLabel>
          <Field
            id="json-in"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"hello": "world"}'
            aria-invalid={!!error || undefined}
            aria-describedby={error ? "json-err" : undefined}
            className="font-mono text-sm"
          />
        </div>
        <div>
          <FieldLabel htmlFor="json-out">{t.output}</FieldLabel>
          <Field id="json-out" output value={output} className="font-mono text-sm" />
          <div
            id="json-err"
            role="alert"
            className={
              error
                ? "mt-2.5 border-l-[5px] border-alert bg-alert/10 px-3 py-2 text-[13px] font-semibold text-[#ffd0f0]"
                : "hidden"
            }
          >
            {error}
          </div>
        </div>
      </IO>
    </div>
  )
}

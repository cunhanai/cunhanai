import { useState } from "react"

import { Button } from "@/components/ui/button"
import type { ToolsDict } from "@/data/toolsPage"
import { Field, FieldLabel, FieldSelect, IO, Toolbar } from "@/tools/fields"
import { parseCsv } from "@/tools/lib"

const DELIMS = [
  { value: ",", label: "," },
  { value: ";", label: ";" },
  { value: "\t", label: "Tab" },
  { value: "|", label: "|" },
]

export function CsvTool({ t }: { t: ToolsDict }) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [delim, setDelim] = useState(",")

  const run = () => {
    try {
      setOutput(JSON.stringify(parseCsv(input, delim), null, 2))
    } catch (err) {
      setOutput("⚠ " + (err as Error).message)
    }
  }

  return (
    <div>
      <Toolbar>
        <span className="flex items-center gap-[9px] text-[13px] text-lilac-2">
          {t.delimiter}
          <FieldSelect label={t.delimiter} value={delim} onChange={setDelim} items={DELIMS} />
        </span>
        <Button onClick={run}>{t.convert}</Button>
      </Toolbar>
      <IO>
        <div>
          <FieldLabel htmlFor="csv-in">{t.input}</FieldLabel>
          <Field id="csv-in" value={input} onChange={(e) => setInput(e.target.value)} placeholder={"nome,idade\nAna,29"} className="font-mono text-sm" />
        </div>
        <div>
          <FieldLabel htmlFor="csv-out">{t.output}</FieldLabel>
          <Field id="csv-out" output value={output} className="font-mono text-sm" />
        </div>
      </IO>
    </div>
  )
}

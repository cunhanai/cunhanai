import type { ToolsDict } from "@/data/toolsPage"
import { Field, FieldLabel } from "@/tools/fields"
import { textCounts } from "@/tools/lib"

export function CountTool({ t, text, setText }: { t: ToolsDict; text: string; setText: (v: string) => void }) {
  const values = textCounts(text)
  return (
    <div>
      <FieldLabel htmlFor="count-in" className="sr-only">
        {t.input}
      </FieldLabel>
      <Field id="count-in" value={text} onChange={(e) => setText(e.target.value)} placeholder={t.phText} spellCheck />
      <dl className="m-0 mt-4 grid grid-cols-2 gap-3" aria-live="polite">
        {t.counts.map((label, i) => (
          <div key={label} className="flex flex-col-reverse border-3 border-white bg-ink p-3.5">
            <dt className="mt-1 text-[11px] font-bold tracking-[0.09em] text-lilac-2 uppercase">{label}</dt>
            <dd className="m-0 font-display text-[32px] leading-none font-bold">
              {i === 5 ? `${values[i]} min` : values[i]}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

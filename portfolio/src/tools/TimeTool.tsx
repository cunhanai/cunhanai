import { faClock } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

import { Icon } from "@/components/common/Icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ToolsDict } from "@/data/toolsPage"
import { useLang } from "@/i18n/lang"
import { Toolbar } from "@/tools/fields"
import { parseTimestamp, relativeTime } from "@/tools/lib"

const nowSeconds = () => String(Math.floor(Date.now() / 1000))

export function TimeTool({ t }: { t: ToolsDict }) {
  const { lang } = useLang()
  const [input, setInput] = useState(nowSeconds)
  const d = parseTimestamp(input)

  const rows: { label: string; value: string }[] =
    d === null
      ? []
      : d === undefined
        ? [{ label: "—", value: t.invalidDate }]
        : [
            String(Math.floor(d.getTime() / 1000)),
            String(d.getTime()),
            d.toISOString(),
            d.toLocaleString(lang === "pt" ? "pt-BR" : "en-US"),
            relativeTime(d, lang),
          ].map((value, i) => ({ label: t.tsLabels[i], value }))

  return (
    <div>
      <Toolbar className="mb-4">
        <Input
          aria-label={t.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="1789000000 · 2026-09-11T10:00:00Z"
          className="h-12 min-w-[200px] flex-1 border-3 border-line-2 bg-ink px-3 text-[15px]"
        />
        <Button onClick={() => setInput(nowSeconds())}>
          <Icon icon={faClock} />
          {t.now}
        </Button>
      </Toolbar>
      <dl className="m-0 grid grid-cols-1 gap-3">
        {rows.map((r) => (
          <div key={r.label} className="border-3 border-white bg-ink px-[15px] py-[13px]">
            <dt className="text-[11px] font-bold tracking-[0.09em] text-main uppercase">{r.label}</dt>
            <dd className="m-0 mt-[5px] text-base break-all text-white">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

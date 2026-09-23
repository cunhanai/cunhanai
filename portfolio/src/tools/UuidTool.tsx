import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

import { Icon } from "@/components/common/Icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ToolsDict } from "@/data/toolsPage"
import { Toolbar } from "@/tools/fields"
import { uuid4 } from "@/tools/lib"

const make = (n: number) => Array.from({ length: n }, uuid4)

export function UuidTool({ t }: { t: ToolsDict }) {
  const [count, setCount] = useState(5)
  const [uuids, setUuids] = useState(() => make(5))

  return (
    <div>
      <Toolbar>
        <Button onClick={() => setUuids(make(count))}>
          <Icon icon={faArrowsRotate} />
          {t.generate}
        </Button>
        <label className="flex items-center gap-[9px] text-[13px] text-lilac-2">
          {t.quantity}
          <Input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
            className="h-11 w-[74px] border-3 border-line-2 bg-ink px-2.5 text-sm font-semibold"
          />
        </label>
      </Toolbar>
      <ul className="m-0 max-h-[260px] list-none overflow-auto border-3 border-white bg-ink p-0">
        <AnimatePresence initial={false}>
          {uuids.map((u) => (
            <motion.li
              key={u}
              layout
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18 }}
              className="border-b-2 border-line px-3.5 py-3 font-mono text-sm tracking-[0.02em] break-all text-soft-3 select-all"
            >
              {u}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}

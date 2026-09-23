import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { motion } from "motion/react"
import { useEffect, useState, type ReactNode } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { Container } from "@/components/common/Container"
import { Grain } from "@/components/common/Grain"
import { Icon } from "@/components/common/Icon"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { COMMON } from "@/data/common"
import { isToolId, TOOL_ICONS, TOOL_IDS, type ToolId } from "@/data/tools"
import { TOOLS_PAGE, type ToolsDict } from "@/data/toolsPage"
import { useDict } from "@/i18n/lang"
import { cn } from "@/lib/utils"
import { Base64Tool } from "@/tools/Base64Tool"
import { CaseTool } from "@/tools/CaseTool"
import { CountTool } from "@/tools/CountTool"
import { CsvTool } from "@/tools/CsvTool"
import { DiffTool } from "@/tools/DiffTool"
import { JsonTool } from "@/tools/JsonTool"
import type { CaseMode } from "@/tools/lib"
import { TimeTool } from "@/tools/TimeTool"
import { UuidTool } from "@/tools/UuidTool"

/** Lista de ferramentas — usada na sidebar (desktop) e no menu mobile. */
function ToolList({ t, active, onPick, size = "sm" }: { t: ToolsDict; active: ToolId; onPick: (id: ToolId) => void; size?: "sm" | "md" }) {
  return (
    <ul className="m-0 list-none p-0">
      {TOOL_IDS.map((id) => {
        const on = id === active
        const [name, desc] = t.tools[id]
        return (
          <li key={id}>
            <button
              type="button"
              onClick={() => onPick(id)}
              aria-current={on || undefined}
              className={cn(
                "flex w-full items-center gap-3 border-0 border-b-2 border-line px-3.5 py-3 text-left font-sans text-white transition-colors",
                on ? "bg-main" : "bg-transparent hover:bg-panel-2",
              )}
            >
              <span aria-hidden className="grid size-[34px] flex-none place-items-center border-2 border-line-2 bg-ink text-[13px] text-lilac">
                <Icon icon={TOOL_ICONS[id]} />
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn("block leading-[1.25] font-bold", size === "md" ? "text-[15px]" : "text-sm")}>{name}</span>
                <span className={cn("mt-0.5 block text-xs", on ? "text-[#f6f0ff]" : "text-lilac-3")}>{desc}</span>
              </span>
              <span className={cn("grid w-5 flex-none place-items-center", !on && "invisible")}>
                <Icon icon={faCheck} />
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

/**
 * Painel de uma ferramenta. Todos ficam montados (o estado de cada um sobrevive à troca);
 * o ativo entra com fade + 6px de subida.
 */
function Panel({ active, children }: { active: boolean; children: ReactNode }) {
  return (
    <motion.div
      hidden={!active}
      initial={false}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export default function Tools() {
  const t = useDict(TOOLS_PAGE)
  const c = useDict(COMMON)
  const { hash } = useLocation()
  const navigate = useNavigate()

  const fromHash = hash.slice(1)
  const tool: ToolId = isToolId(fromHash) ? fromHash : "case"

  // estado compartilhado entre conversor de caixa e contador (mesmo texto, como no protótipo)
  const [text, setText] = useState("")
  const [caseMode, setCaseMode] = useState<CaseMode>("upper")

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  const pick = (id: ToolId) => navigate({ hash: id }, { replace: true })
  const [name, desc] = t.tools[tool]

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink">
      <Grain />
      <SiteHeader
        page="tools"
        mobileExtra={(close) => (
          <>
            <div className="mt-[26px] text-[11px] font-bold tracking-[0.16em] text-main uppercase">{c.navTools}</div>
            <div className="mt-2.5 border-3 border-white bg-panel">
              <ToolList
                t={t}
                active={tool}
                size="md"
                onPick={(id) => {
                  pick(id)
                  close()
                }}
              />
            </div>
          </>
        )}
      />

      <main className="relative z-[1] pt-[30px] pb-20">
        <Container variant="tools">
          <div className="mb-2 flex items-baseline gap-3.5">
            <span className="font-display text-[15px] font-bold text-main">03</span>
            <h1 className="m-0 font-display text-[34px] font-bold tracking-[-0.02em] min-[900px]:text-[44px]">{t.title}</h1>
          </div>
          <p className="mb-[26px] max-w-[56ch] text-[15px] leading-relaxed text-pretty text-lilac-2">{t.lead}</p>

          <div className="grid grid-cols-1 gap-4 min-[900px]:grid-cols-[264px_minmax(0,1fr)] min-[900px]:items-start min-[900px]:gap-[34px]">
            <nav aria-label={c.navTools} className="sticky top-[86px] z-30 hidden min-w-0 min-[900px]:block">
              <div className="border-3 border-white bg-panel nb-6">
                <ToolList t={t} active={tool} onPick={pick} />
              </div>
            </nav>

            <section aria-labelledby="tool-title" className="min-w-0 border-3 border-white bg-panel p-4 nb-6 tab:p-[22px] tab:nb-10">
              <h2 id="tool-title" className="m-0 font-display text-[27px] font-bold tracking-[-0.01em]">
                {name}
              </h2>
              <p className="mt-1.5 mb-[18px] text-sm text-lilac-2">{desc}</p>

              <Panel active={tool === "case"}>
                <CaseTool t={t} text={text} setText={setText} mode={caseMode} setMode={setCaseMode} />
              </Panel>
              <Panel active={tool === "count"}>
                <CountTool t={t} text={text} setText={setText} />
              </Panel>
              <Panel active={tool === "json"}>
                <JsonTool t={t} />
              </Panel>
              <Panel active={tool === "uuid"}>
                <UuidTool t={t} />
              </Panel>
              <Panel active={tool === "b64"}>
                <Base64Tool t={t} />
              </Panel>
              <Panel active={tool === "diff"}>
                <DiffTool t={t} />
              </Panel>
              <Panel active={tool === "time"}>
                <TimeTool t={t} />
              </Panel>
              <Panel active={tool === "csv"}>
                <CsvTool t={t} />
              </Panel>

              <p className="mt-5 text-xs text-lilac-3">{t.privacy}</p>
            </section>
          </div>
        </Container>
      </main>
    </div>
  )
}

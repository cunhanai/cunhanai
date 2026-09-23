import { faDiamond } from "@fortawesome/free-solid-svg-icons"
import { motion } from "motion/react"
import { Fragment } from "react"

import { Icon } from "@/components/common/Icon"
import { TECH_STRIP } from "@/data/home"

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex items-center gap-[34px] px-[34px] py-[13px] font-display text-[19px] whitespace-nowrap text-lilac italic"
    >
      {TECH_STRIP.map((tech) => (
        <Fragment key={tech}>
          <span>{tech}</span>
          <Icon icon={faDiamond} className="text-[11px] text-line-3" />
        </Fragment>
      ))}
    </div>
  )
}

/** Faixa de tecnologias rolando em loop (conteúdo duplicado + translateX(-50%)). */
export function TechStrip() {
  return (
    <div className="overflow-hidden border-y-3 border-line bg-strip">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 26, ease: "linear", repeat: Infinity }}
      >
        <Row />
        <Row hidden />
      </motion.div>
    </div>
  )
}

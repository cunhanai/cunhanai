import { motion, useScroll, useSpring } from "motion/react"

/** Barra de progresso de leitura, 3px no topo. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 })
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] bg-line">
      <motion.div className="h-full origin-left bg-main" style={{ scaleX }} />
    </div>
  )
}

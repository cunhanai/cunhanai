import { motion, type HTMLMotionProps } from "motion/react"

/**
 * Reveal no scroll: fade + 16px de subida, uma vez só, escalonado em 60ms por `index`.
 * Fica num wrapper próprio para não brigar com o transform do hover (nb-press) do filho.
 */
export function Reveal({ index = 0, ...props }: HTMLMotionProps<"div"> & { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1], delay: index * 0.06 }}
      {...props}
    />
  )
}

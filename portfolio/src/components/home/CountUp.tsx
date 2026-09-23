import { animate, useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"

/** Número que conta de 0 até `value` quando entra na tela. */
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setShown(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.2, 0.7, 0.3, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, reduce])

  return <span ref={ref}>{shown}</span>
}

import { MotionConfig } from "motion/react"
import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

import { LangProvider } from "@/i18n/lang"
import Home from "@/pages/Home"

const Tools = lazy(() => import("@/pages/Tools"))

export default function App() {
  return (
    <LangProvider>
      {/* respeita prefers-reduced-motion em todas as animações do Motion */}
      <MotionConfig reducedMotion="user">
        <Suspense fallback={<div className="min-h-screen bg-ink" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </MotionConfig>
    </LangProvider>
  )
}

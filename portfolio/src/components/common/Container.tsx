import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

/** Largura de conteúdo. "home" segue a Home (440 → 1120px); "tools" a página de ferramentas (720 → 1200px). */
export function Container({ variant = "home", className, ...props }: ComponentProps<"div"> & { variant?: "home" | "tools" }) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        variant === "home"
          ? "max-w-[440px] px-5 desk:max-w-[1120px] desk:px-10"
          : "max-w-full px-4 tab:max-w-[720px] tab:px-6 min-[900px]:max-w-[1200px] min-[900px]:px-10",
        className,
      )}
      {...props}
    />
  )
}

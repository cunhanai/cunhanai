import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import * as React from "react"

import { cn } from "@/lib/utils"

// Variantes do neobrutalism.dev ajustadas ao design: borda de 3px, sombra via
// utilitários nb-* (src/index.css) e física de hover/press do DEPENDENCIES.md.
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-base text-sm font-bold font-sans transition-all gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50",
  {
    variants: {
      variant: {
        // roxo com sombra branca (data-press="light" no protótipo)
        default:
          "text-main-foreground bg-main border-3 border-border nb-4 nb-light nb-press",
        // transparente com sombra roxa (data-press="dark")
        neutral:
          "bg-transparent text-foreground border-3 border-border nb-4 nb-press",
        noShadow: "text-main-foreground bg-main border-3 border-border",
        // chips de modo: sem sombra, borda escura quando inativo
        chip: "min-h-11 px-3.5 tracking-wide border-3 border-line-2 bg-transparent text-foreground hover:border-lilac-3 aria-pressed:bg-main aria-pressed:border-border",
        ghost:
          "bg-transparent text-foreground border-2 border-line-2 hover:border-lilac-3",
      },
      size: {
        default: "h-11 px-4.5 py-2.5 text-[13px]",
        sm: "h-10 px-4 text-[13px]",
        lg: "h-12 px-5 text-sm",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ButtonPrimitive> &
  VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

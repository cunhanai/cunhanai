import type { ComponentProps, ReactNode } from "react"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

/** Rótulo pequeno em caixa alta, roxo. */
export function FieldLabel({ className, ...props }: ComponentProps<typeof Label>) {
  return (
    <Label
      className={cn("mb-[7px] block text-[11px] font-bold tracking-[0.1em] text-main uppercase", className)}
      {...props}
    />
  )
}

/** Textarea de entrada (fundo escuro) ou de saída (`output`, borda branca, somente leitura). */
export function Field({ output, className, ...props }: ComponentProps<typeof Textarea> & { output?: boolean }) {
  return (
    <Textarea
      readOnly={output}
      spellCheck={false}
      className={cn(
        "h-[150px] min-h-[80px] resize-y border-3 p-3 text-[15px] leading-normal font-normal tab:h-[190px]",
        output ? "border-white bg-panel-2" : "border-line-2 bg-ink",
        className,
      )}
      {...props}
    />
  )
}

/** Duas colunas no desktop, uma no mobile. */
export function IO({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-3 min-[900px]:grid-cols-2 min-[900px]:gap-[18px]">{children}</div>
}

export function Toolbar({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mb-3.5 flex flex-wrap items-center gap-2.5", className)}>{children}</div>
}

/** Select do neobrutalism.dev (Base UI) com os estilos do design. */
export function FieldSelect({
  value,
  onChange,
  items,
  label,
}: {
  value: string
  onChange: (value: string) => void
  items: { value: string; label: string }[]
  label: string
}) {
  return (
    <Select value={value} onValueChange={(v) => v != null && onChange(v as string)} items={items}>
      <SelectTrigger
        aria-label={label}
        className="h-11 w-auto min-w-[110px] border-3 border-line-2 bg-ink px-3 text-[13px] font-semibold text-white"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-3 border-white bg-panel">
        {items.map((it) => (
          <SelectItem key={it.value} value={it.value} className="cursor-(--cursor-pointer) text-[13px] font-semibold">
            {it.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

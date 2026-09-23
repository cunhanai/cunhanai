import { faGlobe } from "@fortawesome/free-solid-svg-icons"

import { Icon } from "@/components/common/Icon"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { COMMON } from "@/data/common"
import { useDict, useLang, type Lang } from "@/i18n/lang"

const OPTIONS: [Lang, string][] = [
  ["pt", "Português"],
  ["en", "English"],
]

export function LangMenu() {
  const { lang, setLang } = useLang()
  const c = useDict(COMMON)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        title={c.language}
        aria-label={`${c.language}: ${lang.toUpperCase()}`}
        className="flex items-center gap-[7px] border-2 border-main bg-transparent px-[11px] py-[7px] text-xs font-bold tracking-[0.1em] text-white"
      >
        <Icon icon={faGlobe} className="text-[14px] text-lilac" />
        {lang.toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="z-[70] min-w-[150px] border-3 border-border bg-panel p-0 nb-6"
      >
        {OPTIONS.map(([value, label], i) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setLang(value)}
            aria-current={lang === value || undefined}
            lang={value === "pt" ? "pt-BR" : "en"}
            className={
              "cursor-(--cursor-pointer) border-0 px-4 py-[11px] text-[13px] font-semibold text-white data-highlighted:border-0 " +
              (i < OPTIONS.length - 1 ? "border-b-2 border-line data-highlighted:border-b-2" : "")
            }
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

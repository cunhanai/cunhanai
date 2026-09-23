import { faArrowRight, faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useState, type ReactNode } from "react"
import { Link } from "react-router-dom"

import { Container } from "@/components/common/Container"
import { Icon } from "@/components/common/Icon"
import { LangMenu } from "@/components/layout/LangMenu"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { COMMON } from "@/data/common"
import { useDict } from "@/i18n/lang"

type Page = "home" | "tools"
type NavItem = { label: string; hash?: string; to?: string; current?: boolean }

function useNav(page: Page): NavItem[] {
  const c = useDict(COMMON)
  if (page === "home")
    return [
      { label: c.navAbout, hash: "sobre" },
      { label: c.navStack, hash: "stack" },
      { label: c.navProjects, hash: "projetos" },
      { label: c.navTools, hash: "ferramentas" },
    ]
  return [
    { label: c.navHome, to: "/" },
    { label: c.navAbout, to: "/#sobre" },
    { label: c.navStack, to: "/#stack" },
    { label: c.navProjects, to: "/#projetos" },
    { label: c.navTools, current: true },
  ]
}

/** Link da nav: âncora na mesma página, Link do router entre páginas. */
function NavLink({ item, className, onClick, children }: { item: NavItem; className?: string; onClick?: () => void; children: ReactNode }) {
  if (item.current)
    return (
      <span aria-current="page" className={className}>
        {children}
      </span>
    )
  if (item.hash)
    return (
      <a href={`#${item.hash}`} className={className} onClick={onClick}>
        {children}
      </a>
    )
  return (
    <Link to={item.to!} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}

export function SiteHeader({
  page,
  mobileExtra,
}: {
  page: Page
  /** Conteúdo extra no fim do menu mobile; recebe `close` para fechar o menu. */
  mobileExtra?: (close: () => void) => ReactNode
}) {
  const c = useDict(COMMON)
  const nav = useNav(page)
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-60 border-b-3 border-line bg-ink/85 backdrop-blur-[14px]">
      <Container variant={page} className="flex h-[62px] items-center justify-between gap-4">
        <Link to="/" className="font-display text-xl font-bold tracking-[-0.02em] text-white">
          AJC<span className="text-main">.</span>
        </Link>

        <nav className="hidden flex-1 desk:block" aria-label="Principal">
          <ul className="m-0 flex list-none gap-[26px] p-0 text-sm font-semibold">
            {nav.map((item) => (
              <li key={item.label}>
                <NavLink item={item} className={"nb-link " + (item.current ? "text-white" : "text-soft-2 hover:text-white")}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <LangMenu />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label={c.menu}
              className="border-2 border-white bg-main px-[9px] py-2 leading-none text-white desk:hidden"
            >
              <Icon icon={faBars} className="text-[18px]" />
            </SheetTrigger>
            <SheetContent
              side="top"
              showCloseButton={false}
              className="z-80 h-dvh gap-0 overflow-auto border-0 bg-ink"
            >
              <SheetTitle className="sr-only">{c.menu}</SheetTitle>
              <Container variant={page} className="pt-[22px] pb-10">
                <div className="flex justify-end">
                  <SheetClose aria-label={c.close} className="border-2 border-line-2 bg-transparent p-[9px] leading-none text-white">
                    <Icon icon={faXmark} className="text-[18px]" />
                  </SheetClose>
                </div>
                <nav className="mt-[22px] grid gap-1" aria-label={c.menu}>
                  {nav
                    .filter((item) => !item.current)
                    .map((item) => (
                      <NavLink
                        key={item.label}
                        item={item}
                        onClick={close}
                        className="flex items-center justify-between gap-3 border-b-3 border-line px-0.5 py-4 font-display text-[30px] font-bold text-white desk:text-[32px]"
                      >
                        {item.label}
                        <Icon icon={faArrowRight} className="text-[20px] text-main" />
                      </NavLink>
                    ))}
                </nav>
                {mobileExtra?.(close)}
              </Container>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}

import { faArrowUp } from "@fortawesome/free-solid-svg-icons"

import { Container } from "@/components/common/Container"
import { Icon } from "@/components/common/Icon"
import { HOME } from "@/data/home"
import { useDict } from "@/i18n/lang"

export function Footer() {
  const t = useDict(HOME)
  return (
    <footer className="mt-14 border-t-3 border-line pt-6 pb-[34px]">
      <Container className="flex flex-wrap items-center justify-between gap-3.5">
        <span className="text-[13px] text-lilac-3">© 2026 Ana Júlia da Cunha</span>
        <a href="#top" className="flex items-center gap-2 text-xs font-bold tracking-[0.1em] text-lilac-2 uppercase hover:text-white">
          <Icon icon={faArrowUp} className="text-main" />
          {t.backTop}
        </a>
      </Container>
    </footer>
  )
}

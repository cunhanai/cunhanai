import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faArrowRight, faArrowUpRightFromSquare, faFolderOpen, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

import { Container } from "@/components/common/Container"
import { Icon } from "@/components/common/Icon"
import { Reveal } from "@/components/common/Reveal"
import { SectionHeading } from "@/components/common/SectionHeading"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { HOME, LINKS, type Project } from "@/data/home"
import { useDict } from "@/i18n/lang"

const STRIPES = "bg-[repeating-linear-gradient(135deg,#2a1940_0_8px,#1e1230_8px_16px)]"

function Tags({ tags, size = "sm" }: { tags: string[]; size?: "sm" | "md" }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
      {tags.map((tag) => (
        <li
          key={tag}
          className={
            "border-2 border-line-2 text-[11px] font-bold tracking-[0.06em] text-lilac-2 " +
            (size === "sm" ? "px-[9px] py-[5px]" : "px-2.5 py-1.5")
          }
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const t = useDict(HOME)
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="block h-full w-full border-3 border-white bg-panel text-left font-sans text-white nb-8 nb-press"
    >
      <div className={`relative flex h-[150px] items-center justify-center border-b-3 border-white ${STRIPES}`}>
        <span className="text-[10px] font-bold tracking-[0.12em] text-lilac-3 uppercase">{project.shot}</span>
        <span className="absolute top-2.5 left-2.5 border-2 border-line-2 bg-ink px-2 py-[5px] text-[10px] font-bold tracking-[0.08em] text-lilac uppercase">
          {project.kind}
        </span>
      </div>
      <div className="p-[18px]">
        <div className="flex items-baseline justify-between gap-2.5">
          <h3 className="m-0 font-display text-[23px] font-bold tracking-[-0.01em] text-pretty">{project.title}</h3>
          <span className="text-xs font-bold text-main">{project.year}</span>
        </div>
        <p className="mt-2 text-[15px] leading-[1.55] text-pretty text-soft">{project.desc}</p>
        <div className="mt-3.5">
          <Tags tags={project.tags} />
        </div>
        <div className="mt-4 flex items-center gap-2 text-[13px] font-bold text-lilac">
          {t.moreInfo}
          <Icon icon={faArrowRight} />
        </div>
      </div>
    </button>
  )
}

function ProjectDialog({ project, open, onOpenChange }: { project: Project | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  const t = useDict(HOME)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="z-90 block max-h-[86vh] w-[calc(100%-36px)] max-w-[620px] gap-0 overflow-auto border-3 border-white bg-panel p-0 text-white shadow-[12px_12px_0_#A74DE1] sm:max-w-[620px] data-open:slide-in-from-bottom-3"
      >
        {project && (
          <>
            <div className="sticky top-0 flex items-center justify-between gap-3 border-b-3 border-white bg-main px-4 py-3.5">
              <span className="flex items-center gap-[9px] text-xs font-bold tracking-[0.12em] uppercase">
                <Icon icon={faFolderOpen} />
                {project.kind}
              </span>
              <DialogClose aria-label={t.close} className="border-2 border-white bg-ink p-[7px] leading-none text-white">
                <Icon icon={faXmark} className="text-base" />
              </DialogClose>
            </div>
            <div className="px-5 pt-[22px] pb-[26px]">
              <div className="flex items-baseline justify-between gap-3">
                <DialogTitle className="m-0 font-display text-[30px] leading-[1.08] font-bold tracking-[-0.02em] text-pretty">
                  {project.title}
                </DialogTitle>
                <span className="flex-none text-[13px] font-bold text-lilac">{project.year}</span>
              </div>
              <div className={`mt-[18px] flex h-[170px] items-center justify-center border-3 border-white ${STRIPES}`}>
                <span className="text-[10px] font-bold tracking-[0.12em] text-lilac-3 uppercase">{project.shot}</span>
              </div>
              <DialogDescription className="mt-5 text-base leading-[1.65] text-pretty text-soft-3">{project.desc}</DialogDescription>
              {project.blocks.map((text, i) => (
                <div key={t.labels[i]} className="mt-[18px]">
                  <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] text-lilac uppercase">
                    <Icon icon={faArrowRight} className="text-main" />
                    {t.labels[i]}
                  </div>
                  <p className="mt-[7px] text-[15px] leading-relaxed text-pretty text-soft">{text}</p>
                </div>
              ))}
              <div className="mt-5">
                <Tags tags={project.tags} size="md" />
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <a
                  href={project.repo ?? LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-[9px] border-3 border-white bg-main px-[18px] py-3 text-sm font-bold text-white nb-5 nb-light nb-press"
                >
                  <Icon icon={faGithub} className="text-lg" />
                  {t.repo}
                </a>
                <DialogClose className="border-3 border-line-2 bg-transparent px-[18px] py-3 text-sm font-bold text-white hover:border-lilac-3">
                  {t.close}
                </DialogClose>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function Projects() {
  const t = useDict(HOME)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  // mantém o último projeto durante a animação de saída
  const [lastIndex, setLastIndex] = useState(0)

  return (
    <section id="projetos" className="scroll-mt-[74px] pt-14 pb-2.5">
      <Container>
        <SectionHeading icon={faFolderOpen} num="03" title={t.projectsTitle} />
        <p className="mb-[22px] max-w-[56ch] text-[15px] leading-relaxed text-pretty text-lilac-2">{t.projectsLead}</p>

        <div className="grid grid-cols-1 gap-[18px] desk:grid-cols-2 desk:gap-[26px]">
          {t.projects.map((p, i) => (
            <Reveal key={p.title} index={i}>
              <ProjectCard
                project={p}
                onOpen={() => {
                  setLastIndex(i)
                  setOpenIndex(i)
                }}
              />
            </Reveal>
          ))}
        </div>

        <a
          href={LINKS.github}
          target="_blank"
          rel="noreferrer"
          className="mt-[22px] inline-flex items-center gap-2.5 border-3 border-white bg-panel px-5 py-[13px] text-sm font-bold text-white nb-5 nb-press"
        >
          <Icon icon={faGithub} className="text-lg text-lilac" />
          {t.allRepos}
          <Icon icon={faArrowUpRightFromSquare} className="text-[13px]" />
        </a>
      </Container>

      <ProjectDialog
        project={t.projects[openIndex ?? lastIndex]}
        open={openIndex !== null}
        onOpenChange={(open) => !open && setOpenIndex(null)}
      />
    </section>
  )
}

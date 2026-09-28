import type { Lang } from "@/i18n/lang"

export const COMMON: Record<Lang, {
  navHome: string
  navAbout: string
  navStack: string
  navProjects: string
  navTools: string
  ctaTools: string
  menu: string
  close: string
  language: string
}> = {
  pt: {
    navHome: "Início",
    navAbout: "Sobre",
    navStack: "Stack",
    navProjects: "Projetos",
    navTools: "Toolbox",
    ctaTools: "Abrir toolbox",
    menu: "Menu",
    close: "Fechar",
    language: "Idioma",
  },
  en: {
    navHome: "Home",
    navAbout: "About",
    navStack: "Stack",
    navProjects: "Projects",
    navTools: "Toolbox",
    ctaTools: "Open toolbox",
    menu: "Menu",
    close: "Close",
    language: "Language",
  },
}

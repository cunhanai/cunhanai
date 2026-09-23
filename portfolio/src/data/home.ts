import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import {
  faCaretUp,
  faCircle,
  faCode,
  faDatabase,
  faDiamond,
  faPalette,
  faScrewdriverWrench,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons"

import type { Lang } from "@/i18n/lang"
import type { ToolId } from "@/data/tools"

export type FunFact = { icon: IconDefinition; value: number; sub?: string; label: string; accent?: boolean }
export type NowItem = { icon: IconDefinition; label: string; text: string }
export type StackGroup = { icon: IconDefinition; label: string; items: [name: string, daily: boolean][] }
export type Project = {
  kind: string
  shot: string
  year: string
  title: string
  desc: string
  tags: string[]
  blocks: [context: string, what: string, role: string]
  repo?: string
}

export type HomeDict = {
  role: string
  heroLead1: string
  heroLead2: string
  heroSub: string
  ctaProjects: string
  findMe: string
  photoSlot: string
  aboutTitle: string
  aboutP1: string
  aboutP2: string
  langsLabel: string
  langs: { name: string; level: string }[]
  funFacts: FunFact[]
  nowLabel: string
  nowSub: string
  nowItems: NowItem[]
  stackTitle: string
  stackLead: string
  stackDaily: string
  stackKnown: string
  stackGroups: StackGroup[]
  projectsTitle: string
  projectsLead: string
  moreInfo: string
  allRepos: string
  repo: string
  close: string
  toolsTitle: string
  toolsCount: string
  toolsLead: string
  toolsAll: string
  backTop: string
  labels: [string, string, string]
  projects: Project[]
  tools: Record<ToolId, [name: string, desc: string]>
}

// Links pessoais — troque pelos seus.
export const LINKS = {
  github: "https://github.com/cunhanai",
  linkedin: "#",
  lattes: "#",
  email: "#",
}

export const TECH_STRIP = ["Python", "SQL", "React", "dbt", "TypeScript", "BigQuery", "Tailwind", "Docker"]

const STACK_ICONS = [faCode, faDatabase, faPalette, faScrewdriverWrench]

export const HOME: Record<Lang, HomeDict> = {
  pt: {
    role: "Software Developer & Data Analyst",
    heroLead1: "Dados viram ",
    heroLead2: "decisões",
    heroSub: "Sou a Ana. Escrevo código e analiso dados — e construo utilitários pequenos que eu mesma uso todo dia.",
    ctaProjects: "Ver projetos",
    findMe: "Onde me achar",
    photoSlot: "foto — banner full-bleed",
    aboutTitle: "Sobre mim",
    aboutP1:
      "Trabalho nos dois lados da mesma mesa: construo o produto e depois olho os números para entender o que ele realmente fez. Gosto de pipelines que não quebram no domingo e de dashboards que alguém abre de verdade.",
    aboutP2:
      "Texto de exemplo — troque por sua história: como você começou, o que estuda hoje, o que gosta de fazer longe da tela.",
    langsLabel: "Idiomas",
    langs: [
      { name: "Português", level: "nativo" },
      { name: "Inglês", level: "fluente" },
      { name: "Espanhol", level: "intermediário" },
    ],
    funFacts: [
      { icon: faDiamond, value: 3, label: "anos de experiência" },
      { icon: faCaretUp, value: 8, sub: "/9", label: "semestres de Computação" },
      { icon: faSeedling, value: 4, label: "plantinhas vivas em casa", accent: true },
    ],
    nowLabel: "Estudando agora",
    nowSub: "atualizado em setembro de 2026",
    nowItems: [
      { icon: faDiamond, label: "Faculdade", text: "Visão computacional aplicada a imagens de drone, para o TCC." },
      { icon: faCircle, label: "Interesse pessoal", text: "Engenharia de dados: modelagem dimensional e orquestração." },
      { icon: faCaretUp, label: "Fora da tela", text: "Aqui entra seu hobby — troque por música, corrida, o que for." },
    ],
    stackTitle: "Stack",
    stackLead: "O que eu uso de verdade. Os blocos roxos são o que abro quase todo dia.",
    stackDaily: "uso diário",
    stackKnown: "já trabalhei",
    stackGroups: [
      { icon: STACK_ICONS[0], label: "Linguagens", items: [["Python", true], ["SQL", true], ["TypeScript", true], ["JavaScript", true], ["Java", false], ["R", false]] },
      { icon: STACK_ICONS[1], label: "Dados", items: [["Pandas", true], ["dbt", true], ["BigQuery", true], ["Postgres", true], ["Airflow", false], ["Power BI", false]] },
      { icon: STACK_ICONS[2], label: "Front-end", items: [["React", true], ["Tailwind", true], ["Vite", true], ["Next.js", false]] },
      { icon: STACK_ICONS[3], label: "Ferramentas", items: [["Git", true], ["Docker", true], ["Linux", true], ["AWS", false], ["Figma", false]] },
    ],
    projectsTitle: "Projetos",
    projectsLead:
      "Projetos de faculdade e utilitários que nasceram de alguma necessidade minha. Toque em um card para ver mais detalhes.",
    moreInfo: "Ver detalhes",
    allRepos: "Todos os repositórios",
    repo: "Ver no GitHub",
    close: "Fechar",
    toolsTitle: "Toolbox",
    toolsCount: "8 ferramentas",
    toolsLead: "Utilitários que rodam inteiramente no seu navegador. Nada é enviado para servidor.",
    toolsAll: "Abrir a toolbox completa",
    backTop: "Voltar ao topo",
    labels: ["Contexto", "O que faz", "Meu papel"],
    projects: [
      {
        kind: "Faculdade", shot: "print do projeto", year: "2026", title: "Copa & DAP por drone",
        desc: "Estimativa de diâmetro à altura do peito a partir de copas detectadas em ortomosaico.",
        tags: ["Python", "YOLOv8", "GeoPandas"],
        blocks: [
          "Trabalho de conclusão de curso, feito com imagens de drone de uma área de plantio.",
          "Detecta copas em um ortomosaico, extrai métricas de cada copa e alimenta um modelo que estima o DAP.",
          "Do recorte das imagens ao modelo final, incluindo a validação contra medições de campo.",
        ],
      },
      {
        kind: "Faculdade", shot: "print do dashboard", year: "2025", title: "Painel de dados climáticos",
        desc: "Dashboard que cruza séries históricas de chuva e temperatura de estações da região.",
        tags: ["Python", "Pandas", "Streamlit"],
        blocks: [
          "Disciplina de análise de dados, usando séries públicas de estações meteorológicas.",
          "Limpa as séries, preenche lacunas e mostra comparações por período e por estação.",
          "Tratamento dos dados e construção da interface.",
        ],
      },
      {
        kind: "Utilitário", shot: "print da toolbox", year: "2026", title: "Toolbox pessoal",
        desc: "As ferramentas deste site: conversores e formatadores que eu abria em dez abas diferentes.",
        tags: ["React", "Tailwind", "Vite"],
        blocks: [
          "Cansei de procurar o mesmo formatador de JSON no Google toda semana.",
          "Oito utilitários de texto e dados, todos client-side, sem telemetria e sem build pesado.",
          "Projeto pessoal, do design ao código.",
        ],
      },
      {
        kind: "Utilitário", shot: "print do CLI", year: "2025", title: "Organizador de arquivos",
        desc: "Script que renomeia e arquiva exportações de relatório seguindo um padrão fixo.",
        tags: ["Python", "Typer", "Regex"],
        blocks: [
          "Uma pasta de downloads com centenas de arquivos com nomes inconsistentes.",
          "Lê o conteúdo, extrai data e tipo do relatório e move tudo para a estrutura de pastas certa.",
          "Projeto pessoal, usado todo mês.",
        ],
      },
    ],
    tools: {
      case: ["Conversor de caixa", "MAIÚSCULA, minúscula, Title Case, camelCase"],
      count: ["Contador de caracteres", "Caracteres, palavras, linhas, tempo de leitura"],
      json: ["Formatador de JSON", "Indenta, valida e minifica"],
      uuid: ["Gerador de UUID", "UUID v4 em lote"],
      b64: ["Base64", "Codifica e decodifica texto"],
      diff: ["Diff de texto", "Compara dois textos linha por linha"],
      time: ["Conversor de timestamp", "Unix, ISO 8601, hora local"],
      csv: ["CSV → JSON", "Tabela CSV em array de objetos"],
    },
  },
  en: {
    role: "Software Developer & Data Analyst",
    heroLead1: "Data into ",
    heroLead2: "decisions",
    heroSub: "I'm Ana. I write code and analyse data — and I build small utilities I use myself every day.",
    ctaProjects: "See projects",
    findMe: "Find me",
    photoSlot: "photo — full-bleed banner",
    aboutTitle: "About me",
    aboutP1:
      "I work on both sides of the same desk: I build the product, then look at the numbers to understand what it actually did. I like pipelines that don't break on Sundays and dashboards someone really opens.",
    aboutP2:
      "Placeholder text — replace with your story: how you started, what you're studying now, what you do away from the screen.",
    langsLabel: "Languages",
    langs: [
      { name: "Portuguese", level: "native" },
      { name: "English", level: "fluent" },
      { name: "Spanish", level: "intermediate" },
    ],
    funFacts: [
      { icon: faDiamond, value: 3, label: "years of professional experience" },
      { icon: faCaretUp, value: 8, sub: "/9", label: "Computer Science semesters done" },
      { icon: faSeedling, value: 4, label: "plants still alive on my desk", accent: true },
    ],
    nowLabel: "Studying now",
    nowSub: "updated September 2026",
    nowItems: [
      { icon: faDiamond, label: "University", text: "Computer vision applied to drone imagery, for my final project." },
      { icon: faCircle, label: "Personal interest", text: "Data engineering: dimensional modelling and orchestration." },
      { icon: faCaretUp, label: "Away from the screen", text: "Your hobby goes here — swap for music, running, whatever fits." },
    ],
    stackTitle: "Stack",
    stackLead: "What I actually use. The purple blocks are the ones I open almost every day.",
    stackDaily: "daily",
    stackKnown: "worked with",
    stackGroups: [
      { icon: STACK_ICONS[0], label: "Languages", items: [["Python", true], ["SQL", true], ["TypeScript", true], ["JavaScript", true], ["Java", false], ["R", false]] },
      { icon: STACK_ICONS[1], label: "Data", items: [["Pandas", true], ["dbt", true], ["BigQuery", true], ["Postgres", true], ["Airflow", false], ["Power BI", false]] },
      { icon: STACK_ICONS[2], label: "Front-end", items: [["React", true], ["Tailwind", true], ["Vite", true], ["Next.js", false]] },
      { icon: STACK_ICONS[3], label: "Tools", items: [["Git", true], ["Docker", true], ["Linux", true], ["AWS", false], ["Figma", false]] },
    ],
    projectsTitle: "Projects",
    projectsLead: "University projects and utilities that came out of some need of my own. Tap a card for more detail.",
    moreInfo: "See details",
    allRepos: "All repositories",
    repo: "View on GitHub",
    close: "Close",
    toolsTitle: "Toolbox",
    toolsCount: "8 tools",
    toolsLead: "Utilities that run entirely in your browser. Nothing is sent to a server.",
    toolsAll: "Open the full toolbox",
    backTop: "Back to top",
    labels: ["Context", "What it does", "My part"],
    projects: [
      {
        kind: "University", shot: "project screenshot", year: "2026", title: "Canopy & DBH from drones",
        desc: "Estimating diameter at breast height from crowns detected in an orthomosaic.",
        tags: ["Python", "YOLOv8", "GeoPandas"],
        blocks: [
          "Final-year project, built on drone imagery of a planted area.",
          "Detects crowns in an orthomosaic, extracts per-crown metrics and feeds a model that estimates DBH.",
          "From image tiling to the final model, including validation against field measurements.",
        ],
      },
      {
        kind: "University", shot: "dashboard screenshot", year: "2025", title: "Climate data panel",
        desc: "Dashboard crossing historical rainfall and temperature series from regional stations.",
        tags: ["Python", "Pandas", "Streamlit"],
        blocks: [
          "Data analysis course, using public weather station series.",
          "Cleans the series, fills gaps and compares periods and stations.",
          "Data wrangling and the interface.",
        ],
      },
      {
        kind: "Utility", shot: "toolbox screenshot", year: "2026", title: "Personal toolbox",
        desc: "The tools on this site: converters and formatters I used to keep open in ten tabs.",
        tags: ["React", "Tailwind", "Vite"],
        blocks: [
          "I got tired of googling the same JSON formatter every week.",
          "Eight text and data utilities, all client-side, no telemetry and no heavy build.",
          "Personal project, design and code.",
        ],
      },
      {
        kind: "Utility", shot: "CLI screenshot", year: "2025", title: "File organiser",
        desc: "Script that renames and files report exports following a fixed pattern.",
        tags: ["Python", "Typer", "Regex"],
        blocks: [
          "A downloads folder with hundreds of inconsistently named files.",
          "Reads the content, extracts date and report type, and moves everything into the right folder structure.",
          "Personal project, used every month.",
        ],
      },
    ],
    tools: {
      case: ["Case converter", "UPPER, lower, Title Case, camelCase"],
      count: ["Character counter", "Characters, words, lines, reading time"],
      json: ["JSON formatter", "Indent, validate and minify"],
      uuid: ["UUID generator", "Batch UUID v4"],
      b64: ["Base64", "Encode and decode text"],
      diff: ["Text diff", "Compare two texts line by line"],
      time: ["Timestamp converter", "Unix, ISO 8601, local time"],
      csv: ["CSV → JSON", "CSV table into array of objects"],
    },
  },
}

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import {
  faBookOpen,
  faBriefcase,
  faCode,
  faDatabase,
  faGraduationCap,
  faLaptopCode,
  faPalette,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons"

import type { Lang } from "@/i18n/lang"
import type { ToolId } from "@/data/tools"

/*
 * PRIVACIDADE: nenhum texto deste arquivo pode citar empresa, nome/sigla da
 * faculdade, cidade/região ou idade. (Única exceção, pedida pela Ana: o link
 * do repositório do compilador.)
 */

export type FunFact = { icon: IconDefinition; value: number; sub?: string; label: string; accent?: boolean }
export type NowItem = { icon: IconDefinition; label: string; text: string }
export type StackGroup = { icon: IconDefinition; label: string; items: [name: string, daily: boolean][] }
export type Project = {
  kind: string
  shot: string
  year: string
  title: string
  /** texto curto do card */
  desc: string
  /** descrição da janela expandida */
  longDesc: string
  tags: string[]
  blocks: [context: string, what: string, role: string]
  /** botão principal da janela; sem link, a janela mostra só "Fechar" */
  link?: { href: string; label: string; github?: boolean }
}

export type FavoriteKind = "album" | "movie" | "anime" | "book" | "tool" | "game" | "series"
export type Favorite = {
  kind: FavoriteKind
  /** título; um objeto quando precisa de versão por idioma */
  title: string | Record<Lang, string>
  /** Autor, artista, estúdio ou criador — o que fizer sentido para a categoria. */
  author: string
  /** URL da capa (2:3). Sem capa, mostra um placeholder listrado com o ícone da categoria. */
  cover?: string
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
  prevProject: string
  nextProject: string
  favTitle: string
  favSub: string
  prevFavs: string
  nextFavs: string
  favKinds: Record<FavoriteKind, string>
  allRepos: string
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

export const LINKS = {
  github: "https://github.com/cunhanai",
  linkedin: "https://www.linkedin.com/in/ana-julia-da-cunha/",
  lattes: "http://lattes.cnpq.br/6451237604491893",
  email: "mailto:dacunhanajulia@gmail.com",
}

const FICHAS_URL = "https://www.fichas.anacunha.com.br"
const COMPILER_URL = "https://github.com/cunhanai/FURB-C-Compilador-20242"

// Favoritos (nomes não se traduzem, salvo onde há objeto por idioma). `cover` aceita uma URL de imagem 2:3.
export const FAVORITES: Favorite[] = [
  { kind: "book", title: "O Problema dos Três Corpos", author: "Liu Cixin" },
  { kind: "book", title: "Vou Te Receitar um Gato", author: "Syou Ishida" },
  { kind: "book", title: "Mo Dao Zu Shi", author: "Mo Xiang Tong Xiu" },
  { kind: "anime", title: "Frieren: Beyond Journey's End", author: "Kanehito Yamada e Tsukasa Abe" },
  { kind: "anime", title: "To Be Hero X", author: "Li Haoling" },
  { kind: "anime", title: "Dr. Stone", author: "Riichiro Inagaki e Boichi" },
  { kind: "game", title: "Genshin Impact", author: "HoYoverse" },
  { kind: "game", title: { pt: "Rusty Lake (coleção)", en: "Rusty Lake (collection)" }, author: "Rusty Lake" },
  { kind: "game", title: "A Plague Tale: Innocence", author: "Asobo Studio" },
  { kind: "album", title: "Arirang", author: "BTS" },
]

export const TECH_STRIP = ["Python", "SQL", "dbt", "Airflow", "PostgreSQL", "ClickHouse", "Docker", "React"]

const STACK_ICONS = [faCode, faDatabase, faLaptopCode, faScrewdriverWrench]

const STACK_ITEMS: [string, boolean][][] = [
  [["Python", true], ["SQL", true], ["C#", false], ["Java", false], ["JavaScript", false]],
  [["dbt", true], ["Airflow", true], ["PostgreSQL", true], ["ClickHouse", true], ["Kafka", false], ["SQL Server", false]],
  [["React", false], ["Vue", false], ["HTML/CSS", false], ["Tailwind", false], ["Vite", false]],
  [["Docker", true], ["Git", true], ["APIs REST", true], ["Linux", false], ["Vercel", false], ["Neon", false]],
]

export const HOME: Record<Lang, HomeDict> = {
  pt: {
    role: "Software Developer & Data Analyst",
    heroLead1: "Código, dados e ",
    heroLead2: "diversão",
    heroSub:
      "Oi, eu sou a Ana! Deixo os dados prontos para serem usados e, quando sobra tempo, construo ferramentas que ajudam no dia a dia.",
    ctaProjects: "Ver projetos",
    findMe: "Fale comigo",
    photoSlot: "foto — banner full-bleed",
    aboutTitle: "Sobre mim",
    aboutP1:
      "Trabalho nos bastidores: crio APIs de busca em lojas online, monto pipelines e deixo os dados prontos para análise. Comecei desenvolvendo sistemas e trouxe o gosto por construir e por entender como as coisas funcionam por dentro.",
    aboutP2:
      "Longe da tela, estou sempre com um livro na mão, assistindo animes, jogando Genshin, e tomando um bom cappuccino (ou chá) com chocolate.",
    langsLabel: "Idiomas",
    langs: [
      { name: "Português", level: "nativo" },
      { name: "Inglês", level: "fluente" },
      { name: "Espanhol", level: "intermediário" },
    ],
    funFacts: [
      { icon: faGraduationCap, value: 8, sub: "/9", label: "semestres de Computação" },
      { icon: faBriefcase, value: 3, label: "anos de experiência" },
      { icon: faBookOpen, value: 133, label: "livros lidos", accent: true },
    ],
    nowLabel: "Estudando agora",
    nowSub: "atualizado em setembro de 2026",
    nowItems: [
      {
        icon: faGraduationCap,
        label: "Faculdade",
        text: "No TCC, visão computacional e machine learning para medir árvores em imagens de drone. Nas aulas: Kali Linux, Unity com Kinect e PLN.",
      },
      { icon: faBriefcase, label: "No trabalho", text: "Pegando prática em React e me aprofundando em dbt e Kafka." },
      { icon: faPalette, label: "Vida pessoal", text: "Aprendendo coreano, aprimorando o espanhol e pintando com marcadores e tintas." },
    ],
    stackTitle: "Stack",
    stackLead: "Estas são as ferramentas que uso de verdade. As roxas fazem parte da minha rotina quase todo dia.",
    stackDaily: "uso diário",
    stackKnown: "já trabalhei",
    stackGroups: ["Linguagens", "Dados", "Web", "Ferramentas"].map((label, i) => ({
      icon: STACK_ICONS[i],
      label,
      items: STACK_ITEMS[i],
    })),
    projectsTitle: "Projetos",
    projectsLead:
      "Um projeto pessoal que está tomando forma e um trabalho de faculdade que me deixou orgulhosa. Clique nos cards para conhecer melhor.",
    moreInfo: "Ver detalhes",
    prevProject: "Projeto anterior",
    nextProject: "Próximo projeto",
    favTitle: "Favoritos",
    favSub: "álbuns, filmes, animes, livros e ferramentas",
    prevFavs: "Favoritos anteriores",
    nextFavs: "Próximos favoritos",
    favKinds: { album: "Álbum", movie: "Filme", anime: "Anime", book: "Livro", tool: "Ferramenta", game: "Jogo", series: "Série" },
    allRepos: "Repositórios",
    close: "Fechar",
    toolsTitle: "Toolbox",
    toolsCount: "8 ferramentas",
    toolsLead: "Pequenos utilitários que funcionam direto no navegador, sem enviar nada para servidor.",
    toolsAll: "Abrir a toolbox completa",
    backTop: "Voltar ao topo",
    labels: ["Contexto", "O que faz", "Meu papel"],
    projects: [
      {
        kind: "Faculdade",
        shot: "imagem do projeto",
        year: "2026",
        title: "TCC: Estimativa de parâmetros dendrométricos a partir da copa da árvore",
        desc: "TCC em andamento: estimativa do tamanho de árvores a partir de imagens de drone, com visão computacional e machine learning.",
        longDesc:
          "Estimativa de parâmetros dendrométricos de árvores por processamento computacional de ortomosaicos obtidos por drone.",
        tags: ["Visão computacional", "Machine learning", "Fotogrametria"],
        blocks: [
          "Pré-projeto do trabalho de conclusão do curso de Ciência da Computação. Reúne fotogrametria, visão computacional e aprendizado de máquina aplicados a árvores. Será implementado a partir do próximo semestre.",
          "A proposta é estimar o diâmetro à altura do peito (DAP) e a área basal das árvores a partir do delineamento das copas em ortomosaicos gerados com imagens de drone.",
          "Estudo e desenvolvimento do trabalho, da revisão bibliográfica à implementação e avaliação dos modelos.",
        ],
      },
      {
        kind: "Pessoal",
        shot: "print do sistema",
        year: "2026",
        title: "Compêndio de Fichas",
        desc: "Um lugar para criar e guardar fichas de RPG, construído inteiramente com o Claude.",
        longDesc: "Sistema de fichas de RPG desenvolvido com o Claude.",
        tags: ["Vercel", "Neon", "PostgreSQL"],
        blocks: [
          "Projeto pessoal, já no ar em fichas.anacunha.com.br.",
          "Permite criar e guardar fichas de personagens de RPG, acessíveis de qualquer lugar. A interface do sistema é só em português.",
          "Idealizei o projeto e defini todas as regras de negócio e os cálculos das fichas; o Claude executou o código sob minha direção. Também cuidei da hospedagem na Vercel e da base de dados no Neon.",
        ],
        link: { href: FICHAS_URL, label: "Ver o sistema" },
      },
      {
        kind: "Faculdade",
        shot: "print do compilador",
        year: "2024",
        title: "Compilador de linguagem própria",
        desc: "Trabalho final da disciplina de Compiladores: um compilador em Java para uma linguagem própria.",
        longDesc: "Compilador em Java para uma linguagem própria (nome de código 2024.2).",
        tags: ["Java"],
        blocks: [
          "Trabalho final da disciplina de Compiladores.",
          "Recebe programas escritos na linguagem própria da disciplina e passa por análise léxica, sintática e semântica, gerando código intermediário para MSIL.",
          "Implementação do compilador em Java.",
        ],
        link: { href: COMPILER_URL, label: "Ver no GitHub", github: true },
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
    heroLead1: "Code, data and ",
    heroLead2: "fun",
    heroSub:
      "Hi, I'm Ana! I get data ready to be used and, when I have spare time, I build tools that make everyday life easier.",
    ctaProjects: "View projects",
    findMe: "Get in touch",
    photoSlot: "photo — full-bleed banner",
    aboutTitle: "About me",
    aboutP1:
      "I work behind the scenes: I build search APIs for online stores, set up pipelines and get data ready for analysis. I started out building software and brought with me a love for building things and understanding how they work under the hood.",
    aboutP2:
      "Away from the screen, I always have a book in hand, watching anime, playing Genshin, and enjoying a good cappuccino (or tea) with chocolate.",
    langsLabel: "Languages",
    langs: [
      { name: "Portuguese", level: "native" },
      { name: "English", level: "fluent" },
      { name: "Spanish", level: "intermediate" },
    ],
    funFacts: [
      { icon: faGraduationCap, value: 8, sub: "/9", label: "semesters of Computer Science" },
      { icon: faBriefcase, value: 3, label: "years of experience" },
      { icon: faBookOpen, value: 133, label: "books read", accent: true },
    ],
    nowLabel: "Studying now",
    nowSub: "updated September 2026",
    nowItems: [
      {
        icon: faGraduationCap,
        label: "College",
        text: "For my thesis, computer vision and machine learning to measure trees in drone imagery. In class: Kali Linux, Unity with Kinect and NLP.",
      },
      { icon: faBriefcase, label: "At work", text: "Getting hands-on with React and going deeper on dbt and Kafka." },
      { icon: faPalette, label: "Personal life", text: "Learning Korean, improving my Spanish and painting with markers and paints." },
    ],
    stackTitle: "Stack",
    stackLead: "These are the tools I actually use. The purple ones are part of my routine almost every day.",
    stackDaily: "daily use",
    stackKnown: "used before",
    stackGroups: ["Languages", "Data", "Web", "Tools"].map((label, i) => ({
      icon: STACK_ICONS[i],
      label,
      items: STACK_ITEMS[i],
    })),
    projectsTitle: "Projects",
    projectsLead: "A personal project that's taking shape and a college assignment I'm proud of. Click a card to learn more.",
    moreInfo: "View details",
    prevProject: "Previous project",
    nextProject: "Next project",
    favTitle: "Favorites",
    favSub: "albums, movies, anime, books and tools",
    prevFavs: "Previous favorites",
    nextFavs: "Next favorites",
    favKinds: { album: "Album", movie: "Movie", anime: "Anime", book: "Book", tool: "Tool", game: "Game", series: "Series" },
    allRepos: "Repositories",
    close: "Close",
    toolsTitle: "Toolbox",
    toolsCount: "8 tools",
    toolsLead: "Small utilities that work right in your browser, sending nothing to a server.",
    toolsAll: "Open the full toolbox",
    backTop: "Back to top",
    labels: ["Context", "What it does", "My role"],
    projects: [
      {
        kind: "College",
        shot: "project image",
        year: "2026",
        title: "Thesis: Estimating dendrometric parameters from the tree crown",
        desc: "Thesis in progress: estimating tree size from drone imagery, using computer vision and machine learning.",
        longDesc: "Estimating tree dendrometric parameters through computational processing of drone-acquired orthomosaics.",
        tags: ["Computer vision", "Machine learning", "Photogrammetry"],
        blocks: [
          "Pre-project of the Computer Science undergraduate thesis. It brings together photogrammetry, computer vision and machine learning applied to trees. It will be implemented starting next semester.",
          "The goal is to estimate tree diameter at breast height (DBH) and basal area from crown delineation in orthomosaics built from drone images.",
          "Research and development of the work, from the literature review to implementing and evaluating the models.",
        ],
      },
      {
        kind: "Personal",
        shot: "app screenshot",
        year: "2026",
        title: "Character Sheet Compendium",
        desc: "A place to create and keep RPG character sheets, built entirely with Claude.",
        longDesc: "RPG character sheet system built with Claude.",
        tags: ["Vercel", "Neon", "PostgreSQL"],
        blocks: [
          "Personal project, already live at fichas.anacunha.com.br.",
          "Lets you create and keep RPG character sheets, accessible from anywhere. The system's interface is Portuguese-only.",
          "I came up with the project and defined all the business rules and character sheet calculations; Claude wrote the code under my direction. I also handled hosting on Vercel and the database on Neon.",
        ],
        link: { href: FICHAS_URL, label: "View the system" },
      },
      {
        kind: "College",
        shot: "compiler screenshot",
        year: "2024",
        title: "Custom-language compiler",
        desc: "Final project for a Compilers course: a compiler in Java for a custom language.",
        longDesc: "Java compiler for a custom language (codename 2024.2).",
        tags: ["Java"],
        blocks: [
          "Final project of a Compilers course.",
          "Takes programs written in the course's custom language through lexical, syntactic and semantic analysis, generating intermediate code targeting MSIL.",
          "Implementation of the compiler in Java.",
        ],
        link: { href: COMPILER_URL, label: "View on GitHub", github: true },
      },
    ],
    tools: {
      case: ["Case converter", "UPPERCASE, lowercase, Title Case, camelCase"],
      count: ["Character counter", "Characters, words, lines, reading time"],
      json: ["JSON formatter", "Indents, validates and minifies"],
      uuid: ["UUID generator", "UUID v4 in bulk"],
      b64: ["Base64", "Encodes and decodes text"],
      diff: ["Text diff", "Compares two texts line by line"],
      time: ["Timestamp converter", "Unix, ISO 8601, local time"],
      csv: ["CSV → JSON", "CSV table to array of objects"],
    },
  },
}

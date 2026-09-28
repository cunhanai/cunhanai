import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

export type Lang = "pt" | "en"

const STORAGE_KEY = "ajc-lang"

// Título e descrição da página (sem dados estruturados: nada de endereço, empregador ou instituição).
const META: Record<Lang, { title: string; description: string }> = {
  pt: {
    title: "Ana Júlia da Cunha · Software Developer & Data Analyst",
    description:
      "Oi, eu sou a Ana! Deixo os dados prontos para serem usados e, quando sobra tempo, construo ferramentas que ajudam no dia a dia.",
  },
  en: {
    title: "Ana Júlia da Cunha · Software Developer & Data Analyst",
    description:
      "Hi, I'm Ana! I get data ready to be used and, when I have spare time, I build tools that make everyday life easier.",
  },
}

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === "pt" || saved === "en") return saved
  } catch {
    /* storage bloqueado: segue para o idioma do navegador */
  }
  return (navigator.language || "en").toLowerCase().startsWith("pt") ? "pt" : "en"
}

type LangContextValue = { lang: Lang; setLang: (lang: Lang) => void }

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en"
    document.title = META[lang].title
    document.querySelector('meta[name="description"]')?.setAttribute("content", META[lang].description)
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignora */
    }
    setLangState(next)
  }, [])

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLang precisa estar dentro de <LangProvider>")
  return ctx
}

/** Escolhe o dicionário do idioma atual. */
export function useDict<T>(dict: Record<Lang, T>): T {
  return dict[useLang().lang]
}

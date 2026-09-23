import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

export type Lang = "pt" | "en"

const STORAGE_KEY = "ajc-lang"

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

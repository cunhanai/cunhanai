// Lógica das ferramentas, portada do protótipo. Tudo client-side, só APIs nativas.

export type CaseMode = "upper" | "lower" | "title" | "sentence" | "camel" | "snake" | "kebab"

export const CASE_MODES: [CaseMode, string][] = [
  ["upper", "AA"],
  ["lower", "aa"],
  ["title", "Aa Bb"],
  ["sentence", "Aa bb"],
  ["camel", "camelCase"],
  ["snake", "snake_case"],
  ["kebab", "kebab-case"],
]

export function words(s: string) {
  return s.trim() ? s.trim().split(/\s+/) : []
}

export function convertCase(s: string, mode: CaseMode) {
  if (!s) return ""
  if (mode === "upper") return s.toUpperCase()
  if (mode === "lower") return s.toLowerCase()
  if (mode === "title")
    return s.toLowerCase().replace(/(^|[\s([""'-])([a-zà-ÿ])/g, (_m, a: string, b: string) => a + b.toUpperCase())
  if (mode === "sentence")
    return s.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-zà-ÿ])/g, (_m, a: string, b: string) => a + b.toUpperCase())
  const parts = s
    .replace(/([a-zà-ÿ])([A-Z])/g, "$1 $2")
    .split(/[^A-Za-z0-9À-ÿ]+/)
    .filter(Boolean)
  if (mode === "camel")
    return parts.map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase())).join("")
  if (mode === "snake") return parts.map((w) => w.toLowerCase()).join("_")
  return parts.map((w) => w.toLowerCase()).join("-")
}

export function textCounts(text: string) {
  const w = words(text)
  return [
    text.length,
    text.replace(/\s/g, "").length,
    w.length,
    text ? text.split("\n").length : 0,
    text.split(/\n{2,}/).filter((p) => p.trim()).length,
    Math.max(1, Math.ceil(w.length / 200)),
  ] as const
}

export type DiffMark = "=" | "+" | "-"

export function lcsDiff(a: string, b: string): [DiffMark, string][] {
  const A = a.split("\n")
  const B = b.split("\n")
  const n = A.length
  const m = B.length
  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0))
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
  const out: [DiffMark, string][] = []
  let i = 0
  let j = 0
  while (i < n && j < m) {
    if (A[i] === B[j]) {
      out.push(["=", A[i]])
      i++
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      out.push(["-", A[i]])
      i++
    } else {
      out.push(["+", B[j]])
      j++
    }
  }
  while (i < n) out.push(["-", A[i++]])
  while (j < m) out.push(["+", B[j++]])
  return out
}

type CsvValue = string | number | boolean | null

export function parseCsv(text: string, delim: string): Record<string, CsvValue>[] {
  const rows: string[][] = []
  let cur = ""
  let row: string[] = []
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        cur += '"'
        i++
      } else if (c === '"') quoted = false
      else cur += c
    } else if (c === '"') quoted = true
    else if (c === delim) {
      row.push(cur)
      cur = ""
    } else if (c === "\n") {
      row.push(cur)
      rows.push(row)
      row = []
      cur = ""
    } else if (c !== "\r") cur += c
  }
  if (cur !== "" || row.length) {
    row.push(cur)
    rows.push(row)
  }
  if (!rows.length) return []
  const head = rows[0].map((h) => h.trim())
  return rows
    .slice(1)
    .filter((r) => r.some((v) => v !== ""))
    .map((r) => {
      const o: Record<string, CsvValue> = {}
      head.forEach((h, k) => {
        const raw = (r[k] ?? "").trim()
        o[h] =
          raw === ""
            ? null
            : /^-?\d+(\.\d+)?$/.test(raw)
              ? Number(raw)
              : raw === "true"
                ? true
                : raw === "false"
                  ? false
                  : raw
      })
      return o
    })
}

export function uuid4() {
  if (typeof crypto?.randomUUID === "function") return crypto.randomUUID()
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export function b64Encode(text: string) {
  return btoa(new TextEncoder().encode(text).reduce((s, b) => s + String.fromCharCode(b), ""))
}

export function b64Decode(text: string) {
  const bin = atob(text.trim())
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)))
}

/** Interpreta Unix (s ou ms) ou qualquer data aceita por Date. null = vazio, undefined = inválido. */
export function parseTimestamp(raw: string): Date | null | undefined {
  const s = raw.trim()
  if (!s) return null
  const d = /^-?\d+$/.test(s) ? new Date(s.length > 10 ? Number(s) : Number(s) * 1000) : new Date(s)
  return isNaN(d.getTime()) ? undefined : d
}

export function relativeTime(d: Date, lang: "pt" | "en") {
  const diff = Math.round((d.getTime() - Date.now()) / 1000)
  const abs = Math.abs(diff)
  const [unit, size] =
    abs < 60 ? ["s", 1] : abs < 3600 ? ["min", 60] : abs < 86400 ? ["h", 3600] : ["d", 86400]
  const n = Math.round(abs / (size as number))
  if (lang === "pt") return diff < 0 ? `há ${n} ${unit}` : `em ${n} ${unit}`
  return diff < 0 ? `${n} ${unit} ago` : `in ${n} ${unit}`
}

import type { Lang } from "@/i18n/lang"
import type { ToolId } from "@/data/tools"

export type ToolsDict = {
  title: string
  lead: string
  input: string
  output: string
  phText: string
  format: string
  minify: string
  indent: string
  generate: string
  quantity: string
  encode: string
  decode: string
  original: string
  modified: string
  now: string
  delimiter: string
  convert: string
  copy: string
  copied: string
  privacy: string
  invalidDate: string
  tools: Record<ToolId, [name: string, desc: string]>
  counts: [string, string, string, string, string, string]
  tsLabels: [string, string, string, string, string]
}

export const TOOLS_PAGE: Record<Lang, ToolsDict> = {
  pt: {
    title: "Ferramentas",
    lead: "Oito utilitários para as tarefas chatas do dia. Tudo roda no seu navegador — nada sai do seu computador.",
    input: "Entrada",
    output: "Saída",
    phText: "Cole seu texto aqui…",
    format: "Formatar",
    minify: "Minificar",
    indent: "Indentação",
    generate: "Gerar",
    quantity: "Quantidade",
    encode: "Codificar",
    decode: "Decodificar",
    original: "Original",
    modified: "Modificado",
    now: "Agora",
    delimiter: "Separador",
    convert: "Converter",
    copy: "Copiar",
    copied: "Copiado!",
    privacy: "Processamento 100% local, no seu navegador.",
    invalidDate: "Data inválida",
    tools: {
      case: ["Conversor de caixa", "MAIÚSCULA, minúscula, Title Case, camelCase e mais."],
      count: ["Contador de caracteres", "Caracteres, palavras, linhas, parágrafos e tempo de leitura."],
      json: ["Formatador de JSON", "Indenta, valida e minifica com mensagem de erro clara."],
      uuid: ["Gerador de UUID", "UUID v4 em lote, pronto para copiar."],
      b64: ["Base64", "Codifica e decodifica texto em Base64 (UTF-8)."],
      diff: ["Diff de texto", "Compara dois textos linha por linha."],
      time: ["Conversor de timestamp", "Unix, ISO 8601, hora local e tempo relativo."],
      csv: ["CSV → JSON", "Converte uma tabela CSV em um array de objetos."],
    },
    counts: ["Caracteres", "Sem espaços", "Palavras", "Linhas", "Parágrafos", "Leitura"],
    tsLabels: ["Unix (s)", "Unix (ms)", "ISO 8601", "Hora local", "Relativo"],
  },
  en: {
    title: "Tools",
    lead: "Eight utilities for the boring parts of the day. Everything runs in your browser — nothing leaves your machine.",
    input: "Input",
    output: "Output",
    phText: "Paste your text here…",
    format: "Format",
    minify: "Minify",
    indent: "Indentation",
    generate: "Generate",
    quantity: "Quantity",
    encode: "Encode",
    decode: "Decode",
    original: "Original",
    modified: "Modified",
    now: "Now",
    delimiter: "Delimiter",
    convert: "Convert",
    copy: "Copy",
    copied: "Copied!",
    privacy: "100% local processing, in your browser.",
    invalidDate: "Invalid date",
    tools: {
      case: ["Case converter", "UPPER, lower, Title Case, camelCase and more."],
      count: ["Character counter", "Characters, words, lines, paragraphs and reading time."],
      json: ["JSON formatter", "Indent, validate and minify with clear error messages."],
      uuid: ["UUID generator", "Batch UUID v4, ready to copy."],
      b64: ["Base64", "Encode and decode text as Base64 (UTF-8)."],
      diff: ["Text diff", "Compare two texts line by line."],
      time: ["Timestamp converter", "Unix, ISO 8601, local time and relative time."],
      csv: ["CSV → JSON", "Turn a CSV table into an array of objects."],
    },
    counts: ["Characters", "No spaces", "Words", "Lines", "Paragraphs", "Reading"],
    tsLabels: ["Unix (s)", "Unix (ms)", "ISO 8601", "Local time", "Relative"],
  },
}

# Portfólio — Ana Júlia da Cunha

Implementação em React do design exportado do Claude Design (`Home.dc.html` e `tools.dc.html`).
Fica separado do README de perfil que está na raiz do repositório.

## Stack

| O quê | Pacote |
|---|---|
| Build | [Vite](https://vite.dev) + React 19 + TypeScript |
| Estilo | [Tailwind CSS v4](https://tailwindcss.com) — tema em `src/index.css` |
| Componentes | [neobrutalism.dev](https://www.neobrutalism.dev) (shadcn + Base UI) em `src/components/ui/` |
| Ícones e cursores | [Font Awesome](https://fontawesome.com) (`@fortawesome/*`) |
| Animações | [Motion](https://motion.dev) |
| Rotas | React Router (`/` e `/tools#<ferramenta>`) |
| Fontes | Playfair Display + Work Sans via `@fontsource` (self-hosted) |

## Comandos

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # gera dist/ (inclui 404.html para as rotas no GitHub Pages)
npm run preview
```

## Estrutura

```
src/
  components/ui/       componentes do neobrutalism.dev (ícones trocados de lucide → Font Awesome)
  components/common/   Container, Reveal, SectionHeading, Grain, ScrollProgress
  components/layout/   Header, menu mobile (Sheet), seletor de idioma (DropdownMenu)
  components/home/     seções da Home
  pages/               Home e Tools
  tools/               as 8 ferramentas + lógica pura (lib.ts)
  data/                textos PT/EN e links
  i18n/                contexto de idioma (salvo em localStorage "ajc-lang")
  lib/cursors.ts       cursores gerados a partir de fa-arrow-pointer e fa-hand-pointer
```

### Tema e física neobrutalista

As cores do design viram tokens do Tailwind (`bg-panel`, `text-lilac`, `border-line-2`…).
A sombra dura e o "botão afundando" do DEPENDENCIES.md viraram utilitários:

- `nb-4`, `nb-6`, `nb-12`… — sombra com offset em px (roxa por padrão)
- `nb-light` — sombra branca (para fundos roxos)
- `nb-press` — sobe 2px no hover e afunda exatamente o offset no `:active`

### Componentes do neobrutalism.dev

Foram instalados a partir do registry oficial. Para adicionar mais na sua máquina:

```bash
npx shadcn@latest add https://neobrutalism.dev/r/<componente>.json
```

Depois troque o import de `lucide-react` por `@/components/ui/icons` (Font Awesome).

## Deploy (GitHub Pages)

O workflow `.github/workflows/deploy-portfolio.yml` builda esta pasta e publica no Pages a cada push
na `main` que mexa em `portfolio/` (ou manualmente em *Actions → Run workflow*).

Uma única vez, no GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

O site fica em `https://cunhanai.github.io/cunhanai/`.

## Pendências de conteúdo

- Foto do hero e prints dos projetos (hoje são placeholders listrados)
- Links de LinkedIn, Lattes e e-mail em `src/data/home.ts` (`LINKS`)
- Parágrafo "sobre" de exemplo e o hobby em "Estudando agora"

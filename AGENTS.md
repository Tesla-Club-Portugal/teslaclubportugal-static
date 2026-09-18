# AGENTS.md

Instruções para agentes de código (Claude Code, Codex, Cursor, Aider, e outros) a trabalhar neste repositório. Este ficheiro é a fonte da verdade — se leres isto no arranque, sabes o essencial para não partir nada.

## O que é este repo

Site estático da comunidade Tesla Club Portugal, servido em [teslaclubportugal.com](https://teslaclubportugal.com). Deploy automático em cada merge para `main`.

## Stack (fixa, não trocar)

- **Astro 7** (SSG puro, output estático)
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **MDX** para conteúdo em Markdown
- **@astrojs/sitemap** para sitemap automático
- **Node.js ≥ 22**

## Estrutura de ficheiros

```
teslaclubportugal-static/
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro      # <html>, <head>, nav, footer, SEO
│   │   └── PageLayout.astro      # BaseLayout + banda cinza do header + prose
│   ├── components/
│   │   ├── SEO.astro             # meta tags, OG, Twitter, JSON-LD
│   │   ├── Nav.astro             # nav fixo com logo TCP
│   │   └── Footer.astro
│   ├── pages/                    # cada .astro/.mdx = uma URL
│   │   ├── index.astro           # /
│   │   ├── sobre-nos/…
│   │   ├── guias/…
│   │   ├── superchargers.astro
│   │   ├── parcerias.astro       # lista de parceiros no array `partners`
│   │   ├── faq.astro             # perguntas no array `faqs`
│   │   ├── oficinas-e-reparacoes.astro
│   │   ├── english/…             # variante EN
│   │   ├── my-blog/…             # índice do blog
│   │   ├── 2018/…                # posts do blog (por ano/mês/dia/slug)
│   │   └── 404.astro
│   ├── content/                  # (opcional) MDX collections
│   └── styles/global.css         # tema Tailwind + prose overrides
├── public/                       # servido tal-e-qual, sem processing
│   ├── images/                   # imagens novas (hero, logo, team)
│   ├── media/                    # migradas do WP (mantêm estrutura YYYY/MM)
│   ├── favicon*, apple-touch-icon.png, android-chrome-*.png
│   ├── site.webmanifest, robots.txt
│   ├── _redirects                # regras de redirect / 410
│   └── _headers                  # HTTP headers (cache, security)
├── astro.config.mjs
├── package.json                  # scripts: dev / build / preview
└── .github/
    ├── workflows/deploy.yml      # CI: build + wrangler pages deploy
    └── CODEOWNERS
```

## Voz e escrita

1. **Português de Portugal** em tudo, excepto `/english/*` que é EN-GB para visitantes.
2. **Nunca uses em-dashes (—).** Substituis por vírgula, ponto ou dois-pontos.
3. **Segunda pessoa (tu)**, informal. Escreve como falarias com um amigo. Nada de "prezado utilizador".
4. **Zero corporate**. Frases curtas. Se soa a press release, reescreve.
5. **Sem SEO-spam**. Escreve para pessoas, não para o Google — a estrutura semântica já trata do SEO.
6. **Preserva conteúdo migrado**. Blog posts foram copiados verbatim do site WP antigo. Se refactorares o layout, mantém as palavras exactas do post.

## Design tokens (em `src/styles/global.css`)

| Token | Valor | Uso |
|---|---|---|
| `--color-ink` | `#171a20` | texto principal, botões escuros |
| `--color-ink-soft` | `#393c41` | texto de corpo |
| `--color-ink-muted` | `#5c5e62` | metadata, eyebrow secundário |
| `--color-line` | `#edeeef` | bordas |
| `--color-surface` | `#ffffff` | fundo |
| `--color-surface-alt` | `#f4f4f4` | banda cinza dos headers, placeholders |
| `--color-accent` | `#e82127` | vermelho Tesla (accent apenas) |
| `--font-sans` | Inter | via Google Fonts, em `SEO.astro` |

Tailwind v4 lê estas variáveis como cores via `bg-[var(--color-ink)]` etc.

## Como adicionar coisas

### Novo parceiro (`src/pages/parcerias.astro`)

Adiciona ao array `partners`:
```ts
{ name: 'Nome',  url: 'https://...', logo: '/media/YYYY/MM/logo.png', perk: 'Desconto tal.' },
```
- Sem `url:` → nome renderiza sem link
- Sem `logo:` → placeholder do clube em cinza (mesmo estilo da caixa "És uma empresa a querer ser parceira?")
- Com `logo:` → mete o ficheiro em `public/media/YYYY/MM/nome.png` (~300-800px, PNG transparente ou JPEG)

### Novo membro da equipa (`src/pages/sobre-nos/a-equipa.astro`)

Adiciona ao array `team`:
```ts
{ name: 'Nome Apelido', photo: '/images/team/nome-apelido.jpg' },
```
- Foto em `public/images/team/nome-apelido.jpg`, ~400px quadrada, JPEG qualidade 88
- Sem `photo:` → placeholder com iniciais em cinza
- Ex-membro → adiciona à secção `<section>Anteriormente</section>` no mesmo ficheiro (a preto e branco)

### Nova pergunta na FAQ (`src/pages/faq.astro`)

Adiciona ao array `faqs`:
```ts
{ q: 'Pergunta?', a: 'Resposta em HTML permitido.' },
```
O `JSON-LD` do `FAQPage` é regerado automaticamente a partir do array.

### Novo post no blog

Cria `src/pages/YYYY/MM/DD/slug-do-post.astro` a partir do template de `2018/04/06/bem-vindos-*.astro`. Passa `image=` (path de OG image), `type="article"`, `publishedAt`, opcionalmente `modifiedAt`. Adiciona também ao array `posts` em `src/pages/my-blog/index.astro`. Actualiza a `<nav>` prev/next no fim dos posts adjacentes.

### Nova página normal

Cria `src/pages/nova-pagina.astro` usando `PageLayout`:
```astro
---
import PageLayout from '../layouts/PageLayout.astro';
---
<PageLayout title="Título" description="Meta description" eyebrow="Categoria" headline="H1" intro="Sub-título.">
  <h2>Secção</h2>
  <p>Texto.</p>
</PageLayout>
```
Adiciona ao menu se relevante: `src/components/Nav.astro` array `links`, e a `src/components/Footer.astro` array `cols`.

## Assets

- `/images/…` → assets novos criados para v2 (hero, logo, team, OG images)
- `/media/…` → migrados do WP antigo (fotos de posts, logos de parceiros). URLs mantêm-se `/media/YYYY/MM/…` para preservar histórico. `_redirects` faz 301 dos URLs antigos `/wp-content/uploads/*` → `/media/:splat`.

## Git flow

- **`main`** protegida: PR obrigatório, 1 approval, sem force push, sem delete.
- Manuel Rocha (@manuelrocha88) e João Nunes (@jonasman) podem push directo se necessário; para todos os outros, PR only.
- **CODEOWNERS** (`.github/CODEOWNERS`) pede-lhes review automaticamente em cada PR.
- **`delete_branch_on_merge`** activo — a branch da feature apaga-se sozinha após merge.
- **Preview per PR**: cada push a uma branch de PR faz deploy num URL próprio `<slug>.teslaclubportugal-static-v2.pages.dev`. O bot comenta o link no PR.

## Deploy

- Push em `main` → GitHub Action → `wrangler pages deploy dist` → Cloudflare Pages
- Custom domain: `teslaclubportugal.com` (apex CNAME → `teslaclubportugal-static-v2.pages.dev`, proxied)
- Logs: [github.com/Tesla-Club-Portugal/teslaclubportugal-static/actions](https://github.com/Tesla-Club-Portugal/teslaclubportugal-static/actions)
- Ver deploy no dashboard CF: [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → `teslaclubportugal-static-v2`

## Não tocar

- `dist/`, `node_modules/`, `.astro/`, `.wrangler/` — ignorados via `.gitignore`, artefactos de build
- Ficheiros dentro de `public/media/**` — assets estáticos, substitui via commit não hand-edit
- `.github/workflows/deploy.yml` — mudar só se alterares a estratégia de deploy

## Antes de propor mudanças grandes

1. Corre `npm run build` localmente — se falha, não commites
2. Segue as regras de voz (secção acima)
3. Se em dúvida sobre arquitectura, abre issue antes de mexer em código
4. **Nunca** removas conteúdo migrado do blog sem justificação explícita

## Contactos

- Issues técnicos: [GitHub Issues](https://github.com/Tesla-Club-Portugal/teslaclubportugal-static/issues)
- Discussão geral: [grupo Facebook do clube](https://www.facebook.com/groups/teslaclubportugal)

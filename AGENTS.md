# AGENTS.md

Machine-readable spec for AI coding agents working on this repo.

## Repo

- Name: `Tesla-Club-Portugal/teslaclubportugal-static`
- Production: `https://teslaclubportugal.com`
- Preview host: `<branch-slug>.teslaclubportugal-static-v2.pages.dev`
- License: content © Tesla Club Portugal
- Public: yes

## Stack

| Tool | Version | Notes |
|---|---|---|
| Node.js | >=22 | hard requirement |
| Astro | ^7 | SSG, static output only |
| Tailwind CSS | ^4 | via `@tailwindcss/vite` |
| MDX | via `@astrojs/mdx` | for Markdown pages |
| sitemap | via `@astrojs/sitemap` | auto-generated on build |
| Hosting | Cloudflare Pages | project `teslaclubportugal-static-v2` |

## Scripts

- `npm run dev` — local dev server (localhost:4321)
- `npm run build` — build to `dist/`
- `npm run preview` — serve `dist/`
- Deploy runs in GitHub Actions on push to `main`; do not deploy from a workstation

## Directory map

```
src/
  layouts/
    BaseLayout.astro   # html + head + nav + footer + SEO
    PageLayout.astro   # BaseLayout + gray header band + prose wrapper
  components/
    SEO.astro          # meta, OG, Twitter, JSON-LD (Organization + WebSite + Article + FAQPage)
    Nav.astro          # fixed nav; edit `links` array
    Footer.astro       # edit `cols` array
  pages/               # file-based routing; .astro and .mdx
    index.astro        # /
    sobre-nos/*        # about
    guias/*
    superchargers.astro
    parcerias.astro    # partners array
    faq.astro          # faqs array
    oficinas-e-reparacoes.astro
    english/*          # EN-GB variant
    my-blog/index.astro
    2018/MM/DD/*.astro # blog posts
    404.astro
  content/             # optional MDX collections
  styles/global.css    # theme tokens + prose overrides
public/                # copied verbatim to dist/
  images/              # v2-era assets (hero, logo, team)
  media/YYYY/MM/       # migrated from WP; URLs preserved
  favicon-*.png favicon.ico apple-touch-icon.png android-chrome-*.png
  site.webmanifest robots.txt
  _redirects _headers
astro.config.mjs       # site: 'https://teslaclubportugal.com', trailingSlash: 'always'
package.json
.github/
  workflows/deploy.yml # build + wrangler pages deploy
  CODEOWNERS           # auto-reviewers
```

## Design tokens (`src/styles/global.css` `@theme`)

```
--color-ink:         #171a20
--color-ink-soft:    #393c41
--color-ink-muted:   #5c5e62
--color-line:        #edeeef
--color-surface:     #ffffff
--color-surface-alt: #f4f4f4
--color-accent:      #e82127
--font-sans:         Inter (loaded from Google Fonts in SEO.astro)
--tracking-tight:    -0.02em
--tracking-hero:     -0.03em
```

Consumption: `bg-[var(--color-ink)]`, `text-[var(--color-accent)]`, etc.

## Content language rules

- Locale: `pt-PT` by default. Only `/english/*` is `en-GB`.
- Character `—` (em-dash, U+2014) is banned in prose. Substitute with `,`, `.`, or `:`.
- Voice: second-person informal ("tu"). No corporate register.
- Migrated blog posts (`src/pages/2018/**/*.astro`) contain WP-era body copy preserved verbatim. Do not paraphrase or trim without explicit instruction. Structural edits (h2/h3 promotion, figure wrappers) are fine; word substitutions are not.

## Assets

- `/images/**` — created for v2. Prefer for new content.
- `/media/YYYY/MM/**` — migrated from `/wp-content/uploads/**`. Keep the date hierarchy.
- `_redirects` maps legacy `/wp-content/uploads/*` → `/media/:splat 301` and blanket-301s other `/wp-content/*` and `/wp-*.php`. Do not remove.
- Team photos: `/images/team/<slug>.jpg`, ~400px square, JPEG q88.
- Favicons: 16/32/48/96/180/192/512 PNGs at repo root of `public/`. Regenerate all together from a single square logo source using `sips`.

## How to add content

### Partner (`src/pages/parcerias.astro`)

Append to `partners: Partner[]`:

```ts
{ name: string, url: string | null, logo: string | null, perk: string }
```

- `logo === null` → renders faded TCP badge on `bg-[var(--color-surface-alt)]`
- `logo` path convention: `/media/YYYY/MM/<slug>.png|jpg` (drop file in `public/media/YYYY/MM/`)
- `url === null` → name renders as plain text (no anchor)

### Team member (`src/pages/sobre-nos/a-equipa.astro`)

Append to `team: Member[]`:

```ts
{ name: string, photo?: string }
```

- `photo` missing → initials placeholder computed from `name`
- Former admins go in a separate `Anteriormente` section, grayscale + opacity 80%

### FAQ item (`src/pages/faq.astro`)

Append to `faqs`. `a` accepts inline HTML (`<strong>`, `<a>`, `<br>`, lists). `FAQPage` JSON-LD is regenerated automatically.

### Blog post

- Path: `src/pages/YYYY/MM/DD/<slug>.astro`
- Use `PageLayout` with `type="article"`, `publishedAt` (ISO 8601), optional `modifiedAt`
- Register in `src/pages/my-blog/index.astro` `posts` array
- Add prev/next `<nav>` at the bottom, cross-linking to adjacent posts

### Plain page

- Path: `src/pages/<slug>.astro` or `src/pages/<parent>/<slug>.astro`
- Use `PageLayout` (auto: gray banded header + prose main). Escape prose scoping with `class="not-prose"` when needed.
- Wire into nav (`src/components/Nav.astro` `links`) and footer (`src/components/Footer.astro` `cols`) if it should be discoverable.

## Prose CSS caveats

- `.prose :is(p, li) a` — link styling scoped to inline text only. Block-level `<a>` cards are unaffected.
- `.not-prose` blocks: descendant elements have `margin-top: 0` reset via `.prose .not-prose :is(h1,h2,h3,h4,p,ul,ol,li,img)` rule. Use `.not-prose` around card grids and image figures inside `.prose` blocks.

## Git flow

- `main` is protected: PR required, 1 approval, no force push, no branch delete.
- `enforce_admins: false` — `@manuelrocha88` and `@jonasman` can push directly if necessary (they are in the `restrictions.users` list).
- `delete_branch_on_merge: true` at repo level.
- `.github/CODEOWNERS` maps `*` to both admins → auto-request on every PR.
- Commit author identity: use the maintainer's global git config. **Do not** override with `-c user.email=…`. Wrong-email commits produce unlinked "ghost user" attribution on GitHub.

## CI/CD

- Workflow: `.github/workflows/deploy.yml`
- Triggers: `push` on `main`, `pull_request` targeting `main`, `workflow_dispatch`
- Steps: `checkout` → `setup-node@22` → `npm ci` → `npm run build` → `wrangler pages deploy dist --project-name=teslaclubportugal-static-v2 --branch=<slug>`
- On `pull_request`: additionally posts (or updates) a sticky comment with the branch-alias preview URL
- Secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` (repo-level, present)

## DNS

- Zone: `teslaclubportugal.com` (Cloudflare, zone id `9497209bebb5dd95e793ccb250e3ad5c`)
- Apex: CNAME `teslaclubportugal.com` → `teslaclubportugal-static-v2.pages.dev`, proxied
- `www`: CNAME → `teslaclubportugal.com`, proxied
- MX/TXT retained for Zoho email

## Do not touch

- `dist/`, `node_modules/`, `.astro/`, `.wrangler/` — build artefacts, `.gitignore`d
- `public/media/**` — replace via commit only, never hand-edit binaries
- `.github/workflows/deploy.yml` — change only when the deploy strategy changes
- Blog post word-for-word body copy in `src/pages/2018/**` (structural changes ok, wording is preserved v1 content)

## Preflight checklist for any PR

1. `npm run build` succeeds locally (no missing images, no broken imports)
2. No `—` em-dash characters introduced in prose
3. If new asset added, path is under `/images/**` or `/media/YYYY/MM/**`
4. If new page added, registered in `Nav.astro` or `Footer.astro` if user-facing
5. Commit author email matches a GitHub-verified email of the human on record

## References

- `README.md` — human community contribution guide (Portuguese)
- Astro docs: https://docs.astro.build
- Cloudflare Pages docs: https://developers.cloudflare.com/pages

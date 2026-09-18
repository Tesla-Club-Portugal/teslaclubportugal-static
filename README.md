# teslaclubportugal.com — static rebuild

Static snapshot of the WordPress site, migrated after a 2026-09-18 security
incident. Deployed via Cloudflare Pages from this repo.

## Structure

- `docs/` — everything served. HTML per-page, WP assets under `wp-content/`.
- `docs/_redirects` — old WP routes (wp-admin, forum, feeds) → home / 410.
- `docs/_headers` — CSP-lite + long cache for immutable assets.

## Deploy

- Cloudflare Pages watches `main` on GitHub. Every push auto-deploys.
- Preview URL: `teslaclubportugal-static.pages.dev`.
- Production domain (after cutover): `teslaclubportugal.com`.

## Editing

For simple text edits: open the `.html` file, edit inline, commit.

Later plan: convert to Astro + MDX so pages become markdown-editable.

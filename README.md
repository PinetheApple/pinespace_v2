# Pine Space

Personal portfolio + blog.

Built on TanStack Start with prerendered static HTML and a custom dark design system, **Nocturne** (twilight violet-slate, single-hue, kinetic display type).

## Stack

- **Framework** — [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router), prerendered to static HTML
- **UI** — React 19, [Tailwind CSS v4](https://tailwindcss.com/), [GSAP](https://gsap.com/) for motion, [Phosphor](https://phosphoricons.com/) icons
- **Tooling** — Vite, ESLint ([@tanstack/eslint-config](https://tanstack.com/config)), Prettier
- **Deploy** — Cloudflare Pages

## Getting started

```bash
pnpm install
pnpm dev          # → http://localhost:3000
```

> Requires Node 22 (see `.nvmrc`) and pnpm.

## Scripts

| Command                | Description                                |
| ---------------------- | ------------------------------------------ |
| `pnpm dev`             | Dev server on port 3000                    |
| `pnpm build`           | Production build                           |
| `pnpm preview`         | Preview the build                          |
| `pnpm lint`            | ESLint                                     |
| `pnpm format`          | Prettier write + ESLint fix                |
| `pnpm generate-routes` | Regenerate the route tree (`tsr generate`) |

## Project layout

```
src/
  routes/            file-based routes (/, /blog, /components)
  components/ui/     Nocturne component library (see /components)
  lib/               cn, site config, gsap, highlight, hooks
  styles.css         Tailwind v4 @theme — design tokens
  content/           blog content
```

### Design system

Tokens live in `src/styles.css` (`@theme`): the violet ramp, surface/text/line
scales (`well` / `base` / `surface` / `elevated`, `ink` / `muted` / `faint`),
glow shadows, and the `nocturne-*` utilities. Fonts: Sora (display), Inter
(body), JetBrains Mono (labels/code).

The full component library — buttons, inputs, overlays, and blog primitives — is
exported from `#/components/ui`. Its showcase is available at **`/components`**
during local development and returns the site's not-found page in production.

## Routing

Routes are files under `src/routes`. The route tree
(`src/routeTree.gen.ts`) is generated automatically by the Vite plugin in dev,
or via `pnpm generate-routes`.

## Deploy

`pnpm build` prerenders the site into `.output/public`. The
`Deploy to Cloudflare Pages` workflow deploys that directory after every push
to `main`, and can also be run manually.

Before enabling deployments:

1. Create a Cloudflare Pages project using **Direct Upload**.
2. Create a Cloudflare API token with
   **Account → Cloudflare Pages → Edit** permission.
3. Add these GitHub repository settings under
   **Settings → Secrets and variables → Actions**:
   - Secret `CLOUDFLARE_API_TOKEN`: the API token.
   - Secret `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID.
   - Variable `CLOUDFLARE_PROJECT_NAME`: the exact Pages project name.
4. Run the workflow manually once, or push another commit to `main`.

Add both secrets before setting `CLOUDFLARE_PROJECT_NAME`; setting that
variable enables the job. Until then, the job is intentionally skipped so
merging the workflow cannot create a failed deployment.

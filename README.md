# Pine Space

Personal portfolio + blog. 

Built on TanStack Start (SSR) with a custom dark design system, **Nocturne** (twilight violet-slate, single-hue, kinetic display type).

## Stack

- **Framework** — [TanStack Start](https://tanstack.com/start) (SSR) + [TanStack Router](https://tanstack.com/router) file-based routing
- **UI** — React 19, [Tailwind CSS v4](https://tailwindcss.com/), [GSAP](https://gsap.com/) for motion, [Phosphor](https://phosphoricons.com/) icons
- **Tooling** — Vite, Vitest, ESLint ([@tanstack/eslint-config](https://tanstack.com/config)), Prettier
- **Deploy** — Nitro (Node-compatible, any host)

## Getting started

```bash
pnpm install
pnpm dev          # → http://localhost:3000
```

> Requires Node 22 (see `.nvmrc`) and pnpm.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Dev server on port 3000 |
| `pnpm build` | Production build |
| `pnpm preview` | Preview the build |
| `pnpm test` | Run Vitest |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier write + ESLint fix |
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

The full component library — buttons, inputs, overlays, blog primitives — is
exported from `#/components/ui` and showcased live at the **`/components`** route.

## Routing

Routes are files under `src/routes`. The route tree
(`src/routeTree.gen.ts`) is generated automatically by the Vite plugin in dev,
or via `pnpm generate-routes`.

## Deploy

Nitro produces a self-contained Node server:

```bash
pnpm build
node .output/server/index.mjs
```

For host presets (Vercel, Netlify, Cloudflare, etc.) see https://nitro.build/deploy.

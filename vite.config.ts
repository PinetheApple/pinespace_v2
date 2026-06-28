import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeSlug from 'rehype-slug'

const allowedHosts = ['localhost', '.ngrok-free.app', '.ngrok.app', '.ngrok.io']

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  // Pre-bundle React-consuming deps up front. Discovered mid-session, they get
  // re-optimized + force a reload that races React copies -> invalid hook call.
  optimizeDeps: { include: ['@mdx-js/react', '@gsap/react'] },
  server: { allowedHosts },
  preview: { allowedHosts },
  plugins: [
    devtools(),
    nitro({
      config: {
        rollupConfig: { external: [/^@sentry\//] },
        // Nitro string-replaces `typeof window` -> `"undefined"` for SSR dead-code
        // elimination. It's a naive text replace, so it also corrupts the token
        // inside string literals — e.g. a `typeof window` in an MDX code sample
        // becomes `"undefined"`, breaking the surrounding double-quoted string.
        // Opt the token out to keep blog content intact; the runtime check is
        // already correct under Node.
        replace: { 'typeof window': 'typeof window' },
      },
    }),
    tailwindcss(),
    {
      // MDX must transform .mdx before the React plugin handles JSX
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [
          remarkGfm,
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: 'frontmatter' }],
        ],
        rehypePlugins: [rehypeSlug],
      }),
    },
    tanstackStart({
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: true,
        crawlLinks: true,
        failOnError: true,
      },
    }),
    viteReact({ include: /\.(jsx|tsx|mdx)$/ }),
  ],
})

export default config

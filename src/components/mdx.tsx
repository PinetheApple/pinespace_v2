import type { MDXComponents } from 'mdx/types'
import { Accordion, Callout, CodeBlock, Figure, Tabs } from '@ui'
import type { Lang } from '@utils/highlight'
import { cn } from '@utils/cn'

// MDX blocks sit outside the prose flow and own their vertical rhythm.
const BLOCK = 'not-prose my-6'

const LANGS = new Set<Lang>(['ts', 'tsx', 'js', 'jsx', 'json', 'bash', 'text'])

const asLang = (value: string): Lang =>
  LANGS.has(value as Lang) ? (value as Lang) : 'text'

// MDX renders fenced code as <pre><code class="language-x">…</code></pre>;
// lift it into the styled CodeBlock (copy button + highlighting).
function Pre(props: React.ComponentProps<'pre'>) {
  const child = props.children as
    | React.ReactElement<{ className?: string; children?: string }>
    | undefined
  const className = child?.props.className ?? ''
  const lang = asLang(className.replace(/^language-/, ''))
  const raw = child?.props.children
  const code = typeof raw === 'string' ? raw.replace(/\n$/, '') : ''
  return <CodeBlock code={code} lang={lang} className={BLOCK} />
}

export const mdxComponents: MDXComponents = {
  pre: Pre,
  Callout: ({ className, ...props }: React.ComponentProps<typeof Callout>) => (
    <Callout className={cn(BLOCK, className)} {...props} />
  ),
  CodeBlock: ({
    className,
    ...props
  }: React.ComponentProps<typeof CodeBlock>) => (
    <CodeBlock className={cn(BLOCK, className)} {...props} />
  ),
  Figure: ({ className, ...props }: React.ComponentProps<typeof Figure>) => (
    <Figure className={cn(BLOCK, className)} {...props} />
  ),
  Accordion: ({
    className,
    ...props
  }: React.ComponentProps<typeof Accordion>) => (
    <Accordion className={cn(BLOCK, className)} {...props} />
  ),
  Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
    <Tabs className={cn(BLOCK, className)} {...props} />
  ),
}

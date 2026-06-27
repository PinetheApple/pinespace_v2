import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowSquareOutIcon,
  BellIcon,
  CommandIcon,
  FlagIcon,
  FolderSimpleIcon,
  HouseIcon,
  LinkIcon,
  MoonIcon,
  PenNibIcon,
  RssIcon,
  ShareNetworkIcon,
  XLogoIcon,
} from '@phosphor-icons/react'
import {
  Accordion,
  Avatar,
  BackToTop,
  Badge,
  Breadcrumb,
  Burger,
  Button,
  Callout,
  CodeBlock,
  CommandPalette,
  Container,
  Checkbox,
  Drawer,
  DropdownItem,
  DropdownMenu,
  DropdownSeparator,
  Pagination,
  PrevNext,
  ReadingProgress,
  SearchBar,
  Select,
  Skeleton,
  SkeletonText,
  Slider,
  TableOfContents,
  Tabs,
  ToastProvider,
  Tooltip,
  useCommandPalette,
  useToast,
} from '@components/ui'

export const Route = createFileRoute('/components')({ component: Showcase })

function Showcase() {
  return (
    <ToastProvider>
      <ShowcaseContent />
    </ToastProvider>
  )
}

function Panel({
  title,
  span,
  children,
}: {
  title: string
  span?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-surface p-6 ${span ? 'sm:col-span-full' : ''}`}
    >
      <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
        {title}
      </div>
      {children}
    </div>
  )
}

const sortOptions = [
  { value: 'new', label: 'Newest first' },
  { value: 'old', label: 'Oldest first' },
  { value: 'read', label: 'Most read' },
  { value: 'az', label: 'A → Z' },
]

function ShowcaseContent() {
  const toast = useToast()
  const palette = useCommandPalette()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [sort, setSort] = useState('new')
  const [size, setSize] = useState(17)
  const [page, setPage] = useState(1)

  return (
    <>
      <ReadingProgress />
      <div className="fixed inset-0 -z-10 nocturne-grid" />

      <header className="border-b border-line py-20">
        <Container>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-violet-400">
            Nocturne · Component Library
          </span>
          <h1 className="mt-4 font-display text-6xl font-extrabold uppercase leading-[0.95] tracking-tight">
            Comp
            <span className="text-violet-400 text-shadow-(--shadow-glow-md)">
              onents
            </span>
          </h1>
          <p className="mt-5 max-w-[62ch] text-muted">
            Every Nocturne control, live. Press{' '}
            <span className="rounded border border-line px-1.5 font-mono text-xs">
              ⌘K
            </span>{' '}
            for the command palette.
          </p>
        </Container>
      </header>

      <main className="py-14">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Panel title="Buttons">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="icon">
                  <LinkIcon size={16} />
                </Button>
                <Button variant="primary" disabled>
                  Disabled
                </Button>
              </div>
            </Panel>

            <Panel title="Search bar">
              <SearchBar />
            </Panel>

            <Panel title="Dropdown">
              <DropdownMenu
                label={
                  <>
                    <ShareNetworkIcon size={16} /> Share
                  </>
                }
              >
                <DropdownItem>
                  <LinkIcon size={16} /> Copy link
                </DropdownItem>
                <DropdownItem>
                  <XLogoIcon size={16} /> Post to X
                </DropdownItem>
                <DropdownItem>
                  <RssIcon size={16} /> Subscribe RSS
                </DropdownItem>
                <DropdownSeparator />
                <DropdownItem>
                  <FlagIcon size={16} /> Report
                </DropdownItem>
              </DropdownMenu>
            </Panel>

            <Panel title="Select">
              <Select options={sortOptions} value={sort} onChange={setSort} />
            </Panel>

            <Panel title="Slider">
              <div className="flex items-center gap-3">
                <Slider
                  min={12}
                  max={22}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                />
                <span className="min-w-[42px] font-mono text-[13px] text-violet-300">
                  {size}px
                </span>
              </div>
              <p className="mt-2.5 font-mono text-xs text-faint">
                reading text size
              </p>
            </Panel>

            <Panel title="Checkbox + disabled">
              <div className="flex flex-col gap-3.5">
                <Checkbox defaultChecked label="Subscribe to newsletter" />
                <Checkbox label="Email me about replies" />
                <Checkbox defaultChecked disabled label="Required (disabled)" />
                <Checkbox disabled label="Unavailable (disabled)" />
              </div>
            </Panel>

            <Panel title="Badges">
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="violet">React</Badge>
                <Badge tone="line">SSR</Badge>
                <Badge tone="success" dot>
                  Published
                </Badge>
                <Badge tone="warning">Draft</Badge>
                <Badge tone="danger">Archived</Badge>
              </div>
            </Panel>

            <Panel title="Tooltip">
              <div className="flex items-center gap-5">
                <Tooltip tip="Copy link">
                  <Button variant="icon">
                    <LinkIcon size={18} />
                  </Button>
                </Tooltip>
                <Tooltip tip="Subscribe via RSS">
                  <Button variant="icon">
                    <RssIcon size={18} />
                  </Button>
                </Tooltip>
                <Tooltip tip="View source">
                  <Button variant="icon">
                    <ArrowSquareOutIcon size={18} />
                  </Button>
                </Tooltip>
              </div>
            </Panel>

            <Panel title="Skeleton">
              <SkeletonText lines={3} />
              <Skeleton className="mt-3 h-[120px]" />
            </Panel>

            <Panel title="Accordion" span>
              <Accordion
                defaultOpen="a"
                items={[
                  {
                    id: 'a',
                    title: 'What is Pine Space?',
                    body: 'A personal portfolio + blog built on TanStack Start, animated with GSAP, themed in Nocturne.',
                  },
                  {
                    id: 'b',
                    title: 'Is the source open?',
                    body: 'Yes — the whole site and this design system are MIT licensed.',
                  },
                  {
                    id: 'c',
                    title: 'How is motion handled?',
                    body: 'GSAP + ScrollTrigger via useGSAP, with a prefers-reduced-motion fallback on every animation.',
                  },
                ]}
              />
            </Panel>

            <Panel title="Tabs" span>
              <Tabs
                items={[
                  {
                    id: 'overview',
                    label: 'overview',
                    content:
                      'Motion-forward personal platform. Content-first, fast, accessible.',
                  },
                  {
                    id: 'tech',
                    label: 'tech',
                    content:
                      'React 19 · TanStack Start · GSAP · Tailwind v4 · Drizzle · Neon.',
                  },
                  {
                    id: 'timeline',
                    label: 'timeline',
                    content:
                      'Scaffolded 2026. Design system Nocturne. Shipping soon.',
                  },
                ]}
              />
            </Panel>

            <Panel title="Pagination" span>
              <Pagination page={page} total={9} onChange={setPage} />
            </Panel>

            <Panel title="Hamburger + Drawer">
              <Burger open={drawerOpen} onClick={() => setDrawerOpen((v) => !v)} />
              <p className="mt-3 font-mono text-xs text-faint">tap → opens drawer</p>
            </Panel>

            <Panel title="Command palette (⌘K)">
              <Button onClick={() => palette.setOpen(true)}>
                <CommandIcon size={16} /> Open palette
              </Button>
            </Panel>

            <Panel title="Toast / notification">
              <Button onClick={() => toast('Subscribed — check your inbox')}>
                <BellIcon size={16} /> Trigger toast
              </Button>
            </Panel>

            <Panel title="Callout / admonition">
              <Callout>Note — pairs with MDX blog content blocks.</Callout>
              <Callout variant="warning" className="mt-2.5">
                Warning — use sparingly.
              </Callout>
            </Panel>

            <Panel title="Avatar / author bio">
              <Avatar name="Pine" role="Engineer & writer" />
            </Panel>

            <Panel title="Breadcrumb">
              <Breadcrumb
                items={[
                  { label: 'home', href: '#' },
                  { label: 'blog', href: '#' },
                  { label: 'motion-with-gsap' },
                ]}
              />
            </Panel>

            <Panel title="Table of contents">
              <TableOfContents
                entries={[
                  { id: 'intro', label: 'Introduction' },
                  { id: 'setup', label: 'Setup' },
                  { id: 'scrolltrigger', label: 'ScrollTrigger' },
                  { id: 'reduced', label: 'Reduced motion' },
                ]}
              />
            </Panel>

            <Panel title="Code block + copy" span>
              <CodeBlock
                filename="gsap.ts"
                lang="ts"
                code={`// register once, client-only\nif (typeof window !== 'undefined') {\n  gsap.registerPlugin(ScrollTrigger, useGSAP)\n}\n\nconst count = 42\nexport function fade(el: HTMLElement) {\n  return gsap.to(el, { opacity: 1, duration: 0.6 })\n}`}
              />
            </Panel>

            <Panel title="Prev / next post" span>
              <PrevNext
                prev={{ label: 'Prev', href: '#' }}
                next={{ label: 'Next', href: '#' }}
              />
            </Panel>
          </div>
        </Container>
      </main>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display font-bold">
            pine<span className="text-violet-400">.</span>space
          </span>
          <Button variant="icon" onClick={() => setDrawerOpen(false)}>
            ✕
          </Button>
        </div>
        <nav>
          {['Work', 'Writing', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href="#"
              className="block border-b border-line py-3 font-display text-[22px] font-semibold text-ink transition-all hover:pl-2 hover:text-violet-300"
            >
              {item}
            </a>
          ))}
        </nav>
      </Drawer>

      <CommandPalette
        open={palette.open}
        onClose={() => palette.setOpen(false)}
        items={[
          { id: 'home', group: 'Navigate', label: 'Home', icon: <HouseIcon size={16} /> },
          { id: 'writing', group: 'Navigate', label: 'Writing', icon: <PenNibIcon size={16} /> },
          { id: 'work', group: 'Navigate', label: 'Work', icon: <FolderSimpleIcon size={16} /> },
          { id: 'theme', group: 'Actions', label: 'Toggle theme', icon: <MoonIcon size={16} /> },
          { id: 'rss', group: 'Actions', label: 'Copy RSS feed', icon: <RssIcon size={16} /> },
        ]}
      />

      <BackToTop />
    </>
  )
}

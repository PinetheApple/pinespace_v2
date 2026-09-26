import { useEffect, useRef, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { respondNotFound } from '@lib/http'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CaretLeftIcon,
} from '@phosphor-icons/react'
import { PageLayout, Container } from '@layout'
import { Drawer, ReadingProgress, TableOfContents } from '@ui'
import type { TocEntry } from '@ui'
import { getPost, adjacentPosts } from '@content/posts'
import type { PostMeta } from '@content/posts'
import { mdxComponents } from '@components/mdx'
import { NotFound } from '@components/not-found'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    if (!getPost(params.slug)) respondNotFound()
  },
  component: PostPage,
})

function PostPage() {
  const { slug } = Route.useParams()
  const post = getPost(slug)
  const articleRef = useRef<HTMLElement>(null)
  const [toc, setToc] = useState<Array<TocEntry>>([])
  const [tocOpen, setTocOpen] = useState(false)

  const openToc = () => setTocOpen(true)
  const closeToc = () => setTocOpen(false)
  const handleTocClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a')) closeToc()
  }

  useEffect(() => {
    const root = articleRef.current
    if (!root) return
    const nodes = root.querySelectorAll<HTMLHeadingElement>('h2, h3')
    setToc(
      Array.from(nodes)
        .filter((n) => n.id)
        .map((n) => ({
          id: n.id,
          label: n.textContent,
          level: Number(n.tagName[1]),
        })),
    )
  }, [slug])

  if (!post) return <NotFound />
  const { meta, Content } = post
  const { prev, next } = adjacentPosts(slug)
  const hasToc = toc.length > 0

  return (
    <PageLayout>
      <ReadingProgress />
      <Container className="py-12 sm:py-24">
        <Link to="/blog" className="text-sm text-muted hover:text-ink">
          ← Back to blog
        </Link>

        <div className="mt-8 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
          <aside className="hidden lg:block">
            {hasToc && (
              <div className="sticky top-20 max-h-[calc(100dvh-6rem)] overflow-auto">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                  On this page
                </p>
                <TableOfContents entries={toc} />
              </div>
            )}
          </aside>

          <div className="mx-auto w-full max-w-2xl">
            <article ref={articleRef}>
              <p className="font-mono text-xs text-faint">{meta.date}</p>
              <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">
                {meta.title}
              </h1>
              <div className="prose prose-invert mt-8 max-w-none [&_h2]:scroll-mt-20 [&_h3]:scroll-mt-20">
                <Content components={mdxComponents} />
              </div>
            </article>

            <nav className="mt-16 grid gap-3 sm:grid-cols-2">
              <AdjacentLink post={prev} direction="prev" />
              <AdjacentLink post={next} direction="next" />
            </nav>
          </div>
        </div>
      </Container>

      {hasToc && (
        <>
          <button
            type="button"
            onClick={openToc}
            aria-label="On this page"
            className="fixed top-[20%] right-0 z-[140] flex items-center rounded-l-full border border-r-0 border-line bg-surface py-3 pr-2 pl-3 text-muted transition-colors hover:text-violet-300 lg:hidden"
          >
            <CaretLeftIcon size={16} weight="bold" />
          </button>

          <Drawer open={tocOpen} onClose={closeToc}>
            <p className="mb-4 font-mono text-xs tracking-[0.12em] text-faint uppercase">
              On this page
            </p>
            <div onClick={handleTocClick}>
              <TableOfContents entries={toc} />
            </div>
          </Drawer>
        </>
      )}
    </PageLayout>
  )
}

function AdjacentLink({
  post,
  direction,
}: {
  post: PostMeta | undefined
  direction: 'prev' | 'next'
}) {
  if (!post) return <span className="hidden sm:block" />
  const isNext = direction === 'next'
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className={`group flex flex-col gap-2 rounded-xl border border-line p-4 transition-colors hover:border-violet-400 ${
        isNext ? 'sm:text-right' : ''
      }`}
    >
      <span
        className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-faint ${
          isNext ? 'sm:justify-end' : ''
        }`}
      >
        {!isNext && <ArrowLeftIcon size={13} weight="bold" />}
        {isNext ? 'Next' : 'Previous'}
        {isNext && <ArrowRightIcon size={13} weight="bold" />}
      </span>
      <span className="font-display font-semibold text-ink transition-colors group-hover:text-violet-300">
        {post.title}
      </span>
    </Link>
  )
}

import { useMemo, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { PageLayout, Container } from '@layout'
import { Badge, SearchBar, Select } from '@ui'
import { posts, allTags } from '@content/posts'

export const Route = createFileRoute('/blog/')({ component: BlogIndex })

type Sort = 'new' | 'old' | 'az'

const SORT_OPTIONS = [
  { value: 'new', label: 'Newest first' },
  { value: 'old', label: 'Oldest first' },
  { value: 'az', label: 'A → Z' },
]

function BlogIndex() {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<string | null>(null)
  const [sort, setSort] = useState<Sort>('new')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = posts.filter((post) => {
      const matchesTag = !tag || (post.tags ?? []).includes(tag)
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q)
      return matchesTag && matchesQuery
    })
    const sorted = [...filtered]
    if (sort === 'az') sorted.sort((a, b) => a.title.localeCompare(b.title))
    else if (sort === 'old') sorted.sort((a, b) => a.date.localeCompare(b.date))
    else sorted.sort((a, b) => b.date.localeCompare(a.date))
    return sorted
  }, [query, tag, sort])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value)
  const handleSort = (value: string) => setSort(value as Sort)
  const clearTag = () => setTag(null)
  const toggleTag = (value: string) =>
    setTag((cur) => (cur === value ? null : value))

  return (
    <PageLayout>
      <Container className="py-12 sm:py-24">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-violet-400">
          Writing
        </span>
        <h1 className="mt-4 font-display text-5xl font-extrabold uppercase tracking-tight">
          Blog
        </h1>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <SearchBar
            kbd=""
            value={query}
            onChange={handleSearch}
            className="max-w-full flex-1 sm:max-w-[420px]"
          />
          <Select
            options={SORT_OPTIONS}
            value={sort}
            onChange={handleSort}
            className="min-w-[180px]"
          />
        </div>

        {allTags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <TagChip label="All" active={tag === null} onSelect={clearTag} />
            {allTags.map((t) => (
              <TagChip
                key={t}
                label={t}
                value={t}
                active={tag === t}
                onSelect={toggleTag}
              />
            ))}
          </div>
        )}

        {visible.length === 0 ? (
          <p className="mt-12 text-muted">No posts match your filters.</p>
        ) : (
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {visible.map((post) => (
              <li key={post.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group flex flex-col gap-1 py-6 transition-colors"
                >
                  <span className="font-mono text-xs text-faint">
                    {post.date}
                  </span>
                  <h2 className="font-display text-xl font-bold text-ink transition-colors group-hover:text-violet-300">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted">{post.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </PageLayout>
  )
}

function TagChip({
  label,
  value,
  active,
  onSelect,
}: {
  label: string
  value?: string
  active: boolean
  onSelect: (value: string) => void
}) {
  const handleClick = () => onSelect(value ?? '')
  return (
    <button onClick={handleClick} className="cursor-pointer">
      <Badge tone={active ? 'violet' : 'line'}>{label}</Badge>
    </button>
  )
}

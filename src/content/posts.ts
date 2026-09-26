import type { ComponentType } from 'react'
import type { MDXComponents } from 'mdx/types'

export type PostMeta = {
  slug: string
  title: string
  excerpt: string
  date: string
  featured?: boolean
  tags?: Array<string>
}

type Frontmatter = Omit<PostMeta, 'slug'>
type PostContent = ComponentType<{ components?: MDXComponents }>

// Two globs over the same files, split by what each caller needs: the list
// pages want only frontmatter (cheap), the post page wants the compiled body
// (heavy). Splitting lets chunks that import metadata tree-shake the bodies.
const frontmatters = import.meta.glob<Frontmatter>('./posts/*.mdx', {
  eager: true,
  import: 'frontmatter',
})
const contents = import.meta.glob<PostContent>('./posts/*.mdx', {
  eager: true,
  import: 'default',
})

// glob types every lookup as present; an arbitrary slug may not be.
const lookup = <T>(map: Record<string, T>, key: string): T | undefined =>
  map[key]

const slugFromPath = (path: string) =>
  path.slice(path.lastIndexOf('/') + 1).replace(/\.mdx$/, '')

const pathFromSlug = (slug: string) => `./posts/${slug}.mdx`

export const posts: Array<PostMeta> = Object.entries(frontmatters)
  .map(([path, frontmatter]) => ({ slug: slugFromPath(path), ...frontmatter }))
  .sort((a, b) => b.date.localeCompare(a.date))

export const featuredPost = posts.find((p) => p.featured) ?? posts[0]
export const otherPosts = posts.filter((p) => p !== featuredPost)

export const allTags = [...new Set(posts.flatMap((p) => p.tags ?? []))].sort(
  (a, b) => a.localeCompare(b),
)

export function adjacentPosts(slug: string) {
  const i = posts.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: undefined, next: undefined }
  return { prev: posts[i + 1], next: posts[i - 1] }
}

export function getPost(slug: string) {
  const path = pathFromSlug(slug)
  const frontmatter = lookup(frontmatters, path)
  const Content = lookup(contents, path)
  if (!frontmatter || !Content) return undefined
  return { meta: { slug, ...frontmatter } satisfies PostMeta, Content }
}

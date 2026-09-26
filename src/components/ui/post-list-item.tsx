import { Link } from '@tanstack/react-router'
import type { PostMeta } from '@content/posts'

export function PostListItem({ post }: { post: PostMeta }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex flex-col gap-1 py-6"
    >
      <span className="font-mono text-xs text-faint">{post.date}</span>
      <h3 className="font-display text-xl font-bold text-ink transition-colors group-hover:text-violet-300">
        {post.title}
      </h3>
      <p className="text-sm text-muted">{post.excerpt}</p>
    </Link>
  )
}

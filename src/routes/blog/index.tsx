import { createFileRoute, Link } from '@tanstack/react-router'
import { posts } from '@content/posts'

export const Route = createFileRoute('/blog/')({ component: BlogIndex })

function BlogIndex() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Blog</h1>
      <ul className="mt-4 space-y-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to="/blog/$slug" params={{ slug: post.slug }}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

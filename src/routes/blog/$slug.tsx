import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getPost } from '@content/posts'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = getPost(params.slug)
    if (!post) throw notFound()
    return post
  },
  component: PostPage,
})

function PostPage() {
  const post = Route.useLoaderData()

  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <Link to="/blog" className="text-sm text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
        ← Back to blog
      </Link>
      <article className="mt-8">
        <p className="text-sm text-neutral-400">{post.date}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{post.title}</h1>
        <div className="prose prose-neutral mt-8 dark:prose-invert">
          <p>{post.body}</p>
        </div>
      </article>
    </main>
  )
}

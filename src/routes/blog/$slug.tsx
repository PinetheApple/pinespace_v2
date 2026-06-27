import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { PageLayout, Container } from '@layout'
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
    <PageLayout>
      <Container className="max-w-2xl py-24">
        <Link to="/blog" className="text-sm text-muted hover:text-ink">
          ← Back to blog
        </Link>
        <article className="mt-8">
          <p className="text-sm text-faint">{post.date}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{post.title}</h1>
          <div className="prose prose-neutral mt-8 dark:prose-invert">
            <p>{post.body}</p>
          </div>
        </article>
      </Container>
    </PageLayout>
  )
}

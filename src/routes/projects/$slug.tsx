import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { PageLayout, Container } from '@layout'
import { getProject } from '@content/projects'

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params }) => {
    const project = getProject(params.slug)
    if (!project) throw notFound()
    return project
  },
  component: ProjectPage,
})

function ProjectPage() {
  const project = Route.useLoaderData()

  return (
    <PageLayout>
      <Container className="max-w-2xl py-24">
        <Link to="/projects" className="text-sm text-muted hover:text-ink">
          ← All projects
        </Link>
        <article className="mt-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
            {project.tag}
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
            {project.name}
          </h1>
          <p className="mt-2 text-lg text-violet-300">{project.tagline}</p>
          <div className="prose prose-neutral mt-8 dark:prose-invert">
            <p>{project.body}</p>
          </div>
        </article>
      </Container>
    </PageLayout>
  )
}

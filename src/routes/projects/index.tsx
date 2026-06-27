import { createFileRoute, Link } from '@tanstack/react-router'
import { PageLayout, Container } from '@layout'
import { projects } from '@content/projects'

export const Route = createFileRoute('/projects/')({ component: ProjectsIndex })

function ProjectsIndex() {
  return (
    <PageLayout>
      <Container className="py-24">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-violet-400">
          Selected work
        </span>
        <h1 className="mt-4 font-display text-5xl font-extrabold uppercase tracking-tight">
          Projects
        </h1>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="group rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-violet-400"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                {project.tag}
              </span>
              <h2 className="mt-3 font-display text-xl font-bold text-ink transition-colors group-hover:text-violet-300">
                {project.name}
              </h2>
              <p className="mt-1 text-sm text-muted">{project.description}</p>
            </Link>
          ))}
        </div>
      </Container>
    </PageLayout>
  )
}

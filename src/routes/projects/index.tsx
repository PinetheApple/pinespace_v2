import { createFileRoute } from '@tanstack/react-router'
import { PageLayout, Container } from '@layout'
import { ProjectCard } from '@layout/project-card'
import { projects } from '@content/projects'

export const Route = createFileRoute('/projects/')({ component: ProjectsIndex })

function ProjectsIndex() {
  return (
    <PageLayout>
      <Container className="py-12 sm:py-24">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-violet-400">
          Selected work
        </span>
        <h1 className="mt-4 font-display text-5xl font-extrabold uppercase tracking-tight">
          Projects
        </h1>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </PageLayout>
  )
}

import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { projectLink } from '@content/projects'
import type { Project } from '@content/projects'
import { cn } from '@utils/cn'

export function ProjectCard({
  project,
  className,
  onNavigate,
}: {
  project: Project
  className?: string
  onNavigate?: () => void
}) {
  return (
    <a
      href={projectLink(project)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-violet-400',
        className,
      )}
    >
      {project.image && (
        <img
          src={project.image}
          alt=""
          className="aspect-[16/9] w-full border-b border-line object-cover"
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
            {project.tag}
          </span>
          <ArrowUpRightIcon
            size={15}
            weight="bold"
            className="text-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet-300"
          />
        </div>
        <h3 className="mt-3 font-display text-xl font-bold text-ink transition-colors group-hover:text-violet-300">
          {project.name}
        </h3>
        <p className="mt-1 text-sm text-muted">{project.description}</p>
      </div>
    </a>
  )
}

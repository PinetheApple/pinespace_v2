import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { featuredProject, otherProjects } from '@content/projects'
import { posts } from '@content/posts'

export function ProjectsMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="grid w-[640px] gap-2 p-2 lg:grid-cols-[.9fr_1fr]">
      <Link
        to="/projects/$slug"
        params={{ slug: featuredProject.slug }}
        onClick={onNavigate}
        className="group flex flex-col justify-end rounded-xl bg-gradient-to-b from-violet-500/15 to-well p-5 ring-1 ring-line transition-all hover:ring-violet-400 hover:shadow-glow-sm"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-violet-300">
          {featuredProject.tag}
        </span>
        <h3 className="mt-3 font-display text-2xl font-bold text-ink">
          {featuredProject.name}
        </h3>
        <p className="mt-2 text-sm text-muted">{featuredProject.description}</p>
        <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-violet-300 transition-transform group-hover:translate-x-0.5">
          Explore <ArrowRightIcon size={13} weight="bold" />
        </span>
      </Link>

      <div className="grid content-start gap-1">
        {otherProjects.map((project) => (
          <Link
            key={project.slug}
            to="/projects/$slug"
            params={{ slug: project.slug }}
            onClick={onNavigate}
            className="rounded-lg p-3 transition-colors hover:bg-elevated"
          >
            <div className="font-medium text-ink">{project.name}</div>
            <p className="mt-0.5 line-clamp-2 text-sm text-muted">
              {project.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function WritingMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="w-[520px] p-2">
      <div className="grid gap-1 sm:grid-cols-2">
        {posts.slice(0, 4).map((post) => (
          <Link
            key={post.slug}
            to="/blog/$slug"
            params={{ slug: post.slug }}
            onClick={onNavigate}
            className="rounded-lg p-3 transition-colors hover:bg-elevated"
          >
            <div className="font-medium text-ink">{post.title}</div>
            <p className="mt-0.5 line-clamp-2 text-sm text-muted">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-1 border-t border-line pt-1">
        <Link
          to="/blog"
          onClick={onNavigate}
          className="group flex items-center justify-between rounded-lg px-3 py-2.5 font-mono text-xs text-violet-300 transition-colors hover:bg-elevated hover:text-violet-200"
        >
          All writing
          <ArrowRightIcon
            size={13}
            weight="bold"
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  )
}

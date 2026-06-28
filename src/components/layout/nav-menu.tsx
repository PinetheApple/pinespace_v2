import { Link } from '@tanstack/react-router'
import { ArrowRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react'
import { featuredPost, otherPosts } from '@content/posts'
import { projects, projectLink } from '@content/projects'

export function WritingMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="grid w-[640px] gap-2 p-2 lg:grid-cols-[.9fr_1fr]">
      <Link
        to="/blog/$slug"
        params={{ slug: featuredPost.slug }}
        onClick={onNavigate}
        className="group flex flex-col justify-end rounded-xl bg-gradient-to-b from-violet-500/15 to-well p-5 ring-1 ring-line transition-all hover:shadow-glow-sm hover:ring-violet-400"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-violet-300">
          Featured
        </span>
        <h3 className="mt-3 font-display text-2xl font-bold text-ink">
          {featuredPost.title}
        </h3>
        <p className="mt-2 text-sm text-muted">{featuredPost.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-violet-300 transition-transform group-hover:translate-x-0.5">
          Read <ArrowRightIcon size={13} weight="bold" />
        </span>
      </Link>

      <div className="flex flex-col">
        <div className="grid flex-1 content-start gap-1">
          {otherPosts.slice(0, 4).map((post) => (
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
    </div>
  )
}

export function ProjectsMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="w-[560px] p-2">
      <div className="grid gap-1 sm:grid-cols-2">
        {projects.slice(0, 6).map((project) => (
          <a
            key={project.slug}
            href={projectLink(project)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
            className="group rounded-lg p-3 transition-colors hover:bg-elevated"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-ink">{project.name}</span>
              <ArrowUpRightIcon
                size={14}
                weight="bold"
                className="shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-300"
              />
            </div>
            <p className="mt-0.5 line-clamp-2 text-sm text-muted">
              {project.description}
            </p>
          </a>
        ))}
      </div>
      <div className="mt-1 border-t border-line pt-1">
        <Link
          to="/projects"
          onClick={onNavigate}
          className="group flex items-center justify-between rounded-lg px-3 py-2.5 font-mono text-xs text-violet-300 transition-colors hover:bg-elevated hover:text-violet-200"
        >
          All projects
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

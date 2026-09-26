import { useEffect, useState } from 'react'
import { cn } from '@utils/cn'

export type TocEntry = { id: string; label: string; level?: number }

export function TableOfContents({
  entries,
  className,
}: {
  entries: Array<TocEntry>
  className?: string
}) {
  const [active, setActive] = useState(entries[0]?.id)

  useEffect(() => {
    const headings = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el !== null)
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (obs) => {
        const visible = obs.filter((o) => o.isIntersecting)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '0px 0px -70% 0px' },
    )
    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [entries])

  return (
    <nav className={cn('text-sm', className)} aria-label="Table of contents">
      {entries.map((entry) => (
        <a
          key={entry.id}
          href={`#${entry.id}`}
          className={cn(
            'block border-l-2 py-1.5 transition-all ease-nocturne',
            (entry.level ?? 2) >= 3 ? 'pl-7' : 'pl-3.5',
            entry.id === active
              ? 'border-l-violet-400 text-violet-300'
              : 'border-l-line text-muted hover:text-ink-2',
          )}
        >
          {entry.label}
        </a>
      ))}
    </nav>
  )
}

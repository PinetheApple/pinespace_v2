import { Fragment } from 'react'
import { cn } from '@utils/cn'

export type Crumb = { label: string; href?: string }

export function Breadcrumb({
  items,
  className,
}: {
  items: Array<Crumb>
  className?: string
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-2 font-mono text-[13px] text-muted', className)}
    >
      {items.map((item, i) => {
        const last = i === items.length - 1
        return (
          <Fragment key={item.label}>
            {item.href && !last ? (
              <a href={item.href} className="transition-colors hover:text-violet-300">
                {item.label}
              </a>
            ) : (
              <span className={cn(last && 'text-ink')} aria-current={last ? 'page' : undefined}>
                {item.label}
              </span>
            )}
            {!last && <span className="text-faint">/</span>}
          </Fragment>
        )
      })}
    </nav>
  )
}

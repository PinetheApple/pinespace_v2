import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'
import { cn } from '@utils/cn'

export type PostLink = { label: string; href: string }

export function PrevNext({
  prev,
  next,
  className,
}: {
  prev?: PostLink
  next?: PostLink
  className?: string
}) {
  const link =
    'inline-flex items-center gap-2 rounded-lg border border-line px-4 py-[9px] font-mono text-[13px] text-ink transition-colors hover:border-violet-400'

  return (
    <div className={cn('flex items-center justify-between gap-3', className)}>
      {prev ? (
        <a href={prev.href} className={link}>
          <ArrowLeftIcon size={16} /> {prev.label}
        </a>
      ) : (
        <span />
      )}
      {next ? (
        <a href={next.href} className={link}>
          {next.label} <ArrowRightIcon size={16} />
        </a>
      ) : (
        <span />
      )}
    </div>
  )
}

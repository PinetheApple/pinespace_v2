import { cn } from '@utils/cn'

export function Tooltip({
  tip,
  className,
  children,
}: {
  tip: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <span className={cn('group relative inline-flex', className)}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-line bg-well px-2.5 py-1.5 text-xs text-ink opacity-0 shadow-2 transition-all ease-nocturne group-hover:translate-y-0 group-hover:opacity-100"
      >
        {tip}
      </span>
    </span>
  )
}

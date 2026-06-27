import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import { cn } from '@utils/cn'

const cell =
  'grid h-[38px] min-w-[38px] place-items-center rounded-lg border border-line font-mono text-[13px] text-ink-2 transition-all ease-nocturne'

function pageRange(current: number, total: number): Array<number | '…'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '…', total]
  if (current >= total - 3)
    return [1, '…', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '…', current - 1, current, current + 1, '…', total]
}

export function Pagination({
  page,
  total,
  onChange,
  className,
}: {
  page: number
  total: number
  onChange?: (page: number) => void
  className?: string
}) {
  const go = (p: number) => onChange?.(Math.min(Math.max(1, p), total))

  return (
    <nav className={cn('flex items-center gap-1.5', className)} aria-label="Pagination">
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        className={cn(cell, 'hover:border-violet-400 hover:text-violet-300 disabled:pointer-events-none disabled:opacity-35')}
        aria-label="Previous page"
      >
        <CaretLeftIcon size={14} />
      </button>
      {pageRange(page, total).map((p, i) =>
        p === '…' ? (
          <span key={`dots-${i}`} className="px-1 text-faint">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => go(p)}
            aria-current={p === page ? 'page' : undefined}
            className={cn(
              cell,
              p === page
                ? 'border-violet-500 bg-violet-500 text-white shadow-glow-sm'
                : 'hover:border-violet-400 hover:text-violet-300',
            )}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page >= total}
        className={cn(cell, 'hover:border-violet-400 hover:text-violet-300 disabled:pointer-events-none disabled:opacity-35')}
        aria-label="Next page"
      >
        <CaretRightIcon size={14} />
      </button>
    </nav>
  )
}

import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { cn } from '@utils/cn'

export function SearchBar({
  kbd = '⌘K',
  className,
  ...props
}: React.ComponentProps<'input'> & { kbd?: string }) {
  return (
    <div
      className={cn(
        'flex max-w-[420px] items-center gap-2.5 rounded-lg border border-line bg-well px-3.5 py-2.5 transition-all ease-nocturne focus-within:border-violet-400 focus-within:shadow-glow-sm',
        className,
      )}
    >
      <MagnifyingGlassIcon size={18} className="text-muted" />
      <input
        className="min-w-0 flex-1 border-none bg-transparent text-[15px] text-ink outline-none placeholder:text-faint"
        placeholder="Search posts…"
        {...props}
      />
      {kbd && (
        <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-muted">
          {kbd}
        </span>
      )}
    </div>
  )
}

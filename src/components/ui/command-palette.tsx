import { useEffect, useMemo, useState } from 'react'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { cn } from '@utils/cn'

export type CommandItem = {
  id: string
  label: string
  group: string
  icon?: React.ReactNode
  onSelect?: () => void
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])
  return { open, setOpen }
}

export function CommandPalette({
  open,
  onClose,
  items,
}: {
  open: boolean
  onClose: () => void
  items: Array<CommandItem>
}) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const filtered = useMemo(
    () =>
      items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())),
    [items, query],
  )
  const groups = useMemo(
    () => [...new Set(filtered.map((i) => i.group))],
    [filtered],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={cn(
        'fixed inset-0 z-[250] grid justify-center bg-[rgb(10_8_20/0.6)] px-4 pt-[14vh] backdrop-blur-[3px] transition-opacity ease-nocturne',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <div
        className={cn(
          'h-fit w-[min(560px,92vw)] overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2 transition-transform ease-nocturne',
          open ? 'translate-y-0' : '-translate-y-2.5',
        )}
      >
        <div className="flex items-center gap-2.5 border-b border-line px-[18px] py-4">
          <MagnifyingGlassIcon size={18} className="text-muted" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search…"
            className="min-w-0 flex-1 border-none bg-transparent text-base text-ink outline-none placeholder:text-faint"
          />
          <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-muted">
            esc
          </span>
        </div>
        <div className="max-h-[340px] overflow-auto p-2">
          {groups.map((group) => (
            <div key={group}>
              <div className="px-3 pb-1 pt-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
                {group}
              </div>
              {filtered
                .filter((i) => i.group === group)
                .map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      item.onSelect?.()
                      onClose()
                    }}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-ink-2 transition-colors hover:bg-elevated hover:text-ink [&_svg]:size-4 [&_svg]:text-muted"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-3 py-6 text-center text-sm text-faint">
              No results
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

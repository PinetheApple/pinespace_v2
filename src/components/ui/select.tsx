import { useState } from 'react'
import { CaretDownIcon, CheckIcon } from '@phosphor-icons/react'
import { cn } from '@utils/cn'
import { useClickOutside } from '@hooks/use-click-outside'

export type SelectOption = { value: string; label: string }

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select…',
  className,
}: {
  options: Array<SelectOption>
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false), open)
  const selected = options.find((o) => o.value === value)

  return (
    <div ref={ref} className={cn('relative min-w-[220px]', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex w-full items-center justify-between rounded-lg border border-line bg-well px-3.5 py-2.5 text-[15px] text-ink transition-colors',
          open && 'border-violet-400',
        )}
      >
        <span>{selected?.label ?? placeholder}</span>
        <CaretDownIcon
          size={16}
          className={cn('text-muted transition-transform', open && 'rotate-180')}
        />
      </button>
      <div
        role="listbox"
        className={cn(
          'absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-[220px] overflow-auto rounded-xl border border-line bg-surface p-1.5 shadow-2 transition-all ease-nocturne',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1.5 opacity-0',
        )}
      >
        {options.map((opt) => {
          const active = opt.value === value
          return (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={active}
              onClick={() => {
                onChange?.(opt.value)
                setOpen(false)
              }}
              className={cn(
                'flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-elevated',
                active ? 'text-violet-300' : 'text-ink-2',
              )}
            >
              {opt.label}
              <CheckIcon size={15} className={cn(active ? 'opacity-100' : 'opacity-0')} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

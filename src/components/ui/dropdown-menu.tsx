import { useState } from 'react'
import { CaretDownIcon } from '@phosphor-icons/react'
import { cn } from '@utils/cn'
import { useClickOutside } from '@hooks/use-click-outside'
import { Button } from './button'

export function DropdownMenu({
  label,
  children,
  className,
}: {
  label: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false), open)

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      <Button onClick={() => setOpen((v) => !v)}>
        {label}
        <CaretDownIcon size={16} />
      </Button>
      <div
        className={cn(
          'absolute left-0 top-[calc(100%+8px)] z-50 min-w-50 rounded-xl border border-line bg-surface p-1.5 shadow-2 transition-all ease-nocturne',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1.5 opacity-0',
        )}
        role="menu"
      >
        {children}
      </div>
    </div>
  )
}

export function DropdownItem({
  className,
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <button
      role="menuitem"
      className={cn(
        'flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm text-ink-2 transition-colors hover:bg-elevated hover:text-ink [&_svg]:size-4 [&_svg]:text-muted',
        className,
      )}
      {...props}
    />
  )
}

export function DropdownSeparator() {
  return <div className="mx-1 my-1.5 h-px bg-line" />
}

import { useEffect } from 'react'
import { cn } from '@utils/cn'

export function Burger({
  open,
  className,
  ...props
}: React.ComponentProps<'button'> & { open?: boolean }) {
  const bar = 'absolute left-3 h-0.5 w-[18px] rounded-sm bg-ink transition-all ease-nocturne'
  return (
    <button
      type="button"
      aria-label="Menu"
      aria-expanded={open}
      className={cn(
        'relative size-[42px] rounded-lg border border-line transition-colors hover:border-violet-400',
        className,
      )}
      {...props}
    >
      <span className={cn(bar, open ? 'top-5 rotate-45' : 'top-[14px]')} />
      <span className={cn(bar, 'top-5', open && 'opacity-0')} />
      <span className={cn(bar, open ? 'top-5 -rotate-45' : 'top-[26px]')} />
    </button>
  )
}

export function Drawer({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-[200] bg-[rgb(10_8_20/0.6)] backdrop-blur-[2px] transition-opacity ease-nocturne',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-[210] w-[min(340px,86vw)] border-l border-line bg-surface p-[26px] shadow-2 transition-transform ease-nocturne',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {children}
      </aside>
    </>
  )
}

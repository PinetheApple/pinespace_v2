import { InfoIcon, WarningIcon } from '@phosphor-icons/react'
import { cn } from '@utils/cn'

type Variant = 'note' | 'warning'

export function Callout({
  variant = 'note',
  className,
  children,
}: {
  variant?: Variant
  className?: string
  children: React.ReactNode
}) {
  const Icon = variant === 'warning' ? WarningIcon : InfoIcon
  return (
    <div
      className={cn(
        'flex gap-3 rounded-lg border border-line border-l-[3px] p-3.5 text-sm text-ink-2',
        variant === 'warning'
          ? 'border-l-warning bg-warning/[0.06]'
          : 'border-l-violet-500 bg-violet-400/[0.06]',
        className,
      )}
    >
      <Icon
        size={18}
        className={cn(
          'mt-0.5 shrink-0',
          variant === 'warning' ? 'text-warning' : 'text-violet-300',
        )}
      />
      <div>{children}</div>
    </div>
  )
}

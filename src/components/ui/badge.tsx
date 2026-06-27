import { cn } from '@utils/cn'

type Tone = 'violet' | 'line' | 'success' | 'warning' | 'danger'

const tones: Record<Tone, string> = {
  violet: 'bg-violet-400/15 text-violet-300',
  line: 'border border-line text-muted',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  danger: 'bg-danger/15 text-danger',
}

export function Badge({
  tone = 'violet',
  dot = false,
  className,
  children,
  ...props
}: React.ComponentProps<'span'> & { tone?: Tone; dot?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] tracking-[0.06em]',
        tones[tone],
        className,
      )}
      {...props}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}

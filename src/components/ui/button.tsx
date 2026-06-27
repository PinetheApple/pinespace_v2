import { cn } from '@utils/cn'

type Variant = 'primary' | 'ghost' | 'icon'

const base =
  'inline-flex items-center justify-center gap-2 font-mono text-[13px] rounded-lg border border-transparent transition-all ease-nocturne disabled:opacity-40 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary:
    'bg-violet-500 text-white px-4 py-[9px] shadow-glow-sm hover:bg-violet-400 hover:shadow-glow-md',
  ghost:
    'text-ink px-4 py-[9px] border-line hover:border-violet-400',
  icon: 'text-ink p-[9px] border-line hover:border-violet-400 hover:text-violet-300',
}

export function Button({
  variant = 'ghost',
  className,
  ...props
}: React.ComponentProps<'button'> & { variant?: Variant }) {
  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  )
}

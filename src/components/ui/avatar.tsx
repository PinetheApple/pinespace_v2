import { cn } from '@utils/cn'

export function Avatar({
  name,
  role,
  src,
  initial,
  className,
}: {
  name: string
  role?: string
  src?: string
  initial?: string
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="grid size-[46px] place-items-center overflow-hidden rounded-full border border-line-strong bg-gradient-to-br from-violet-500 to-violet-300 font-display font-bold text-white">
        {src ? (
          <img src={src} alt={name} className="size-full object-cover" />
        ) : (
          (initial ?? name.charAt(0).toUpperCase())
        )}
      </div>
      <div>
        <div className="font-display text-[15px] font-semibold text-ink">
          {name}
        </div>
        {role && <div className="text-[13px] text-muted">{role}</div>}
      </div>
    </div>
  )
}

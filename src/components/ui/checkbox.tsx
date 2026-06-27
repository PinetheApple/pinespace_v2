import { CheckIcon } from '@phosphor-icons/react'
import { cn } from '@utils/cn'

export function Checkbox({
  label,
  className,
  disabled,
  ...props
}: React.ComponentProps<'input'> & { label?: React.ReactNode }) {
  return (
    <label
      className={cn(
        'inline-flex select-none items-center gap-2.5 text-sm text-ink-2',
        disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
        className,
      )}
    >
      <input
        type="checkbox"
        disabled={disabled}
        className="peer pointer-events-none absolute opacity-0"
        {...props}
      />
      <span
        className={cn(
          'grid size-5 place-items-center rounded-md border-[1.5px] border-line-strong text-transparent transition-all ease-nocturne',
          'peer-checked:border-violet-500 peer-checked:bg-violet-500 peer-checked:text-white peer-checked:shadow-glow-sm',
          'peer-focus-visible:border-violet-400',
          disabled &&
            'peer-checked:border-faint peer-checked:bg-faint peer-checked:shadow-none',
        )}
      >
        <CheckIcon
          size={14}
          weight="bold"
          className="translate-x-px translate-y-px"
        />
      </span>
      {label}
    </label>
  )
}

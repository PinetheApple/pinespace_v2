import { cn } from '@utils/cn'

const thumb =
  '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-400 [&::-webkit-slider-thumb]:shadow-glow-sm [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:size-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-violet-400 [&::-moz-range-thumb]:shadow-glow-sm [&::-moz-range-thumb]:cursor-pointer'

export function Slider({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type="range"
      className={cn(
        'h-[5px] w-full max-w-[320px] cursor-pointer appearance-none rounded-full bg-well outline-none',
        thumb,
        className,
      )}
      {...props}
    />
  )
}

import { cn } from '@utils/cn'

export function Figure({
  src,
  alt,
  caption,
  className,
}: {
  src: string
  alt: string
  caption?: string
  className?: string
}) {
  return (
    <figure className={cn('flex flex-col items-center gap-2', className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="max-w-full rounded-lg border border-line bg-well"
      />
      {caption && (
        <figcaption className="font-mono text-xs text-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

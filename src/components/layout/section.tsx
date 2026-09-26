import { ArrowLink } from '@ui'
import type { LinkProps } from '@tanstack/react-router'

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      data-reveal
      className="font-mono text-xs uppercase tracking-[0.2em] text-violet-400"
    >
      {children}
    </span>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  to,
  linkLabel,
}: {
  eyebrow: string
  title: string
  to?: LinkProps['to']
  linkLabel?: string
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2
          data-reveal
          className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight"
        >
          {title}
        </h2>
      </div>
      {to && linkLabel && (
        <ArrowLink data-reveal to={to}>
          {linkLabel}
        </ArrowLink>
      )}
    </div>
  )
}

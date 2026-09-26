import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'
import { ArrowRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react'
import { cn } from '@utils/cn'

const baseClass =
  'group inline-flex items-center gap-1.5 font-mono text-[13px] text-muted transition-colors hover:text-violet-300'

export function ArrowLink({
  to,
  params,
  className,
  children,
  ...rest
}: {
  to: LinkProps['to']
  params?: LinkProps['params']
  className?: string
  children: React.ReactNode
} & Omit<React.ComponentProps<'a'>, 'href' | 'className' | 'children'>) {
  return (
    <Link
      to={to}
      params={params}
      className={cn(baseClass, className)}
      {...rest}
    >
      {children}
      <ArrowRightIcon
        size={14}
        weight="bold"
        className="transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  )
}

export function ExternalArrowLink({
  href,
  className,
  children,
  ...rest
}: React.ComponentProps<'a'> & { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(baseClass, className)}
      {...rest}
    >
      {children}
      <ArrowUpRightIcon
        size={13}
        weight="bold"
        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  )
}

import { useState } from 'react'
import { CheckIcon, CopyIcon } from '@phosphor-icons/react'
import { cn } from '@utils/cn'
import { highlight } from '@utils/highlight'
import type { Lang } from '@utils/highlight'

export function CodeBlock({
  code,
  filename,
  lang = 'text',
  className,
  children,
}: {
  code: string
  filename?: string
  lang?: Lang
  className?: string
  children?: React.ReactNode
}) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    void navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-line bg-well',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-3 py-2 font-mono text-[11px] text-muted">
        <div className="flex items-center gap-2.5">
          {filename && <span>{filename}</span>}
          {lang !== 'text' && (
            <span className="rounded bg-violet-400/15 px-1.5 py-0.5 uppercase tracking-[0.08em] text-violet-300">
              {lang}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-violet-300"
        >
          {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-[13px] leading-[1.7] text-ink-2">
          {children ?? highlight(code, lang)}
        </code>
      </pre>
    </div>
  )
}

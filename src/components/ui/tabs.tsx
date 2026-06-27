import { useState } from 'react'
import { cn } from '@utils/cn'

export type TabItem = { id: string; label: string; content: React.ReactNode }

export function Tabs({
  items,
  defaultTab,
  className,
}: {
  items: Array<TabItem>
  defaultTab?: string
  className?: string
}) {
  const [active, setActive] = useState(defaultTab ?? items[0]?.id)

  return (
    <div className={className}>
      <div className="mb-[18px] flex gap-1 border-b border-line" role="tablist">
        {items.map((tab) => {
          const isActive = tab.id === active
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={cn(
                'relative px-3.5 py-2.5 font-mono text-[13px] transition-colors',
                isActive ? 'text-violet-300' : 'text-muted hover:text-ink',
              )}
            >
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-violet-400 shadow-glow-sm" />
              )}
            </button>
          )
        })}
      </div>
      {items.map(
        (tab) =>
          tab.id === active && (
            <div
              key={tab.id}
              role="tabpanel"
              className="text-sm text-ink-2 [animation:nocturne-fade-in_0.3s]"
            >
              {tab.content}
            </div>
          ),
      )}
    </div>
  )
}

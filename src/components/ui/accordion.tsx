import { useState } from 'react'
import { PlusIcon } from '@phosphor-icons/react'
import { cn } from '@utils/cn'

export type AccordionItem = { id: string; title: React.ReactNode; body: React.ReactNode }

export function Accordion({
  items,
  defaultOpen,
  className,
}: {
  items: Array<AccordionItem>
  defaultOpen?: string
  className?: string
}) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null)

  return (
    <div className={className}>
      {items.map((item) => {
        const isOpen = open === item.id
        return (
          <div key={item.id} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-[18px] text-left font-display text-[17px] font-semibold text-ink"
            >
              {item.title}
              <PlusIcon
                size={18}
                className={cn(
                  'text-violet-400 transition-transform ease-nocturne',
                  isOpen && 'rotate-45',
                )}
              />
            </button>
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-nocturne',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="max-w-[60ch] pb-[18px] text-sm text-muted">
                  {item.body}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

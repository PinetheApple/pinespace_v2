import { useEffect, useState } from 'react'
import { ArrowUpIcon } from '@phosphor-icons/react'
import { cn } from '@utils/cn'

export function BackToTop() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={cn(
        'fixed right-6 bottom-24 z-[180] grid size-12 place-items-center rounded-full border border-violet-400/40 bg-elevated text-violet-200 shadow-glow-sm transition-all ease-nocturne hover:border-violet-400 hover:text-violet-100 hover:shadow-glow-md',
        show ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <ArrowUpIcon size={18} />
    </a>
  )
}

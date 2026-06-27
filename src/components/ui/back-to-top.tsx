import { useEffect, useState } from 'react'
import { ArrowUpIcon } from '@phosphor-icons/react'
import { cn } from '@utils/cn'

export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(document.documentElement.scrollTop > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed bottom-6 left-6 z-[150] grid size-11 place-items-center rounded-full border border-line bg-surface text-ink transition-all ease-nocturne hover:border-violet-400 hover:text-violet-300',
        show ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <ArrowUpIcon size={18} />
    </button>
  )
}

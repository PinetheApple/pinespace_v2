import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollHeight - el.clientHeight
      setProgress(scrolled > 0 ? (el.scrollTop / scrolled) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed inset-x-0 top-0 z-[300] h-[3px] origin-left bg-gradient-to-r from-violet-500 to-violet-300 shadow-glow-sm"
      style={{ transform: `scaleX(${progress / 100})` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
    />
  )
}

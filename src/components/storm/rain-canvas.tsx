import { useEffect, useRef } from 'react'
import { cn } from '@utils/cn'

type Drop = { x: number; y: number; len: number; speed: number; alpha: number }

const DENSITY = 0.00008 // drops per px² of viewport

export function RainCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // skip on reduced-motion and on touch devices (perf on low-power GPUs)
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    )
      return

    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let dpr = 1
    let drops: Array<Drop> = []
    let raf = 0
    let running = true

    const make = (): Drop => ({
      x: Math.random() * w,
      y: Math.random() * -h,
      len: 8 + Math.random() * 18,
      speed: 6 + Math.random() * 8,
      alpha: 0.06 + Math.random() * 0.16,
    })

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drops = Array.from(
        { length: Math.round(w * h * DENSITY) },
        make,
      )
    }

    const tick = () => {
      if (!running) return
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1
      ctx.lineCap = 'round'
      for (const d of drops) {
        ctx.strokeStyle = `rgba(179, 155, 255, ${d.alpha})`
        ctx.beginPath()
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(d.x - d.speed * 0.12, d.y + d.len)
        ctx.stroke()
        d.y += d.speed
        d.x -= d.speed * 0.12
        if (d.y > h) Object.assign(d, make(), { y: -d.len })
      }
      raf = requestAnimationFrame(tick)
    }

    const onVisibility = () => {
      running = document.visibilityState === 'visible'
      if (running) raf = requestAnimationFrame(tick)
      else cancelAnimationFrame(raf)
    }

    resize()
    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn('pointer-events-none fixed inset-0', className)}
    />
  )
}

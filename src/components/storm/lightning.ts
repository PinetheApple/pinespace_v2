import { gsap } from '@lib/gsap'

// Jagged top-down bolt as an SVG path string, in pixel coordinates.
function makeBolt(w: number, h: number): string {
  let x = w * (0.3 + Math.random() * 0.4)
  let y = 0
  let d = `M ${x.toFixed(1)} 0`
  const step = h / 9
  while (y < h) {
    y += step * (0.7 + Math.random() * 0.6)
    x += (Math.random() - 0.5) * w * 0.18
    x = Math.max(w * 0.05, Math.min(w * 0.95, x))
    d += ` L ${x.toFixed(1)} ${Math.min(y, h).toFixed(1)}`
  }
  return d
}

export type StormTargets = {
  svg: SVGSVGElement
  flash: HTMLElement
  bolt: SVGPathElement
  shake: HTMLElement
  onStrike?: () => void
}

export function startStorm({ svg, flash, bolt, shake, onStrike }: StormTargets) {
  let killed = false
  let active: gsap.core.Timeline | null = null
  let next: gsap.core.Tween | null = null

  const strike = () => {
    if (killed) return
    const r = svg.getBoundingClientRect()
    const w = Math.max(1, r.width)
    const h = Math.max(1, r.height)
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`)
    bolt.setAttribute('d', makeBolt(w, h))

    const tl = gsap.timeline({
      onComplete: schedule,
      defaults: { ease: 'none' },
    })
    active = tl

    // pre-flash glow → bolt draw → blinding bloom → decay
    tl.set(bolt, { drawSVG: '0%', opacity: 1 })
      // violet pre-flash glow
      .to(flash, { opacity: 0.22, backgroundColor: '#8f6bff', duration: 0.16 })
      .to(flash, { opacity: 0.05, duration: 0.08 })
      // bolt strikes + blinding white bloom
      .to(bolt, { drawSVG: '100%', duration: 0.1 })
      .to(flash, { opacity: 0.9, backgroundColor: '#ffffff', duration: 0.04 }, '<')
      .add(() => onStrike?.())
      .to(flash, { opacity: 0, duration: 0.35, ease: 'power2.out' }, '<0.03')
      .to(bolt, { opacity: 0, duration: 0.28 }, '<')
      .to(
        shake,
        {
          keyframes: {
            x: [-5, 4, -3, 2, 0],
            y: [3, -3, 2, -1, 0],
            easeEach: 'none',
          },
          duration: 0.24,
        },
        '<',
      )

    // ~55% chance of a secondary echo flicker
    if (Math.random() < 0.55) {
      tl.to(flash, { opacity: 0.4, backgroundColor: '#ffffff', duration: 0.04 }, '+=0.16').to(
        flash,
        { opacity: 0, duration: 0.26 },
      )
    }
  }

  const schedule = () => {
    if (killed) return
    next = gsap.delayedCall(4 + Math.random() * 7, strike)
  }

  // first strike comes soon after load, then it self-schedules
  next = gsap.delayedCall(1, strike)

  return () => {
    killed = true
    next?.kill()
    active?.kill()
    gsap.set([flash, bolt], { clearProps: 'all' })
  }
}

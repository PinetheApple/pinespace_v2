import { useRef } from 'react'
import {
  Link,
  useRouter,
  type ErrorComponentProps,
} from '@tanstack/react-router'
import { ArrowClockwiseIcon, HouseIcon } from '@phosphor-icons/react'
import { gsap, useGSAP, SplitText } from '@lib/gsap'
import { Magnetic } from '@ui'
import { site } from '@config/site'
import { Container, PageLayout } from './layout'

// Snoopy's plane is hit — the radio cuts out mid-mayday.
const TRANSMISSION = [
  'Mayday, mayday —',
  'Mayday, mayday — Pine Space is going down over open water—',
  'Mayday — we lost an engine mid-render—',
  'Mayday — we lost an engine mid-render. Snoopy bailed out; the flight recorder caught what broke. Read it below, then bring her around for another pass.',
]
const FINAL = TRANSMISSION[TRANSMISSION.length - 1]

const MAX_ERROR_CHARS = 160
function trimError(message: string): string {
  const firstLine = message.split('\n')[0].trim()
  if (firstLine.length <= MAX_ERROR_CHARS) return firstLine
  return `${firstLine.slice(0, MAX_ERROR_CHARS).trimEnd()}…`
}

export function ErrorBoundary({ error, reset }: ErrorComponentProps) {
  const scope = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useGSAP(
    () => {
      const root = scope.current
      if (!root) return

      const type = root.querySelector<HTMLElement>('[data-type]')
      const motionOk = window.matchMedia(
        '(prefers-reduced-motion: no-preference)',
      ).matches
      const fine = window.matchMedia('(pointer: fine)').matches
      const willType = motionOk && fine

      // fill the line statically unless the typewriter will animate it
      if (type) type.textContent = willType ? '' : FINAL

      // red alarm pulse + headline scramble — shared by desktop & touch
      const runAlarm = () => {
        const alarm = root.querySelector<HTMLElement>('[data-alarm]')
        const shake = root.querySelector<HTMLElement>('[data-shake]')
        const split = new SplitText('[data-headline]', { type: 'chars' })

        const scramble = () => {
          if (!split.chars.length) return
          const chars = gsap.utils.shuffle([...split.chars])
          gsap.to(chars.slice(0, Math.ceil(chars.length * 0.5)), {
            duration: 0.5,
            ease: 'none',
            stagger: 0.01,
            scrambleText: {
              text: '{original}',
              chars: '!<>-_\\/[]{}—=+*?#',
              speed: 1,
            },
          })
        }

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.4 })
        if (alarm)
          tl.to(alarm, { opacity: 0.85, duration: 0.12, ease: 'power2.out' })
            .add(scramble)
            .to(
              shake,
              {
                keyframes: { x: [-4, 3, -2, 1, 0], y: [2, -2, 1, 0] },
                duration: 0.22,
              },
              '<',
            )
            .to(alarm, { opacity: 0.12, duration: 0.5, ease: 'power2.in' })
            .to(alarm, { opacity: 0.55, duration: 0.12 })
            .to(alarm, { opacity: 0, duration: 0.6, ease: 'power2.in' })

        return () => {
          tl.kill()
          split.revert()
          if (alarm) gsap.set(alarm, { clearProps: 'all' })
        }
      }

      const startWobble = (el: Element | null) => {
        if (!el) return
        gsap.to(el, {
          rotation: 5,
          duration: 2.2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        })
        gsap.to(el, {
          y: '+=14',
          duration: 1.6,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        })
      }

      const mm = gsap.matchMedia()

      // desktop: full experience
      mm.add(
        '(prefers-reduced-motion: no-preference) and (pointer: fine)',
        () => {
          const snoopy = root.querySelector('[data-snoopy]')

          gsap
            .timeline({ defaults: { ease: 'power3.out' } })
            .from('[data-snoopy]', {
              y: -48,
              scale: 0.8,
              rotation: -12,
              opacity: 0,
              duration: 0.7,
            })
            .from(
              '[data-reveal]',
              { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 },
              '-=0.3',
            )
            .add(() => startWobble(snoopy))

          if (type) {
            const tw = gsap.timeline({ delay: 0.5 })
            let prev = ''
            for (const line of TRANSMISSION) {
              const delta = Math.abs(line.length - prev.length)
              tw.to(type, {
                text: { value: line },
                duration: Math.max(0.4, delta * 0.035),
                ease: 'none',
              }).to({}, { duration: 1 })
              prev = line
            }
          }

          return runAlarm()
        },
      )

      // touch: alarm + scramble only — no entrance jump, no typewriter stall
      mm.add(
        '(prefers-reduced-motion: no-preference) and (pointer: coarse)',
        () => runAlarm(),
      )

      return () => mm.revert()
    },
    { scope },
  )

  const retry = () => {
    reset()
    router.invalidate()
  }

  return (
    <PageLayout>
      <div ref={scope}>
        {/* red cockpit-alarm pulse */}
        <div
          data-alarm
          aria-hidden
          className="pointer-events-none fixed inset-0 z-20 opacity-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(255,107,129,0.28) 100%)',
          }}
        />

        <div className="relative z-10 flex min-h-[calc(100dvh-3.5rem)] items-center overflow-hidden py-20">
          <Container data-shake className="text-center">
            {/* decorative graphic as a background-image: no broken-image box or
                alt-text flash while the asset loads; drop-shadow hugs the
                transparent webp's alpha. a11y via role + aria-label. */}
            <div
              data-snoopy
              role="img"
              aria-label="Snoopy the Flying Ace, plane hit and going down"
              style={{ backgroundImage: 'url(/snoopy_mayday.webp)' }}
              className="mx-auto size-45 rounded-2xl bg-cover bg-center bg-no-repeat drop-shadow-[0_0_44px_rgb(255_107_129/0.45)]"
            />

            <p
              data-reveal
              className="mt-10 font-mono text-xs uppercase tracking-[0.3em] text-danger"
            >
              Error 500 · something crashed
            </p>

            <h1
              data-reveal
              data-headline
              className="mt-4 font-display text-7xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-8xl"
            >
              May
              <span
                className="text-danger"
                style={{ textShadow: '0 0 60px rgb(255 107 129 / 0.55)' }}
              >
                day
              </span>
            </h1>

            <p className="mx-auto mt-6 min-h-24 max-w-prose text-lg text-muted">
              <span data-type>{FINAL}</span>
              <span
                aria-hidden
                className="nocturne-caret ml-0.5 inline-block w-0.5 text-danger"
              >
                ▋
              </span>
            </p>

            {/* flight recorder — the actual error for whoever's debugging */}
            <div
              data-reveal
              className="mx-auto mt-8 max-w-lg overflow-hidden rounded-xl border border-danger/30 bg-well/80 text-left"
            >
              <div className="flex items-center gap-2 border-b border-danger/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-danger/80">
                <span className="size-1.5 animate-pulse rounded-full bg-danger" />
                Flight recorder
              </div>
              <code className="block px-4 py-3 font-mono text-xs break-words text-ink-2">
                {error.message ? trimError(error.message) : 'Unknown error'}
              </code>
            </div>

            <div
              data-reveal
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <Magnetic>
                <button
                  onClick={retry}
                  className="inline-flex items-center gap-2 rounded-lg bg-violet-500 px-4 py-2.5 font-mono text-[13px] text-white shadow-glow-sm transition-all ease-nocturne hover:bg-violet-400 hover:shadow-glow-md"
                >
                  <ArrowClockwiseIcon size={16} /> Try again
                </button>
              </Magnetic>
              <Magnetic>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 font-mono text-[13px] text-ink transition-colors hover:border-violet-400"
                >
                  <HouseIcon size={16} /> Back home
                </Link>
              </Magnetic>
            </div>

            <p data-reveal className="mt-12 font-mono text-xs text-faint">
              {site.handle}
            </p>
          </Container>
        </div>
      </div>
    </PageLayout>
  )
}

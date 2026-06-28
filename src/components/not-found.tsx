import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeftIcon, HouseIcon } from '@phosphor-icons/react'
import { gsap, useGSAP, SplitText } from '@lib/gsap'
import {
  mediaMatches,
  MOTION_DESKTOP,
  MOTION_OK,
  MOTION_TOUCH,
  POINTER_FINE,
} from '@lib/motion'
import { startStorm } from '@components/storm/lightning'
import { Magnetic } from '@ui'
import { RainCanvas } from '@components/storm/rain-canvas'
import { site } from '@config/site'
import { Container, PageLayout } from './layout'

// Snoopy's writer's block — he keeps starting over.
const DRAFTS = [
  'It was a dark and stormy night…',
  'It was a dark and stormy night… and the wind howled—',
  'It was a dark and stormy night…',
  'It was a dark and stormy night… and this page was nowhere to be found. Snoopy typed every URL on the site — this one isn’t in the manuscript.',
]
const FINAL = DRAFTS[DRAFTS.length - 1]

export function NotFound() {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = scope.current
      if (!root) return

      const type = root.querySelector<HTMLElement>('[data-type]')
      const willType = mediaMatches(MOTION_OK) && mediaMatches(POINTER_FINE)

      // fill the line statically unless the typewriter will animate it
      if (type) type.textContent = willType ? '' : FINAL

      // lightning + headline scramble — shared by desktop & touch
      const runStorm = () => {
        const flash = root.querySelector<HTMLElement>('[data-flash]')
        const svg = root.querySelector<SVGSVGElement>('[data-svg]')
        const bolt = root.querySelector<SVGPathElement>('[data-bolt]')
        const shake = root.querySelector<HTMLElement>('[data-shake]')
        const split = new SplitText('[data-headline]', { type: 'chars' })

        const scramble = () => {
          if (!split.chars.length) return
          const chars = gsap.utils.shuffle([...split.chars])
          gsap.to(chars.slice(0, Math.ceil(chars.length * 0.45)), {
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

        const stop =
          flash && bolt && svg && shake
            ? startStorm({ svg, flash, bolt, shake, onStrike: scramble })
            : undefined
        return () => {
          stop?.()
          split.revert()
        }
      }

      const mm = gsap.matchMedia()

      // desktop: full experience
      mm.add(MOTION_DESKTOP, () => {
        const snoopy = root.querySelector('[data-snoopy]')

        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('[data-snoopy]', {
            y: -48,
            scale: 0.8,
            opacity: 0,
            duration: 0.7,
          })
          .from(
            '[data-reveal]',
            { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 },
            '-=0.3',
          )
          .add(() => snoopy?.classList.add('nocturne-float'))

        if (type) {
          const tw = gsap.timeline({ delay: 0.5 })
          let prev = ''
          for (const draft of DRAFTS) {
            const delta = Math.abs(draft.length - prev.length)
            tw.to(type, {
              text: { value: draft },
              duration: Math.max(0.4, delta * 0.035),
              ease: 'none',
            }).to({}, { duration: 1 })
            prev = draft
          }
        }

        return runStorm()
      })

      // touch: lightning only — no rain, no entrance jump, no typewriter stall
      mm.add(MOTION_TOUCH, () => runStorm())

      return () => mm.revert()
    },
    { scope },
  )

  return (
    <PageLayout>
      <div ref={scope}>
        <RainCanvas className="z-0" />

        {/* lightning bolt */}
        <svg
          data-svg
          viewBox="0 0 100 100"
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-12 h-[70vh] w-full"
          style={{
            filter:
              'drop-shadow(0 0 10px #b39bff) drop-shadow(0 0 24px #8f6bff)',
          }}
        >
          <path
            data-bolt
            fill="none"
            stroke="#ffffff"
            strokeWidth={3}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={0}
          />
        </svg>

        {/* lightning flash */}
        <div
          data-flash
          aria-hidden
          className="pointer-events-none fixed inset-0 z-20 opacity-0"
        />

        <div className="relative z-10 flex min-h-[calc(100dvh-3.5rem)] items-center overflow-hidden py-20">
          <Container data-shake className="text-center">
            {/* decorative graphic as a background-image: no broken-image box or
              alt-text flash while the asset loads; drop-shadow still hugs the
              transparent webp's alpha. a11y via role + aria-label. */}
            <div
              data-snoopy
              role="img"
              aria-label="Snoopy atop his doghouse in the rain"
              style={{ backgroundImage: 'url(/snoopy_rain.gif)' }}
              className="mx-auto size-45 rounded-2xl bg-cover bg-center bg-no-repeat drop-shadow-[0_0_44px_rgb(143_107_255/0.5)]"
            />

            <p
              data-reveal
              className="mt-10 font-mono text-xs uppercase tracking-[0.3em] text-violet-400"
            >
              Error 404 · page not found
            </p>

            <h1
              data-reveal
              data-headline
              className="mt-4 font-display text-7xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-8xl"
            >
              Dark &amp;{' '}
              <span className="text-violet-400 text-shadow-(--shadow-glow-lg)">
                stormy
              </span>
            </h1>

            <p className="mx-auto mt-6 min-h-24 max-w-prose text-lg text-muted">
              <span data-type>{FINAL}</span>
              <span
                aria-hidden
                className="nocturne-caret ml-0.5 inline-block w-0.5 text-violet-300"
              >
                ▋
              </span>
            </p>

            <div
              data-reveal
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <Magnetic>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-lg bg-violet-500 px-4 py-2.5 font-mono text-[13px] text-white shadow-glow-sm transition-all ease-nocturne hover:bg-violet-400 hover:shadow-glow-md"
                >
                  <HouseIcon size={16} /> Back home
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 font-mono text-[13px] text-ink transition-colors hover:border-violet-400"
                >
                  <ArrowLeftIcon size={16} /> Read the writing
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

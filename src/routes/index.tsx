import { useRef } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { Container, PageLayout, SectionEyebrow, SectionHeader } from '@layout'
import { ProjectCard } from '@layout/project-card'
import { ArrowLink, PostListItem } from '@ui'
import { gsap, useGSAP, SplitText } from '@lib/gsap'
import { MOTION_DESKTOP, MOTION_TOUCH } from '@lib/motion'
import { createSectionReveals } from '@lib/reveals'
import { RainCanvas } from '@components/storm/rain-canvas'
import { site } from '@config/site'
import { projects } from '@content/projects'
import { featuredPost, otherPosts } from '@content/posts'

export const Route = createFileRoute('/')({ component: Home })

const HERO_RAIN_DENSITY = 0.00004
const FEATURED_PROJECT_COUNT = 4
const RECENT_POST_COUNT = 2

function Home() {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = scope.current
      if (!root) return

      const heroIntro = () => {
        const split = new SplitText('[data-hero-title]', { type: 'words' })
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('[data-hero-label]', {
            duration: 1,
            scrambleText: {
              text: '{original}',
              chars: '!<>-_\\/[]{}—=+*?#',
              speed: 0.4,
            },
          })
          .from(
            split.words,
            { y: 40, opacity: 0, duration: 0.7, stagger: 0.06 },
            '-=0.6',
          )
          .from(
            '[data-hero-reveal]',
            { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 },
            '-=0.35',
          )
          .from(
            '[data-snoopy]',
            { y: -30, scale: 0.85, opacity: 0, duration: 0.7 },
            '<',
          )
          .add(() => {
            root.querySelector('[data-snoopy]')?.classList.add('nocturne-float')
          })
        return () => split.revert()
      }

      const mm = gsap.matchMedia()

      mm.add(MOTION_DESKTOP, () => {
        const cleanups = [heroIntro(), createSectionReveals(root)]
        return () => cleanups.forEach((c) => c())
      })

      mm.add(MOTION_TOUCH, () => createSectionReveals(root))

      return () => mm.revert()
    },
    { scope },
  )

  return (
    <PageLayout>
      <div ref={scope}>
        <Hero />
        <FeaturedProjects />
        <RecentWriting />
        <AboutTeaser />
      </div>
    </PageLayout>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <RainCanvas cover="parent" density={HERO_RAIN_DENSITY} className="z-0" />

      <Container className="relative z-10 flex min-h-[calc(100dvh-3.5rem)] items-center">
        <div className="flex w-full flex-col-reverse items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p
              data-hero-label
              className="font-mono text-xs tracking-[0.2em] text-violet-400 uppercase"
            >
              {site.handle} · {site.tagline}
            </p>
            <h1
              data-hero-title
              className="mt-4 font-display text-6xl font-extrabold tracking-tight uppercase"
            >
              Building{' '}
              <span className="text-violet-400 text-shadow-(--shadow-glow-lg)">
                software
              </span>
            </h1>
            <p data-hero-reveal className="mt-6 max-w-prose text-lg text-muted">
              {site.description}
            </p>
            <div
              data-hero-reveal
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-lg bg-violet-500 px-4 py-2.5 font-mono text-[13px] text-white shadow-glow-sm transition-all ease-nocturne hover:bg-violet-400 hover:shadow-glow-md"
              >
                View projects <ArrowRightIcon size={16} />
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 font-mono text-[13px] text-ink transition-colors hover:border-violet-400"
              >
                Read the writing
              </Link>
            </div>
          </div>

          <div
            data-snoopy
            role="img"
            aria-label="Snoopy the flying ace, scarf in the wind"
            style={{ backgroundImage: 'url(/snoopy_main.webp)' }}
            className="h-48 w-40 shrink-0 self-center rounded-2xl bg-contain bg-center bg-no-repeat drop-shadow-[0_0_44px_rgb(143_107_255/0.45)] sm:h-72 sm:w-60"
          />
        </div>
      </Container>
    </section>
  )
}

function FeaturedProjects() {
  return (
    <section data-section id="work" className="border-t border-line">
      <Container className="py-20 sm:py-28">
        <SectionHeader
          eyebrow="Selected work"
          title="Projects"
          to="/projects"
          linkLabel="All projects"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {projects.slice(0, FEATURED_PROJECT_COUNT).map((project) => (
            <div key={project.slug} data-reveal>
              <ProjectCard project={project} className="h-full" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function RecentWriting() {
  const recent = [featuredPost, ...otherPosts.slice(0, RECENT_POST_COUNT)]
  return (
    <section data-section className="border-t border-line">
      <Container className="py-20 sm:py-28">
        <SectionHeader
          eyebrow="Writing"
          title="From the blog"
          to="/blog"
          linkLabel="All posts"
        />
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {recent.filter(Boolean).map((post) => (
            <li key={post.slug} data-reveal>
              <PostListItem post={post} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function AboutTeaser() {
  return (
    <section data-section className="border-t border-line">
      <Container className="py-20 sm:py-28">
        <SectionEyebrow>About</SectionEyebrow>
        <p
          data-reveal
          className="mt-6 max-w-3xl font-display text-2xl font-bold leading-snug text-ink-2 sm:text-3xl"
        >
          Full-stack developer building AI-powered web apps — React up front,
          Python and NestJS behind. Started out in cybersecurity; still curious
          about systems, from Windows internals to Rust interpreters.
        </p>
        <ArrowLink data-reveal to="/about" className="mt-8">
          More about me
        </ArrowLink>
      </Container>
    </section>
  )
}

import { useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { PageLayout, Container, SectionEyebrow } from '@layout'
import { Badge, ExternalArrowLink } from '@ui'
import { gsap, useGSAP } from '@lib/gsap'
import { MOTION_OK } from '@lib/motion'
import { createSectionReveals } from '@lib/reveals'

export const Route = createFileRoute('/about')({ component: About })

type Stint = {
  period: string
  role: string
  org: string
  summary: string
}

const STINTS: Array<Stint> = [
  {
    period: '2025–present',
    role: 'Full Stack Developer',
    org: 'AI startup',
    summary:
      'Building web applications with React and TypeScript, backed by Python and NestJS services. Joined as an intern before moving into a full-time role.',
  },
  {
    period: '2024',
    role: 'Cybersecurity Intern',
    org: 'Airbus · Security Operations Centre',
    summary:
      'Monitored logs and built Splunk alerts, developed auditd use cases for Linux systems, and studied Windows internals and container security.',
  },
  {
    period: '2023',
    role: 'Student Trainee',
    org: 'Bosch',
    summary:
      'Developed Java software for the systems engineering department to automate system model migration between modelling tools.',
  },
]

const SKILLS = [
  'TypeScript',
  'React',
  'Python',
  'NestJS',
  'Java',
  'AWS',
  'GCP',
  'Linux',
  'Bash',
]

const CERTS = [
  'Red Hat Certified Systems Administrator (RHCSA)',
  'Cisco Certified Support Technician (Cybersecurity)',
]

const INTERESTS = ['Sports', 'Drums', 'Calisthenics', 'Bouldering']

const PROFILES = [
  { label: 'GitHub', href: 'https://github.com/PinetheApple' },
  { label: 'TryHackMe', href: 'https://tryhackme.com/p/PineApple' },
  { label: 'HackTheBox', href: 'https://app.hackthebox.com/profile/1050973' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/PineBot/' },
  { label: 'RSS', href: '/rss.xml' },
]

function About() {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => createSectionReveals(root, 'top 85%'))
      return () => mm.revert()
    },
    { scope },
  )

  return (
    <PageLayout>
      <div ref={scope}>
        <Container className="py-12 sm:py-24">
          <section data-section>
            <SectionEyebrow>whoami</SectionEyebrow>
            <h1
              data-reveal
              className="mt-4 font-display text-5xl font-extrabold uppercase tracking-tight"
            >
              About
            </h1>
            <div
              data-reveal
              className="mt-8 max-w-2xl space-y-4 text-lg text-muted"
            >
              <p>
                I'm Jonathan, a full-stack developer at an AI startup. I build
                web applications with React and TypeScript, backed by Python and
                NestJS services on AWS.
              </p>
              <p>
                Before this, I worked in the Security Operations Centre at
                Airbus, monitoring logs and building alerts in Splunk. Outside
                work, I build systems projects, including a sandbox detector in
                C++ and an interpreter in Rust. I also take part in CTFs and use
                TryHackMe and HackTheBox.
              </p>
              <p>
                I graduated in 2024 with a degree in computer science
                engineering and am based in India. I use this site to share my
                projects and write about security and systems.
              </p>
            </div>
          </section>

          <AboutSection title="Where I've worked">
            <ol className="mt-8 border-l border-line">
              {STINTS.map((stint) => (
                <TimelineItem key={stint.period} stint={stint} />
              ))}
            </ol>
          </AboutSection>

          <AboutSection title="Toolbox">
            <BadgeList items={SKILLS} />
          </AboutSection>

          <AboutSection title="Certifications">
            <ul data-reveal className="mt-6 max-w-2xl space-y-2 text-muted">
              {CERTS.map((cert) => (
                <li key={cert} className="flex items-baseline gap-3">
                  <span aria-hidden className="text-violet-400">
                    ▸
                  </span>
                  {cert}
                </li>
              ))}
            </ul>
          </AboutSection>

          <AboutSection title="Off the keyboard">
            <BadgeList items={INTERESTS} />
          </AboutSection>

          <AboutSection title="Elsewhere">
            <ul data-reveal className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              {PROFILES.map((profile) => (
                <li key={profile.label}>
                  <ExternalArrowLink href={profile.href}>
                    {profile.label}
                  </ExternalArrowLink>
                </li>
              ))}
            </ul>
          </AboutSection>

          <AboutSection title="Contact">
            <p data-reveal className="mt-6 max-w-2xl text-muted">
              You can reach me via email at{' '}
              <ExternalArrowLink href="mailto:contact@pinespace.dev">
                contact@pinespace.dev
              </ExternalArrowLink>
              .
            </p>
          </AboutSection>
        </Container>
      </div>
    </PageLayout>
  )
}

function AboutSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section data-section className="mt-16 sm:mt-20">
      <h2
        data-reveal
        className="font-display text-2xl font-bold uppercase tracking-tight"
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function TimelineItem({ stint }: { stint: Stint }) {
  return (
    <li data-reveal className="relative pb-10 pl-8 last:pb-0">
      <span
        aria-hidden
        className="absolute top-1.5 -left-1.25 size-2.5 rounded-full bg-violet-400 shadow-glow-sm"
      />
      <span className="font-mono text-xs text-faint">{stint.period}</span>
      <h3 className="mt-1 font-display text-lg font-bold text-ink">
        {stint.role}{' '}
        <span className="font-normal text-muted">· {stint.org}</span>
      </h3>
      <p className="mt-2 max-w-2xl text-sm text-muted">{stint.summary}</p>
    </li>
  )
}

function BadgeList({ items }: { items: Array<string> }) {
  return (
    <div data-reveal className="mt-6 flex max-w-2xl flex-wrap gap-2">
      {items.map((item) => (
        <Badge key={item} tone="line">
          {item}
        </Badge>
      ))}
    </div>
  )
}

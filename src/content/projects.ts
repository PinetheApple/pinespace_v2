export type Project = {
  slug: string
  name: string
  tagline: string
  description: string
  tag: string
  body: string
  featured?: boolean
}

export const projects: Array<Project> = [
  {
    slug: 'nocturne',
    name: 'Nocturne',
    tagline: 'Motion-first design system',
    description:
      'The violet-slate component library powering this site. GSAP-driven, accessible, dark by default.',
    tag: 'Design system',
    body: 'Nocturne is the design language behind Pine Space — a dark, violet-slate system built around motion and restraint.',
    featured: true,
  },
  {
    slug: 'pine-space',
    name: 'Pine Space',
    tagline: 'This site',
    description: 'Personal portfolio + blog on TanStack Start.',
    tag: 'Web',
    body: 'A motion-forward personal platform: content-first, fast, accessible.',
  },
  {
    slug: 'storm',
    name: 'Storm',
    tagline: '404 weather engine',
    description: 'Canvas rain + procedural lightning for the not-found page.',
    tag: 'Canvas',
    body: 'A tiny weather engine: canvas rain plus procedural lightning that scrambles the headline on each strike.',
  },
  {
    slug: 'rss-kit',
    name: 'RSS Kit',
    tagline: 'Feed generation',
    description: 'Typed RSS/Atom builder for content-driven sites.',
    tag: 'Library',
    body: 'A typed RSS/Atom builder for content-driven sites.',
  },
]

export const featuredProject = projects.find((p) => p.featured) ?? projects[0]

export const otherProjects = projects.filter((p) => p !== featuredProject)

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug)

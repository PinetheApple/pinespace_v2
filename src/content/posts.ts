export type Post = {
  slug: string
  title: string
  excerpt: string
  date: string
  body: string
}

export const posts: Array<Post> = [
  {
    slug: 'hello-world',
    title: 'Hello, world',
    excerpt: 'First post. Why I rebuilt the site from scratch with motion in mind.',
    date: '2026-06-25',
    body: 'This is placeholder body copy. Later this will be MDX rendered from the database. For now it is a plain string so the blog routes work end to end.',
  },
  {
    slug: 'motion-with-gsap',
    title: 'Motion with GSAP',
    excerpt: 'Notes on building scroll-driven animation that respects reduced motion.',
    date: '2026-06-20',
    body: 'GSAP plus ScrollTrigger plus useGSAP gives you cleanup for free and matchMedia keeps it accessible.',
  },
]

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)

export const site = {
  name: 'Pine Space',
  handle: 'pine.space',
  tagline: 'software & words',
  description: 'Software Engineer',
  url: 'https://pinespace.dev',
  nav: [
    { label: 'Work', to: '/', hash: 'work' },
    { label: 'Projects', to: '/projects', menu: 'projects' },
    { label: 'Writing', to: '/blog', menu: 'writing' },
    { label: 'About', to: '/about' },
  ],
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/PinetheApple',
      icon: 'github-logo',
    },
    { label: 'RSS', href: '/rss.xml', icon: 'rss' },
  ],
} as const

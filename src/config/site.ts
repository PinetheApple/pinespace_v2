export const site = {
  name: 'Pine Space',
  handle: 'pine.space',
  tagline: 'software & words',
  description: 'Engineer & writer. Fast, considered things for the web.',
  url: 'https://pine.space',
  nav: [
    { label: 'Work', to: '/', hash: 'work' },
    { label: 'Writing', to: '/blog' },
    { label: 'About', to: '/about' },
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/PinetheApple', icon: 'github-logo' },
    { label: 'RSS', href: '/rss.xml', icon: 'rss' },
  ],
} as const

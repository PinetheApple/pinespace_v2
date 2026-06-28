export type Project = {
  slug: string
  name: string
  tagline: string
  description: string
  tag: string
  image?: string
  repoUrl?: string
  liveUrl?: string
}

export const projects: Array<Project> = [
  {
    slug: 'windows-sandbox-evasion',
    name: 'Windows Sandbox Evasion',
    tagline: 'Sandbox/VM detection',
    description:
      'A C++ application to detect whether the environment it runs in is a sandbox/VM using the Windows API.',
    tag: 'C++ · Security',
    image: '/projects/windows-sandbox-evasion.jpg',
    repoUrl: 'https://github.com/PinetheApple/windows_sandbox_detection',
  },
  {
    slug: 'lox-interpreter',
    name: 'Lox Interpreter',
    tagline: 'Language interpreter',
    description:
      'An interpreter for the Lox language, written in Rust. (In progress.)',
    tag: 'Rust',
    image: '/projects/lox-interpreter.png',
    repoUrl: 'https://github.com/PinetheApple/interpreter_rs',
  },
  {
    slug: 'email-security',
    name: 'Email Security Tool',
    tagline: 'ML phishing detection',
    description:
      'A Python email security tool that uses machine learning to better identify phishing emails.',
    tag: 'Python · ML',
    image: '/projects/email-security.jpg',
    repoUrl: 'https://github.com/PinetheApple/advanced_email_security',
  },
  {
    slug: 'process-status-lister',
    name: 'Process Status Lister',
    tagline: 'Windows process lister',
    description:
      'Lists running processes on a Windows system. Written in C++ and also translated into Rust.',
    tag: 'C++ · Rust',
    image: '/projects/process-status.jpg',
    repoUrl: 'https://github.com/PinetheApple/proclist_rs',
  },
  {
    slug: 'uninstall-tool',
    name: 'Uninstallation Program',
    tagline: 'Clean Linux uninstalls',
    description:
      'A Rust tool that makes completely uninstalling software on Linux easier.',
    tag: 'Rust',
    image: '/projects/uninstall.jpg',
    repoUrl: 'https://github.com/PinetheApple/uninstall_rust',
  },
  {
    slug: 'portfolio-website',
    name: 'Portfolio Website',
    tagline: 'Previous portfolio',
    description:
      'A portfolio website built with GatsbyJS, a React-based framework.',
    tag: 'GatsbyJS · React',
    image: '/projects/portfolio.png',
    repoUrl: 'https://github.com/PinetheApple/pinetheapple_2',
  },
  {
    slug: 'discord-music-bot',
    name: 'Discord Music Bot',
    tagline: 'Spotify & YouTube playback',
    description:
      'A Discord bot in Python that plays music from Spotify and YouTube, built with Disnake.',
    tag: 'Python',
    image: '/projects/discord-music-bot.jpg',
    repoUrl: 'https://github.com/PinetheApple/DiscordMusicBot',
  },
]

export const projectLink = (project: Project) =>
  project.liveUrl ?? project.repoUrl ?? '#'

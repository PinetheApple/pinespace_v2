import { GithubLogo, Rss } from '@phosphor-icons/react'
import { site } from '@config/site'
import { Container } from './container'

const SOCIAL_ICONS = {
  'github-logo': GithubLogo,
  rss: Rss,
} as const

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <Container className="flex items-center justify-between">
        <p className="font-mono text-xs text-faint">
          © {new Date().getFullYear()} {site.handle}
        </p>

        <div className="flex items-center gap-1">
          {site.socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon]
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  social.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                aria-label={social.label}
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-ink"
              >
                <Icon size={16} weight="bold" />
              </a>
            )
          })}
        </div>
      </Container>
    </footer>
  )
}

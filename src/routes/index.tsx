import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@layout'
import { site } from '@config/site'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="flex min-h-dvh items-center">
      <Container>
        <p className="font-mono text-xs tracking-[0.2em] text-violet-400 uppercase">
          {site.handle} · design system v1
        </p>
        <h1 className="mt-4 font-display text-6xl font-extrabold tracking-tight uppercase">
          Building{' '}
          <span className="text-violet-400 text-shadow-(--shadow-glow-lg)">
            software
          </span>
        </h1>
        <p className="mt-6 max-w-prose text-lg text-muted">{site.description}</p>
      </Container>
    </main>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { PageLayout, Container } from '@layout'

export const Route = createFileRoute('/about')({ component: About })

function About() {
  return (
    <PageLayout>
      <Container className="py-24">
        <h1 className="font-display text-5xl font-extrabold uppercase tracking-tight">
          About
        </h1>
      </Container>
    </PageLayout>
  )
}

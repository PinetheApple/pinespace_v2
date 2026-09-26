import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import * as Sentry from '@sentry/tanstackstart-react'
import { routeTree } from './routeTree.gen'
import { ErrorBoundary } from '@components/error-boundary'
import { NotFound } from '@components/not-found'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: ErrorBoundary,
    defaultNotFoundComponent: NotFound,
  })

  if (!router.isServer) {
    Sentry.addIntegration(
      Sentry.tanstackRouterBrowserTracingIntegration(router),
    )
  }

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}

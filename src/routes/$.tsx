import { createFileRoute } from '@tanstack/react-router'
import { respondNotFound } from '@lib/http'
import { NotFound } from '@components/not-found'

// Catch-all for any unclaimed path. Render NotFound (a thrown notFound() bails
// the dev SSR handler to a bare "Cannot GET"); set the 404 status server-side.
export const Route = createFileRoute('/$')({
  loader: () => respondNotFound(),
  component: NotFound,
})

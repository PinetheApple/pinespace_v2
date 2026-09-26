import { createIsomorphicFn } from '@tanstack/react-start'
import { setResponseStatus } from '@tanstack/react-start/server'

// Set the SSR response status from a route loader. Server sets it; the client
// branch is a no-op, so this is safe to call during client navigation too.
// (Importing react-start/server directly into a route is denied — it's
// server-only — so the isomorphic wrapper is the sanctioned bridge.)
export const respondNotFound = createIsomorphicFn().server(() => {
  setResponseStatus(404)
})

import * as Sentry from '@sentry/tanstackstart-react'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enableLogs: true,
  tracesSampleRate: 1.0,
})

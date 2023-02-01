import * as Sentry from '@sentry/browser';
import { BrowserTracing } from '@sentry/tracing';

let sentryClient;

sentryClient = new Sentry.BrowserClient({
  dsn: 'https://81effb6b4ecc4af9a015011636a8cf9d@o267125.ingest.sentry.io/6729170',
  integrations: [new BrowserTracing()],
  transport: Sentry.makeFetchTransport,
  stackParser: Sentry.defaultStackParser,
  tracesSampleRate: 1.0,
});

export default sentryClient;

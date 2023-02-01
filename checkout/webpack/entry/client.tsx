// Client entry point

// ----------------------------------------------------------------------------
// IMPORTS

import 'cross-fetch/polyfill';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'regenerator-runtime/runtime';

// Create browser history, for navigation a la single page apps
import { createBrowserHistory } from 'history';

// React, our UI engine
import React from 'react';

// HOC for enabling Apollo GraphQL `<Query>` and `<Mutation>`
import { ApolloProvider } from '@apollo/client';

// Attach React to the browser DOM
import ReactDOM from 'react-dom';

// Single page app routing
import { Router } from 'react-router-dom';

/* Local */

// Our main component, and the starting point for server/browser loading
import Root from '../../src/containers/Root';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
// Helper function that creates a new Apollo client per request
import { createClient } from '../../src/lib/apollo';
import '../../src/constants/global.scss';

// ----------------------------------------------------------------------------

// Create Apollo client
const client = createClient();

// Create a browser history
const history = createBrowserHistory();

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

// Render
const root = document.getElementById('root')!;
ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <Root />
    </Router>
  </ApolloProvider>,
  root
);

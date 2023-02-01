import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-components';
import { AuthenticationContextProvider } from '@/contexts/AuthenticationContext';
import { CustomerContextProvider } from '@/contexts/Customer';
import './assets/styles/index.scss';
import AppRouter from '@/containers/app/router';
import i18n from './lib/i18n';
import { I18nextProvider } from 'react-i18next';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { createClient } from '@/lib/apollo';
import { DashboardContextProvider } from './contexts/DashboardContext';

const client = createClient();

if (import.meta.env.VITE_SENTRY_DNS) {
  Sentry.init({
    dsn: String(import.meta.env.VITE_SENTRY_DNS),
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(
    <ApolloProvider client={client}>
      <AuthenticationContextProvider>
        <CustomerContextProvider>
            <DashboardContextProvider>
              <I18nextProvider i18n={i18n}>
                <React.StrictMode>
                  <AppRouter />
                </React.StrictMode>
              </I18nextProvider>
            </DashboardContextProvider>
        </CustomerContextProvider>
      </AuthenticationContextProvider>
    </ApolloProvider>,
  document.getElementById('root')
);

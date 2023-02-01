// Apollo GraphQL client

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import {
  ApolloClient,
  ApolloLink,
  split,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { setContext } from '@apollo/client/link/context';

/* Local */
import { getBrowserLanguage } from '@/helpers/helpers';

// ----------------------------------------------------------------------------

export function createClient(): ApolloClient<NormalizedCacheObject> {
  // Create the cache first, which we'll share across Apollo tooling.
  // This is an in-memory cache. Since we'll be calling `createClient` on
  // universally, the cache will survive until the HTTP request is
  // responded to (on the server) or for the whole of the user's visit (in
  // the browser)
  const cache = new InMemoryCache();

  // Create a HTTP client (both server/client). It takes the GraphQL
  // server from the `GRAPHQL` environment variable, which by default is
  // set to an external playground at https://graphqlhub.com/graphql
  const httpLink = new HttpLink({
    credentials: 'same-origin',
    uri: GRAPHQL,
  });

  // If we're in the browser, we'd have received initial state from the
  // server. Restore it, so the client app can continue with the same data.
  if (!SERVER) {
    cache.restore((window as any).__APOLLO__);
  }

  const userAgentLink = setContext((_, { headers }) => {
    const url = new URL(location.href);
    let _language = url.searchParams.get('locale') || getBrowserLanguage();
    if (false === ['en', 'ar'].includes(_language)) {
      _language = 'en';
    }

    return {
      headers: {
        ...headers,
        'X-User-Agent': navigator.userAgent,
        'X-Accept-Language': _language,
      },
    };
  });

  // Return a new Apollo Client back, with the cache we've just created,
  // and an array of 'links' (Apollo parlance for GraphQL middleware)
  // to tell Apollo how to handle GraphQL requests
  return new ApolloClient({
    cache,
    link: ApolloLink.from([
      userAgentLink,
      // General error handler, to log errors back to the console.
      // Replace this in production with whatever makes sense in your
      // environment. Remember you can use the global `SERVER` variable to
      // determine whether you're running on the server, and record errors
      // out to third-party services, etc
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        }
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }),

      // Split on HTTP and WebSockets
      // @ts-ignore
      WS_SUBSCRIPTIONS && !SERVER
        ? split(
            ({ query }) => {
              const definition = getMainDefinition(query);
              return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
              );
            },
            // Use WebSockets for subscriptions
            new WebSocketLink(
              // Replace http(s) with `ws` for connecting via WebSockts
              new SubscriptionClient(GRAPHQL.replace(/^https?/, 'ws'), {
                reconnect: true, // <-- automatically redirect as needed
              })
            ),
            // ... fall-back to HTTP for everything else
            httpLink
          )
        : httpLink, // <-- just use HTTP on the server
    ]),
    // On the server, enable SSR mode
    ssrMode: SERVER,
  });
}

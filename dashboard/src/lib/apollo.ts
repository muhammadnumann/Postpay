import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { setContext } from '@apollo/client/link/context';

import history from '@/helpers/history';
import { deleteLoginData, hasLoginData } from '@/helpers/authenticationHelper';

const GRAPHQL = import.meta.env.VITE_GRAPHQL;
const SERVER = false;

function navigateToLogin() {
  const LOGIN_PATH: string = '/login';
  const noneAuthPaths = ['/pay', '/3ds-callback'];
  const isInNoneAuthPaths = noneAuthPaths.some((path) =>
    history.location.pathname.startsWith(path)
  );
  if (history.location.pathname !== LOGIN_PATH && false === isInNoneAuthPaths) {
    history.push(LOGIN_PATH);
  }
}

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  try {
    let token: any = null;
    if (location.pathname.startsWith('/pay/')) {
      token = location.pathname.substring(5);
    }

    if (token) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    } else {
      const customerLogin = hasLoginData();
      if (!customerLogin) {
        deleteLoginData();
        navigateToLogin();
      }
    }
  } catch (e) {
    deleteLoginData();
    navigateToLogin();
  }
  // return the headers to the context so httpLink can read them
});

// ----------------------------------------------------------------------------

const errorLink = onError(
  ({ graphQLErrors, networkError, forward, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

      if (
        graphQLErrors[0] &&
        (graphQLErrors[0]?.extensions?.type === 'JSONWebTokenError' ||
          graphQLErrors[0]?.extensions?.type === 'PermissionDenied')
      ) {
        deleteLoginData();
        navigateToLogin();
      }
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
    forward(operation);
  }
);

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
  const batchLink = new BatchHttpLink({
    credentials: 'include',
    uri: GRAPHQL + '/batch',
    batchInterval: 10,
  });

  // If we're in the browser, we'd have received initial state from the
  // server. Restore it, so the client app can continue with the same data.
  if (!SERVER) {
    cache.restore((window as any).__APOLLO__);
  }

  return new ApolloClient({
    link: from([authLink, errorLink, batchLink]),
    cache,
    ssrMode: SERVER,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  });
}

import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ThemeProvider } from 'styled-components';

import 'semantic-ui-css/components/button.css';
import 'semantic-ui-css/components/container.css';
import 'semantic-ui-css/components/grid.css';
import 'semantic-ui-css/components/header.css';
import 'semantic-ui-css/components/form.css';
import 'semantic-ui-css/components/icon.css';
import 'semantic-ui-css/components/segment.css';
import 'semantic-ui-css/components/message.css';
import 'semantic-ui-css/components/card.css';
import 'semantic-ui-css/components/menu.css';
import 'semantic-ui-css/components/input.css';
import 'semantic-ui-css/components/sidebar.css';
import 'semantic-ui-css/components/dropdown.css';
import 'semantic-ui-css/components/transition.css';
import 'semantic-ui-css/components/label.css';

import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary';

// Handle authentication errors by redirecting to sign in
const signOutOnError = apolloClient => {
  // Clear Apollo cache and redirect to sign in page
  apolloClient.resetStore();
  window.location.href = '/signin';
};

// HTTP link with credentials for httpOnly cookie authentication
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_BASE_URL,
  credentials: 'include', // Send httpOnly cookies with requests
});

// Error handling link - handles auth errors and network issues
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions }) => {
      // Handle authentication errors
      if (
        extensions?.code === 'UNAUTHENTICATED' ||
        message === 'Your session has expired. Please sign in again.'
      ) {
        signOutOnError(client);
      }
    });
  }

  if (networkError) {
    if (networkError.statusCode === 401) {
      signOutOnError(client);
    }
  }
});

const link = from([errorLink, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
  devtools: { enabled: process.env.NODE_ENV === 'development' },
});

const theme = {
  orange: '#fb9438',
  blue: '#2873b4',
  green: '#86c64e',
  white: '#f5f5f5',
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

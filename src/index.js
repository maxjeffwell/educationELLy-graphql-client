import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
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

import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary';
const signOutOnError = client => {
  sessionStorage.removeItem('token');
  client.resetStore();
  window.location.href = '/signin';
};

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_BASE_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('token');

  return {
    headers: {
      ...headers,
      ...(token && { 'x-token': token }),
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message === 'You are not authenticated. Please sign in.') {
        signOutOnError(client);
      }
    });
  }

  if (networkError) {
    if (networkError.statusCode === 401 || networkError.statusCode === 400) {
      signOutOnError(client);
    }
  }
});

const link = from([authLink, errorLink, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: process.env.NODE_ENV === 'development',
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

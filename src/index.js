import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { ThemeProvider } from 'styled-components';

import { composeWithDevTools } from 'redux-devtools-extension';

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

import reducers from './reducers';
import App from './components/App';
import Signout  from './components/SignOut';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API_BASE_URL
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers = { ...headers, 'x-token': token };
    }

    return { headers };
  });

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log('GraphQL error', message);

      if (message === 'You are not authenticated. Please sign in.') {
        Signout(client);
      }
    });
  }

  if (networkError) {
    console.log('Network error', networkError);

    if (networkError.statusCode === 401) {
      Signout(client);
    }
  }
});

const link = ApolloLink.from([authLink, errorLink, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true
});

const theme = {
  orange: '#fb9438',
  blue: '#2873b4',
  green: '#86c64e',
  white: '#f5f5f5',
};

const store = createStore(
  reducers,
  { auth: { authenticated: localStorage.getItem('jwtToken')}},
  composeWithDevTools(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
  </ThemeProvider>,
  document.getElementById('root'),
);

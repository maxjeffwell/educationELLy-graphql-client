import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ReduxCache, apolloReducer } from 'apollo-cache-redux';
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
import { signOut }  from './components/SignOut';
import { AUTH_SIGNIN } from './actions';
const token = localStorage.getItem('token');

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
        signOut(client);
      }
    });
  }

  if (networkError) {
    console.log('Network error', networkError);

    if (networkError.statusCode === 401) {
      signOut(client);
    }
  }
});

const link = ApolloLink.from([authLink, errorLink, httpLink]);

const store = createStore(
  combineReducers({
    reducers,
    apollo: apolloReducer
  }),
  {},
  composeWithDevTools(applyMiddleware(reduxThunk))
);

const cache = new ReduxCache({ store });

const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true
});

if (token) {
  store.dispatch({ type: AUTH_SIGNIN });
}

const theme = {
  orange: '#fb9438',
  blue: '#2873b4',
  green: '#86c64e',
  white: '#f5f5f5',
};

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

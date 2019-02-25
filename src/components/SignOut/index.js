import React from 'react';
import { ApolloConsumer } from 'react-apollo';

import history from '../../constants/history';

export const signOut = client => {
  localStorage.removeItem('token');
  client.resetStore();
  history.push('/signin')
};

const SignOutButton = () => (
  <ApolloConsumer>
    {client => (
      <button type="button" onClick={() => signOut(client)}>
        Click here to return to the login page.
      </button>
    )}
  </ApolloConsumer>
);

export default SignOutButton;

import React, { Fragment } from 'react';
import { useApolloClient } from '@apollo/client';
import styled from 'styled-components';

import { StyledMessage } from '../SignIn';
import history from '../../constants/history';

const StyledButton = styled.button`
  border: 2px solid ${props => props.theme.orange};
  background-color: ${props => props.theme.blue};
  border-radius: 5px;
  font-size: 1em;
  font-family: 'Roboto', 'sans-serif';
  color: ${props => props.theme.white};
  cursor: pointer;
`;

export const signOut = client => {
  localStorage.removeItem('token');
  client.resetStore();
  history.push('/signin');
};

const SignOutButton = () => {
  const client = useApolloClient();
  return (
    <StyledButton type="button" onClick={() => signOut(client)}>
      Return to Login Page
    </StyledButton>
  );
};

const SignOut = () => (
  <Fragment>
    <StyledMessage success>You have successfully logged out.</StyledMessage>
    <SignOutButton />
  </Fragment>
);

export default SignOut;

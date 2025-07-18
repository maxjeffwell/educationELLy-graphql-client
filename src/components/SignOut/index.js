import React, { Fragment } from 'react';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { StyledMessage } from '../SignIn';

const StyledButton = styled.button`
  border: 2px solid ${props => props.theme.orange};
  background-color: ${props => props.theme.blue};
  border-radius: 5px;
  font-size: 1em;
  font-family: 'Roboto', 'sans-serif';
  color: ${props => props.theme.white};
  cursor: pointer;
`;

const CenteredContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const signOut = (client, navigate) => {
  sessionStorage.removeItem('token');
  client.resetStore();
  navigate('/signin');
};

const SignOutButton = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  return (
    <StyledButton type="button" onClick={() => signOut(client, navigate)}>
      Return to Login Page
    </StyledButton>
  );
};

const SignOut = () => (
  <Fragment>
    <StyledMessage success>You have successfully logged out.</StyledMessage>
    <CenteredContainer>
      <SignOutButton />
    </CenteredContainer>
  </Fragment>
);

export default SignOut;

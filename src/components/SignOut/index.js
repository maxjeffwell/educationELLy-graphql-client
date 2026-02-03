import React, { Fragment, useEffect } from 'react';
import { useApolloClient, useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { StyledMessage } from '../SignIn';

const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

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

const SignOut = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const [signOut] = useMutation(SIGN_OUT);

  // Clear session immediately on mount by calling server signOut mutation
  useEffect(() => {
    const performSignOut = async () => {
      try {
        await signOut();
      } catch (err) {
        // Sign out even if mutation fails (e.g., already signed out)
      }
      // Always clear Apollo cache
      await client.resetStore();
    };
    performSignOut();
  }, [client, signOut]);

  return (
    <Fragment>
      <StyledMessage success>You have successfully logged out.</StyledMessage>
      <CenteredContainer>
        <StyledButton type="button" onClick={() => navigate('/signin')}>
          Return to Login Page
        </StyledButton>
      </CenteredContainer>
    </Fragment>
  );
};

export default SignOut;

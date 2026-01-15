import React, { Fragment, useEffect } from 'react';
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

const SignOut = () => {
  const client = useApolloClient();
  const navigate = useNavigate();

  // Clear session immediately on mount
  useEffect(() => {
    sessionStorage.removeItem('token');
    client.resetStore();
  }, [client]);

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

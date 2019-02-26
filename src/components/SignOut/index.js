import React , { Component, Fragment } from 'react';
import { ApolloConsumer } from 'react-apollo';
import styled from 'styled-components';

import { StyledMessage } from '../SignIn';
import history from '../../constants/history';

const StyledButton = styled.button`
    border: 2px solid ${props => props.theme.orange};
    background-color: ${props => props.theme.blue};
    border-radius: 5px;
    font-size: 1em;
    font-family: 'Roboto','sans-serif';
    color: ${props => props.theme.white};
    cursor: pointer;
`;


export const signOut = client => {
  localStorage.removeItem('token');
  client.resetStore();
  history.push('/signin')
};

const SignOutButton = () => (
  <ApolloConsumer>
    {client => (
      <StyledButton type="button" onClick={() => signOut(client)}>
        Return to Login Page
      </StyledButton>
    )}
  </ApolloConsumer>
);

export default class SignOut extends Component {

  render() {

    return (
      <Fragment>
    <StyledMessage success>
      You have successfully logged out.
    </StyledMessage>
      <SignOutButton />
      </Fragment>
    );
  };
}


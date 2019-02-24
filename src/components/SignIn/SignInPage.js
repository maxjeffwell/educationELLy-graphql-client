import React from 'react';
import styled from 'styled-components';
import {Grid, Header, Message, Segment} from "semantic-ui-react";

import SignInFormContainer from '../../containers/SignInFormContainer';

export const StyledMessage = styled(Message)`
  &&& {
    display: grid;
    min-width: 420px;
    margin-top: 10px;
    margin-bottom: 25px;
    padding: 25px 25px 25px 25px;
    font-family: 'Roboto', 'sans-serif';
    font-weight: bold;
    border: 4px solid ${props => props.theme.orange};
    color: ${props => props.theme.blue};
    background: ${props => props.theme.white};
    line-height: 30px;
    border-radius: 5px;
   }
   &&& p:first-child {
    margin-top: 10px;
    margin-bottom: 2px;
   }
   &&& p:last-child {
    margin-top: 2px;
   }
`;

export const StyledHeader = styled(Header)`
  &&& {
    margin-bottom: 20px;
    font-family: 'Roboto', 'sans-serif';
    font-size: 2em;
    font-weight: bold;
    color: ${props => props.theme.blue};
    background: ${props => props.theme.green};
    border: 4px solid ${props => props.theme.orange};
    width: 100%;
    padding-top: 3px;
    padding-bottom: 25px;
    height: 50%;
    border-radius: 5px;
  }
  `;

export const StyledSegment = styled(Segment)`
  &&& {
    display: grid;
    min-width: 420px;
    border: 4px solid ${props => props.theme.orange};
    border-radius: 5px;
    padding: 25px 25px 25px 25px;
    background: ${props => props.theme.white};
    margin-top: 25px;
  }
`;

export default () => (
  <div className="login">
    <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>

        <StyledMessage info>
          Please log in with your account email and password. If you have neither registered
          nor been assigned account credentials, you are welcome to use the available demo account to log in.
        </StyledMessage>

        <StyledMessage info>
          DEMO ACCOUNT AVAILABLE
          <p>Email: demo</p>
          <p>Password: demopassword</p>
        </StyledMessage>

        <StyledSegment stacked>
          <StyledHeader as="h1">educationELLy login</StyledHeader>
          <SignInFormContainer />
        </StyledSegment>
      </Grid.Column>
    </Grid>
  </div>
);

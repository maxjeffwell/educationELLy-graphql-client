import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';

import { Form, Button, Grid, Segment, Header, Message } from 'semantic-ui-react';
import styled from 'styled-components';

import ErrorMessage from '../Error';

const StyledSegment = styled(Segment)`
  &&& {
    display: grid;
    min-width: 420px;
    margin-top: 50px;
    border: 4px solid ${props => props.theme.orange};
    border-radius: 5px;
    background: ${props => props.theme.white};
    padding: 25px 25px 25px 25px;
  }
`;

const StyledHeader = styled(Header)`
  &&& {
    margin-bottom: 20px;
    font-family: 'Roboto', 'sans-serif';
    font-size: 2em;
    font-weight: bold;
    color: ${props => props.theme.blue};
    background: ${props => props.theme.green};
    border: 4px solid ${props => props.theme.orange};
    width: 100%;
    border-radius: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

const StyledForm = styled(Form)`
  &&& {
    padding: 0px;
  }
  &&& .icon {
    size: 100px;
  }
  &&& .input {
    border-radius: 5px;
    margin-bottom: 10px;
    margin-top: 12px;
    border-top: 3px solid ${props => props.theme.green};
    border-right: 3px solid ${props => props.theme.green};
    border-bottom: 2px solid ${props => props.theme.green};
    border-left: 3px solid ${props => props.theme.green};
  }
  &&& .ui.labeled.input:not([class*="corner labeled"]) .label:first-child + input {
    color: ${props => props.theme.blue};
    font-family: 'Roboto', 'sans-serif';
    font-weight: bold;
    font-size: 1.5em;
    padding-left: 5px;
    border-radius: 5px;
  }
  &&& .ui.button {
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    font-size: 2em;
    font-family: 'Roboto','sans-serif';
    color: ${props => props.theme.white};
    margin-top: 15px;
  }
`;

const StyledErrorMessage = styled.div`
  &&& {
    font-family: 'Roboto', 'sans-serif';
    font-size: 1.5em;
    color: ${props => props.theme.blue};
  }
`;

const StyledMessage = styled(Message)`
  &&& {
    display: grid;
    margin-top: 25px;
    margin-bottom: 10px;
    padding: 25px 25px 25px 25px;
    font-family: 'Roboto', 'sans-serif';
    font-weight: bold;
    border: 4px solid ${props => props.theme.orange};
    color: ${props => props.theme.blue};
    background: ${props => props.theme.white};
    line-height: 30px;
    border-radius: 5px;
    min-width: 420px;
   }
`;

const SIGN_UP = gql`
  mutation($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      token
    }
  }
`;

const INITIAL_STATE = {
  email: '',
  password: '',
};

const SignUpPage = ({ history, refetch }) => (
  <Fragment>
    <SignUpForm history={history} refetch={refetch} />
  </Fragment>
);

class SignUpForm extends Component {
  state = { ...INITIAL_STATE };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event, signUp) => {
    signUp().then(async ({ data }) => {
      this.setState({ ...INITIAL_STATE });

      localStorage.setItem('token', data.signUp.token);

      await this.props.refetch();
      this.props.history.push('/dashboard');
    });

    event.preventDefault();
  };

  render() {
    const {
      email,
      password
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <Mutation
        mutation={SIGN_UP}
        variables={{ email, password }}
      >
    {(signUp, { data, loading, error }) => (

      <div className="signup">
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <StyledMessage info>
              DEMO ACCOUNT AVAILABLE
              <p>If you prefer not to register at this time, an account for demo purposes is available on the login page.</p>
            </StyledMessage>

            <StyledSegment>
              <StyledHeader as="h1">educationELLy registration</StyledHeader>
              <StyledForm onSubmit={event => this.onSubmit(event, signUp)}>

                <input name="email"
                       type="email"
                       onChange={this.onChange}
                />

                <input name="password"
                       type="password"
                       onChange={this.onChange}
                />
                <Button disabled={isInvalid || loading} primary type="submit">
                  Register
                </Button>

                <StyledErrorMessage>
                  {error && <ErrorMessage error={error}/>}
                </StyledErrorMessage>

              </StyledForm>
            </StyledSegment>
          </Grid.Column>
        </Grid>
      </div>
    )}
      </Mutation>
    );
  }
}

export default withRouter(SignUpPage);

export { SignUpForm };

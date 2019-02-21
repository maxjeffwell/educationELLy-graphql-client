import React, { Component, Fragment } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { Form, Icon, Button, Grid, Segment, Header, Message } from 'semantic-ui-react';
import { LabelInputField } from 'react-semantic-redux-form';
import styled from 'styled-components';

import ErrorMessage from '../Error';
import * as actions from '../../actions';
import history from '../../constants/history';

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
    padding-top: 3px;
    padding-bottom: 25px;
    height: 50%;
    border-radius: 5px;
  }
  `;

const StyledSegment = styled(Segment)`
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

const StyledForm = styled(Form)`
  &&& {
    padding: 0;
  }
  &&& .icon {
    size: 100px;
  }
  &&& .input {
    border-top: 3px solid ${props => props.theme.green};
    border-right: 3px solid ${props => props.theme.green};
    border-bottom: 2px solid ${props => props.theme.green};
    border-left: 3px solid ${props => props.theme.green};
    border-radius: 5px;
    margin-bottom: 10px;
    margin-top: 12px;
  }
  &&& .ui.labeled.input:not([class*="corner labeled"]) .label:first-child + input {
    color: ${props => props.theme.blue};
    font-family: 'Roboto', 'sans-serif';
    font-weight: bold;
    font-size: 1.5em;
    padding-left: 5px;
  }
  &&& .ui.button {
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    font-size: 2em;
    font-family: 'Roboto','sans-serif';
    color: ${props => props.theme.white};
  }
`;

const StyledError = styled.div`
  &&& {
    font-family: 'Roboto', 'sans-serif';
    font-size: 1.5em;
    color: ${props => props.theme.blue};
  }
`;

const SIGN_IN = gql`
  mutation($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

const SignInPage = ({ history, refetch }) => (
  <Fragment>
    <SignInForm history={history} refetch={refetch} />
  </Fragment>
);

const INITIAL_STATE = {
  login: '',
  password: '',
};

class SignInForm extends Component {
  state = { ...INITIAL_STATE };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event, signIn) => {
    signIn().then(async ({ data }) => {
      this.setState({ ...INITIAL_STATE });

      localStorage.setItem('token', data.signIn.token);

      await this.props.refetch();

      history.push('/dashboard');
    });
    event.preventDefault();
  };

  render() {
    const { login, password } = this.state;

    const isInvalid =
       login === '' || password === '';

    return (
      <Mutation mutation={SIGN_IN} variables={{ login, password }}>
        {(signIn, { data, loading, error }) => (

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

          <StyledForm onSubmit={event => this.onSubmit(event, signIn)}>
            <Field
              name="login"
              component={LabelInputField}
              label={{ content: <Icon color="orange" name="user outline" size="large" /> }}
              labelPosition="left"
              value={login}
              onChange={this.onChange}
              type="text"
              placeholder="Email or Username"
            />
            <Field
              name="password"
              component={LabelInputField}
              label={{ content: <Icon color="orange" name="lock" size="large" /> }}
              labelPosition="left"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />

            <Form.Field control={Button} disabled={isInvalid || loading} primary type="submit">
            Sign In
            </Form.Field>

            <StyledError>
            {error && <ErrorMessage error={error}/>}
            </StyledError>

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

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
})

export default compose (
  connect(mapStateToProps, actions),(reduxForm)({ form: 'signin' }))(SignInPage);

export { SignInForm };


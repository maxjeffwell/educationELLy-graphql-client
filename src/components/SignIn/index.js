import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import {
  Form,
  Button,
  Grid,
  Segment,
  Header,
  Message,
} from 'semantic-ui-react';
import styled from 'styled-components';

import ErrorMessage from '../Error';

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
  &&&
    .ui.labeled.input:not([class*='corner labeled'])
    .label:first-child
    + input {
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
    font-family: 'Roboto', 'sans-serif';
    color: ${props => props.theme.white};
  }
`;

const StyledError = styled.div`
  &&& {
    font-family: 'Roboto', 'sans-serif';
    font-size: 1.2em;
    color: #d32f2f;
    background-color: #ffebee;
    border: 1px solid #ffcdd2;
    border-radius: 4px;
    padding: 12px 16px;
    margin-top: 16px;
    line-height: 1.4;
  }
`;

const SIGN_IN = gql`
  mutation ($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

const SignInPage = ({ refetch }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <SignInForm navigate={navigate} refetch={refetch} />
    </Fragment>
  );
};

const INITIAL_STATE = {
  login: '',
  password: '',
};

const SignInForm = ({ navigate, refetch }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [signIn, { loading, error }] = useMutation(SIGN_IN);

  const onChange = event => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async event => {
    event.preventDefault();
    try {
      const { data } = await signIn({ variables: formData });
      setFormData(INITIAL_STATE);
      sessionStorage.setItem('token', data.signIn.token);
      await refetch();
      navigate('/dashboard');
    } catch (err) {
      // Handle error silently or show user notification
    }
  };

  const { login, password } = formData;
  const isInvalid = login === '' || password === '';

  return (
    <div className="login">
      <Grid
        textAlign="center"
        style={{ height: '100%' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <StyledMessage info>
            Please log in with your account email and password. If you have
            neither registered nor been assigned account credentials, you are
            welcome to use the available demo account to log in.
          </StyledMessage>

          <StyledMessage info>
            DEMO ACCOUNT AVAILABLE
            <p>Email: demo@demo.example</p>
            <p>Password: demopassword</p>
          </StyledMessage>

          <StyledSegment stacked>
            <StyledHeader as="h1">educationELLy login</StyledHeader>

            <StyledForm onSubmit={onSubmit}>
              <input
                name="login"
                value={login}
                onChange={onChange}
                type="text"
                placeholder="Email"
              />
              <input
                name="password"
                value={password}
                onChange={onChange}
                type="password"
                placeholder="Password"
              />

              <Button
                disabled={isInvalid || loading}
                primary
                type="submit"
                style={{ marginTop: '20px' }}
              >
                Sign In
              </Button>

              <StyledError>
                {error && <ErrorMessage error={error} />}
              </StyledError>
            </StyledForm>
          </StyledSegment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

SignInPage.propTypes = {
  refetch: PropTypes.func.isRequired,
};

SignInForm.propTypes = {
  navigate: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default SignInPage;

export { SignInForm };

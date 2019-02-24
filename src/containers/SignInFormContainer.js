import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

import SignInForm from '../components/SignIn/SignInForm';
import { signIn } from '../actions';

class SignInFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []};
  }

  handleSubmit(values) {
    this.props.mutate({variables: values})
      .then((response) => {
        if (response.data.signIn.errors.length <= 0) {
          this.props.signInDispatcher(response.data.signIn.token);
          this.props.router.replace('/');
        } else {
          this.setState({
            errors: response.data.signIn.errors
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <SignInForm
        onSubmit={this.handleSubmit.bind(this)}
        errors={this.state.errors}
      />
    );
  }
}

const SIGN_IN_MUTATION = gql`
    mutation signIn($login: String!, $password: String!) {
        signIn(login: $login, password: $password) {
            token
        }
    }
`;

const SignInWithData = graphql(SIGN_IN_MUTATION)(withRouter(SignInFormContainer));

const mapDispatchToProps = (dispatch) => ({
    signInDispatcher(token) {
      dispatch(signIn(token));
    }
});

const SignInWithDataAndState = connect(
  null,
  mapDispatchToProps
)(SignInWithData);

export default SignInWithDataAndState;



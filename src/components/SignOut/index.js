import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ApolloConsumer } from 'react-apollo';
import { StyledMessage } from '../SignIn';

import * as actions from '../../actions';

export const signOut = client => {
  localStorage.removeItem('token');
  client.resetStore();
};

class Signout extends Component { // create class based component in order to use lifecycle method
  componentDidMount() {
    this.props.signout();
  };

    // as soon as component is rendered call action creator and that signs user out of app by
    // removing authenticated JWT from reduce

  render() {

    return (

      <StyledMessage success>
        You have successfully logged out.
        <ApolloConsumer>
          {client => (
            <Link to="/signin" onClick={() => signOut(client)}>
              Click here to return to the login page.
            </Link>
          )}
        </ApolloConsumer>
      </StyledMessage>
    );
  };
}

const mapStateToProps = state => ({
  token: state.auth.token,
});


export default compose (
  connect(mapStateToProps, actions))(Signout);

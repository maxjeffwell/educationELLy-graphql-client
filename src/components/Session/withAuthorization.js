import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { GET_ME } from './queries';

const withAuthorization = conditionFn => Component => props => (
  <Query query={GET_ME}>
    {({ data, networkStatus }) => {
      if (networkStatus < 7) {
        return null;
      }

      return conditionFn(data) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signin" />
      );
    }}
  </Query>
);

export default withAuthorization;

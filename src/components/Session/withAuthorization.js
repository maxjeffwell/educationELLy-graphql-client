import React from 'react';
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom';

import { GET_ME } from './queries';

const withAuthorization = conditionFn => Component => {
  const WithAuthorizationComponent = props => {
    const { data, loading } = useQuery(GET_ME);

    if (loading) {
      return null;
    }

    return conditionFn(data) ? (
      <Component {...props} />
    ) : (
      <Navigate to="/signin" replace />
    );
  };

  WithAuthorizationComponent.displayName = `WithAuthorization(${Component.displayName || Component.name})`;

  return WithAuthorizationComponent;
};

export default withAuthorization;

import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ME } from './queries';

const withSession = Component => {
  const WithSessionComponent = props => {
    const { data, refetch, error } = useQuery(GET_ME, {
      errorPolicy: 'ignore',
      notifyOnNetworkStatusChange: true,
    });

    // If there's an auth error or no token, return empty session
    const session = error || !data ? null : data;

    return <Component {...props} session={session} refetch={refetch} />;
  };

  WithSessionComponent.displayName = `WithSession(${Component.displayName || Component.name})`;

  return WithSessionComponent;
};

export default withSession;

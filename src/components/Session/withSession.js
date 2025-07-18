import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ME } from './queries';

const withSession = Component => {
  const WithSessionComponent = props => {
    const { data, refetch } = useQuery(GET_ME);
    return <Component {...props} session={data} refetch={refetch} />;
  };

  WithSessionComponent.displayName = `WithSession(${Component.displayName || Component.name})`;

  return WithSessionComponent;
};

export default withSession;

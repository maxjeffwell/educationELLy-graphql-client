import { useQuery } from '@apollo/client';

import { GET_ME } from './queries';

const useSession = () => {
  const { data, refetch, error } = useQuery(GET_ME, {
    errorPolicy: 'ignore',
    notifyOnNetworkStatusChange: true,
  });

  // If there's an auth error or no token, return empty session
  const session = error || !data ? null : data;

  return { session, refetch };
};

export default useSession;

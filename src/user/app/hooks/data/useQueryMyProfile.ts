import { useQuery } from 'react-query';
import { userApiClient } from '../../remote/user-api-client';

export function useQueryMyProfile() {
  const { data, status } = useQuery({
    queryKey: 'QUERY_MY_PROFILE',
    queryFn: userApiClient.getMyProfile,
    enabled: true
  });

  return {
    profile: data,
    status
  };
}

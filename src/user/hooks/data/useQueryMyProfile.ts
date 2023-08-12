import { useQuery } from 'react-query';
import { UserApiClient } from '../../services/user-api-client';

export function useQueryMyProfile() {
  const { data, status } = useQuery({
    queryKey: 'QUERY_MY_PROFILE',
    queryFn: UserApiClient.getMyProfile,
    enabled: true
  });

  return {
    profile: data,
    status
  };
}

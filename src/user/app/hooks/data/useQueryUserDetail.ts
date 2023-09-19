import { useQuery } from 'react-query';
import { userApiClient } from '../../remote/user-api-client';

export function useQueryMyProfile(id: string) {
  const { data, status } = useQuery({
    queryKey: 'QUERY_USER_DETAIL',
    queryFn: () => userApiClient.getUserDetail(id),
    enabled: !!id
  });

  return {
    userDetail: data,
    status
  };
}

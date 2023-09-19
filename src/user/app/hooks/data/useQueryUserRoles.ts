import { useQuery } from 'react-query';
import { userApiClient } from '../../remote/user-api-client';

export const QUERY_USER_ROLE_KEY = 'QUERY_USER_ROLES';

export function useQueryUserRoles(userId: string) {
  const { data, isSuccess } = useQuery({
    queryKey: QUERY_USER_ROLE_KEY,
    queryFn: () => userApiClient.getUserRoles(userId),
    enabled: userId !== ''
  });

  return { userRoles: data, isSuccess };
}

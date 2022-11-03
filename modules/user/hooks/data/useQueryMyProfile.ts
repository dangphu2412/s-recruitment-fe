import { useQuery } from 'react-query';
import { useErrorHandler } from '@modules/error-handling/useErrorHandler';
import { UserApiClient } from '../../services/user-api-client';

export function useQueryMyProfile({ enabled = true }) {
  const { handle } = useErrorHandler();

  return useQuery('QUERY_MY_PROFILE', {
    queryFn: UserApiClient.getMyProfile,
    retry: false,
    enabled,
    onError: handle
  });
}

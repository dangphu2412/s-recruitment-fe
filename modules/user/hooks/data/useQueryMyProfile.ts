import { useAppQuery } from '@modules/shared/hooks/useAppQuery';
import { UserApiClient } from '../../services/user-api-client';

export function useQueryMyProfile({ enabled = true }) {
  return useAppQuery({
    queryKey: 'QUERY_MY_PROFILE',
    queryFn: UserApiClient.getMyProfile,
    enabled
  });
}

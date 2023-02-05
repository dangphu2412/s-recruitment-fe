import { useQuery } from 'react-query';
import { AccessControlApiClient } from '@modules/user/services/access-control.client';

export function useQueryControlList() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: 'QUERY_EXTRACT_NEW_EMAILS',
    queryFn: () => AccessControlApiClient.get()
  });

  return { data, isLoading, isSuccess };
}

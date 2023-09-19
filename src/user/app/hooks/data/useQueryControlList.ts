import { useQuery } from 'react-query';
import { accessControlApiClient } from 'src/user/app/remote/access-control.client';

export function useQueryControlList() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: 'QUERY_CONTROL_LIST',
    queryFn: () => accessControlApiClient.get()
  });

  return { allRoles: data, isLoading, isSuccess };
}

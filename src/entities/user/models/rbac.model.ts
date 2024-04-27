import { useMutation, useQuery } from 'react-query';
import { accessControlApiClient, UpdateRolePayload } from '../api';

export function useMutateSaveRoles() {
  const { mutate, isLoading } = useMutation({
    mutationFn: (request: UpdateRolePayload) =>
      accessControlApiClient.update(request),
    mutationKey: 'MUTATION_SAVE_ROLES'
  });

  return { saveRoles: mutate, isLoading };
}

export function useQueryControlList() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: 'QUERY_CONTROL_LIST',
    queryFn: () => accessControlApiClient.get()
  });

  return { allRoles: data, isLoading, isSuccess };
}

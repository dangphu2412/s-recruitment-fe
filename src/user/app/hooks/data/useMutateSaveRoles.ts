import { useMutation } from 'react-query';
import { accessControlApiClient } from 'src/user/app/remote/access-control.client';
import { UpdateRolePayload } from 'src/user/domain/models/rbac.types';

export function useMutateSaveRoles() {
  const { mutate, isLoading } = useMutation({
    mutationFn: (request: UpdateRolePayload) =>
      accessControlApiClient.update(request),
    mutationKey: 'MUTATION_SAVE_ROLES'
  });

  return { saveRoles: mutate, isLoading };
}

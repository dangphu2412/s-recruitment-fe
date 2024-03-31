import { useMutation } from 'react-query';
import { UpdateRolePayload } from '../../../models/rbac/rbac.types';
import { accessControlApiClient } from '../../../api/access-control.client';

export function useMutateSaveRoles() {
  const { mutate, isLoading } = useMutation({
    mutationFn: (request: UpdateRolePayload) =>
      accessControlApiClient.update(request),
    mutationKey: 'MUTATION_SAVE_ROLES'
  });

  return { saveRoles: mutate, isLoading };
}

import { useMutation } from 'react-query';
import { userApiClient } from '../../../api/user-api-client';

export function useMutateSaveUserRoles() {
  const { mutate, isLoading } = useMutation({
    mutationKey: 'MUTATION_SAVE_USER_ROLES',
    mutationFn: userApiClient.updateUserRoles
  });

  return { saveUserRoles: mutate, isLoading };
}

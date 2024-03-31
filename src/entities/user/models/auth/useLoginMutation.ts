import { useMutation } from 'react-query';
import { authApiClient } from '../../../../shared/models/services/auth-api-client';

export const LOGIN_KEY = 'POST_LOGIN';
export function useLoginMutation() {
  return useMutation({
    mutationFn: authApiClient.login,
    mutationKey: LOGIN_KEY
  });
}

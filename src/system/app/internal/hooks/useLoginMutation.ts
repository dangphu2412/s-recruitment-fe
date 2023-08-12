import { useMutation } from 'react-query';
import { authApiClient } from '../services/auth-api-client';

export function useLoginMutation() {
  return useMutation({
    mutationFn: authApiClient.login,
    mutationKey: 'POST_LOGIN'
  });
}

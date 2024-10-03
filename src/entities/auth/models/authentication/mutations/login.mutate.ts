import { useMutation } from 'react-query';
import { authApiClient } from '../../../api';

export const LOGIN_KEY = 'POST_LOGIN';
export function useLoginMutation() {
  return useMutation({
    mutationFn: authApiClient.login,
    mutationKey: LOGIN_KEY
  });
}

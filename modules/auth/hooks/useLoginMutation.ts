import { useRouter } from 'next/router';
import { useAppMutation } from '@modules/shared/hooks/useAppMutation';
import {
  BrowserStorage,
  registerBrowserStorage
} from '@modules/shared/services';
import { AuthApiClient } from '../services/auth-api-client';

export function useLoginMutation() {
  const router = useRouter();

  return useAppMutation({
    mutationFn: AuthApiClient.login,
    mutationKey: 'POST_LOGIN',
    onSuccess: async data => {
      registerBrowserStorage();
      data.tokens.forEach(token => {
        BrowserStorage.set(token.name, token.value);
      });
      await router.push('/');
    }
  });
}

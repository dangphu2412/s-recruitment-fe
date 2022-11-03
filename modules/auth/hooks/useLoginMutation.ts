import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { AuthApiClient } from '../services/auth-api-client';
import {
  BrowserStorage,
  registerBrowserStorage
} from '../../shared/services/browser-storage';
import { useErrorHandler } from '../../error-handling/useErrorHandler';

export function useLoginMutation() {
  const { handle } = useErrorHandler();
  const router = useRouter();

  return useMutation(AuthApiClient.login, {
    mutationKey: 'POST_LOGIN',
    onSuccess: async data => {
      registerBrowserStorage();
      data.tokens.forEach(token => {
        BrowserStorage.set(token.name, token.value);
      });
      await router.push('/');
    },
    onError: handle
  });
}

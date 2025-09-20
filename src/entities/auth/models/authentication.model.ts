import { useMutation, useQueryClient } from 'react-query';
import { authApiClient } from '../api';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { persistentStorage } from '../../../shared/api/services/persistent.storage';
import { tokenManager } from '../../../shared/api/services';
import { useNotify } from '../../../shared/notify';

export const LOGIN_KEY = 'POST_LOGIN';
export function useLoginMutation() {
  const showNotify = useNotify();

  return useMutation({
    mutationFn: authApiClient.login,
    mutationKey: LOGIN_KEY,
    onError: () => {
      showNotify({
        title: 'Incorrect username or password',
        status: 'error'
      });
    }
  });
}

export function useChangeMyPassword() {
  const showNotify = useNotify();

  return useMutation({
    mutationFn: authApiClient.updateMyPassword,
    mutationKey: ['UPDATE_PASSWORD'],
    onError: () => {
      showNotify({
        title: 'Incorrect current password',
        status: 'error'
      });
    }
  });
}

export const useLogOut = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useCallback(async () => {
    const refreshToken = persistentStorage.getRefreshToken();

    refreshToken && (await authApiClient.logout(refreshToken));
    tokenManager.clean();
    queryClient.clear();

    await push('/login');
  }, [queryClient, push]);
};

export function useAutoLogOut() {
  const logOut = useLogOut();

  useEffect(
    function logOutRunner() {
      logOut();
    },
    [logOut]
  );
}

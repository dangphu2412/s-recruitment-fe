import { useMutation } from 'react-query';
import { authApiClient } from '../api';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { persistentStorage } from '../../../shared/api/services/persistent.storage';
import { tokenManager } from '../../../shared/api/services';

export const LOGIN_KEY = 'POST_LOGIN';
export function useLoginMutation() {
  return useMutation({
    mutationFn: authApiClient.login,
    mutationKey: LOGIN_KEY
  });
}

export const useLogOut = () => {
  const { push } = useRouter();

  return useCallback(async () => {
    const refreshToken = persistentStorage.getRefreshToken();

    refreshToken && (await authApiClient.logout(refreshToken));
    tokenManager.clean();

    await push('/login');
  }, [push]);
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

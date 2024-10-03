import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { persistentStorage } from '../../../../../shared/api/services/persistent.storage';
import { authApiClient } from '../../../api';
import { tokenManager } from '../services/token-manager';

export function useLogOut() {
  const { push } = useRouter();

  return useCallback(async () => {
    const refreshToken = persistentStorage.getRefreshToken();

    refreshToken && (await authApiClient.logout(refreshToken));
    tokenManager.clean();

    await push('/login');
  }, [push]);
}

export function useAutoLogOut() {
  const logOut = useLogOut();

  useEffect(
    function logOutRunner() {
      logOut();
    },
    [logOut]
  );
}

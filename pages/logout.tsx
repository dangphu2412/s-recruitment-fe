import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { tokenManager } from 'src/system/app/internal/services/token-manager';
import { NoLayout } from 'src/system/app/internal/components/NoLayout';
import { authApiClient } from 'src/system/app/internal/services/auth-api-client';
import { persistentStorage } from '../src/system/app/internal/services/persistent.storage';
import { NextPageWithLayout } from '../src/system/infrastructure/next.types';

const LogOutPage: NextPageWithLayout = () => {
  const { replace } = useRouter();

  useEffect(
    function logOutRunner() {
      async function doLogout() {
        const refreshToken = persistentStorage.getRefreshToken();

        refreshToken && (await authApiClient.logout(refreshToken));
        tokenManager.clean();

        await replace('/login');
      }

      doLogout();
    },
    [replace]
  );

  return <></>;
};

LogOutPage.getLayout = NoLayout;

export default LogOutPage;

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../src/shared/models/next.types';
import { persistentStorage } from '../src/shared/models/services/persistent.storage';
import { authApiClient } from '../src/shared/models/services/auth-api-client';
import { tokenManager } from '../src/shared/models/services';
import { NoLayout } from '../src/shared/ui/NoLayout';

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

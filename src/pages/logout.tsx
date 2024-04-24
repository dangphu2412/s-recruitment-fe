import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../shared/models/next.types';
import { persistentStorage } from '../shared/models/services/persistent.storage';
import { authApiClient } from '../shared/models/services/auth-api-client';
import { tokenManager } from '../shared/models/services';
import { NoLayout } from '../shared/ui/NoLayout';

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

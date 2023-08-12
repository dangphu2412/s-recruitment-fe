import * as React from 'react';
import { useRouter } from 'next/router';
import { TokenManager } from 'src/system/app/internal/services/token-manager';
import { NoLayout } from 'src/system/app/internal/components/NoLayout';
import { authApiClient } from 'src/system/app/internal/services/auth-api-client';
import { NextPageWithLayout } from './_app';

const LogOutPage: NextPageWithLayout = () => {
  const router = useRouter();
  React.useEffect(() => {
    async function doLogout() {
      await authApiClient.logout();
      TokenManager.clean();
      await router.replace('/login');
    }

    doLogout();
  }, [router]);

  return <></>;
};

LogOutPage.getLayout = NoLayout;

export default LogOutPage;

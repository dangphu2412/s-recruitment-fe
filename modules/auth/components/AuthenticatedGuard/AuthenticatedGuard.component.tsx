import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { UserIdentity } from '@modules/auth/services/user-identity';
import { useUser } from '@modules/user/contexts/UserContext/useUser.hook';
import { useQueryMyProfile } from '../../../user/hooks/data/useQueryMyProfile';
import { useClientErrorHandler } from '../../../error-handling/useClientErrorHandler';
import { TokenManager } from '../../../shared/services/token-manager';
import { ClientErrorCode } from '../../../error-handling/client-code';

type AuthenticatedGuardProps = PropsWithChildren<{
  fallbackRoute: string;
}>;

export function AuthenticatedGuard({
  fallbackRoute,
  children
}: AuthenticatedGuardProps): React.ReactElement {
  const { push } = useRouter();
  const { handle: handleError, handleExpireLogin } = useClientErrorHandler();

  const { dispatch: setUser } = useUser();

  const { refetch: fetchMyProfile, data, error, status } = useQueryMyProfile();

  React.useEffect(() => {
    async function protectPage() {
      const isNotLoggedIn = !UserIdentity.isAuthenticated();

      if (isNotLoggedIn) {
        await push(fallbackRoute);
        return;
      }

      if (!data && status === 'idle') {
        await fetchMyProfile();
      }
    }

    protectPage();
  }, [data, fallbackRoute, fetchMyProfile, push, status]);

  React.useEffect(() => {
    async function handleApiError() {
      if (!error) {
        return;
      }

      const { clientCode } = handleError(error);

      if (clientCode === ClientErrorCode.UNAUTHORIZED) {
        try {
          await TokenManager.renew();
          await fetchMyProfile();
        } catch (renewTokenError) {
          handleExpireLogin(renewTokenError);
        }
      }
    }

    handleApiError();
  }, [error, fetchMyProfile, handleError, handleExpireLogin, push]);

  React.useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return <>{status === 'success' && children}</>;
}

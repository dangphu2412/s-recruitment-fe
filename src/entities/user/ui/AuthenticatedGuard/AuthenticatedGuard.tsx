import { PropsWithChildren, ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserSession } from '../../models';
import { useLogOut } from '../../../auth/models';

export function AuthenticatedGuard({
  children
}: PropsWithChildren): ReactElement {
  const { push } = useRouter();
  const { sessionStatus } = useUserSession();
  const logOut = useLogOut();

  useEffect(
    function interceptUnAuthenticatedUser() {
      if (sessionStatus === 'unauthenticated') {
        logOut();
      }
    },
    [logOut, push, sessionStatus]
  );

  return <>{sessionStatus === 'authenticated' && children}</>;
}

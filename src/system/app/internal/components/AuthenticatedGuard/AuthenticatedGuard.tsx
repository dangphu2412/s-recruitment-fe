import { PropsWithChildren, ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserSession } from '../../hooks/useUserSession';
import { useLogOut } from '../../hooks/useLogOut';

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

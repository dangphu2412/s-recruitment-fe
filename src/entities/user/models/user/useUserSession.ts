import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UserSession } from '../../../../shared/models/usecases/user.usecase';
import { systemActions } from '../../../../shared/models/system-provider/system.store';
import { useQueryMyProfile } from '../../features/hooks/data/useQueryMyProfile';

export function useUserSession(): UserSession {
  const dispatch = useDispatch();
  const { profile, status } = useQueryMyProfile();

  function getSessionStatus() {
    if (status === 'loading') {
      return 'verifying';
    }

    if (status === 'success' && profile) {
      return 'authenticated';
    }

    return 'unauthenticated';
  }

  useEffect(
    function syncUserSession() {
      if (status !== 'success' || !profile) return;

      dispatch(systemActions.setUser(profile));
    },
    [dispatch, profile, status]
  );

  return {
    user: profile,
    sessionStatus: getSessionStatus()
  };
}

import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { persistentStorage } from '../services/persistent.storage';

export const useLogOut = () => {
  const { push } = useRouter();

  return useCallback(() => {
    persistentStorage.cleanStorage();
    push('/login');
  }, [push]);
};

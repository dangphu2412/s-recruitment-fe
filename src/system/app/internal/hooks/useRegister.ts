import { useMutation } from 'react-query';
import { authApiClient } from '../services/auth-api-client';

export const useRegister = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: authApiClient.registerByCredentials,
    mutationKey: 'registerByCredentials'
  });

  return {
    register: mutate,
    isMutating: isLoading
  };
};

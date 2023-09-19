import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { userApiClient } from 'src/user/app/remote/user-api-client';
import { userActions } from 'src/user/internal/store/user.slice';
import {
  AppError,
  useHandleError
} from 'src/system/app/internal/hooks/useHandleError';
import { ClientErrorCode } from 'src/system/domain/constants/client-code';
import { useNotify } from 'src/system/app/internal/hooks/useNotify';

export function useMutateCreateUser() {
  const dispatch = useDispatch();
  const notify = useNotify();

  function handleMutateCreateUserError({ clientCode, message }: AppError) {
    if (clientCode === ClientErrorCode.USER_EMAIL_EXISTED) {
      return notify({
        title: 'Email existed',
        status: 'error',
        description: message
      });
    }

    if (clientCode === ClientErrorCode.NOT_FOUND_USER) {
      return notify({
        title: 'This user is not ready to become member',
        status: 'error',
        description: message
      });
    }
  }

  const handle = useHandleError({
    onHandleClientError: handleMutateCreateUserError
  });

  return useMutation({
    mutationKey: 'MUTATION_CREATE_USER',
    mutationFn: userApiClient.createUser,
    onSuccess() {
      notify({
        title: 'Create user successfully',
        status: 'success'
      });

      dispatch(userActions.setIsSubmitted(true));
    },
    onError: handle
  });
}

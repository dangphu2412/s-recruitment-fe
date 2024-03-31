import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNotify } from '../../../../../shared/models/notify/useNotify';
import {
  AppError,
  useHandleError
} from '../../../../../shared/models/error/useHandleError';
import { ClientErrorCode } from '../../../../../shared/config/constants/client-code';
import { userApiClient } from '../../../api/user-api-client';
import { userActions } from '../../../models/store/user.slice';

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

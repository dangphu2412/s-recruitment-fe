import { useMutation } from 'react-query';
import { UserApiClient } from '@modules/user/services/user-api-client';
import { useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { userActions } from '@modules/user/store/user.slice';
import {
  AppError,
  useErrorHandler
} from '@modules/error-handling/useErrorHandler';
import { ClientErrorCode } from '@modules/error-handling/client-code';

export function useMutateCreateUser() {
  const dispatch = useDispatch();
  const toast = useToast();

  function handleMutateCreateUserError({ clientCode, message }: AppError) {
    if (clientCode === ClientErrorCode.USER_EMAIL_EXISTED) {
      toast({
        title: 'Email existed',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
        description: message
      });
    }
  }

  const { handle } = useErrorHandler({
    onHandleClientError: handleMutateCreateUserError
  });

  return useMutation('MUTATION_CREATE_USER', {
    mutationFn: UserApiClient.createUser,
    onSuccess() {
      toast({
        title: 'Create user successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });

      dispatch(userActions.setIsSubmitted(true));
    },
    onError: handle
  });
}

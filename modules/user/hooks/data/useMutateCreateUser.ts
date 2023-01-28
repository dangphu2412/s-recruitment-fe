import { useMutation } from 'react-query';
import { useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { UserApiClient } from '@modules/user/services/user-api-client';
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
      return toast({
        title: 'Email existed',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
        description: message
      });
    }

    if (clientCode === ClientErrorCode.NOT_FOUND_USER) {
      return toast({
        title: 'This user is not ready to become member',
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

  return useMutation({
    mutationKey: 'MUTATION_CREATE_USER',
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

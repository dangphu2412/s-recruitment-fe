import { useToast } from '@chakra-ui/react';
import { userActions } from '@modules/user/store/user.slice';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { UserApiClient } from '../../services/user-api-client';

export function useMutateUserActive() {
  const toast = useToast();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: UserApiClient.toggleActive,
    mutationKey: 'MUTATION_TOGGLE_USER_STATUS',
    onSuccess() {
      toast({
        title: 'Toggle user active successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top'
      });

      dispatch(userActions.setIsSubmitted(true));
    }
  });
}

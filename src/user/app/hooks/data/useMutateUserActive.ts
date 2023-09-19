import { userActions } from 'src/user/internal/store/user.slice';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { userApiClient } from '../../remote/user-api-client';
import { useNotify } from 'src/system/app/internal/hooks/useNotify';

export function useMutateUserActive() {
  const toast = useNotify();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: userApiClient.toggleActive,
    mutationKey: 'MUTATION_TOGGLE_USER_STATUS',
    onSuccess() {
      toast({
        title: 'Toggle user active successfully',
        status: 'success'
      });

      dispatch(userActions.setIsSubmitted(true));
    }
  });
}

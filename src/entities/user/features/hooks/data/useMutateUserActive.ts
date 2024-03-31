import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { userApiClient } from '../../../api/user-api-client';
import { userActions } from '../../../models/store/user.slice';
import { useNotify } from '../../../../../shared/models/notify/useNotify';

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

import { useQueryUsers } from './useQueryUsers';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdminState } from '../../store/user.selector';
import { userActions } from '../../store/user.slice';

export function useUserOverview() {
  const dispatch = useDispatch();
  const { isSubmitted, filters, pagination } = useSelector(selectAdminState);

  return useQueryUsers({
    filters,
    pagination,
    enabled: isSubmitted,
    onSuccess() {
      dispatch(userActions.setIsSubmitted(false));
    }
  });
}

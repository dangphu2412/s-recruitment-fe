import { useDispatch, useSelector } from 'react-redux';
import { selectAdminState } from 'src/user/store/user.selector';
import { userActions } from 'src/user/store/user.slice';
import { useQuery } from 'react-query';
import { UserApiClient } from '../../services/user-api-client';
import { parseFilterQuery } from '../../../system/app/internal/services/filter-parser';
import { parsePagination } from '../../../system/app/internal/services/pagination-parser';

export const QUERY_USERS_KEY = 'QUERY_USERS';

export function useQueryUsers() {
  const dispatch = useDispatch();
  const { isSubmitted, filters, pagination } = useSelector(selectAdminState);

  const { data, isLoading } = useQuery({
    queryKey: QUERY_USERS_KEY,
    queryFn: () =>
      UserApiClient.getMany({
        filters: parseFilterQuery(filters),
        pagination: parsePagination(pagination.page, pagination.size)
      }),
    enabled: isSubmitted,
    onSuccess() {
      dispatch(userActions.setIsSubmitted(false));
    }
  });

  return { data, isLoading };
}

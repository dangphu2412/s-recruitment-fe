import { useQuery } from 'react-query';
import { UserApiClient } from '../../services/user-api-client';
import { parseFilterQuery } from '../../../system/app/internal/services/filter-parser';
import { parsePagination } from '../../../system/app/internal/services/pagination-parser';
import { AdminFilter } from '../../store/user-store.types';
import { Pagination } from '../../../system/domain/clients';
import { getInitialUserState } from '../../store/user.slice';

export const QUERY_USERS_KEY = 'QUERY_USERS';

type QueryUserOptions = {
  filters: AdminFilter;
  pagination: Pagination;
  enabled?: boolean;
  onSuccess?: () => void;
};

export function useQueryUsers({
  filters,
  pagination,
  ...options
}: QueryUserOptions) {
  const parsedFilters: AdminFilter = {
    ...filters,
    joinedIn: filters.joinedIn
      ? {
          ...filters.joinedIn,
          value: {
            fromDate: filters.joinedIn.value.fromDate,
            toDate: filters.joinedIn.value.toDate
          }
        }
      : getInitialUserState().filters.joinedIn
  };

  const { data, isLoading } = useQuery({
    queryKey: QUERY_USERS_KEY,
    queryFn: () =>
      UserApiClient.getMany({
        filters: parseFilterQuery(parsedFilters),
        pagination: parsePagination(pagination.page, pagination.size)
      }),
    ...options
  });

  return { data, isLoading };
}

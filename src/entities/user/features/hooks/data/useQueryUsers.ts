import { useQuery } from 'react-query';
import { userApiClient } from '../../../api/user-api-client';
import { AdminFilter } from '../../../models/store/user-store.types';
import { Pagination } from '../../../../../shared/models';
import { getInitialUserState } from '../../../models/store/user.slice';
import { parseFilterQuery } from '../../../../../shared/models/services/filter-parser';
import { parsePagination } from '../../../../../shared/models/services/pagination-parser';

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
      userApiClient.getMany({
        filters: parseFilterQuery(parsedFilters),
        pagination: parsePagination(pagination.page, pagination.size)
      }),
    ...options
  });

  return { data, isLoading };
}

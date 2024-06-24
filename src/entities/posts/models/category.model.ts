import { useQuery } from 'react-query';
import { categoryApiClient } from '../api/category-api-client';
import { CACHE_INFINITY } from '../../../shared/config/constants/react-query';

export function useQueryCategories() {
  const { data, isLoading } = useQuery({
    queryKey: 'QUERY_CATEGORIES_KEY',
    queryFn: () => categoryApiClient.getAll(),
    ...CACHE_INFINITY
  });

  return { data, isLoading };
}

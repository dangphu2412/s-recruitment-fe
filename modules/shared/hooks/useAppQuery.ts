import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from 'react-query';
import {
  AppError,
  useErrorHandler
} from '@modules/error-handling/useErrorHandler';

export type UseAppQueryResult<Response> = UseQueryResult<Response, AppError>;

export function useAppQuery<
  Key extends QueryKey = QueryKey,
  Response = unknown,
  SelectData = Response
>(
  options: UseQueryOptions<Response, AppError, SelectData, Key> = {}
): UseAppQueryResult<SelectData> {
  const { handle } = useErrorHandler();

  return useQuery<Response, AppError, SelectData, Key>({
    retry: false,
    staleTime: Infinity,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    onError: handle,
    ...options
  });
}

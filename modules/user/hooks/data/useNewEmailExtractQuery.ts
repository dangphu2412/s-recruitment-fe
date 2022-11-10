import { useQuery } from 'react-query';
import { useErrorHandler } from '@modules/error-handling/useErrorHandler';
import { UserApiClient } from '../../services/user-api-client';

export function useNewEmailExtractQuery() {
  const { handle } = useErrorHandler();

  const { data, isLoading } = useQuery('QUERY_EXTRACT_NEW_EMAILS', {
    queryFn: () => UserApiClient.extractNewEmails,
    onError: handle
  });

  return { data, isLoading };
}

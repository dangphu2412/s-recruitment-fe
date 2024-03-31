import { useQuery } from 'react-query';
import { userApiClient } from '../../../api/user-api-client';
import { ExtractNewEmailsDto } from '../../../models/user/user.type';

type QueryExtractNewEmailsProps = {
  params: ExtractNewEmailsDto;
  isEnabled?: boolean;
};

export function useQueryExtractNewEmails({
  params,
  isEnabled
}: QueryExtractNewEmailsProps) {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: 'QUERY_EXTRACT_NEW_EMAILS',
    queryFn: () => userApiClient.extractNewEmails(params),
    enabled: isEnabled
  });

  return { data, isLoading, isSuccess };
}

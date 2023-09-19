import { ExtractNewEmailsDto } from 'src/user/domain/models/user.type';
import { useQuery } from 'react-query';
import { userApiClient } from '../../remote/user-api-client';

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

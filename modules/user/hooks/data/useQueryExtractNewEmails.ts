import { ExtractNewEmailsDto } from '@modules/user/models/user.type';
import { useAppQuery } from '@modules/shared/hooks/useAppQuery';
import { UserApiClient } from '../../services/user-api-client';

type QueryExtractNewEmailsProps = {
  params: ExtractNewEmailsDto;
  isEnabled?: boolean;
};

export function useQueryExtractNewEmails({
  params,
  isEnabled
}: QueryExtractNewEmailsProps) {
  const { data, isLoading } = useAppQuery({
    queryKey: 'QUERY_EXTRACT_NEW_EMAILS',
    queryFn: () => UserApiClient.extractNewEmails(params),
    enabled: isEnabled
  });

  return { data, isLoading };
}

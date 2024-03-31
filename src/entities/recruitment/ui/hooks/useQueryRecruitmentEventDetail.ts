import { useQuery } from 'react-query';
import { recruitmentApiClient } from '../../api/recruitment-api-client';
import { RecruitmentEventDetail } from '../../models/recruitment.usecase';

export const RECRUITMENT_EVENT_DETAIL_QUERY_KEY =
  'useQueryRecruitmentEventDetail';

export function useQueryRecruitmentEventDetail(id: number) {
  const { data } = useQuery([RECRUITMENT_EVENT_DETAIL_QUERY_KEY, id], {
    queryFn: () => recruitmentApiClient.getEventDetail(id),
    enabled: !isNaN(id)
  });

  return {
    recruitmentEventDetail: data ?? ({} as RecruitmentEventDetail)
  };
}

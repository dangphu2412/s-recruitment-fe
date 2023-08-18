import { useQuery } from 'react-query';
import { recruitmentApiClient } from '../services/recruitment-api-client';

export const RECRUITMENT_EVENT_QUERY_KEY = 'useQueryRecruitmentEvents';

export function useQueryRecruitmentEvents() {
  return useQuery(RECRUITMENT_EVENT_QUERY_KEY, {
    queryFn: recruitmentApiClient.getEvents
  });
}

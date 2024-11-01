import { useMutation, useQuery } from 'react-query';
import { recruitmentApiClient } from '../api';
import { RecruitmentEventDetail } from '../api/recruitment.usecase';
import { AggregateRoot } from '../../../shared/models/aggregate-model';

export function useCreateRecruitmentEventMutation() {
  const { mutate } = useMutation('useCreateRecruitmentEventMutation', {
    mutationFn: recruitmentApiClient.createEvent
  });

  return {
    createRecruitmentEvent: mutate
  };
}

export function useMarkEmployeeMutation() {
  const { mutate } = useMutation('useMarkEmployeeMutation', {
    mutationFn: recruitmentApiClient.markEmployeePoint
  });

  return {
    markEmployee: mutate
  };
}

export const RECRUITMENT_EVENT_DETAIL_QUERY_KEY =
  'useQueryRecruitmentEventDetail';

type QueryRecruitmentEventDetailProps = AggregateRoot<number> & {
  voteStatus: string | null;
};

export function useQueryRecruitmentEventDetail(
  query: QueryRecruitmentEventDetailProps
) {
  const { data, isFetching } = useQuery(
    [RECRUITMENT_EVENT_DETAIL_QUERY_KEY, query],
    {
      queryFn: () => recruitmentApiClient.getEventDetail(query),
      enabled: !isNaN(query.id)
    }
  );

  return {
    recruitmentEventDetail: data ?? ({} as RecruitmentEventDetail),
    isFetching
  };
}

export const RECRUITMENT_EVENT_QUERY_KEY = 'useQueryRecruitmentEvents';

export function useQueryRecruitmentEvents() {
  return useQuery(RECRUITMENT_EVENT_QUERY_KEY, {
    queryFn: recruitmentApiClient.getEvents
  });
}

export function useDownloadEmployeesMutation() {
  const { mutate } = useMutation('useDownloadEmployeesMutation', {
    mutationFn: recruitmentApiClient.downloadEmployees
  });

  return {
    downloadEmployees: mutate
  };
}

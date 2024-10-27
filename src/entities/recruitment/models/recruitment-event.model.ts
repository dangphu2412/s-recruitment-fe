import { DateRange } from '../../../shared/models/filter.api';
import { useMutation, useQuery } from 'react-query';
import { recruitmentApiClient } from '../api';
import { RecruitmentEventDetail } from '../api/recruitment.usecase';
import { BoxItem } from '../../../shared/models/combobox.api';

export type ScoreStandard = {
  standard: string;
  point: number;
};
export type CreateRecruitmentEventFormModal = {
  name: string;
  location: string;
  recruitmentRange: DateRange;
  examiners: BoxItem[];
  scoreStandards: ScoreStandard[];
  file: FileList;
};

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

export function useQueryRecruitmentEventDetail(id: number) {
  const { data } = useQuery([RECRUITMENT_EVENT_DETAIL_QUERY_KEY, id], {
    queryFn: () => recruitmentApiClient.getEventDetail(id),
    enabled: !isNaN(id)
  });

  return {
    recruitmentEventDetail: data ?? ({} as RecruitmentEventDetail)
  };
}

export const RECRUITMENT_EVENT_QUERY_KEY = 'useQueryRecruitmentEvents';

export function useQueryRecruitmentEvents() {
  return useQuery(RECRUITMENT_EVENT_QUERY_KEY, {
    queryFn: recruitmentApiClient.getEvents
  });
}

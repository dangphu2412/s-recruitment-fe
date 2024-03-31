import { useMutation } from 'react-query';
import { recruitmentApiClient } from '../../api/recruitment-api-client';

export function useCreateRecruitmentEventMutation() {
  const { mutate } = useMutation('useCreateRecruitmentEventMutation', {
    mutationFn: recruitmentApiClient.createEvent
  });

  return {
    createRecruitmentEvent: mutate
  };
}

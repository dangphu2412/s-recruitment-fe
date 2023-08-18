import { useMutation } from 'react-query';
import { recruitmentApiClient } from '../services/recruitment-api-client';

export function useCreateRecruitmentEventMutation() {
  const { mutate } = useMutation('', {
    mutationFn: recruitmentApiClient.createEvent
  });

  return {
    createRecruitmentEvent: mutate
  };
}

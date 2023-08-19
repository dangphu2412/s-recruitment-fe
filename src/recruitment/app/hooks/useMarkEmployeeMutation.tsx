import { useMutation } from 'react-query';
import { recruitmentApiClient } from '../services/recruitment-api-client';

export function useMarkEmployeeMutation() {
  const { mutate } = useMutation('useMarkEmployeeMutation', {
    mutationFn: recruitmentApiClient.markEmployeePoint
  });

  return {
    markEmployee: mutate
  };
}

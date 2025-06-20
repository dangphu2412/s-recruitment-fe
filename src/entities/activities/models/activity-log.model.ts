import { useMutation, useQuery } from 'react-query';
import {
  activityLogApiClient,
  FindAnalyticLogQuery
} from '../api/activity-log-api.client';

export function useActivityLogAnalytic(
  findAnalyticLogQuery?: FindAnalyticLogQuery
) {
  return useQuery({
    queryKey: ['analytic-logs', findAnalyticLogQuery],
    queryFn: () =>
      activityLogApiClient.findAnalyticLogs(findAnalyticLogQuery ?? {})
  });
}

export function useMutateSyncLogs() {
  return useMutation({
    mutationKey: 'analytic-logs',
    mutationFn: activityLogApiClient.uploadLogs
  });
}

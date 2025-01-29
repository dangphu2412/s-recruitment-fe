import { useQuery } from 'react-query';
import { activityLogApiClient } from '../api/activity-log-api.client';

export function useActivityLogAnalytic() {
  return useQuery({
    queryKey: ['analytic-logs'],
    queryFn: activityLogApiClient.findAnalyticLogs
  });
}

import { useMutation, useQuery } from 'react-query';
import { activityRequestApiClient } from '../api/activity-request-api.client';

export const ACTIVITY_REQUESTS_QUERY_KEY = 'ACTIVIIY_REQUESTS_QUERY_KEY';

export function useActivityRequestsQuery() {
  return useQuery({
    queryKey: [ACTIVITY_REQUESTS_QUERY_KEY],
    queryFn: () => activityRequestApiClient.getRequestedActivities()
  });
}

export const MY_ACTIVITY_REQUESTS_QUERY_KEY = 'MY_ACTIVITY_REQUESTS_QUERY_KEY';

export function useMyActivityRequestsQuery() {
  return useQuery({
    queryKey: [MY_ACTIVITY_REQUESTS_QUERY_KEY],
    queryFn: () => activityRequestApiClient.getMyRequestedActivities()
  });
}

export function useCreateActivityRequestMutation() {
  return useMutation({
    mutationKey: ['create-request-activity'],
    mutationFn: activityRequestApiClient.createRequestActivities
  });
}

export function useUpdateApprovalActivityRequestMutation() {
  return useMutation({
    mutationKey: ['update-approval-request-activity'],
    mutationFn: activityRequestApiClient.updateApprovalRequestActivity
  });
}

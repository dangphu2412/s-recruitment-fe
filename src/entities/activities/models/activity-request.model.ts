import { useMutation, useQuery } from 'react-query';
import { activityRequestApiClient } from '../api/activity-request-api.client';
import { create } from 'zustand/react';
import { ApprovalRequestAction } from '../config/constants/request-activity-status.enum';

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

export const MY_ACTIVITY_REQUEST_DETAIL_QUERY_KEY =
  'MY_ACTIVITY_REQUEST_DETAIL_QUERY_KEY';

export function useMyActivityRequestDetailQuery(id: number | null) {
  return useQuery({
    queryKey: [MY_ACTIVITY_REQUEST_DETAIL_QUERY_KEY, id],
    queryFn: () =>
      activityRequestApiClient.getMyRequestedActivity(id as number),
    enabled: id !== null
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

export function useUpdateMyActivityRequestMutation() {
  return useMutation({
    mutationKey: ['update-my-request-activity'],
    mutationFn: activityRequestApiClient.updateMyRequestActivity
  });
}

type ApprovalModel = {
  id: number;
  action: ApprovalRequestAction;
};

type MyActivityStore = {
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
  approvalModel: ApprovalModel | null;
  setApprovalModel: (model: ApprovalModel | null) => void;
};

export const useMyActivityStore = create<MyActivityStore>(set => ({
  selectedId: null,
  setSelectedId: (id: number | null) =>
    set(state => ({ ...state, selectedId: id })),
  approvalModel: null,
  setApprovalModel: (model: ApprovalModel | null) =>
    set(state => ({ ...state, approvalModel: model }))
}));

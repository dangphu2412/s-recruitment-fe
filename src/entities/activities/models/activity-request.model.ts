import { useMutation, useQuery } from 'react-query';
import {
  activityRequestApiClient,
  GetActivityRequestQuery
} from '../api/activity-request-api.client';
import { create } from 'zustand/react';
import { ApprovalRequestAction } from '../config/constants/request-activity-status.enum';
import { DEFAULT_PAGINATION, Pagination } from '../../../shared/models';

export const ACTIVITY_REQUESTS_QUERY_KEY = 'ACTIVIIY_REQUESTS_QUERY_KEY';

export function useActivityRequestsQuery(params: GetActivityRequestQuery) {
  return useQuery({
    queryKey: [ACTIVITY_REQUESTS_QUERY_KEY, params],
    queryFn: () => activityRequestApiClient.getRequestedActivities(params)
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

type ActivityRequestStore = Pagination & {
  query: string;
  searchValues: Pagination & {
    query: string;
  };
  submitValues: (
    values: Partial<Pick<ActivityRequestStore, 'page' | 'size' | 'query'>>
  ) => void;
  setValue: (key: keyof ActivityRequestStore, value: any) => void;
  reset: () => void;
  submitSearch: () => void;
};

const DEFAULT_SEARCH = {
  ...DEFAULT_PAGINATION,
  query: ''
};

export const useActivityRequestStore = create<ActivityRequestStore>(set => ({
  ...DEFAULT_SEARCH,
  searchValues: {
    ...DEFAULT_SEARCH
  },
  setValue: (key, value) => {
    set(state => ({ ...state, [key]: value }));
  },
  submitValues: (
    values: Partial<Pick<ActivityRequestStore, 'page' | 'size' | 'query'>>
  ) => {
    set(state => {
      return {
        ...state,
        ...values,
        searchValues: {
          page: state.page,
          size: state.size,
          query: state.query,
          ...values
        }
      };
    });
  },
  submitSearch: () => {
    set(state => {
      return {
        ...state,
        searchValues: {
          page: state.page,
          size: state.size,
          query: state.query
        }
      };
    });
  },
  reset: () => {
    set(state => ({
      ...state,
      ...DEFAULT_SEARCH
    }));
  }
}));

export function useActivityRequests() {
  const searchValues = useActivityRequestStore(state => state.searchValues);

  return useActivityRequestsQuery(searchValues);
}

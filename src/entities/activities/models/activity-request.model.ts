import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  activityRequestApiClient,
  GetActivityRequestQuery,
  GetMyActivityQuery
} from '../api/activity-request-api.client';
import { create } from 'zustand/react';
import {
  ApprovalRequestAction,
  RequestActivityStatus
} from '../config/constants/request-activity-status.enum';
import {
  DEFAULT_PAGINATION,
  Pagination
} from '../../../shared/pagination/offset-paging';
import { object, string } from 'yup';
import { RequestTypes } from '../config/constants/request-activity-metadata.constant';
import { DateRange } from '../../../shared/filter.api';

export const ACTIVITY_REQUESTS_QUERY_KEY = 'ACTIVIIY_REQUESTS_QUERY_KEY';

export function useActivityRequestsQuery(params: GetActivityRequestQuery) {
  return useQuery({
    queryKey: [ACTIVITY_REQUESTS_QUERY_KEY, params],
    queryFn: () => activityRequestApiClient.getRequestedActivities(params)
  });
}

export const MY_ACTIVITY_REQUESTS_QUERY_KEY = 'MY_ACTIVITY_REQUESTS_QUERY_KEY';

export function useMyActivityRequestsQuery(searchValues: GetMyActivityQuery) {
  return useQuery({
    queryKey: [MY_ACTIVITY_REQUESTS_QUERY_KEY, searchValues],
    queryFn: () =>
      activityRequestApiClient.getMyRequestedActivities(searchValues)
  });
}

export function useMyActivityRequests() {
  const searchValues = useMyActivityStore(state => state.searchValues);

  return useMyActivityRequestsQuery(searchValues);
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

export const ACTIVITY_REQUEST_DETAIL_QUERY_KEY =
  'ACTIVITY_REQUEST_DETAIL_QUERY_KEY';
export function useActivityRequestDetailQuery(id: number | null) {
  return useQuery({
    queryKey: [ACTIVITY_REQUEST_DETAIL_QUERY_KEY, id],
    queryFn: () => activityRequestApiClient.getById(id as number),
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-approval-request-activity'],
    mutationFn: activityRequestApiClient.updateApprovalRequestActivity,
    onSuccess() {
      queryClient.invalidateQueries(ACTIVITY_REQUESTS_QUERY_KEY);
    }
  });
}

export function useUpdateMyActivityRequestMutation() {
  return useMutation({
    mutationKey: ['update-my-request-activity'],
    mutationFn: activityRequestApiClient.updateMyRequestActivity
  });
}

export function useUpdateActivityRequestMutation() {
  return useMutation({
    mutationKey: ['update-request-activity'],
    mutationFn: activityRequestApiClient.updateRequestActivity
  });
}

type ApprovalModel = {
  id: number;
  action: ApprovalRequestAction;
};

type MyActivitySearchModel = {
  query: string;
  status: string[];
};

type MyActivityStore = MyActivitySearchModel & {
  searchValues: MyActivitySearchModel;
  selectedId: number | null;
  submitSearch: () => void;
  toggleValues: (key: 'status', value: any) => void;
  setSelectedId: (id: number | null) => void;
  approvalModel: ApprovalModel | null;
  setApprovalModel: (model: ApprovalModel | null) => void;
};

export const useMyActivityStore = create<MyActivityStore>(set => ({
  query: '',
  status: [],
  searchValues: {
    query: '',
    status: []
  },
  submitSearch: () => {
    set(state => {
      return {
        ...state,
        searchValues: {
          query: '', // Currently too little information so inline search will be performed
          status: state.status
        }
      };
    });
  },
  toggleValues: (key, value) => {
    set(state => {
      return {
        ...state,
        [key]: Array.isArray(state[key])
          ? state[key].includes(value)
            ? state[key].filter(item => item !== value)
            : [...state[key], value]
          : value
      };
    });
  },
  selectedId: null,
  setSelectedId: (id: number | null) =>
    set(state => ({ ...state, selectedId: id })),
  approvalModel: null,
  setApprovalModel: (model: ApprovalModel | null) =>
    set(state => ({ ...state, approvalModel: model }))
}));

type ActivityRequestStore = Pagination &
  DateRange<Date | null> & {
    query: string;
    departmentIds: string[];
    status: string[];
    requestTypes: string[];
    searchValues: Pagination &
      DateRange<Date | null> & {
        query: string;
        departmentIds: string[];
        status: string[];
        requestTypes: string[];
      };
    submitValues: (
      values: Partial<Pick<ActivityRequestStore, 'page' | 'size' | 'query'>>
    ) => void;
    setValue: (key: keyof ActivityRequestStore, value: any) => void;
    toggleValues: (
      key: 'departmentIds' | 'status' | 'requestTypes',
      value: any
    ) => void;
    reset: () => void;
    submitSearch: () => void;
    selectedId: null | number;
  };

const DEFAULT_SEARCH = {
  ...DEFAULT_PAGINATION,
  query: '',
  departmentIds: [],
  fromDate: null,
  toDate: null,
  status: [RequestActivityStatus.PENDING],
  requestTypes: []
};

export const useActivityRequestStore = create<ActivityRequestStore>(set => ({
  ...DEFAULT_SEARCH,
  searchValues: {
    ...DEFAULT_SEARCH
  },
  selectedId: null,
  setValue: (key, value) => {
    set(state => ({ ...state, [key]: value }));
  },
  submitValues: (
    values: Partial<
      Pick<
        ActivityRequestStore,
        | 'page'
        | 'size'
        | 'query'
        | 'departmentIds'
        | 'fromDate'
        | 'toDate'
        | 'status'
      >
    >
  ) => {
    set(state => {
      return {
        ...state,
        ...values,
        searchValues: {
          page: state.page,
          size: state.size,
          query: state.query,
          departmentIds: state.departmentIds,
          fromDate: state.fromDate,
          toDate: state.toDate,
          status: state.status,
          requestTypes: state.requestTypes,
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
          query: state.query,
          departmentIds: state.departmentIds,
          fromDate: state.fromDate,
          toDate: state.toDate,
          status: state.status,
          requestTypes: state.requestTypes
        }
      };
    });
  },
  reset: () => {
    set(state => ({
      ...state,
      ...DEFAULT_SEARCH
    }));
  },
  toggleValues: (key, value) => {
    set(state => {
      return {
        ...state,
        [key]: Array.isArray(state[key])
          ? state[key].includes(value)
            ? state[key].filter(item => item !== value)
            : [...state[key], value]
          : value
      };
    });
  }
}));

export function useActivityRequests() {
  const searchValues = useActivityRequestStore(state => state.searchValues);

  return useActivityRequestsQuery(searchValues);
}

export type ActivityRequestInputs = {
  requestType: string;
  timeOfDay: string;
  dayOfWeek: string;
  reason?: string;
  requestChangeDay?: string;
  compensatoryDay?: string;
};

export const activityRequestValidationSchema = object({
  requestType: string().required(),
  timeOfDay: string().required(),
  dayOfWeek: string()
    .when('requestType', {
      is: RequestTypes.WORKING,
      then: string().required()
    })
    .nullable(),
  reason: string()
    .when('requestType', (value, schema) => {
      if ([RequestTypes.LATE, RequestTypes.ABSENCE].includes(value)) {
        return schema.required();
      }

      return schema;
    })
    .nullable(),
  requestChangeDay: string()
    .when('requestType', (value, schema) => {
      if ([RequestTypes.LATE, RequestTypes.ABSENCE].includes(value)) {
        return schema.required();
      }

      return schema;
    })
    .nullable(),
  compensatoryDay: string()
    .when('requestType', {
      is: RequestTypes.ABSENCE,
      then: string().required()
    })
    .test(
      'compensatoryDay',
      'Compensatory day must be after request day',
      function (value, context) {
        if (context.parent.requestChangeDay && value) {
          return new Date(value) > new Date(context.parent.requestChangeDay);
        }

        return true;
      }
    )
    .nullable()
});

export function getRequestActions(
  status: RequestActivityStatus
): ApprovalRequestAction[] {
  const nextStateTransition: Record<
    RequestActivityStatus,
    ApprovalRequestAction[]
  > = {
    [RequestActivityStatus.PENDING]: [
      ApprovalRequestAction.APPROVE,
      ApprovalRequestAction.REJECT,
      ApprovalRequestAction.REVISE
    ],
    [RequestActivityStatus.APPROVED]: [],
    [RequestActivityStatus.REJECTED]: [ApprovalRequestAction.REVISE],
    [RequestActivityStatus.REVISE]: []
  };

  return nextStateTransition[status];
}

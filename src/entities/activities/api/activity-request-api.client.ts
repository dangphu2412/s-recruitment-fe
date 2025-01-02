import { authorizedHttpClient } from '../../../shared/api';
import { Page } from '../../../shared/models';
import { User } from '../../user/api';
import {
  ApprovalRequestAction,
  RequestActivityStatus
} from '../config/constants/request-activity-status.enum';
import { encodeMultiQueryParams } from '../../../shared/models/pagination';

type ActivityRequestResponse = {
  id: number;
  requestType: string;
  timeOfDay: {
    id: string;
    name: string;
  };
  dayOfWeek: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  approvalStatus: RequestActivityStatus;
  rejectReason: string;
  reviseNote: string;
  requestChangeDay?: string;
  compensatoryDay?: string;
  reason?: string;
  author: User;
};

type CreateRequestActivityDTO = {
  requestType: string;
  timeOfDayId: string;
  dayOfWeekId: string;
  requestChangeDay?: string;
  compensatoryDay?: string;
  reason?: string;
};

type UpdateRequestActivityDTO = {
  action: ApprovalRequestAction;
  ids: number[];
  rejectReason?: string;
  reviseNote?: string;
};

type UpdateMyRequestActivityDTO = {
  id: number;
  timeOfDayId: string;
  dayOfWeekId: string;
};

export type GetActivityRequestQuery = {
  page: number;
  size: number;
  query: string;
  departmentIds: string[];
  fromDate: string;
  toDate: string;
  status: string[];
};

export const activityRequestApiClient = {
  getRequestedActivities: async (params: GetActivityRequestQuery) => {
    return authorizedHttpClient.request<Page<ActivityRequestResponse>>({
      method: 'get',
      url: '/activities/requests',
      params: {
        ...params,
        departmentIds: encodeMultiQueryParams(params.departmentIds),
        status: encodeMultiQueryParams(params.status)
      }
    });
  },
  getMyRequestedActivities: async () => {
    return authorizedHttpClient.request<Page<ActivityRequestResponse>>({
      method: 'get',
      url: '/activities/my-requests'
    });
  },
  getMyRequestedActivity: async (id: number) => {
    return authorizedHttpClient.request<ActivityRequestResponse>({
      method: 'get',
      url: `/activities/my-requests/${id}`
    });
  },
  createRequestActivities: async (data: CreateRequestActivityDTO) => {
    return authorizedHttpClient.request<void>({
      method: 'post',
      url: '/activities/requests',
      data
    });
  },
  updateApprovalRequestActivity: async (data: UpdateRequestActivityDTO) => {
    return authorizedHttpClient.request<void>({
      method: 'patch',
      url: '/activities/requests/approval-status',
      data
    });
  },
  updateMyRequestActivity: async ({
    id,
    ...data
  }: UpdateMyRequestActivityDTO) => {
    return authorizedHttpClient.request<void>({
      method: 'patch',
      url: `/activities/my-requests/${id}`,
      data
    });
  }
};

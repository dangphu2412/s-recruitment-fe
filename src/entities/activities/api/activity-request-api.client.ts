import { authorizedHttpClient } from '../../../shared/api';
import { Page } from '../../../shared/models';
import { User } from '../../user/api';
import {
  ApprovalRequestAction,
  RequestActivityStatus
} from '../config/constants/request-activity-status.enum';

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
  approvalStatus: RequestActivityStatus;
  rejectReason: string;
  reviseNote: string;
  author: User;
};

type CreateRequestActivityDTO = {
  requestType: string;
  timeOfDayId: string;
  dayOfWeekId: string;
};

type UpdateRequestActivityDTO = {
  action: ApprovalRequestAction;
  id: number;
  rejectReason?: string;
  reviseNote?: string;
};

type UpdateMyRequestActivityDTO = {
  id: number;
  timeOfDayId: string;
  dayOfWeekId: string;
};

export const activityRequestApiClient = {
  getRequestedActivities: async () => {
    return authorizedHttpClient.request<Page<ActivityRequestResponse>>({
      method: 'get',
      url: '/activities/requests'
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
  updateApprovalRequestActivity: async ({
    id,
    ...data
  }: UpdateRequestActivityDTO) => {
    return authorizedHttpClient.request<void>({
      method: 'patch',
      url: `/activities/requests/${id}`,
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

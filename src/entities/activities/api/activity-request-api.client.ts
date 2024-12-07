import { authorizedHttpClient } from '../../../shared/api';
import { Page } from '../../../shared/models';
import { User } from '../../user/api';
import { ApprovalRequestAction } from '../config/constants/request-activity-status.enum';

type ActivityRequest = {
  id: number;
  requestType: string;
  timeOfDay: string;
  dayOfWeek: string;
  createdAt: Date;
  author: User;
};

type CreateRequestActivityDTO = {
  requestType: string;
  timeOfDay: string;
  dayOfWeek: string;
};

type UpdateRequestActivityDTO = {
  action: ApprovalRequestAction;
  id: number;
};

export const activityRequestApiClient = {
  getRequestedActivities: async () => {
    return authorizedHttpClient.request<Page<ActivityRequest>>({
      method: 'get',
      url: '/activities/requests'
    });
  },
  getMyRequestedActivities: async () => {
    return authorizedHttpClient.request<Page<ActivityRequest>>({
      method: 'get',
      url: '/activities/my-requests'
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
  }
};

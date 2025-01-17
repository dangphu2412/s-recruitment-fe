import { authorizedHttpClient } from '../../../shared/api';
import { User } from '../../user/api';

export type ActivityResponse = {
  id: number;
  requestType: string;
  timeOfDay: {
    id: string;
    name: string;
    fromTime: string;
    toTime: string;
  };
  dayOfWeek: {
    id: string;
    name: string;
  };
  createdAt: string;
  author: User;
  requestChangeDay?: string;
  compensatoryDay?: string;
};

export type FindActivitiesQuery = {
  fromDate: Date;
  toDate: Date;
};

export const activityApiClient = {
  findActivities: async (params: FindActivitiesQuery) => {
    return authorizedHttpClient.request<ActivityResponse[]>({
      method: 'get',
      url: '/activities',
      params
    });
  },
  uploadLogs: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return authorizedHttpClient.request({
      method: 'post',
      url: '/activities/logs',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

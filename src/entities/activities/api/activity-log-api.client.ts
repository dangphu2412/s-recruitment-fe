import { authorizedHttpClient } from '../../../shared/api';
import { User } from '../../user/api';
import { Page } from '../../../shared/models';

export type ActivityLogResponse = {
  fromTime: string;
  toTime: string;
  deviceUserId: string;
  isLate: boolean;
  author: User | null;
};

export type FindActivityLogQuery = {
  page: number;
  size: number;
};

export const activityLogApiClient = {
  findLogs: async (params: FindActivityLogQuery) => {
    return authorizedHttpClient.request<Page<ActivityLogResponse>>({
      method: 'get',
      url: '/activity-logs',
      params
    });
  },
  uploadLogs: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return authorizedHttpClient.request<void>({
      method: 'post',
      url: '/activity-logs',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

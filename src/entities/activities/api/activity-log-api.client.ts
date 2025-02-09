import { authorizedHttpClient } from '../../../shared/api';
import { User } from '../../user/api';
import { Page } from '../../../shared/models';
import { LogWorkStatus } from '../config/constants/log-work-status.enum';
import { encodeMultiQueryParams } from '../../../shared/models/pagination';

export type ActivityLogResponse = {
  fromTime: string;
  toTime: string;
  deviceUserId: string;
  workStatus: LogWorkStatus;
  author: User | null;
};

export type FindActivityLogQuery = {
  page: number;
  size: number;
  workStatus?: string;
};

export type LogAnalyticResponse = {
  lateCount: number;
  onTimeCount: number;
  notFinishedCount: number;
};

export const activityLogApiClient = {
  findLogs: async (params: FindActivityLogQuery) => {
    return authorizedHttpClient.request<Page<ActivityLogResponse>>({
      method: 'get',
      url: '/activity-logs',
      params: {
        ...params,
        workStatus: params.workStatus
          ? encodeMultiQueryParams(params.workStatus)
          : undefined
      }
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
  },
  syncLogs: async () => {
    return authorizedHttpClient.request<void>({
      method: 'patch',
      url: '/activity-logs/works'
    });
  },
  findAnalyticLogs: () => {
    return authorizedHttpClient.request<LogAnalyticResponse>({
      method: 'get',
      url: '/activity-logs/analytics'
    });
  }
};

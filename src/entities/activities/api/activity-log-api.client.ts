import { authorizedHttpClient } from '../../../shared/api';
import { User } from '../../user/api';
import { Page } from '../../../shared/models';
import { LogWorkStatus } from '../config/constants/log-work-status.enum';
import { encodeMultiQueryParams } from '../../../shared/models/pagination';
import { BoxItem } from '../../../shared/models/combobox.api';

export type ActivityLogResponse = {
  fromTime: string;
  toTime: string;
  deviceUserId: string;
  workStatus: LogWorkStatus;
  author: User | null;
  deviceAuthor: {
    deviceUserId: string;
    name: string;
  };
};

export type FindActivityLogQuery = {
  page: number;
  size: number;
  workStatus?: string[];
  authors?: BoxItem[];
};

export type FindAnalyticLogQuery = {
  fromDate?: string;
  toDate?: string;
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
          : undefined,
        authors: params.authors?.length
          ? encodeMultiQueryParams(params.authors.map(author => author.value))
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
  findAnalyticLogs: (findAnalyticLogQuery: FindAnalyticLogQuery) => {
    return authorizedHttpClient.request<LogAnalyticResponse>({
      method: 'get',
      url: '/activity-logs/analytics',
      params: findAnalyticLogQuery
    });
  }
};

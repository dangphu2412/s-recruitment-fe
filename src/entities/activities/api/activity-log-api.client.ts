import { authorizedHttpClient } from '../../../shared/api';
import { User } from '../../user/api';
import { Page } from '../../../shared/pagination/offset-paging';
import { LogWorkStatus } from '../config/constants/log-work-status.enum';
import { encodeMultiQueryParams } from '../../../shared/query-filter';
import { downloadFile } from '../../../shared/file';

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
  activityId: number;
  auditedFromTime: string | null;
  auditedToTime: string | null;
};

export type FindActivityLogQuery = {
  page: number;
  size: number;
  workStatus?: string[];
  authors?: string[];
  query?: string;
};

export type FindAnalyticLogQuery = {
  fromDate?: string;
  toDate?: string;
  groupType?: string;
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
          ? encodeMultiQueryParams(params.authors)
          : undefined
      }
    });
  },
  uploadLogs: async () => {
    return authorizedHttpClient.request<void>({
      method: 'post',
      url: '/activity-logs'
    });
  },
  downloadReportLogs: async () => {
    const response = await authorizedHttpClient.request<Blob>({
      method: 'post',
      url: '/activity-logs/reports',
      responseType: 'blob'
    });

    return downloadFile(response, 'reports-1-months.xlsx');
  },
  findAnalyticLogs: (findAnalyticLogQuery: FindAnalyticLogQuery) => {
    return authorizedHttpClient.request<LogAnalyticResponse>({
      method: 'get',
      url: '/activity-logs/analytics',
      params: findAnalyticLogQuery
    });
  }
};

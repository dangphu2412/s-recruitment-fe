import { authorizedHttpClient } from '../../../shared/api';
import { GroupType } from '../config/dashboard.constants';

export type KPI = {
  totalPayment: number;
  totalPendingRequests: number;
  totalActiveMembers: number;
  totalLateMembers: number;
};
export type MyKPI = {
  estimatedPaid: number;
  totalPayment: number;
  totalPendingRequests: number;
  totalLateActivities: number;
  totalToBeFinishedWork: number;
  totalFinishedWork: number;
};

export type UserActivityTrendResponse = {
  items: UserActivityTrend[];
};

export type UserActivityTrend = {
  lateCount: number;
  onTimeCount: number;
  notFinishedCount: number;
  date: string;
};

export const dashboardApiClient = {
  getKPI: () => {
    return authorizedHttpClient.request<KPI>({
      url: '/dashboard/kpi',
      method: 'get'
    });
  },
  getMyKPI: () => {
    return authorizedHttpClient.request<MyKPI>({
      url: '/dashboard/kpi/me',
      method: 'get'
    });
  },
  getUserActivityTrends: (groupType: GroupType) => {
    return authorizedHttpClient.request<UserActivityTrendResponse>({
      url: '/dashboard/user-activity-trends',
      method: 'get',
      params: {
        groupType
      }
    });
  }
};

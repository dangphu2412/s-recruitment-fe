import { authorizedHttpClient } from '../../../shared/api';

export type KPI = {
  totalPayment: number;
  totalPendingRequests: number;
  totalActiveMembers: number;
  totalLateMembers: number;
};

export const dashboardApiClient = {
  getKPI: () => {
    return authorizedHttpClient.request<KPI>({
      url: '/dashboard/kpi',
      method: 'get'
    });
  }
};

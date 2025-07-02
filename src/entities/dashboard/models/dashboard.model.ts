import { useQuery } from 'react-query';
import { dashboardApiClient } from '../api/dashboard-api.client';
import { GroupType } from '../config/dashboard.constants';

export function useDashboardKPI() {
  return useQuery({
    queryKey: ['dashboard-kpi'],
    queryFn: dashboardApiClient.getKPI
  });
}

export function useDashboardMyKPI() {
  return useQuery({
    queryKey: ['dashboard-my-kpi'],
    queryFn: dashboardApiClient.getMyKPI
  });
}

export function useDashboardUserActivityTrend(groupType: GroupType) {
  return useQuery({
    queryKey: ['dashboard-kpi', groupType],
    queryFn: () => dashboardApiClient.getUserActivityTrends(groupType)
  });
}
export function useDashboardMyActivityTrend(groupType: GroupType) {
  return useQuery({
    queryKey: ['dashboard-my-kpi', groupType],
    queryFn: () => dashboardApiClient.getMyActivityTrends(groupType)
  });
}

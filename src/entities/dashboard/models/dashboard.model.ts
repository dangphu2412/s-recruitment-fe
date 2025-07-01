import { useQuery } from 'react-query';
import { dashboardApiClient } from '../api/dashboard-api.client';
import { GroupType } from '../config/dashboard.constants';

export function useDashboardKPI() {
  return useQuery({
    queryKey: ['dashboard-kpi'],
    queryFn: dashboardApiClient.getKPI
  });
}

export function useDashboardUserActivityTrend(groupType: GroupType) {
  return useQuery({
    queryKey: ['dashboard-kpi', groupType],
    queryFn: () => dashboardApiClient.getUserActivityTrends(groupType)
  });
}
